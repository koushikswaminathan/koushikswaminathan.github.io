export type Note = {
  slug: string;
  title: string;
  summary: string;
  date: string;
  year: string;
  readingTime: string;
  category: string;
  tags: string[];
};

export const notes: Note[] = [
  {
    slug: "spectral-statistics-primer",
    title: "A short primer on spectral statistics",
    summary:
      "How level spacings and gap ratios help distinguish regular and chaotic many-body spectra.",
    date: "2 August 2026",
    year: "2026",
    readingTime: "6 min read",
    category: "Explainer",
    tags: ["spectral statistics", "many-body physics"],
  },
  {
    slug: "exact-diagonalization-workflow",
    title: "A compact exact-diagonalization workflow",
    summary:
      "A temporary technical note demonstrating equations, code, figures, citations, and a table of contents.",
    date: "24 July 2026",
    year: "2026",
    readingTime: "8 min read",
    category: "Technical note",
    tags: ["exact diagonalization", "numerics"],
  },
  {
    slug: "conference-notebook",
    title: "Notes from a many-body physics meeting",
    summary:
      "A sample conference reflection showing the lighter, more informal format available for Notes.",
    date: "12 July 2026",
    year: "2026",
    readingTime: "4 min read",
    category: "Conference notes",
    tags: ["conferences", "research culture"],
  },
];

export function getNote(slug: string) {
  return notes.find((note) => note.slug === slug);
}
