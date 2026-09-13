// ─── Tutoring Data ───────────────────────────────────────────────────────────
// All content from tutoring materials — Palestinian dialect

export interface TutoringItem {
  arabic: string;
  transliteration: string;
  english: string;
  note?: string;
}

export interface TutoringLesson {
  id: string;
  title: string;
  emoji: string;
  description: string;
  color: string;
  items: TutoringItem[];
  rules?: string[];
}

export const tutoringLessons: TutoringLesson[] = [
  // ─── Days of the Week ────────────────────────────────────────────────────
  {
    id: "days",
    title: "Days of the Week",
    emoji: "📅",
    description: "Days, time nouns, and calendar vocabulary in Palestinian dialect",
    color: "#2563EB",
    rules: [
      "Days end in -ين (yeen) for most days",
      "اليوم (il-yōm) = today | إمبارح (imbāriḥ) = yesterday | بكرا (bukra) = tomorrow",
      "الأسبوع (il-isbūʿ) = the week | الشهر (ish-shahar) = the month",
    ],
    items: [
      { arabic: "الأحد",      transliteration: "il-Aḥad",      english: "Sunday",     note: "1st day of week in Arabic calendar" },
      { arabic: "الاثنين",    transliteration: "il-Ithnayn",   english: "Monday" },
      { arabic: "الثلاثاء",   transliteration: "ith-Thalātha", english: "Tuesday" },
      { arabic: "الأربعاء",   transliteration: "il-Arbaʿa",   english: "Wednesday" },
      { arabic: "الخميس",     transliteration: "il-Khamīs",   english: "Thursday" },
      { arabic: "الجمعة",     transliteration: "il-Jem'a",    english: "Friday",     note: "Jumu'ah — day of prayer" },
      { arabic: "السبت",      transliteration: "is-Sabt",     english: "Saturday" },
      { arabic: "اليوم",      transliteration: "il-yōm",      english: "Today" },
      { arabic: "إمبارح",     transliteration: "imbāriḥ",     english: "Yesterday" },
      { arabic: "بكرا",       transliteration: "bukra",        english: "Tomorrow" },
      { arabic: "بعد بكرا",   transliteration: "baʿd bukra",  english: "Day after tomorrow" },
      { arabic: "الأسبوع",    transliteration: "il-isbūʿ",    english: "The week" },
      { arabic: "الشهر",      transliteration: "ish-shahar",  english: "The month" },
      { arabic: "السنة",      transliteration: "is-sane",     english: "The year" },
      { arabic: "الفصل",      transliteration: "il-faṣl",     english: "The season" },
    ],
  },

  // ─── Plural Forms ─────────────────────────────────────────────────────────
  {
    id: "plurals",
    title: "Plural Forms",
    emoji: "🔢",
    description: "Singular → plural for time words and common nouns",
    color: "#7C3AED",
    rules: [
      "يوم → أيام (yōm → ayam): day → days",
      "جمعة → جمع (jem'a → jumaʿ): week → weeks",
      "شهر → أشهر / شهور (shahar → ash'hur / shuhūr): month → months",
      "سنة → سنين (sane → snīn): year → years",
      "فصل → فصول (faṣl → fuṣūl): season → seasons",
    ],
    items: [
      { arabic: "يوم",     transliteration: "yōm",      english: "Day (singular)" },
      { arabic: "أيام",    transliteration: "ayam",     english: "Days (plural)" },
      { arabic: "جمعة",    transliteration: "jem'a",    english: "Week (singular)" },
      { arabic: "جمع",     transliteration: "jumaʿ",   english: "Weeks (plural)" },
      { arabic: "شهر",     transliteration: "shahar",   english: "Month (singular)" },
      { arabic: "أشهر",    transliteration: "ash'hur",  english: "Months (plural, short)" },
      { arabic: "شهور",    transliteration: "shuhūr",   english: "Months (plural, long)" },
      { arabic: "سنة",     transliteration: "sane",     english: "Year (singular)" },
      { arabic: "سنين",    transliteration: "snīn",     english: "Years (plural)" },
      { arabic: "فصل",     transliteration: "faṣl",     english: "Season (singular)" },
      { arabic: "فصول",    transliteration: "fuṣūl",    english: "Seasons (plural)" },
      { arabic: "ساعة",    transliteration: "sāʿa",    english: "Hour / Watch (singular)" },
      { arabic: "ساعات",   transliteration: "sāʿāt",   english: "Hours (plural)" },
      { arabic: "دقيقة",   transliteration: "daqīqa",  english: "Minute (singular)" },
      { arabic: "دقائق",   transliteration: "daqāyeq", english: "Minutes (plural)" },
    ],
  },

  // ─── WH-Questions ─────────────────────────────────────────────────────────
  {
    id: "wh-questions",
    title: "WH-Questions",
    emoji: "❓",
    description: "How to ask questions in Palestinian dialect",
    color: "#D97706",
    rules: [
      "شو (shū) replaces ماذا — use it for 'what'",
      "وين (wēn) = where — used everywhere in Palestinian dialect",
      "أيمتى (aymata) = when — sometimes said إيمتى",
      "كيف (kīf) = how — same as MSA but without formal pronunciation",
      "قديش / أديش (addēsh / qaddēsh) = how much / how many",
      "ليش (lēsh) = why — uniquely Levantine, not used in Gulf Arabic",
    ],
    items: [
      { arabic: "شو",        transliteration: "shū",       english: "What?",              note: "شو بتبي؟ = What do you want?" },
      { arabic: "وين",       transliteration: "wēn",       english: "Where?",             note: "وين رايح؟ = Where are you going?" },
      { arabic: "أيمتى",     transliteration: "aymata",    english: "When?",              note: "أيمتى بترجع؟ = When are you coming back?" },
      { arabic: "كيف",       transliteration: "kīf",       english: "How?",               note: "كيف حالك؟ = How are you?" },
      { arabic: "ليش",       transliteration: "lēsh",      english: "Why?",               note: "ليش ما جيت؟ = Why didn't you come?" },
      { arabic: "أديش",      transliteration: "addēsh",    english: "How much / many?",   note: "أديش الحساب؟ = How much is the bill?" },
      { arabic: "مين",       transliteration: "mīn",       english: "Who?",               note: "مين هاد؟ = Who is this?" },
      { arabic: "أنو",       transliteration: "anū",       english: "Which?",             note: "أنو واحد؟ = Which one?" },
    ],
  },

  // ─── Connectors ───────────────────────────────────────────────────────────
  {
    id: "connectors",
    title: "Connectors",
    emoji: "🔗",
    description: "Prepositions and linking words — the glue of sentences",
    color: "#059669",
    rules: [
      "في (fī) = in/at — used for location and time",
      "من (min) = from — also means 'some of'",
      "على (ʿala) = on/about — also used for 'calling someone'",
      "بعدين (baʿdēn) = then/after — very commonly used in conversation",
      "لأنو (laʾanno) = because — Palestinian form of لأن",
    ],
    items: [
      { arabic: "في",        transliteration: "fī",        english: "In / At",            note: "في البيت = at home" },
      { arabic: "على",       transliteration: "ʿala",      english: "On / About",         note: "على التلفون = on the phone" },
      { arabic: "من",        transliteration: "min",       english: "From",               note: "من وين؟ = from where?" },
      { arabic: "لـ / لـ",   transliteration: "la-",       english: "To / For",           note: "رحت لعمان = I went to Amman" },
      { arabic: "مع",        transliteration: "maʿ",       english: "With",               note: "مع بعض = together" },
      { arabic: "بدون",      transliteration: "bidūn",     english: "Without" },
      { arabic: "لأنو",      transliteration: "laʾanno",   english: "Because",            note: "لأنو تعبان = because he's tired" },
      { arabic: "بس",        transliteration: "bas",       english: "But / Just / Only",  note: "بس شوي = just a little" },
      { arabic: "و",         transliteration: "w-",        english: "And",                note: "attached to next word: وبعدين" },
      { arabic: "أو",        transliteration: "aw",        english: "Or" },
      { arabic: "أول",       transliteration: "awwal",     english: "First",              note: "أول روح.. = first go..." },
      { arabic: "بعدين",     transliteration: "baʿdēn",   english: "Then / After",       note: "وبعدين رحنا = and then we went" },
      { arabic: "وأخيرًا",   transliteration: "w-akhīran", english: "And finally" },
      { arabic: "لما",       transliteration: "lamma",     english: "When (conjunction)", note: "لما وصل = when he arrived" },
      { arabic: "إذا",       transliteration: "iza",       english: "If",                 note: "إذا جيت = if you come" },
    ],
  },

  // ─── Telling Time — Range 1 ───────────────────────────────────────────────
  {
    id: "time-range-1",
    title: "Telling Time — Minutes",
    emoji: "⏰",
    description: "How to say the time from :00 to :29 (past the hour)",
    color: "#DC2626",
    rules: [
      "الساعة كم؟ (il-sāʿa kam?) = What time is it?",
      "Pattern for :00–:29 → 'الساعة [hour] وَ [minutes]'",
      "الساعة أربعة = 4:00 exactly",
      "الساعة أربعة وعشرة = 4:10",
      "الساعة أربعة وربع = 4:15 (ربع = quarter)",
      "الساعة أربعة ونص = 4:30 (نص = half)",
      "Numbers 1–10: واحد، اثنين، ثلاثة، أربعة، خمسة، ستة، سبعة، ثمانية، تسعة، عشرة",
    ],
    items: [
      { arabic: "الساعة كم؟",           transliteration: "il-sāʿa kam?",         english: "What time is it?" },
      { arabic: "الساعة أربعة",          transliteration: "il-sāʿa arbaʿa",       english: "4:00 (on the hour)" },
      { arabic: "الساعة أربعة وواحد",    transliteration: "il-sāʿa arbaʿa w-wāḥad", english: "4:01" },
      { arabic: "الساعة أربعة وعشرة",    transliteration: "il-sāʿa arbaʿa w-ʿashara", english: "4:10" },
      { arabic: "الساعة أربعة وربع",     transliteration: "il-sāʿa arbaʿa w-rubʿ", english: "4:15 (quarter past)" },
      { arabic: "الساعة أربعة وعشرين",   transliteration: "il-sāʿa arbaʿa w-ʿishrīn", english: "4:20" },
      { arabic: "الساعة أربعة ونص",      transliteration: "il-sāʿa arbaʿa w-nuṣṣ", english: "4:30 (half past)" },
      { arabic: "الساعة أربعة وتلت",     transliteration: "il-sāʿa arbaʿa w-tilt", english: "4:20 (⅓ of hour, alt.)" },
      { arabic: "الفجر / الصبح",         transliteration: "il-fajr / iṣ-ṣubḥ",   english: "Dawn / Morning", note: "AM time context" },
      { arabic: "الظهر",                  transliteration: "iẓ-ẓuhr",             english: "Noon", note: "12:00 PM" },
      { arabic: "العصر",                  transliteration: "il-ʿaṣr",             english: "Afternoon" },
      { arabic: "المغرب",                 transliteration: "il-maghrib",          english: "Sunset / Evening" },
      { arabic: "الليل",                  transliteration: "il-lēl",              english: "Night" },
    ],
  },

  // ─── Telling Time — Range 2 ───────────────────────────────────────────────
  {
    id: "time-range-2",
    title: "Telling Time — To the Hour",
    emoji: "⏱️",
    description: "How to say the time from :31 to :59 (before the next hour)",
    color: "#9333EA",
    rules: [
      "Pattern for :31–:59 → 'الساعة [NEXT hour] إلا [minutes remaining]'",
      "إلا (illa) = minus / except → counts DOWN to the next hour",
      "الساعة خمسة إلا ربع = 4:45 (5 minus a quarter)",
      "الساعة خمسة إلا عشرة = 4:50 (5 minus 10)",
      "الساعة خمسة إلا خمسة = 4:55 (5 minus 5)",
      "تمام (tamām) = exactly — الساعة خمسة تمام = exactly 5:00",
    ],
    items: [
      { arabic: "الساعة خمسة إلا ربع",    transliteration: "il-sāʿa khamse illa rubʿ",   english: "4:45 (quarter to 5)" },
      { arabic: "الساعة خمسة إلا عشرة",   transliteration: "il-sāʿa khamse illa ʿashara", english: "4:50 (ten to 5)" },
      { arabic: "الساعة خمسة إلا خمسة",   transliteration: "il-sāʿa khamse illa khamse", english: "4:55 (five to 5)" },
      { arabic: "الساعة خمسة تمام",        transliteration: "il-sāʿa khamse tamām",       english: "5:00 exactly" },
      { arabic: "تقريبًا",                  transliteration: "taqrīban",                   english: "Approximately / Around", note: "الساعة أربعة تقريبًا = around 4" },
      { arabic: "إلا",                      transliteration: "illa",                       english: "Minus / Less / Except", note: "used for counting down to hour" },
      { arabic: "تمام",                     transliteration: "tamām",                      english: "Exactly / On the dot" },
      { arabic: "وشوي",                     transliteration: "w-shwayy",                   english: "And a little / Just past", note: "الساعة أربعة وشوي = just after 4" },
    ],
  },
];
