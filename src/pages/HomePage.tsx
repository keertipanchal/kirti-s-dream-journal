import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import { getRandomQuote } from "@/lib/quotes";
import { useState } from "react";
import { RefreshCw } from "lucide-react";

const sections = [
  { path: "/foods", emoji: "🍕", label: "Foods I Love", color: "from-[hsl(var(--love))] to-[hsl(var(--accent))]" },
  { path: "/dream-places", emoji: "✈️", label: "Dream Places", color: "from-[hsl(var(--calm))] to-[hsl(var(--primary))]" },
  { path: "/traits", emoji: "🚫", label: "Traits I Avoid", color: "from-[hsl(var(--primary))] to-[hsl(var(--love))]" },
  { path: "/activities", emoji: "🎨", label: "Activities I Enjoy", color: "from-[hsl(var(--joy))] to-[hsl(var(--accent))]" },
  { path: "/dislikes", emoji: "😤", label: "Things I Don't Like", color: "from-[hsl(var(--destructive))] to-[hsl(var(--love))]" },
  { path: "/loves", emoji: "💖", label: "Things I Love", color: "from-[hsl(var(--love))] to-[hsl(var(--primary))]" },
  { path: "/quotes", emoji: "💬", label: "Inspiring Quotes", color: "from-[hsl(var(--primary))] to-[hsl(var(--calm))]" },
  { path: "/new-words", emoji: "📚", label: "New Words", color: "from-[hsl(var(--calm))] to-[hsl(var(--joy))]" },
  { path: "/compliments", emoji: "🥰", label: "Compliments", color: "from-[hsl(var(--love))] to-[hsl(var(--joy))]" },
  { path: "/happiness", emoji: "☀️", label: "Happiness List", color: "from-[hsl(var(--joy))] to-[hsl(var(--love))]" },
  { path: "/look-forward", emoji: "🌟", label: "Look Forward To", color: "from-[hsl(var(--accent))] to-[hsl(var(--primary))]" },
  { path: "/rules", emoji: "📜", label: "My Rule Book", color: "from-[hsl(var(--primary))] to-[hsl(var(--accent))]" },
  { path: "/one-love", emoji: "⭐", label: "One Thing I Love", color: "from-[hsl(var(--joy))] to-[hsl(var(--love))]" },
  { path: "/diary", emoji: "📝", label: "Daily Diary", color: "from-[hsl(var(--calm))] to-[hsl(var(--primary))]" },
  { path: "/gratitude", emoji: "🙏", label: "Gratitude Journal", color: "from-[hsl(var(--primary))] to-[hsl(var(--joy))]" },
];

const HomePage = () => {
  const [quote, setQuote] = useState(getRandomQuote());

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
      {/* Welcome */}
      <div className="text-center space-y-2">
        <motion.h1
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-3xl md:text-4xl font-display font-bold gradient-text"
        >
          Welcome to Kirti's World 💖
        </motion.h1>
        <p className="text-muted-foreground font-body">Your cozy corner for self-reflection ✨</p>
      </div>

      {/* Random Quote Card */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="glass-card rounded-2xl p-6 text-center soft-shadow"
      >
        <p className="text-sm text-muted-foreground mb-2 font-display">✨ Quote of the moment</p>
        <p className="text-lg font-display font-semibold leading-relaxed">{quote}</p>
        <button
          onClick={() => setQuote(getRandomQuote())}
          className="mt-3 inline-flex items-center gap-1.5 text-sm text-primary hover:opacity-70 transition-opacity font-display"
        >
          <RefreshCw className="w-3.5 h-3.5" /> New Quote
        </button>
      </motion.div>

      {/* Section Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {sections.map((section, i) => (
          <motion.div
            key={section.path}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04 }}
          >
            <NavLink
              to={section.path}
              className="block glass-card rounded-2xl p-4 text-center hover:scale-[1.03] transition-transform soft-shadow group"
            >
              <span className="text-3xl block mb-2 group-hover:animate-wiggle">{section.emoji}</span>
              <span className="text-xs font-display font-semibold leading-tight block">{section.label}</span>
            </NavLink>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default HomePage;
