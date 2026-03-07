import { NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import {
  UtensilsCrossed, MapPin, UserX, Smile, ThumbsDown, Heart,
  Quote, BookOpen, MessageCircleHeart, Sun, Sparkles, ScrollText,
  Star, PenLine, Flower2, Home
} from "lucide-react";

const navItems = [
  { path: "/", label: "Home", icon: Home, emoji: "🏠" },
  { path: "/foods", label: "Foods I Love", icon: UtensilsCrossed, emoji: "🍕" },
  { path: "/dream-places", label: "Dream Places", icon: MapPin, emoji: "✈️" },
  { path: "/traits", label: "Traits I Avoid", icon: UserX, emoji: "🚫" },
  { path: "/activities", label: "Activities I Enjoy", icon: Smile, emoji: "🎨" },
  { path: "/dislikes", label: "Things I Don't Like", icon: ThumbsDown, emoji: "😤" },
  { path: "/loves", label: "Things I Love", icon: Heart, emoji: "💖" },
  { path: "/quotes", label: "Inspiring Quotes", icon: Quote, emoji: "💬" },
  { path: "/new-words", label: "New Words", icon: BookOpen, emoji: "📚" },
  { path: "/compliments", label: "Compliments", icon: MessageCircleHeart, emoji: "🥰" },
  { path: "/happiness", label: "Happiness List", icon: Sun, emoji: "☀️" },
  { path: "/look-forward", label: "Look Forward To", icon: Sparkles, emoji: "🌟" },
  { path: "/rules", label: "My Rule Book", icon: ScrollText, emoji: "📜" },
  { path: "/one-love", label: "One Thing I Love", icon: Star, emoji: "⭐" },
  { path: "/diary", label: "Daily Diary", icon: PenLine, emoji: "📝" },
  { path: "/gratitude", label: "Gratitude Journal", icon: Flower2, emoji: "🙏" },
];

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

const Sidebar = ({ open, onClose }: SidebarProps) => {
  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex flex-col w-64 bg-sidebar border-r border-sidebar-border h-screen sticky top-0 overflow-y-auto">
        <div className="p-4 border-b border-sidebar-border">
          <h2 className="font-display font-bold text-lg gradient-text">Kirti's World ✨</h2>
        </div>
        <nav className="flex-1 p-2 space-y-0.5">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/"}
              className={({ isActive }) =>
                `flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-body transition-all ${
                  isActive
                    ? "bg-sidebar-accent text-sidebar-primary font-semibold"
                    : "text-sidebar-foreground hover:bg-sidebar-accent/50"
                }`
              }
            >
              <span className="text-base">{item.emoji}</span>
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* Mobile sidebar overlay */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-40 lg:hidden"
            />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: "spring", damping: 25 }}
              className="fixed left-0 top-0 w-72 h-full bg-sidebar z-50 flex flex-col lg:hidden overflow-y-auto"
            >
              <div className="p-4 flex items-center justify-between border-b border-sidebar-border">
                <h2 className="font-display font-bold text-lg gradient-text">Kirti's World ✨</h2>
                <button onClick={onClose} className="p-1 rounded-lg hover:bg-sidebar-accent">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <nav className="flex-1 p-2 space-y-0.5">
                {navItems.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    end={item.path === "/"}
                    onClick={onClose}
                    className={({ isActive }) =>
                      `flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-body transition-all ${
                        isActive
                          ? "bg-sidebar-accent text-sidebar-primary font-semibold"
                          : "text-sidebar-foreground hover:bg-sidebar-accent/50"
                      }`
                    }
                  >
                    <span className="text-base">{item.emoji}</span>
                    <span>{item.label}</span>
                  </NavLink>
                ))}
              </nav>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;
