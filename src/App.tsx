import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { isLocked } from "@/lib/storage";
import LockScreen from "@/components/LockScreen";
import AppLayout from "@/components/AppLayout";
import HomePage from "@/pages/HomePage";
import FoodsPage from "@/pages/FoodsPage";
import DreamPlacesPage from "@/pages/DreamPlacesPage";
import TraitsPage from "@/pages/TraitsPage";
import ActivitiesPage from "@/pages/ActivitiesPage";
import DislikesPage from "@/pages/DislikesPage";
import LovesPage from "@/pages/LovesPage";
import QuotesPage from "@/pages/QuotesPage";
import NewWordsPage from "@/pages/NewWordsPage";
import ComplimentsPage from "@/pages/ComplimentsPage";
import HappinessPage from "@/pages/HappinessPage";
import LookForwardPage from "@/pages/LookForwardPage";
import RulesPage from "@/pages/RulesPage";
import OneLovePage from "@/pages/OneLovePage";
import DiaryPage from "@/pages/DiaryPage";
import GratitudePage from "@/pages/GratitudePage";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const [locked, setLocked] = useState(isLocked());

  if (locked) {
    return (
      <>
        <Sonner />
        <LockScreen onUnlock={() => setLocked(false)} />
      </>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route element={<AppLayout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/foods" element={<FoodsPage />} />
              <Route path="/dream-places" element={<DreamPlacesPage />} />
              <Route path="/traits" element={<TraitsPage />} />
              <Route path="/activities" element={<ActivitiesPage />} />
              <Route path="/dislikes" element={<DislikesPage />} />
              <Route path="/loves" element={<LovesPage />} />
              <Route path="/quotes" element={<QuotesPage />} />
              <Route path="/new-words" element={<NewWordsPage />} />
              <Route path="/compliments" element={<ComplimentsPage />} />
              <Route path="/happiness" element={<HappinessPage />} />
              <Route path="/look-forward" element={<LookForwardPage />} />
              <Route path="/rules" element={<RulesPage />} />
              <Route path="/one-love" element={<OneLovePage />} />
              <Route path="/diary" element={<DiaryPage />} />
              <Route path="/gratitude" element={<GratitudePage />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
