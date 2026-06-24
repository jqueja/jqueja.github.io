import React, { useEffect, useState } from "react";

/*
  App.jsx
  - Single-file app for the personal site. Kept small and declarative.
  - Data arrays below power repeated UI (skills, projects, timeline, contacts)
*/

const SKILL_GROUPS = [
  {
    title: "languages",
    items: ["Python", "Go", "C", "SQL", "JavaScript", "R"],
  },
  {
    title: "frameworks",
    items: ["LangGraph", "FastAPI", "React", "Jenkins"],
  },
  {
    title: "tools & infra",
    items: ["Git", "Docker", "Kubernetes", "GCP", "Elasticsearch", "LaTeX"],
  },
  {
    title: "interests",
    items: ["AI agents", "compilers", "data pipelines", "systems programming"],
  },
];

const PROJECTS = [
  {
    name: "League of Legends Analytics",
    lang: "Python",
    desc: "Analyzed ranked match data from NA and Korea to compare player skill distributions. Scraped and normalized large-scale match data stored as Parquet, queried with DuckDB. Shared findings to the Riot Games Developer Discord.",
    href: "/lol-analysis-report.pdf",
  },
  {
    name: "MiniC Compiler",
    lang: "SML/NJ",
    desc: "Compiler translating a C-like language into LLVM IR for native-code generation. Built a C-like → JSON parser and AST serializer; implemented SSA conversion, dead-code elimination, and constant propagation.",
    href: "https://github.com/jqueja",
  },
];

const TIMELINE = [
  {
    date: "Jul 2025 — Present",
    role: "Software Engineer II",
    place: "Walmart Global Tech — Sunnyvale, CA",
    desc: "Spearheaded adoption of LangGraph for agent orchestration; designed and maintain an internal AI super-agent for Network Operations that automates diagnostics, prioritizes incidents, and assists triage. Authored SQL queries and scalable data pipelines for network anomaly detection. Built an agent-as-judge evaluation framework to measure and improve agent decision accuracy.",
  },
  {
    date: "Sep 2024 — Jun 2025",
    role: "Instructional Student Assistant",
    place: "Cal Poly CS & SE Dept — San Luis Obispo, CA",
    desc: "Led weekly labs and held office hours for CSC 101, CSC 202, and CSC 321. Prepared lab materials, solution guides, and grading rubrics; collaborated with faculty to create targeted tutorials addressing common student misconceptions.",
  },
  {
    date: "Jun 2024 — Aug 2024",
    role: "Software Engineer Intern",
    place: "Walmart Global Tech — Sunnyvale, CA",
    desc: "Implemented a RAG pipeline to ingest and index ServiceNow networking tickets. Built KNN retrieval over embeddings of resolved tickets to surface similar incidents. Used LLMs to extract and normalize remediation steps from historical tickets for AI agent recommendations.",
  },
];

const CONTACTS = [
  {
    type: "email",
    label: "quejajosh01@gmail.com",
    href: "mailto:quejajosh01@gmail.com",
    icon: "✉",
  },
  {
    type: "github",
    label: "github.com/jqueja",
    href: "https://github.com/jqueja",
    icon: "⌥",
  },
  {
    type: "linkedin",
    label: "Josh Queja",
    href: "https://linkedin.com/in/josh-eda-queja",
    icon: "◈",
  },
  {
    type: "resume",
    label: "download PDF",
    href: "resume.pdf",
    icon: "↓",
    download: true,
  },
];

function Nav({ onToggleTheme, isLight, onToggleMobile }) {
  return (
    <nav id="navbar">
      <div className="nav-logo">
        :/ <span className="dim">$ </span>josh<span className="dim">.dev</span>
      </div>
      <ul className="nav-links">
        <li>
          <a href="#about">about</a>
        </li>
        <li>
          <a href="#skills">skills</a>
        </li>
        <li>
          <a href="#projects">projects</a>
        </li>
        <li>
          <a href="#experience">experience</a>
        </li>
        <li>
          <a href="#contact">contact</a>
        </li>
        <li>
          <button
            className="theme-toggle"
            id="themeBtn"
            onClick={onToggleTheme}
            aria-label="Toggle theme"
          >
            {isLight ? "◑ dark" : "◐ light"}
          </button>
        </li>
      </ul>
      <button
        className="hamburger"
        id="hamburger"
        aria-label="Open menu"
        onClick={onToggleMobile}
      >
        ☰
      </button>
    </nav>
  );
}

function MobileNav({ open, onClose }) {
  return (
    <div className={`mobile-nav${open ? " open" : ""}`} id="mobileNav">
      <a href="#about" onClick={onClose}>
        about
      </a>
      <a href="#skills" onClick={onClose}>
        skills
      </a>
      <a href="#projects" onClick={onClose}>
        projects
      </a>
      <a href="#experience" onClick={onClose}>
        experience
      </a>
      <a href="#contact" onClick={onClose}>
        contact
      </a>
    </div>
  );
}

function SkillCard({ group }) {
  return (
    <div className="skill-card">
      <div className="skill-cat">{group.title}</div>
      <div className="skill-items">
        {group.items.map((i) => (
          <span key={i} className="tag">
            {i}
          </span>
        ))}
      </div>
    </div>
  );
}

function ProjectCard({ p }) {
  return (
    <a
      className="project-card"
      href={p.href}
      target="_blank"
      rel="noopener noreferrer"
    >
      <div className="proj-top">
        <span className="proj-icon">◈</span>
        <span className="proj-name">{p.name}</span>
        <span className="proj-lang">{p.lang}</span>
      </div>
      <p className="proj-desc">{p.desc}</p>
    </a>
  );
}

function TimelineItem({ item }) {
  return (
    <div className="tl-item">
      <div className="tl-dot"></div>
      <div className="tl-date">{item.date}</div>
      <div className="tl-role">{item.role}</div>
      <div className="tl-place">{item.place}</div>
      <p className="tl-desc">{item.desc}</p>
    </div>
  );
}

function ContactCard({ c }) {
  return (
    <a
      className="contact-link"
      href={c.href}
      target={c.download ? undefined : "_blank"}
      rel={c.download ? undefined : "noopener noreferrer"}
      download={c.download}
    >
      <span className="contact-icon">{c.icon}</span>
      <div className="contact-info">
        <span className="contact-type">{c.type}</span>
        <span className="contact-val">{c.label}</span>
      </div>
    </a>
  );
}

export default function App() {
  const [isLight, setIsLight] = useState(() => {
    try {
      return localStorage.getItem("et-theme") === "light";
    } catch {
      return false;
    }
  });
  const [mobileOpen, setMobileOpen] = useState(false);

  // Sync theme to root element and persist to localStorage
  useEffect(() => {
    const root = document.getElementById("site");
    if (root) root.classList.toggle("light", isLight);
    try {
      localStorage.setItem("et-theme", isLight ? "light" : "dark");
    } catch {}
  }, [isLight]);

  // UI effects: mobile click-away, active nav on scroll, header shadow, fade-in observer
  useEffect(() => {
    const onClickOutside = (e) => {
      const ham = document.getElementById("hamburger");
      const mobile = document.getElementById("mobileNav");
      if (mobileOpen && !ham?.contains(e.target) && !mobile?.contains(e.target))
        setMobileOpen(false);
    };
    document.addEventListener("click", onClickOutside);

    const sections = document.querySelectorAll("section[id], header[id]");
    const navLinks = document.querySelectorAll(".nav-links a, .mobile-nav a");
    const setActiveLink = () => {
      let current = "";
      sections.forEach((section) => {
        const top = section.offsetTop - 80;
        if (window.scrollY >= top) current = section.id;
      });
      navLinks.forEach((link) =>
        link.classList.toggle(
          "active",
          link.getAttribute("href") === "#" + current,
        ),
      );
    };
    window.addEventListener("scroll", setActiveLink, { passive: true });
    setActiveLink();

    const navbar = document.getElementById("navbar");
    const onScroll = () =>
      navbar && navbar.classList.toggle("scrolled", window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" },
    );
    document
      .querySelectorAll("section, .project-card, .skill-card, .tl-item")
      .forEach((el) => {
        el.classList.add("fade-in");
        observer.observe(el);
      });

    return () => {
      document.removeEventListener("click", onClickOutside);
      window.removeEventListener("scroll", setActiveLink);
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, [mobileOpen]);

  return (
    <>
      <Nav
        onToggleTheme={() => setIsLight((v) => !v)}
        isLight={isLight}
        onToggleMobile={() => setMobileOpen((v) => !v)}
      />
      <MobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} />

      <header className="hero">
        <div className="prompt-line">
          <span className="ps1">josh@dev</span>
          <span className="dim">:</span>
          <span className="ps2">~/portfolio</span>
          <span className="dim">$</span>
          <span className="cmd">whoami</span>
          <span className="cursor"></span>
        </div>
        <h1 className="hero-name">
          Josh
          <br />
          <em>Queja</em>
        </h1>
        <div className="hero-tagline">
          software engineer <span className="bullet">•</span>
          AI &amp; systems builder <span className="bullet">•</span>
          Cal Poly CS grad
        </div>
        <p className="hero-bio">
          I build <strong>intelligent, production-grade software</strong> — from
          AI agent orchestration to compiler backends. Currently a Software
          Engineer II at Walmart Global Tech.
        </p>
        <div className="cta-row">
          <a href="#projects" className="btn btn-primary">
            view projects →
          </a>
          <a href="#contact" className="btn btn-outline">
            get in touch
          </a>
          <a
            href="https://github.com/jqueja"
            target="_blank"
            rel="noopener"
            className="btn btn-outline"
          >
            github ↗
          </a>
        </div>
      </header>

      <main>
        <section id="about">
          <div className="section-label">00 — about</div>
          <h2 className="section-title">A bit about me</h2>
          <div className="about-grid">
            <div className="about-bio">
              <p>
                I'm a <strong>software engineer</strong> building AI agents and
                data pipelines at Walmart Global Tech. I graduated from{" "}
                <strong>Cal Poly SLO</strong> with a BS in Computer Science (GPA
                3.40, Abernethy Scholar).
              </p>
              <p>
                I'm a first-generation Filipino-American from the Central Valley
                of California — I broke into tech through hard work and a love
                of building things that actually matter.
              </p>
              <p>
                Outside of work I enjoy competitive gaming analytics, exploring
                compiler internals, and overengineering my dotfiles.
              </p>
            </div>
            <div className="code-block">
              <div className="code-comment">// currently.json</div>
              <div className="code-brace accent3">{`{`}</div>
              <div className="code-body">
                <span className="accent4">"role"</span>:{" "}
                <span className="accent">"Software Engineer II"</span>,<br />
                <span className="accent4">"company"</span>:{" "}
                <span className="accent">"Walmart Global Tech"</span>,<br />
                <span className="accent4">"focus"</span>:{" "}
                <span className="accent">"AI agents, LangGraph"</span>,<br />
                <span className="accent4">"location"</span>:{" "}
                <span className="accent">"Sunnyvale, CA"</span>,<br />
                <span className="accent4">"coffee"</span>:{" "}
                <span className="accent2">true</span>
              </div>
              <div className="code-brace accent3">{`}`}</div>
            </div>
          </div>
        </section>

        <section id="skills">
          <div className="section-label">01 — skills</div>
          <h2 className="section-title">What I work with</h2>
          <div className="skills-grid">
            {SKILL_GROUPS.map((g) => (
              <SkillCard key={g.title} group={g} />
            ))}
          </div>
        </section>

        <section id="projects">
          <div className="section-label">02 — projects</div>
          <h2 className="section-title">Things I've built</h2>
          <div className="projects-list">
            {PROJECTS.map((p) => (
              <ProjectCard key={p.name} p={p} />
            ))}
          </div>
        </section>

        <section id="experience">
          <div className="section-label">03 — experience</div>
          <h2 className="section-title">Where I've been</h2>
          <div className="timeline">
            {TIMELINE.map((t) => (
              <TimelineItem key={t.role + t.date} item={t} />
            ))}
          </div>
        </section>

        <section id="contact">
          <div className="section-label">04 — contact</div>
          <h2 className="section-title">Let's talk</h2>
          <p className="contact-intro">
            Always open to interesting projects, collaborations, and
            conversations. Feel free to reach out.
          </p>
          <div className="contact-grid">
            {CONTACTS.map((c) => (
              <ContactCard key={c.type} c={c} />
            ))}
          </div>
        </section>
      </main>

      <footer>
        built with <span className="accent2">♥</span> and too much coffee — josh
        queja © 2026
      </footer>
    </>
  );
}
