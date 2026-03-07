import { motion } from "framer-motion";
import { Palette } from "lucide-react";
import { useState } from "react";

const themes = [
  { id: "pink", label: "Pink", emoji: "🌸", color: "bg-[hsl(340,65%,65%)]" },
  { id: "night", label: "Night", emoji: "🌙", color: "bg-[hsl(270,60%,30%)]" },
  { id: "pastel", label: "Pastel", emoji: "🍃", color: "bg-[hsl(170,50%,55%)]" },
  { id: "coffee", label: "Coffee", emoji: "☕", color: "bg-[hsl(25,55%,45%)]" },
];

interface ThemeSwitcherProps {
  currentTheme: string;
  onThemeChange: (theme: string) => void;
}

const ThemeSwitcher = ({ currentTheme, onThemeChange }: ThemeSwitcherProps) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="p-2 rounded-xl hover:bg-muted transition-colors"
      >
        <Palette className="w-5 h-5 text-primary" />
      </button>
      {open && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="absolute right-0 top-12 glass-card rounded-xl p-3 z-50 min-w-[160px]"
        >
          {themes.map((t) => (
            <button
              key={t.id}
              onClick={() => { onThemeChange(t.id); setOpen(false); }}
              className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-display transition-colors ${
                currentTheme === t.id ? "bg-primary/10 text-primary" : "hover:bg-muted"
              }`}
            >
              <span className="text-lg">{t.emoji}</span>
              <span>{t.label}</span>
              <div className={`w-3 h-3 rounded-full ${t.color} ml-auto`} />
            </button>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default ThemeSwitcher;
