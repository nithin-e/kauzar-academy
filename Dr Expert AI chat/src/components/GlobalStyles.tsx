export default function GlobalStyles() {
  return (
    <style>{`
        * {
          font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          -webkit-font-smoothing: antialiased;
        }
        .font-display { font-family: inherit; }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn { animation: fadeIn 0.3s ease-out forwards; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #e5e7eb; border-radius: 6px; }
        ::-webkit-scrollbar-thumb { background: #9ca3af; border-radius: 6px; }
        ::-webkit-scrollbar-thumb:hover { background: #f59e0b; }
      `}</style>
  );
}
