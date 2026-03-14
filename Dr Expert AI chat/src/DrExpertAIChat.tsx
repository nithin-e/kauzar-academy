import { useState, useRef, useEffect } from "react";
import GlobalStyles from "./components/GlobalStyles";
import Sidebar from "./components/Sidebar";
import ChatHeader from "./components/ChatHeader";
import EmptyState from "./components/EmptyState";
import ChatInput, { type ChatInputHandle } from "./components/ChatInput";
import MessageBubble from "./components/MessageBubble";
import SignUpModal, { getStoredSignUpData } from "./components/SignUpModal";
import TypingDots from "./components/TypingDots";

const API_URL = "https://api.anthropic.com/v1/messages";
const SYSTEM_PROMPT = `You are Dr Expert AI, a warm and knowledgeable guide for Indian students planning to study MBBS abroad.
You represent Dr. Expert Edulinks — Kerala's #1 trusted MBBS abroad consultancy.
Help students with: admission requirements, best countries, university fees, scholarships, visa processes,
MCI/NMC-approved universities, FMGE/NEXT exam prep, documents needed, and step-by-step application guidance.
Be concise, friendly, and encouraging. Use bullet points when listing options.
When appropriate, suggest students call +91 96563 49000 for free personalized counselling.
Never make up specific fee amounts — say "fees vary" and recommend they contact us for accurate figures.`;

interface Message {
  role: string;
  content: string;
}

export default function DrExpertAIChat() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [sidebarSearch, setSidebarSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [newMsgIndex, setNewMsgIndex] = useState(-1);
  const [signUpOpen, setSignUpOpen] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<ChatInputHandle>(null);

  function fillInput(text: string) {
    setInput(text);
    setSidebarSearch(text);
    inputRef.current?.focus();
  }

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  async function sendMessage(text?: string) {
    const userText = (text ?? input).trim();
    if (!userText || loading) return;

    const newMessages: Message[] = [...messages, { role: "user", content: userText }];
    setMessages(newMessages);
    setNewMsgIndex(newMessages.length - 1);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: SYSTEM_PROMPT,
          messages: newMessages,
        }),
      });

      const data = await response.json();
      const aiText =
        data.content?.find((b: { type: string }) => b.type === "text")?.text ||
        "I'm having trouble responding right now. Please try again or call us at +91 96563 49000.";

      const finalMessages: Message[] = [...newMessages, { role: "assistant", content: aiText }];
      setMessages(finalMessages);
      setNewMsgIndex(finalMessages.length - 1);
    } catch {
      setMessages([
        ...newMessages,
        { role: "assistant", content: "Connection error. Please try again or call +91 96563 49000." },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function handleSendClick() {
    const trimmed = input.trim();
    if (!trimmed || loading) return;
    if (getStoredSignUpData()) {
      sendMessage();
    } else {
      setSignUpOpen(true);
    }
  }

  function handleSignUpClose() {
    setSignUpOpen(false);
    sendMessage();
  }

  return (
    <>
      <GlobalStyles />

      <SignUpModal isOpen={signUpOpen} onClose={handleSignUpClose} />

      <div className="flex h-screen bg-gray-200 text-gray-800 overflow-hidden">
        <Sidebar
          open={sidebarOpen}
          onNewChat={() => setMessages([])}
          onSelectPrompt={fillInput}
          searchValue={sidebarSearch}
          onSearchChange={setSidebarSearch}
        />

        <div className="flex-1 flex flex-col min-w-0">
          <ChatHeader onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

          {/* Chat area */}
          <div className="flex-1 overflow-y-auto">
            {messages.length === 0 ? (
              <EmptyState onFillInput={fillInput} />
            ) : (
              <div className="max-w-3xl mx-auto px-4 py-8">
                {messages.map((msg, i) => (
                  <MessageBubble key={i} msg={msg} isNew={i === newMsgIndex} />
                ))}
                {loading && (
                  <div className="flex gap-3 mb-6">
                    <div className="w-9 h-9 rounded-xl bg-amber-500 flex items-center justify-center text-white flex-shrink-0 shadow-sm">
                      ✦
                    </div>
                    <div className="bg-gray-300/80 rounded-2xl rounded-tl-sm border border-gray-400">
                      <TypingDots />
                    </div>
                  </div>
                )}
                <div ref={bottomRef} />
              </div>
            )}
          </div>

          <ChatInput
            ref={inputRef}
            value={input}
            onChange={setInput}
            onSend={handleSendClick}
            disabled={loading}
          />
        </div>
      </div>
    </>
  );
}
