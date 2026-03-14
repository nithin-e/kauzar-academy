import { useRef, useEffect, forwardRef, useImperativeHandle } from "react";

interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  disabled?: boolean;
}

export interface ChatInputHandle {
  focus: () => void;
}

const ChatInput = forwardRef<ChatInputHandle, ChatInputProps>(function ChatInput(
  { value, onChange, onSend, disabled },
  ref
) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useImperativeHandle(ref, () => ({
    focus: () => textareaRef.current?.focus(),
  }));

  useEffect(() => {
    const ta = textareaRef.current;
    if (ta) {
      ta.style.height = "auto";
      ta.style.height = Math.min(ta.scrollHeight, 160) + "px";
    }
  }, [value]);

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  }

  return (
    <div className="px-4 pb-5 pt-3 flex-shrink-0 bg-gray-200 border-t border-gray-300">
      <div className="max-w-3xl mx-auto">
        <div
          className="flex items-end gap-3 bg-gray-300/90 border border-gray-400 rounded-2xl px-4 py-3
            focus-within:border-amber-500/70 focus-within:ring-1 focus-within:ring-amber-500/30 transition-all"
        >
          <textarea
            ref={textareaRef}
            rows={1}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Message Dr expert AI..."
            className="flex-1 bg-transparent text-sm text-gray-800 placeholder-gray-500 outline-none
              resize-none leading-relaxed min-h-[24px] max-h-40"
          />

          {/* Mic */}
          <button type="button" className="flex-shrink-0 p-1.5 text-gray-600 hover:text-gray-800 transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
            </svg>
          </button>

          {/* Send */}
          <button
            type="button"
            onClick={onSend}
            disabled={!value.trim() || disabled}
            className={`flex-shrink-0 w-8 h-8 rounded-xl flex items-center justify-center transition-all
              ${value.trim() && !disabled
                ? "bg-amber-500 text-white hover:bg-amber-600 shadow-sm hover:scale-105"
                : "bg-gray-400 text-gray-500 cursor-not-allowed"
              }`}
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        <p className="text-center text-[10px] text-gray-600 mt-2 tracking-wide">
          Dr Expert AI · drexpertedu.com · Free MBBS Counselling: +91 96563 49000
        </p>
      </div>
    </div>
  );
});

export default ChatInput;
