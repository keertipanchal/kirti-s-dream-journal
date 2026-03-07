import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import { getRandomQuote } from "@/lib/quotes";
import { useState } from "react";
import { RefreshCw, Sparkles, BookOpen, PenLine } from "lucide-react";

const sections = [
  { path: "/foods", emoji: "🍕", label: "Foods I Love" },
  { path: "/dream-places", emoji: "✈️", label: "Dream Places" },
  { path: "/traits", emoji: "🚫", label: "Traits I Avoid" },
  { path: "/activities", emoji: "🎨", label: "Activities" },
  { path: "/dislikes", emoji: "😤", label: "Don't Like" },
  { path: "/loves", emoji: "💖", label: "Things I Love" },
  { path: "/new-words", emoji: "📚", label: "New Words" },
  { path: "/compliments", emoji: "🥰", label: "Compliments" },
  { path: "/happiness", emoji: "☀️", label: "Happiness" },
  { path: "/look-forward", emoji: "🌟", label: "Look Forward" },
  { path: "/rules", emoji: "📜", label: "Rule Book" },
  { path: "/one-love", emoji: "⭐", label: "One Love" },
  { path: "/gratitude", emoji: "🙏", label: "Gratitude" },
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
          className="text-3xl md:text-4xl font-handwriting font-bold gradient-text"
        >
          Welcome to Keerti's World 💖
        </motion.h1>
        <p className="text-muted-foreground font-body text-sm">Your cozy corner for self-reflection ✨</p>
      </div>

      {/* Featured: Quote + Diary side by side */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Random Quote Card — highlighted */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="glass-card rounded-2xl p-6 text-center soft-shadow glow-shadow relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-1 gradient-primary" />
          <div className="flex items-center justify-center gap-1.5 mb-3">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-xs font-handwriting text-muted-foreground font-semibold tracking-wide uppercase">✨ Quote of the moment</span>
            <Sparkles className="w-4 h-4 text-primary" />
          </div>
          <p className="text-lg font-handwriting font-bold leading-relaxed mb-4">{quote}</p>
          <button
            onClick={() => setQuote(getRandomQuote())}
            className="inline-flex items-center gap-1.5 text-sm text-primary hover:opacity-70 transition-opacity font-display"
          >
            <RefreshCw className="w-3.5 h-3.5" /> New Quote
          </button>
          <NavLink
            to="/quotes"
            className="block mt-3 text-xs text-muted-foreground hover:text-primary transition-colors font-handwriting"
          >
            <BookOpen className="w-3 h-3 inline mr-1" />
            See all quotes →
          </NavLink>
        </motion.div>

        {/* Daily Diary Card — highlighted */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="glass-card rounded-2xl p-6 text-center soft-shadow glow-shadow relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-1 gradient-primary" />
          <div className="flex items-center justify-center gap-1.5 mb-3">
            <PenLine className="w-4 h-4 text-primary" />
            <span className="text-xs font-handwriting text-muted-foreground font-semibold tracking-wide uppercase">📝 Daily Diary</span>
          </div>
          <p className="text-lg font-handwriting font-bold leading-relaxed mb-2">
            Write your thoughts today ✍️
          </p>
          <p className="text-sm text-muted-foreground mb-4 font-body">
            Capture your feelings, moods & memories
          </p>
          <NavLink
            to="/diary"
            className="inline-flex items-center gap-1.5 gradient-primary text-primary-foreground px-5 py-2 rounded-xl font-display font-semibold text-sm hover:opacity-90 transition-opacity"
          >
            <PenLine className="w-4 h-4" /> Open Diary
          </NavLink>
        </motion.div>
      </div>

      {/* Section Grid */}
      <div>
        <h2 className="font-handwriting text-lg font-bold text-muted-foreground mb-3">📋 My Lists</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {sections.map((section, i) => (
            <motion.div
              key={section.path}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.03 }}
            >
              <NavLink
                to={section.path}
                className="block glass-card rounded-2xl p-4 text-center hover:scale-[1.03] transition-transform soft-shadow group"
              >
                <span className="text-3xl block mb-2 group-hover:animate-wiggle">{section.emoji}</span>
                <span className="text-sm font-handwriting font-semibold leading-tight block">{section.label}</span>
              </NavLink>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default HomePage;