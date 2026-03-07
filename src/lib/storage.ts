/* LocalStorage helper utilities for Keerti's Dream Journal */

export interface Entry {
  id: string;
  text: string;
  date: string;
  favorite: boolean;
  emoji?: string;
}

export interface DiaryEntry {
  id: string;
  date: string;
  content: string;
  mood?: string;
  favorite: boolean;
}

export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2);
}

export function getEntries(key: string): Entry[] {
  try {
    return JSON.parse(localStorage.getItem(key) || "[]");
  } catch {
    return [];
  }
}

export function saveEntries(key: string, entries: Entry[]): void {
  localStorage.setItem(key, JSON.stringify(entries));
}

export function addEntry(key: string, text: string, emoji?: string): Entry {
  const entries = getEntries(key);
  const entry: Entry = {
    id: generateId(),
    text,
    date: new Date().toISOString(),
    favorite: false,
    emoji,
  };
  entries.unshift(entry);
  saveEntries(key, entries);
  return entry;
}

export function updateEntry(key: string, id: string, text: string): void {
  const entries = getEntries(key);
  const idx = entries.findIndex((e) => e.id === id);
  if (idx !== -1) {
    entries[idx].text = text;
    saveEntries(key, entries);
  }
}

export function deleteEntry(key: string, id: string): void {
  const entries = getEntries(key).filter((e) => e.id !== id);
  saveEntries(key, entries);
}

export function toggleFavorite(key: string, id: string): void {
  const entries = getEntries(key);
  const idx = entries.findIndex((e) => e.id === id);
  if (idx !== -1) {
    entries[idx].favorite = !entries[idx].favorite;
    saveEntries(key, entries);
  }
}

export function getDiaryEntries(): DiaryEntry[] {
  try {
    return JSON.parse(localStorage.getItem("keerti-diary") || "[]");
  } catch {
    return [];
  }
}

export function saveDiaryEntries(entries: DiaryEntry[]): void {
  localStorage.setItem("keerti-diary", JSON.stringify(entries));
}

export function getTheme(): string {
  return localStorage.getItem("keerti-theme") || "pink";
}

export function setTheme(theme: string): void {
  localStorage.setItem("keerti-theme", theme);
}

export function getPassword(): string | null {
  return localStorage.getItem("keerti-password");
}

export function setPassword(password: string): void {
  localStorage.setItem("keerti-password", password);
}

export function isLocked(): boolean {
  return sessionStorage.getItem("keerti-unlocked") !== "true";
}

export function unlock(): void {
  sessionStorage.setItem("keerti-unlocked", "true");
}