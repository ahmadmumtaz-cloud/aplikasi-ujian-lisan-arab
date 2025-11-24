
import { Student, Score, QuestionDetail, ReadingMaterial } from './types';

// Helper to create empty scores
const emptyScores: Score = {
  muhadatsah: 0,
  mutholaah: 0,
  nahwu: 0,
  shorof: 0,
  tarjamah: 0,
};

// Helper to create empty question logs
const emptyLogs = {
  muhadatsah: [],
  mutholaah: [],
  nahwu: [],
  shorof: [],
  tarjamah: [],
};

export const MUTHOLAAH_MATERIALS: ReadingMaterial[] = [
  {
    title: "Materi 1: Sifat Tanggap",
    titleArabic: "سُرْعَةُ الْخَاطِرِ",
    content: "كَانَ بَعْضُ النَّقَّاشِينَ يَوْمًا يَنْقُشُ جِدَارًا فِي دَارِ أَحَدِ الْمُوسِرِينَ. وَلَمَّا كَانَ النَّقْشُ الَّذِي اخْتَصَّ بِهِ أَحَدُهُمْ فِي الْجُزْءِ الْعُلْوِيِّ مِنَ الْجِدَارِ صَعِدَ عَلَى مِصْعَادٍ لِيَشْتَغِلَ وَانْصَرَفَ بِكُلِّ ذِهْنِهِ إِلَى عَمَلِهِ حَتَّى أَحْسَنَهُ فَأُعْجِبَ بِحُسْنِهِ، وَغَفَلَ عَنْ أَنَّهُ وَاقِفٌ عَلَى مِصْعَادٍ ضَيِّقٍ فَهَمَّ بِالتَّرَاجُعِ إِلَى الْخَلْفِ لِيَتَبَيَّنَ حُسْنَ نَقْشِهِ مِنْ بُعْدٍ. فَرَآهُ زَمِيلٌ لَهُ كَانَ يَشْتَغِلُ عَلَى الْمِصْعَادِ نَفْسِهِ. وَأَدْرَكَ مِنْ حَالِ صَاحِبِهِ أَنَّهُ سَهَى وَأَنَّهُ عَلَى وَشْكِ التَّحَرُّكِ إِلَى الْخَلْفِ فَأَسْرَعَ بِمُدْهَنِهِ وَعَلَيْهِ طِلَاءٌ يُخَالِفُ لَوْنَ طِلَاءِ ذَلِكَ النَّقَّاشِ الْمُعْجَبِ. وَهَمَّ أَنْ يَطْمِسَ بِهِ رَسْمَهُ، فَانْقَضَّ النَّقَّاشُ عَلَى زَمِيلِهِ لِيَمْنَعَهُ عَنْ فَعْلَتِهِ. فَانْقَلَبَتْ بِذَلِكَ حَرَكَتُهُ الْخَلْفِيَّةُ إِلَى حَرَكَةٍ أَمَامِيَّةٍ نَحْوَ الْجِدَارِ فَنَجَا مِنَ السُّقُوطِ إِلَى الْأَرْضِ، وَبِذَلِكَ كَانَ النَّقَّاشُ بِسُرْعَةِ خَاطِرِهِ سَبَبًا فِي نَجَاةِ زَمِيلِهِ."
  },
  {
    title: "Materi 2: Janji Meninggalkan Kebohongan",
    titleArabic: "هَلْ تُعَاهِدُنِي عَلَى تَرْكِ الْكَذِبِ",
    content: "تَقَدَّمَ إِلَى رَسُولِ اللهِ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ رَجُلٌ يُرِيدُ الْإِسْلَامَ فَبَعْدَ أَنْ نَطَقَ بِالشَّهَادَةِ قَالَ: \"إِنِّي أَقْتَرِفُ مِنَ الذُّنُوبِ يَا رَسُولَ اللهِ مَا لَا أَسْتَطِيعُ تَرْكَهُ\" فَقَالَ رَسُولُ اللهِ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ \"هَلْ تُعَاهِدُنِي عَلَى تَرْكِ الْكَذِبِ\" قَالَ \"نَعَمْ\" ثُمَّ عَاهَدَهُ عَلَى ذَلِكَ وَانْصَرَفَ وَهُوَ يَقُولُ فِي نَفْسِهِ \"مَا أَهْوَنَ مَا طَلَبَ مِنِّي هَذَا النَّبِيُّ الْكَرِيمُ\".\n\nفَلَمَّا أَرَادَ الرَّجُلُ بَعْدَ ذَلِكَ أَنْ يَسْرِقَ قَالَ فِي نَفْسِهِ \"إِنْ سَرَقْتُ وَسَأَلَنِي الرَّسُولُ فَمَاذَا يَكُونُ جَوَابِي إِنْ أَجَبْتُ بِنَعَمْ فَقَدْ حَقَّ عَلَيَّ الْعِقَابُ وَإِنْ أَجَبْتُ بِلَا فَقَدْ كَذَبْتُ وَقَدْ عَاهَدْتُهُ عَلَى تَرْكِ الْكَذِبِ إِذَنْ فَخَيْرٌ لِي أَنْ أَبْتَعِدَ عَنِ السَّرِقَةِ\".\n\nفَابْتَعَدَ عَنْهَا وَصَارَ بَعْدَ ذَلِكَ يَتَذَكَّرُ عَهْدَهُ كُلَّمَا حَدَّثَتْهُ نَفْسُهُ بِارْتِكَابِ إِثْمٍ فَيَبْتَعِدُ عَنْهُ حَتَّى صَلَحَ حَالُهُ وَصَارَ مِنْ خِيَارِ النَّاسِ الْعَامِلِينَ عَلَى نُصْرَةِ الدِّينِ وَالتَّمَسُّكِ بِهِ وَبِفَضَائِلِهِ."
  },
  {
    title: "Materi 3: Sikap Meremehkan",
    titleArabic: "التَّهَاوُنُ",
    content: "كَانَ رَجُلَانِ يَشْتَغِلَانِ فِي صُنْعِ السَّفِينَةِ فَوَجَدَ دُودَةً فِي قِطْعَةِ خَشَبَةٍ صَغِيرَةٍ. وَأَرَادَ أَحَدُهُمَا أَنْ يَرْمِيَهَا فَلَمْ يَرْضَ زَمِيلُهُ فَقَالَ ((إِنَّهَا خَشَبَةٌ صَغِيرَةٌ لَا تَأْثِيرَ لَهَا فِي بِنَاءِ السَّفِينَةِ وَفِي رَمِيهَا خَسَارَةٌ عَلَيْنَا)) فَأُدْخِلَتِ الْخَشَبَةُ وَتَمَّتِ السَّفِينَةُ وَصَارَتْ تَغْدُو وَتَرُوحُ فِي الْبَحْرِ بِسَلَامٍ.\n\nوَبَعْدَ سِنِينَ قَلِيلَةٍ وَلَدَتِ الدُّودَةُ دِيدَانًا كَثِيرَةً أَكَلَتْ قَلْبَ الْخَشَبَةِ حَتَّى نَخَرَتْهَا وَسَرَتْ فِيمَا جَاوَرَهَا مِنَ الْخَشَبِ حَتَّى وَهَنَ وَصَادَفَ السَّفِينَةَ نَوْءٌ شَدِيدٌ خَرَمَهَا خَرْمًا صَغِيرًا دَخَلَ مِنْهُ الْمَاءُ ثُمَّ اتَّسَعَ الْخَرْمُ حَتَّى لَمْ يَسْتَطِعِ الْمَلَّاحُونَ تَصْرِيفَ الْمَاءِ الدَّاخِلِ فِي السَّفِينَةِ فَتَثَاقَلَتْ وَغَرِقَتْ بِمَا فِيهَا مِنَ الْأَمْوَالِ وَالْأَنْفُسِ.\n\nوَلَا شَكَّ أَنَّ هَذَا الْخَرْمَ لَمْ يَنْشَأْ إِلَّا مِنْ تِلْكَ الْخَشَبَةِ الصَّغِيرَةِ الَّتِي كَانَتْ فِيهَا الدُّودَةُ. وَلَوْ رُمِيَتْ عِنْدَمَا ظَهَرَ عَيْبُهَا لَمَا حَصَلَتْ هَذِهِ الْمُصِيبَةُ الْمُحْزِنَةُ. فَإِنَّ الْعَمَلَ الصَّغِيرَ كَثِيرًا مَا يَأْتِي بِنَتَائِجَ يَكُونُ لَهَا تَأْثِيرٌ كَبِيرٌ. إِنَّ الْأُمُورَ دَقِيقَهَا مِمَّا يَهِيجُ لَهَا الْعَظِيمَ."
  },
  {
    title: "Materi 4: Kebangkitan Bahasa",
    titleArabic: "نَهْضَةُ اللُّغَةِ",
    content: "لَقَدْ أَتَى عَلَى اللُّغَةِ الْعَرَبِيَّةِ حِينٌ مِنَ الدَّهْرِ هَجَرَهَا فِيهِ أَهْلُهَا أَيَّامَ دُوَلِ الْمَمَالِيكِ وَنَسُوا مَا كَانَتْ عَلَيْهِ مِنَ الْفَصَاحَةِ وَالرُّقِيِّ وَالِانْتِشَارِ الْعَظِيمِ فِي كَثِيرٍ مِنَ الْأَقْطَارِ بَيْنَ جَمِيعِ الطَّبَقَاتِ عَظِيمِهَا وَحَقِيرِهَا لِمَا امْتَازَتْ بِهِ مِنَ الرِّقَّةِ وَالسَّعَةِ أَيَّامَ دُوَلِ الْإِسْلَامِ. وَلَقَدْ شَعَرَ الْعَرَبُ بَعْدَ انْتِظَامِ بِلَادِهِمْ فِي هَذَا الْعَصْرِ الْحَدِيثِ بِشِدَّةِ الْحَاجَةِ إِلَى إِحْيَاءِ اللُّغَةِ فَنَشَأَتْ بَيْنَ أَظْهُرِهِمْ نَهْضَةٌ مُبَارَكَةٌ تَنَاوَلَتْ كُلَّ طَبَقَاتِ الْأُمَّةِ فَحَرِيٌّ بِأَبْنَاءِ بِلَادِ الْيَوْمِ أَنْ يَعْمَلُوا جُهْدَهُمْ عَلَى بُلُوغِ هَذِهِ الْغَايَةِ فَإِذَا تَكَلَّمْتَ فَلَا تَسْتَعْمِلْ مِنَ الْكَلِمَاتِ إِلَّا مَا يَصِحُّ أَنْ تَكْتُبَهُ وَإِذَا كَتَبْتَ فَلَا تَكْتُبْ إِلَّا الْكَلِمَاتِ الَّتِي تَرَاهَا فِي الْكُتُبِ وَحِينَئِذٍ يَجِبُ عَلَيْكَ إِذَا قَرَأْتَ أَنْ تَضْبِطَ الْكَلِمَاتِ لِأَنَّهَا سَتَأْتِي فِي حَدِيثِكَ مَعَ النَّاسِ وَأَنْ تَتَأَمَّلَ إِلَى رَسْمِهَا لِأَنَّكَ سَتَكْتُبُهَا فِي دُرُوسِكَ أَوْ فِي رَسَائِلِكَ وَأَنْ تَعْلَقَ مَعْنَاهَا وَتَعْرِفَ مَوَاضِعَ اسْتِعْمَالِهَا حَتَّى تَكُونَ مُدَقِّقًا فَالنَّاسُ لَا يَعْرِفُونَ أَنَّكَ تَعَلَّمْتَ إِلَّا إِذَا كُنْتَ مُدَقِّقًا فِي قَوْلِكَ وَكِتَابَتِكَ وَلُغَتِنَا لَا تَحْيَا وَلَا تَزْهُو إِلَّا إِذَا نَهَضْنَا بِهَا عَلَى هَذَا النَّحْوِ. فَتَجَنَّبْ لُغَةَ الْعَامَّةِ وَالْتَزِمِ التَّعْبِيرَ بِاللُّغَةِ الصَّحِيحَةِ وَإِذَا كَثُرُوا كَثُرَ الْمُقْتَدُونَ بِهِمْ وَعَمَّتِ الْأَلْفَاظُ الصَّحِيحَةُ جَمِيعَ طَبَقَاتِ الْأُمَّةِ وَأَلِفَ النَّاسُ الْأَلْفَاظَ الْعِلْمِيَّةَ فَتَكُونُونَ قَدْ أَدَّيْتُمْ بِذَلِكَ خِدْمَةً لِلُّغَةِ الْإِسْلَامِ."
  }
];

export const QUESTION_BANK: Record<keyof Score, (string | QuestionDetail)[]> = {
  muhadatsah: [
    {
        question: "عَرِّفْ نَفْسَكَ (الِاسْم، الْعُمْر، الْأَصْل).",
        translation: "Perkenalkan diri Anda (Nama, Umur, Asal).",
    },
    {
        question: "تَكَلَّمْ عَنْ أَنْشِطَتِكَ الْيَوْمِيَّةِ مِنَ الِاسْتِيقَاظِ.",
        translation: "Ceritakan kegiatan sehari-hari Anda dari bangun tidur.",
    },
    {
        question: "صِفْ بِيئَةَ الْمَعْهَدِ الَّذِي تَدْرُسُ فِيهِ.",
        translation: "Deskripsikan lingkungan pesantren Anda.",
    },
    {
        question: "مَا أُمْنِيَّتُكَ فِي الْمُسْتَقْبَلِ؟ وَكَيْفَ تُحَقِّقُهَا؟",
        translation: "Apa cita-cita Anda dan bagaimana cara mencapainya?",
    },
    {
        question: "مَا هِوَايَتُكَ؟ وَلِمَاذَا تُحِبُّهَا؟",
        translation: "Sebutkan hobi Anda dan mengapa Anda menyukainya.",
    },
    {
        question: "تَكَلَّمْ عَنْ أُسْرَتِكَ.",
        translation: "Ceritakan tentang keluarga Anda.",
    },
    {
        question: "مَا الدَّرْسُ الْمُفَضَّلُ لَدَيْكَ؟ وَلِمَاذَا؟",
        translation: "Apa pelajaran favorit Anda dan alasannya?",
    },
    {
        question: "بَيِّنْ أَهَمِّيَّةَ تَعَلُّمِ اللُّغَةِ الْعَرَبِيَّةِ.",
        translation: "Jelaskan pentingnya belajar Bahasa Arab.",
    },
    {
        question: "اُذْكُرْ تَجْرِبَةً لَا تَنْسَاهَا فِي الْمَعْهَدِ.",
        translation: "Ceritakan pengalaman paling berkesan selama di pondok.",
    },
    {
        question: "كَيْفَ تُقَسِّمُ وَقْتَكَ بَيْنَ الدِّرَاسَةِ وَالْعِبَادَةِ؟",
        translation: "Bagaimana Anda membagi waktu antara belajar dan ibadah?",
    },
    {
        question: "صِفْ صَدِيقَكَ الْمُقَرَّبَ.",
        translation: "Deskripsikan teman dekat Anda.",
    },
    {
        question: "مَاذَا تَفْعَلُ فِي أَيَّامِ الْعُطْلَةِ؟",
        translation: "Apa yang Anda lakukan saat liburan?",
    },
    {
        question: "تَكَلَّمْ عَنْ مَدِينَتِكَ أَوْ قَرْيَتِكَ.",
        translation: "Ceritakan tentang kota/desa kelahiran Anda.",
    },
    {
        question: "مَا الطَّعَامُ الْمُفَضَّلُ لَدَيْكَ؟ وَكَيْفَ طَعْمُهُ؟",
        translation: "Apa makanan kesukaan Anda dan bagaimana rasanya?",
    },
    {
        question: "كَيْفَ يَكُونُ الْأَدَبُ مَعَ الْمُعَلِّمِ فِي رَأْيِكَ؟",
        translation: "Bagaimana adab terhadap guru menurut Anda?",
    },
  ],
  mutholaah: [
    // --- MATERI 1: Sifat Tanggap (سرعة الخاطر) ---
    {
      question: "أَيْنَ كَانَ النَّقَّاشُ يَعْمَلُ؟",
      translation: "Di mana pelukis itu bekerja?",
      answer: "فِي دَارِ أَحَدِ الْمُوسِرِينَ."
    },
    {
      question: "مَا مَعْنَى كَلِمَةِ 'الْمُوسِرِينَ'؟",
      translation: "Apa arti kata 'Al-Musirin'?",
      answer: "مَعْنَاهَا الأَغْنِيَاءُ."
    },
    {
      question: "فِي أَيِّ جُزْءٍ مِنَ الْجِدَارِ كَانَ النَّقْشُ؟",
      translation: "Di bagian dinding mana lukisan itu berada?",
      answer: "فِي الْجُزْءِ الْعُلْوِيِّ مِنَ الْجِدَارِ."
    },
    {
      question: "كَيْفَ صَعِدَ النَّقَّاشُ لِيَشْتَغِلَ؟",
      translation: "Bagaimana pelukis naik untuk bekerja?",
      answer: "صَعِدَ عَلَى مِصْعَادٍ."
    },
    {
      question: "كَيْفَ انْصَرَفَ النَّقَّاشُ إِلَى عَمَلِهِ؟",
      translation: "Bagaimana pelukis itu fokus pada pekerjaannya?",
      answer: "انْصَرَفَ بِكُلِّ ذِهْنِهِ حَتَّى أَحْسَنَهُ."
    },
    {
      question: "لِمَاذَا هَمَّ النَّقَّاشُ بِالتَّرَاجُعِ إِلَى الْخَلْفِ؟",
      translation: "Mengapa pelukis itu hendak mundur ke belakang?",
      answer: "لِيَتَبَيَّنَ حُسْنَ نَقْشِهِ مِنْ بُعْدٍ."
    },
    {
      question: "عَنْ أَيِّ شَيْءٍ غَفَلَ النَّقَّاشُ؟",
      translation: "Apa yang dilupakan oleh pelukis itu?",
      answer: "غَفَلَ عَنْ أَنَّهُ وَاقِفٌ عَلَى مِصْعَادٍ ضَيِّقٍ."
    },
    {
      question: "مَنْ رَأَى النَّقَّاشَ وَهُوَ يَتَرَاجَعُ؟",
      translation: "Siapa yang melihat pelukis itu saat mundur?",
      answer: "زَمِيلٌ لَهُ كَانَ يَشْتَغِلُ عَلَى الْمِصْعَادِ نَفْسِهِ."
    },
    {
      question: "مَاذَا أَدْرَكَ الزَّمِيلُ مِنْ حَالِ صَاحِبِهِ؟",
      translation: "Apa yang disadari rekan kerjanya dari keadaan temannya?",
      answer: "أَدْرَكَ أَنَّهُ سَهَى وَأَنَّهُ عَلَى وَشْكِ التَّحَرُّكِ إِلَى الْخَلْفِ."
    },
    {
      question: "بِمَاذَا أَسْرَعَ الزَّمِيلُ؟",
      translation: "Dengan apa rekan itu bergegas?",
      answer: "أَسْرَعَ بِمُدْهَنِهِ."
    },
    {
      question: "كَيْفَ كَانَ لَوْنُ الطِّلَاءِ فِي مُدْهَنِ الزَّمِيلِ؟",
      translation: "Bagaimana warna cat di kuas rekan itu?",
      answer: "يُخَالِفُ لَوْنَ طِلَاءِ ذَلِكَ النَّقَّاشِ الْمُعْجَبِ."
    },
    {
      question: "مَاذَا أَرَادَ الزَّمِيلُ أَنْ يَفْعَلَ بِالرَّسْمِ؟",
      translation: "Apa yang ingin dilakukan rekan itu pada lukisan?",
      answer: "هَمَّ أَنْ يَطْمِسَ بِهِ رَسْمَهُ."
    },
    {
      question: "مَا رَدُّ فِعْلِ النَّقَّاشِ عِنْدَمَا رَأَى زَمِيلَهُ؟",
      translation: "Apa reaksi pelukis ketika melihat temannya?",
      answer: "انْقَضَّ عَلَى زَمِيلِهِ لِيَمْنَعَهُ عَنْ فَعْلَتِهِ."
    },
    {
      question: "كَيْفَ تَحَوَّلَتْ حَرَكَةُ النَّقَّاشِ؟",
      translation: "Bagaimana gerakan pelukis itu berubah?",
      answer: "انْقَلَبَتْ حَرَكَتُهُ الْخَلْفِيَّةُ إِلَى حَرَكَةٍ أَمَامِيَّةٍ."
    },
    {
      question: "هَلْ سَقَطَ النَّقَّاشُ عَلَى الْأَرْضِ؟",
      translation: "Apakah pelukis itu jatuh ke tanah?",
      answer: "لَا، نَجَا مِنَ السُّقُوطِ."
    },
    {
      question: "مَا السَّبَبُ فِي نَجَاةِ النَّقَّاشِ؟",
      translation: "Apa sebab keselamatan pelukis itu?",
      answer: "سُرْعَةُ خَاطِرِ زَمِيلِهِ."
    },
    {
      question: "مَا مَعْنَى 'يَطْمِسَ'؟",
      translation: "Apa arti 'Yatmisa'?",
      answer: "يَمْحُو أَوْ يُفْسِدُ."
    },
    {
      question: "مَا جَمْعُ كَلِمَةِ 'جِدَار'؟",
      translation: "Apa bentuk jamak dari 'Jidar'?",
      answer: "جُدُرٌ أَوْ جُدْرَانٌ."
    },
    {
      question: "مَا ضِدُّ كَلِمَةِ 'ضَيِّق'؟",
      translation: "Apa lawan kata dari 'Dhayyiq'?",
      answer: "وَاسِعٌ."
    },
    {
      question: "مَا الْعِبْرَةُ مِنْ هَذِهِ الْقِصَّةِ؟",
      translation: "Apa pelajaran dari kisah ini?",
      answer: "أَهَمِيَّةُ سُرْعَةِ الْخَاطِرِ وَحُسْنِ التَّصَرُّفِ لِإِنْقَاذِ الْغَيْرِ."
    },

    // --- MATERI 2: Janji Meninggalkan Kebohongan (هل تعاهدني على ترك الكذب) ---
    {
      question: "مَنْ تَقَدَّمَ إِلَى رَسُولِ اللهِ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ؟",
      translation: "Siapa yang datang kepada Rasulullah?",
      answer: "رَجُلٌ يُرِيدُ الْإِسْلَامَ."
    },
    {
      question: "مَاذَا قَالَ الرَّجُلُ بَعْدَ أَنْ نَطَقَ بِالشَّهَادَةِ؟",
      translation: "Apa kata pria itu setelah bersyahadat?",
      answer: "\"إِنِّي أَقْتَرِفُ مِنَ الذُّنُوبِ مَا لَا أَسْتَطِيعُ تَرْكَهُ\"."
    },
    {
      question: "بِمَاذَا أَمَرَهُ رَسُولُ اللهِ؟",
      translation: "Apa yang diperintahkan Rasulullah padanya?",
      answer: "أَنْ يُعَاهِدَهُ عَلَى تَرْكِ الْكَذِبِ."
    },
    {
      question: "هَلْ وَافَقَ الرَّجُلُ عَلَى طَلَبِ الرَّسُولِ؟",
      translation: "Apakah pria itu menyetujui permintaan Rasul?",
      answer: "نَعَمْ، عَاهَدَهُ عَلَى ذَلِكَ."
    },
    {
      question: "مَاذَا قَالَ الرَّجُلُ فِي نَفْسِهِ بَعْدَ الِانْصِرَافِ؟",
      translation: "Apa yang dikatakan pria itu dalam hatinya setelah pergi?",
      answer: "\"مَا أَهْوَنَ مَا طَلَبَ مِنِّي هَذَا النَّبِيُّ الْكَرِيمُ\"."
    },
    {
      question: "مَاذَا أَرَادَ الرَّجُلُ أَنْ يَفْعَلَ بَعْدَ ذَلِكَ؟",
      translation: "Apa yang ingin dilakukan pria itu setelahnya?",
      answer: "أَرَادَ أَنْ يَسْرِقَ."
    },
    {
      question: "بِمَاذَا فَكَّرَ الرَّجُلُ عِنْدَمَا أَرَادَ السَّرِقَةِ؟",
      translation: "Apa yang dipikirkan pria itu saat ingin mencuri?",
      answer: "فَكَّرَ فِيمَا سَيُجِيبُ بِهِ الرَّسُولَ إِذَا سَأَلَهُ."
    },
    {
      question: "مَاذَا سَيَحْدُثُ لَوْ قَالَ الرَّجُلُ 'نَعَمْ' سَرَقْتُ؟",
      translation: "Apa yang terjadi jika dia berkata 'Ya' saya mencuri?",
      answer: "فَقَدْ حَقَّ عَلَيْهِ الْعِقَابُ."
    },
    {
      question: "وَمَاذَا سَيَحْدُثُ لَوْ قَالَ 'لَا'؟",
      translation: "Dan apa yang terjadi jika dia berkata 'Tidak'?",
      answer: "يَكُونُ قَدْ كَذَبَ وَنَقَضَ الْعَهْدَ."
    },
    {
      question: "مَاذَا قَرَّرَ الرَّجُلُ فِي النِّهَايَةِ بِشَأْنِ السَّرِقَةِ؟",
      translation: "Apa keputusan akhirnya tentang mencuri?",
      answer: "قَرَّرَ أَنْ يَبْتَعِدَ عَنِ السَّرِقَةِ."
    },
    {
      question: "كَيْفَ أَثَّرَ هَذَا الْعَهْدُ عَلَى بَقِيَّةِ ذُنُوبِهِ؟",
      translation: "Bagaimana janji ini memengaruhi dosa-dosanya yang lain?",
      answer: "صَارَ يَتَذَكَّرُ عَهْدَهُ كُلَّمَا حَدَّثَتْهُ نَفْسُهُ بِارْتِكَابِ إِثْمٍ فَيَبْتَعِدُ عَنْهُ."
    },
    {
      question: "كَيْفَ صَارَ حَالُ الرَّجُلِ فِي النِّهَايَةِ؟",
      translation: "Bagaimana keadaan pria itu pada akhirnya?",
      answer: "صَلَحَ حَالُهُ وَصَارَ مِنْ خِيَارِ النَّاسِ."
    },
    {
      question: "مَا مَعْنَى 'أَقْتَرِفُ'؟",
      translation: "Apa arti 'Aqtarifu'?",
      answer: "أَرْتَكِبُ أَوْ أَفْعَلُ (الذُّنُوبَ)."
    },
    {
      question: "مَا مَعْنَى 'أَهْوَنَ'؟",
      translation: "Apa arti 'Ahwana'?",
      answer: "أَسْهَلَ وَأَيْسَرَ."
    },
    {
      question: "مَا ضِدُّ كَلِمَةِ 'الْكَذِب'؟",
      translation: "Apa lawan kata 'Al-Kadzib'?",
      answer: "الصِّدْقُ."
    },
    {
      question: "هَلِ الْكَذِبُ يُؤَدِّي إِلَى ذُنُوبٍ أُخْرَى؟",
      translation: "Apakah bohong menuntun pada dosa lain?",
      answer: "نَعَمْ، وَتَرْكُهُ يُغْلِقُ أَبْوَابَ الشَّرِّ."
    },
    {
      question: "مَا جَمْعُ كَلِمَةِ 'عِقَاب'؟",
      translation: "Apa jamak dari 'Iqab'?",
      answer: "عُقُوبَاتٌ."
    },
    {
      question: "عَلَى أَيِّ شَيْءٍ كَانَ الرَّجُلُ يَعْمَلُ بَعْدَ إِسْلَامِهِ الْحَسَنِ؟",
      translation: "Dalam hal apa pria itu bekerja setelah Islamnya baik?",
      answer: "عَلَى نُصْرَةِ الدِّينِ وَالتَّمَسُّكِ بِفَضَائِلِهِ."
    },
    {
      question: "لِمَاذَا يُعْتَبَرُ تَرْكُ الْكَذِبِ أَسَاسَ الْإِصْلَاحِ؟",
      translation: "Mengapa meninggalkan bohong dianggap dasar perbaikan?",
      answer: "لِأَنَّ الصِّدْقَ يَمْنَعُ الْإِنْسَانَ مِنَ اخْفَاءِ الْمَعَاصِي."
    },
    {
      question: "مَا عُنْوَانُ هَذَا النَّصِّ؟",
      translation: "Apa judul teks ini?",
      answer: "هَلْ تُعَاهِدُنِي عَلَى تَرْكِ الْكَذِبِ."
    },

    // --- MATERI 3: Sikap Meremehkan (التهـاون) ---
    {
      question: "مَاذَا كَانَ يَصْنَعُ الرَّجُلَانِ؟",
      translation: "Apa yang sedang dibuat oleh dua pria itu?",
      answer: "كَانَا يَصْنَعَانِ سَفِينَةً."
    },
    {
      question: "مَاذَا وَجَدَ أَحَدُهُمَا فِي قِطْعَةِ الْخَشَبِ؟",
      translation: "Apa yang ditemukan salah satu dari mereka di potongan kayu?",
      answer: "وَجَدَ دُودَةً صَغِيرَةً."
    },
    {
      question: "مَاذَا أَرَادَ أَحَدُهُمَا أَنْ يَفْعَلَ بِالْخَشَبَةِ؟",
      translation: "Apa yang ingin dilakukan salah satu dari mereka pada kayu itu?",
      answer: "أَرَادَ أَنْ يَرْمِيَهَا."
    },
    {
      question: "بِمَاذَا احْتَجَّ الزَّمِيلُ لِيَمْنَعَ رَمْيَ الْخَشَبَةِ؟",
      translation: "Apa alasan temannya mencegah membuang kayu itu?",
      answer: "قَالَ إِنَّهَا صَغِيرَةٌ لَا تَأْثِيرَ لَهَا وَفِي رَمِيهَا خَسَارَةٌ."
    },
    {
      question: "هَلْ تَمَّ اسْتِخْدَامُ الْخَشَبَةِ الْمَعِيبَةِ؟",
      translation: "Apakah kayu cacat itu akhirnya digunakan?",
      answer: "نَعَمْ، أُدْخِلَتِ الْخَشَبَةُ فِي بِنَاءِ السَّفِينَةِ."
    },
    {
      question: "مَاذَا حَدَثَ لِلدُّودَةِ بَعْدَ سِنِينَ؟",
      translation: "Apa yang terjadi pada cacing itu setelah bertahun-tahun?",
      answer: "وَلَدَتْ دِيدَانًا كَثِيرَةً."
    },
    {
      question: "كَيْفَ أَثَّرَتِ الدِّيدَانُ عَلَى الْخَشَبِ؟",
      translation: "Bagaimana cacing-cacing itu memengaruhi kayu?",
      answer: "أَكَلَتْ قَلْبَ الْخَشَبَةِ حَتَّى نَخَرَتْهَا وَأَضْعَفَتْهَا."
    },
    {
      question: "مَاذَا صَادَفَ السَّفِينَةَ فِي الْبَحْرِ؟",
      translation: "Apa yang menimpa kapal di laut?",
      answer: "صَادَفَهَا نَوْءٌ شَدِيدٌ (عَاصِفَةٌ)."
    },
    {
      question: "مِنْ أَيْنَ دَخَلَ الْمَاءُ إِلَى السَّفِينَةِ؟",
      translation: "Dari mana air masuk ke kapal?",
      answer: "مِنَ الْخَرْمِ الصَّغِيرِ الَّذِي أَحْدَثَتْهُ الدُّودَةُ."
    },
    {
      question: "هَلْ اسْتَطَاعَ الْمَلَّاحُونَ إِخْرَاجَ الْمَاءِ؟",
      translation: "Apakah para pelaut bisa mengeluarkan air?",
      answer: "لَا، لَمْ يَسْتَطِيعُوا لِاتِّسَاعِ الْخَرْمِ."
    },
    {
      question: "مَا مَصِيرُ السَّفِينَةِ فِي النِّهَايَةِ؟",
      translation: "Apa nasib kapal itu akhirnya?",
      answer: "غَرِقَتْ بِمَا فِيهَا مِنَ الْأَمْوَالِ وَالْأَنْفُسِ."
    },
    {
      question: "مَا السَّبَبُ الرَّئِيسِيُّ لِهَذِهِ الْكَارِثَةِ؟",
      translation: "Apa penyebab utama bencana ini?",
      answer: "الْخَشَبَةُ الصَّغِيرَةُ الَّتِي كَانَتْ فِيهَا الدُّودَةُ (التَّهَاوُنُ)."
    },
    {
      question: "لَوْ رُمِيَتِ الْخَشَبَةُ فِي الْبِدَايَةِ، مَاذَا كَانَ سَيَحْدُثُ؟",
      translation: "Jika kayu itu dibuang di awal, apa yang akan terjadi?",
      answer: "لَمَا حَصَلَتْ هَذِهِ الْمُصِيبَةُ."
    },
    {
      question: "مَا مَعْنَى كَلِمَةِ 'نَخَرَتْهَا'؟",
      translation: "Apa arti kata 'Nakharatha'?",
      answer: "أَكَلَتْهَا وَثَقَبَتْهَا (جَعَلَتْهَا مُجَوَّفَةً)."
    },
    {
      question: "مَا مَعْنَى 'نَوْءٌ شَدِيدٌ'؟",
      translation: "Apa arti 'Nau'un Syadid'?",
      answer: "عَاصِفَةٌ قَوِيَّةٌ أَوْ هَيْجَانُ الْبَحْرِ."
    },
    {
      question: "مَا مَعْنَى 'التَّهَاوُن'؟",
      translation: "Apa arti 'At-Tahawun'?",
      answer: "الْإِهْمَالُ وَعَدَمُ الِاهْتِمَامِ بِالْأُمُورِ."
    },
    {
      question: "مَا جَمْعُ كَلِمَةِ 'سَفِينَة'؟",
      translation: "Apa jamak dari 'Safinah'?",
      answer: "سُفُنٌ أَوْ سَفَائِنُ."
    },
    {
      question: "مَا الْحِكْمَةُ الْمَذْكُورَةُ فِي آخِرِ النَّصِّ؟",
      translation: "Apa hikmah yang disebut di akhir teks?",
      answer: "إِنَّ الْأُمُورَ دَقِيقَهَا مِمَّا يَهِيجُ لَهَا الْعَظِيمُ (Hal kecil bisa menyebabkan masalah besar)."
    },
    {
      question: "هَلِ الْعَمَلُ الصَّغِيرُ لَهُ تَأْثِيرٌ كَبِيرٌ؟",
      translation: "Apakah perbuatan kecil punya dampak besar?",
      answer: "نَعَمْ، كَثِيرًا مَا يَأْتِي بِنَتَائِجَ كَبِيرَةٍ."
    },
    {
      question: "بِمَ تَنْصَحُ مَنْ يَرَى خَطَأً صَغِيرًا؟",
      translation: "Apa nasehatmu bagi yang melihat kesalahan kecil?",
      answer: "أَنْ يُصْلِحَهُ فَوْرًا وَلَا يَتَهَاوَنَ بِهِ."
    },

    // --- MATERI 4: Kebangkitan Bahasa (نهضة اللغة) ---
    {
      question: "مَتَى هَجَرَ الْأَهْلُ اللُّغَةِ الْعَرَبِيَّةَ؟",
      translation: "Kapan penduduk meninggalkan bahasa Arab?",
      answer: "أَيَّامَ دُوَلِ الْإِسْلَامِ."
    },
    {
      question: "كَيْفَ كَانَتِ اللُّغَةُ الْعَرَبِيَّةُ قَبْلَ ذَلِكَ (أَيَّامَ دُوَلِ الْإِسْلَامِ)؟",
      translation: "Bagaimana Bahasa Arab sebelumnya?",
      answer: "كَانَتْ فِي غَايَةِ الْفَصَاحَةِ وَالرُّقِيِّ وَالِانْتِشَارِ."
    },
    {
      question: "هَلْ انْتَشَرَتِ اللُّغَةُ بَيْنَ طَبَقَةٍ مُعَيَّنَةٍ فَقَطْ؟",
      translation: "Apakah bahasa itu menyebar di kalangan tertentu saja?",
      answer: "لَا، بَلْ بَيْنَ جَمِيعِ الطَّبَقَاتِ عَظِيمِهَا وَحَقِيرِهَا."
    },
    {
      question: "بِمَ شَعَرَ الْعَرَبُ فِي الْعَصْرِ الْحَدِيثِ؟",
      translation: "Apa yang dirasakan bangsa Arab di masa modern?",
      answer: "شَعَرُوا بِشِدَّةِ الْحَاجَةِ إِلَى إِحْيَاءِ اللُّغَةِ."
    },
    {
      question: "مَاذَا نَشَأَ بَيْنَ الْعَرَبِ بَعْدَ هَذَا الشُّعُورِ؟",
      translation: "Apa yang muncul di antara bangsa Arab setelah perasaan ini?",
      answer: "نَشَأَتْ نَهْضَةٌ مُبَارَكَةٌ تَنَاوَلَتْ كُلَّ طَبَقَاتِ الْأُمَّةِ."
    },
    {
      question: "مَا وَاجِبُ أَبْنَاءِ الْبِلَادِ الْيَوْمَ؟",
      translation: "Apa kewajiban putra bangsa hari ini?",
      answer: "أَنْ يَعْمَلُوا جُهْدَهُمْ عَلَى بُلُوغِ غَايَةِ إِحْيَاءِ اللُّغَةِ."
    },
    {
      question: "إِذَا تَكَلَّمْتَ، مَاذَا يَجِبُ عَلَيْكَ أَنْ تَسْتَعْمِلَ؟",
      translation: "Jika kamu bicara, apa yang harus kamu gunakan?",
      answer: "لَا أَسْتَعْمِلُ مِنَ الْكَلِمَاتِ إِلَّا مَا يَصِحُّ كِتَابَتُهُ."
    },
    {
      question: "وَإِذَا كَتَبْتَ، مَاذَا تَكْتُبُ؟",
      translation: "Jika kamu menulis, apa yang kamu tulis?",
      answer: "لَا أَكْتُبُ إِلَّا الْكَلِمَاتِ الَّتِي أَرَاهَا فِي الْكُتُبِ."
    },
    {
      question: "لِمَاذَا يَجِبُ ضَبْطُ الْكَلِمَاتِ عِنْدَ الْقِرَاءَةِ؟",
      translation: "Mengapa harus men-dhabt kata saat membaca?",
      answer: "لِأَنَّهَا سَتَأْتِي فِي الْحَدِيثِ مَعَ النَّاسِ."
    },
    {
      question: "لِمَاذَا يَجِبُ التَّأَمُّلُ فِي رَسْمِ الْكَلِمَاتِ؟",
      translation: "Mengapa harus memperhatikan penulisan kata?",
      answer: "لِأَنِّي سَأَكْتُبُهَا فِي الدُّرُوسِ أَوِ الرَّسَائِلِ."
    },
    {
      question: "مَتَى يَعْرِفُ النَّاسُ أَنَّكَ تَعَلَّمْتَ؟",
      translation: "Kapan orang tahu kamu terpelajar?",
      answer: "إِذَا كُنْتُ مُدَقِّقًا فِي الْقَوْلِ وَالْكِتَابَةِ."
    },
    {
      question: "كَيْفَ تَحْيَا لُغَتُنَا وَتَزْهُو؟",
      translation: "Bagaimana bahasa kita hidup dan berkembang?",
      answer: "إِذَا نَهَضْنَا بِهَا وَالْتَزَمْنَا بِقَوَاعِدِهَا."
    },
    {
      question: "مَا الَّذِي يَجِبُ تَجَنُّبُهُ فِي الْكَلَامِ؟",
      translation: "Apa yang harus dihindari dalam bicara?",
      answer: "تَجَنُّبُ لُغَةِ الْعَامَّةِ."
    },
    {
      question: "مَاذَا يَحْدُثُ إِذَا كَثُرَ الْمُتَحَدِّثُونَ بِاللُّغَةِ الصَّحِيحَةِ؟",
      translation: "Apa yang terjadi jika banyak yang bicara bahasa baku?",
      answer: "يَكْثُرُ الْمُقْتَدُونَ بِهِمْ وَتَعُمُّ الْأَلْفَاظُ الصَّحِيحَةُ."
    },
    {
      question: "بِمَاذَا نَخْدِمُ لُغَةَ الْإِسْلَامِ حَسَبَ النَّصِّ؟",
      translation: "Dengan apa kita melayani bahasa Islam menurut teks?",
      answer: "بِالْتِزَامِ التَّعْبِيرِ الصَّحِيحِ وَنَشْرِ الْأَلْفَاظِ الْعِلْمِيَّةِ."
    },
    {
      question: "مَا مَعْنَى 'الرُّقِيّ'؟",
      translation: "Apa arti 'Ar-Ruqiy'?",
      answer: "التَّقَدُّمُ وَالْعُلُوُّ."
    },
    {
      question: "مَا مَعْنَى 'الْأَقْطَار'؟",
      translation: "Apa arti 'Al-Aqthar'?",
      answer: "الْبِلَادُ أَوْ النَّوَاحِي."
    },
    {
      question: "مَا جَمْعُ كَلِمَةِ 'عَصْر'؟",
      translation: "Apa jamak 'Ashr'?",
      answer: "عُصُورٌ."
    },
    {
      question: "مَا مُفْرَدُ كَلِمَةِ 'الْأَلْفَاظ'؟",
      translation: "Apa tunggal dari 'Al-Alfazh'?",
      answer: "اللَّفْظُ."
    },
    {
      question: "هَلِ اللُّغَةُ الْعَرَبِيَّةُ خَاصَّةٌ بِالْمُسْلِمِينَ فَقَطْ؟",
      translation: "Apakah Bhs Arab khusus muslim saja?",
      answer: "هِيَ لُغَةُ الْإِسْلَامِ وَلَكِنَّهَا حَضَارَةٌ لِلْجَمِيعِ، وَالنَّصُّ يَرُكِّزُ عَلَى خِدْمَتِهَا كَلُغَةِ الدِّينِ."
    },
  ],
  nahwu: [
    {
        question: "مَا الْفَرْقُ بَيْنَ الْجُمْلَةِ الْاسْمِيَّةِ وَالْجُمْلَةِ الْفِعْلِيَّةِ؟",
        translation: "Apa perbedaan Jumlah Ismiyah dan Jumlah Fi'liyah?",
        answer: "الْاسْمِيَّةُ تَبْدَأُ بِاسْمٍ، وَالْفِعْلِيَّةُ تَبْدَأُ بِفِعْلٍ.",
    },
    {
        question: "اُذْكُرْ عَلَامَاتِ الرَّفْعِ فِي الْاسْمِ الْمُفْرَدِ.",
        translation: "Sebutkan tanda I'rob Rofa' pada Isim Mufrad.",
        answer: "الضَّمَّةُ.",
    },
    {
        question: "مَا هُوَ الْمُبْتَدَأُ وَالْخَبَرُ؟",
        translation: "Jelaskan apa itu Mubtada dan Khobar.",
        answer: "الْمُبْتَدَأُ هُوَ الِاسْمُ الْمَرْفُوعُ فِي أَوَّلِ الْجُمْلَةِ، وَالْخَبَرُ هُوَ مَا يُكَمِّلُ مَعْنَاهُ.",
    },
    {
        question: "مَا هُوَ الْفَاعِلُ؟ هَاتِ مِثَالاً!",
        translation: "Apa itu Fa'il? Berikan contoh.",
        answer: "هُوَ الِاسْمُ الْمَرْفُوعُ الَّذِي دَلَّ عَلَى مَنْ فَعَلَ الْفِعْلَ. مِثَال: قَامَ زَيْدٌ.",
    },
    {
        question: "اُذْكُرْ بَعْضَ الْأَسْمَاءِ الْمَمْنُوعَةِ مِنَ الصَّرْفِ.",
        translation: "Sebutkan beberapa Isim Ghoiru Munsharif.",
        answer: "مِثْل: إِبْرَاهِيمُ، مَسَاجِدُ، أَحْمَرُ.",
    },
    {
        question: "مَا عَمَلُ كَانَ وَأَخَوَاتِهَا؟",
        translation: "Apa fungsi Kana wa Akhwatuha?",
        answer: "تَرْفَعُ الْمُبْتَدَأَ وَتَنْصِبُ الْخَبَرَ.",
    },
    {
        question: "مَا تَأْثِيرُ حُرُوفِ الْجَرِّ عَلَى الْاسْمِ؟",
        translation: "Apa dampak huruf Jar pada Isim?",
        answer: "تَجُرُّ الْاسْمَ بَعْدَهَا.",
    },
    {
        question: "مَا الْفَرْقُ بَيْنَ النَّعْتِ وَالْمَنْعُوتِ؟",
        translation: "Jelaskan perbedaan Na'at dan Man'ut.",
        answer: "النَّعْتُ تَابِعٌ يَذْكُرُ صِفَةً فِي الْمَنْعُوتِ، وَيَتْبَعُهُ فِي الْإِعْرَابِ.",
    },
    {
        question: "هَاتِ جُمْلَةً مُفِيدَةً فِيهَا مَفْعُولٌ بِهِ.",
        translation: "Buatlah kalimat yang mengandung Maf'ul Bih.",
        answer: "قَرَأَ الطَّالِبُ الْكِتَابَ.",
    },
    {
        question: "مَا هُوَ الِاسْمُ الْمَوْصُولُ؟",
        translation: "Apa itu Isim Maushul?",
        answer: "مِثْل: الَّذِي، الَّتِي، الَّذِينَ.",
    },
    {
        question: "اُذْكُرْ حُرُوفَ النَّصْبِ.",
        translation: "Sebutkan huruf-huruf Nashob.",
        answer: "أَنْ، لَنْ، إِذَنْ، كَيْ، لَامُ التَّعْلِيلِ.",
    },
    {
        question: "اُذْكُرْ حُرُوفَ الْجَزْمِ.",
        translation: "Sebutkan huruf-huruf Jazm.",
        answer: "لَمْ، لَمَّا، لَامُ الْأَمْرِ، لَا النَّاهِيَةُ.",
    },
    {
        question: "مَا هِيَ النَّوَاسِخُ؟",
        translation: "Apa itu 'Amil Nawasikh?",
        answer: "كَانَ وَأَخَوَاتُهَا، إِنَّ وَأَخَوَاتُهَا، ظَنَّ وَأَخَوَاتُهَا.",
    },
  ],
  shorof: [
    {
        question: "مَا هُوَ الْفِعْلُ الْمُجَرَّدُ ؟",
        translation: "Apa itu Fi'il Mujarrod?",
        answer: "مَا كَانَتْ حُرُوفُهُ كُلُّهَا أَصْلِيَّةً.",
    },
    {
        question: "كَمْ قِسْمًا / نَوْعًا مِنَ الْفِعْلِ الْمُجَرَّدُ ؟ وَهَاتِ مِثَالاً مِنْهُ !",
        translation: "Berapa pembagian Fi'il Mujarrod? Berikan contoh!",
        answer: "نَوْعَانِ: الثُّلَاثِيُّ الْمُجَرَّدُ (نَصَرَ) وَالرُّبَاعِيُّ الْمُجَرَّدُ (دَحْرَجَ).",
    },
    {
        question: "أُذْكُرْ سِتَّةَ أَوْزَانٍ / أَبْوَابٍ مِنَ الثُّلَاثِيِّ الْمُجَرَّدِ !",
        translation: "Sebutkan 6 Wazan Tsulatsi Mujarrod!",
        answer: "1. فَعَلَ-يَفْعُلُ 2. فَعَلَ-يَفْعِلُ 3. فَعَلَ-يَفْعَلُ 4. فَعِلَ-يَفْعَلُ 5. فَعُلَ-يَفْعُلُ 6. فَعِلَ-يَفْعِلُ",
    },
    {
        question: "أُذْكُرْ بَابَ الرُّبَاعِيِّ الْمُجَرَّدِ !",
        translation: "Sebutkan Bab Rubai Mujarrod!",
        answer: "فَعْلَلَ : تَرْجَمَ , وَسْوَسَ , طَمْأَنَ.",
    },
    {
        question: "مَا هُوَ الْفِعْلُ الْمَزِيْدُ ؟",
        translation: "Apa itu Fi'il Mazid?",
        answer: "مَا زِيْدَ عَلَى حُرُوفِهِ الْأَصْلِيَّةِ حَرْفٌ وَاحِدٌ أَوْ حَرْفَانِ أَوْ ثَلَاثَةُ أَحْرُفٍ.",
    },
    {
        question: "كَمْ قِسْمًا / نَوْعًا مِنَ الْفِعْلِ الْمَزِيْدُ ؟ وَهَاتِ مِثَالاً مِنْهُ !",
        translation: "Berapa pembagian Fi'il Mazid? Berikan contoh!",
        answer: "نَوْعَانِ: الثُّلَاثِيُّ الْمَزِيْدُ (أَخْرَجَ) وَالرُّبَاعِيُّ الْمَزِيْدُ (تَدَحْرَجَ).",
    },
    {
        question: "أُذْكُرْ الْمِثَالَ مِنَ الثُّلَاثِيِّ الْمَزِيْدِ بِحَرْفٍ وَاحِدٍ ؟",
        translation: "Sebutkan contoh Tsulatsi Mazid 1 Huruf!",
        answer: "فَعَّلَ (فَرَّحَ) - فَاعَلَ (قَاتَلَ) - أَفْعَلَ (أَخْرَجَ).",
    },
    {
        question: "أُذْكُرْ الْمِثَالَ مِنَ الثُّلَاثِيِّ الْمَزِيْدِ بِحَرْفَيْنِ ؟",
        translation: "Sebutkan contoh Tsulatsi Mazid 2 Huruf!",
        answer: "تَفَاعَلَ (تَبَاعَدَ) - تَفَعَّلَ (تَكَسَّرَ) - افْتَعَلَ (اجْتَمَعَ) - انْفَعَلَ (انْكَسَرَ) - افْعَلَّ (احْمَرَّ).",
    },
    {
        question: "أُذْكُرْ الْمِثَالَ مِنَ الثُّلَاثِيِّ الْمَزِيْدِ بِثَلَاثَةِ أَحْرُفٍ ؟",
        translation: "Sebutkan contoh Tsulatsi Mazid 3 Huruf!",
        answer: "اسْتَفْعَلَ (اسْتَخْرَجَ) - افْعَوْعَلَ (اِحْلَوْلَى) - افْعَالَّ (اِحْمَارَّ) - افْعَوَّلَ (اِجْلَوَّذَ).",
    },
    {
        question: "أُذْكُرْ الْمِثَالَ مِنَ الرُّبَاعِيِّ الْمَزِيْدِ بِحَرْفٍ وَاحِدٍ ؟",
        translation: "Sebutkan contoh Rubai Mazid 1 Huruf!",
        answer: "تَفَعْلَلَ (تَبَعْثَرَ , تَدَحْرَجَ).",
    },
    {
        question: "أُذْكُرْ الْمِثَالَ مِنَ الرُّبَاعِيِّ الْمَزِيْدِ بِحَرْفَيْنِ ؟",
        translation: "Sebutkan contoh Rubai Mazid 2 Huruf!",
        answer: "افْعَنْلَلَ (اِحْرَنْجَمَ).",
    },
    {
        question: "مَا هِيَ الْمُلْحَقَةُ ؟ وَهَاتِ مِثَالاً مِنْهُ !",
        translation: "Apa itu Mulhaqah? Berikan contoh!",
        answer: "أَنْ يُعْمَلَ الْمَاضِي مَا يُعْمَلُهُ الْآخَرُ. مِثَال: فَيعَلَ (بَيْطَرَ)، فَعْوَلَ (جَهْوَرَ).",
    },
  ],
  tarjamah: [
    // Bagian 1: Kosa Kata (Mufrodat)
    {
        question: "مَا مَعْنَى 'عُمْلَة' بِالْإِنْدُونِيسِيَّةِ؟",
        translation: "Apa arti 'Umlah'?",
        answer: "Alat Pembayaran / Mata Uang",
    },
    {
        question: "مَا مَعْنَى 'مِيْزَانِيَّة' بِالْإِنْدُونِيسِيَّةِ؟",
        translation: "Apa arti 'Mizaniyah'?",
        answer: "Anggaran (Budget)",
    },
    {
        question: "مَا مَعْنَى 'شَاذّ' بِالْإِنْدُونِيسِيَّةِ؟",
        translation: "Apa arti 'Syadz'?",
        answer: "Abnormal / Menyimpang",
    },
    {
        question: "تَرْجِمْ كَلِمَةَ 'Abstrak' إِلَى الْعَرَبِيَّةِ.",
        translation: "Terjemahkan 'Abstrak' ke Arab.",
        answer: "مُجَرَّد",
    },
    {
        question: "تَرْجِمْ كَلِمَةَ 'Kebutuhan Pokok' إِلَى الْعَرَبِيَّةِ.",
        translation: "Terjemahkan 'Kebutuhan Pokok'.",
        answer: "الْحَاجَةُ الضَّرُوْرِيَّةُ",
    },
    {
        question: "مَا مَعْنَى 'الْمُنَافَسَة التِّجَارِيَّة'؟",
        translation: "Apa arti 'Al-Munafasah At-Tijariyah'?",
        answer: "Persaingan Perdagangan",
    },
    {
        question: "مَا مَعْنَى 'رَفَاهِيَة'؟",
        translation: "Apa arti 'Rafahiyah'?",
        answer: "Kesejahteraan",
    },
    {
        question: "تَرْجِمْ كَلِمَةَ 'Pengungsi' إِلَى الْعَرَبِيَّةِ.",
        translation: "Terjemahkan 'Pengungsi'.",
        answer: "لَاجِئ",
    },
    {
        question: "تَرْجِمْ كَلِمَةَ 'Pasar Bebas' إِلَى الْعَرَبِيَّةِ.",
        translation: "Terjemahkan 'Pasar Bebas'.",
        answer: "السُّوْقُ الْحُرَّةُ",
    },
    {
        question: "مَا مَعْنَى 'حِسَاب' فِي الْبَنْكِ؟",
        translation: "Apa arti 'Hisab' di Bank?",
        answer: "Rekening (Account)",
    },
    {
        question: "تَرْجِمْ كَلِمَةَ 'Asuransi' إِلَى الْعَرَبِيَّةِ.",
        translation: "Terjemahkan 'Asuransi'.",
        answer: "تَأْمِيْن",
    },
    {
        question: "مَا مَعْنَى 'فَوْضَى'؟",
        translation: "Apa arti 'Faudho'?",
        answer: "Kekacauan (Chaos)",
    },
    {
        question: "مَا مَعْنَى 'مِلَفّ' (File)؟",
        translation: "Apa arti 'Milaf'?",
        answer: "Berkas / File",
    },
    {
        question: "تَرْجِمْ كَلِمَةَ 'Akuntansi' إِلَى الْعَرَبِيَّةِ.",
        translation: "Terjemahkan 'Akuntansi'.",
        answer: "مُحَاسَبَة",
    },
    {
        question: "تَرْجِمْ كَلِمَةَ 'Latar Belakang' إِلَى الْعَرَبِيَّةِ.",
        translation: "Terjemahkan 'Latar Belakang'.",
        answer: "خَلْفِيَّة",
    },
    {
        question: "مَا مَعْنَى 'إِحْبَاط'؟",
        translation: "Apa arti 'Ihbath'?",
        answer: "Frustasi",
    },
    {
        question: "تَرْجِمْ: 'Barat Laut' وَ 'Tenggara'.",
        translation: "Terjemahkan arah mata angin: Barat Laut & Tenggara.",
        answer: "شَمَال غَرْبِيّ - جَنُوْب شَرْقِيّ",
    },
    {
        question: "مَا مَعْنَى 'الْمِنْحَةُ الدِّرَاسِيَّة'؟",
        translation: "Apa arti 'Al-Minhah Ad-Dirosiyah'?",
        answer: "Beasiswa",
    },
    {
        question: "مَا مَعْنَى 'شُجَاع' وَ 'جَبَان'؟",
        translation: "Apa arti 'Syuja' dan 'Jaban'?",
        answer: "Pemberani & Pengecut",
    },
    {
        question: "تَرْجِمْ: 'Membuktikan' وَ 'Membujuk'.",
        translation: "Terjemahkan: Membuktikan & Membujuk.",
        answer: "أَثْبَتَ (يُثْبِتُ) - رَاوَدَ (يُرَاوِدُ)",
    },
    {
        question: "مَا مَعْنَى 'صَحَافِيّ'؟",
        translation: "Apa arti 'Shahafiy'?",
        answer: "Wartawan",
    },
    {
        question: "مَا مَعْنَى 'هَشّ'؟",
        translation: "Apa arti 'Hasy'?",
        answer: "Rapuh",
    },
    {
        question: "تَرْجِمْ: 'Aspal, Marmer, Mutiara'.",
        translation: "Terjemahkan: Aspal, Marmer, Mutiara.",
        answer: "قَطْرَان، رُخَام، لُؤْلُؤ",
    },
    {
        question: "تَرْجِمْ: 'Emas, Perak, Intan'.",
        translation: "Terjemahkan: Emas, Perak, Intan.",
        answer: "ذَهَب، فِضَّة، أَلْمَاس",
    },
    {
        question: "مَا مَعْنَى 'بَذَّرَ - يُبَذِّرُ'؟",
        translation: "Apa arti 'Badzara - Yubadziru'?",
        answer: "Boros / Memboroskan",
    },
    
    // Bagian 2: Kalimat (Jumalah)
    {
        question: "تَرْجِمْ إِلَى الْإِنْدُونِيسِيَّةِ: 'مَنْ جَدَّ وَجَدَ'.",
        translation: "Terjemahkan ke Indonesia: 'Man jadda wajada'.",
        answer: "Barangsiapa bersungguh-sungguh, ia akan berhasil.",
    },
    {
        question: "تَرْجِمْ إِلَى الْإِنْدُونِيسِيَّةِ: 'الْوَقْتُ كَالسَّيْفِ'.",
        translation: "Terjemahkan ke Indonesia: 'Al-waqtu kassaif'.",
        answer: "Waktu itu seperti pedang.",
    },
    {
        question: "تَرْجِمْ إِلَى الْعَرَبِيَّةِ: 'SAYA PERGI KE MASJID UNTUK SHOLAT'.",
        translation: "Terjemahkan ke Arab: Saya pergi ke masjid untuk sholat.",
        answer: "أَذْهَبُ إِلَى الْمَسْجِدِ لِلصَّلَاةِ.",
    },
    {
        question: "تَرْجِمْ إِلَى الْعَرَبِيَّةِ: 'KEBERSIHAN SEBAGIAN DARI IMAN'.",
        translation: "Terjemahkan: Kebersihan sebagian dari Iman.",
        answer: "النَّظَافَةُ مِنَ الْإِيمَانِ.",
    },
    {
        question: "تَرْجِمْ إِلَى الْعَرَبِيَّةِ: 'SAYA INGIN MENJADI DOKTER'.",
        translation: "Terjemahkan: Saya ingin menjadi dokter.",
        answer: "أُرِيدُ أَنْ أَكُونَ طَبِيبًا.",
    },
  ],
};

export const INITIAL_STUDENTS: Student[] = [
  // Kelompok A
  { id: '1', no: 1, name: 'Ahmad Sopian', nis: '5001', class: '5C', group: 'A', gender: 'L', examiner: 'Liyas Syarifudin, M.Pd.', scores: emptyScores, questionLog: emptyLogs },
  { 
    id: '2', no: 2, name: 'Arfan Nurdiansyah', nis: '5002', class: '5C', group: 'A', gender: 'L', 
    examiner: 'Liyas Syarifudin, M.Pd.', 
    scores: { muhadatsah: 80, mutholaah: 80, nahwu: 85, shorof: 76, tarjamah: 86 }, 
    questionLog: emptyLogs 
  },
  { id: '3', no: 3, name: 'Fachri Akbar Ajabar', nis: '5003', class: '5C', group: 'A', gender: 'L', examiner: 'Liyas Syarifudin, M.Pd.', scores: emptyScores, questionLog: emptyLogs },
  { 
    id: '4', no: 4, name: 'Faizal Abdul Aziz', nis: '5004', class: '5C', group: 'A', gender: 'L', 
    examiner: 'Liyas Syarifudin, M.Pd.', 
    scores: { muhadatsah: 50, mutholaah: 45, nahwu: 40, shorof: 45, tarjamah: 40 }, 
    questionLog: emptyLogs 
  },
  { 
    id: '5', no: 5, name: 'Ibrahim Algazali R', nis: '5005', class: '5C', group: 'A', gender: 'L', 
    examiner: 'Liyas Syarifudin, M.Pd.', 
    scores: { muhadatsah: 90, mutholaah: 80, nahwu: 78, shorof: 70, tarjamah: 80 }, 
    questionLog: emptyLogs 
  },
  { 
    id: '6', no: 6, name: 'Kieno Isnan Haqqi', nis: '5006', class: '5C', group: 'A', gender: 'L', 
    examiner: 'Liyas Syarifudin, M.Pd.', 
    scores: { muhadatsah: 90, mutholaah: 87, nahwu: 78, shorof: 75, tarjamah: 85 }, 
    questionLog: emptyLogs 
  },
  { 
    id: '7', no: 7, name: 'M. Aditya Juliansyah', nis: '5007', class: '5C', group: 'A', gender: 'L', 
    examiner: 'Liyas Syarifudin, M.Pd.', 
    scores: { muhadatsah: 48, mutholaah: 44, nahwu: 30, shorof: 30, tarjamah: 35 }, 
    questionLog: emptyLogs 
  },

  // Kelompok B
  { id: '8', no: 8, name: 'Mohammad Fadhlan V', nis: '5008', class: '5C', group: 'B', gender: 'L', examiner: 'Liyas Syarifudin, M.Pd.', scores: emptyScores, questionLog: emptyLogs },
  { id: '9', no: 9, name: 'Muchammad Fatir A', nis: '5009', class: '5C', group: 'B', gender: 'L', examiner: 'Liyas Syarifudin, M.Pd.', scores: emptyScores, questionLog: emptyLogs },
  { id: '10', no: 10, name: 'Muhamad Haikal', nis: '5010', class: '5C', group: 'B', gender: 'L', examiner: 'Liyas Syarifudin, M.Pd.', scores: emptyScores, questionLog: emptyLogs },
  { id: '11', no: 11, name: 'Muhammad Revan A', nis: '5011', class: '5C', group: 'B', gender: 'L', examiner: 'Liyas Syarifudin, M.Pd.', scores: emptyScores, questionLog: emptyLogs },
  { id: '12', no: 12, name: 'Muhammad Afnan R', nis: '5012', class: '5C', group: 'B', gender: 'L', examiner: 'Liyas Syarifudin, M.Pd.', scores: emptyScores, questionLog: emptyLogs },
  { id: '13', no: 13, name: 'Muhammad Hasbi', nis: '5013', class: '5C', group: 'B', gender: 'L', examiner: 'Liyas Syarifudin, M.Pd.', scores: emptyScores, questionLog: emptyLogs },
  { id: '14', no: 14, name: 'Muhammad Jalfi Al Farizi', nis: '5014', class: '5C', group: 'B', gender: 'L', examiner: 'Liyas Syarifudin, M.Pd.', scores: emptyScores, questionLog: emptyLogs },

  // Kelompok C
  { id: '15', no: 15, name: 'Raihan Muftihurrizqi', nis: '5015', class: '5C', group: 'C', gender: 'L', examiner: 'Liyas Syarifudin, M.Pd.', scores: emptyScores, questionLog: emptyLogs },
  { id: '16', no: 16, name: 'Muhammad Iqbal A', nis: '5016', class: '5C', group: 'C', gender: 'L', examiner: 'Liyas Syarifudin, M.Pd.', scores: emptyScores, questionLog: emptyLogs },
  { id: '17', no: 17, name: 'Muhammad Zaki A', nis: '5017', class: '5C', group: 'C', gender: 'L', examiner: 'Liyas Syarifudin, M.Pd.', scores: emptyScores, questionLog: emptyLogs },
  { id: '18', no: 18, name: 'Muharriyansyah H', nis: '5018', class: '5C', group: 'C', gender: 'L', examiner: 'Liyas Syarifudin, M.Pd.', scores: emptyScores, questionLog: emptyLogs },
  { id: '19', no: 19, name: 'Rafi Alhakam Sadin', nis: '5019', class: '5C', group: 'C', gender: 'L', examiner: 'Liyas Syarifudin, M.Pd.', scores: emptyScores, questionLog: emptyLogs },
  { id: '20', no: 20, name: 'Ragil Fadhilah', nis: '5020', class: '5C', group: 'C', gender: 'L', examiner: 'Liyas Syarifudin, M.Pd.', scores: emptyScores, questionLog: emptyLogs },
  { id: '21', no: 21, name: 'Ziyad Rachman Syafiq', nis: '5021', class: '5C', group: 'C', gender: 'L', examiner: 'Liyas Syarifudin, M.Pd.', scores: emptyScores, questionLog: emptyLogs },
];
