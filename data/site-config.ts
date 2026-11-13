/**
 * SITE EDITING GUIDE
 * ------------------
 * Almost everything on the site lives in this file.
 *
 * - `navigation`: set `visible` to false to hide a page (and its route).
 * - `profile`: name, one-line role, home-page bio, portrait, and profile links.
 * - `newsItems`: home-page news. Newest first; grouped by year automatically.
 * - `publications`: every article / preprint / thesis. Entries with
 *   `selected: true` also appear on the home page. Your own name (`selfName`)
 *   is highlighted automatically in author lists.
 * - `pageContent`: the text of each sub-page.
 */
export const navigation = [
  { slug: "research", label: "Research", href: "/research", visible: true },
  { slug: "publications", label: "Publications", href: "/publications", visible: true },
  { slug: "talks", label: "Talks", href: "/talks", visible: true, optional: true },
  { slug: "teaching", label: "Teaching", href: "/teaching", visible: true, optional: true },
  { slug: "cv", label: "CV", href: "/cv", visible: true },
  { slug: "notes", label: "Notes", href: "/notes", visible: false, optional: true },
  { slug: "software", label: "Software", href: "/software", visible: false, optional: true },
  { slug: "about", label: "About", href: "/about", visible: false },
] as const;

export type PageLink = { label: string; href: string };

/** The name as it appears in author lists; it is highlighted wherever it occurs. */
export const selfName = "K. Swaminathan";

export const links = {
  cv: "/CV_Swaminathan.pdf",
  scholar: "https://scholar.google.com/citations?hl=en&user=PzejhKkAAAAJ",
  orcid: "https://orcid.org/0000-0003-4932-9977",
  arxiv: "https://arxiv.org/search/?searchtype=author&query=Swaminathan%2C+Koushik",
  linkedin: "https://www.linkedin.com/in/koushikswaminathan/",
  aalto: "https://www.aalto.fi/en/department-of-applied-physics",
  group: "https://www.aalto.fi/en/department-of-applied-physics/quantum-dynamics-qd",
  thesis: "https://urn.fi/URN:ISBN:978-952-64-3308-0",
};

export const profile = {
  name: "Koushik Swaminathan",
  field: "Condensed matter theory",
  /** Short line under the name. */
  statement:
    "I study constrained quantum dynamics, ergodicity breaking, and interaction-driven transport in quantum many-body systems.",
  /** Credential line. Update this when you start a new position. */
  affiliation: "D.Sc. (Tech.) in Engineering Physics, Aalto University, 2026",
  /**
   * Path to a portrait in /public (e.g. "/portrait.jpg"). While null, a monogram
   * tile is shown instead.
   */
  portrait: null as string | null,
};

/** Home-page "About" band. Inline links use the form [text](url). */
export const homeAbout = {
  eyebrow: "About",
  heading: "Collective dynamics under strong constraints.",
  paragraphs: [
    "I am a condensed matter theorist. My work examines how lattice geometry, interference, interactions, and disorder shape transport, relaxation, and long-time memory in quantum many-body systems. I combine analytical approaches with exact diagonalization, projected Hamiltonians, real-time dynamics, and spectral statistics.",
    "I completed my doctorate in the [Quantum Dynamics Group](https://www.aalto.fi/en/department-of-applied-physics/quantum-dynamics-qd) at Aalto University, advised by Dr. Sebastiano Peotta and supervised by Prof. Päivi Törmä, with a [thesis](https://urn.fi/URN:ISBN:978-952-64-3308-0) on quasiparticle localization and ergodicity breaking in flat-band lattice models. Before that, I earned an M.Sc. in Physics at LMU Munich and a B.Tech. in Electronics and Communication Engineering at NIT Tiruchirappalli.",
  ],
};

export type NewsItem = {
  /** e.g. "Aug 2026". The year (last 4 characters) is used for grouping. */
  date: string;
  text: string;
  links?: PageLink[];
};

export const newsItems: NewsItem[] = [
  {
    date: "Sep 2026",
    text: "Awarded the D.Sc. (Tech.) degree in Engineering Physics by Aalto University (28 September).",
  },
  {
    date: "Aug 2026",
    text: "Defended my doctoral thesis, “Quasiparticle localization and ergodicity breaking in flat-band lattice models.” Opponent: Prof. Sebastian Huber (ETH Zürich).",
    links: [
      { label: "thesis", href: links.thesis },
      {
        label: "announcement",
        href: "https://www.aalto.fi/en/events/public-defence-in-the-field-of-engineering-physics-msc-koushik-swaminathan",
      },
    ],
  },
  {
    date: "Jul 2026",
    text: "Our Letter on parity-dependent double degeneracy in the projected dice lattice is published in Physical Review B.",
    links: [{ label: "paper", href: "https://doi.org/10.1103/xxzp-ct39" }],
  },
  {
    date: "Jul 2026",
    text: "Talk on parity-dependent spectral statistics in a flat-band lattice model at Condensed Matter Physics in the City 2026, London.",
    links: [{ label: "conference", href: "https://research.kent.ac.uk/pqm/cmpcity2026/" }],
  },
  {
    date: "Feb 2026",
    text: "New preprint on the projected dice lattice with A. Moustaj, J. L. Lado, and S. Peotta.",
    links: [{ label: "arXiv", href: "https://arxiv.org/abs/2602.11844" }],
  },
  {
    date: "Sep 2025",
    text: "Poster at BEC 2025 in Sant Feliu de Guíxols, Spain, supported by a conference travel grant.",
    links: [{ label: "conference", href: "https://indico.phys.ethz.ch/event/143/" }],
  },
  {
    date: "Mar 2025",
    text: "Our paper on coexisting ergodic and nonergodic behavior in a flat-band superconductor is published in Physical Review Research.",
    links: [{ label: "paper", href: "https://doi.org/10.1103/PhysRevResearch.7.013318" }],
  },
];

export type Publication = {
  title: string;
  authors: string[];
  /** e.g. "Physical Review B 114, L051108" */
  venue?: string;
  year: string;
  /** Small highlighted tag, e.g. "Letter". */
  badge?: string;
  links?: PageLink[];
  /** Shown on the home page under "Selected publications". */
  selected?: boolean;
};

export const publications: { heading: string; entries: Publication[] }[] = [
  {
    heading: "Journal articles",
    entries: [
      {
        title:
          "Parity-dependent double degeneracy and spectral statistics in the projected dice lattice",
        authors: ["K. Swaminathan", "A. Moustaj", "J. L. Lado", "S. Peotta"],
        venue: "Physical Review B 114, L051108",
        year: "2026",
        badge: "Letter",
        selected: true,
        links: [
          { label: "paper", href: "https://doi.org/10.1103/xxzp-ct39" },
          { label: "arXiv", href: "https://arxiv.org/abs/2602.11844" },
          { label: "data", href: "https://doi.org/10.5281/zenodo.20117613" },
        ],
      },
      {
        title:
          "Coexistence of ergodic and nonergodic behavior and level spacing statistics in a one-dimensional model of a flat band superconductor",
        authors: ["M. Teeriaho", "V.-V. Linho", "K. Swaminathan", "S. Peotta"],
        venue: "Physical Review Research 7, 013318",
        year: "2025",
        selected: true,
        links: [
          { label: "paper", href: "https://doi.org/10.1103/PhysRevResearch.7.013318" },
          { label: "arXiv", href: "https://arxiv.org/abs/2411.09196" },
        ],
      },
      {
        title: "Signatures of many-body localization of quasiparticles in a flat band superconductor",
        authors: ["K. Swaminathan", "P. Tadros", "S. Peotta"],
        venue: "Physical Review Research 5, 043215",
        year: "2023",
        selected: true,
        links: [
          { label: "paper", href: "https://doi.org/10.1103/PhysRevResearch.5.043215" },
          { label: "arXiv", href: "https://arxiv.org/abs/2302.06250" },
        ],
      },
    ],
  },
  {
    heading: "In preparation",
    entries: [
      {
        title: "Magneto-oscillations in pentalayer graphene probed using Corbino geometry",
        authors: ["V. Mantena", "K. Swaminathan", "M. Kumar"],
        year: "In preparation",
      },
    ],
  },
  {
    heading: "Theses",
    entries: [
      {
        title: "Quasiparticle localization and ergodicity breaking in flat-band lattice models",
        authors: ["K. Swaminathan"],
        venue: "Doctoral thesis, Aalto University",
        year: "2026",
        links: [{ label: "thesis", href: links.thesis }],
      },
      {
        title: "Conductivity in a Honeycomb Sachdev–Ye–Kitaev Lattice",
        authors: ["K. Swaminathan"],
        venue: "Master’s thesis, LMU Munich",
        year: "2019",
        links: [{ label: "thesis", href: "https://doi.org/10.5281/zenodo.20020872" }],
      },
    ],
  },
];

export type DocumentLink = {
  label: string;
  href?: string;
  note?: string;
};
export type EducationEntry = {
  institution: string;
  location: string;
  dates: string;
  degree: string;
  thesis: string;
  context?: string;
  thesisLink?: string;
};
export type TeachingEntry = {
  course: string;
  location: string;
  date: string;
  context: string;
  links?: PageLink[];
};
export type Presentation = {
  conference: string;
  location: string;
  date: string;
  title: string;
  /** Small highlighted tag, e.g. a travel grant. */
  badge?: string;
  links?: PageLink[];
};
export type PageSection = {
  heading?: string;
  text?: string[];
  documents?: DocumentLink[];
  education?: EducationEntry[];
  teaching?: TeachingEntry[];
  presentations?: Presentation[];
  /** Renders the shared `publications` list. */
  publicationList?: boolean;
  items?: {
    title: string;
    meta?: string;
    description: string;
    links?: PageLink[];
  }[];
};

export const pageContent: Record<
  string,
  { eyebrow: string; title: string; intro: string; heroDocuments?: DocumentLink[]; sections: PageSection[] }
> = {
  // Hidden page (navigation `visible: false`); its content now lives on the home page.
  about: {
    eyebrow: "About",
    title: "The physicist behind the work.",
    intro:
      "I am a condensed matter theorist who completed my doctorate at Aalto University. I study how collective quantum dynamics emerges when ordinary motion is restricted by lattice geometry, interference, interactions, or disorder.",
    sections: [],
  },
  research: {
    eyebrow: "Research",
    title: "Dynamics, memory, and hidden structure.",
    intro:
      "My research asks how interacting quantum systems transport, relax, and retain memory when simple single-particle descriptions cease to be sufficient.",
    sections: [
      {
        heading: "Current research",
        items: [
          {
            title: "Flat-band many-body physics",
            meta: "2022–present · Aalto University",
            description:
              "In a flat band, destructive interference stops single particles from moving, so any transport must come from interactions. I study interacting flat-band lattice models with analytical approaches, exact diagonalization, real-time dynamics, and symmetry-resolved spectral statistics. Results include exact many-body eigenstates of projected Hubbard Hamiltonians, the coexistence of quasiparticle localization with pairing transport, and parity-dependent level statistics with exact double degeneracies in the projected dice lattice.",
            links: [
              { label: "PRB 2026", href: "https://doi.org/10.1103/xxzp-ct39" },
              { label: "PRR 2025", href: "https://doi.org/10.1103/PhysRevResearch.7.013318" },
              { label: "PRR 2023", href: "https://doi.org/10.1103/PhysRevResearch.5.043215" },
              { label: "thesis", href: links.thesis },
            ],
          },
          {
            title: "Multilayer graphene",
            meta: "2025–present · with the Low Temperature Laboratory, Aalto",
            description:
              "I use tight-binding and continuum (k·p) calculations to study pentalayer graphene, including Landau-level structure and Shubnikov–de Haas oscillations. The calculations are compared with Corbino-geometry transport measurements performed at the Low Temperature Laboratory, Aalto University, to identify signatures of Lifshitz transitions.",
          },
        ],
      },
      {
        heading: "Past research",
        items: [
          {
            title: "Transport in a honeycomb Sachdev–Ye–Kitaev lattice",
            meta: "2018–2019 · LMU Munich",
            description:
              "For my Master’s thesis, I developed a model of itinerant electrons coupled to Sachdev–Ye–Kitaev dots on a honeycomb lattice. I derived transport coefficients analytically and found a finite-temperature crossover from a Dirac-fermion regime to an incoherent strange-metal phase.",
            links: [{ label: "Master’s thesis", href: "https://doi.org/10.5281/zenodo.20020872" }],
          },
        ],
      },
      {
        heading: "Future interests",
        text: [
          "I want to continue studying nonequilibrium quantum many-body physics while moving toward quantum simulation and systems with closer experimental connections. I am also interested in broadening the numerical methods I use, particularly through tensor-network approaches.",
        ],
      },
    ],
  },
  publications: {
    eyebrow: "Publications",
    title: "Articles, preprints, and theses.",
    intro:
      "Peer-reviewed articles and theses in quantum many-body physics and quantum materials. See also Google Scholar and ORCID.",
    heroDocuments: [
      { label: "Google Scholar", href: links.scholar, note: "profile" },
      { label: "ORCID", href: links.orcid, note: "profile" },
      { label: "arXiv", href: links.arxiv, note: "search" },
    ],
    sections: [{ publicationList: true }],
  },
  cv: {
    eyebrow: "Curriculum vitae",
    title: "Academic background and experience.",
    intro: "Education, research experience, teaching, and funding. The full CV is available as a PDF.",
    heroDocuments: [
      {
        label: "Curriculum vitae",
        href: links.cv,
        note: "PDF",
      },
    ],
    sections: [
      {
        heading: "Education",
        education: [
          {
            institution: "Aalto University",
            location: "Finland",
            dates: "2021–2026",
            degree: "D.Sc. (Tech.) in Engineering Physics",
            thesis: "Quasiparticle localization and ergodicity breaking in flat-band lattice models",
            thesisLink: links.thesis,
            context:
              "Quantum Dynamics Group, Department of Applied Physics. Advisor: Dr. Sebastiano Peotta; supervisor: Prof. Päivi Törmä; opponent: Prof. Sebastian Huber (ETH Zürich). Public defense 21 August 2026; degree awarded 28 September 2026.",
          },
          {
            institution: "Ludwig-Maximilians-Universität München",
            location: "Germany",
            dates: "2016–2019",
            degree: "M.Sc. in Physics",
            thesis: "Conductivity in a Honeycomb Sachdev–Ye–Kitaev Lattice",
            thesisLink: "https://doi.org/10.5281/zenodo.20020872",
            context: "Chair for Theoretical Solid State Physics. Supervisor: Prof. Dr. Matthias Punk.",
          },
          {
            institution: "National Institute of Technology Tiruchirappalli",
            location: "India",
            dates: "2012–2016",
            degree: "B.Tech. in Electronics and Communication Engineering",
            thesis: "Study of quantum state tomography algorithms",
            context:
              "Supervisors: Dr. P. Palanisamy (Electronics and Communication Engineering) and Dr. Hemalatha Thiagarajan (Mathematics).",
          },
        ],
      },
      {
        heading: "Research experience",
        items: [
          {
            title: "Quasiparticle localization and ergodicity breaking in flat-band lattice models",
            meta: "2022–present · Aalto University",
            description:
              "Exact diagonalization, symmetry-resolved spectral statistics, projected Hubbard Hamiltonians, and exact many-body eigenstates.",
          },
          {
            title: "Magneto-oscillations in pentalayer graphene",
            meta: "2025–present · Aalto University",
            description:
              "Python-based tight-binding and continuum calculations, Landau fans, and Shubnikov–de Haas oscillations compared with Corbino-geometry experiments.",
          },
          {
            title: "Conductivity in a honeycomb lattice of Sachdev–Ye–Kitaev dots",
            meta: "2018–2019 · LMU Munich",
            description:
              "Analytical transport coefficients and the crossover from a Dirac-fermion regime to an incoherent strange metal.",
          },
        ],
      },
      {
        heading: "Teaching",
        teaching: [
          {
            course: "Aalto University",
            location: "Espoo, Finland",
            date: "2023–2025",
            context: "Teaching assistant · graduate and undergraduate physics courses.",
            links: [{ label: "course details", href: "/teaching" }],
          },
          {
            course: "Ludwig-Maximilians-Universität München",
            location: "Munich, Germany",
            date: "2017–2019",
            context: "Teaching assistant · undergraduate and graduate physics courses.",
            links: [{ label: "course details", href: "/teaching" }],
          },
        ],
      },
      {
        heading: "Funding",
        items: [
          {
            title: "Conference travel grants",
            description:
              "CMPCity 2026, London (£500) · BEC 2025, Sant Feliu de Guíxols (€1000) · CDNBQS 2023, Évora (€500).",
          },
        ],
      },
      {
        heading: "Skills",
        items: [
          {
            title: "Methods",
            description:
              "Exact diagonalization, spectral statistics and random-matrix theory, tight-binding and continuum band-structure calculations.",
          },
          { title: "Programming", description: "Python, C, C++, Mathematica." },
          {
            title: "Languages",
            description: "English (native), Tamil (native), Hindi (basic), German (basic).",
          },
        ],
      },
    ],
  },
  talks: {
    eyebrow: "Talks",
    title: "Talks and posters.",
    intro:
      "Contributed talks and posters on flat-band many-body physics, localization, and spectral statistics.",
    sections: [
      {
        heading: "Talks",
        presentations: [
          {
            conference: "Condensed Matter Physics in the City 2026",
            location: "London, United Kingdom",
            date: "July 2026",
            title: "Parity-dependent spectral statistics in a flat-band lattice model",
            badge: "Travel grant",
            links: [{ label: "conference", href: "https://research.kent.ac.uk/pqm/cmpcity2026/" }],
          },
          {
            conference: "Physics Days 2026, Finnish Physical Society",
            location: "Espoo, Finland",
            date: "March 2026",
            title: "Parity-dependent spectral statistics in a flat-band lattice model",
            links: [{ label: "event series", href: "https://www.fyysikkoseura.fi/language/en/events/physics-days" }],
          },
          {
            conference: "Physics Days 2025, Finnish Physical Society",
            location: "Oulu, Finland",
            date: "March 2025",
            title:
              "Coexistence of ergodic and nonergodic behavior in a one-dimensional model of a flat band superconductor",
            links: [{ label: "event", href: "https://www.oulu.fi/en/events/physics-days-2025" }],
          },
          {
            conference: "Physics Days 2024, Finnish Physical Society",
            location: "Helsinki, Finland",
            date: "2024",
            title:
              "Coexistence of ergodic and nonergodic behavior in a one-dimensional model of a flat band superconductor",
          },
          {
            conference: "Workshop on Criticality, Dynamics, and Nonequilibrium Behavior in Quantum Systems (CDNBQS 2023)",
            location: "Évora, Portugal",
            date: "October 2023",
            title: "Signatures of many-body localization of quasiparticles in a flat band superconductor",
            badge: "Travel grant",
            links: [{ label: "conference", href: "https://www.cdnbqs.uevora.pt/Web-2023/webpage" }],
          },
          {
            conference: "Physics Days 2023, Finnish Physical Society",
            location: "Tampere, Finland",
            date: "2023",
            title: "Signatures of many-body localization of quasiparticles in a flat band superconductor",
          },
        ],
      },
      {
        heading: "Posters",
        presentations: [
          {
            conference: "BEC 2025: Biennial Conference on Quantum Gases and Related Fields",
            location: "Sant Feliu de Guíxols, Spain",
            date: "September 2025",
            title:
              "Coexistence of ergodic and nonergodic behavior in a one-dimensional model of a flat band superconductor",
            badge: "Travel grant",
            links: [{ label: "conference", href: "https://indico.phys.ethz.ch/event/143/" }],
          },
          {
            conference: "Simulation of Far-from-Equilibrium Quantum Many-Body Dynamics (SimQuDyn 2025)",
            location: "Munich, Germany",
            date: "April 2025",
            title:
              "Coexistence of ergodic and nonergodic behavior in a one-dimensional model of a flat band superconductor",
            links: [
              {
                label: "conference",
                href: "https://www.theorie.physik.uni-muenchen.de/activities/workshops/archive_workshops_conferences/simqudyn2025/index.html",
              },
            ],
          },
          {
            conference: "FINESS 2024: Finite Temperature Non-Equilibrium Superfluid Systems",
            location: "Gold Coast, Australia",
            date: "September 2024",
            title: "Signatures of many-body localization of quasiparticles in a flat band superconductor",
            links: [{ label: "conference", href: "https://indico.global/event/12930/" }],
          },
          {
            conference: "QACTUS 2023: Quantum Coherent Dynamics — Turbulence, Non-Equilibrium and Interactions",
            location: "Barcelona, Spain",
            date: "September 2023",
            title: "Signatures of many-body localization of quasiparticles in a flat band superconductor",
            links: [{ label: "conference", href: "https://qactus-2023.upc.edu/" }],
          },
          {
            conference:
              "ICTP School on Quantum Many-Body Phenomena out of Equilibrium: From Chaos to Criticality",
            location: "Trieste, Italy",
            date: "August 2023",
            title: "Signatures of many-body localization of quasiparticles in a flat band superconductor",
            links: [{ label: "school", href: "https://indico.ictp.it/event/10201/overview" }],
          },
        ],
      },
    ],
  },
  teaching: {
    eyebrow: "Teaching",
    title: "Teaching and course support.",
    intro:
      "Undergraduate and graduate teaching at Aalto University and Ludwig-Maximilians-Universität München.",
    sections: [
      {
        heading: "Aalto University",
        teaching: [
          {
            course: "Low Temperature Physics – Nanoelectronics",
            location: "Aalto University, Espoo",
            date: "Periods I–III, 2023–24",
            context: "Teaching assistant · graduate course.",
          },
          {
            course: "Classical Mechanics",
            location: "Aalto University, Espoo",
            date: "Periods I–II, 2024–25",
            context: "Teaching assistant · undergraduate course.",
          },
        ],
      },
      {
        heading: "LMU Munich",
        teaching: [
          {
            course: "Advanced Statistical Physics",
            location: "LMU Munich",
            date: "2017–2019",
            context:
              "Teaching assistant · graduate course, with additional course-material support (2018–2019).",
          },
          {
            course: "Mathematical Methods for Physicists",
            location: "LMU Munich",
            date: "2018–2019",
            context:
              "Proofreading assistance for the course material by A. Altland and J. von Delft.",
          },
          {
            course: "Thermodynamics and Statistical Physics",
            location: "LMU Munich",
            date: "2017–2019",
            context: "Teaching assistant · undergraduate course.",
          },
          {
            course: "Quantum Mechanics",
            location: "LMU Munich",
            date: "2017–2019",
            context: "Teaching assistant · undergraduate course.",
          },
          {
            course: "Theoretical Mechanics",
            location: "LMU Munich",
            date: "2017–2019",
            context: "Teaching assistant · undergraduate course.",
          },
          {
            course: "Classical Mechanics",
            location: "LMU Munich",
            date: "2017–2019",
            context: "Teaching assistant · undergraduate course.",
          },
          {
            course: "Mathematical Methods for Physics",
            location: "LMU Munich",
            date: "2017–2019",
            context: "Teaching assistant · undergraduate course.",
          },
        ],
      },
    ],
  },
  notes: {
    eyebrow: "Notes",
    title: "Research notes and longer-form writing.",
    intro:
      "Accessible paper summaries, technical notes, conference reflections, and occasional writing on quantum many-body physics.",
    sections: [],
  },
  software: {
    eyebrow: "Software",
    title: "Code and research tools.",
    intro: "Public code, datasets, and computational tools.",
    sections: [],
  },
};
