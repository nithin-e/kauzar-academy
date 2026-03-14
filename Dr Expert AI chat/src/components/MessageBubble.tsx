interface Message {
  role: string;
  content: string;
}

interface MessageBubbleProps {
  msg: Message;
  isNew?: boolean;
}

export default function MessageBubble({ msg, isNew }: MessageBubbleProps) {
  const isUser = msg.role === "user";
  return (
    <div
      className={`flex gap-3 mb-6 ${isUser ? "flex-row-reverse" : "flex-row"}
        ${isNew ? "animate-fadeIn" : ""}`}
    >
      {/* Avatar */}
      <div
        className={`flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center text-sm font-semibold shadow-sm
          ${isUser
            ? "bg-amber-500 text-white"
            : "bg-gray-300 border-2 border-amber-400 text-amber-600"
          }`}
      >
        {isUser ? "U" : "✦"}
      </div>

      {/* Bubble */}
      <div
        className={`max-w-[72%] rounded-2xl px-5 py-3.5 text-sm leading-relaxed whitespace-pre-wrap
          ${isUser
            ? "bg-amber-500 text-white rounded-tr-sm font-semibold shadow-sm"
            : "bg-gray-300 text-gray-800 rounded-tl-sm border border-gray-400 shadow-sm"
          }`}
      >
        {msg.content}
      </div>
    </div>
  );
}
