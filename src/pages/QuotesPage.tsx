import { useState } from "react";
import EntryList from "@/components/EntryList";
import { getRandomQuote } from "@/lib/quotes";
import { RefreshCw, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const QuotesPage = () => {
  const [randomQuote, setRandomQuote] = useState(getRandomQuote());

  return (
    <div className="space-y-6">
      {/* Random quote generator */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card rounded-2xl p-5 text-center soft-shadow"
      >
        <div className="flex items-center justify-center gap-1 mb-2">
          <Sparkles className="w-4 h-4 text-primary" />
          <span className="text-sm font-display text-muted-foreground">Random Inspiration</span>
        </div>
        <p className="text-lg font-display font-semibold">{randomQuote}</p>
        <button
          onClick={() => setRandomQuote(getRandomQuote())}
          className="mt-3 inline-flex items-center gap-1.5 text-sm text-primary hover:opacity-70 font-display"
        >
          <RefreshCw className="w-3.5 h-3.5" /> Generate Another
        </button>
      </motion.div>

      <EntryList storageKey="kirti-quotes" title="Quotes That Inspire Me" emoji="💬" placeholder="Add an inspiring quote..." />
    </div>
  );
};

export default QuotesPage;
