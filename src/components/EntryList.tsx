import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Pencil, Trash2, Star, Search, X, Check } from "lucide-react";
import {
  getEntries, addEntry, updateEntry, deleteEntry, toggleFavorite, Entry,
} from "@/lib/storage";

interface EntryListProps {
  storageKey: string;
  title: string;
  emoji: string;
  placeholder?: string;
  showSearch?: boolean;
}

const EntryList = ({ storageKey, title, emoji, placeholder = "Add something...", showSearch = true }: EntryListProps) => {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [newText, setNewText] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState("");
  const [search, setSearch] = useState("");
  const [showFavOnly, setShowFavOnly] = useState(false);

  const reload = () => setEntries(getEntries(storageKey));
  useEffect(reload, [storageKey]);

  const filtered = useMemo(() => {
    let list = entries;
    if (showFavOnly) list = list.filter((e) => e.favorite);
    if (search) list = list.filter((e) => e.text.toLowerCase().includes(search.toLowerCase()));
    return list;
  }, [entries, search, showFavOnly]);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newText.trim()) return;
    addEntry(storageKey, newText.trim());
    setNewText("");
    reload();
  };

  const handleUpdate = (id: string) => {
    if (!editText.trim()) return;
    updateEntry(storageKey, id, editText.trim());
    setEditingId(null);
    reload();
  };

  const handleDelete = (id: string) => {
    deleteEntry(storageKey, id);
    reload();
  };

  const handleToggleFav = (id: string) => {
    toggleFavorite(storageKey, id);
    reload();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4"
    >
      {/* Header */}
      <div className="flex items-center gap-2 mb-2">
        <span className="text-2xl">{emoji}</span>
        <h2 className="text-2xl font-display font-bold">{title}</h2>
      </div>

      {/* Search & Filter */}
      {showSearch && (
        <div className="flex items-center gap-2">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search..."
              className="w-full pl-9 pr-3 py-2 bg-muted/50 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 font-body"
            />
          </div>
          <button
            onClick={() => setShowFavOnly(!showFavOnly)}
            className={`p-2 rounded-xl border transition-colors ${
              showFavOnly ? "bg-primary/10 border-primary text-primary" : "border-border hover:bg-muted"
            }`}
          >
            <Star className="w-4 h-4" fill={showFavOnly ? "currentColor" : "none"} />
          </button>
        </div>
      )}

      {/* Add form */}
      <form onSubmit={handleAdd} className="flex gap-2">
        <input
          value={newText}
          onChange={(e) => setNewText(e.target.value)}
          placeholder={placeholder}
          className="flex-1 px-4 py-2.5 bg-card border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 font-body soft-shadow"
        />
        <button
          type="submit"
          className="gradient-primary text-primary-foreground px-4 py-2.5 rounded-xl font-display font-semibold text-sm hover:opacity-90 transition-opacity flex items-center gap-1"
        >
          <Plus className="w-4 h-4" /> Add
        </button>
      </form>

      {/* List */}
      <div className="space-y-2">
        <AnimatePresence mode="popLayout">
          {filtered.map((entry) => (
            <motion.div
              key={entry.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="glass-card rounded-xl p-3 flex items-start gap-2 group"
            >
              {editingId === entry.id ? (
                <div className="flex-1 flex gap-2">
                  <input
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    autoFocus
                    className="flex-1 px-3 py-1 bg-muted/50 border border-border rounded-lg text-sm font-body focus:outline-none focus:ring-2 focus:ring-primary/30"
                    onKeyDown={(e) => e.key === "Enter" && handleUpdate(entry.id)}
                  />
                  <button onClick={() => handleUpdate(entry.id)} className="text-primary hover:opacity-70">
                    <Check className="w-4 h-4" />
                  </button>
                  <button onClick={() => setEditingId(null)} className="text-muted-foreground hover:opacity-70">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <>
                  <p className="flex-1 text-sm font-body leading-relaxed">{entry.text}</p>
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => handleToggleFav(entry.id)} className="p-1 rounded hover:bg-muted">
                      <Star className="w-3.5 h-3.5" fill={entry.favorite ? "hsl(var(--joy))" : "none"} stroke={entry.favorite ? "hsl(var(--joy))" : "currentColor"} />
                    </button>
                    <button onClick={() => { setEditingId(entry.id); setEditText(entry.text); }} className="p-1 rounded hover:bg-muted">
                      <Pencil className="w-3.5 h-3.5" />
                    </button>
                    <button onClick={() => handleDelete(entry.id)} className="p-1 rounded hover:bg-muted text-destructive">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
        {filtered.length === 0 && (
          <p className="text-center text-muted-foreground text-sm py-8 font-body">
            {search || showFavOnly ? "No matching entries ✨" : `No entries yet. Add your first one! ${emoji}`}
          </p>
        )}
      </div>
    </motion.div>
  );
};

export default EntryList;
