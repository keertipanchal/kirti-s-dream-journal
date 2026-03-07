import { useState } from "react";
import EntryList from "@/components/EntryList";
import { getRandomQuote } from "@/lib/quotes";
import { RefreshCw, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const QuotesPage = () => {
  const [randomQuote, setRandomQuote] = useState(getRandomQuote());

  return (
    <div className="space-y-6">
      {/* Random quote generator — prominent */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card rounded-2xl p-6 text-center soft-shadow glow-shadow relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-1.5 gradient-primary" />
        <div className="flex items-center justify-center gap-1.5 mb-3">
          <Sparkles className="w-5 h-5 text-primary" />
          <span className="text-sm font-handwriting font-bold text-muted-foreground uppercase tracking-wide">✨ Random Inspiration ✨</span>
          <Sparkles className="w-5 h-5 text-primary" />
        </div>
        <p className="text-xl font-handwriting font-bold leading-relaxed">{randomQuote}</p>
        <button
          onClick={() => setRandomQuote(getRandomQuote())}
          className="mt-4 inline-flex items-center gap-1.5 text-sm text-primary hover:opacity-70 font-display gradient-primary text-primary-foreground px-4 py-2 rounded-xl"
        >
          <RefreshCw className="w-3.5 h-3.5" /> Generate Another ✨
        </button>
      </motion.div>

      <EntryList storageKey="keerti-quotes" title="Quotes That Inspire Me" emoji="💬" placeholder="Add an inspiring quote..." />
    </div>
  );
};

export default QuotesPage;