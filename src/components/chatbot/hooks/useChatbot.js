import { useCallback, useEffect, useRef, useState } from "react";
import {
  FALLBACK_ERROR_MESSAGE,
  getChatSessionId,
  getTwinId,
  sendChatMessage,
  streamChatMessage,
  logError,
  logInfo,
} from "../api/chatbotApi";

const VISITOR_EMAIL = "anonymous@visitor.internal";

const createMessage = (role, content, citations = []) => ({
  id: `${role}-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
  role,
  content,
  citations,
});

const initialMessages = [
  createMessage(
    "assistant",
    "Hi, I'm your portfolio AI assistant. Ask me about projects, skills, experience, or anything you'd like to explore."
  ),
];

const PRESET_INSTANT_RESPONSES = {
  "AI projects": `- **AI Search Visibility Platform (AEO/GEO)**: Method definition and product requirements for AI visibility audits across ChatGPT, Gemini, and Perplexity.\n\n- **Export Process Automations**: Process mapping and 5 automations for quotation and production reporting at Appu International.\n\n- **Tech Trekkers Suite Strategy**: Product definition across NeoScript, NexEstate, and NetTwin.\n\n[Explore Selected Work](#projects)`,

  "Tech stack": `- **Analysis & Delivery**: Requirements elicitation, user stories, acceptance criteria with failure cases, process mapping, SOP authoring, Jira, ClickUp.\n\n- **AI Solution Design**: Use-case discovery & prioritisation, RAG & agent workflows, human-in-the-loop design, model selection across Anthropic, OpenAI, Gemini, and Azure OpenAI.\n\n- **Tools & Enablement**: n8n workflow design & review, data modelling for PostgreSQL & MongoDB, Microsoft Excel.\n\n[View Skills](#skills)`,

  "Experience": `AI Business Analyst with 15 engagements for 10 clients across six industries at Teeny Tech Trek. Currently an AI-Powered Digital Marketing Consultant at APT Growth Digital in Toronto, and previously Project Manager at Appu International leading process automations and export operations. [Read More](#experience)`,

  "Download Resume": `Anisha's resume is available upon request. Feel free to request it via email at anishasingla23@gmail.com!`,

  "Contact": `You can reach me directly via email at anishasingla23@gmail.com or connect with me on LinkedIn at linkedin.com/in/singlaanisha. Open to AI Business Analyst, AI Implementation, and AI Enablement roles! [Get in Touch](#contact)`,

  "🎬 Know Me in 64s": {
    type: "video",
    url: "https://arbgtqtruugewk5g.public.blob.vercel-storage.com/AboutUsVideo/AboutMe.mp4",
    caption: "A quick 64-second intro — who I am and what I build. 🎥",
  },
};

// Shown as a follow-up assistant bubble right after the "Know Me in 64s"
// video takeover is closed, in place of the old behavior of just falling
// back to the plain chat view.
const POST_VIDEO_CTA_CONTENT = {
  type: "post-video-cta",
  title: "Thanks for watching my intro! 🎬",
  subtitle: "Would you like to know more about me?",
  buttonLabel: "Know More About Me",
};


export function useChatbot() {
  const [messages, setMessages] = useState(initialMessages);
  const [isOpen, setIsOpen] = useState(false);
  // `isStreaming` is true while tokens are flowing — drives typing indicator
  // and disabled input state. Stays true even between stream start and first
  // token so the UI never shows a blank window.
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState("");
  const viewportRef = useRef(null);
  const abortControllerRef = useRef(null);
  // Track the ID of the currently-streaming assistant bubble so ChatShell
  // can show the blinking cursor on the right bubble.
  const streamingBubbleIdRef = useRef(null);

  // Resolve the twin and its stable session id once on mount.
  const twinIdRef = useRef(getTwinId());
  const sessionIdRef = useRef(getChatSessionId(twinIdRef.current));

  // ── Typewriter queue ────────────────────────────────────────────────────
  // Split tokens into individual words and queue them for smooth 20ms rendering
  const typewriterQueue = useRef([]);
  const typewriterTimer = useRef(null);
  const TYPEWRITER_MS = 20;

  const startTypewriter = (targetId) => {
    if (typewriterTimer.current !== null) return;

    const tick = () => {
      if (typewriterQueue.current.length === 0) {
        typewriterTimer.current = null;
        return;
      }
      const word = typewriterQueue.current.shift();
      setMessages((current) =>
        current.map((msg) =>
          msg.id === targetId ? { ...msg, content: (msg.content || "") + word } : msg
        )
      );
      typewriterTimer.current = setTimeout(tick, TYPEWRITER_MS);
    };

    typewriterTimer.current = setTimeout(tick, TYPEWRITER_MS);
  };

  const stopTypewriter = () => {
    if (typewriterTimer.current !== null) {
      clearTimeout(typewriterTimer.current);
      typewriterTimer.current = null;
    }
    typewriterQueue.current = [];
  };

  // Was a bare call in the hook body, which re-ran (with object
  // serialization) on every render — including the ~50/sec re-renders that
  // happen while a reply is streaming in via the typewriter below. Mount-only
  // now that it's in an effect.
  useEffect(() => {
    logInfo("Hook initialized", { twinId: twinIdRef.current, sessionId: sessionIdRef.current });
  }, []);

  const scrollToBottom = (smooth = true) => {
    if (!viewportRef.current) return;
    requestAnimationFrame(() => {
      if (!viewportRef.current) return;
      viewportRef.current.scrollTo({
        top: viewportRef.current.scrollHeight,
        behavior: smooth ? "smooth" : "auto",
      });
    });
  };

  useEffect(() => {
    scrollToBottom(true);
  }, [messages, isStreaming]);


  useEffect(() => {
    return () => {
      stopTypewriter();
      abortControllerRef.current?.abort();
    };
  }, []);

  // Stable identities so consumers holding onto these (AssistantLayout,
  // PhoneFrame, ChatShell) don't see a "changed" prop on every render.
  const openChat = useCallback(() => setIsOpen(true), []);
  const closeChat = useCallback(() => setIsOpen(false), []);
  const toggleChat = useCallback(() => setIsOpen((current) => !current), []);

  // Called by ChatShell right after the video takeover's close (X) button is
  // clicked: strips the video message out of history entirely (so it can't
  // reappear as an inline bubble once the takeover overlay is gone) and
  // appends the "Thanks for watching!" follow-up bubble in its place. The
  // video only comes back if the user explicitly reopens the intro preset.
  const closeIntroVideo = useCallback(() => {
    setMessages((current) => [
      ...current.filter((msg) => !(msg.content && typeof msg.content === "object" && msg.content.type === "video")),
      createMessage("assistant", POST_VIDEO_CTA_CONTENT),
    ]);
    scrollToBottom(true);
  }, []);

  // sendMessage(input)              — normal typed message
  // sendMessage(query, displayText) — chip: query goes to API, displayText shown in bubble
  const sendMessage = async (input, displayText) => {
    const trimmedMessage = input.trim();
    // What shows in the user's bubble — either the display override or the raw input
    const bubbleText = (displayText || trimmedMessage).trim();

    if (!trimmedMessage || isStreaming) {
      return;
    }

    // Zero-latency instant path for preset chips. Content may be plain
    // markdown text or a structured object (e.g. { type: "video", ... }).
    const instantContent = PRESET_INSTANT_RESPONSES[displayText] || PRESET_INSTANT_RESPONSES[trimmedMessage];
    if (instantContent) {
      setIsOpen(true);
      setError("");
      setIsStreaming(false);
      const userMsg = createMessage("user", bubbleText);
      const assistantMsg = createMessage("assistant", instantContent);
      setMessages((current) => [...current, userMsg, assistantMsg]);
      scrollToBottom(true);
      return;
    }

    // Abort any previous in-flight request.
    abortControllerRef.current?.abort();
    const controller = new AbortController();
    abortControllerRef.current = controller;

    const userMessage = createMessage("user", bubbleText);
    const assistantMessage = createMessage("assistant", "");

    setError("");
    setIsOpen(true);
    setIsStreaming(true);
    streamingBubbleIdRef.current = assistantMessage.id;
    setMessages((current) => [...current, userMessage, assistantMessage]);


    try {
      // ── Streaming path ──────────────────────────────────────────────────── //
      const stream = await streamChatMessage({
        twinId: twinIdRef.current,
        userEmail: VISITOR_EMAIL,
        sessionId: sessionIdRef.current,
        messages: [{ role: "user", content: trimmedMessage }],
        signal: controller.signal,
      });

      let gotAny = false;
      let finalReply = "";
      let finalCitations = [];

      stopTypewriter();
      for await (const event of stream) {
        if (controller.signal.aborted) break;

        if (!event.done) {
          // Token chunk — split into words and queue for smooth 20ms typing
          gotAny = true;
          const words = event.text.match(/\S+\s*/g) || [event.text];
          for (const word of words) {
            typewriterQueue.current.push(word);
          }
          startTypewriter(assistantMessage.id);
        } else {
          // Done frame — set canonical full reply
          finalReply = event.reply || "";
          finalCitations = event.citations || [];
        }
      }

      if (finalReply) {
        // Wait for typewriter queue to finish draining
        await new Promise((resolve) => {
          const wait = () => {
            if (typewriterQueue.current.length === 0 && typewriterTimer.current === null) resolve();
            else setTimeout(wait, 16);
          };
          wait();
        });
        setMessages((current) =>
          current.map((msg) =>
            msg.id === assistantMessage.id
              ? { ...msg, content: finalReply, citations: finalCitations }
              : msg
          )
        );
      } else if (!gotAny) {
        // Nothing streamed — fall through to non-streaming fallback below.
        stopTypewriter();
        throw Object.assign(new Error("no_tokens"), { streamedAny: false });
      }

    } catch (streamError) {
      if (streamError?.name === "AbortError") return;

      logError("Stream failed; trying non-streaming fallback", streamError);

      // ── Non-streaming fallback ─────────────────────────────────────────── //
      try {
        const data = await sendChatMessage({
          twinId: twinIdRef.current,
          userEmail: VISITOR_EMAIL,
          sessionId: sessionIdRef.current,
          messages: [{ role: "user", content: trimmedMessage }],
          signal: controller.signal,
        });

        const reply =
          (typeof data.reply === "string" && data.reply.trim()) ||
          "I couldn't generate a response just yet. Please try again.";
        const citations = Array.isArray(data.citations) ? data.citations : [];

        setMessages((current) =>
          current.map((msg) =>
            msg.id === assistantMessage.id
              ? { ...msg, content: reply, citations }
              : msg
          )
        );
      } catch (fallbackError) {
        if (fallbackError?.name === "AbortError") return;

        logError("Fallback also failed", fallbackError);
        const displayMessage = fallbackError?.message || FALLBACK_ERROR_MESSAGE;
        setError(displayMessage);
        setMessages((current) =>
          current.map((msg) =>
            msg.id === assistantMessage.id
              ? { ...msg, content: displayMessage }
              : msg
          )
        );
      }
    } finally {
      if (!controller.signal.aborted) {
        const waitAndCleanup = async () => {
          if (typewriterQueue.current.length > 0 || typewriterTimer.current !== null) {
            await new Promise((resolve) => {
              const wait = () => {
                if (typewriterQueue.current.length === 0 && typewriterTimer.current === null) resolve();
                else setTimeout(wait, 16);
              };
              wait();
            });
          }
          abortControllerRef.current = null;
          streamingBubbleIdRef.current = null;
          setIsStreaming(false);
        };
        waitAndCleanup();
      }
    }
  };

  return {
    closeChat,
    error,
    isOpen,
    isStreaming,
    closeIntroVideo,
    messages,
    openChat,
    scrollToBottom,
    sendMessage,
    streamingBubbleIdRef,
    toggleChat,
    viewportRef,
  };
}
