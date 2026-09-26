// ─── Arabic 101 Data ─────────────────────────────────────────────────────────
// Miftaah Institute — Nahw (Arabic Grammar) Curriculum

export interface Arabic101Item {
  term: string;
  arabic?: string;
  transliteration?: string;
  english: string;
  note?: string;
}

export interface Arabic101Drill {
  question: string;
  arabic?: string;
  answer: string;
  explanation?: string;
}

export interface Arabic101Lesson {
  id: string;
  title: string;
  emoji: string;
  color: string;
  description: string;
  concepts: Arabic101Item[];
  rules: string[];
  drills: Arabic101Drill[];
}

export const arabic101Lessons: Arabic101Lesson[] = [
  {
    id: "ism-intro",
    title: "The Arabic Noun (Ism)",
    emoji: "📖",
    color: "#1D4ED8",
    description: "Introduction to the ISM and its 4 characteristics (DING)",
    concepts: [
      { term: "إِسْم", arabic: "إِسْم", transliteration: "ism", english: "Noun — a word independent of other words in meaning, devoid of tense" },
      { term: "كَلِمَة", arabic: "كَلِمَة", transliteration: "kalimah", english: "Word" },
      { term: "DING", english: "Memory device for the 4 characteristics: Definite/Indefinite, I'rab, Number, Gender" },
      { term: "مَعْرِفَة", arabic: "مَعْرِفَةٌ", transliteration: "ma'rifa", english: "Definite noun — refers to a specific thing" },
      { term: "نَكِرَة", arabic: "نَكِرَةٌ", transliteration: "nakira", english: "Indefinite noun — refers to a general thing" },
      { term: "تَنْوِيْن", arabic: "تَنْوِيْن", transliteration: "tanween", english: "Double vowel ending (ً ٍ ٌ) — marks indefinite nouns" },
      { term: "ال", arabic: "ال", english: "Definite article 'the' — makes noun definite", transliteration: "al" },
      { term: "لَفْظ الجَلَالَة", arabic: "لَفْظُ الجَلَالَة", transliteration: "lafz ul jalaalah", english: "The Grand Word — proper way to refer to the name of Allah" },
    ],
    rules: [
      "Ism includes: names of people, places, things, adjectives, adverbs, and verbal nouns",
      "DING = Definite/Indefinite, I'rab, Number, Gender — the 4 characteristics of every noun",
      "Tanween (ٌ ٍ ً) = indefinite noun (nakira) | ال prefix = definite noun (marifa)",
      "Tanween and ال CANNOT coexist on the same word",
      "Proper nouns (names of people/places) are definite even without ال",
      "Pronouns (he, she, they) are also definite (marifa)",
      "Say 'Lafz ul Jalaalah' — not 'the word Allah' — out of respect",
    ],
    drills: [
      { question: "Is شَيْءٍ definite or indefinite?", arabic: "شَيْءٍ", answer: "Indefinite (Nakira)", explanation: "Has tanween (ٍ)" },
      { question: "Is كَنَدَا definite or indefinite?", arabic: "كَنَدَا", answer: "Definite (Marifa)", explanation: "Name of a place (proper noun)" },
      { question: "Is مَرْيَمُ definite or indefinite?", arabic: "مَرْيَمُ", answer: "Definite (Marifa)", explanation: "Name of a person" },
      { question: "Is كِتَابٍ definite or indefinite?", arabic: "كِتَابٍ", answer: "Indefinite (Nakira)", explanation: "Has tanween (ٍ)" },
      { question: "Is الْخِبْرُ definite or indefinite?", arabic: "الْخِبْرُ", answer: "Definite (Marifa)", explanation: "Starts with ال" },
      { question: "Is السَّمَاءَ definite or indefinite?", arabic: "السَّمَاءَ", answer: "Definite (Marifa)", explanation: "Starts with ال" },
      { question: "Is مُحَمَّدًا definite or indefinite?", arabic: "مُحَمَّدًا", answer: "Definite (Marifa)", explanation: "Name of a person (proper noun)" },
      { question: "Is رَجُلٌ definite or indefinite?", arabic: "رَجُلٌ", answer: "Indefinite (Nakira)", explanation: "Has tanween (ٌ)" },
      { question: "Can the word الْقَلَمٌ exist?", arabic: "الْقَلَمٌ", answer: "No — it cannot exist", explanation: "Tanween and ال cannot coexist on the same word" },
      { question: "What does DING stand for?", answer: "Definite/Indefinite, I'rab, Number, Gender", explanation: "The 4 characteristics of every Arabic noun" },
    ],
  },

  {
    id: "gender",
    title: "Gender (Jins — جِنْس)",
    emoji: "⚧️",
    color: "#7C3AED",
    description: "Masculine (Mudhakkar) and Feminine (Muannath) — 6 signs of feminine nouns",
    concepts: [
      { term: "مُذَكَّر", arabic: "مُذَكَّر", transliteration: "mudhakkar", english: "Masculine noun" },
      { term: "مُؤَنَّث", arabic: "مُؤَنَّث", transliteration: "muannath", english: "Feminine noun" },
      { term: "تَاء مَرْبُوطَة", arabic: "ة", transliteration: "taa marbutah", english: "Feminine ending ة on nouns — most common sign" },
      { term: "أَلِف مَقْصُورَة", arabic: "ى", transliteration: "alif maqsurah", english: "Feminine ending ى (e.g., لَيْلَى)" },
      { term: "أَلِف مَمْدُودَة", arabic: "اء", transliteration: "alif mamdudah", english: "Feminine ending اء (e.g., حَمْرَاء، صَحْرَاء)" },
      { term: "شَمْس", arabic: "شَمْس", english: "Sun — feminine by Arab usage (no visible sign)", note: "Also: نَار fire, أَرْض earth, رِيح wind, دَار house, حَرْب war" },
    ],
    rules: [
      "3 physical signs of feminine: ends with ة (taa marbutah), ends with ى (alif maqsurah), ends with اء (alif mamdudah)",
      "3 meaning signs of feminine: paired body parts (عَيْن eye, رِجْل leg), biological female (أُم mother, بِنْت girl), words Arabs defined as feminine (شَمْس، نَار)",
      "Names of countries are feminine (كَنَدَا، أَمْرِيكَا)",
      "To make masculine → feminine: add ة, move last haraka to ة, add fatha before ة",
      "Example: جَمِيلٌ → جَمِيلَةٌ (beautiful m → beautiful f)",
      "Example: طَوِيلٌ → طَوِيلَةٌ (tall m → tall f)",
    ],
    drills: [
      { question: "Is لَيْلَى masculine or feminine?", arabic: "لَيْلَى", answer: "Feminine", explanation: "Ends with ى (alif maqsurah)" },
      { question: "Is كَنَدَا masculine or feminine?", arabic: "كَنَدَا", answer: "Feminine", explanation: "Name of a country — always feminine" },
      { question: "Is حَمْرَاءُ masculine or feminine?", arabic: "حَمْرَاءُ", answer: "Feminine", explanation: "Ends with اء (alif mamdudah)" },
      { question: "Is كِتَابٍ masculine or feminine?", arabic: "كِتَابٍ", answer: "Masculine", explanation: "No feminine signs" },
      { question: "Is شَمْسٍ masculine or feminine?", arabic: "شَمْسٍ", answer: "Feminine", explanation: "Arabs defined it as feminine (meaning sign)" },
      { question: "Is أَرْضٍ masculine or feminine?", arabic: "أَرْضٍ", answer: "Feminine", explanation: "Arabs defined it as feminine (meaning sign)" },
      { question: "Is أُمٌّ masculine or feminine?", arabic: "أُمٌّ", answer: "Feminine", explanation: "Biological feminine (female person)" },
      { question: "Is رِجْلٌ masculine or feminine?", arabic: "رِجْلٌ", answer: "Feminine", explanation: "Paired body part — meaning sign of feminine" },
      { question: "Convert جَمِيلٌ to feminine", arabic: "جَمِيلٌ", answer: "جَمِيلَةٌ", explanation: "Add ة, move last haraka to ة, add fatha before it" },
      { question: "How many signs of feminine are there?", answer: "6 — 3 physical signs (ة، ى، اء) and 3 meaning signs (pairs, biological, Arab usage)", explanation: "Both types must be memorized" },
    ],
  },

  {
    id: "iraab",
    title: "I'rab — Grammatical States",
    emoji: "🔤",
    color: "#059669",
    description: "The 3 grammatical states: Rafa (nominative), Nasb (accusative), Jarr (genitive)",
    concepts: [
      { term: "إِعْرَاب", arabic: "إِعْرَاب", transliteration: "i'rab", english: "The grammatical state of a noun shown by its vowel ending" },
      { term: "مَرْفُوع / رَفْع", arabic: "مَرْفُوعٌ", transliteration: "marfu' / rafa'", english: "Nominative state — marked by Dammah (ُ) or Tanween Dammah (ٌ)" },
      { term: "مَنْصُوب / نَصْب", arabic: "مَنْصُوبٌ", transliteration: "mansub / nasb", english: "Accusative state — marked by Fathah (َ) or Tanween Fathah (ً)" },
      { term: "مَجْرُور / جَرّ", arabic: "مَجْرُورٌ", transliteration: "majrur / jarr", english: "Genitive state — marked by Kasrah (ِ) or Tanween Kasrah (ٍ)" },
    ],
    rules: [
      "Rafa (Dammah ُ or ٌ) = subject of sentence / doer of verb",
      "Nasb (Fathah َ or ً) = object of verb / after certain particles",
      "Jarr (Kasrah ِ or ٍ) = after a preposition (حرف جر) or in a possessive",
      "Dual: Rafa = ـَانِ | Nasb/Jarr = ـَيْنِ",
      "Masc. Sound Plural: Rafa = ـُوْنَ | Nasb/Jarr = ـِيْنَ",
      "Fem. Sound Plural: Rafa = ـَاتٌ | Nasb/Jarr = ـَاتٍ",
      "Two Fathahs (ً) require adding Alif: كِتَابًا — EXCEPT words ending in ة or اء",
    ],
    drills: [
      { question: "What is the state of شَيْءٍ?", arabic: "شَيْءٍ", answer: "Jarr", explanation: "Has tanween kasrah (ٍ)" },
      { question: "What is the state of الْجَنَّةَ?", arabic: "الْجَنَّةَ", answer: "Nasb", explanation: "Ends with Fathah (َ)" },
      { question: "What is the state of سَحَابٌ?", arabic: "سَحَابٌ", answer: "Rafa", explanation: "Has tanween dammah (ٌ)" },
      { question: "What is the state of نَهَارًا?", arabic: "نَهَارًا", answer: "Nasb", explanation: "Has tanween fathah (ً)" },
      { question: "What is the state of الْجَمِيلِ?", arabic: "الْجَمِيلِ", answer: "Jarr", explanation: "Ends with Kasrah (ِ)" },
      { question: "What is the state of الْبَيْتُ?", arabic: "الْبَيْتُ", answer: "Rafa", explanation: "Ends with Dammah (ُ)" },
      { question: "What is the state of مَطَرٌ?", arabic: "مَطَرٌ", answer: "Rafa", explanation: "Has tanween dammah (ٌ)" },
      { question: "What is the state of الْفَاكِهَةَ?", arabic: "الْفَاكِهَةَ", answer: "Nasb", explanation: "Ends with Fathah (َ)" },
      { question: "What is the state of شَجَرَةً?", arabic: "شَجَرَةً", answer: "Nasb", explanation: "Has tanween fathah (ً) — no Alif added because it ends in ة" },
      { question: "What vowel marks Rafa for a definite singular noun?", answer: "Dammah (ُ)", explanation: "Indefinite = ٌ (two dammahs), Definite = ُ (one dammah)" },
    ],
  },

  {
    id: "number",
    title: "Number (Adad — عَدَد)",
    emoji: "🔢",
    color: "#DC2626",
    description: "Singular, Dual, and Plural — sound and broken plurals",
    concepts: [
      { term: "مُفْرَد", arabic: "مُفْرَد", transliteration: "mufrad", english: "Singular — one thing" },
      { term: "تَثْنِيَة", arabic: "تَثْنِيَة", transliteration: "tathniya", english: "Dual — exactly two, add ـَانِ (rafa) or ـَيْنِ (nasb/jarr)" },
      { term: "جَمْع سَالِم", arabic: "جَمْع سَالِم", transliteration: "jam' salim", english: "Sound plural — root unchanged, add endings", note: "Masc: ـُوْنَ/ـِيْنَ | Fem: ـَاتٌ/ـَاتٍ" },
      { term: "جَمْع مُكَسَّر", arabic: "جَمْع مُكَسَّر", transliteration: "jam' mukassar", english: "Broken plural — internal structure changes, must be memorized", note: "بَيْت→بُيُوت، كِتَاب→كُتُب، رَجُل→رِجَال" },
    ],
    rules: [
      "Dual: add ـَانِ for Rafa, ـَيْنِ for Nasb and Jarr",
      "Sound Masc. Plural: ـُوْنَ (Rafa) / ـِيْنَ (Nasb/Jarr)",
      "Sound Fem. Plural: ـَاتٌ (Rafa) / ـَاتٍ (Nasb/Jarr)",
      "Broken plurals change internal structure — no fixed rule, must memorize each one",
      "Common broken plurals: بَيْت→بُيُوت، كِتَاب→كُتُب، رَجُل→رِجَال، قَلَم→أَقْلَام",
      "Some words are plural in meaning (collective): قَوْم (nation), نَاس (people), جُنْد (army)",
    ],
    drills: [
      { question: "What do you add to make a dual noun (Rafa)?", answer: "ـَانِ", explanation: "Example: كِتَابٌ → كِتَابَانِ (two books)" },
      { question: "What do you add to make a dual noun (Nasb/Jarr)?", answer: "ـَيْنِ", explanation: "Example: كِتَابَيْنِ" },
      { question: "What is the sound masculine plural Rafa ending?", answer: "ـُوْنَ", explanation: "Example: مُسْلِمُوْنَ (Muslims)" },
      { question: "What is the sound feminine plural Rafa ending?", answer: "ـَاتٌ", explanation: "Example: مُسْلِمَاتٌ (Muslim women)" },
      { question: "What is the broken plural of كِتَاب?", arabic: "كِتَاب", answer: "كُتُب", explanation: "Internal vowels change — must be memorized" },
      { question: "What is the broken plural of رَجُل?", arabic: "رَجُل", answer: "رِجَال", explanation: "Internal structure changes completely" },
      { question: "What is the broken plural of قَلَم?", arabic: "قَلَم", answer: "أَقْلَام", explanation: "Broken plural — adds أَ prefix and changes vowels" },
      { question: "What type of plural is مُسْلِمُوْنَ?", arabic: "مُسْلِمُوْنَ", answer: "Sound masculine plural (جَمْع مُذَكَّر سَالِم)", explanation: "Root letters unchanged, ـُوْنَ added" },
    ],
  },

  {
    id: "huroof-jarr",
    title: "Huroof Jarr (Prepositions)",
    emoji: "🔗",
    color: "#0891B2",
    description: "The 11 Arabic prepositions — each puts the following noun into Jarr state",
    concepts: [
      { term: "بِ", transliteration: "bi", english: "With / By" },
      { term: "تَ", transliteration: "ta", english: "By (used in oaths)" },
      { term: "كَ", transliteration: "ka", english: "Like / As" },
      { term: "لِ", transliteration: "li", english: "For / Belong to" },
      { term: "وَ", transliteration: "wa", english: "By (used in oaths)" },
      { term: "مِنْ", transliteration: "min", english: "From" },
      { term: "فِي", transliteration: "fi", english: "In / Inside" },
      { term: "عَنْ", transliteration: "'an", english: "About / Away from" },
      { term: "عَلَى", transliteration: "'ala", english: "Upon / On / Against" },
      { term: "حَتَّى", transliteration: "hatta", english: "Until / Up to" },
      { term: "إِلَى", transliteration: "ila", english: "Towards / To" },
    ],
    rules: [
      "All 11 Huroof Jarr make the noun after them Majroor (Jarr state — Kasrah)",
      "Jaar wa Majroor = the preposition + the noun after it (together they are a fragment)",
      "The noun after a Harf Jarr MUST have Kasrah (ِ) or tanween kasrah (ٍ)",
      "Memorize all 11: بِ تَ كَ لِ وَ مِنْ فِي عَنْ عَلَى حَتَّى إِلَى",
      "Example: فِي الْبَيْتِ = in the house (بَيْت goes to Jarr → الْبَيْتِ)",
      "Example: مِنَ الْمَدْرَسَةِ = from the school",
    ],
    drills: [
      { question: "What does مِنْ mean?", arabic: "مِنْ", answer: "From", explanation: "Harf Jarr — مِنَ الْمَسْجِدِ = from the masjid" },
      { question: "What does فِي mean?", arabic: "فِي", answer: "In / Inside", explanation: "Harf Jarr — فِي الْبَيْتِ = in the house" },
      { question: "What does عَلَى mean?", arabic: "عَلَى", answer: "Upon / On", explanation: "Harf Jarr — عَلَى الطَّاوِلَةِ = on the table" },
      { question: "What does إِلَى mean?", arabic: "إِلَى", answer: "Towards / To", explanation: "Harf Jarr — إِلَى الْمَسْجِدِ = towards the masjid" },
      { question: "What does لِ mean?", arabic: "لِ", answer: "For / Belong to", explanation: "Harf Jarr — لِلطَّالِبِ = for the student" },
      { question: "What does بِ mean?", arabic: "بِ", answer: "With / By", explanation: "Harf Jarr — بِالْقَلَمِ = with the pen" },
      { question: "Is عَلَى سَيَّارَاتٌ correct?", arabic: "عَلَى سَيَّارَاتٌ", answer: "No — should be عَلَى سَيَّارَاتٍ", explanation: "Noun after Harf Jarr must be Majroor (Kasrah/tanween kasrah)" },
      { question: "How many Huroof Jarr are there?", answer: "11", explanation: "بِ تَ كَ لِ وَ مِنْ فِي عَنْ عَلَى حَتَّى إِلَى" },
      { question: "What does عَنْ mean?", arabic: "عَنْ", answer: "About / Away from", explanation: "Harf Jarr — عَنِ الدِّيْنِ = about the religion" },
      { question: "What does كَ mean?", arabic: "كَ", answer: "Like / As", explanation: "Harf Jarr — كَالْأَسَدِ = like a lion" },
    ],
  },

  {
    id: "mawsoof-siffah",
    title: "Mawsoof Siffah (Noun + Adjective)",
    emoji: "🎨",
    color: "#D97706",
    description: "Noun-adjective pairs must match on ALL 4 properties (DING)",
    concepts: [
      { term: "مَوْصُوف", arabic: "مَوْصُوف", transliteration: "mawsoof", english: "The noun being described — comes FIRST" },
      { term: "صِفَة", arabic: "صِفَة", transliteration: "sifah", english: "The adjective/description — comes AFTER the noun" },
    ],
    rules: [
      "Noun comes FIRST, adjective follows — opposite of English order",
      "Noun and adjective must MATCH on all 4 properties: Definite/Indefinite, Gender, I'rab, Number",
      "If noun is definite (ال), adjective must also have ال",
      "If noun is feminine (ة), adjective must also be feminine (ة)",
      "Example: الْكِتَابُ الثَّقِيلُ = The heavy book (both definite, masc, rafa, singular)",
      "Example: بِنْتٌ جَمِيلَةٌ = A beautiful girl (both indefinite, fem, rafa, singular)",
      "Example: الطَّالِبَةُ الْمُجْتَهِدَةُ = The hardworking female student (all 4 match)",
      "A noun can have ONE or MORE adjectives following it",
    ],
    drills: [
      { question: "Translate: الْكِتَابُ الثَّقِيلُ", arabic: "الْكِتَابُ الثَّقِيلُ", answer: "The heavy book", explanation: "Definite + definite, masculine, rafa, singular — all 4 match" },
      { question: "Translate: بِنْتٌ جَمِيلَةٌ", arabic: "بِنْتٌ جَمِيلَةٌ", answer: "A beautiful girl", explanation: "Indefinite + indefinite, feminine, rafa, singular" },
      { question: "Is الطَّالِبَةُ مُجْتَهِدٌ correct?", arabic: "الطَّالِبَةُ مُجْتَهِدٌ", answer: "No — should be الطَّالِبَةُ الْمُجْتَهِدَةُ", explanation: "Noun is definite feminine → adjective must also be definite (ال) and feminine (ة)" },
      { question: "Translate: بَيْتٌ كَبِيرٌ", arabic: "بَيْتٌ كَبِيرٌ", answer: "A big house", explanation: "Indefinite masculine rafa singular — both match perfectly" },
      { question: "How many properties must Mawsoof and Sifah share?", answer: "4 — Definite/Indefinite, Gender, I'rab, Number", explanation: "All 4 DING characteristics must match" },
      { question: "Translate: السَّبُّوْرَةُ النَّظِيفَةُ", arabic: "السَّبُّوْرَةُ النَّظِيفَةُ", answer: "The clean board", explanation: "Both definite, feminine, rafa, singular" },
      { question: "In Arabic, does the adjective come before or after the noun?", answer: "After the noun", explanation: "Opposite of English — Arabic: noun then adjective" },
    ],
  },

  {
    id: "mudhaaf",
    title: "Mudhaaf & Mudhaaf Ilaih",
    emoji: "🏠",
    color: "#9333EA",
    description: "The Arabic possessive construction — 'the book of the teacher'",
    concepts: [
      { term: "مُضَاف", arabic: "مُضَاف", transliteration: "mudhaaf", english: "The first noun — the possessed/owned thing", note: "NEVER takes ال or tanween" },
      { term: "مُضَاف إِلَيْه", arabic: "مُضَاف إِلَيْه", transliteration: "mudhaaf ilayh", english: "The second noun — the owner/possessor, ALWAYS in Jarr state" },
    ],
    rules: [
      "Mudhaaf (first noun) NEVER takes ال or tanween on it",
      "Mudhaaf Ilaih (second noun) is ALWAYS in Jarr state (kasrah)",
      "English: 'student's book' | Arabic: 'book of-the-student' (كِتَابُ الطَّالِبِ)",
      "Mudhaaf takes its I'rab from its position in the sentence (subject/object/after preposition)",
      "If Mudhaaf Ilaih has ال, the whole phrase becomes definite",
      "Chain possessives are possible: بَابُ غُرْفَةِ الْبَيْتِ = door of the room of the house",
      "Example: كِتَابُ الطَّالِبِ = The student's book",
      "Example: بَيْتُ الرَّجُلِ = The man's house",
    ],
    drills: [
      { question: "In كِتَابُ الطَّالِبِ, which word is the Mudhaaf?", arabic: "كِتَابُ الطَّالِبِ", answer: "كِتَابُ (the book)", explanation: "Mudhaaf = the first noun (the thing being possessed)" },
      { question: "In كِتَابُ الطَّالِبِ, which word is the Mudhaaf Ilaih?", arabic: "كِتَابُ الطَّالِبِ", answer: "الطَّالِبِ (the student)", explanation: "Mudhaaf Ilaih = the second noun, always in Jarr state" },
      { question: "Can Mudhaaf have ال?", answer: "No — Mudhaaf NEVER takes ال or tanween", explanation: "This is a defining rule of the construction" },
      { question: "What state is Mudhaaf Ilaih always in?", answer: "Jarr (Kasrah/tanween kasrah)", explanation: "Always — no exceptions" },
      { question: "Translate: بَابُ الْبَيْتِ", arabic: "بَابُ الْبَيْتِ", answer: "The door of the house / The house's door", explanation: "Mudhaaf = بَاب, Mudhaaf Ilaih = الْبَيْتِ (in Jarr)" },
      { question: "Translate into Arabic: The teacher's pen", answer: "قَلَمُ الْأُسْتَاذِ", explanation: "Mudhaaf = قَلَم (no ال), Mudhaaf Ilaih = الْأُسْتَاذِ (in Jarr)" },
    ],
  },

  {
    id: "jumla-ismiyyah",
    title: "Jumla Ismiyyah (Nominal Sentence)",
    emoji: "📝",
    color: "#16A34A",
    description: "Arabic sentences starting with a noun — Mubtada (subject) + Khabar (predicate)",
    concepts: [
      { term: "جُمْلَة اِسْمِيَّة", arabic: "جُمْلَة اِسْمِيَّة", transliteration: "jumla ismiyyah", english: "Nominal sentence — begins with a noun (ism)" },
      { term: "مُبْتَدَأ", arabic: "مُبْتَدَأ", transliteration: "mubtada", english: "Subject of the nominal sentence — always Rafa, always definite" },
      { term: "خَبَر", arabic: "خَبَر", transliteration: "khabar", english: "Predicate — completes the meaning, always Rafa" },
    ],
    rules: [
      "Jumla Ismiyyah = Mubtada (subject) + Khabar (predicate)",
      "Both Mubtada and Khabar are ALWAYS in Rafa state",
      "Mubtada is always definite (marifa)",
      "There is no verb 'is/are' in Arabic — it is implied",
      "Example: الْوَلَدُ طَوِيلٌ = The boy is tall",
      "Example: الطَّالِبَةُ مُجْتَهِدَةٌ = The female student is hardworking",
      "Example: الْبَيْتُ كَبِيرٌ = The house is big",
      "Khabar can be: adjective, Jaar wa Majroor phrase, another noun, or a full sentence",
    ],
    drills: [
      { question: "What are the two parts of Jumla Ismiyyah?", answer: "Mubtada (subject) + Khabar (predicate)", explanation: "Both are always in Rafa state" },
      { question: "Translate: الْوَلَدُ طَوِيلٌ", arabic: "الْوَلَدُ طَوِيلٌ", answer: "The boy is tall", explanation: "الْوَلَدُ = mubtada (rafa), طَوِيلٌ = khabar (rafa)" },
      { question: "What state are Mubtada and Khabar always in?", answer: "Rafa (Dammah)", explanation: "Both must be Marfu'" },
      { question: "Is Mubtada definite or indefinite?", answer: "Always definite (Marifa)", explanation: "You cannot say 'a boy is tall' as a complete statement in Arabic" },
      { question: "Translate: الْبَيْتُ كَبِيرٌ", arabic: "الْبَيْتُ كَبِيرٌ", answer: "The house is big", explanation: "No verb 'is' needed — it is implied in Arabic" },
      { question: "Translate: الطَّالِبُ فِي الْفَصْلِ", arabic: "الطَّالِبُ فِي الْفَصْلِ", answer: "The student is in the classroom", explanation: "Khabar is a Jaar wa Majroor phrase (فِي الْفَصْلِ)" },
    ],
  },

  {
    id: "inna",
    title: "Inna and Her Sisters",
    emoji: "⚡",
    color: "#1E293B",
    description: "إِنَّ and her 5 sisters — particles that put the Mubtada into Nasb state",
    concepts: [
      { term: "إِنَّ", arabic: "إِنَّ", transliteration: "inna", english: "Indeed / Verily — emphasizes the sentence" },
      { term: "أَنَّ", arabic: "أَنَّ", transliteration: "anna", english: "That — used after verbs of knowing/saying" },
      { term: "كَأَنَّ", arabic: "كَأَنَّ", transliteration: "ka'anna", english: "As if / It is as though" },
      { term: "لَكِنَّ", arabic: "لَكِنَّ", transliteration: "lakinna", english: "But / However" },
      { term: "لَيْتَ", arabic: "لَيْتَ", transliteration: "layta", english: "I wish / If only" },
      { term: "لَعَلَّ", arabic: "لَعَلَّ", transliteration: "la'alla", english: "Perhaps / Maybe" },
    ],
    rules: [
      "Inna and her 5 sisters come at the START of a Jumla Ismiyyah",
      "They put the Mubtada into NASB state — now called اسم إنّ",
      "The Khabar REMAINS in RAFA state — now called خبر إنّ",
      "Example: الْوَلَدُ طَوِيلٌ → إِنَّ الْوَلَدَ طَوِيلٌ (وَلَدَ goes to nasb)",
      "Memorize all 6: إِنَّ، أَنَّ، كَأَنَّ، لَكِنَّ، لَيْتَ، لَعَلَّ",
      "إِنَّ اللهَ عَلِيمٌ = Indeed Allah is All-Knowing (very common Quranic pattern)",
    ],
    drills: [
      { question: "How many sisters does إِنَّ have?", answer: "5 sisters (6 total including إِنَّ)", explanation: "إِنَّ، أَنَّ، كَأَنَّ، لَكِنَّ، لَيْتَ، لَعَلَّ" },
      { question: "What state does إِنَّ put the Mubtada in?", answer: "Nasb (Fathah)", explanation: "The subject (اسم إنّ) becomes mansub" },
      { question: "What state does the Khabar remain in after إِنَّ?", answer: "Rafa (Dammah)", explanation: "Khabar إِنَّ remains marfu'" },
      { question: "What does لَيْتَ mean?", arabic: "لَيْتَ", answer: "I wish / If only", explanation: "Expresses a wish or hope — لَيْتَ الْجَوَّ بَارِدٌ = I wish the weather were cold" },
      { question: "What does لَعَلَّ mean?", arabic: "لَعَلَّ", answer: "Perhaps / Maybe", explanation: "Expresses possibility" },
      { question: "What does لَكِنَّ mean?", arabic: "لَكِنَّ", answer: "But / However", explanation: "Conjunction of contrast" },
      { question: "Change to use إِنَّ: الطَّالِبُ مُجْتَهِدٌ", arabic: "الطَّالِبُ مُجْتَهِدٌ", answer: "إِنَّ الطَّالِبَ مُجْتَهِدٌ", explanation: "الطَّالِبُ → الطَّالِبَ (nasb), مُجْتَهِدٌ stays rafa" },
    ],
  },

  {
    id: "pronouns",
    title: "Pronouns (Damair — ضَمَائِر)",
    emoji: "👤",
    color: "#BE185D",
    description: "Detached and attached Arabic pronouns — all persons, genders, and numbers",
    concepts: [
      { term: "ضَمِير مُنْفَصِل", arabic: "ضَمِير مُنْفَصِل", transliteration: "damir munfasil", english: "Detached pronoun — stands alone, always in Rafa state" },
      { term: "ضَمِير مُتَّصِل", arabic: "ضَمِير مُتَّصِل", transliteration: "damir muttasil", english: "Attached pronoun — joins to noun/verb, in Nasb or Jarr" },
      { term: "هُوَ", arabic: "هُوَ", transliteration: "huwa", english: "He" },
      { term: "هِيَ", arabic: "هِيَ", transliteration: "hiya", english: "She" },
      { term: "هُمَا", arabic: "هُمَا", transliteration: "huma", english: "They two (dual — masc or fem)" },
      { term: "هُمْ", arabic: "هُمْ", transliteration: "hum", english: "They (masculine plural)" },
      { term: "هُنَّ", arabic: "هُنَّ", transliteration: "hunna", english: "They (feminine plural)" },
      { term: "أَنْتَ", arabic: "أَنْتَ", transliteration: "anta", english: "You (masculine singular)" },
      { term: "أَنْتِ", arabic: "أَنْتِ", transliteration: "anti", english: "You (feminine singular)" },
      { term: "أَنْتُمْ", arabic: "أَنْتُمْ", transliteration: "antum", english: "You all (masculine plural)" },
      { term: "أَنَا", arabic: "أَنَا", transliteration: "ana", english: "I" },
      { term: "نَحْنُ", arabic: "نَحْنُ", transliteration: "nahnu", english: "We" },
    ],
    rules: [
      "Detached pronouns are always in Rafa state — they serve as the subject",
      "Attached pronouns are in Nasb (as object) or Jarr (as possessive) state",
      "Attached as object: ضَرَبَهُ زَيْدٌ = Zaid hit HIM (هُ = him, nasb)",
      "Attached as possessive: كِتَابُهُ = HIS book (هُ = his, jarr)",
      "هُ becomes هِ after Kasrah or long vowel: فِيهِ = in it",
      "Arabic distinguishes dual (2) from plural (3+) — English does not",
    ],
    drills: [
      { question: "What does هُوَ mean?", arabic: "هُوَ", answer: "He", explanation: "3rd person masculine singular detached pronoun" },
      { question: "What does هِيَ mean?", arabic: "هِيَ", answer: "She", explanation: "3rd person feminine singular detached pronoun" },
      { question: "What does هُمَا mean?", arabic: "هُمَا", answer: "They two (dual)", explanation: "Used for exactly two people — Arabic has dual separate from plural" },
      { question: "What does نَحْنُ mean?", arabic: "نَحْنُ", answer: "We", explanation: "1st person plural" },
      { question: "What does أَنْتُمْ mean?", arabic: "أَنْتُمْ", answer: "You all (masculine plural)", explanation: "2nd person masculine plural" },
      { question: "What state are detached pronouns always in?", answer: "Rafa (Dammah)", explanation: "They serve as the subject of the sentence" },
      { question: "كِتَابُهُ — what does هُ mean here?", arabic: "كِتَابُهُ", answer: "His (possessive)", explanation: "Attached pronoun in Jarr state — كِتَاب = book of him = his book" },
      { question: "ضَرَبَهُ — what does هُ mean here?", arabic: "ضَرَبَهُ", answer: "Him (object)", explanation: "Attached pronoun in Nasb state — he hit him" },
    ],
  },

  {
    id: "past-tense",
    title: "Past Tense Verbs (Fi'l Maadi)",
    emoji: "⏮️",
    color: "#374151",
    description: "How to conjugate past tense verbs for all 14 persons in Arabic",
    concepts: [
      { term: "فِعْل مَاضِي", arabic: "فِعْل مَاضِي", transliteration: "fi'l maadi", english: "Past tense verb — action already completed" },
      { term: "فَعَلَ", arabic: "فَعَلَ", transliteration: "fa'ala", english: "He did — base/dictionary form (3rd person masc. singular)" },
      { term: "فَاعِل", arabic: "فَاعِل", transliteration: "faa'il", english: "The doer of the action — always in Rafa state" },
      { term: "مَفْعُول بِه", arabic: "مَفْعُول بِه", transliteration: "maf'ul bihi", english: "The object (what is acted upon) — always in Nasb state" },
    ],
    rules: [
      "Base form = 3rd person masculine singular (هُوَ): فَعَلَ = he did",
      "هُوَ فَعَلَ → هِيَ فَعَلَتْ → هُمَا فَعَلَا → هُمْ فَعَلُوا → هُنَّ فَعَلْنَ",
      "أَنْتَ فَعَلْتَ → أَنْتِ فَعَلْتِ → أَنْتُمَا فَعَلْتُمَا → أَنْتُمْ فَعَلْتُمْ → أَنْتُنَّ فَعَلْتُنَّ",
      "أَنَا فَعَلْتُ → نَحْنُ فَعَلْنَا",
      "The Faa'il (doer) is ALWAYS in Rafa state",
      "The Maf'ul Bihi (object) is ALWAYS in Nasb state",
      "If the doer is a pronoun, it is attached to the verb as a suffix",
    ],
    drills: [
      { question: "What is the base form of an Arabic past tense verb?", answer: "3rd person masculine singular (هُوَ form) — e.g., فَعَلَ, ذَهَبَ, كَتَبَ", explanation: "This is also the dictionary form" },
      { question: "Conjugate فَعَلَ for هِيَ", arabic: "فَعَلَ", answer: "فَعَلَتْ", explanation: "Add تْ for 3rd person feminine singular" },
      { question: "Conjugate فَعَلَ for هُمْ", arabic: "فَعَلَ", answer: "فَعَلُوا", explanation: "Add وا for 3rd person masculine plural" },
      { question: "Conjugate فَعَلَ for أَنَا", arabic: "فَعَلَ", answer: "فَعَلْتُ", explanation: "Add تُ for 1st person singular" },
      { question: "Conjugate فَعَلَ for نَحْنُ", arabic: "فَعَلَ", answer: "فَعَلْنَا", explanation: "Add نَا for 1st person plural" },
      { question: "What state is the Faa'il (doer) always in?", answer: "Rafa (Dammah)", explanation: "The doer is always the subject — always marfu'" },
      { question: "What state is the Maf'ul Bihi (object) always in?", answer: "Nasb (Fathah)", explanation: "The object is always mansub" },
    ],
  },

  {
    id: "present-command",
    title: "Present, Command & Passive Verbs",
    emoji: "▶️",
    color: "#047857",
    description: "Present tense (Mudaari'), command (Amr), prohibition (Nahy), and passive verbs",
    concepts: [
      { term: "فِعْل مُضَارِع", arabic: "فِعْل مُضَارِع", transliteration: "fi'l mudaari'", english: "Present/future tense verb — ongoing or future action" },
      { term: "فِعْل أَمْر", arabic: "فِعْل أَمْر", transliteration: "fi'l amr", english: "Command verb (imperative) — do this!" },
      { term: "فِعْل نَهْي", arabic: "فِعْل نَهْي", transliteration: "fi'l nahy", english: "Prohibition — do NOT do this (لَا + jussive)" },
      { term: "فِعْل مَجْهُول", arabic: "فِعْل مَجْهُول", transliteration: "fi'l majhool", english: "Passive voice — action done to subject, doer unknown" },
      { term: "نَائِب فَاعِل", arabic: "نَائِب فَاعِل", transliteration: "na'ib faa'il", english: "Substitute doer (passive subject) — always in Rafa state" },
    ],
    rules: [
      "Present tense verb starts with one of 4 prefix letters: أ ن ي ت (I, We, He/She, You)",
      "هُوَ يَفْعَلُ = He does | هِيَ تَفْعَلُ = She does",
      "أَنَا أَفْعَلُ = I do | نَحْنُ نَفْعَلُ = We do | أَنْتَ تَفْعَلُ = You do",
      "Command verb: remove prefix letter, adjust vowels — اِفْعَلْ = Do it!",
      "Prohibition: لَا + present tense jussive: لَا تَفْعَلْ = Do not do!",
      "Passive past tense: فَعَلَ → فُعِلَ (1st vowel → Damma, 2nd vowel → Kasra)",
      "Passive present tense: يَفْعَلُ → يُفْعَلُ (prefix vowel → Damma)",
      "Naib Faa'il (passive subject) is always in Rafa state",
    ],
    drills: [
      { question: "What are the 4 prefix letters of present tense verbs?", answer: "أ ن ي ت — standing for أَنَا (I), نَحْنُ (We), هُوَ/هِيَ (He/She), أَنْتَ (You)", explanation: "Every present tense verb starts with one of these" },
      { question: "Translate: يَكْتُبُ الطَّالِبُ", arabic: "يَكْتُبُ الطَّالِبُ", answer: "The student writes / is writing", explanation: "يَكْتُبُ = present tense, الطَّالِبُ = faa'il (rafa)" },
      { question: "How do you make the prohibition (don't do)?", answer: "لَا + present tense verb in jussive: لَا تَفْعَلْ", explanation: "لَا تَذْهَبْ = Don't go | لَا تَأْكُلْ = Don't eat" },
      { question: "Convert to passive: كَتَبَ (he wrote)", arabic: "كَتَبَ", answer: "كُتِبَ (it was written)", explanation: "1st vowel → Damma, 2nd vowel → Kasra" },
      { question: "Convert to passive present: يَكْتُبُ (he writes)", arabic: "يَكْتُبُ", answer: "يُكْتَبُ (it is written)", explanation: "Prefix vowel changes to Damma" },
      { question: "What state is the Naib Faa'il (passive subject) in?", answer: "Rafa (Dammah)", explanation: "Even in passive, the subject is marfu'" },
      { question: "Form the command from كَتَبَ (to write)", arabic: "كَتَبَ", answer: "اُكْتُبْ (Write!)", explanation: "Remove prefix, add اِ/اُ at start, adjust vowels" },
    ],
  },
];
