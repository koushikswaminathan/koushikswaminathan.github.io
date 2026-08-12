import Link from "next/link";
import { notes } from "../data/notes";

export default function NotesIndex() {
  const tags = [...new Set(notes.flatMap((note) => note.tags))];

  return (
    <div className="notes-index">
      <div className="notes-controls" aria-label="Notes topics">
        <span>Browse by topic</span>
        <div>{tags.map((tag) => <span className="note-tag" key={tag}>{tag}</span>)}</div>
      </div>
      <div className="notes-list">
        {notes.map((note) => (
          <article key={note.slug}>
            <div className="note-date"><time>{note.date}</time><span>{note.readingTime}</span></div>
            <div>
              <p className="note-category">{note.category}</p>
              <h2><Link href={`/notes/${note.slug}`}>{note.title}</Link></h2>
              <p>{note.summary}</p>
              <div className="note-tags">{note.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
            </div>
          </article>
        ))}
      </div>
      <aside className="notes-archive"><span>Archive</span><a href="#notes-2026">2026 <small>{notes.length} notes</small></a></aside>
    </div>
  );
}
