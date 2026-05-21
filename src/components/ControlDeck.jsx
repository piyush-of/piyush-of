import { useState, useEffect } from 'react';

export default function ControlDeck({ onSelectBio, onSelectContact, isLightTheme }) {
  const [time, setTime] = useState('');

  // Update clock live in IST/GMT format
  useEffect(() => {
    const updateTime = () => {
      const date = new Date();
      const options = { timeZone: 'Asia/Kolkata', hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' };
      setTime(date.toLocaleTimeString('en-US', options) + ' IST');
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div 
      className="cyber-panel" 
      style={{ 
        width: '320px', 
        height: '100%', 
        padding: '22px', 
        display: 'flex', 
        flexDirection: 'column', 
        gap: '20px',
        flexShrink: 0
      }}
    >
      {/* HUD trim corners */}
      <div className="corner-trim trim-tl"></div>
      <div className="corner-trim trim-tr"></div>
      <div className="corner-trim trim-bl"></div>
      <div className="corner-trim trim-br"></div>

      {/* Cockpit Status Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span className="cyber-title-badge">COCKPIT MAIN</span>
        <div className="status-indicator">
          <span className="pulse-dot"></span>
          <span>ONLINE</span>
        </div>
      </div>

      {/* Avatar Scan Window */}
      <div style={{
        width: '100%',
        height: '160px',
        border: '1px solid rgba(0, 229, 255, 0.3)',
        borderRadius: '8px',
        background: 'rgba(2, 4, 15, 0.8)',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: '0 0 15px rgba(0, 229, 255, 0.05)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        {/* Animated matrix scanning laser sweep */}
        <div style={{
          position: 'absolute',
          top: 0, left: 0, right: 0, height: '1.5px',
          background: 'var(--neon-cyan)',
          boxShadow: '0 0 10px var(--neon-cyan)',
          animation: 'radar-sweep 4s linear infinite',
          zIndex: 2,
        }}></div>

        {/* Real Generated Pilot Image (Swaps based on Light/Dark theme) */}
        <img 
          src={isLightTheme ? '/light_avatar.png' : '/avatar.png'} 
          alt="Pilot Avatar" 
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: 0.9,
            filter: isLightTheme ? 'none' : 'hue-rotate(0deg) contrast(1.15) saturate(1.2)'
          }}
        />

        {/* HUD Data Readout Overlay */}
        <div style={{
          position: 'absolute',
          bottom: '8px',
          left: '8px',
          color: 'var(--neon-cyan)',
          fontFamily: 'var(--font-mono)',
          fontSize: '9px',
          lineHeight: '1.3',
          textShadow: '0 0 5px rgba(0, 229, 255, 0.4)',
          background: 'rgba(2, 4, 15, 0.65)',
          padding: '2px 6px',
          borderRadius: '4px',
          border: '1px solid rgba(0, 229, 255, 0.15)'
        }}>
          PILOT ID: PK-2026<br />
          LOC: {time}
        </div>
      </div>

      {/* Pilot Profile Metadata */}
      <div style={{ borderBottom: '1px dashed rgba(0, 229, 255, 0.2)', paddingBottom: '14px' }}>
        <h1 style={{ 
          fontFamily: 'var(--font-main)', 
          fontSize: '22px', 
          fontWeight: '700', 
          textTransform: 'uppercase', 
          letterSpacing: '-0.5px',
          color: 'var(--text-white)' 
        }}>
          Piyush Kumawat
        </h1>
        <p style={{ 
          fontFamily: 'var(--font-mono)', 
          fontSize: '11px', 
          color: 'var(--neon-cyan)', 
          marginTop: '3px',
          letterSpacing: '1px',
          fontWeight: '600'
        }}>
          ECE UNDERGRAD / CORE WEB DEV
        </p>
      </div>

      {/* Cybernetic Objective Capsule */}
      <div 
        style={{ 
          fontSize: '12.5px', 
          lineHeight: '1.5', 
          cursor: 'pointer',
          background: 'rgba(0, 229, 255, 0.02)',
          border: '1px solid rgba(0, 229, 255, 0.06)',
          padding: '10px 14px',
          borderRadius: '8px'
        }} 
        onClick={onSelectBio}
      >
        <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--neon-cyan)', fontSize: '10px', fontWeight: 'bold', display: 'block', marginBottom: '4px' }}>
          &gt;_ TELEMETRY_NOTES
        </span>
        <p style={{ fontFamily: 'var(--font-hand)', fontSize: '13.5px', color: 'var(--text-dim)', letterSpacing: '0.2px' }}>
          ECE undergrad at IIITDM Jabalpur. Merging hardware precision with modern UI/UX design to build interactive products.
        </p>
      </div>

      {/* Radial High-Tech Needles (SVG Ring Progress Gauges) */}
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: '8px', margin: '4px 0' }}>
        {[
          { label: 'DSA', val: '95', color: 'var(--neon-cyan)' },
          { label: 'ECE', val: '80', color: 'var(--neon-purple)' },
          { label: 'UI/UX', val: '100', color: 'var(--neon-green)' }
        ].map((gauge, idx) => {
          const radiusVal = 18;
          const circ = 2 * Math.PI * radiusVal;
          const strokeOffset = circ - (parseInt(gauge.val) / 100) * circ;

          return (
            <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
              <div style={{ position: 'relative', width: '48px', height: '48px' }}>
                <svg width="48" height="48" style={{ transform: 'rotate(-90deg)' }}>
                  {/* Track ring */}
                  <circle cx="24" cy="24" r={radiusVal} fill="transparent" stroke="rgba(128,128,128,0.1)" strokeWidth="3" />
                  {/* Glowing progress ring */}
                  <circle 
                    cx="24" cy="24" r={radiusVal} 
                    fill="transparent" 
                    stroke={gauge.color} 
                    strokeWidth="3.5"
                    strokeDasharray={circ}
                    strokeDashoffset={strokeOffset}
                    style={{ transition: 'stroke-dashoffset 1s ease-out' }}
                  />
                </svg>
                {/* Value display */}
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '9.5px',
                  fontFamily: 'var(--font-mono)',
                  color: 'var(--text-white)'
                }}>
                  {gauge.val}
                </div>
              </div>
              <span style={{ 
                fontFamily: 'var(--font-mono)', 
                fontSize: '9px', 
                fontWeight: 'bold', 
                color: 'var(--text-dim)', 
                marginTop: '6px',
                letterSpacing: '0.5px'
              }}>
                {gauge.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* Cyber Switches Link Deck */}
      <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <button
          type="button"
          className="cyber-btn"
          onClick={onSelectContact}
        >
          OPEN COMMS BEACON
        </button>
        <a 
          href="https://linkedin.com/in/piyush-kumawat-1a92ba386" 
          target="_blank" 
          rel="noreferrer"
          className="cyber-btn"
          style={{ textDecoration: 'none' }}
        >
          LINKEDIN DATA LINK
        </a>
        <a 
          href="https://github.com/piyush-of" 
          target="_blank" 
          rel="noreferrer"
          className="cyber-btn"
          style={{ textDecoration: 'none' }}
        >
          GITHUB CODESYNC
        </a>
        <a 
          href="https://leetcode.com/u/piyush_of" 
          target="_blank" 
          rel="noreferrer"
          className="cyber-btn"
          style={{ textDecoration: 'none' }}
        >
          LEETCODE COMPILER
        </a>
      </div>

      <style>{`
        @keyframes radar-sweep {
          0% { top: 0; }
          50% { top: 100%; }
          100% { top: 0; }
        }
      `}</style>
    </div>
  );
}
