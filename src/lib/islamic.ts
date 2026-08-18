// ─── Quran Verses ───────────────────────────────────────────────────────────
export interface QuranVerse {
  id: number;
  surah: string;
  surahEn: string;
  ayah: number;
  arabic: string;
  transliteration: string;
  english: string;
  topic: string;
  note?: string;
}

export const quranVerses: QuranVerse[] = [
  { id: 1,  surah: "الفاتحة",   surahEn: "Al-Fatiha",    ayah: 1,  arabic: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",              transliteration: "Bismillāhi r-raḥmāni r-raḥīm",          english: "In the name of Allah, the Most Gracious, the Most Merciful",     topic: "Opening", note: "Every surah begins with this" },
  { id: 2,  surah: "الفاتحة",   surahEn: "Al-Fatiha",    ayah: 2,  arabic: "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ",                transliteration: "Al-ḥamdu lillāhi rabbi l-ʿālamīn",       english: "All praise is due to Allah, Lord of all the worlds",             topic: "Praise" },
  { id: 3,  surah: "الفاتحة",   surahEn: "Al-Fatiha",    ayah: 5,  arabic: "إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ",              transliteration: "Iyyāka naʿbudu wa-iyyāka nastaʿīn",      english: "You alone we worship, and You alone we ask for help",            topic: "Worship" },
  { id: 4,  surah: "الفاتحة",   surahEn: "Al-Fatiha",    ayah: 6,  arabic: "اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ",                   transliteration: "Ihdinā ṣ-ṣirāṭa l-mustaqīm",            english: "Guide us to the straight path",                                  topic: "Guidance" },
  { id: 5,  surah: "البقرة",    surahEn: "Al-Baqarah",   ayah: 255,arabic: "اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ",  transliteration: "Allāhu lā ilāha illā huwa l-ḥayyu l-qayyūm", english: "Allah — there is no deity except Him, the Ever-Living, the Sustainer", topic: "Ayat al-Kursi", note: "Greatest verse in the Quran" },
  { id: 6,  surah: "البقرة",    surahEn: "Al-Baqarah",   ayah: 286,arabic: "لَا يُكَلِّفُ اللَّهُ نَفْسًا إِلَّا وُسْعَهَا",        transliteration: "Lā yukallifu llāhu nafsan illā wusʿahā",  english: "Allah does not burden a soul beyond that it can bear",           topic: "Mercy" },
  { id: 7,  surah: "آل عمران",  surahEn: "Ali Imran",    ayah: 173,arabic: "حَسْبُنَا اللَّهُ وَنِعْمَ الْوَكِيلُ",                 transliteration: "Ḥasbunā llāhu wa-niʿma l-wakīl",         english: "Sufficient for us is Allah, and He is the best Disposer of affairs", topic: "Trust in Allah" },
  { id: 8,  surah: "الإخلاص",   surahEn: "Al-Ikhlas",    ayah: 1,  arabic: "قُلْ هُوَ اللَّهُ أَحَدٌ",                              transliteration: "Qul huwa llāhu aḥad",                     english: "Say: He is Allah, the One",                                      topic: "Tawheed", note: "Worth 1/3 of the Quran" },
  { id: 9,  surah: "الإخلاص",   surahEn: "Al-Ikhlas",    ayah: 2,  arabic: "اللَّهُ الصَّمَدُ",                                     transliteration: "Allāhu ṣ-ṣamad",                          english: "Allah, the Eternal Refuge",                                      topic: "Tawheed" },
  { id: 10, surah: "الناس",     surahEn: "An-Nas",       ayah: 1,  arabic: "قُلْ أَعُوذُ بِرَبِّ النَّاسِ",                         transliteration: "Qul aʿūdhu bi-rabbi n-nās",               english: "Say: I seek refuge in the Lord of mankind",                      topic: "Protection" },
  { id: 11, surah: "الفلق",     surahEn: "Al-Falaq",     ayah: 1,  arabic: "قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ",                        transliteration: "Qul aʿūdhu bi-rabbi l-falaq",             english: "Say: I seek refuge in the Lord of daybreak",                     topic: "Protection" },
  { id: 12, surah: "يوسف",      surahEn: "Yusuf",        ayah: 87, arabic: "إِنَّهُ لَا يَيْأَسُ مِن رَّوْحِ اللَّهِ إِلَّا الْقَوْمُ الْكَافِرُونَ", transliteration: "Innahu lā yayʾasu min rawḥi llāhi illā l-qawmu l-kāfirūn", english: "Indeed, no one despairs of relief from Allah except the disbelieving people", topic: "Hope" },
  { id: 13, surah: "الشرح",     surahEn: "Ash-Sharh",    ayah: 5,  arabic: "فَإِنَّ مَعَ الْعُسْرِ يُسْرًا",                       transliteration: "Fa-inna maʿa l-ʿusri yusrā",             english: "For indeed, with hardship will be ease",                         topic: "Hope" },
  { id: 14, surah: "الضحى",     surahEn: "Ad-Duha",      ayah: 11, arabic: "وَأَمَّا بِنِعْمَةِ رَبِّكَ فَحَدِّثْ",                transliteration: "Wa-ammā bi-niʿmati rabbika fa-ḥaddith",   english: "And speak about the blessings of your Lord",                     topic: "Gratitude" },
  { id: 15, surah: "البقرة",    surahEn: "Al-Baqarah",   ayah: 152,arabic: "فَاذْكُرُونِي أَذْكُرْكُمْ",                           transliteration: "Fa-dhkurūnī adhkurkum",                   english: "Remember Me, and I will remember you",                           topic: "Dhikr" },
];

// ─── Duas ────────────────────────────────────────────────────────────────────
export interface Dua {
  id: number;
  title: string;
  arabic: string;
  transliteration: string;
  english: string;
  when: string;
  source?: string;
}

export const duas: Dua[] = [
  { id: 1,  title: "Before eating",         arabic: "بِسْمِ اللَّهِ",                                                   transliteration: "Bismillāh",                                               english: "In the name of Allah",                                           when: "Before every meal", source: "Abu Dawud" },
  { id: 2,  title: "After eating",          arabic: "الْحَمْدُ لِلَّهِ الَّذِي أَطْعَمَنِي هَٰذَا وَرَزَقَنِيهِ",   transliteration: "Al-ḥamdu lillāhi lladhī aṭʿamanī hādhā wa-razaqanīh",    english: "Praise be to Allah who fed me this and provided it for me",       when: "After eating", source: "Tirmidhi" },
  { id: 3,  title: "Morning dhikr",         arabic: "أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ",                      transliteration: "Aṣbaḥnā wa-aṣbaḥa l-mulku lillāh",                       english: "We enter the morning and all dominion belongs to Allah",          when: "Every morning", source: "Muslim" },
  { id: 4,  title: "Evening dhikr",         arabic: "أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ",                      transliteration: "Amsaynā wa-amsa l-mulku lillāh",                          english: "We enter the evening and all dominion belongs to Allah",          when: "Every evening", source: "Muslim" },
  { id: 5,  title: "Entering home",         arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ خَيْرَ الْمَوْلَجِ وَخَيْرَ الْمَخْرَجِ", transliteration: "Allāhumma innī asʾaluka khayra l-mawlaji wa-khayra l-makhraj", english: "O Allah, I ask You for the best of entry and the best of exit", when: "When entering home", source: "Abu Dawud" },
  { id: 6,  title: "Leaving home",          arabic: "بِسْمِ اللَّهِ، تَوَكَّلْتُ عَلَى اللَّهِ، وَلَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ", transliteration: "Bismillāh, tawakkaltu ʿala llāh, wa-lā ḥawla wa-lā quwwata illā billāh", english: "In the name of Allah, I trust in Allah, there is no power except with Allah", when: "When leaving home", source: "Abu Dawud" },
  { id: 7,  title: "Before sleeping",       arabic: "اللَّهُمَّ بِاسْمِكَ أَمُوتُ وَأَحْيَا",                       transliteration: "Allāhumma bi-smika amūtu wa-aḥyā",                        english: "O Allah, in Your name I die and I live",                          when: "Before sleeping", source: "Bukhari" },
  { id: 8,  title: "Waking up",             arabic: "الْحَمْدُ لِلَّهِ الَّذِي أَحْيَانَا بَعْدَ مَا أَمَاتَنَا",  transliteration: "Al-ḥamdu lillāhi lladhī aḥyānā baʿda mā amātanā",        english: "Praise be to Allah who gave us life after causing us to die",     when: "Upon waking", source: "Bukhari" },
  { id: 9,  title: "For anxiety",           arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْهَمِّ وَالْحَزَنِ",   transliteration: "Allāhumma innī aʿūdhu bika min al-hammi wa-l-ḥazan",      english: "O Allah, I seek refuge in You from worry and sadness",           when: "When anxious or sad", source: "Bukhari" },
  { id: 10, title: "For forgiveness",       arabic: "رَبِّ اغْفِرْ لِي وَتُبْ عَلَيَّ",                             transliteration: "Rabbi ghfir lī wa-tub ʿalayy",                            english: "My Lord, forgive me and accept my repentance",                   when: "Seeking forgiveness", source: "Abu Dawud" },
  { id: 11, title: "Istikhara opening",     arabic: "اللَّهُمَّ إِنِّي أَسْتَخِيرُكَ بِعِلْمِكَ",                  transliteration: "Allāhumma innī astakhīruka bi-ʿilmik",                    english: "O Allah, I seek Your guidance through Your knowledge",            when: "Before making a decision", source: "Bukhari" },
  { id: 12, title: "Entering mosque",       arabic: "اللَّهُمَّ افْتَحْ لِي أَبْوَابَ رَحْمَتِكَ",                 transliteration: "Allāhumma ftaḥ lī abwāba raḥmatik",                       english: "O Allah, open for me the gates of Your mercy",                   when: "When entering the mosque", source: "Muslim" },
  { id: 13, title: "After adhan",           arabic: "اللَّهُمَّ رَبَّ هَٰذِهِ الدَّعْوَةِ التَّامَّةِ",            transliteration: "Allāhumma rabba hādhihi d-daʿwati t-tāmma",               english: "O Allah, Lord of this perfect call",                             when: "After hearing the adhan", source: "Bukhari" },
  { id: 14, title: "When sneezing",         arabic: "الْحَمْدُ لِلَّهِ",                                            transliteration: "Al-ḥamdu lillāh",                                         english: "Praise be to Allah",                                             when: "After sneezing", source: "Bukhari" },
  { id: 15, title: "Reply to sneeze",       arabic: "يَرْحَمُكَ اللَّهُ",                                           transliteration: "Yarḥamuka llāh",                                          english: "May Allah have mercy on you",                                    when: "When someone sneezes", source: "Bukhari" },
];

// ─── Hadiths ─────────────────────────────────────────────────────────────────
export interface Hadith {
  id: number;
  arabic: string;
  transliteration: string;
  english: string;
  narrator: string;
  source: string;
  topic: string;
}

export const hadiths: Hadith[] = [
  { id: 1,  arabic: "إِنَّمَا الْأَعْمَالُ بِالنِّيَّاتِ",                                    transliteration: "Innamā l-aʿmālu bin-niyyāt",                              english: "Actions are judged by intentions",                               narrator: "Umar ibn al-Khattab", source: "Bukhari & Muslim", topic: "Intentions" },
  { id: 2,  arabic: "الدِّينُ النَّصِيحَةُ",                                                   transliteration: "Ad-dīnu n-naṣīḥa",                                        english: "The religion is sincere advice",                                 narrator: "Tamim al-Dari", source: "Muslim", topic: "Sincerity" },
  { id: 3,  arabic: "الْمُسْلِمُ مَنْ سَلِمَ الْمُسْلِمُونَ مِنْ لِسَانِهِ وَيَدِهِ",       transliteration: "Al-Muslimu man salima l-Muslimūna min lisānihi wa-yadih",   english: "A Muslim is one from whose tongue and hand other Muslims are safe", narrator: "Abdullah ibn Amr", source: "Bukhari", topic: "Character" },
  { id: 4,  arabic: "لَا يُؤْمِنُ أَحَدُكُمْ حَتَّىٰ يُحِبَّ لِأَخِيهِ مَا يُحِبُّ لِنَفْسِهِ", transliteration: "Lā yuʾminu aḥadukum ḥattā yuḥibba li-akhīhi mā yuḥibbu li-nafsih", english: "None of you truly believes until he loves for his brother what he loves for himself", narrator: "Anas ibn Malik", source: "Bukhari & Muslim", topic: "Brotherhood" },
  { id: 5,  arabic: "اتَّقِ اللَّهَ حَيْثُمَا كُنْتَ",                                       transliteration: "Ittaqi llāha ḥaythumā kunt",                               english: "Fear Allah wherever you are",                                    narrator: "Abu Dharr", source: "Tirmidhi", topic: "Taqwa" },
  { id: 6,  arabic: "كُلُّ أَمْرٍ ذِي بَالٍ لَا يُبْدَأُ فِيهِ بِبِسْمِ اللَّهِ فَهُوَ أَبْتَرُ", transliteration: "Kullu amrin dhī bālin lā yubdaʾu fīhi bi-bismillāhi fa-huwa abtar", english: "Every matter of importance not begun with Bismillah is deficient", narrator: "Abu Hurairah", source: "Ibn Majah", topic: "Bismillah" },
  { id: 7,  arabic: "إِنَّ اللَّهَ جَمِيلٌ يُحِبُّ الْجَمَالَ",                              transliteration: "Inna llāha jamīlun yuḥibbu l-jamāl",                         english: "Allah is beautiful and loves beauty",                            narrator: "Ibn Masud", source: "Muslim", topic: "Beauty" },
  { id: 8,  arabic: "خَيْرُكُمْ مَنْ تَعَلَّمَ الْقُرْآنَ وَعَلَّمَهُ",                     transliteration: "Khayruqum man taʿallama l-Qurʾāna wa-ʿallamah",             english: "The best of you are those who learn the Quran and teach it",     narrator: "Uthman ibn Affan", source: "Bukhari", topic: "Quran" },
  { id: 9,  arabic: "الصَّلَاةُ عِمَادُ الدِّينِ",                                            transliteration: "Aṣ-ṣalātu ʿimādu d-dīn",                                 english: "Prayer is the pillar of the religion",                           narrator: "Reported", source: "Tabarani", topic: "Prayer" },
  { id: 10, arabic: "مَنْ صَلَّى عَلَيَّ صَلَاةً وَاحِدَةً صَلَّى اللَّهُ عَلَيْهِ عَشْرًا", transliteration: "Man ṣallā ʿalayya ṣalātan wāḥidatan ṣallā llāhu ʿalayhi ʿashrā", english: "Whoever sends one blessing upon me, Allah sends ten blessings upon him", narrator: "Abu Hurairah", source: "Muslim", topic: "Salawat" },
  { id: 11, arabic: "الطَّهُورُ شَطْرُ الْإِيمَانِ",                                          transliteration: "Aṭ-ṭahūru shaṭru l-īmān",                                  english: "Cleanliness is half of faith",                                   narrator: "Abu Malik al-Ashari", source: "Muslim", topic: "Purity" },
  { id: 12, arabic: "ابْتَسَامَتُكَ فِي وَجْهِ أَخِيكَ صَدَقَةٌ",                            transliteration: "Ibtisāmatuka fī wajhi akhīka ṣadaqa",                      english: "Your smile in the face of your brother is charity",              narrator: "Abu Dharr", source: "Tirmidhi", topic: "Character" },
];

export const quranTopics = [...new Set(quranVerses.map(v => v.topic))];
export const duaCategories = [...new Set(duas.map(d => d.when))];
export const hadithTopics = [...new Set(hadiths.map(h => h.topic))];
