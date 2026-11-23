export interface SourceRef {
  n?: string;
  q: string;
  note?: string;
}

export interface PopeRef {
  who: string;
  doc: string;
  yr: string;
  n?: string;
  q: string;
  note?: string;
}

export interface Faq {
  q: string;
  a: string;
}

export interface Lesson {
  t: string;
  key: string;
  hint: string;
  obj: string[];
  out: string[];
  sup: string;
  app: string[];
  faq: Faq[];
  mem: string;
  ccc?: SourceRef;
  pope?: PopeRef;
}

export interface Theme {
  id: string;
  n: number;
  title: string;
  emph: string;
  ts: string;
  lessons: Lesson[];
}

export interface TeacherModule {
  n: number;
  t: string;
  lvl: string;
  purpose: string;
  must: string[];
  out: string[];
  errors: string[];
  practice: string;
  refs: string[];
  ccc?: SourceRef;
  seven?: boolean;
}

export interface WorkshopSession {
  n: number;
  t: string;
  purpose: string;
  out: string[];
  refs: string[];
  discuss: string[];
  ccc?: SourceRef;
  pope?: PopeRef;
}

export interface WayItem {
  n: string;
  one: string;
  what: string;
  aim: string;
  marks: string[];
  refs: string[];
  watch: string;
  pope?: PopeRef;
}

export interface Defs {
  intro: string;
  items: WayItem[];
  table: { head: string[]; rows: string[][] };
  close: string;
  ccc?: SourceRef;
}

export interface QaChainLink {
  r: string;
  t: string;
  s: string;
}

export interface QaItem {
  id: string;
  cat: string;
  rel?: string[];
  q: string;
  a: string;
  p: string[];
  refs: string[];
  ccc?: SourceRef;
  pope?: PopeRef;
  n: number;
  chain: QaChainLink[];
  christ: string;
}

export type SchoolClass = [title: string, ref: string, desc: string];

export interface SchoolWeek {
  t: string;
  c: SchoolClass[];
}

export interface SchoolTrack {
  n: number;
  name: string;
  weeks: number;
  classes: number;
  level: string;
  blurb: string;
  who: string;
  w: SchoolWeek[];
}

export interface ElectiveSeries {
  t: string;
  n: number;
  d: string;
  parts: string[];
}
