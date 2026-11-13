import Link from "next/link";
import { homeAbout, links, newsItems, pageContent, profile, type NewsItem } from "../data/site-config";
import EmailLink from "./EmailLink";
import { LinkPills, PublicationList, RichText } from "./components";

function LatticeField() {
  const hubs: { x: number; y: number; key: string }[] = [];
  const hubMap = new Map<string, { x: number; y: number }>();
  const spacingX = 180;
  const spacingY = 156;

  for (let row = -1; row < 7; row += 1) {
    const offset = row % 2 === 0 ? 0 : spacingX / 2;
    for (let column = -2; column < 10; column += 1) {
      const hub = {
        x: column * spacingX + offset,
        y: row * spacingY + 42,
        key: `${row}:${column}`,
      };
      hubs.push(hub);
      hubMap.set(hub.key, hub);
    }
  }

  const triangles: { points: { x: number; y: number }[]; key: string }[] = [];
  for (let row = -1; row < 6; row += 1) {
    for (let column = -2; column < 9; column += 1) {
      const a = hubMap.get(`${row}:${column}`)!;
      const b = hubMap.get(`${row}:${column + 1}`)!;
      const c = hubMap.get(`${row + 1}:${column}`)!;
      const d = hubMap.get(`${row + 1}:${column + 1}`)!;
      const cells =
        row % 2 === 0
          ? [[a, b, c], [b, c, d]]
          : [[a, b, d], [a, c, d]];
      cells.forEach((points, index) =>
        triangles.push({ points, key: `${row}:${column}:${index}` }),
      );
    }
  }

  return (
    <svg className="lattice dice-lattice" viewBox="0 0 1440 900" aria-hidden="true">
      <g className="dice-bonds">
        {triangles.flatMap((triangle) => {
          const rim = {
            x: triangle.points.reduce((sum, point) => sum + point.x, 0) / 3,
            y: triangle.points.reduce((sum, point) => sum + point.y, 0) / 3,
          };
          return triangle.points.map((hub, index) => (
            <line
              key={`${triangle.key}:${index}`}
              x1={rim.x}
              y1={rim.y}
              x2={hub.x}
              y2={hub.y}
            />
          ));
        })}
      </g>
      <g className="rim-sites">
        {triangles.map((triangle) => (
          <circle
            key={triangle.key}
            cx={triangle.points.reduce((sum, point) => sum + point.x, 0) / 3}
            cy={triangle.points.reduce((sum, point) => sum + point.y, 0) / 3}
            r="3.5"
          />
        ))}
      </g>
      <g className="hub-sites">
        {hubs.map((hub) => (
          <circle key={hub.key} cx={hub.x} cy={hub.y} r="6" />
        ))}
      </g>
    </svg>
  );
}

function groupByYear(items: NewsItem[]) {
  const groups: { year: string; items: NewsItem[] }[] = [];
  for (const item of items) {
    const year = item.date.slice(-4);
    const group = groups.find((entry) => entry.year === year);
    if (group) group.items.push(item);
    else groups.push({ year, items: [item] });
  }
  return groups;
}

export default function Home() {
  const researchThemes = pageContent.research.sections.flatMap((section) =>
    (section.items ?? []).map((item) => ({ ...item, group: section.heading })),
  );

  return (
    <main>
      <section className="hero">
        <LatticeField />
        <div className="hero-grid shell">
          <div className="hero-copy">
            <p className="eyebrow">{profile.field}</p>
            <h1>{profile.name}</h1>
            <p className="hero-statement">{profile.statement}</p>
            <p className="affiliation">{profile.affiliation}</p>
            <nav className="profile-pills" aria-label="Profiles and documents">
              <a className="pill-primary" href={links.cv}>CV <small>PDF</small></a>
              <a href={links.scholar} target="_blank" rel="noreferrer">Google Scholar</a>
              <a href={links.orcid} target="_blank" rel="noreferrer">ORCID</a>
              <a href={links.arxiv} target="_blank" rel="noreferrer">arXiv</a>
              <a href={links.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
              <EmailLink label="Email" />
            </nav>
          </div>
          <div className="portrait-column">
            <div className="portrait-frame">
              {profile.portrait ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={profile.portrait} alt={`Portrait of ${profile.name}`} />
              ) : (
                <div className="portrait-placeholder" aria-hidden="true"><span>KS</span></div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="home-intro" id="about">
        <div className="shell intro-grid">
          <p className="eyebrow">{homeAbout.eyebrow}</p>
          <div>
            <h2>{homeAbout.heading}</h2>
            {homeAbout.paragraphs.map((paragraph) => (
              <p key={paragraph}><RichText text={paragraph} /></p>
            ))}
          </div>
        </div>
      </section>

      <section className="home-section">
        <div className="shell">
          <div className="section-topline">
            <div>
              <p className="eyebrow">Research</p>
              <h2>Research themes.</h2>
            </div>
            <Link className="see-all" href="/research">All research <span>→</span></Link>
          </div>
          <div className="theme-grid">
            {researchThemes.map((theme) => (
              <Link className="theme-card" href="/research" key={theme.title}>
                <span className="theme-group">{theme.group}</span>
                <h3>{theme.title}</h3>
                {theme.meta && <span className="theme-meta">{theme.meta}</span>}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="home-section news-section" id="news">
        <div className="shell">
          <div className="section-topline">
            <div>
              <p className="eyebrow">News</p>
              <h2>Recent updates.</h2>
            </div>
          </div>
          <div className="news-years">
            {groupByYear(newsItems).map((group) => (
              <div className="news-year" key={group.year}>
                <h3>{group.year}</h3>
                <ul>
                  {group.items.map((item) => (
                    <li key={`${item.date}-${item.text}`}>
                      <time>{item.date.slice(0, -5) || item.date}</time>
                      <p>
                        <RichText text={item.text} />
                        {item.links && <> <LinkPills links={item.links} /></>}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="home-section">
        <div className="shell">
          <div className="section-topline">
            <div>
              <p className="eyebrow">Publications</p>
              <h2>Selected publications.</h2>
            </div>
            <Link className="see-all" href="/publications">All publications <span>→</span></Link>
          </div>
          <PublicationList selectedOnly />
        </div>
      </section>

      <section className="home-contact" id="contact">
        <div className="shell contact-grid">
          <div><p className="eyebrow">Contact</p><h2>Research conversations and collaborations.</h2></div>
          <div>
            <p>For research discussions, collaborations, or seminar invitations, email is the best way to reach me.</p>
            <EmailLink className="email-obfuscated" />
          </div>
        </div>
      </section>
    </main>
  );
}
