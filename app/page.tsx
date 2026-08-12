import Link from "next/link";
import { newsItems } from "../data/site-config";

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

export default function Home() {
  return (
    <main>
      <section className="hero">
        <LatticeField />
        <div className="hero-grid shell">
          <div className="hero-copy">
            <p className="eyebrow">Condensed matter theory</p>
            <h1>Koushik<br />Swaminathan</h1>
            <p className="hero-statement">
              I study constrained quantum dynamics, ergodicity breaking, and
              interaction-driven transport in quantum many-body systems.
            </p>
            <p className="affiliation">Doctoral researcher at Aalto University, Finland.</p>
            <div className="hero-actions">
              <Link className="button button-primary" href="/research">Explore research <span>→</span></Link>
              <Link className="button button-secondary" href="/about">About me <span>→</span></Link>
            </div>
          </div>
          <div className="portrait-column">
            <div className="portrait-frame">
              <div className="portrait-placeholder"><span>KS</span><small>Portrait to be added</small></div>
            </div>
            <p>Condensed matter theory · Quantum many-body physics</p>
          </div>
        </div>
      </section>

      <section className="home-intro">
        <div className="shell intro-grid">
          <p className="eyebrow">Research focus</p>
          <div>
            <h2>Collective dynamics under strong constraints.</h2>
            <p>
              My work examines how geometry, interference, interactions, and
              disorder shape transport, relaxation, and long-time memory. I
              combine analytical approaches with exact diagonalization,
              projected Hamiltonians, real-time dynamics, and spectral statistics.
            </p>
            <Link className="text-link" href="/research">Read about my research <span>→</span></Link>
          </div>
        </div>
      </section>

      <section className="news-section">
        <div className="shell">
          <div className="section-topline">
            <div>
              <p className="eyebrow">Recent news</p>
              <h2>Updates and activity.</h2>
            </div>
            <p className="editing-note">Selected recent research and career updates.</p>
          </div>
          <div className="news-list">
            {newsItems.map((item) => (
              <article className="news-item" key={`${item.date}-${item.title}`}>
                <time>{item.date}</time>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
                <span aria-hidden="true">↗</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="home-contact">
        <div className="shell contact-grid">
          <div><p className="eyebrow">Contact</p><h2>Research conversations and collaborations.</h2></div>
          <div>
            <p>I am currently completing my Doctorate in condensed matter theory at Aalto University.</p>
            <span
              className="email-obfuscated"
              aria-label="koushik dot swaminathan at aalto dot fi"
            >
              koushik [dot] swaminathan [at] aalto [dot] fi
            </span>
          </div>
        </div>
        <div className="shell profile-strip" aria-label="Research profiles">
          <span>Research profiles</span>
          <div>
            <a href="https://scholar.google.com/citations?hl=en&user=PzejhKkAAAAJ" target="_blank" rel="noreferrer">Google Scholar ↗</a>
            <a href="https://orcid.org/0000-0003-4932-9977" target="_blank" rel="noreferrer">ORCID ↗</a>
            <a href="https://www.linkedin.com/in/koushikswaminathan/" target="_blank" rel="noreferrer">LinkedIn ↗</a>
          </div>
        </div>
      </section>
    </main>
  );
}
