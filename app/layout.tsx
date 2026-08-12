import type { Metadata } from "next";
import Link from "next/link";
import { navigation } from "../data/site-config";
import { pageContent } from "../data/site-config";
import Search from "./Search";
import { notes } from "../data/notes";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "Koushik Swaminathan | Condensed Matter Theory", template: "%s | Koushik Swaminathan" },
  description: "Research in constrained quantum dynamics, ergodicity breaking, and interaction-driven transport.",
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const pageItems = navigation.filter((item) => item.visible).flatMap((item) => {
    const page = pageContent[item.slug];
    const sections = page?.sections.flatMap((section) => section.items?.map((entry) => ({ title: entry.title, description: entry.description, href: item.href })) ?? []) ?? [];
    return page ? [{ title: page.title, description: page.intro, href: item.href }, ...sections] : [];
  });
  const searchItems = [...pageItems, ...notes.map((note) => ({ title: note.title, description: note.summary, href: `/notes/${note.slug}` }))];
  return (
    <html lang="en">
      <body>
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
            <p>© 2026 Koushik Swaminathan</p>
            <div><Link href="/about">About</Link><a href="#top">Back to top ↑</a></div>
          </div>
        </footer>
      </body>
    </html>
  );
}
