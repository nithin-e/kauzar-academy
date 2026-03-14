import { SIDEBAR_SECTIONS } from "../constants/chat";

interface SidebarProps {
  open: boolean;
  onNewChat: () => void;
  onSelectPrompt: (text: string) => void;
  searchValue: string;
  onSearchChange: (value: string) => void;
}

export default function Sidebar({ open, onNewChat, onSelectPrompt, searchValue, onSearchChange }: SidebarProps) {
  return (
    <aside
      className={`flex-shrink-0 flex flex-col bg-gray-300/90 border-r border-gray-400
        transition-all duration-300 ease-in-out overflow-hidden
        ${open ? "w-[260px]" : "w-0"}`}
    >
      {/* Logo area */}
      <div className="px-5 py-5 border-b border-gray-400">
        <div className="flex items-center gap-3">
          <img
            src="/kauzar-logo.png"
            alt="Kauzar Academy"
            className="h-10 w-auto object-contain flex-shrink-0"
          />
        </div>
      </div>

      {/* Search */}
      <div className="px-4 pt-4 pb-2">
        <div className="flex items-center gap-2 bg-gray-200/80 border border-gray-400 rounded-xl px-3 py-2.5 group focus-within:border-amber-500/70 transition-colors">
          <svg className="w-3.5 h-3.5 text-gray-600 group-focus-within:text-amber-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            value={searchValue}
            onChange={(e) => onSearchChange(e.target.value)}
            className="bg-transparent text-xs text-gray-700 placeholder-gray-500 outline-none w-full"
            placeholder="Search prompts..."
          />
        </div>
      </div>

      {/* New Chat */}
      <div className="px-4 pb-3">
        <button
          onClick={onNewChat}
          className="w-full flex items-center gap-2.5 text-xs text-gray-700 hover:text-amber-700
            hover:bg-gray-200 px-3 py-2.5 rounded-xl transition-all border border-gray-400
            hover:border-amber-500/50 group"
        >
          <span className="w-5 h-5 rounded-lg bg-gray-200 group-hover:bg-amber-100 flex items-center justify-center text-sm transition-colors border border-gray-400">+</span>
          <span className="font-medium">New Chat</span>
        </button>
      </div>

      {/* Sections */}
      <div className="flex-1 overflow-y-auto px-4 pb-6 space-y-5">
        {Object.entries(SIDEBAR_SECTIONS).map(([section, items]) => (
          <div key={section}>
            <div className="flex items-center gap-2 px-1 py-1 mb-2">
              <span className="text-[10px]">
                {section === "Countries"
                  ? "🌐"
                  : section === "Universities"
                    ? "🎓"
                    : section === "Scholarships"
                      ? "💰"
                      : section === "Career & Guidance"
                        ? "📖"
                        : "📄"}
              </span>
              <span className="text-[10px] font-semibold text-gray-600 uppercase tracking-widest">{section}</span>
            </div>
            {items.map((item) => (
              <button
                key={item}
                onClick={() => onSelectPrompt(item)}
                className="w-full text-left px-3 py-2 text-xs text-gray-700 hover:text-gray-900
                  hover:bg-gray-200 rounded-lg transition-all truncate block mb-0.5
                  hover:border-l-2 hover:border-amber-500 hover:pl-2.5"
              >
                {item}
              </button>
            ))}
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="px-4 py-4 border-t border-gray-400">
        <a href="tel:+919656349000" className="flex items-center gap-2.5 text-xs text-gray-700 hover:text-amber-700 transition-colors group">
          <div className="w-7 h-7 rounded-lg bg-amber-100/90 group-hover:bg-amber-200/90 flex items-center justify-center transition-colors">
            <span className="text-amber-600 text-[11px]">📞</span>
          </div>
          <div>
            <div className="text-[10px] text-gray-600">Free Counselling</div>
            <div className="text-amber-600 font-semibold">+91 96563 49000</div>
          </div>
        </a>
      </div>
    </aside>
  );
}
