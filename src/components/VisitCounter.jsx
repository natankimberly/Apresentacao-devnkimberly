import { useState, useEffect } from "react";
import { Eye } from "lucide-react";

const VisitCounter = () => {
  const [count, setCount] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch current count and Increment behavior
    // Ideally we fetch first to show, then increment? Or just POST to increment+get.
    // Let's do POST to increment and get the new value.

    const updateCount = async () => {
      // Check if already visited this session?
      // For a simple 'hit counter', we count every reload (like the external API did).
      try {
        // If we want to simple view: GET /api/visits
        // If we want to increment: POST /api/visits

        // Let's increment on mount
        const res = await fetch("/api/visits", { method: "POST" });
        if (!res.ok) throw new Error("Failed to increment");
        const data = await res.json();
        setCount(data.count);
        setLoading(false);
      } catch {
        // Silent fail in production/browser console to keep it clean
        setLoading(false);
      }
    };

    updateCount();
  }, []);

  if (loading)
    return (
      <div className="h-6 w-16 bg-slate-800/50 rounded animate-pulse"></div>
    );

  // If error/local dev without API, show fallback or 0
  const displayCount = count !== null ? count.toLocaleString() : "---";

  return (
    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/50 border border-white/5 text-slate-400 text-xs font-mono ml-0 md:ml-4 mt-2 md:mt-0">
      <Eye size={12} className="text-cyan-500" />
      <span>{displayCount} visualizações</span>
    </div>
  );
};

export default VisitCounter;
