export default function ProjectPore({ project, x, y, scale, opacity, zIndex, isFront, isActive, onClick }) {
  const style = {
    position: 'absolute',
    transform: `translate3d(${x}px, ${y}px, 0) scale(${scale})`,
    opacity: opacity,
    zIndex: zIndex,
    pointerEvents: opacity < 0.45 ? 'none' : 'auto', // disable clicking background items
    transition: 'transform 0.08s linear, opacity 0.08s linear',
  };

  // Space-themed color selection
  const accentColor = project.color || 'var(--neon-cyan)';
  const rimColor = isActive ? accentColor : (isFront ? 'rgba(0, 229, 255, 0.4)' : 'rgba(255, 255, 255, 0.15)');
  
  const glowShadow = isActive 
    ? `0 0 20px ${accentColor}, inset 0 0 10px ${accentColor}`
    : (isFront ? `0 0 10px rgba(0, 229, 255, 0.1)` : 'none');

  return (
    <div 
      className={`project-pore-wrapper ${isActive ? 'active' : ''} ${isFront ? 'front' : 'back'}`}
      style={style}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
    >
      <div 
        className="pore-outer-rim"
        style={{
          width: '76px',
          height: '76px',
          borderRadius: '50%',
          border: `2px solid ${rimColor}`,
          backgroundColor: 'rgba(5, 10, 25, 0.75)',
          boxShadow: glowShadow,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          cursor: 'pointer',
          transition: 'all 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
          backdropFilter: 'blur(4px)',
        }}
      >
        {/* Holographic scanning inner circle */}
        <div style={{
          position: 'absolute',
          top: '3px', left: '3px', right: '3px', bottom: '3px',
          border: `1px solid ${isActive ? accentColor : 'rgba(255,255,255,0.05)'}`,
          borderRadius: '50%',
          pointerEvents: 'none',
        }}></div>

        {/* Project Graphic Content Container */}
        <div 
          className="pore-content"
          style={{
            width: '58px',
            height: '58px',
            borderRadius: '50%',
            background: isActive 
              ? `radial-gradient(circle, rgba(0, 229, 255, 0.15) 0%, rgba(5,10,25,0.9) 100%)`
              : `radial-gradient(circle, rgba(255,255,255,0.03) 0%, rgba(3,5,15,0.95) 100%)`,
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: `1px solid ${isActive ? accentColor : 'rgba(0, 229, 255, 0.1)'}`,
            boxShadow: 'inset 0 0 10px rgba(0,0,0,0.8)',
            transition: 'all 0.25s ease',
          }}
        >
          {/* Custom Project SVG illustration with neon color styling */}
          <svg 
            width="36" 
            height="36" 
            viewBox="0 0 64 64" 
            style={{ 
              fill: 'none', 
              stroke: isActive ? accentColor : 'var(--text-dim)', 
              strokeWidth: '4.5',
              strokeLinecap: 'round',
              strokeLinejoin: 'round',
              filter: isActive ? `drop-shadow(0 0 5px ${accentColor})` : 'none',
              transition: 'stroke 0.25s ease',
            }}
          >
            {project.svgPaths.map((path, idx) => (
              <path key={idx} d={path} fill={project.svgFill?.[idx] || 'none'} />
            ))}
          </svg>
        </div>

        {/* Cosmic glass glare overlay */}
        <div style={{
          position: 'absolute',
          top: '3px', left: '3px', right: '3px', bottom: '3px',
          background: 'linear-gradient(135deg, rgba(0, 229, 255, 0.3) 0%, rgba(255, 255, 255, 0.05) 45%, transparent 46%, transparent 100%)',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 3,
        }}></div>

        {/* Orbit dashboard scanning rings around active pores */}
        {isFront && (
          <div className="pore-ticks" style={{
            position: 'absolute',
            width: '88px',
            height: '88px',
            border: `1px dashed ${isActive ? accentColor : 'rgba(0,229,255,0.2)'}`,
            borderRadius: '50%',
            animation: 'spin 15s linear infinite',
            pointerEvents: 'none',
            zIndex: -1,
          }}></div>
        )}

        {/* Cyber-styled Hover Tooltip Badge */}
        {isFront && (
          <div 
            className="pore-tooltip"
            style={{
              position: 'absolute',
              bottom: '-34px',
              backgroundColor: 'rgba(6, 12, 30, 0.95)',
              color: isActive ? accentColor : 'var(--text-white)',
              fontFamily: 'var(--font-mono)',
              fontSize: '10px',
              fontWeight: 'bold',
              padding: '4px 10px',
              border: `1px solid ${isActive ? accentColor : 'var(--neon-cyan)'}`,
              borderRadius: '4px',
              whiteSpace: 'nowrap',
              transform: 'scale(0.85)',
              opacity: 0,
              boxShadow: `0 0 10px rgba(0, 229, 255, 0.1)`,
              transition: 'all 0.2s cubic-bezier(0.25, 0.8, 0.25, 1)',
              pointerEvents: 'none',
              letterSpacing: '0.5px',
            }}
          >
            {project.title.toUpperCase()}
          </div>
        )}
      </div>

      <style>{`
        .project-pore-wrapper:hover .pore-outer-rim {
          transform: scale(1.15);
          border-color: var(--neon-cyan);
          box-shadow: 0 0 25px var(--neon-cyan);
        }
        .project-pore-wrapper:hover .pore-tooltip {
          opacity: 1;
          transform: scale(1) translateY(-2px);
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
