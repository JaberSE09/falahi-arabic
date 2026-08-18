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
  // ─── Greetings ───
  { id: 1,  arabic: "مرحبا",          transliteration: "Marhaba",          english: "Hello",                   category: "Greetings", example: "مرحبا، كيفك؟", exampleTranslation: "Hello, how are you?" },
  { id: 2,  arabic: "أهلاً وسهلاً",   transliteration: "Ahlan wa-sahlan",  english: "Welcome",                 category: "Greetings", example: "أهلاً وسهلاً فيك", exampleTranslation: "Welcome to you" },
  { id: 3,  arabic: "كيفك",           transliteration: "Kīfak",            english: "How are you? (to male)",  category: "Greetings", example: "كيفك اليوم؟", exampleTranslation: "How are you today?" },
  { id: 4,  arabic: "كيفك",           transliteration: "Kīfik",            english: "How are you? (to female)",category: "Greetings" },
  { id: 5,  arabic: "منيح",           transliteration: "Mnīḥ",             english: "Good / Fine",             category: "Greetings", example: "منيح، الحمد لله", exampleTranslation: "Fine, thank God" },
  { id: 6,  arabic: "صباح الخير",     transliteration: "Ṣabāḥ il-khēr",   english: "Good morning",            category: "Greetings", example: "صباح الخير، كيف الأحوال؟", exampleTranslation: "Good morning, how are things?" },
  { id: 7,  arabic: "صباح النور",     transliteration: "Ṣabāḥ in-nūr",    english: "Good morning (reply)",    category: "Greetings" },
  { id: 8,  arabic: "مساء الخير",     transliteration: "Masā il-khēr",     english: "Good evening",            category: "Greetings" },
  { id: 9,  arabic: "مع السلامة",     transliteration: "Maʿa s-salāme",   english: "Goodbye",                 category: "Greetings", example: "روح مع السلامة", exampleTranslation: "Go safely / Goodbye" },
  { id: 10, arabic: "تصبح على خير",   transliteration: "Tiṣbaḥ ʿala khēr",english: "Good night",              category: "Greetings" },
  { id: 11, arabic: "يسعدلك صباحك",  transliteration: "Yisʿidlak ṣabāḥak",english: "May your morning be happy",category: "Greetings" },
  { id: 12, arabic: "الله يسعدك",     transliteration: "Allah yisʿidak",   english: "May God make you happy",  category: "Greetings" },

  // ─── Family ───
  { id: 13, arabic: "أمّي",           transliteration: "Immi",             english: "My mother",               category: "Family" },
  { id: 14, arabic: "أبوي",           transliteration: "Abūyi",            english: "My father",               category: "Family" },
  { id: 15, arabic: "أخوي",           transliteration: "Ikhwāyi",          english: "My brother",              category: "Family", example: "أخوي بحكيلك", exampleTranslation: "My brother will talk to you" },
  { id: 16, arabic: "أختي",           transliteration: "Ikhti",            english: "My sister",               category: "Family" },
  { id: 17, arabic: "جدّو",           transliteration: "Jiddo",            english: "Grandfather",             category: "Family" },
  { id: 18, arabic: "تتّا",           transliteration: "Tatta",            english: "Grandmother (informal)",  category: "Family" },
  { id: 19, arabic: "عمّي",           transliteration: "ʿAmmi",            english: "Uncle (father's brother)", category: "Family" },
  { id: 20, arabic: "خالي",           transliteration: "Khāli",            english: "Uncle (mother's brother)", category: "Family" },
  { id: 21, arabic: "ابن العم",       transliteration: "Ibn il-ʿamm",      english: "Male cousin (paternal)",  category: "Family" },
  { id: 22, arabic: "مرتي",           transliteration: "Marti",            english: "My wife",                 category: "Family" },
  { id: 23, arabic: "جوزي",           transliteration: "Jōzi",             english: "My husband",              category: "Family" },
  { id: 24, arabic: "أولادي",         transliteration: "Awlādi",           english: "My children",             category: "Family" },

  // ─── Food & Drink ───
  { id: 25, arabic: "مي",             transliteration: "May",              english: "Water",                   category: "Food & Drink", example: "أعطيني مي", exampleTranslation: "Give me water" },
  { id: 26, arabic: "شاي",            transliteration: "Shāy",             english: "Tea",                     category: "Food & Drink", example: "بدّي شاي بحليب", exampleTranslation: "I want tea with milk" },
  { id: 27, arabic: "قهوة",           transliteration: "Ahwe",             english: "Coffee",                  category: "Food & Drink", example: "قهوة عربية", exampleTranslation: "Arabic coffee" },
  { id: 28, arabic: "خبز",            transliteration: "Khubuz",           english: "Bread",                   category: "Food & Drink" },
  { id: 29, arabic: "زيت وزعتر",      transliteration: "Zēt w-zaʿtar",    english: "Olive oil & thyme (za'atar)", category: "Food & Drink" },
  { id: 30, arabic: "منسف",           transliteration: "Mansaf",           english: "Mansaf (festive dish)",   category: "Food & Drink" },
  { id: 31, arabic: "فلافل",          transliteration: "Falāfel",          english: "Falafel",                 category: "Food & Drink" },
  { id: 32, arabic: "حمّص",           transliteration: "Ḥummuṣ",           english: "Hummus",                  category: "Food & Drink" },
  { id: 33, arabic: "دجاج",           transliteration: "Djāj",             english: "Chicken",                 category: "Food & Drink" },
  { id: 34, arabic: "لحمة",           transliteration: "Laḥme",            english: "Meat",                    category: "Food & Drink" },
  { id: 35, arabic: "تفاح",           transliteration: "Tuffāḥ",           english: "Apple",                   category: "Food & Drink" },
  { id: 36, arabic: "عنب",            transliteration: "ʿInab",            english: "Grapes",                  category: "Food & Drink" },

  // ─── Numbers ───
  { id: 37, arabic: "واحد",           transliteration: "Wāḥad",            english: "One",                     category: "Numbers" },
  { id: 38, arabic: "اثنين",          transliteration: "Itnēn",            english: "Two",                     category: "Numbers" },
  { id: 39, arabic: "ثلاثة",          transliteration: "Tlāte",            english: "Three",                   category: "Numbers" },
  { id: 40, arabic: "أربعة",          transliteration: "Arbaʿa",           english: "Four",                    category: "Numbers" },
  { id: 41, arabic: "خمسة",           transliteration: "Khamse",           english: "Five",                    category: "Numbers" },
  { id: 42, arabic: "ستة",            transliteration: "Sitte",            english: "Six",                     category: "Numbers" },
  { id: 43, arabic: "سبعة",           transliteration: "Sabʿa",            english: "Seven",                   category: "Numbers" },
  { id: 44, arabic: "ثمانية",         transliteration: "Tmāne",            english: "Eight",                   category: "Numbers" },
  { id: 45, arabic: "تسعة",           transliteration: "Tisʿa",            english: "Nine",                    category: "Numbers" },
  { id: 46, arabic: "عشرة",           transliteration: "ʿAshra",           english: "Ten",                     category: "Numbers" },
  { id: 47, arabic: "عشرين",          transliteration: "ʿIshrīn",          english: "Twenty",                  category: "Numbers" },
  { id: 48, arabic: "مية",            transliteration: "Mīye",             english: "Hundred",                 category: "Numbers" },

  // ─── Everyday Phrases ───
  { id: 49, arabic: "شكراً",          transliteration: "Shukran",          english: "Thank you",               category: "Phrases", example: "شكراً كتير", exampleTranslation: "Thank you very much" },
  { id: 50, arabic: "عفواً",          transliteration: "ʿAfwan",           english: "You're welcome",          category: "Phrases" },
  { id: 51, arabic: "من فضلك",        transliteration: "Min faḍlak",       english: "Please (to male)",        category: "Phrases" },
  { id: 52, arabic: "آسف",            transliteration: "Āsif",             english: "Sorry (male speaker)",    category: "Phrases" },
  { id: 53, arabic: "آسفة",           transliteration: "Āsfe",             english: "Sorry (female speaker)",  category: "Phrases" },
  { id: 54, arabic: "بدّي",           transliteration: "Biddi",            english: "I want",                  category: "Phrases", example: "بدّي أروح", exampleTranslation: "I want to go" },
  { id: 55, arabic: "ما بعرف",        transliteration: "Mā baʿrif",        english: "I don't know",            category: "Phrases" },
  { id: 56, arabic: "ما بفهم",        transliteration: "Mā bifham",        english: "I don't understand",      category: "Phrases" },
  { id: 57, arabic: "كمان",           transliteration: "Kamān",            english: "Also / Too / Again",      category: "Phrases", example: "أنا كمان", exampleTranslation: "Me too" },
  { id: 58, arabic: "هلق",            transliteration: "Hallaʾ",           english: "Now",                     category: "Phrases", example: "روح هلق", exampleTranslation: "Go now" },
  { id: 59, arabic: "وين",            transliteration: "Wēn",              english: "Where",                   category: "Phrases", example: "وين رايح؟", exampleTranslation: "Where are you going?" },
  { id: 60, arabic: "ليش",            transliteration: "Lēsh",             english: "Why",                     category: "Phrases", example: "ليش مجيتش؟", exampleTranslation: "Why didn't you come?" },
  { id: 61, arabic: "شو",             transliteration: "Shū",              english: "What",                    category: "Phrases", example: "شو بدّك؟", exampleTranslation: "What do you want?" },
  { id: 62, arabic: "كيف",            transliteration: "Kīf",              english: "How",                     category: "Phrases", example: "كيف بتعمل هيك؟", exampleTranslation: "How do you do that?" },
  { id: 63, arabic: "إيمتى",          transliteration: "Ēmta",             english: "When",                    category: "Phrases", example: "إيمتى بترجع؟", exampleTranslation: "When are you coming back?" },
  { id: 64, arabic: "ولّا",           transliteration: "Walla",            english: "Or / I swear (emphasis)", category: "Phrases", example: "والله ما بعرف", exampleTranslation: "I swear I don't know" },

  // ─── Colors ───
  { id: 65, arabic: "أحمر",           transliteration: "Aḥmar",            english: "Red",                     category: "Colors" },
  { id: 66, arabic: "أزرق",           transliteration: "Azraʾ",            english: "Blue",                    category: "Colors" },
  { id: 67, arabic: "أصفر",           transliteration: "Aṣfar",            english: "Yellow",                  category: "Colors" },
  { id: 68, arabic: "أخضر",           transliteration: "Akhḍar",           english: "Green",                   category: "Colors" },
  { id: 69, arabic: "أبيض",           transliteration: "Abyaḍ",            english: "White",                   category: "Colors" },
  { id: 70, arabic: "أسود",           transliteration: "Aswad",            english: "Black",                   category: "Colors" },
  { id: 71, arabic: "بنّي",           transliteration: "Bunni",            english: "Brown",                   category: "Colors" },
  { id: 72, arabic: "بنفسجي",         transliteration: "Banafsaji",        english: "Purple",                  category: "Colors" },
  { id: 73, arabic: "برتقالي",        transliteration: "Burtuʾāli",        english: "Orange",                  category: "Colors" },
  { id: 74, arabic: "وردي",           transliteration: "Wardi",            english: "Pink",                    category: "Colors" },

  // ─── Daily Life ───
  { id: 75, arabic: "بيت",            transliteration: "Bēt",              english: "House / Home",            category: "Daily Life", example: "روح عالبيت", exampleTranslation: "Go home" },
  { id: 76, arabic: "شارع",           transliteration: "Shāriʿ",           english: "Street",                  category: "Daily Life" },
  { id: 77, arabic: "دكان",           transliteration: "Dukkān",           english: "Shop / Store",            category: "Daily Life" },
  { id: 78, arabic: "سوق",            transliteration: "Sūʾ",              english: "Market / Bazaar",         category: "Daily Life" },
  { id: 79, arabic: "سيارة",          transliteration: "Sayyāra",          english: "Car",                     category: "Daily Life" },
  { id: 80, arabic: "شغل",            transliteration: "Shughl",           english: "Work / Job",              category: "Daily Life", example: "رايح عالشغل", exampleTranslation: "Going to work" },
  { id: 81, arabic: "مدرسة",          transliteration: "Madrasa",          english: "School",                  category: "Daily Life" },
  { id: 82, arabic: "مستشفى",         transliteration: "Mustashfa",        english: "Hospital",                category: "Daily Life" },
  { id: 83, arabic: "مسجد",           transliteration: "Masjid",           english: "Mosque",                  category: "Daily Life" },
  { id: 84, arabic: "يلّا",           transliteration: "Yalla",            english: "Let's go / Come on / Hurry", category: "Daily Life", example: "يلّا نروح", exampleTranslation: "Let's go" },
  { id: 85, arabic: "تعال",           transliteration: "Taʿāl",            english: "Come here (to male)",     category: "Daily Life" },
  { id: 86, arabic: "روح",            transliteration: "Rūḥ",              english: "Go (command)",            category: "Daily Life" },
  { id: 87, arabic: "اجلس",           transliteration: "Ijlas",            english: "Sit down",                category: "Daily Life" },
  { id: 88, arabic: "كل",             transliteration: "Kul",              english: "Eat (command)",           category: "Daily Life", example: "كل، كل، الأكل كتير", exampleTranslation: "Eat, eat, there's lots of food" },
];

export const categories = [...new Set(vocabulary.map(w => w.category))];
