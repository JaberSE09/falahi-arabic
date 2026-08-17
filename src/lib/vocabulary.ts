export interface Word {
  id: number;
  arabic: string;
  transliteration: string;
  english: string;
  category: string;
  example?: string;
  exampleTranslation?: string;
}

export const vocabulary: Word[] = [
  // Greetings
  { id: 1, arabic: "هلا", transliteration: "Hala", english: "Hello / Welcome", category: "Greetings", example: "هلا بيك", exampleTranslation: "Welcome to you" },
  { id: 2, arabic: "شلونك", transliteration: "Shlōnak", english: "How are you? (to male)", category: "Greetings", example: "شلونك؟ عساك بخير", exampleTranslation: "How are you? Hope you're well" },
  { id: 3, arabic: "شلونج", transliteration: "Shlōnich", english: "How are you? (to female)", category: "Greetings" },
  { id: 4, arabic: "بخير", transliteration: "Bkhair", english: "Fine / Good", category: "Greetings", example: "بخير، الحمد لله", exampleTranslation: "Fine, thank God" },
  { id: 5, arabic: "مساء الخير", transliteration: "Masa al-khair", english: "Good evening", category: "Greetings" },
  { id: 6, arabic: "صباح الخير", transliteration: "Sabāh al-khair", english: "Good morning", category: "Greetings" },
  { id: 7, arabic: "مع السلامة", transliteration: "Ma'a al-salāma", english: "Goodbye", category: "Greetings" },
  { id: 8, arabic: "تصبح على خير", transliteration: "Tisbah 'ala khair", english: "Good night", category: "Greetings" },

  // Family
  { id: 9, arabic: "أمي", transliteration: "Umi", english: "My mother", category: "Family" },
  { id: 10, arabic: "أبوي", transliteration: "Abūy", english: "My father", category: "Family" },
  { id: 11, arabic: "أخوي", transliteration: "Akhūy", english: "My brother", category: "Family" },
  { id: 12, arabic: "أختي", transliteration: "Ukhti", english: "My sister", category: "Family" },
  { id: 13, arabic: "جدي", transliteration: "Jiddi", english: "My grandfather", category: "Family" },
  { id: 14, arabic: "جدتي", transliteration: "Jiddati", english: "My grandmother", category: "Family" },
  { id: 15, arabic: "عمي", transliteration: "Ammi", english: "My uncle (paternal)", category: "Family" },
  { id: 16, arabic: "خالي", transliteration: "Khāli", english: "My uncle (maternal)", category: "Family" },

  // Food & Drink
  { id: 17, arabic: "ماي", transliteration: "Māy", english: "Water", category: "Food & Drink", example: "أريد ماي", exampleTranslation: "I want water" },
  { id: 18, arabic: "چاي", transliteration: "Chāy", english: "Tea", category: "Food & Drink" },
  { id: 19, arabic: "خبز", transliteration: "Khubuz", english: "Bread", category: "Food & Drink" },
  { id: 20, arabic: "رز", transliteration: "Ruzz", english: "Rice", category: "Food & Drink" },
  { id: 21, arabic: "لحم", transliteration: "Lahim", english: "Meat", category: "Food & Drink" },
  { id: 22, arabic: "تمر", transliteration: "Timir", english: "Dates", category: "Food & Drink" },
  { id: 23, arabic: "دجاج", transliteration: "Dijāj", english: "Chicken", category: "Food & Drink" },
  { id: 24, arabic: "حليب", transliteration: "Halib", english: "Milk", category: "Food & Drink" },

  // Numbers
  { id: 25, arabic: "واحد", transliteration: "Wāhid", english: "One", category: "Numbers" },
  { id: 26, arabic: "ثنين", transliteration: "Thnain", english: "Two", category: "Numbers" },
  { id: 27, arabic: "ثلاثة", transliteration: "Thlātha", english: "Three", category: "Numbers" },
  { id: 28, arabic: "أربعة", transliteration: "Arba'a", english: "Four", category: "Numbers" },
  { id: 29, arabic: "خمسة", transliteration: "Khamsa", english: "Five", category: "Numbers" },
  { id: 30, arabic: "ستة", transliteration: "Sitta", english: "Six", category: "Numbers" },
  { id: 31, arabic: "سبعة", transliteration: "Sab'a", english: "Seven", category: "Numbers" },
  { id: 32, arabic: "ثمانية", transliteration: "Thmānya", english: "Eight", category: "Numbers" },
  { id: 33, arabic: "تسعة", transliteration: "Tis'a", english: "Nine", category: "Numbers" },
  { id: 34, arabic: "عشرة", transliteration: "Ashra", english: "Ten", category: "Numbers" },

  // Common Phrases
  { id: 35, arabic: "شكراً", transliteration: "Shukran", english: "Thank you", category: "Phrases" },
  { id: 36, arabic: "عفواً", transliteration: "Afwan", english: "You're welcome", category: "Phrases" },
  { id: 37, arabic: "لو سمحت", transliteration: "Law samaht", english: "Please / Excuse me", category: "Phrases" },
  { id: 38, arabic: "آسف", transliteration: "Āsif", english: "Sorry", category: "Phrases" },
  { id: 39, arabic: "ما أدري", transliteration: "Mā adri", english: "I don't know", category: "Phrases" },
  { id: 40, arabic: "أريد", transliteration: "Arīd", english: "I want", category: "Phrases" },
  { id: 41, arabic: "زين", transliteration: "Zain", english: "Good / OK / Fine", category: "Phrases", example: "زين، روح", exampleTranslation: "OK, go ahead" },
  { id: 42, arabic: "لا بأس", transliteration: "La ba's", english: "No problem / It's OK", category: "Phrases" },

  // Colors
  { id: 43, arabic: "أحمر", transliteration: "Ahmar", english: "Red", category: "Colors" },
  { id: 44, arabic: "أزرق", transliteration: "Azraq", english: "Blue", category: "Colors" },
  { id: 45, arabic: "أصفر", transliteration: "Asfar", english: "Yellow", category: "Colors" },
  { id: 46, arabic: "أخضر", transliteration: "Akhdar", english: "Green", category: "Colors" },
  { id: 47, arabic: "أبيض", transliteration: "Abyad", english: "White", category: "Colors" },
  { id: 48, arabic: "أسود", transliteration: "Aswad", english: "Black", category: "Colors" },
  { id: 49, arabic: "بني", transliteration: "Bunni", english: "Brown", category: "Colors" },
  { id: 50, arabic: "برتقالي", transliteration: "Burtuqāli", english: "Orange", category: "Colors" },
];

export const categories = [...new Set(vocabulary.map(w => w.category))];
