import { useEffect, useMemo, useRef, useState } from 'react';
import { motion, useMotionValue, useScroll, useSpring, useTransform } from 'framer-motion';
import { gsap } from 'gsap';

const profile = {
  name: 'Piyush Kumawat',
  email: 'piyush.kumawat0412@gmail.com',
  phone: '+91 9660329142',
  github: 'https://github.com/piyush-of',
  linkedin: 'https://linkedin.com/in/piyush-kumawat-1a92ba386',
  leetcode: 'https://leetcode.com/u/piyush_of',
};

const navItems = [
  { label: 'Home', href: '#top' },
  { label: 'Work', href: '#work' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
];

const heroRoles = ['Engineering Student', 'Software Developer', 'Startup Builder'];

const projects = [
  {
    name: 'MUSE',
    label: 'AI Fashion Intelligence',
    year: '2026',
    number: '01',
    problem: 'Personal styling tools rarely turn body, tone, and wardrobe context into practical decisions.',
    solution:
      'Built a full-stack SaaS platform with AI outfit analysis, skin-tone profiles, secure auth, CI/CD, and production deployment.',
    outcome: '11 personalized style profiles, JWT refresh-token security, Docker Compose, Vercel, Railway, and Neon PostgreSQL.',
    stack: ['React 19', 'TypeScript', 'Node.js', 'Express', 'PostgreSQL', 'Docker', 'Gemini API'],
    github: 'https://github.com/piyush-of/MUSE-Personal-designer',
    live: '',
    accent: 'cyan',
  },
  {
    name: 'Lookism',
    label: 'Privacy-first AI Analyzer',
    year: '2026',
    number: '02',
    problem: 'AI photo analysis feels risky when users cannot tell what happens to personal images.',
    solution:
      'Created a Next.js product that encrypts uploads client-side, decrypts only in server memory, and zeroes buffers after analysis.',
    outcome: 'A privacy-led product story powered by Gemini vision for body shape, undertone, and styling recommendations.',
    stack: ['Next.js 15', 'React', 'TypeScript', 'Web Crypto API', 'Gemini Vision'],
    github: 'https://github.com/piyush-of/Lookism',
    live: 'https://lookism-six.vercel.app/',
    accent: 'violet',
  },
  {
    name: 'IIITDM Portal',
    label: 'College ERP System',
    year: '2026',
    number: '03',
    problem: 'Academic workflows become slow when student, faculty, and admin tools are scattered.',
    solution:
      'Built a role-based ERP for attendance, assignments, notices, result tracking, CGPA views, and protected routes.',
    outcome: 'A practical MongoDB-backed REST API and permission model for campus operations.',
    stack: ['React', 'Node.js', 'Express', 'MongoDB', 'JWT', 'REST API'],
    github: 'https://github.com/piyush-of/iiitdm-portal',
    live: 'https://iiitdm-portal.vercel.app',
    accent: 'blue',
  },
  {
    name: 'Bhagavata',
    label: 'Devotional Web Space',
    year: '2026',
    number: '04',
    problem: 'Spiritual reading online is often surrounded by visual noise.',
    solution: 'Created a calm reading-first devotional interface with restrained interaction and focused atmosphere.',
    outcome: 'A softer product design exercise around attention, reflection, and emotional pacing.',
    stack: ['JavaScript', 'CSS', 'HTML', 'Vercel'],
    github: 'https://github.com/piyush-of/Bhagavata',
    live: 'https://bhagavata.vercel.app',
    accent: 'cyan',
  },
];

const metrics = [
  { value: '3+', label: 'Full-stack products' },
  { value: '11', label: 'AI style profiles' },
  { value: '7.6', label: 'CGPA at IIITDM' },
  { value: '2026', label: 'GSSoC contributor' },
];

const journey = [
  {
    period: '2025 - 2029',
    title: 'B.Tech ECE at IIITDM Jabalpur',
    body: 'Building a foundation in electronics, communication systems, and engineering discipline.',
  },
  {
    period: '2026',
    title: 'Full-stack product experiments',
    body: 'Shipping fashion AI, student workflow systems, and focused web experiences with production tooling.',
  },
  {
    period: 'Now',
    title: 'Design-led engineering direction',
    body: 'Combining frontend craft, privacy-aware architecture, and startup-style product storytelling.',
  },
];

const skills = ['C++', 'DSA', 'JavaScript', 'React', 'Next.js', 'Tailwind', 'Git', 'Node.js', 'TypeScript'];

const containerStagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const riseIn = {
  hidden: { opacity: 0, y: 34, filter: 'blur(10px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.78, ease: [0.22, 1, 0.36, 1] },
  },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.92, y: 22 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
  },
};

function ArrowIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" focusable="false">
      <path d="M5 15 15 5M8 5h7v7" />
    </svg>
  );
}

function SplitName() {
  return (
    <motion.h1 className="hero-title" variants={containerStagger} initial="hidden" animate="visible">
      {['PIYUSH', 'KUMAWAT'].map((word) => (
        <span className="hero-word" key={word}>
          {word.split('').map((letter, index) => (
            <motion.span
              aria-hidden="true"
              variants={{
                hidden: { y: '112%', rotate: index % 2 ? 4 : -4 },
                visible: {
                  y: '0%',
                  rotate: 0,
                  transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] },
                },
              }}
              key={`${word}-${letter}-${index}`}
            >
              {letter}
            </motion.span>
          ))}
        </span>
      ))}
      <span className="sr-only">Piyush Kumawat</span>
    </motion.h1>
  );
}

function SectionHeader({ eyebrow, title, copy }) {
  return (
    <motion.div
      className="section-header"
      variants={containerStagger}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-120px' }}
    >
      <motion.p className="eyebrow" variants={riseIn}>
        {eyebrow}
      </motion.p>
      <motion.h2 variants={riseIn}>{title}</motion.h2>
      {copy && <motion.p variants={riseIn}>{copy}</motion.p>}
    </motion.div>
  );
}

function OrbitalVisual({ mouseX, mouseY }) {
  const rotateX = useTransform(mouseY, [0, 1], [8, -8]);
  const rotateY = useTransform(mouseX, [0, 1], [-10, 10]);
  const avatarX = useTransform(mouseX, [0, 1], [-18, 18]);
  const avatarY = useTransform(mouseY, [0, 1], [-14, 14]);

  return (
    <motion.div
      className="hero-orbit"
      style={{ rotateX, rotateY }}
      initial={{ opacity: 0, scale: 0.82, y: 44 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 1.1, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="orbit-ring ring-one" />
      <div className="orbit-ring ring-two" />
      <div className="orbit-ring ring-three" />
      <motion.div className="avatar-shell" style={{ x: avatarX, y: avatarY }}>
        <img src="/avatar-boy.svg" alt="Stylized avatar of Piyush Kumawat" />
      </motion.div>
      <motion.div
        className="floating-chip chip-one"
        animate={{ y: [0, -14, 0], rotate: [0, 2, 0] }}
        transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut' }}
      >
        React / Next.js
      </motion.div>
      <motion.div
        className="floating-chip chip-two"
        animate={{ y: [0, 12, 0], rotate: [0, -2, 0] }}
        transition={{ duration: 5.6, repeat: Infinity, ease: 'easeInOut' }}
      >
        AI Products
      </motion.div>
      <motion.div
        className="floating-chip chip-three"
        animate={{ y: [0, -10, 0], x: [0, 8, 0] }}
        transition={{ duration: 5.2, repeat: Infinity, ease: 'easeInOut' }}
      >
        ECE Systems
      </motion.div>
    </motion.div>
  );
}

function ProjectCard({ project, index }) {
  return (
    <motion.article
      className={`project-card ${project.accent}`}
      variants={scaleIn}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      whileHover={{ y: -12, rotateX: 2, rotateY: index % 2 ? -2 : 2 }}
      transition={{ type: 'spring', stiffness: 190, damping: 22 }}
    >
      <div className="project-preview" aria-hidden="true">
        <span>{project.number}</span>
        <div className="preview-grid" />
        <div className="preview-glow" />
      </div>
      <div className="project-content">
        <div className="project-meta">
          <span>{project.label}</span>
          <span>{project.year}</span>
        </div>
        <h3>{project.name}</h3>
        <div className="project-story">
          <p>
            <strong>Problem.</strong> {project.problem}
          </p>
          <p>
            <strong>Solution.</strong> {project.solution}
          </p>
          <p>
            <strong>Signal.</strong> {project.outcome}
          </p>
        </div>
        <div className="tag-row">
          {project.stack.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
        <div className="project-actions">
          {project.live && (
            <a href={project.live} target="_blank" rel="noreferrer">
              Live Demo <ArrowIcon />
            </a>
          )}
          <a href={project.github} target="_blank" rel="noreferrer">
            GitHub <ArrowIcon />
          </a>
          <a href={`#case-${project.number}`}>Case Study</a>
        </div>
      </div>
    </motion.article>
  );
}

export default function App() {
  const cursorRef = useRef(null);
  const auraRef = useRef(null);
  const heroRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const smoothMouseX = useSpring(mouseX, { stiffness: 90, damping: 24, mass: 0.4 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 90, damping: 24, mass: 0.4 });
  const { scrollYProgress } = useScroll();
  const progressScale = useSpring(scrollYProgress, { stiffness: 120, damping: 26 });
  const heroY = useTransform(scrollYProgress, [0, 0.32], [0, -120]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.26], [1, 0.18]);
  const featuredProjects = useMemo(() => projects.slice(0, 3), []);

  useEffect(() => {
    document.documentElement.dataset.theme = 'dark';
    const timeout = window.setTimeout(() => setIsLoading(false), 950);
    return () => window.clearTimeout(timeout);
  }, []);

  useEffect(() => {
    const cursor = cursorRef.current;
    const aura = auraRef.current;
    if (!cursor || !aura) return undefined;

    const moveCursor = (event) => {
      gsap.to(cursor, {
        x: event.clientX,
        y: event.clientY,
        duration: 0.18,
        ease: 'power3.out',
      });
      gsap.to(aura, {
        x: event.clientX,
        y: event.clientY,
        duration: 0.55,
        ease: 'power3.out',
      });
    };

    window.addEventListener('pointermove', moveCursor, { passive: true });
    return () => window.removeEventListener('pointermove', moveCursor);
  }, []);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return undefined;

    const handleMove = (event) => {
      const rect = hero.getBoundingClientRect();
      const nextX = Math.min(Math.max((event.clientX - rect.left) / rect.width, 0), 1);
      const nextY = Math.min(Math.max((event.clientY - rect.top) / rect.height, 0), 1);
      mouseX.set(nextX);
      mouseY.set(nextY);
      hero.style.setProperty('--pointer-x', `${nextX * 100}%`);
      hero.style.setProperty('--pointer-y', `${nextY * 100}%`);
    };

    hero.addEventListener('pointermove', handleMove, { passive: true });
    return () => hero.removeEventListener('pointermove', handleMove);
  }, [mouseX, mouseY]);

  const handleContactSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = data.get('name')?.toString().trim() || 'Portfolio visitor';
    const email = data.get('email')?.toString().trim() || 'No email provided';
    const message = data.get('message')?.toString().trim() || 'No message provided';
    const subject = encodeURIComponent(`Portfolio inquiry from ${name}`);
    const body = encodeURIComponent(`${message}\n\nFrom: ${name}\nEmail: ${email}`);

    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
    event.currentTarget.reset();
  };

  return (
    <main className="site-shell" id="top">
      <a className="skip-link" href="#content">Skip to content</a>
      <motion.div className="scroll-progress" style={{ scaleX: progressScale }} aria-hidden="true" />
      <div className="cursor-dot" ref={cursorRef} aria-hidden="true" />
      <div className="cursor-aura" ref={auraRef} aria-hidden="true" />

      {isLoading && (
        <motion.div
          className="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          aria-live="polite"
          aria-label="Loading portfolio"
        >
          <motion.div
            className="loader-mark"
            animate={{ rotate: 360 }}
            transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
          />
          <span>Initializing portfolio</span>
        </motion.div>
      )}

      <header className="topbar">
        <a className="brand-mark" href="#top" aria-label="Piyush Kumawat home">
          <span>PK</span>
          <strong>Piyush Kumawat</strong>
        </a>
        <nav className="nav-links" aria-label="Primary navigation">
          {navItems.map((item) => (
            <a href={item.href} key={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
        <a className="nav-cta" href={`mailto:${profile.email}`}>
          Let&apos;s talk
        </a>
      </header>

      <section className="hero-section" id="content" ref={heroRef} aria-labelledby="hero-title">
        <div className="hero-backdrop" aria-hidden="true">
          <motion.div className="hero-grid" style={{ y: heroY, opacity: heroOpacity }} />
          <div className="hero-noise" />
          <motion.div
            className="hero-beam beam-one"
            animate={{ opacity: [0.45, 0.82, 0.45], scale: [1, 1.08, 1] }}
            transition={{ duration: 6.5, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="hero-beam beam-two"
            animate={{ opacity: [0.35, 0.7, 0.35], rotate: [0, 8, 0] }}
            transition={{ duration: 7.5, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>

        <motion.div className="hero-copy" style={{ y: heroY, opacity: heroOpacity }}>
          <motion.p
            className="eyebrow"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.02, ease: [0.22, 1, 0.36, 1] }}
          >
            Portfolio / Motion-led frontend / AI product systems
          </motion.p>
          <SplitName />
          <motion.div
            className="role-stack"
            variants={containerStagger}
            initial="hidden"
            animate="visible"
            aria-label="Roles"
          >
            {heroRoles.map((role) => (
              <motion.span variants={riseIn} key={role}>
                {role}
              </motion.span>
            ))}
          </motion.div>
          <motion.p
            className="hero-statement"
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.82, delay: 1.18, ease: [0.22, 1, 0.36, 1] }}
          >
            I build cinematic interfaces, privacy-aware AI products, and useful full-stack tools
            with the precision of an engineer and the taste of a product designer.
          </motion.p>
          <motion.div
            className="hero-actions"
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.78, delay: 1.34, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.a className="button primary" href="#work" whileHover={{ y: -4 }} whileTap={{ scale: 0.98 }}>
              Explore work <ArrowIcon />
            </motion.a>
            <motion.a
              className="button ghost"
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.98 }}
            >
              GitHub <ArrowIcon />
            </motion.a>
          </motion.div>
        </motion.div>

        <OrbitalVisual mouseX={smoothMouseX} mouseY={smoothMouseY} />

        <motion.div
          className="scroll-cue"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.55, duration: 0.65 }}
          aria-hidden="true"
        >
          <span>Scroll</span>
          <motion.i animate={{ y: [0, 10, 0] }} transition={{ duration: 1.7, repeat: Infinity }} />
        </motion.div>
      </section>

      <section className="metrics-band" aria-label="Portfolio highlights">
        {metrics.map((metric, index) => (
          <motion.article
            className="metric-card"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.65, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
            key={metric.label}
          >
            <strong>{metric.value}</strong>
            <span>{metric.label}</span>
          </motion.article>
        ))}
      </section>

      <section className="work-section section-pad" id="work">
        <SectionHeader
          eyebrow="Selected work"
          title="Product stories with engineering weight."
          copy="Each project is framed like a product: problem, system decision, outcome, stack, source, and demo where available."
        />
        <div className="featured-grid">
          {featuredProjects.map((project, index) => (
            <ProjectCard project={project} index={index} key={project.name} />
          ))}
        </div>
        <div className="mini-projects" aria-label="Additional project cards">
          {projects.slice(3).map((project) => (
            <motion.article
              className="mini-project"
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.62, ease: [0.22, 1, 0.36, 1] }}
              key={project.name}
            >
              <span>{project.label}</span>
              <h3>{project.name}</h3>
              <p>{project.solution}</p>
              <a href={project.github} target="_blank" rel="noreferrer">
                View source <ArrowIcon />
              </a>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="about-section section-pad" id="about">
        <SectionHeader
          eyebrow="About"
          title="A student builder with a founder-speed feedback loop."
          copy="I like products that feel intentional from the first frame: a clear story, responsive motion, useful systems, and enough taste that people remember the experience."
        />
        <div className="about-grid">
          <motion.div
            className="story-panel"
            initial={{ opacity: 0, x: -34 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-90px' }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          >
            <p>
              I am an Electronics and Communication undergraduate at PDPM IIITDM Jabalpur, building
              at the intersection of frontend craft, AI interfaces, privacy-first architecture, and
              startup-style product thinking.
            </p>
            <div className="highlight-line">
              <span>Current direction</span>
              <strong>Design-led full-stack engineering</strong>
            </div>
          </motion.div>
          <div className="timeline">
            {journey.map((item, index) => (
              <motion.article
                className="timeline-item"
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.68, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
                key={item.title}
              >
                <span>{item.period}</span>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="skills-section section-pad" id="skills">
        <SectionHeader
          eyebrow="Skills"
          title="Interactive stack, built for fast scanning."
          copy="The focus is not a badge wall. These are the tools I use to build interfaces, systems, and product prototypes."
        />
        <motion.div className="skill-cloud" variants={containerStagger} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          {skills.map((skill, index) => (
            <motion.button
              className="skill-pill"
              type="button"
              variants={scaleIn}
              whileHover={{
                y: -8,
                scale: 1.04,
                boxShadow: '0 22px 70px rgba(103, 92, 255, 0.26)',
              }}
              whileTap={{ scale: 0.96 }}
              key={skill}
            >
              <span>{String(index + 1).padStart(2, '0')}</span>
              {skill}
            </motion.button>
          ))}
        </motion.div>
      </section>

      <section className="contact-section section-pad" id="contact">
        <SectionHeader
          eyebrow="Contact"
          title="Let’s build something with taste and traction."
          copy="Open to internships, product collaborations, frontend engineering roles, AI interface work, and high-agency student teams."
        />
        <div className="contact-grid">
          <motion.div
            className="contact-card"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-90px' }}
            transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
          >
            <span>Signal links</span>
            <a href={`mailto:${profile.email}`}>{profile.email}</a>
            <a href={`tel:${profile.phone.replace(/\s/g, '')}`}>{profile.phone}</a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer">
              LinkedIn <ArrowIcon />
            </a>
            <a href={profile.leetcode} target="_blank" rel="noreferrer">
              LeetCode <ArrowIcon />
            </a>
          </motion.div>
          <motion.form
            className="contact-form"
            onSubmit={handleContactSubmit}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-90px' }}
            transition={{ duration: 0.72, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <label>
              <span>Name</span>
              <input name="name" type="text" autoComplete="name" required />
            </label>
            <label>
              <span>Email</span>
              <input name="email" type="email" autoComplete="email" required />
            </label>
            <label>
              <span>Message</span>
              <textarea name="message" rows="5" required />
            </label>
            <motion.button className="button primary" type="submit" whileHover={{ y: -4 }} whileTap={{ scale: 0.98 }}>
              Open email draft <ArrowIcon />
            </motion.button>
          </motion.form>
        </div>
      </section>

      <footer className="site-footer">
        <span>2026 / {profile.name}</span>
        <a href="#top">Back to top</a>
      </footer>
    </main>
  );
}
