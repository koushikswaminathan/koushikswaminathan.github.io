import { Fragment } from "react";
import { publications, selfName, type PageLink, type Publication } from "../data/site-config";

const isExternal = (href: string) => /^https?:/.test(href);

/** Renders text with inline [label](url) links. */
export function RichText({ text }: { text: string }) {
  const parts = text.split(/(\[[^\]]+\]\([^)]+\))/g);
  return (
    <>
      {parts.map((part, index) => {
        const match = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
        if (!match) return <Fragment key={index}>{part}</Fragment>;
        const [, label, href] = match;
        return (
          <a key={index} className="inline-link" href={href} {...(isExternal(href) ? { target: "_blank", rel: "noreferrer" } : {})}>
            {label}
          </a>
        );
      })}
    </>
  );
}

export function LinkPills({ links }: { links: PageLink[] }) {
  return (
    <span className="link-pills">
      {links.map((link) => (
        <a key={link.href} href={link.href} {...(isExternal(link.href) ? { target: "_blank", rel: "noreferrer" } : {})}>
          {link.label}
        </a>
      ))}
    </span>
  );
}

function Authors({ authors }: { authors: string[] }) {
  return (
    <>
      {authors.map((author, index) => (
        <Fragment key={author}>
          {index > 0 && (index === authors.length - 1 ? (authors.length > 2 ? ", and " : " and ") : ", ")}
          {author === selfName ? <strong className="self-author">{author}</strong> : author}
        </Fragment>
      ))}
    </>
  );
}

export function PublicationEntry({ entry }: { entry: Publication }) {
  return (
    <article className="publication">
      <div className="publication-year">{entry.year}</div>
      <div>
        <h3>{entry.title}</h3>
        <p className="publication-authors"><Authors authors={entry.authors} /></p>
        {(entry.venue || entry.badge) && (
          <p className="publication-venue">
            {entry.venue && <em>{entry.venue}</em>}
            {entry.badge && <span className="badge">{entry.badge}</span>}
          </p>
        )}
        {entry.links && <LinkPills links={entry.links} />}
      </div>
    </article>
  );
}

export function PublicationList({ selectedOnly = false }: { selectedOnly?: boolean }) {
  if (selectedOnly) {
    const entries = publications.flatMap((group) => group.entries).filter((entry) => entry.selected);
    return <div className="publication-list">{entries.map((entry) => <PublicationEntry key={entry.title} entry={entry} />)}</div>;
  }
  return (
    <div className="publication-groups">
      {publications.map((group) => (
        <section key={group.heading}>
          <h2>{group.heading}</h2>
          <div className="publication-list">
            {group.entries.map((entry) => <PublicationEntry key={entry.title} entry={entry} />)}
          </div>
        </section>
      ))}
    </div>
  );
}
