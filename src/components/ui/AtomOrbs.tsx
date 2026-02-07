import React from 'react';

interface AtomOrbsProps {
  size?: number;
  className?: string;
}

/**
 * Pure-CSS atom-style orbiting orbs.
 * Uses CSS keyframes for buttery-smooth 60 fps animation.
 */
const AtomOrbs: React.FC<AtomOrbsProps> = ({ size = 128, className = '' }) => {
  const radius = size / 2;

  return (
    <div
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{ width: size, height: size }}
    >
      {/* Orbit ring visual hints (subtle) */}
      <div className="atom-ring atom-ring-1" style={{ width: size, height: size }} />
      <div className="atom-ring atom-ring-2" style={{ width: size, height: size }} />
      <div className="atom-ring atom-ring-3" style={{ width: size, height: size }} />

      {/* Orbiting orbs */}
      <div className="atom-orbit atom-orbit-1" style={{ width: size, height: size }}>
        <span className="atom-orb atom-orb-gold" />
      </div>
      <div className="atom-orbit atom-orbit-2" style={{ width: size, height: size }}>
        <span className="atom-orb atom-orb-white" />
      </div>
      <div className="atom-orbit atom-orbit-3" style={{ width: size, height: size }}>
        <span className="atom-orb atom-orb-bronze" />
      </div>
      <div className="atom-orbit atom-orbit-4" style={{ width: size, height: size }}>
        <span className="atom-orb atom-orb-gold-sm" />
      </div>
      <div className="atom-orbit atom-orbit-5" style={{ width: size, height: size }}>
        <span className="atom-orb atom-orb-white-sm" />
      </div>

      <style>{`
        .atom-ring {
          position: absolute;
          top: 0; left: 0;
          border-radius: 50%;
          border: 1px solid rgba(184, 115, 51, 0.08);
        }
        .atom-ring-1 { transform: rotateX(70deg) rotateZ(0deg); }
        .atom-ring-2 { transform: rotateX(70deg) rotateZ(60deg); }
        .atom-ring-3 { transform: rotateX(70deg) rotateZ(120deg); }

        .atom-orbit {
          position: absolute;
          top: 0; left: 0;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }

        .atom-orbit-1 {
          animation: atom-spin-1 4s linear infinite;
        }
        .atom-orbit-2 {
          animation: atom-spin-2 5s linear infinite;
        }
        .atom-orbit-3 {
          animation: atom-spin-3 6s linear infinite;
        }
        .atom-orbit-4 {
          animation: atom-spin-4 3.5s linear infinite;
        }
        .atom-orbit-5 {
          animation: atom-spin-5 7s linear infinite;
        }

        .atom-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(1px);
        }

        .atom-orb-gold {
          width: 8px; height: 8px;
          background: radial-gradient(circle, #D4AF37 0%, #B87333 60%, transparent 100%);
          box-shadow: 0 0 12px 4px rgba(212, 175, 55, 0.6), 0 0 24px 8px rgba(184, 115, 51, 0.3);
        }
        .atom-orb-white {
          width: 6px; height: 6px;
          background: radial-gradient(circle, #ffffff 0%, rgba(255,255,255,0.6) 50%, transparent 100%);
          box-shadow: 0 0 10px 3px rgba(255, 255, 255, 0.5), 0 0 20px 6px rgba(255, 255, 255, 0.2);
        }
        .atom-orb-bronze {
          width: 7px; height: 7px;
          background: radial-gradient(circle, #E5C5A1 0%, #B87333 60%, transparent 100%);
          box-shadow: 0 0 10px 4px rgba(229, 197, 161, 0.5), 0 0 20px 6px rgba(184, 115, 51, 0.3);
        }
        .atom-orb-gold-sm {
          width: 5px; height: 5px;
          background: radial-gradient(circle, #D4AF37 0%, transparent 100%);
          box-shadow: 0 0 8px 3px rgba(212, 175, 55, 0.5);
        }
        .atom-orb-white-sm {
          width: 4px; height: 4px;
          background: radial-gradient(circle, #fff 0%, transparent 100%);
          box-shadow: 0 0 8px 3px rgba(255, 255, 255, 0.4);
        }

        /* Elliptical orbits at different tilts */
        @keyframes atom-spin-1 {
          0%   { transform: rotateZ(0deg)   rotateX(65deg)  rotateZ(0deg); }
          100% { transform: rotateZ(360deg) rotateX(65deg)  rotateZ(0deg); }
        }
        @keyframes atom-spin-2 {
          0%   { transform: rotateZ(0deg)   rotateX(65deg)  rotateZ(60deg); }
          100% { transform: rotateZ(360deg) rotateX(65deg)  rotateZ(60deg); }
        }
        @keyframes atom-spin-3 {
          0%   { transform: rotateZ(0deg)   rotateX(65deg)  rotateZ(120deg); }
          100% { transform: rotateZ(360deg) rotateX(65deg)  rotateZ(120deg); }
        }
        @keyframes atom-spin-4 {
          0%   { transform: rotateZ(0deg)   rotateX(75deg)  rotateZ(30deg); }
          100% { transform: rotateZ(360deg) rotateX(75deg)  rotateZ(30deg); }
        }
        @keyframes atom-spin-5 {
          0%   { transform: rotateZ(0deg)   rotateX(55deg)  rotateZ(90deg); }
          100% { transform: rotateZ(360deg) rotateX(55deg)  rotateZ(90deg); }
        }

        /* Position orbs at the edge of orbit (top center initially) */
        .atom-orbit-1 .atom-orb { top: -4px; left: calc(50% - 4px); }
        .atom-orbit-2 .atom-orb { top: -3px; left: calc(50% - 3px); }
        .atom-orbit-3 .atom-orb { top: -3.5px; left: calc(50% - 3.5px); }
        .atom-orbit-4 .atom-orb { top: -2.5px; left: calc(50% - 2.5px); }
        .atom-orbit-5 .atom-orb { top: -2px; left: calc(50% - 2px); }
      `}</style>
    </div>
  );
};

export default AtomOrbs;
