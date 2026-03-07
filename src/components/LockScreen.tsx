import { useState } from "react";
import { motion } from "framer-motion";
import { Lock, Heart, Sparkles } from "lucide-react";
import { getPassword, setPassword, unlock } from "@/lib/storage";

interface LockScreenProps {
  onUnlock: () => void;
}

const LockScreen = ({ onUnlock }: LockScreenProps) => {
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");
  const [isSetup, setIsSetup] = useState(!getPassword());
  const [confirmPin, setConfirmPin] = useState("");
  const [step, setStep] = useState<"enter" | "confirm">("enter");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSetup) {
      if (step === "enter") {
        if (pin.length < 4) {
          setError("PIN must be at least 4 characters 💭");
          return;
        }
        setStep("confirm");
        setConfirmPin(pin);
        setPin("");
        setError("");
      } else {
        if (pin === confirmPin) {
          setPassword(confirmPin);
          unlock();
          onUnlock();
        } else {
          setError("PINs don't match! Try again 🥺");
          setStep("enter");
          setPin("");
        }
      }
    } else {
      if (pin === getPassword()) {
        unlock();
        onUnlock();
      } else {
        setError("Wrong PIN! Try again 🔒");
        setPin("");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center gradient-primary p-4">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", duration: 0.6 }}
        className="glass-card rounded-2xl p-8 w-full max-w-sm text-center"
      >
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="mb-6"
        >
          <div className="w-20 h-20 rounded-full gradient-primary mx-auto flex items-center justify-center glow-shadow">
            <Lock className="w-8 h-8 text-primary-foreground" />
          </div>
        </motion.div>

        <h1 className="text-2xl font-handwriting font-bold mb-1">Keerti's Dream Journal</h1>
        <div className="flex items-center justify-center gap-1 mb-6">
          <Sparkles className="w-4 h-4 text-primary" />
          <p className="text-sm text-muted-foreground">
            {isSetup
              ? step === "enter"
                ? "Create your secret PIN"
                : "Confirm your PIN"
              : "Enter your PIN to continue"}
          </p>
          <Heart className="w-4 h-4 text-love" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            value={pin}
            onChange={(e) => { setPin(e.target.value); setError(""); }}
            placeholder="••••"
            className="w-full text-center text-2xl tracking-[0.5em] bg-muted/50 border border-border rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-primary/50 font-display"
            autoFocus
          />
          {error && (
            <motion.p
              initial={{ x: -10 }}
              animate={{ x: 0 }}
              className="text-destructive text-sm"
            >
              {error}
            </motion.p>
          )}
          <button
            type="submit"
            className="w-full gradient-primary text-primary-foreground font-display font-semibold py-3 rounded-xl soft-shadow hover:opacity-90 transition-opacity"
          >
            {isSetup ? (step === "enter" ? "Set PIN ✨" : "Confirm ✨") : "Unlock 💖"}
          </button>
        </form>

        {!isSetup && (
          <button
            onClick={() => {
              if (confirm("This will reset your PIN and ALL data. Continue?")) {
                localStorage.clear();
                setIsSetup(true);
                setStep("enter");
                setPin("");
              }
            }}
            className="mt-4 text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            Forgot PIN? Reset everything
          </button>
        )}
      </motion.div>
    </div>
  );
};

export default LockScreen;