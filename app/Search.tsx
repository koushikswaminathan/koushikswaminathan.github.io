"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

type SearchItem = { title: string; description: string; href: string };

export default function Search({ items }: { items: SearchItem[] }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen((value) => !value);
      }
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const results = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return items;
    return items.filter((item) => `${item.title} ${item.description}`.toLowerCase().includes(term));
  }, [items, query]);

  return (
    <>
      <button className="search-trigger" type="button" onClick={() => setOpen(true)} aria-label="Search site">
        Search <kbd>⌘K</kbd>
      </button>
      {open && (
        <div className="search-overlay" role="dialog" aria-modal="true" aria-label="Site search" onMouseDown={() => setOpen(false)}>
          <div className="search-panel" onMouseDown={(event) => event.stopPropagation()}>
            <div className="search-heading"><span>Search the site</span><button onClick={() => setOpen(false)} aria-label="Close search">×</button></div>
            <input autoFocus value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search research, publications, talks…" />
            <div className="search-results">
              {results.map((item) => <Link key={`${item.href}-${item.title}`} href={item.href} onClick={() => setOpen(false)}><strong>{item.title}</strong><span>{item.description}</span></Link>)}
              {!results.length && <p>No matching pages or entries.</p>}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
