export type CardTheme = "orange" | "blue" | "lime" | "yellow" | "navy";

export type WrappedCard = {
  id: string;
  type: "intro" | "stat" | "quote" | "photo" | "summary";
  eyebrow?: string;
  title: string;
  value?: number;
  displayValue?: string;
  suffix?: string;
  caption?: string;
  quote?: string;
  image?: string;
  images?: string[];
  theme: CardTheme;
};

export type MemoryStar = {
  id: string;
  position: { x: number; y: number };
  title: string;
  memory: string;
  image: string;
  alt: string;
};

export type DadWrappedContent = {
  dadName: string;
  year: number;
  openingMessage: string;
  cards: WrappedCard[];
  memories: MemoryStar[];
  closingMessage: string;
};
