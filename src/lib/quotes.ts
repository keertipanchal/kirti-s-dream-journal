/* Inspirational quotes for random quote generator */
export const inspirationalQuotes = [
  "She believed she could, so she did. ✨",
  "You are enough just as you are. 🌸",
  "Be the energy you want to attract. 💫",
  "Bloom where you are planted. 🌷",
  "Your vibe attracts your tribe. 🦋",
  "Stars can't shine without darkness. 🌙",
  "Be a voice, not an echo. 💗",
  "Protect your peace like it's your most precious possession. 🕊️",
  "You are the author of your own story. 📖",
  "Glow from the inside out. ☀️",
  "Inhale confidence, exhale doubt. 🌬️",
  "Be so good they can't ignore you. 💎",
  "Your only limit is your mind. 🧠",
  "Make yourself a priority. 🌺",
  "Dream big, sparkle more, shine bright. ✨",
  "You didn't come this far to only come this far. 🚀",
  "Talk to yourself like someone you love. 💕",
  "You are worthy of the love you keep giving others. 🌹",
  "Every day is a fresh start. 🌅",
  "Be fearlessly authentic. 🦁",
  "Difficult roads often lead to beautiful destinations. 🏔️",
  "You're not behind. You're on your own timeline. ⏰",
  "Collect moments, not things. 📸",
  "Self-love is the greatest revolution. 💗",
  "Your potential is endless. 🌊",
];

export function getRandomQuote(): string {
  return inspirationalQuotes[Math.floor(Math.random() * inspirationalQuotes.length)];
}

export const motivationalPopups = [
  "Hey gorgeous! You're doing amazing! 💖",
  "Remember: You are magic! ✨",
  "Take a deep breath. You've got this! 🌸",
  "You're braver than you believe! 🦋",
  "Don't forget to smile today! 😊",
  "You make the world more beautiful! 🌷",
  "Keep going, queen! 👑",
  "You deserve all the happiness! 🌈",
];

export function getRandomMotivation(): string {
  return motivationalPopups[Math.floor(Math.random() * motivationalPopups.length)];
}
