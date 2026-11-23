export type PlayableSource = "EMBED" | "HOSTED";

export type PlayableEntry = {
  id: string;
  title: string;
  language: string;
  description: string;
  sourceType: PlayableSource;
  embedUrl: string | null;
  audioUrl: string | null;
};
