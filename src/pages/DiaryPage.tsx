import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Trash2, Star, ChevronLeft, ChevronRight, Search } from "lucide-react";
import { getDiaryEntries, saveDiaryEntries, DiaryEntry, generateId } from "@/lib/storage";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, isSameMonth, addMonths, subMonths } from "date-fns";

const DiaryPage = () => {
  const [entries, setEntries] = useState<DiaryEntry[]>([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [content, setContent] = useState("");
  const [mood, setMood] = useState("😊");
  const [search, setSearch] = useState("");
  const [view, setView] = useState<"calendar" | "list">("calendar");

  const reload = () => setEntries(getDiaryEntries());
  useEffect(reload, []);

  const moods = ["😊", "😢", "😡", "🥰", "😴", "🤔", "💪", "🌸"];

  const dayEntries = useMemo(
    () => entries.filter((e) => isSameDay(new Date(e.date), selectedDate)),
    [entries, selectedDate]
  );

  const filteredEntries = useMemo(() => {
    if (!search) return entries;
    return entries.filter((e) => e.content.toLowerCase().includes(search.toLowerCase()));
  }, [entries, search]);

  const daysInMonth = eachDayOfInterval({
    start: startOfMonth(currentMonth),
    end: endOfMonth(currentMonth),
  });

  const firstDayOffset = startOfMonth(currentMonth).getDay();

  const hasEntry = (day: Date) => entries.some((e) => isSameDay(new Date(e.date), day));

  const handleAdd = () => {
    if (!content.trim()) return;
    const entry: DiaryEntry = {
      id: generateId(),
      date: selectedDate.toISOString(),
      content: content.trim(),
      mood,
      favorite: false,
    };
    const updated = [entry, ...entries];
    saveDiaryEntries(updated);
    setContent("");
    reload();
  };

  const handleDelete = (id: string) => {
    const updated = entries.filter((e) => e.id !== id);
    saveDiaryEntries(updated);
    reload();
  };

  const handleToggleFav = (id: string) => {
    const updated = entries.map((e) => e.id === id ? { ...e, favorite: !e.favorite } : e);
    saveDiaryEntries(updated);
    reload();
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-2xl">📝</span>
        <h2 className="text-2xl font-display font-bold">Daily Diary</h2>
      </div>

      {/* View toggle */}
      <div className="flex gap-2">
        <button onClick={() => setView("calendar")} className={`px-3 py-1.5 rounded-lg text-sm font-display ${view === "calendar" ? "gradient-primary text-primary-foreground" : "bg-muted"}`}>
          📅 Calendar
        </button>
        <button onClick={() => setView("list")} className={`px-3 py-1.5 rounded-lg text-sm font-display ${view === "list" ? "gradient-primary text-primary-foreground" : "bg-muted"}`}>
          📋 List
        </button>
      </div>

      {view === "calendar" ? (
        <>
          {/* Calendar */}
          <div className="glass-card rounded-2xl p-4 soft-shadow">
            <div className="flex items-center justify-between mb-3">
              <button onClick={() => setCurrentMonth(subMonths(currentMonth, 1))} className="p-1 rounded-lg hover:bg-muted">
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="font-display font-semibold">{format(currentMonth, "MMMM yyyy")}</span>
              <button onClick={() => setCurrentMonth(addMonths(currentMonth, 1))} className="p-1 rounded-lg hover:bg-muted">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            <div className="grid grid-cols-7 gap-1 text-center">
              {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
                <div key={d} className="text-xs text-muted-foreground font-display py-1">{d}</div>
              ))}
              {Array.from({ length: firstDayOffset }).map((_, i) => (
                <div key={`empty-${i}`} />
              ))}
              {daysInMonth.map((day) => (
                <button
                  key={day.toISOString()}
                  onClick={() => setSelectedDate(day)}
                  className={`text-xs p-1.5 rounded-lg relative transition-colors font-body ${
                    isSameDay(day, selectedDate)
                      ? "gradient-primary text-primary-foreground"
                      : isSameDay(day, new Date())
                        ? "bg-primary/10 text-primary"
                        : "hover:bg-muted"
                  }`}
                >
                  {format(day, "d")}
                  {hasEntry(day) && (
                    <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-love" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Selected date entries */}
          <div className="space-y-3">
            <h3 className="font-display font-semibold text-sm text-muted-foreground">
              {format(selectedDate, "EEEE, MMMM d, yyyy")}
            </h3>

            {/* Add entry */}
            <div className="glass-card rounded-xl p-3 space-y-2 soft-shadow">
              <div className="flex gap-1.5 flex-wrap">
                {moods.map((m) => (
                  <button
                    key={m}
                    onClick={() => setMood(m)}
                    className={`text-lg p-1 rounded-lg ${mood === m ? "bg-primary/10 ring-1 ring-primary" : ""}`}
                  >
                    {m}
                  </button>
                ))}
              </div>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="What's on your mind today..."
                className="w-full p-2 bg-muted/50 border border-border rounded-xl text-sm font-body resize-none focus:outline-none focus:ring-2 focus:ring-primary/30"
                rows={3}
              />
              <button onClick={handleAdd} className="gradient-primary text-primary-foreground px-4 py-2 rounded-xl font-display font-semibold text-sm inline-flex items-center gap-1">
                <Plus className="w-4 h-4" /> Add Entry
              </button>
            </div>

            <AnimatePresence>
              {dayEntries.map((entry) => (
                <motion.div
                  key={entry.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="glass-card rounded-xl p-3 group"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-lg mr-1">{entry.mood}</span>
                      <p className="text-sm font-body mt-1 leading-relaxed">{entry.content}</p>
                    </div>
                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => handleToggleFav(entry.id)} className="p-1 rounded hover:bg-muted">
                        <Star className="w-3.5 h-3.5" fill={entry.favorite ? "hsl(var(--joy))" : "none"} stroke={entry.favorite ? "hsl(var(--joy))" : "currentColor"} />
                      </button>
                      <button onClick={() => handleDelete(entry.id)} className="p-1 rounded hover:bg-muted text-destructive">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </>
      ) : (
        /* List view */
        <div className="space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search diary..."
              className="w-full pl-9 pr-3 py-2 bg-muted/50 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 font-body"
            />
          </div>
          <AnimatePresence>
            {filteredEntries.map((entry) => (
              <motion.div
                key={entry.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="glass-card rounded-xl p-3 group"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span>{entry.mood}</span>
                      <span className="text-xs text-muted-foreground font-display">{format(new Date(entry.date), "MMM d, yyyy")}</span>
                      {entry.favorite && <Star className="w-3 h-3 text-joy" fill="hsl(var(--joy))" />}
                    </div>
                    <p className="text-sm font-body leading-relaxed">{entry.content}</p>
                  </div>
                  <button onClick={() => handleDelete(entry.id)} className="p-1 rounded hover:bg-muted text-destructive opacity-0 group-hover:opacity-100 transition-opacity">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          {filteredEntries.length === 0 && (
            <p className="text-center text-muted-foreground text-sm py-8">No diary entries yet 📝</p>
          )}
        </div>
      )}
    </motion.div>
  );
};

export default DiaryPage;
