interface ChatHeaderProps {
  onToggleSidebar: () => void;
}

export default function ChatHeader({ onToggleSidebar }: ChatHeaderProps) {
  return (
    <header className="flex items-center gap-3 px-5 py-4 border-b border-gray-400 bg-gray-300/80 flex-shrink-0">
      <button
        onClick={onToggleSidebar}
        className="p-2 rounded-xl hover:bg-gray-300 transition-colors text-gray-700 hover:text-gray-900"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      <div className="flex items-center gap-2.5">
        <img
          src="/kauzar-logo.png"
          alt="Kauzar Academy"
          className="h-7 w-auto object-contain flex-shrink-0"
        />
        <span className="text-sm font-semibold text-gray-800">Dr expert AI</span>
        <span className="text-[10px] bg-amber-100 text-amber-700 border border-amber-300 px-2 py-0.5 rounded-full font-medium">
          MBBS Guide
        </span>
      </div>

      <div className="ml-auto flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        <span className="text-[10px] text-gray-600">Online</span>
      </div>
    </header>
  );
}
