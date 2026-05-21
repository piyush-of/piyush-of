import { useState, useEffect } from 'react';
import ControlDeck from './components/ControlDeck';
import ProjectSphere from './components/ProjectSphere';
import ProjectOverlay from './components/ProjectOverlay';

export default function App() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [isLightTheme, setIsLightTheme] = useState(false);

  // Apply light-theme class to document body
  useEffect(() => {
    if (isLightTheme) {
      document.body.classList.add('light-theme');
    } else {
      document.body.classList.remove('light-theme');
    }
  }, [isLightTheme]);

  const toggleTheme = () => {
    setIsLightTheme(prev => !prev);
  };

  // Core portfolio modules mapped onto coordinates pores on the 3D Holographic Star Map
  const projectsData = [
    {
      id: 'muse',
      title: 'MUSE — Personal Designer',
      type: 'project',
      badge: 'MISSION: DESIGN',
      tagline: 'AI-Powered Personal Designer Engine',
      description: 'An AI-powered design environment helping developers construct interfaces and styling tokens dynamically. Implements visual layout algorithms and seamless UX structures.',
      skills: ['React.js', 'Node.js', 'CSS', 'Figma', 'Stitch'],
      links: { github: 'github.com/piyush-of/MUSE-Personal-Designer' },
      color: 'var(--neon-cyan)',
      // Cute robot face outline
      svgPaths: [
        'M 16 32 A 16 16 0 0 1 48 32 L 48 44 A 4 4 0 0 1 44 48 L 20 48 A 4 4 0 0 1 16 44 Z', // Head
        'M 22 36 A 2.5 2.5 0 1 1 27 36 M 37 36 A 2.5 2.5 0 1 1 42 36', // Eyes
        'M 28 42 L 36 42', // Mouth
        'M 32 16 L 32 8 M 28 8 L 36 8', // Antenna
        'M 12 52 L 20 44 L 24 48 Z' // Brush
      ],
      svgFill: ['rgba(0, 229, 255, 0.12)', 'none', 'none', 'none', 'var(--neon-cyan)']
    },
    {
      id: 'bhagavata',
      title: 'Bhagavata — Devotional App',
      type: 'project',
      badge: 'MISSION: SPIRITUAL',
      tagline: 'Immersive Devotional Experience',
      description: 'A beautifully crafted web app offering textual readings, spiritual guidelines, and calming ambient soundscapes. Built to provide a meditative focus portal.',
      skills: ['HTML', 'CSS', 'JavaScript', 'PHP'],
      links: { github: 'github.com/piyush-of/Bhagavata' },
      color: 'var(--neon-purple)',
      // Lotus flower outline
      svgPaths: [
        'M 32 12 C 20 26 14 38 32 54 C 50 38 44 26 32 12 Z', // Center petal
        'M 32 26 C 10 32 14 46 32 54 Z', // Left petal
        'M 32 26 C 54 32 50 46 32 54 Z', // Right petal
        'M 18 52 C 24 58 40 58 46 52 Z' // Lotus base
      ],
      svgFill: ['rgba(189, 0, 255, 0.12)', 'rgba(189, 0, 255, 0.08)', 'rgba(189, 0, 255, 0.08)', 'var(--neon-purple)']
    },
    {
      id: 'lookism',
      title: 'Lookism',
      type: 'project',
      badge: 'MISSION: AESTHETICS',
      tagline: 'Aesthetic Web Visualizer',
      description: 'A high-contrast visual showcase built to explore cells, outline borders, fluid hover micro-interactions, and visual layouts designed to elevate interface delight.',
      skills: ['JavaScript', 'CSS', 'HTML', 'Canva'],
      links: { github: 'github.com/piyush-of/Lookism' },
      color: 'var(--neon-amber)',
      // Futuristic glasses outline
      svgPaths: [
        'M 10 26 L 28 26 L 25 40 L 13 40 Z', // Left lens
        'M 36 26 L 54 26 L 51 40 L 39 40 Z', // Right lens
        'M 28 30 L 36 30', // Bridge
        'M 8 20 L 56 20 M 14 14 L 50 14' // Speedlines
      ],
      svgFill: ['rgba(255, 145, 0, 0.15)', 'rgba(255, 145, 0, 0.15)', 'none', 'none']
    },
    {
      id: 'dsa',
      title: 'DSA Metrics',
      type: 'skills',
      badge: 'MODULE: LOGIC',
      tagline: 'Data Structures & Algorithms Repository',
      description: 'Mastery in algorithmic problem solving and time-complexity constraints. Proficient in structure optimizations, dynamic trees, and recursion graphs.',
      skillGroups: [
        { name: 'Core Languages', items: ['C++', 'Python', 'JavaScript', 'SQL'] },
        { name: 'Structures & Tech', items: ['Trees', 'Graphs', 'Dynamic Programming', 'Recursion', 'Binary Search'] }
      ],
      color: 'var(--neon-green)',
      // Angular braces / swords
      svgPaths: [
        'M 14 50 L 50 14 M 44 12 L 52 20', // Diagonal line
        'M 50 50 L 14 14 M 20 12 L 12 20', // Diagonal line 2
        'M 18 44 L 22 48 M 42 44 L 46 48'  // Trims
      ],
      svgFill: []
    },
    {
      id: 'ece',
      title: 'ECE Hardware Node',
      type: 'skills',
      badge: 'MODULE: HARDWARE',
      tagline: 'IIITDM Jabalpur ECE Undergraduate',
      description: 'Training in core Electronics & Communication Engineering. Fascinated by circuit design, IoT protocols, microcontrollers, and logic synthesis.',
      skillGroups: [
        { name: 'Hardware Competency', items: ['Signals & Systems', 'Digital Logic Gates', 'Microcontrollers', 'Framer / PCB Design'] },
        { name: 'Design Systems', items: ['Figma Tokenization', 'Canvas Visuals', 'Stitch Tools'] }
      ],
      color: 'var(--neon-purple)',
      // Oscillating frequency waveform outline
      svgPaths: [
        'M 8 32 L 20 32 L 24 20 L 28 44 L 32 20 L 36 44 L 40 32 L 56 32', // Schematic wave
        'M 18 16 L 46 16 L 46 48 L 18 48 Z' // Frame outline
      ],
      svgFill: ['none', 'rgba(189, 0, 255, 0.08)']
    },
    {
      id: 'bio',
      title: 'Pilot Dossier Capsule',
      type: 'bio',
      badge: 'MODULE: DATA',
      tagline: 'Piyush Kumawat Profile Info',
      description: 'B.Tech student at IIITDM Jabalpur. Blending technical engineering discipline with creative UI/UX styling to construct interactive software dashboards.',
      timeline: [
        { year: '2025 - 2029', title: 'B.Tech - ECE', sub: 'PDPM IIITDM Jabalpur' },
        { year: 'Graduated 2025', title: 'Higher Secondary', sub: 'Euro International School' }
      ],
      interests: ['Interactive UI/UX', 'System Telemetry', 'DSA Arenas', 'Open Source Sync'],
      color: 'var(--neon-cyan)',
      // Star diploma scroll outline
      svgPaths: [
        'M 14 14 L 50 14 C 54 14 54 22 50 22 L 14 22 C 10 22 10 14 14 14 Z', // Scroll top
        'M 16 22 L 16 46 C 16 52 20 52 20 46 M 48 22 L 48 46 C 48 52 52 52 52 46', // Side flaps
        'M 32 22 L 32 38 L 27 34 L 32 38 L 37 34' // Ribbon pointer
      ],
      svgFill: ['rgba(0, 229, 255, 0.1)', 'none', 'none']
    },
    {
      id: 'contact',
      title: 'Transmitter Signal Beacon',
      type: 'contact',
      badge: 'MODULE: COMMS',
      tagline: 'Establish Communications Beam',
      description: 'Ready to sync signals? Fill out the coordinates form below and broadcast directly to my cockpit receiver.',
      phone: '+91-9666032914',
      email: 'piyush.kumawat@gmail.com',
      color: 'var(--neon-amber)',
      // Telemetry dish transmitter outline
      svgPaths: [
        'M 12 24 A 20 20 0 0 1 52 24', // Outer arc
        'M 32 24 L 32 46 L 22 52 L 42 52', // Stand leg
        'M 24 16 A 8 8 0 0 1 40 16 M 28 10 A 4 4 0 0 1 36 10' // Signal waves
      ],
      svgFill: []
    }
  ];

  const handleSelectPore = (project) => {
    setSelectedProject(project);
    // Smoothly scroll cockpit HUD section into view when interactive elements are clicked
    const element = document.getElementById('home');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleContactSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = data.get('name')?.toString().trim();
    const email = data.get('email')?.toString().trim();
    const message = data.get('message')?.toString().trim();
    const subject = encodeURIComponent(`Portfolio message from ${name || 'visitor'}`);
    const body = encodeURIComponent(`${message}\n\nFrom: ${name}\nEmail: ${email}`);

    window.location.href = `mailto:piyush.kumawat@gmail.com?subject=${subject}&body=${body}`;
    event.currentTarget.reset();
  };

  return (
    <div className="space-bg">
      {/* Floating navigation bar */}
      <nav className="site-nav">
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '12px',
            height: '12px',
            borderRadius: '50%',
            backgroundColor: 'var(--neon-cyan)',
            boxShadow: '0 0 8px var(--neon-cyan)'
          }}></div>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', fontWeight: 'bold', letterSpacing: '1.5px' }}>
            PK-VOYAGER // HUB
          </span>
        </div>

        <div className="nav-links">
          <a href="#home" className="cyber-btn" style={{ fontSize: '9px', padding: '6px 12px' }}>[ BRIDGE ]</a>
          <a href="#works" className="cyber-btn" style={{ fontSize: '9px', padding: '6px 12px' }}>[ MISSIONS ]</a>
          <a href="#about" className="cyber-btn" style={{ fontSize: '9px', padding: '6px 12px' }}>[ LOGS ]</a>
          <a href="#contact" className="cyber-btn" style={{ fontSize: '9px', padding: '6px 12px' }}>[ SIGNAL ]</a>
          
          {/* Skewed Light/Dark toggler */}
          <button 
            onClick={toggleTheme}
            className="cyber-btn"
            style={{ 
              fontSize: '9px', 
              padding: '6px 12px',
              borderColor: 'var(--neon-cyan)',
              color: 'var(--neon-cyan)',
              marginLeft: '10px'
            }}
          >
            [ THEME: {isLightTheme ? 'LIGHT' : 'DARK'} ]
          </button>
        </div>
      </nav>

      {/* Starfield drift layer */}
      <div className="stars-overlay"></div>

      {/* SECTION 1: Space Cockpit Interactive Command Deck (Hero) */}
      <section id="home" className="page-section" style={{ minHeight: '100vh', justifyContent: 'flex-start' }}>
        <div className="hud-frame">
          {/* Left Console: Pilot telemetry, clock & avatar */}
          <ControlDeck 
            onSelectBio={() => handleSelectPore(projectsData.find(p => p.id === 'bio'))}
            onSelectContact={() => handleSelectPore(projectsData.find(p => p.id === 'contact'))}
            isLightTheme={isLightTheme}
          />

          {/* Center: The Holographic Coordinate Star Sphere */}
          <div className="hologram-viewport">
            <div style={{
              position: 'absolute',
              top: '14px',
              fontFamily: 'var(--font-mono)',
              fontSize: '10.5px',
              color: 'var(--neon-cyan)',
              letterSpacing: '2px',
              textAlign: 'center',
              width: '100%',
              pointerEvents: 'none',
              textShadow: '0 0 8px rgba(0, 229, 255, 0.3)'
            }}>
              [ HOLOGRAPHIC GALACTIC COORDINATE MAP ]
            </div>

            <ProjectSphere 
              projects={projectsData} 
              onSelectProject={handleSelectPore}
              activeId={selectedProject?.id}
            />

            <div style={{
              position: 'absolute',
              bottom: '16px',
              fontFamily: 'var(--font-mono)',
              fontSize: '10px',
              color: 'var(--text-dim)',
              textAlign: 'center',
              width: '100%',
              pointerEvents: 'none',
              letterSpacing: '0.5px'
            }}>
              * DRAG STARFIELD TO SPIN CONSTELLATIONS * CLICK AN ORBITAL PORT TO DETECT LOGS *
            </div>
          </div>

          {/* Right Console: Diagnostic CRT Screen and Detail Log */}
          <ProjectOverlay 
            selectedProject={selectedProject} 
            onClose={() => setSelectedProject(null)}
          />
        </div>
      </section>

      {/* SECTION 2: Celestial Missions Grid (Works) */}
      <section id="works" className="page-section">
        <div className="section-header">
          <h2 className="section-title">Celestial Missions</h2>
          <span className="section-subtitle">Active project nodes loaded in workspace</span>
        </div>

        <div className="works-grid">
          {projectsData.filter(p => p.type === 'project').map((project) => (
            <div key={project.id} className="work-card">
              <div className="corner-trim trim-tl"></div>
              <div className="corner-trim trim-tr"></div>
              <div className="corner-trim trim-bl"></div>
              <div className="corner-trim trim-br"></div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span className="cyber-title-badge" style={{ borderColor: project.color, background: 'none', color: project.color }}>
                  {project.badge}
                </span>
                <div style={{ width: '28px', height: '28px', color: project.color }}>
                  <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    {project.svgPaths.map((d, i) => (
                      <path key={i} d={d} fill={project.svgFill[i] || 'none'} />
                    ))}
                  </svg>
                </div>
              </div>

              <div>
                <h3 style={{ fontSize: '18px', fontWeight: '700', textTransform: 'uppercase', color: 'var(--text-white)' }}>
                  {project.title}
                </h3>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--neon-cyan)', display: 'block', marginTop: '2px' }}>
                  {project.tagline}
                </span>
              </div>

              <p style={{ fontSize: '13px', lineHeight: '1.6', color: 'var(--text-dim)' }}>
                {project.description}
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: 'auto' }}>
                {project.skills.map(skill => (
                  <span key={skill} style={{
                    fontSize: '9.5px',
                    fontFamily: 'var(--font-mono)',
                    border: '1px solid rgba(128,128,128,0.15)',
                    padding: '2px 6px',
                    borderRadius: '4px',
                    background: 'rgba(255,255,255,0.01)',
                    color: 'var(--text-dim)'
                  }}>
                    {skill}
                  </span>
                ))}
              </div>

              {project.links && (
                <a 
                  href={`https://${project.links.github}`} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="cyber-btn"
                  style={{ textDecoration: 'none', marginTop: '10px' }}
                >
                  DEPLOY SOURCE
                </a>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 3: Diagnostic Dossier Logs (About) */}
      <section id="about" className="page-section">
        <div className="section-header" style={{ borderLeftColor: 'var(--neon-cyan)' }}>
          <h2 className="section-title">Diagnostic Logs</h2>
          <span className="section-subtitle">Biography timeline & loaded competencies</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '40px', width: '100%', marginTop: '20px' }}>
          
          {/* Timeline Panel */}
          <div className="cyber-panel" style={{ padding: '30px' }}>
            <div className="corner-trim trim-tl"></div>
            <div className="corner-trim trim-tr"></div>
            <div className="corner-trim trim-bl"></div>
            <div className="corner-trim trim-br"></div>

            <h3 style={{ fontFamily: 'var(--font-mono)', fontSize: '15px', color: 'var(--neon-cyan)', marginBottom: '24px' }}>
              &gt;_ CHRONOLOGY_TIMELINE
            </h3>

            <div className="chronology-track">
              {projectsData.find(p => p.id === 'bio').timeline.map((item, idx) => (
                <div key={idx} className="chronology-node">
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--neon-cyan)', fontWeight: 'bold' }}>
                    [{item.year}]
                  </span>
                  <h4 style={{ fontSize: '15px', fontWeight: 'bold', color: 'var(--text-white)' }}>
                    {item.title}
                  </h4>
                  <span style={{ fontSize: '12px', color: 'var(--text-dim)' }}>
                    {item.sub}
                  </span>
                </div>
              ))}
            </div>

            <h3 style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', color: 'var(--neon-purple)', marginTop: '30px', marginBottom: '14px' }}>
              &gt;_ PILOT_INTERESTS
            </h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {projectsData.find(p => p.id === 'bio').interests.map(int => (
                <span key={int} style={{
                  background: 'rgba(189, 0, 255, 0.05)',
                  border: '1px solid rgba(189, 0, 255, 0.2)',
                  color: 'var(--text-white)',
                  padding: '3px 10px',
                  borderRadius: '6px',
                  fontSize: '11px',
                  fontFamily: 'var(--font-hand)'
                }}>
                  {int}
                </span>
              ))}
            </div>
          </div>

          {/* Skills Competencies Panel */}
          <div className="cyber-panel" style={{ padding: '30px', gap: '20px' }}>
            <div className="corner-trim trim-tl"></div>
            <div className="corner-trim trim-tr"></div>
            <div className="corner-trim trim-bl"></div>
            <div className="corner-trim trim-br"></div>

            <h3 style={{ fontFamily: 'var(--font-mono)', fontSize: '15px', color: 'var(--neon-cyan)', marginBottom: '10px' }}>
              &gt;_ REGISTERED_MODULES
            </h3>

            {/* DSA & ECE skill packs */}
            {projectsData.filter(p => p.type === 'skills').map((skillPack) => (
              <div key={skillPack.id} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <span className="cyber-title-badge" style={{ alignSelf: 'flex-start', background: skillPack.color === 'var(--neon-green)' ? 'rgba(0, 230, 118, 0.06)' : 'rgba(189, 0, 255, 0.06)', borderColor: skillPack.color, color: skillPack.color }}>
                  {skillPack.badge}
                </span>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {skillPack.skillGroups.map((group, i) => (
                    <div key={i} style={{ background: 'rgba(255,255,255,0.015)', border: '1px solid rgba(128,128,128,0.1)', padding: '10px 14px', borderRadius: '8px' }}>
                      <span style={{ fontSize: '10px', fontFamily: 'var(--font-mono)', color: 'var(--text-dim)', display: 'block', marginBottom: '4px' }}>
                        {group.name}
                      </span>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                        {group.items.map(item => (
                          <span key={item} style={{
                            border: '1px solid rgba(128,128,128,0.15)',
                            background: 'rgba(0,0,0,0.15)',
                            padding: '2px 6px',
                            borderRadius: '4px',
                            fontSize: '10.5px',
                            fontFamily: 'var(--font-mono)',
                            color: 'var(--text-white)'
                          }}>
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* SECTION 4: Contact Transmitter Beam (Contact) */}
      <section id="contact" className="page-section" style={{ minHeight: 'auto', paddingBottom: '100px' }}>
        <div className="section-header" style={{ borderLeftColor: 'var(--neon-amber)' }}>
          <h2 className="section-title">Comms Transmitter</h2>
          <span className="section-subtitle">Sync signal coordinates to connect</span>
        </div>

        <div className="contact-wrapper">
          {/* Signal Form Panel */}
          <div className="cyber-panel" style={{ padding: '30px' }}>
            <div className="corner-trim trim-tl"></div>
            <div className="corner-trim trim-tr"></div>
            <div className="corner-trim trim-bl"></div>
            <div className="corner-trim trim-br"></div>

            <h3 style={{ fontFamily: 'var(--font-mono)', fontSize: '15px', color: 'var(--neon-cyan)', marginBottom: '20px' }}>
              &gt;_ TRANSMIT_MESSAGE
            </h3>

            <div style={{ width: '100%' }}>
              <form onSubmit={handleContactSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--neon-cyan)' }}>
                    &gt;_ IDENTIFIER (NAME)
                  </label>
                  <input 
                    type="text" 
                    name="name"
                    autoComplete="name"
                    required 
                    style={{ 
                      border: '1px solid rgba(0, 229, 255, 0.25)', 
                      padding: '10px', 
                      borderRadius: '6px',
                      fontFamily: 'var(--font-mono)', 
                      background: 'rgba(2, 4, 15, 0.8)',
                      color: '#ffffff',
                      fontSize: '12px'
                    }}
                  />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--neon-cyan)' }}>
                    &gt;_ TRANSMITTER_EMAIL
                  </label>
                  <input 
                    type="email" 
                    name="email"
                    autoComplete="email"
                    required 
                    style={{ 
                      border: '1px solid rgba(0, 229, 255, 0.25)', 
                      padding: '10px', 
                      borderRadius: '6px',
                      fontFamily: 'var(--font-mono)', 
                      background: 'rgba(2, 4, 15, 0.8)',
                      color: '#ffffff',
                      fontSize: '12px'
                    }}
                  />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--neon-cyan)' }}>
                    &gt;_ COMMS_STREAM
                  </label>
                  <textarea 
                    name="message"
                    required 
                    rows="4" 
                    style={{ 
                      border: '1px solid rgba(0, 229, 255, 0.25)', 
                      padding: '10px', 
                      borderRadius: '6px',
                      fontFamily: 'var(--font-mono)', 
                      background: 'rgba(2, 4, 15, 0.8)',
                      color: '#ffffff',
                      resize: 'none',
                      fontSize: '12px'
                    }}
                  ></textarea>
                </div>
                <button 
                  type="submit" 
                  className="cyber-btn" 
                  style={{ 
                    marginTop: '8px',
                    borderColor: 'var(--neon-cyan)',
                    color: 'var(--text-white)'
                  }}
                >
                  BROADCAST BEACON SIGNAL
                </button>
              </form>
            </div>
          </div>

          {/* Quick Direct Link Terminal */}
          <div className="cyber-panel" style={{ padding: '30px', justifyContent: 'center', gap: '20px' }}>
            <div className="corner-trim trim-tl"></div>
            <div className="corner-trim trim-tr"></div>
            <div className="corner-trim trim-bl"></div>
            <div className="corner-trim trim-br"></div>

            <h3 style={{ fontFamily: 'var(--font-mono)', fontSize: '15px', color: 'var(--neon-cyan)' }}>
              &gt;_ CORRESPONDENCE_LINK
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px', fontFamily: 'var(--font-mono)' }}>
              <p>&gt; PHONE: +91-9666032914</p>
              <p>&gt; EMAIL: piyush.kumawat@gmail.com</p>
              <p>&gt; COORDS: IIITDM JABALPUR, MP, INDIA</p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '10px' }}>
              <a href="https://linkedin.com/in/piyush-kumawat-1a92ba386" target="_blank" rel="noreferrer" className="cyber-btn" style={{ textDecoration: 'none' }}>
                LINKEDIN
              </a>
              <a href="https://github.com/piyush-of" target="_blank" rel="noreferrer" className="cyber-btn" style={{ textDecoration: 'none' }}>
                GITHUB
              </a>
              <a href="https://leetcode.com/u/piyush_of" target="_blank" rel="noreferrer" className="cyber-btn" style={{ textDecoration: 'none' }}>
                LEETCODE
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        width: '100%',
        padding: '30px 40px',
        borderTop: '1px solid var(--glass-border)',
        background: 'var(--glass-bg)',
        textAlign: 'center',
        fontSize: '11px',
        fontFamily: 'var(--font-mono)',
        color: 'var(--text-dim)',
        zIndex: 1,
        position: 'relative'
      }}>
        © 2026 PIYUSH KUMAWAT. ALL BEACONS EMITTED.
      </footer>
    </div>
  );
}
