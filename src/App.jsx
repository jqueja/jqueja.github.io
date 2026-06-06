import React, { useEffect, useState } from 'react'

/*
  App.jsx
  - Single-file app for the personal site. Kept small and declarative.
  - Data arrays below power repeated UI (skills, projects, timeline, contacts)
*/

const SKILL_GROUPS = [
  { title: 'languages', items: ['Python', 'JavaScript', 'C/C++', 'Rust', 'SQL', 'Bash'] },
  { title: 'frameworks', items: ['React', 'Node.js', 'FastAPI', 'Flask', 'Express'] },
  { title: 'tools & infra', items: ['Git', 'Docker', 'Linux', 'PostgreSQL', 'Vim'] },
  { title: 'interests', items: ['compilers', 'OS dev', 'CLI tools', 'algorithms'] }
]

const PROJECTS = [
  { name: 'sytax', lang: 'Rust', stars: 48, desc: 'A fast, zero-dependency syntax highlighting engine for terminals.', href: 'https://github.com/YOUR_USERNAME/sytax' },
  { name: 'devboard', lang: 'TypeScript', stars: 31, desc: 'A local-first dashboard for developers — aggregates GitHub issues and todos.', href: 'https://github.com/YOUR_USERNAME/devboard' },
  { name: 'algviz', lang: 'Python', stars: 17, desc: 'Interactive algorithm visualizer in the browser.', href: 'https://github.com/YOUR_USERNAME/algviz' },
  { name: 'gopher-net', lang: 'Go', stars: 12, desc: 'Lightweight network monitoring tool with a TUI interface.', href: 'https://github.com/YOUR_USERNAME/gopher-net' }
]

const TIMELINE = [
  { date: '2024 — present', role: 'Software Engineering Intern', place: 'Acme Systems, Inc.', desc: 'Built and maintained internal developer tooling in Go. Reduced CI pipeline times by 35%.' },
  { date: '2023 — 2024', role: 'CS Teaching Assistant', place: 'State University', desc: 'TA for Data Structures & Algorithms; held office hours and graded assignments.' },
  { date: '2022', role: 'Freelance Developer', place: 'Self-employed', desc: 'Built full-stack web apps for local businesses.' }
]

const CONTACTS = [
  { type: 'email', label: 'evan@typanski.dev', href: 'mailto:evan@typanski.dev', icon: '✉' },
  { type: 'github', label: 'github.com/YOUR_USERNAME', href: 'https://github.com/YOUR_USERNAME', icon: '⌥' },
  { type: 'linkedin', label: 'Evan Typanski', href: 'https://linkedin.com/in/YOUR_USERNAME', icon: '◈' },
  { type: 'resume', label: 'download PDF', href: 'resume.pdf', icon: '↓', download: true }
]

function Nav({ onToggleTheme, isLight, onToggleMobile }) {
  return (
    <nav id="navbar">
      <div className="nav-logo">:/ <span className="dim">$ </span>evan<span className="dim">.dev</span></div>
      <ul className="nav-links">
        <li><a href="#about">about</a></li>
        <li><a href="#skills">skills</a></li>
        <li><a href="#projects">projects</a></li>
        <li><a href="#experience">experience</a></li>
        <li><a href="#contact">contact</a></li>
        <li>
          <button className="theme-toggle" id="themeBtn" onClick={onToggleTheme} aria-label="Toggle theme">
            {isLight ? '◑ dark' : '◐ light'}
          </button>
        </li>
      </ul>
      <button className="hamburger" id="hamburger" aria-label="Open menu" onClick={onToggleMobile}>☰</button>
    </nav>
  )
}

function MobileNav({ open, onClose }) {
  return (
    <div className={`mobile-nav${open ? ' open' : ''}`} id="mobileNav">
      <a href="#about" onClick={onClose}>about</a>
      <a href="#skills" onClick={onClose}>skills</a>
      <a href="#projects" onClick={onClose}>projects</a>
      <a href="#experience" onClick={onClose}>experience</a>
      <a href="#contact" onClick={onClose}>contact</a>
    </div>
  )
}

function SkillCard({ group }) {
  return (
    <div className="skill-card">
      <div className="skill-cat">{group.title}</div>
      <div className="skill-items">{group.items.map(i => <span key={i} className="tag">{i}</span>)}</div>
    </div>
  )
}

function ProjectCard({ p }) {
  return (
    <a className="project-card" href={p.href} target="_blank" rel="noopener noreferrer">
      <div className="proj-top">
        <span className="proj-icon">◈</span>
        <span className="proj-name">{p.name}</span>
        <span className="proj-lang">{p.lang}</span>
        <span className="proj-stars">★ {p.stars}</span>
      </div>
      <p className="proj-desc">{p.desc}</p>
    </a>
  )
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
  )
}

function ContactCard({ c }) {
  return (
    <a className="contact-link" href={c.href} target={c.download ? undefined : '_blank'} rel={c.download ? undefined : 'noopener noreferrer'} download={c.download}>
      <span className="contact-icon">{c.icon}</span>
      <div className="contact-info"><span className="contact-type">{c.type}</span><span className="contact-val">{c.label}</span></div>
    </a>
  )
}

export default function App() {
  const [isLight, setIsLight] = useState(() => {
    try { return localStorage.getItem('et-theme') === 'light' } catch { return false }
  })
  const [mobileOpen, setMobileOpen] = useState(false)

  // Sync theme to root element and persist to localStorage
  useEffect(() => {
    const root = document.getElementById('site')
    if (root) root.classList.toggle('light', isLight)
    try { localStorage.setItem('et-theme', isLight ? 'light' : 'dark') } catch {}
  }, [isLight])

  // UI effects: mobile click-away, active nav on scroll, header shadow, fade-in observer
  useEffect(() => {
    const onClickOutside = (e) => {
      const ham = document.getElementById('hamburger')
      const mobile = document.getElementById('mobileNav')
      if (mobileOpen && !ham?.contains(e.target) && !mobile?.contains(e.target)) setMobileOpen(false)
    }
    document.addEventListener('click', onClickOutside)

    const sections = document.querySelectorAll('section[id], header[id]')
    const navLinks = document.querySelectorAll('.nav-links a, .mobile-nav a')
    const setActiveLink = () => {
      let current = ''
      sections.forEach(section => { const top = section.offsetTop - 80; if (window.scrollY >= top) current = section.id })
      navLinks.forEach(link => link.classList.toggle('active', link.getAttribute('href') === '#'+current))
    }
    window.addEventListener('scroll', setActiveLink, { passive: true })
    setActiveLink()

    const navbar = document.getElementById('navbar')
    const onScroll = () => navbar && navbar.classList.toggle('scrolled', window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })

    const observer = new IntersectionObserver(entries => { entries.forEach(entry => { if (entry.isIntersecting){ entry.target.classList.add('visible'); observer.unobserve(entry.target) } }) }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' })
    document.querySelectorAll('section, .project-card, .skill-card, .tl-item').forEach(el => { el.classList.add('fade-in'); observer.observe(el) })

    return () => {
      document.removeEventListener('click', onClickOutside)
      window.removeEventListener('scroll', setActiveLink)
      window.removeEventListener('scroll', onScroll)
      observer.disconnect()
    }
  }, [mobileOpen])

  return (
    <>
      <Nav onToggleTheme={() => setIsLight(v => !v)} isLight={isLight} onToggleMobile={() => setMobileOpen(v => !v)} />
      <MobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} />

      <header className="hero">
        <div className="prompt-line">
          <span className="ps1">evan@dev</span><span className="dim">:</span><span className="ps2">~/portfolio</span><span className="dim">$</span>
          <span className="cmd">whoami</span><span className="cursor"></span>
        </div>
        <h1 className="hero-name">Evan<br/><em>Typanski</em></h1>
        <div className="hero-tagline">
          software developer <span className="bullet">•</span>
          computer science student <span className="bullet">•</span>
          engineer
        </div>
        <p className="hero-bio">I build <strong>clean, thoughtful software</strong> — from low-level systems to user-facing applications. Currently studying CS while shipping things that work.</p>
        <div className="cta-row">
          <a href="#projects" className="btn btn-primary">view projects →</a>
          <a href="#contact" className="btn btn-outline">get in touch</a>
          <a href="https://github.com/YOUR_USERNAME" target="_blank" rel="noopener" className="btn btn-outline">github ↗</a>
        </div>
      </header>

      <main>
        <section id="about">
          <div className="section-label">00 — about</div>
          <h2 className="section-title">A bit about me</h2>
          <div className="about-grid">
            <div className="about-bio">
              <p>I'm a <strong>software developer and CS student</strong> who enjoys working at the intersection of systems programming and developer tooling.</p>
              <p>When I'm not coding, I'm reading about compilers, contributing to open source, or overengineering my dotfiles.</p>
            </div>
            <div className="code-block">
              <div className="code-comment">// currently.json</div>
              <div className="code-brace accent3">{`{`}</div>
              <div className="code-body">
                <span className="accent4">"status"</span>: <span className="accent">"open to work"</span>,<br/>
                <span className="accent4">"learning"</span>: <span className="accent">"Rust, compilers"</span>,<br/>
                <span className="accent4">"location"</span>: <span className="accent">"midwest, US"</span>,<br/>
                <span className="accent4">"coffee"</span>: <span className="accent2">true</span>
              </div>
              <div className="code-brace accent3">{`}`}</div>
            </div>
          </div>
        </section>

        <section id="skills">
          <div className="section-label">01 — skills</div>
          <h2 className="section-title">What I work with</h2>
          <div className="skills-grid">
            {SKILL_GROUPS.map(g => <SkillCard key={g.title} group={g} />)}
          </div>
        </section>

        <section id="projects">
          <div className="section-label">02 — projects</div>
          <h2 className="section-title">Things I've built</h2>
          <div className="projects-list">
            {PROJECTS.map(p => <ProjectCard key={p.name} p={p} />)}
          </div>
        </section>

        <section id="experience">
          <div className="section-label">03 — experience</div>
          <h2 className="section-title">Where I've been</h2>
          <div className="timeline">
            {TIMELINE.map(t => <TimelineItem key={t.role + t.date} item={t} />)}
          </div>
        </section>

        <section id="contact">
          <div className="section-label">04 — contact</div>
          <h2 className="section-title">Let's talk</h2>
          <p className="contact-intro">Open to internships, full-time roles, and interesting collaborations. Don't hesitate to reach out.</p>
          <div className="contact-grid">
            {CONTACTS.map(c => <ContactCard key={c.type} c={c} />)}
          </div>
        </section>
      </main>

      <footer>
        built with <span className="accent2">♥</span> and too much coffee — evan typanski © 2025
      </footer>
    </>
  )
}
