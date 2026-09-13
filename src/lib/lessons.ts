export type Lesson = {
  id: number;
  title: string;
  emoji: string;
  level: string;
  desc: string;
  topics: string[];
  category: string;
};

export const lessons: Lesson[] = [
  {
    id: 1,
    title: "Greetings & Introductions",
    emoji: "👋",
    level: "Beginner",
    desc: "Learn how to greet people in Palestinian Arabic — مرحبا, كيفك, and how to respond naturally.",
    topics: ["مرحبا — Hello", "كيفك — How are you?", "منيح — Fine", "مع السلامة — Goodbye", "صباح الخير — Good morning"],
    category: "Greetings",
  },
  {
    id: 2,
    title: "Family Members",
    emoji: "👨‍👩‍👧‍👦",
    level: "Beginner",
    desc: "Learn immediate and extended family words in Palestinian dialect.",
    topics: ["أمّي — My mother", "أبوي — My father", "أخوي — My brother", "أختي — My sister", "جدّو / تتّا — Grandparents"],
    category: "Family",
  },
  {
    id: 3,
    title: "Food & Palestinian Cuisine",
    emoji: "🥙",
    level: "Beginner",
    desc: "Essential food and drink vocabulary — perfect for family meals, markets, and restaurants.",
    topics: ["مي — Water", "شاي — Tea", "خبز — Bread", "حمّص — Hummus", "زيت وزعتر — Za'atar & olive oil"],
    category: "Food & Drink",
  },
  {
    id: 4,
    title: "Numbers 1–20",
    emoji: "🔢",
    level: "Beginner",
    desc: "Count in Palestinian Arabic. Numbers sound slightly different from MSA — learn the dialect forms.",
    topics: ["واحد — One", "اثنين — Two (Itnēn not Ithnān)", "ثلاثة — Three (Tlāte)", "عشرة — Ten (ʿAshra)", "عشرين — Twenty"],
    category: "Numbers",
  },
  {
    id: 5,
    title: "Essential Question Words",
    emoji: "❓",
    level: "Beginner",
    desc: "The key question words in Palestinian dialect — شو، وين، ليش، كيف، إيمتى. These are different from MSA.",
    topics: ["شو — What", "وين — Where", "ليش — Why", "كيف — How", "إيمتى — When"],
    category: "Phrases",
  },
  {
    id: 6,
    title: "Daily Life & Getting Around",
    emoji: "🏘️",
    level: "Beginner",
    desc: "Words you'll use every day — home, work, market, transport, and essential commands like يلّا.",
    topics: ["يلّا — Let's go!", "بيت — Home", "شغل — Work", "سوق — Market", "دكان — Shop"],
    category: "Daily Life",
  },
  {
    id: 7,
    title: "Colors",
    emoji: "🎨",
    level: "Beginner",
    desc: "Colors in Palestinian Arabic — useful for describing clothes, objects, and surroundings.",
    topics: ["أحمر — Red", "أزرق — Blue", "أخضر — Green", "أبيض — White", "وردي — Pink"],
    category: "Colors",
  },
];
