import { SUGGESTIONS } from "../constants/chat";

interface EmptyStateProps {
  onFillInput: (text: string) => void;
}

export default function EmptyState({ onFillInput }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center px-6 py-10">
      {/* Animated icon */}
      <div className="relative mb-8">
        <div className="w-20 h-20 bg-gray-300 rounded-3xl flex items-center justify-center border border-gray-400 shadow-md">
          <span className="text-4xl text-amber-500">✦</span>
        </div>
        {/* Glow rings */}
        <div className="absolute inset-0 rounded-3xl border border-amber-300/50 scale-110 animate-ping" style={{ animationDuration: "3s" }} />
        <div className="absolute inset-0 rounded-3xl border border-amber-200/60 scale-125" />
      </div>

      <h1 className="text-3xl font-semibold mb-3 text-gray-800">
        Dr expert AI
      </h1>
      <p className="text-gray-600 text-sm max-w-sm mb-2 leading-relaxed">
        Your intelligent guide for studying medicine abroad.
      </p>
      <p className="text-gray-600 text-xs max-w-sm mb-10">
        Ask about admissions, universities, scholarships, or requirements.
      </p>

      {/* Suggestion chips */}
      <div className="flex flex-wrap gap-2.5 justify-center max-w-lg">
        {SUGGESTIONS.map((s) => (
          <button
            key={s}
            onClick={() => onFillInput(s)}
            className="bg-gray-300 border border-gray-400 text-gray-700 text-xs px-4 py-2.5
              rounded-full hover:border-amber-500/70 hover:text-amber-700 hover:bg-amber-100/80
              transition-all hover:shadow-md hover:-translate-y-0.5"
          >
            {s}
          </button>
        ))}
      </div>

      {/* Bottom hint */}
      <div className="mt-12 flex items-center gap-3 text-gray-600 text-xs">
        <span className="w-8 h-px bg-gray-500" />
        <span>Powered by Dr. Expert Edulinks · Kerala</span>
        <span className="w-8 h-px bg-gray-500" />
      </div>
    </div>
  );
}
