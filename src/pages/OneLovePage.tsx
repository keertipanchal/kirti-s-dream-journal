import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Heart, Pencil, Check } from "lucide-react";

const OneLovePage = () => {
  const [text, setText] = useState("");
  const [editing, setEditing] = useState(false);
  const [editVal, setEditVal] = useState("");

  useEffect(() => {
    setText(localStorage.getItem("keerti-one-love") || "");
  }, []);

  const save = () => {
    localStorage.setItem("keerti-one-love", editVal);
    setText(editVal);
    setEditing(false);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div className="flex items-center gap-2">
        <span className="text-2xl">⭐</span>
        <h2 className="text-2xl font-handwriting font-bold">The One Thing I Love Most</h2>
      </div>

      <div className="glass-card rounded-2xl p-8 text-center soft-shadow glow-shadow">
        <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity }}>
          <Heart className="w-12 h-12 text-love mx-auto mb-4" fill="hsl(var(--love))" />
        </motion.div>

        {editing ? (
          <div className="space-y-3">
            <textarea
              value={editVal}
              onChange={(e) => setEditVal(e.target.value)}
              className="w-full p-3 bg-muted/50 border border-border rounded-xl text-center font-handwriting text-lg focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none"
              rows={3}
              autoFocus
              placeholder="What's the one thing you love most in the world?"
            />
            <button onClick={save} className="gradient-primary text-primary-foreground px-6 py-2 rounded-xl font-display font-semibold inline-flex items-center gap-1">
              <Check className="w-4 h-4" /> Save
            </button>
          </div>
        ) : (
          <div>
            {text ? (
              <p className="text-xl font-handwriting font-bold gradient-text leading-relaxed">{text}</p>
            ) : (
              <p className="text-muted-foreground font-body">Click edit to add your most loved thing ✨</p>
            )}
            <button
              onClick={() => { setEditing(true); setEditVal(text); }}
              className="mt-4 text-sm text-primary hover:opacity-70 font-display inline-flex items-center gap-1"
            >
              <Pencil className="w-3.5 h-3.5" /> Edit
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default OneLovePage;