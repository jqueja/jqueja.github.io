import React, { useEffect, useState } from "react";

export default function App() {
  const [isLight, setIsLight] = useState(() => {
    try {
      return localStorage.getItem("et-theme") === "light";
    } catch {
      return false;
    }
  });
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const root = document.getElementById("site");
    if (root) root.classList.toggle("light", isLight);
    try {
      localStorage.setItem("et-theme", isLight ? "light" : "dark");
    } catch {}
  }, [isLight]);

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

  const toggleTheme = () => setIsLight((v) => !v);
  const toggleMobile = () => setMobileOpen((v) => !v);
  const closeMobile = () => setMobileOpen(false);

  return (
    <>
      <nav id="navbar">
        <div className="nav-logo">
          :/ <span className="dim">$ </span>evan
          <span className="dim">.dev</span>
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
              onClick={toggleTheme}
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
          onClick={toggleMobile}
        >
          ☰
        </button>
      </nav>

      <div className={`mobile-nav${mobileOpen ? " open" : ""}`} id="mobileNav">
        <a href="#about" onClick={closeMobile}>
          about
        </a>
        <a href="#skills" onClick={closeMobile}>
          skills
        </a>
        <a href="#projects" onClick={closeMobile}>
          projects
        </a>
        <a href="#experience" onClick={closeMobile}>
          experience
        </a>
        <a href="#contact" onClick={closeMobile}>
          contact
        </a>
      </div>

      <header className="hero">
        <div className="prompt-line">
          <span className="ps1">evan@dev</span>
          <span className="dim">:</span>
          <span className="ps2">~/portfolio</span>
          <span className="dim">$</span>
          <span className="cmd">whoami</span>
          <span className="cursor"></span>
        </div>
        <h1 className="hero-name">
          Evan
          <br />
          <em>Typanski</em>
        </h1>
        <div className="hero-tagline">
          software developer <span className="bullet">•</span>
          computer science student <span className="bullet">•</span>
          engineer
        </div>
        <p className="hero-bio">
          I build <strong>clean, thoughtful software</strong> — from low-level
          systems to user-facing applications. Currently studying CS while
          shipping things that work.
        </p>
        <div className="cta-row">
          <a href="#projects" className="btn btn-primary">
            view projects →
          </a>
          <a href="#contact" className="btn btn-outline">
            get in touch
          </a>
          <a
            href="https://github.com/YOUR_USERNAME"
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
                I'm a <strong>software developer and CS student</strong> who
                enjoys working at the intersection of systems programming and
                developer tooling.
              </p>
              <p>
                When I'm not coding, I'm reading about compilers, contributing
                to open source, or overengineering my dotfiles.
              </p>
            </div>
            <div className="code-block">
              <div className="code-comment">// currently.json</div>
              <div className="code-brace accent3">{`{`}</div>
              <div className="code-body">
                <span className="accent4">"status"</span>:{" "}
                <span className="accent">"open to work"</span>,<br />
                <span className="accent4">"learning"</span>:{" "}
                <span className="accent">"Rust, compilers"</span>,<br />
                <span className="accent4">"location"</span>:{" "}
                <span className="accent">"midwest, US"</span>,<br />
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
            <div className="skill-card">
              <div className="skill-cat">languages</div>
              <div className="skill-items">
                <span className="tag">Python</span>
                <span className="tag">JavaScript</span>
                <span className="tag">C/C++</span>
                <span className="tag">Rust</span>
                <span className="tag">SQL</span>
                <span className="tag">Bash</span>
              </div>
            </div>
            <div className="skill-card">
              <div className="skill-cat">frameworks</div>
              <div className="skill-items">
                <span className="tag">React</span>
                <span className="tag">Node.js</span>
                <span className="tag">FastAPI</span>
                <span className="tag">Flask</span>
                <span className="tag">Express</span>
              </div>
            </div>
            <div className="skill-card">
              <div className="skill-cat">tools &amp; infra</div>
              <div className="skill-items">
                <span className="tag">Git</span>
                <span className="tag">Docker</span>
                <span className="tag">Linux</span>
                <span className="tag">PostgreSQL</span>
                <span className="tag">Vim</span>
              </div>
            </div>
            <div className="skill-card">
              <div className="skill-cat">interests</div>
              <div className="skill-items">
                <span className="tag">compilers</span>
                <span className="tag">OS dev</span>
                <span className="tag">CLI tools</span>
                <span className="tag">algorithms</span>
              </div>
            </div>
          </div>
        </section>

        <section id="projects">
          <div className="section-label">02 — projects</div>
          <h2 className="section-title">Things I've built</h2>
          <div className="projects-list">
            <a
              className="project-card"
              href="https://github.com/YOUR_USERNAME/sytax"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="proj-top">
                <span className="proj-icon">⬡</span>
                <span className="proj-name">sytax</span>
                <span className="proj-lang lang-rs">Rust</span>
              </div>
              <div className="proj-stars">★ 48</div>
              <p className="proj-desc">
                A fast, zero-dependency syntax highlighting engine for
                terminals. Supports 30+ languages via a hand-tuned lexer. Parses
                100k LOC in under 40ms.
              </p>
            </a>

            <a
              className="project-card"
              href="https://github.com/YOUR_USERNAME/devboard"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="proj-top">
                <span className="proj-icon">◈</span>
                <span className="proj-name">devboard</span>
                <span className="proj-lang lang-js">TypeScript</span>
              </div>
              <div className="proj-stars">★ 31</div>
              <p className="proj-desc">
                A local-first dashboard for developers — aggregates GitHub
                issues, todos, and time logs into a single terminal-adjacent UI.
                No cloud, no accounts.
              </p>
            </a>

            <a
              className="project-card"
              href="https://github.com/YOUR_USERNAME/algviz"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="proj-top">
                <span className="proj-icon">▸</span>
                <span className="proj-name">algviz</span>
                <span className="proj-lang lang-py">Python</span>
              </div>
              <div className="proj-stars">★ 17</div>
              <p className="proj-desc">
                Interactive algorithm visualizer in the browser. Animates
                sorting, graph traversal, and tree operations step-by-step.
              </p>
            </a>

            <a
              className="project-card"
              href="https://github.com/YOUR_USERNAME/gopher-net"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="proj-top">
                <span className="proj-icon">⬡</span>
                <span className="proj-name">gopher-net</span>
                <span className="proj-lang lang-go">Go</span>
              </div>
              <div className="proj-stars">★ 12</div>
              <p className="proj-desc">
                A lightweight network monitoring tool with a TUI interface.
                Tracks latency, packet loss, and DNS resolution across multiple
                hosts concurrently.
              </p>
            </a>
          </div>
        </section>

        <section id="experience">
          <div className="section-label">03 — experience</div>
          <h2 className="section-title">Where I've been</h2>
          <div className="timeline">
            <div className="tl-item">
              <div className="tl-dot"></div>
              <div className="tl-date">2024 — present</div>
              <div className="tl-role">Software Engineering Intern</div>
              <div className="tl-place">Acme Systems, Inc.</div>
              <p className="tl-desc">
                Built and maintained internal developer tooling in Go. Reduced
                CI pipeline times by 35% through caching and parallelization
                improvements.
              </p>
            </div>

            <div className="tl-item">
              <div className="tl-dot"></div>
              <div className="tl-date">2023 — 2024</div>
              <div className="tl-role">CS Teaching Assistant</div>
              <div className="tl-place">State University</div>
              <p className="tl-desc">
                TA for Data Structures &amp; Algorithms. Held weekly office
                hours, graded assignments, and helped redesign course projects
                around real-world systems.
              </p>
            </div>

            <div className="tl-item">
              <div className="tl-dot"></div>
              <div className="tl-date">2022</div>
              <div className="tl-role">Freelance Developer</div>
              <div className="tl-place">Self-employed</div>
              <p className="tl-desc">
                Built full-stack web apps for local businesses — e-commerce,
                scheduling systems, and custom CMS solutions using Python and
                JavaScript.
              </p>
            </div>
          </div>
        </section>

        <section id="contact">
          <div className="section-label">04 — contact</div>
          <h2 className="section-title">Let's talk</h2>
          <p className="contact-intro">
            Open to internships, full-time roles, and interesting
            collaborations. Don't hesitate to reach out.
          </p>
          <div className="contact-grid">
            <a href="mailto:evan@typanski.dev" className="contact-link">
              <span className="contact-icon">✉</span>
              <div className="contact-info">
                <span className="contact-type">email</span>
                <span className="contact-val">evan@typanski.dev</span>
              </div>
            </a>
            <a
              href="https://github.com/YOUR_USERNAME"
              className="contact-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="contact-icon">⌥</span>
              <div className="contact-info">
                <span className="contact-type">github</span>
                <span className="contact-val">github.com/YOUR_USERNAME</span>
              </div>
            </a>
            <a
              href="https://linkedin.com/in/YOUR_USERNAME"
              className="contact-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="contact-icon">◈</span>
              <div className="contact-info">
                <span className="contact-type">linkedin</span>
                <span className="contact-val">Evan Typanski</span>
              </div>
            </a>
            <a href="resume.pdf" download className="contact-link">
              <span className="contact-icon">↓</span>
              <div className="contact-info">
                <span className="contact-type">resume</span>
                <span className="contact-val">download PDF</span>
              </div>
            </a>
          </div>
        </section>
      </main>

      <footer>
        built with <span className="accent2">♥</span> and too much coffee — evan
        typanski © 2025
      </footer>
    </>
  );
}
