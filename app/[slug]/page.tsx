import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { navigation, pageContent } from "../../data/site-config";
import NotesIndex from "../NotesIndex";

export function generateStaticParams() {
  return navigation.filter((item) => item.visible).map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const page = pageContent[slug];
  return page ? { title: page.eyebrow, description: page.intro } : {};
}

export default async function ContentPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const navItem = navigation.find((item) => item.slug === slug);
  const page = pageContent[slug];
  if (!navItem || !navItem.visible || !page) notFound();

  return (
    <main className="subpage">
      <section className="page-hero">
        <div className="shell page-hero-grid">
          <p className="eyebrow">{page.eyebrow}</p>
          <div>
            <h1>{page.title}</h1>
            <p>{page.intro}</p>
            {page.heroDocuments && (
              <div className="hero-documents">
                {page.heroDocuments.map((document) =>
                  document.href ? (
                    <a key={document.label} href={document.href}>
                      {document.label} <small>{document.note} ↗</small>
                    </a>
                  ) : (
                    <span key={document.label}>
                      {document.label} <small>{document.note}</small>
                    </span>
                  ),
                )}
              </div>
            )}
          </div>
        </div>
      </section>
      <section className="page-content">
        <div className="shell content-stack">
          {slug === "notes" && <NotesIndex />}
          {page.sections.map((section, index) => (
            <section className="content-section" key={`${section.heading ?? "items"}-${index}`}>
              {section.heading && <h2>{section.heading}</h2>}
              {section.text && <div className="prose">{section.text.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>}
              {section.documents && (
                <div className="document-list">
                  {section.documents.map((document) =>
                    document.href ? (
                      <a key={document.label} href={document.href}>
                        <span>{document.label}</span>
                        <small>{document.note} ↗</small>
                      </a>
                    ) : (
                      <div className="document-disabled" key={document.label}>
                        <span>{document.label}</span>
                        <small>{document.note}</small>
                      </div>
                    ),
                  )}
                </div>
              )}
              {section.education && (
                <div className="education-list">
                  {section.education.map((entry) => (
                    <article key={`${entry.institution}-${entry.degree}`}>
                      <div className="education-heading">
                        <h3>{entry.institution}</h3>
                        <p>{entry.location} · {entry.dates}</p>
                      </div>
                      <p className="education-degree">{entry.degree}</p>
                      <div className="education-thesis">
                        <span>{entry.thesis}</span>
                        {entry.thesisLink ? (
                          <a href={entry.thesisLink} target="_blank" rel="noreferrer">(thesis ↗)</a>
                        ) : entry.publicThesis !== false ? (
                          <small>(thesis link to be added)</small>
                        ) : null}
                      </div>
                      {entry.context && <p className="education-context">{entry.context}</p>}
                    </article>
                  ))}
                </div>
              )}
              {section.teaching && (
                <div className="teaching-list">
                  {section.teaching.map((entry, entryIndex) => (
                    <article key={`${entry.course}-${entry.location}-${entryIndex}`}>
                      <div className="teaching-meta">
                        <h3>{entry.course}</h3>
                        <span>{entry.location}</span>
                        <time>{entry.date}</time>
                      </div>
                      <div className="teaching-context">
                        <p>{entry.context}</p>
                        {entry.links?.map((link) => {
                          const external = link.href.startsWith("http");
                          return (
                            <a
                              key={link.href}
                              href={link.href}
                              target={external ? "_blank" : undefined}
                              rel={external ? "noreferrer" : undefined}
                            >
                              ({link.label} {external ? "↗" : "→"})
                            </a>
                          );
                        })}
                      </div>
                    </article>
                  ))}
                </div>
              )}
              {section.placeholder && <div className="section-placeholder">{section.placeholder}</div>}
              {section.presentations && (
                <div className="presentation-list">
                  {section.presentations.map((presentation) => (
                    <article
                      key={`${presentation.conference}-${presentation.date}`}
                    >
                      <div className="presentation-meta">
                        <span className="presentation-conference">
                          {presentation.conference}
                        </span>
                        <span>{presentation.location}</span>
                        <time>{presentation.date}</time>
                      </div>
                      <div className="presentation-title">
                        <h3>{presentation.title}</h3>
                        {presentation.links && (
                          <span className="presentation-links">
                            {presentation.links.map((link) => (
                              <a
                                key={link.href}
                                href={link.href}
                                target="_blank"
                                rel="noreferrer"
                              >
                                ({link.label} ↗)
                              </a>
                            ))}
                          </span>
                        )}
                      </div>
                    </article>
                  ))}
                </div>
              )}
              {section.items && <div className="item-list">{section.items.map((item) => (
                <article key={item.title}>
                  <div>
                    {item.meta && <p className="item-meta">{item.meta}</p>}
                    <h3>{item.title}</h3><p>{item.description}</p>
                    {item.identifiers && (
                      <div className="item-identifiers">
                        {item.identifiers.map((identifier) => (
                          <a key={identifier.value} href={identifier.href} target="_blank" rel="noreferrer">
                            <span>{identifier.label}</span> {identifier.value}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                  {item.links && (
                    <div className="item-links">
                      {item.links.map((link) => (
                        <a
                          key={link.href}
                          href={link.href}
                          target={link.href.startsWith("http") ? "_blank" : undefined}
                          rel={link.href.startsWith("http") ? "noreferrer" : undefined}
                        >
                          {link.label} ↗
                        </a>
                      ))}
                    </div>
                  )}
                </article>
              ))}</div>}
            </section>
          ))}
        </div>
      </section>
    </main>
  );
}
