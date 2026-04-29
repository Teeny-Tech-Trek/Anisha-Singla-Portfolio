const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, "") || "http://localhost:8000";
const STREAM_URL = `${API_BASE_URL}/chat/stream`;
const REQUEST_TIMEOUT_MS = 30_000;
const SESSION_STORAGE_KEY = "portfolio-chatbot-session-id";
const FALLBACK_ERROR_MESSAGE = "Sorry, something went wrong. Please try again.";

// ============= LOGGING UTILITIES =============
const LOG_PREFIX = "[CHATBOT-API]";

function logInfo(message, data = null) {
  const timestamp = new Date().toISOString();
  console.log(`${LOG_PREFIX} [${timestamp}] ${message}`, data || "");
}

function logError(message, error = null) {
  const timestamp = new Date().toISOString();
  console.error(`${LOG_PREFIX} [${timestamp}] ❌ ERROR: ${message}`, error || "");
}

function logWarn(message, data = null) {
  const timestamp = new Date().toISOString();
  console.warn(`${LOG_PREFIX} [${timestamp}] ⚠️  WARNING: ${message}`, data || "");
}

function logDebug(message, data = null) {
  const timestamp = new Date().toISOString();
  console.debug(`${LOG_PREFIX} [${timestamp}] 🔍 DEBUG: ${message}`, data || "");
}

// Initialize API URL on module load
logInfo("🚀 Chatbot API Module Initialized");
logInfo(`API Base URL: ${API_BASE_URL}`);
logInfo(`Stream URL: ${STREAM_URL}`);

function createSessionId() {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    const sessionId = crypto.randomUUID();
    logDebug("Session ID created using crypto.randomUUID()", sessionId);
    return sessionId;
  }

  const fallbackSessionId = `chat-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
  logDebug("Session ID created using fallback method", fallbackSessionId);
  return fallbackSessionId;
}

export function getChatSessionId() {
  if (typeof window === "undefined") {
    logWarn("window is undefined, creating new session ID");
    return createSessionId();
  }

  const existingSessionId = window.sessionStorage.getItem(SESSION_STORAGE_KEY);

  if (existingSessionId) {
    logDebug("Using existing session ID from sessionStorage", existingSessionId);
    return existingSessionId;
  }

  const sessionId = createSessionId();
  try {
    window.sessionStorage.setItem(SESSION_STORAGE_KEY, sessionId);
    logInfo("New session ID stored in sessionStorage", sessionId);
  } catch (error) {
    logError("Failed to store session ID in sessionStorage", error);
  }
  return sessionId;
}

function createTimeoutSignal(signal, timeoutMs = REQUEST_TIMEOUT_MS) {
  const controller = new AbortController();
  const timeoutId = window.setTimeout(() => {
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
    window.clearTimeout(timeoutId);
    signal?.removeEventListener("abort", abortFromParent);
  };

  return {
    cleanup,
    signal: controller.signal,
  };
}

function safeJsonParse(value) {
  try {
    const parsed = JSON.parse(value);
    logDebug("Successfully parsed JSON", parsed);
    return parsed;
  } catch (error) {
    logWarn("Failed to parse JSON", { value, error: error.message });
    return null;
  }
}

function normalizeStreamEvent(rawEvent) {
  if (!rawEvent || !rawEvent.trim()) {
    logDebug("Empty event received");
    return null;
  }

  logDebug("Processing raw event", rawEvent.substring(0, 100)); // Log first 100 chars

  // Normalize line endings to \n for consistent parsing
  const normalized = rawEvent.replace(/\r\n/g, "\n").replace(/\r/g, "\n");
  
  const lines = normalized
    .split("\n")
    .filter((line) => line.trim() !== "");

  if (!lines.length) {
    logWarn("No valid lines found in event");
    return null;
  }

  let event = "message";
  const dataLines = [];

  for (const line of lines) {
    // Skip comment lines (starting with :)
    if (line.startsWith(":")) {
      logDebug("Skipping SSE comment line", line.substring(0, 50));
      continue;
    }
    
    if (line.startsWith("event:")) {
      event = line.slice(6).trim();
      logDebug("Event type identified", event);
      continue;
    }

    if (line.startsWith("data:")) {
      dataLines.push(line.slice(5).trimStart());
    }
  }

  if (!dataLines.length) {
    logWarn("No data lines found in event");
    return null;
  }

  const data = dataLines.join("\n");

  if (data === "[DONE]") {
    logInfo("Stream completed ([DONE] marker received)");
    return { done: true, event };
  }

  const parsed = safeJsonParse(data);

  if (parsed) {
    const isDoneEvent = Boolean(parsed.done) || event === "done";
    
    // For token events, extract text from the parsed object
    let text = "";
    if (event === "token") {
      text = parsed.text ?? "";
      logDebug(`Token received`, { text: text.substring(0, 50) }); // Log first 50 chars
    } else {
      text = parsed.delta ?? parsed.text ?? parsed.token ?? parsed.message ?? "";
    }

    const error =
      parsed.error ||
      (typeof text === "string" && /^\[?error[:\]]/i.test(text) ? text : "");

    if (error) {
      logError("Error in parsed event", error);
    }

    return {
      done: isDoneEvent,
      error: error || "",
      event,
      raw: parsed,
      text: typeof text === "string" ? text : "",
    };
  }

  return {
    done: event === "done",
    error: "",
    event,
    raw: data,
    text: data,
  };
}

function parseSseEvents(buffer) {
  // Handle both \n\n and \r\n\r\n as event separators
  // First normalize line endings to \n for consistent parsing
  const normalized = buffer.replace(/\r\n/g, "\n");
  
  // Split by double newlines (event separator)
  const parts = normalized.split("\n\n");
  
  // Keep the last incomplete part as pending
  const pending = parts.pop() ?? "";
  
  // Parse all complete events
  const events = parts
    .map((part) => {
      if (!part || !part.trim()) return null;
      return normalizeStreamEvent(part);
    })
    .filter(Boolean);

  if (events.length > 0) {
    logDebug(`Parsed ${events.length} SSE event(s)`, { 
      eventTypes: events.map(e => e.event)
    });
  }

  return { events, pending };
}

async function readErrorResponse(response) {
  logDebug("Reading error response", { status: response.status });
  try {
    const payload = await response.json();
    logDebug("Error response parsed as JSON", payload);

    if (typeof payload?.detail === "string") {
      logError("Error detail found (string)", payload.detail);
      return payload.detail;
    }

    if (Array.isArray(payload?.detail)) {
      const errorMsg = payload.detail.map((item) => item.msg || item.message || String(item)).join(" ");
      logError("Error detail found (array)", errorMsg);
      return errorMsg;
    }
  } catch (jsonError) {
    logWarn("Failed to parse error response as JSON", jsonError);
    try {
      const text = await response.text();
      if (text.trim()) {
        logDebug("Error response as text", text);
        return text.trim();
      }
    } catch (textError) {
      logError("Failed to read error response as text", textError);
      return "";
    }
  }

  return "";
}

export async function streamChatbotResponse(
  message,
  { signal, onError, onToken, sessionId = getChatSessionId() }
) {
  logInfo("🎯 Starting streamChatbotResponse", { 
    sessionId,
    messageLength: message.length,
    url: STREAM_URL
  });

  const { cleanup, signal: requestSignal } = createTimeoutSignal(signal);

  try {
    const requestPayload = {
      session_id: sessionId,
      user_id: "visitor",
      query: message,
      message: message,
      stream: true,
    };

    logInfo("📤 Sending request to backend", {
      url: STREAM_URL,
      method: "POST",
      payload: requestPayload
    });

    const response = await fetch(STREAM_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "text/event-stream, text/plain, application/json",
      },
      body: JSON.stringify(requestPayload),
      signal: requestSignal,
    });

    logInfo(`📨 Response received`, { 
      status: response.status,
      statusText: response.statusText,
      contentType: response.headers.get("content-type"),
      hasBody: !!response.body
    });

    if (!response.ok) {
      const detail = await readErrorResponse(response);
      const errorMsg = detail || `Chatbot request failed with status ${response.status}.`;
      logError("Response not OK", errorMsg);
      throw new Error(errorMsg);
    }

    if (!response.body) {
      logError("No response body", "Streaming is not supported in this browser.");
      throw new Error("Streaming is not supported in this browser.");
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let pending = "";
    let receivedAnyEvent = false;
    let totalTokensReceived = 0;
    let eventCount = 0;

    logInfo("🔄 Starting to read response stream");

    try {
      while (true) {
        let chunk;
        try {
          chunk = await reader.read();
        } catch (readError) {
          logError("Error reading from stream", readError);
          throw new Error(`Failed to read stream: ${readError.message}`);
        }

        const { done, value } = chunk;

        if (done) {
          logInfo("✅ Stream reading complete (done=true)");
          break;
        }

        if (!value || value.length === 0) {
          logDebug("Empty chunk received, skipping");
          continue;
        }

        let chunkText;
        try {
          chunkText = decoder.decode(value, { stream: true });
        } catch (decodeError) {
          logError("Error decoding chunk", decodeError);
          throw new Error(`Failed to decode stream chunk: ${decodeError.message}`);
        }

        logDebug(`📦 Chunk received`, { 
          chunkSize: value.length, 
          chunkPreview: chunkText.substring(0, 100)
        });

        pending += chunkText;

        const parsed = parseSseEvents(pending);
        pending = parsed.pending;

        for (const event of parsed.events) {
          eventCount++;
          receivedAnyEvent = true;

          logDebug(`Event #${eventCount}`, {
            type: event.event,
            done: event.done,
            hasText: !!event.text,
            textLength: event.text?.length || 0
          });

          if (event.error) {
            logError(`Error in event #${eventCount}`, event.error);
            onError?.(event.error);
          }

          if (event.text) {
            totalTokensReceived += event.text.length;
            logDebug(`Token received in event #${eventCount}`, {
              tokenLength: event.text.length,
              totalLength: totalTokensReceived,
              preview: event.text.substring(0, 50)
            });
            onToken(event.text, event);
          }

          if (event.done) {
            logInfo(`✅ Done event (#${eventCount}) received`, {
              totalTokens: totalTokensReceived,
              eventCount
            });
            return;
          }
        }
      }

      // Process any remaining data in the buffer after stream ends
      const finalChunk = decoder.decode();
      if (finalChunk) {
        logDebug("Processing final decode chunk", { length: finalChunk.length });
        pending += finalChunk;
      }

      // Handle any remaining pending data
      if (pending.trim()) {
        logDebug("Processing final pending buffer", { length: pending.length, preview: pending.substring(0, 100) });
        
        // Try to parse it as a complete event
        const finalParsed = parseSseEvents(pending);
        
        // Process any complete events found
        for (const event of finalParsed.events) {
          eventCount++;
          receivedAnyEvent = true;

          logDebug(`Final event #${eventCount}`, {
            type: event.event,
            done: event.done,
            hasText: !!event.text
          });

          if (event.error) {
            logError(`Error in final event`, event.error);
            onError?.(event.error);
          }

          if (event.text) {
            totalTokensReceived += event.text.length;
            logInfo(`Token received in final event`, {
              tokenLength: event.text.length,
              totalLength: totalTokensReceived
            });
            onToken(event.text, event);
          }
        }

        // If there's still unparsed data after final attempt, treat it as raw text
        if (finalParsed.pending.trim()) {
          const finalEvent = normalizeStreamEvent(finalParsed.pending);
          if (finalEvent) {
            eventCount++;
            receivedAnyEvent = true;

            logDebug(`Fallback final event #${eventCount}`, {
              type: finalEvent.event,
              done: finalEvent.done
            });

            if (finalEvent.error) {
              logError(`Error in fallback final event`, finalEvent.error);
              onError?.(finalEvent.error);
            }

            if (finalEvent.text) {
              totalTokensReceived += finalEvent.text.length;
              logInfo(`Token received in fallback final event`, {
                tokenLength: finalEvent.text.length
              });
              onToken(finalEvent.text, finalEvent);
            }
          } else {
            logDebug("Final pending data could not be parsed as SSE event");
            const rawText = finalParsed.pending.trim();
            if (rawText && !rawText.startsWith("{") && !rawText.startsWith("[")) {
              // Only treat non-JSON text as raw content
              totalTokensReceived += rawText.length;
              onToken(rawText, { done: true, event: "message" });
              receivedAnyEvent = true;
            }
          }
        }
      }

      if (!receivedAnyEvent) {
        logError("No events received", "Stream was empty");
        throw new Error("The assistant returned an invalid empty stream.");
      }

      logInfo("✅ Stream processing completed successfully", {
        totalTokensReceived,
        eventCount
      });
    } finally {
      logInfo("Releasing reader lock");
      try {
        reader.releaseLock();
      } catch (releaseError) {
        logWarn("Error releasing reader lock", releaseError);
      }
    }
  } catch (error) {
    if (requestSignal.aborted) {
      const reasonName = requestSignal.reason?.name;
      logWarn("Request was aborted", reasonName);

      if (reasonName === "TimeoutError") {
        logError("Request timeout", "Took longer than 30 seconds");
        throw new Error("The assistant took too long to respond. Please try again.");
      }

      throw new DOMException("Request aborted.", "AbortError");
    }

    const errorMsg = error instanceof Error ? error.message : String(error);
    logError("Stream processing failed", errorMsg);
    
    // Provide more specific error messages based on the error type
    let userFriendlyError = errorMsg;
    if (errorMsg.includes("Failed to read stream")) {
      userFriendlyError = "Connection lost while receiving response. Please try again.";
    } else if (errorMsg.includes("Failed to decode stream")) {
      userFriendlyError = "Response data was corrupted. Please try again.";
    } else if (errorMsg.includes("invalid empty stream")) {
      userFriendlyError = "Server returned an empty response. Please try again.";
    } else if (errorMsg.includes("Streaming is not supported")) {
      userFriendlyError = "Your browser doesn't support streaming. Please use a modern browser.";
    }
    
    throw new Error(userFriendlyError);
  } finally {
    cleanup();
    logInfo("🏁 streamChatbotResponse cleanup completed");
  }
}

export { FALLBACK_ERROR_MESSAGE, REQUEST_TIMEOUT_MS, logDebug, logError, logInfo, logWarn };
