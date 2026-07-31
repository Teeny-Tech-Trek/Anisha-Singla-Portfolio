// ============================================================================
// NetTwin chat API helper — the single, reusable place the chat call lives.
//
//   POST {VITE_API_BASE_URL}/api/chat
//   Content-Type: application/json
//   { twinId, userEmail, sessionId, messages: [{ role:"user", content }] }
//   -> 200 { success:true, reply, citations:[], sourceChunks:[] }
//   -> err { success:false, error:"<CODE>", message:"<text>" }   (4xx/5xx)
//
// The backend keeps conversation history keyed on sessionId, so each request
// only needs to send the latest user message. Non-streaming (the stream
// endpoint is feature-flagged off server-side).
// ============================================================================

const rawBase = (
  import.meta.env.VITE_API_BASE_URL || "https://api.nettwin.techtrekkers.ai"
).replace(/\/$/, "");
const API_BASE_URL = rawBase.replace(/\/api$/, "");
const CHAT_URL = `${API_BASE_URL}/api/chat`;
const STREAM_CHAT_URL = `${API_BASE_URL}/api/chat/stream`;
const REQUEST_TIMEOUT_MS = 30_000;
const VISITOR_EMAIL = "anonymous@visitor.internal";
const FALLBACK_ERROR_MESSAGE = "Sorry, something went wrong. Please try again.";

// ============= LOGGING =============
const LOG_PREFIX = "[CHATBOT-API]";

function logInfo(message, data) {
  console.log(`${LOG_PREFIX} ${message}`, data ?? "");
}

function logError(message, error) {
  console.error(`${LOG_PREFIX} ❌ ${message}`, error ?? "");
}

logInfo("🚀 Chatbot API initialized", { chatUrl: CHAT_URL });

// ============= TWIN ID =============
// twinId is a 24-hex Mongo id. Priority: the /chatbot/<id> URL path (so a
// shared link can target a specific twin) then the VITE_TWIN_ID env var (the
// default for this single-tenant portfolio). Never hardcoded.
function parseTwinIdFromPath() {
  if (typeof window === "undefined") {
    return null;
  }
  const match = window.location.pathname.match(/^\/chatbot\/([0-9a-fA-F]{24})/);
  return match ? match[1] : null;
}

export function getTwinId() {
  return parseTwinIdFromPath() || import.meta.env.VITE_TWIN_ID || "";
}

// ============= SESSION ID =============
// MUST stay stable for the whole conversation or the bot loses memory and
// treats every message as turn 1. We generate one id per twin and persist it
// in sessionStorage (keyed by twinId) so it survives reloads within the tab.
function createSessionId(twinId) {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return `twin-${twinId}-${crypto.randomUUID()}`;
  }
  return `twin-${twinId}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export function getChatSessionId(twinId = getTwinId()) {
  const storageKey = `chat_session_id:${twinId}`;

  if (typeof window === "undefined") {
    return createSessionId(twinId);
  }

  try {
    const existing = window.sessionStorage.getItem(storageKey);
    if (existing) {
      return existing;
    }
    const fresh = createSessionId(twinId);
    window.sessionStorage.setItem(storageKey, fresh);
    logInfo("New session id created", fresh);
    return fresh;
  } catch (error) {
    // sessionStorage can be unavailable (private mode / blocked cookies).
    // Fall back to an in-memory id: loses cross-reload continuity but stays
    // stable for this page session.
    logError("sessionStorage unavailable, using in-memory session id", error);
    return createSessionId(twinId);
  }
}

// ============= TIMEOUT / ABORT =============
function createTimeoutSignal(signal, timeoutMs = REQUEST_TIMEOUT_MS) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => {
    controller.abort(new DOMException("Request timed out.", "TimeoutError"));
  }, timeoutMs);

  const abortFromParent = () => {
    controller.abort(signal?.reason ?? new DOMException("Request aborted.", "AbortError"));
  };

  if (signal) {
    if (signal.aborted) {
      abortFromParent();
    } else {
      signal.addEventListener("abort", abortFromParent, { once: true });
    }
  }

  const cleanup = () => {
    clearTimeout(timeoutId);
    signal?.removeEventListener("abort", abortFromParent);
  };

  return { cleanup, signal: controller.signal };
}

// ============= CHAT CALL =============
/**
 * Send the latest user message to the twin and resolve with the parsed
 * response body ({ success, reply, citations, sourceChunks }).
 *
 * Throws an Error on a non-2xx response or `success:false`; the thrown error's
 * `.message` is the server's user-facing message (with `.code`/`.status`
 * attached for callers that want them).
 */
export async function sendChatMessage({
  twinId = getTwinId(),
  userEmail = VISITOR_EMAIL,
  sessionId = getChatSessionId(twinId),
  messages,
  signal,
} = {}) {
  const { cleanup, signal: requestSignal } = createTimeoutSignal(signal);

  try {
    const body = { twinId, userEmail, sessionId, messages };
    logInfo("📤 POST /api/chat", { twinId, sessionId, messageCount: messages?.length });

    const response = await fetch(CHAT_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      signal: requestSignal,
    });

    let data = null;
    try {
      data = await response.json();
    } catch {
      // Non-JSON body (e.g. a gateway error page).
      data = null;
    }

    if (!response.ok || data?.success === false) {
      const error = new Error(data?.message || FALLBACK_ERROR_MESSAGE);
      error.code = data?.error;
      error.status = response.status;
      logError("Chat request failed", { status: response.status, code: error.code });
      throw error;
    }

    return data ?? {};
  } catch (error) {
    if (requestSignal.aborted) {
      const reasonName = requestSignal.reason?.name;
      if (reasonName === "TimeoutError") {
        throw new Error("The assistant took too long to respond. Please try again.");
      }
      throw new DOMException("Request aborted.", "AbortError");
    }
    throw error;
  } finally {
    cleanup();
  }
}

export { API_BASE_URL, FALLBACK_ERROR_MESSAGE, REQUEST_TIMEOUT_MS, logError, logInfo };

// ============= STREAMING CHAT CALL =============
/**
 * Open an SSE stream to the NetTwin backend and call `onToken` for every
 * incremental text chunk from Gemini.
 *
 * Resolves with { reply, citations } on completion.
 * Rejects with an Error whose `.streamedAny` flag tells the caller whether
 * any tokens arrived (so it can decide whether to fall back or keep partial
 * content).
 */
export async function streamChatMessage({
  twinId = getTwinId(),
  userEmail = VISITOR_EMAIL,
  sessionId = getChatSessionId(twinId),
  messages,
  signal,
} = {}) {
  const body = { twinId, userEmail, sessionId, messages, session_id: sessionId };
  const requestId = `req-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
  logInfo("📡 POST /api/chat/stream", { twinId, sessionId, messageCount: messages?.length, requestId });

  let resp;
  try {
    resp = await fetch(STREAM_CHAT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "text/event-stream",
        "X-Request-ID": requestId,
      },
      body: JSON.stringify(body),
      signal,
    });
  } catch (fetchErr) {
    if (fetchErr?.name === "AbortError") throw fetchErr;
    logError("stream fetch failed", fetchErr);
    const err = new Error(fetchErr?.message || FALLBACK_ERROR_MESSAGE);
    err.streamedAny = false;
    throw err;
  }

  if (!resp.ok || !resp.body) {
    const err = new Error(`stream_http_${resp.status}`);
    err.streamedAny = false;
    try {
      const j = await resp.json();
      err.fallback = j?.fallback;
      err.code = j?.error;
    } catch { /* non-JSON */ }
    throw err;
  }

  // Return an async generator that callers can iterate over
  return _readSseStream(resp.body);
}

/**
 * Internal: parse SSE frames from the response body ReadableStream.
 * Yields { done: false, text } for tokens, { done: true, reply, citations } on completion.
 * Throws on event: error.
 */
async function* _readSseStream(body) {
  const reader = body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";
  let full = "";
  let citations = [];
  let streamedAny = false;

  try {
    // eslint-disable-next-line no-constant-condition
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });

      let sep;
      while ((sep = buffer.indexOf("\n\n")) !== -1) {
        const frame = buffer.slice(0, sep);
        buffer = buffer.slice(sep + 2);
        let event = "message";
        let dataStr = "";
        for (const line of frame.split("\n")) {
          if (line.startsWith("event:")) event = line.slice(6).trim();
          else if (line.startsWith("data:")) dataStr += line.slice(5).trim();
        }
        if (!dataStr) continue;
        let payload;
        try { payload = JSON.parse(dataStr); } catch { continue; }

        if (event === "token" && typeof payload.text === "string") {
          full += payload.text;
          streamedAny = true;
          yield { done: false, text: payload.text };
        } else if (event === "done") {
          const reply = payload.answer ?? full;
          citations = payload.citations || [];
          yield { done: true, reply, citations };
          return;
        } else if (event === "error") {
          const err = new Error("stream_error");
          err.fallback = payload.fallback;
          err.streamedAny = streamedAny;
          throw err;
        }
      }
    }
  } finally {
    try { reader.releaseLock(); } catch { /* already released */ }
  }

  // Stream ended without a done frame — return what we have
  yield { done: true, reply: full, citations };
}
