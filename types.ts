
export interface Score {
  muhadatsah: number;
  mutholaah: number;
  nahwu: number;
  shorof: number;
  tarjamah: number; // Includes Mufrodat
}

export interface QuestionDetail {
  question: string;
  translation?: string;
  answer?: string;
}

export interface ReadingMaterial {
  title: string;
  titleArabic: string;
  content: string;
}

export interface Student {
  id: string;
  no: number; // Urut presensi
  name: string;
  nis: string;
  class: string;
  group: 'A' | 'B' | 'C';
  gender: 'L' | 'P';
  examiner: string;
  scores: Score;
  // Tracks which question indices (0-based) were asked for each subject
  questionLog: {
    [key in keyof Score]: number[];
  };
}

export interface SubjectConfig {
  key: keyof Score;
  label: string;
  description: string;
}

export const SUBJECTS: SubjectConfig[] = [
  { key: 'muhadatsah', label: 'Muhadatsah', description: 'Kelancaran berbicara' },
  { key: 'mutholaah', label: "Muttholaa'h", description: 'Pemahaman teks' },
  { key: 'nahwu', label: 'Nahwu', description: 'Struktur kalimat' },
  { key: 'shorof', label: 'Shorof', description: 'Pola kata' },
  { key: 'tarjamah', label: 'Tarjamah & Mufrodat', description: 'Terjemah & Kosa kata' },
];
