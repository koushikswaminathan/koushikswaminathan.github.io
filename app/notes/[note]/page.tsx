import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getNote, notes } from "../../../data/notes";
import { navigation } from "../../../data/site-config";

const notesVisible = navigation.some((item) => item.slug === "notes" && item.visible);

export const dynamicParams = false;

// Static export needs at least one param. While Notes is hidden we emit a single
// placeholder path, which the page below turns into a 404.
export function generateStaticParams() {
  return notesVisible ? notes.map((note) => ({ note: note.slug })) : [{ note: "hidden" }];
}

export async function generateMetadata({ params }: { params: Promise<{ note: string }> }): Promise<Metadata> {
  const note = getNote((await params).note);
  return note ? { title: note.title, description: note.summary } : {};
}

function SharedHeader({ note }: { note: NonNullable<ReturnType<typeof getNote>> }) {
  return <>
    <p className="note-category">{note.category}</p>
    <h1>{note.title}</h1>
    <p className="note-summary">{note.summary}</p>
    <div className="note-byline"><time>{note.date}</time><span>{note.readingTime}</span>{note.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
  </>;
}

export default async function NotePage({ params }: { params: Promise<{ note: string }> }) {
  const note = getNote((await params).note);
  if (!notesVisible || !note) notFound();
  const related = notes.filter((entry) => entry.slug !== note.slug).slice(0, 2);

  return (
    <main className="note-page">
      <header className="note-hero"><div className="shell note-hero-inner"><Link className="note-back" href="/notes">← All notes</Link><SharedHeader note={note} /></div></header>
      <div className="shell note-layout">
        <aside className="note-toc"><span>On this page</span><a href="#idea">The central idea</a><a href="#example">A worked example</a><a href="#resources">References</a></aside>
        <article className="note-prose">
          <p className="note-demo">Temporary demonstration post — replace or remove before launch.</p>
          <h2 id="idea">The central idea</h2>
          <p>Many-body calculations often begin with a Hamiltonian written as a sum of local contributions. The details vary, but the basic structure is familiar:</p>
          <div className="equation" role="math" aria-label="H equals the sum over i of h sub i">H = ∑<sub>i</sub> h<sub>i</sub>.</div>
          <p>A useful note can combine the physical motivation, the mathematical definition, and enough implementation detail for a reader to reproduce a small calculation.</p>
          <blockquote>Good technical writing makes the assumptions visible before the machinery becomes complicated.</blockquote>
          <h2 id="example">A worked example</h2>
          <p>The sample below illustrates syntax-highlight-ready code blocks. A future GitHub version can render Markdown files into this same design.</p>
          <pre><code><span className="code-keyword">import</span> numpy <span className="code-keyword">as</span> np{"\n\n"}<span className="code-comment"># Hermitian toy Hamiltonian</span>{"\n"}H = np.array([[0, 1], [1, 0]], dtype=float){"\n"}energies = np.linalg.eigvalsh(H){"\n"}<span className="code-keyword">print</span>(energies)</code></pre>
          <figure><img src="/sample-note-figure.svg" alt="A schematic two-level spectrum with an energy gap" /><figcaption>Figure 1. A lightweight sample figure with a caption and accessible alternative text.</figcaption></figure>
          <h3>A small comparison table</h3>
          <div className="note-table-wrap"><table><thead><tr><th>Format</th><th>Best use</th></tr></thead><tbody><tr><td>Equation</td><td>Definitions and derivations</td></tr><tr><td>Code</td><td>Reproducible numerical steps</td></tr><tr><td>Figure</td><td>Structures, trends, and results</td></tr></tbody></table></div>
          <h2 id="resources">References</h2>
          <p>Citations can appear inline as numbered links <a href="https://doi.org/10.1103/PhysRevResearch.5.043215" target="_blank" rel="noreferrer">[1]</a>, with a short reference list below.</p>
          <ol className="references"><li>K. Swaminathan, P. Tadros, and S. Peotta, <em>Physical Review Research</em> 5, 043215 (2023). <a href="https://doi.org/10.1103/PhysRevResearch.5.043215" target="_blank" rel="noreferrer">DOI ↗</a></li></ol>
        </article>
      </div>
      <section className="related-notes"><div className="shell"><p className="eyebrow">Related notes</p><div>{related.map((entry) => <Link href={`/notes/${entry.slug}`} key={entry.slug}><span>{entry.category}</span><strong>{entry.title}</strong><small>Read note →</small></Link>)}</div></div></section>
    </main>
  );
}
