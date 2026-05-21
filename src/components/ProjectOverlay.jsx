import { useState, useEffect } from 'react';

const standbyLogs = [
  'SYS_INIT: Quantum orbital telemetry Online.',
  'BEACON_ACQUISITION: SNR +42.8dB [IIITDM-JABALPUR]',
  'NEBULA_DENSITY: 0.147x10^-6 particles/m3',
  'GRAVITY_VECTOR: 9.806m/s2 [Locked on Sol-3]',
  'DSA_CORE_STATUS: Matrix tree recursion OK',
  'ECE_MODULE_VOLTAGE: 3.3V bias - stable',
  'UI_FRAME_BUFFER: 60Hz Glassmorphic Refresh',
  'SOLAR_WIND_DEFLECTION: Magnetosphere: 98.4%',
  'PILOT_COGNITION: Piyush Kumawat [ECE Undergrad]'
];

export default function ProjectOverlay({ selectedProject, onClose }) {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [scrollingLogs, setScrollingLogs] = useState(() => standbyLogs.slice(0, 4));

  // Generate randomized cosmic diagnostic telemetries on standby
  useEffect(() => {
    if (selectedProject) return;

    const interval = setInterval(() => {
      const randomLog = standbyLogs[Math.floor(Math.random() * standbyLogs.length)];
      const timestamp = new Date().toLocaleTimeString('en-US', { hour12: false });
      setScrollingLogs(prev => [...prev.slice(1), `[${timestamp}] ${randomLog}`]);
    }, 4500);

    return () => clearInterval(interval);
  }, [selectedProject]);

  if (!selectedProject) {
    // Futuristic Space Telemetry Standby HUD
    return (
      <div 
        className="cyber-panel telemetry-screen" 
        style={{ 
          flex: 1, 
          padding: '22px', 
          display: 'flex', 
          flexDirection: 'column', 
          height: '100%', 
          borderRadius: '12px' 
        }}
      >
        <div className="corner-trim trim-tl"></div>
        <div className="corner-trim trim-tr"></div>
        <div className="corner-trim trim-bl"></div>
        <div className="corner-trim trim-br"></div>

        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          borderBottom: '1px solid rgba(0, 229, 255, 0.25)', 
          paddingBottom: '10px', 
          marginBottom: '20px',
          fontFamily: 'var(--font-mono)',
          fontSize: '11px',
          color: 'var(--neon-cyan)',
          letterSpacing: '1px'
        }}>
          <span>&gt;_ RADAR: RUNNING</span>
          <span>AETHER-CORE v4.12</span>
        </div>
        
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '22px' }}>
          {/* Glowing blue oscilloscope */}
          <div style={{
            position: 'relative',
            width: '100%',
            height: '120px',
            border: '1px solid rgba(0, 229, 255, 0.15)',
            borderRadius: '6px',
            background: 'rgba(2, 4, 15, 0.6)',
            backgroundImage: `
              linear-gradient(rgba(0, 229, 255, 0.05) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 229, 255, 0.05) 1px, transparent 1px)
            `,
            backgroundSize: '16px 16px',
            overflow: 'hidden'
          }}>
            <svg width="100%" height="100%" style={{ position: 'absolute' }}>
              <path 
                d="M 0 60 Q 30 15, 60 60 T 120 60 T 180 60 T 240 60 T 300 60 T 360 60 T 420 60" 
                fill="none" 
                stroke="var(--neon-cyan)" 
                strokeWidth="2"
                style={{
                  strokeDasharray: '500',
                  animation: 'oscilloscope-pulse 6s linear infinite'
                }}
              />
            </svg>
          </div>

          {/* Interactive Core Instructions */}
          <div style={{ 
            fontSize: '12px', 
            lineHeight: '1.7', 
            fontFamily: 'var(--font-mono)', 
            color: 'var(--text-dim)', 
            display: 'flex', 
            flexDirection: 'column', 
            gap: '6px' 
          }}>
            <p style={{ color: 'var(--neon-cyan)', fontWeight: 'bold' }}>&gt; IDENTITY: PIYUSH KUMAWAT [ECE]</p>
            <p>&gt; ACQUISITION GRID: HOLOGRAPHIC COMPASS ACTIVE</p>
            <p>&gt; CLICK ON A CELESTIAL NODE TO PULL SPECIFIC MISSION DATA.</p>
            <p>&gt; GRAB AND SPIN THE STAR MAP TO NAVIGATE ALL MODULES.</p>
          </div>

          {/* Diagnostic Scrolling Log Stream (Singularity style) */}
          <div style={{
            marginTop: 'auto',
            background: 'rgba(0, 0, 0, 0.3)',
            border: '1px solid rgba(255, 255, 255, 0.05)',
            borderRadius: '6px',
            padding: '10px 14px',
            fontFamily: 'var(--font-mono)',
            fontSize: '9.5px',
            color: 'var(--neon-green)',
            display: 'flex',
            flexDirection: 'column',
            gap: '4px',
            minHeight: '86px'
          }}>
            <span style={{ color: 'rgba(255,255,255,0.3)', display: 'block', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '3px', marginBottom: '4px' }}>
              DIAGNOSTIC TELEMETRY STREAM
            </span>
            {scrollingLogs.map((log, idx) => (
              <div key={idx} style={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                {log}
              </div>
            ))}
          </div>
        </div>

        <div style={{ 
          borderTop: '1px solid rgba(255, 255, 255, 0.1)', 
          paddingTop: '10px', 
          marginTop: '15px',
          fontSize: '10px', 
          fontFamily: 'var(--font-mono)',
          color: 'rgba(255,255,255,0.35)',
          display: 'flex', 
          justifyContent: 'space-between' 
        }}>
          <span>SOLAR SECTOR: IST/GMT</span>
          <span>SYSTEM READY</span>
        </div>

        <style>{`
          @keyframes oscilloscope-pulse {
            0% { stroke-dashoffset: 500; }
            100% { stroke-dashoffset: 0; }
          }
        `}</style>
      </div>
    );
  }

  // Handle message form inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      const subject = encodeURIComponent(`Portfolio message from ${formData.name}`);
      const body = encodeURIComponent(`${formData.message}\n\nFrom: ${formData.name}\nEmail: ${formData.email}`);
      window.location.href = `mailto:${selectedProject.email}?subject=${subject}&body=${body}`;
      setFormSubmitted(true);
      setTimeout(() => {
        setFormSubmitted(false);
        setFormData({ name: '', email: '', message: '' });
      }, 4000);
    }
  };

  // Helper variables for dialog layouts
  const accentColor = selectedProject.color || 'var(--neon-cyan)';

  return (
    <div 
      className="cyber-panel telemetry-screen" 
      style={{ 
        flex: 1, 
        padding: '22px', 
        height: '100%', 
        overflowY: 'auto',
        borderRadius: '12px',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        animation: 'cyber-unfold 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)' 
      }}
    >
      <div className="corner-trim trim-tl"></div>
      <div className="corner-trim trim-tr"></div>
      <div className="corner-trim trim-bl"></div>
      <div className="corner-trim trim-br"></div>

      {/* Screen Header */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)', 
        paddingBottom: '10px' 
      }}>
        <span className="cyber-title-badge" style={{ background: accentColor, border: `1px solid ${accentColor}` }}>
          {selectedProject.badge}
        </span>
        <button 
          className="cyber-btn" 
          onClick={onClose} 
          style={{ padding: '4px 10px', fontSize: '9.5px', borderRadius: '4px' }}
        >
          [ ESC_CLOSE ]
        </button>
      </div>

      {/* Title Segment */}
      <div>
        <h2 style={{ 
          fontFamily: 'var(--font-main)', 
          fontSize: '22px', 
          fontWeight: '700', 
          textTransform: 'uppercase', 
          color: 'var(--text-white)' 
        }}>
          {selectedProject.title}
        </h2>
        {selectedProject.tagline && (
          <p style={{ 
            fontFamily: 'var(--font-hand)', 
            fontSize: '14px', 
            color: 'var(--neon-cyan)', 
            marginTop: '4px',
            borderLeft: `2px solid ${accentColor}`,
            paddingLeft: '10px'
          }}>
            "{selectedProject.tagline}"
          </p>
        )}
      </div>

      {/* Interactive Dialogue/Telemetry logs (Singularity / Koustubh inspired) */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', flex: 1 }}>
        
        {/* Dialogue Bubble 1: Description */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <div className="chat-bubble bubble-user">
            USER@PK-VOYAGER:~$ PULL --detail_manifest
          </div>
          <div className="chat-bubble bubble-sys">
            <span style={{ color: accentColor, fontWeight: 'bold' }}>[TELEMETRY_LOG]:</span> {selectedProject.description}
          </div>
        </div>

        {/* Dynamic content depending on node type */}
        {selectedProject.type === 'project' && (
          <>
            {/* Dialogue Bubble 2: Skills and Stack */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <div className="chat-bubble bubble-user">
                USER@PK-VOYAGER:~$ READ --core_stack
              </div>
              <div className="chat-bubble bubble-sys">
                <span style={{ color: accentColor, fontWeight: 'bold' }}>[COMPILER_STACK]:</span>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '6px' }}>
                  {selectedProject.skills.map(skill => (
                    <span 
                      key={skill} 
                      style={{
                        backgroundColor: 'rgba(0, 229, 255, 0.08)',
                        border: '1px solid rgba(0, 229, 255, 0.25)',
                        color: 'var(--neon-cyan)',
                        padding: '2px 8px',
                        borderRadius: '4px',
                        fontSize: '10px',
                        fontFamily: 'var(--font-mono)'
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Launch Action */}
            {selectedProject.links && (
              <a 
                href={`https://${selectedProject.links.github}`} 
                target="_blank" 
                rel="noreferrer"
                className="cyber-btn"
                style={{ 
                  textAlign: 'center', 
                  marginTop: '6px', 
                  textDecoration: 'none',
                  border: `1px solid ${accentColor}`,
                  color: 'var(--text-white)',
                  background: 'rgba(0, 229, 255, 0.04)'
                }}
              >
                DEPLOY GITHUB SOURCE MATRIX
              </a>
            )}
          </>
        )}

        {selectedProject.type === 'skills' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <div className="chat-bubble bubble-user">
              USER@PK-VOYAGER:~$ PARSE --all_modules
            </div>
            <div className="chat-bubble bubble-sys" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {selectedProject.skillGroups.map((group, idx) => (
                <div key={idx} style={{ 
                  background: 'rgba(255,255,255,0.02)', 
                  border: '1px solid rgba(255,255,255,0.05)',
                  padding: '8px 12px', 
                  borderRadius: '6px' 
                }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 'bold', fontSize: '11px', marginBottom: '4px', color: accentColor }}>
                    [{group.name.toUpperCase()}]
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                    {group.items.map(item => (
                      <span key={item} style={{ 
                        border: '1px solid rgba(255,255,255,0.05)', 
                        background: 'rgba(0,0,0,0.2)', 
                        padding: '1px 5px', 
                        borderRadius: '3px',
                        fontSize: '10px', 
                        fontFamily: 'var(--font-mono)',
                        color: 'var(--text-dim)'
                      }}>
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {selectedProject.type === 'bio' && (
          <>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <div className="chat-bubble bubble-user">
                USER@PK-VOYAGER:~$ LOAD --chronology_manifest
              </div>
              <div className="chat-bubble bubble-sys" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {selectedProject.timeline.map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', gap: '8px', fontSize: '12px' }}>
                    <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 'bold', minWidth: '70px', color: 'var(--neon-cyan)' }}>
                      [{item.year}]
                    </div>
                    <div>
                      <div style={{ fontWeight: 'bold', color: 'var(--text-white)' }}>{item.title}</div>
                      <div style={{ fontSize: '10.5px', color: 'var(--text-dim)' }}>{item.sub}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <div className="chat-bubble bubble-user">
                USER@PK-VOYAGER:~$ READ --core_interests
              </div>
              <div className="chat-bubble bubble-sys">
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {selectedProject.interests.map(int => (
                    <span key={int} style={{ 
                      background: 'rgba(189, 0, 255, 0.06)', 
                      border: '1px solid rgba(189, 0, 255, 0.2)', 
                      padding: '2px 8px', 
                      borderRadius: '4px',
                      fontSize: '11px', 
                      fontFamily: 'var(--font-hand)',
                      color: 'var(--text-white)'
                    }}>
                      {int}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}

        {selectedProject.type === 'contact' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {formSubmitted ? (
              <div style={{ 
                padding: '16px', 
                color: 'var(--neon-green)', 
                border: '1px dashed var(--neon-green)', 
                borderRadius: '8px',
                textAlign: 'center',
                background: 'rgba(0, 230, 118, 0.03)',
                fontFamily: 'var(--font-mono)',
                fontSize: '12px'
              }}>
                <p style={{ fontWeight: 'bold' }}>&gt; TRANSMISSION BROADCASTED...</p>
                <p style={{ fontSize: '10.5px', marginTop: '6px', color: 'var(--text-dim)' }}>
                  SIGNAL BEACON SENT TO PIYUSH KUMAWAT ON SOL-3 CHANNELS.
                </p>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <label style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--neon-cyan)' }}>
                    &gt;_ IDENTIFIER (NAME)
                  </label>
                  <input 
                    type="text" 
                    name="name" 
                    value={formData.name} 
                    onChange={handleInputChange} 
                    required 
                    style={{ 
                      border: '1px solid rgba(0, 229, 255, 0.25)', 
                      padding: '8px', 
                      borderRadius: '6px',
                      fontFamily: 'var(--font-mono)', 
                      background: 'rgba(2, 4, 15, 0.8)',
                      color: 'var(--text-white)',
                      fontSize: '12px'
                    }}
                  />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <label style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--neon-cyan)' }}>
                    &gt;_ SIGNAL_BEACON (EMAIL)
                  </label>
                  <input 
                    type="email" 
                    name="email" 
                    value={formData.email} 
                    onChange={handleInputChange} 
                    required 
                    style={{ 
                      border: '1px solid rgba(0, 229, 255, 0.25)', 
                      padding: '8px', 
                      borderRadius: '6px',
                      fontFamily: 'var(--font-mono)', 
                      background: 'rgba(2, 4, 15, 0.8)',
                      color: 'var(--text-white)',
                      fontSize: '12px'
                    }}
                  />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <label style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--neon-cyan)' }}>
                    &gt;_ TRANSMISSION_CONTENT
                  </label>
                  <textarea 
                    name="message" 
                    value={formData.message} 
                    onChange={handleInputChange} 
                    required 
                    rows="3" 
                    style={{ 
                      border: '1px solid rgba(0, 229, 255, 0.25)', 
                      padding: '8px', 
                      borderRadius: '6px',
                      fontFamily: 'var(--font-mono)', 
                      background: 'rgba(2, 4, 15, 0.8)',
                      color: 'var(--text-white)',
                      resize: 'none',
                      fontSize: '12px'
                    }}
                  ></textarea>
                </div>
                <button 
                  type="submit" 
                  className="cyber-btn" 
                  style={{ 
                    marginTop: '4px',
                    borderColor: 'var(--neon-cyan)',
                    color: 'var(--text-white)'
                  }}
                >
                  BROADCAST DATA STREAM
                </button>
              </form>
            )}

            <div style={{ 
              borderTop: '1px solid rgba(255,255,255,0.08)', 
              paddingTop: '10px', 
              display: 'flex', 
              flexDirection: 'column', 
              gap: '4px', 
              fontSize: '11px',
              fontFamily: 'var(--font-mono)',
              color: 'var(--text-dim)' 
            }}>
              <div><strong>DIRECT COMMS:</strong> {selectedProject.phone}</div>
              <div><strong>RECEIVER EMAIL:</strong> {selectedProject.email}</div>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes cyber-unfold {
          0% { transform: scaleX(0.96) scaleY(0.96); opacity: 0; }
          100% { transform: scaleX(1) scaleY(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
