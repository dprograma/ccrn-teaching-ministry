import raw from "./curriculum.json";
import type {
  Theme,
  TeacherModule,
  WorkshopSession,
  Defs,
  QaItem,
  SchoolTrack,
  ElectiveSeries,
} from "./types";

type Raw = typeof raw;

const data = raw as unknown as {
  community: Theme[];
  reserve: Theme[];
  teachers: { intro: string; modules: TeacherModule[] };
  workshop: { intro: string; sessions: WorkshopSession[] };
  defs: Defs;
  qa: { intro: string; items: QaItem[] };
  site: Raw["site"];
  school: {
    name: string;
    tag: string;
    intro: string;
    note: string;
    tracks: SchoolTrack[];
    electives: {
      n: number;
      name: string;
      level: string;
      weeks: number;
      classes: number;
      blurb: string;
      who: string;
      series: ElectiveSeries[];
    };
    caveat: {
      t: string;
      lead: string;
      p: string[];
      short: string;
      steps: { n: string; t: string; d: string }[];
      ask: string;
    };
    vision: {
      t: string;
      lead: string;
      items: { t: string; d: string }[];
      guest: string;
    };
  };
};

export const COMMUNITY: Theme[] = data.community;
export const RESERVE: Theme[] = data.reserve;
export const TEACHERS = data.teachers;
export const WORKSHOP = data.workshop;
export const DEFS: Defs = data.defs;
export const QA = data.qa;
export const SITE = data.site;
export const SCHOOL = data.school;

export const ALL_THEMES: Theme[] = [...COMMUNITY, ...RESERVE];

export function findTheme(id: string): Theme | undefined {
  return ALL_THEMES.find((t) => t.id === id);
}

export function findLesson(
  themeId: string,
  index: number,
): { theme: Theme; lesson: Theme["lessons"][number] } | undefined {
  const theme = findTheme(themeId);
  const lesson = theme?.lessons[index];
  if (!theme || !lesson) return undefined;
  return { theme, lesson };
}

export function findModule(n: number): TeacherModule | undefined {
  return TEACHERS.modules.find((m) => m.n === n);
}

export function findSession(n: number): WorkshopSession | undefined {
  return WORKSHOP.sessions.find((s) => s.n === n);
}

export function findQa(id: string): QaItem | undefined {
  return QA.items.find((q) => q.id === id);
}

export function findTrack(n: number): SchoolTrack | undefined {
  return SCHOOL.tracks.find((t) => t.n === n);
}

const THEME_ACCENTS = [
  "#13294B",
  "#8C2F39",
  "#5B4B8A",
  "#1E6B5B",
  "#8E6318",
  "#2A5A86",
  "#6B3F8C",
  "#2E6B3A",
];
const RESERVE_ACCENTS = ["#3F5166", "#9C4A2F", "#46618C", "#6B5120"];

export function themeAccent(theme: Theme): string {
  const palette = theme.id.startsWith("c") ? THEME_ACCENTS : RESERVE_ACCENTS;
  return palette[(theme.n - 1) % palette.length];
}

const BOOK_NAMES: Record<string, string> = {
  GEN: "Genesis", EXO: "Exodus", LEV: "Leviticus", NUM: "Numbers", DEU: "Deuteronomy",
  JOS: "Joshua", JDG: "Judges", RUT: "Ruth", "1SA": "1 Samuel", "2SA": "2 Samuel",
  "1KI": "1 Kings", "2KI": "2 Kings", "1CH": "1 Chronicles", "2CH": "2 Chronicles",
  EZR: "Ezra", NEH: "Nehemiah", EST: "Esther", JOB: "Job", PSA: "Psalm", PRO: "Proverbs",
  ECC: "Ecclesiastes", SNG: "Song of Solomon", ISA: "Isaiah", JER: "Jeremiah",
  LAM: "Lamentations", EZK: "Ezekiel", DAN: "Daniel", HOS: "Hosea", JOL: "Joel",
  AMO: "Amos", OBA: "Obadiah", JON: "Jonah", MIC: "Micah", NAM: "Nahum", HAB: "Habakkuk",
  ZEP: "Zephaniah", HAG: "Haggai", ZEC: "Zechariah", MAL: "Malachi", MAT: "Matthew",
  MRK: "Mark", LUK: "Luke", JHN: "John", ACT: "Acts", ROM: "Romans",
  "1CO": "1 Corinthians", "2CO": "2 Corinthians", GAL: "Galatians", EPH: "Ephesians",
  PHP: "Philippians", COL: "Colossians", "1TH": "1 Thessalonians", "2TH": "2 Thessalonians",
  "1TI": "1 Timothy", "2TI": "2 Timothy", TIT: "Titus", PHM: "Philemon", HEB: "Hebrews",
  JAS: "James", "1PE": "1 Peter", "2PE": "2 Peter", "1JN": "1 John", "2JN": "2 John",
  "3JN": "3 John", JUD: "Jude", REV: "Revelation",
};

export function formatRef(ref: string): string {
  const m = ref.match(/^([0-9A-Z]{3})\s+(.+)$/);
  if (!m || !BOOK_NAMES[m[1]]) return ref;
  let verse = m[2].replace(/-/g, "–");
  if (m[1] === "JUD" && /^1[:.]/.test(verse)) {
    verse = verse.replace(/^1[:.]/, "");
  }
  return `${BOOK_NAMES[m[1]]} ${verse}`;
}
