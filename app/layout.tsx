import type { Metadata } from "next";
import Link from "next/link";
import { links, navigation, pageContent, publications } from "../data/site-config";
import Search from "./Search";
import { notes } from "../data/notes";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "Koushik Swaminathan | Condensed Matter Theory", template: "%s | Koushik Swaminathan" },
  description: "Koushik Swaminathan, condensed matter theorist: constrained quantum dynamics, ergodicity breaking, and interaction-driven transport in flat-band and quantum many-body systems.",
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const pageItems = navigation.filter((item) => item.visible).flatMap((item) => {
    const page = pageContent[item.slug];
    const sections = page?.sections.flatMap((section) => section.items?.map((entry) => ({ title: entry.title, description: entry.description, href: item.href })) ?? []) ?? [];
    return page ? [{ title: page.title, description: page.intro, href: item.href }, ...sections] : [];
  });
  const notesVisible = navigation.some((item) => item.slug === "notes" && item.visible);
  const publicationItems = publications.flatMap((group) => group.entries.map((entry) => ({ title: entry.title, description: [entry.authors.join(", "), entry.venue, entry.year].filter(Boolean).join(" · "), href: "/publications" })));
  const searchItems = [...pageItems, ...publicationItems, ...(notesVisible ? notes : []).map((note) => ({ title: note.title, description: note.summary, href: `/notes/${note.slug}` }))];
  return (
    <html lang="en">
      <body id="top">
        <header className="site-header">
          <div className="shell header-inner">
            <Link className="wordmark" href="/">Koushik Swaminathan</Link>
            <nav aria-label="Main navigation">
              {navigation.filter((item) => item.visible).map((item) => (
                <Link key={item.href} href={item.href}>{item.label}</Link>
              ))}
              <Search items={searchItems} />
            </nav>
          </div>
        </header>
        {children}
        <footer>
          <div className="shell">
            <p>© {new Date().getFullYear()} Koushik Swaminathan</p>
            <div className="footer-links">
              <a href={links.scholar} target="_blank" rel="noreferrer">Google Scholar</a>
              <a href={links.orcid} target="_blank" rel="noreferrer">ORCID</a>
              <a href={links.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
              <a href="#top">Back to top ↑</a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
