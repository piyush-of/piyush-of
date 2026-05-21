import { useState, useEffect, useRef, useMemo } from 'react';
import ProjectPore from './ProjectPore';

// Fibonacci Sphere node generator
const generateSphereNodes = (count, radius) => {
  const nodes = [];
  const goldenRatio = (1 + Math.sqrt(5)) / 2;

  for (let i = 0; i < count; i++) {
    // Latitude (theta) from 0 to PI
    const theta = Math.acos(1 - 2 * (i + 0.5) / count);
    // Longitude (phi)
    const phi = (2 * Math.PI * i) / goldenRatio;

    // Convert spherical coordinates to 3D Cartesian coordinates
    const x0 = Math.sin(theta) * Math.cos(phi);
    const y0 = Math.sin(theta) * Math.sin(phi);
    const z0 = Math.cos(theta);

    nodes.push({
      id: i,
      x0: x0 * radius,
      y0: y0 * radius,
      z0: z0 * radius,
    });
  }
  return nodes;
};

export default function ProjectSphere({ projects, onSelectProject, activeId }) {
  const radius = 170; // Sphere radius in px
  const nodes = useMemo(() => generateSphereNodes(projects.length, radius), [projects.length, radius]);
  const [rotation, setRotation] = useState({ pitch: 0.3, yaw: 0.5 }); // Initial angles
  const [isDragging, setIsDragging] = useState(false);

  const dragStart = useRef({ x: 0, y: 0 });
  const rotationStart = useRef({ pitch: 0, yaw: 0 });
  const velocity = useRef({ x: 0, y: 0 });
  const requestRef = useRef();

  // Inertia physics animation loop
  useEffect(() => {
    const updatePhysics = () => {
      if (!isDragging) {
        // Apply friction
        velocity.current.x *= 0.94;
        velocity.current.y *= 0.94;

        // Apply rotation from velocity
        if (Math.abs(velocity.current.x) > 0.001 || Math.abs(velocity.current.y) > 0.001) {
          setRotation(prev => ({
            pitch: prev.pitch + velocity.current.y,
            yaw: prev.yaw + velocity.current.x
          }));
        }
      }
      requestRef.current = requestAnimationFrame(updatePhysics);
    };

    requestRef.current = requestAnimationFrame(updatePhysics);
    return () => cancelAnimationFrame(requestRef.current);
  }, [isDragging]);

  // Mouse/Touch Drag Handlers
  const handleStart = (clientX, clientY) => {
    setIsDragging(true);
    dragStart.current = { x: clientX, y: clientY };
    rotationStart.current = { ...rotation };
    velocity.current = { x: 0, y: 0 };
  };

  const handleMove = (clientX, clientY) => {
    if (!isDragging) return;
    const dx = clientX - dragStart.current.x;
    const dy = clientY - dragStart.current.y;

    // Sensitivities
    const speed = 0.006;
    const nextYaw = rotationStart.current.yaw + dx * speed;
    const nextPitch = rotationStart.current.pitch - dy * speed; // inverted Y

    // Constrain pitch to avoid gimbal lock flip, though sphere feels better if constrained slightly
    const pitchLimit = Math.PI / 2.2;
    const constrainedPitch = Math.max(-pitchLimit, Math.min(pitchLimit, nextPitch));

    velocity.current = {
      x: dx * speed * 0.15,
      y: -dy * speed * 0.15
    };

    setRotation({
      pitch: constrainedPitch,
      yaw: nextYaw
    });
  };

  const handleEnd = () => {
    setIsDragging(false);
  };

  // Convert raw 3D coordinates based on pitch & yaw rotation matrices
  const getRotatedNodes = () => {
    const { pitch, yaw } = rotation;

    const cosP = Math.cos(pitch);
    const sinP = Math.sin(pitch);
    const cosY = Math.cos(yaw);
    const sinY = Math.sin(yaw);

    return nodes.map(node => {
      const { x0, y0, z0 } = node;

      // 1. Rotate around X-axis (Pitch)
      const x1 = x0;
      const y1 = y0 * cosP - z0 * sinP;
      const z1 = y0 * sinP + z0 * cosP;

      // 2. Rotate around Y-axis (Yaw)
      const x2 = x1 * cosY + z1 * sinY;
      const y2 = y1;
      const z2 = -x1 * sinY + z1 * cosY;

      return {
        ...node,
        project: projects[node.id],
        x: x2,
        y: y2,
        z: z2, // Depth coordinate
      };
    });
  };

  const rotatedNodes = getRotatedNodes();

  // Sort nodes by Z-depth so that elements at the front overlap those in the back
  const sortedNodes = [...rotatedNodes].sort((a, b) => a.z - b.z);

  return (
    <div 
      className="sphere-container"
      style={{
        position: 'relative',
        width: '420px',
        height: '420px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: isDragging ? 'grabbing' : 'grab',
        touchAction: 'none'
      }}
      onMouseDown={(e) => handleStart(e.clientX, e.clientY)}
      onMouseMove={(e) => handleMove(e.clientX, e.clientY)}
      onMouseUp={handleEnd}
      onMouseLeave={handleEnd}
      onTouchStart={(e) => handleStart(e.touches[0].clientX, e.touches[0].clientY)}
      onTouchMove={(e) => {
        e.preventDefault();
        handleMove(e.touches[0].clientX, e.touches[0].clientY);
      }}
      onTouchEnd={handleEnd}
    >
      {/* Space HUD orbits and coordinates radar */}
      <div className="orbit-line orbit-1"></div>
      <div className="orbit-line orbit-2"></div>
      <div className="orbit-line orbit-3"></div>
      <div className="radar-mesh"></div>

      {/* Sphere Central Core Nebula Light */}
      <div style={{
        position: 'absolute',
        width: '150px',
        height: '150px',
        background: 'radial-gradient(circle, rgba(0, 229, 255, 0.15) 0%, transparent 70%)',
        borderRadius: '50%',
        pointerEvents: 'none'
      }}></div>

      {/* Render the nodes (Pores) sorted by depth */}
      {sortedNodes.map(node => {
        if (!node.project) return null;

        // Calculate depth visual indicators
        // z varies from -radius to +radius
        const normalizedZ = (node.z + radius) / (2 * radius); // 0 to 1
        const scale = 0.6 + 0.55 * normalizedZ; // scale from 0.6 to 1.15
        const opacity = 0.25 + 0.75 * normalizedZ; // opacity from 0.25 to 1.0
        const zIndex = Math.round(node.z + radius) + 10;

        return (
          <ProjectPore
            key={node.id}
            project={node.project}
            x={node.x}
            y={node.y}
            scale={scale}
            opacity={opacity}
            zIndex={zIndex}
            isFront={node.z > 20} // active detection for front face items
            isActive={activeId === node.project.id}
            onClick={() => onSelectProject(node.project)}
          />
        );
      })}
    </div>
  );
}
