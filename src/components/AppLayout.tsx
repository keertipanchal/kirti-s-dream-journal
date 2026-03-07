import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Menu } from "lucide-react";
import Sidebar from "./Sidebar";
import ThemeSwitcher from "./ThemeSwitcher";
import { getTheme, setTheme as saveTheme } from "@/lib/storage";
import { getRandomMotivation } from "@/lib/quotes";
import { toast } from "sonner";

const AppLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [theme, setThemeState] = useState(getTheme());

  const handleThemeChange = (t: string) => {
    setThemeState(t);
    saveTheme(t);
    document.documentElement.className = `theme-${t}`;
  };

  useEffect(() => {
    document.documentElement.className = `theme-${theme}`;
    const timer = setTimeout(() => {
      toast(getRandomMotivation(), { duration: 4000 });
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex min-h-screen">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 flex flex-col min-h-screen">
        <header className="sticky top-0 z-30 bg-background/80 backdrop-blur-md border-b border-border px-4 py-3 flex items-center gap-3">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 rounded-lg hover:bg-muted"
          >
            <Menu className="w-5 h-5" />
          </button>
          <h1 className="font-handwriting font-bold text-xl gradient-text flex-1">
            Keerti's Dream Journal 🌸
          </h1>
          <ThemeSwitcher currentTheme={theme} onThemeChange={handleThemeChange} />
        </header>
        <main className="flex-1 p-4 md:p-6 lg:p-8 max-w-4xl mx-auto w-full">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AppLayout;