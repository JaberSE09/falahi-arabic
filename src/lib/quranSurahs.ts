export interface QuranAyah {
  surahNumber: number;
  ayah: number;
  arabic: string;
  transliteration: string;
  english: string;
}

export interface QuranSurah {
  number: number;
  nameAr: string;
  nameEn: string;
  slug: string;
  ayahCount: number;
  order: number;
  ayahs: QuranAyah[];
}

function ayah(
  surahNumber: number,
  n: number,
  arabic: string,
  transliteration: string,
  english: string,
): QuranAyah {
  return { surahNumber, ayah: n, arabic, transliteration, english };
}

/** Beginner path: short Juz Amma surahs first, then full Al-Fatiha. */
export const quranSurahs: QuranSurah[] = [
  {
    number: 114,
    nameAr: "الناس",
    nameEn: "An-Nas",
    slug: "an-nas",
    ayahCount: 6,
    order: 1,
    ayahs: [
      ayah(114, 1, "قُلْ أَعُوذُ بِرَبِّ النَّاسِ", "Qul aʿūdhu bi-rabbi n-nās", "Say: I seek refuge in the Lord of mankind"),
      ayah(114, 2, "مَلِكِ النَّاسِ", "Maliki n-nās", "The King of mankind"),
      ayah(114, 3, "إِلَٰهِ النَّاسِ", "Ilāhi n-nās", "The God of mankind"),
      ayah(114, 4, "مِن شَرِّ الْوَسْوَاسِ الْخَنَّاسِ", "Min sharri l-waswāsi l-khannās", "From the evil of the whisperer who withdraws"),
      ayah(114, 5, "الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ", "Alladhī yuwaswisu fī ṣudūri n-nās", "Who whispers in the breasts of mankind"),
      ayah(114, 6, "مِنَ الْجِنَّةِ وَالنَّاسِ", "Mina l-jinnati wa-n-nās", "Among jinn and among mankind"),
    ],
  },
  {
    number: 113,
    nameAr: "الفلق",
    nameEn: "Al-Falaq",
    slug: "al-falaq",
    ayahCount: 5,
    order: 2,
    ayahs: [
      ayah(113, 1, "قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ", "Qul aʿūdhu bi-rabbi l-falaq", "Say: I seek refuge in the Lord of daybreak"),
      ayah(113, 2, "مِن شَرِّ مَا خَلَقَ", "Min sharri mā khalaq", "From the evil of what He created"),
      ayah(113, 3, "وَمِن شَرِّ غَاسِقٍ إِذَا وَقَبَ", "Wa-min sharri ghāsiqin idhā waqab", "And from the evil of darkness when it settles"),
      ayah(113, 4, "وَمِن شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ", "Wa-min sharri n-naffāthāti fī l-ʿuqad", "And from the evil of those who blow on knots"),
      ayah(113, 5, "وَمِن شَرِّ حَاسِدٍ إِذَا حَسَدَ", "Wa-min sharri ḥāsidin idhā ḥasad", "And from the evil of an envier when he envies"),
    ],
  },
  {
    number: 112,
    nameAr: "الإخلاص",
    nameEn: "Al-Ikhlas",
    slug: "al-ikhlas",
    ayahCount: 4,
    order: 3,
    ayahs: [
      ayah(112, 1, "قُلْ هُوَ اللَّهُ أَحَدٌ", "Qul huwa llāhu aḥad", "Say: He is Allah, the One"),
      ayah(112, 2, "اللَّهُ الصَّمَدُ", "Allāhu ṣ-ṣamad", "Allah, the Eternal Refuge"),
      ayah(112, 3, "لَمْ يَلِدْ وَلَمْ يُولَدْ", "Lam yalid wa-lam yūlad", "He neither begets nor is born"),
      ayah(112, 4, "وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ", "Wa-lam yakun lahu kufuwan aḥad", "And there is none comparable to Him"),
    ],
  },
  {
    number: 108,
    nameAr: "الكوثر",
    nameEn: "Al-Kawthar",
    slug: "al-kawthar",
    ayahCount: 3,
    order: 4,
    ayahs: [
      ayah(108, 1, "إِنَّا أَعْطَيْنَاكَ الْكَوْثَرَ", "Innā aʿṭaynāka l-kawthar", "Indeed, We have granted you al-Kawthar"),
      ayah(108, 2, "فَصَلِّ لِرَبِّكَ وَانْحَرْ", "Fa-ṣalli li-rabbika wa-nḥar", "So pray to your Lord and sacrifice"),
      ayah(108, 3, "إِنَّ شَانِئَكَ هُوَ الْأَبْتَرُ", "Inna shāniʾaka huwa l-abtar", "Indeed, your enemy is the one cut off"),
    ],
  },
  {
    number: 110,
    nameAr: "النصر",
    nameEn: "An-Nasr",
    slug: "an-nasr",
    ayahCount: 3,
    order: 5,
    ayahs: [
      ayah(110, 1, "إِذَا جَاءَ نَصْرُ اللَّهِ وَالْفَتْحُ", "Idhā jāʾa naṣru llāhi wa-l-fatḥ", "When the victory of Allah has come and the conquest"),
      ayah(110, 2, "وَرَأَيْتَ النَّاسَ يَدْخُلُونَ فِي دِينِ اللَّهِ أَفْوَاجًا", "Wa-raʾayta n-nāsa yadkhulūna fī dīni llāhi afwājā", "And you see the people entering into the religion of Allah in multitudes"),
      ayah(110, 3, "فَسَبِّحْ بِحَمْدِ رَبِّكَ وَاسْتَغْفِرْهُ ۚ إِنَّهُ كَانَ تَوَّابًا", "Fa-sabbiḥ bi-ḥamdi rabbika wa-staghfirhu — innahu kāna tawwābā", "Then exalt [Him] with praise of your Lord and ask forgiveness of Him. Indeed, He is ever Accepting of repentance"),
    ],
  },
  {
    number: 103,
    nameAr: "العصر",
    nameEn: "Al-Asr",
    slug: "al-asr",
    ayahCount: 3,
    order: 6,
    ayahs: [
      ayah(103, 1, "وَالْعَصْرِ", "Wa-l-ʿaṣr", "By time"),
      ayah(103, 2, "إِنَّ الْإِنسَانَ لَفِي خُسْرٍ", "Inna l-insāna la-fī khusr", "Indeed, mankind is in loss"),
      ayah(103, 3, "إِلَّا الَّذِينَ آمَنُوا وَعَمِلُوا الصَّالِحَاتِ وَتَوَاصَوْا بِالْحَقِّ وَتَوَاصَوْا بِالصَّبْرِ", "Illā lladhīna āmanū wa-ʿamilū ṣ-ṣāliḥāti wa-tawāṣaw bi-l-ḥaqqi wa-tawāṣaw bi-ṣ-ṣabr", "Except those who believe and do righteous deeds and advise each other to truth and advise each other to patience"),
    ],
  },
  {
    number: 1,
    nameAr: "الفاتحة",
    nameEn: "Al-Fatiha",
    slug: "al-fatiha",
    ayahCount: 7,
    order: 7,
    ayahs: [
      ayah(1, 1, "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ", "Bismillāhi r-raḥmāni r-raḥīm", "In the name of Allah, the Most Gracious, the Most Merciful"),
      ayah(1, 2, "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ", "Al-ḥamdu lillāhi rabbi l-ʿālamīn", "All praise is due to Allah, Lord of all the worlds"),
      ayah(1, 3, "الرَّحْمَٰنِ الرَّحِيمِ", "Ar-raḥmāni r-raḥīm", "The Most Gracious, the Most Merciful"),
      ayah(1, 4, "مَالِكِ يَوْمِ الدِّينِ", "Māliki yawmi d-dīn", "Master of the Day of Judgment"),
      ayah(1, 5, "إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ", "Iyyāka naʿbudu wa-iyyāka nastaʿīn", "You alone we worship, and You alone we ask for help"),
      ayah(1, 6, "اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ", "Ihdinā ṣ-ṣirāṭa l-mustaqīm", "Guide us to the straight path"),
      ayah(1, 7, "صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ", "Ṣirāṭa lladhīna anʿamta ʿalayhim ghayri l-maghḍūbi ʿalayhim wa-lā ḍ-ḍāllīn", "The path of those You have blessed — not of those who incurred anger, nor of those who are astray"),
    ],
  },
];

export function getSurahBySlug(slug: string): QuranSurah | undefined {
  return quranSurahs.find((s) => s.slug === slug);
}

export function getSurahByNumber(n: number): QuranSurah | undefined {
  return quranSurahs.find((s) => s.number === n);
}

export function ayahKey(surahNumber: number, ayah: number): string {
  return `${surahNumber}:${ayah}`;
}

export function allPathAyahs(): QuranAyah[] {
  return quranSurahs.flatMap((s) => s.ayahs);
}
