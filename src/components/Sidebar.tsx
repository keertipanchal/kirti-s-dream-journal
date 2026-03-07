import { NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

const navItems = [
  { path: "/", label: "Home", emoji: "🏠" },
  { path: "/foods", label: "Foods I Love", emoji: "🍕" },
  { path: "/dream-places", label: "Dream Places", emoji: "✈️" },
  { path: "/traits", label: "Traits I Avoid", emoji: "🚫" },
  { path: "/activities", label: "Activities", emoji: "🎨" },
  { path: "/dislikes", label: "Don't Like", emoji: "😤" },
  { path: "/loves", label: "Things I Love", emoji: "💖" },
  { path: "/quotes", label: "Quotes", emoji: "💬" },
  { path: "/new-words", label: "New Words", emoji: "📚" },
  { path: "/compliments", label: "Compliments", emoji: "🥰" },
  { path: "/happiness", label: "Happiness", emoji: "☀️" },
  { path: "/look-forward", label: "Look Forward", emoji: "🌟" },
  { path: "/rules", label: "Rule Book", emoji: "📜" },
  { path: "/one-love", label: "One Love", emoji: "⭐" },
  { path: "/diary", label: "Daily Diary", emoji: "📝" },
  { path: "/gratitude", label: "Gratitude", emoji: "🙏" },
];

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

const NavItems = ({ onClick }: { onClick?: () => void }) => (
  <nav className="flex-1 p-2 space-y-0.5">
    {navItems.map((item) => (
      <NavLink
        key={item.path}
        to={item.path}
        end={item.path === "/"}
        onClick={onClick}
        className={({ isActive }) =>
          `flex items-center gap-2.5 px-3 py-2 rounded-xl text-base font-handwriting transition-all ${
            isActive
              ? "bg-sidebar-accent text-sidebar-primary font-bold scale-[1.02]"
              : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:scale-[1.01]"
          }`
        }
      >
        <span className="text-lg">{item.emoji}</span>
        <span>{item.label}</span>
      </NavLink>
    ))}
  </nav>
);

const Sidebar = ({ open, onClose }: SidebarProps) => {
  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex flex-col w-60 bg-sidebar border-r border-sidebar-border h-screen sticky top-0 overflow-y-auto">
        <div className="p-4 border-b border-sidebar-border">
          <h2 className="font-handwriting font-bold text-xl gradient-text">Keerti's Journal 🌷</h2>
        </div>
        <NavItems />
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
                <h2 className="font-handwriting font-bold text-xl gradient-text">Keerti's Journal 🌷</h2>
                <button onClick={onClose} className="p-1 rounded-lg hover:bg-sidebar-accent">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <NavItems onClick={onClose} />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;