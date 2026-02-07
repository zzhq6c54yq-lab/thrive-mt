import React from 'react';

interface AtomOrbsProps {
  size?: number;
  className?: string;
}

/**
 * Pure-CSS atom-style orbiting orbs.
 * Circular orbs with smooth CSS keyframe animations, no rings.
 */
const AtomOrbs: React.FC<AtomOrbsProps> = ({ size = 128, className = '' }) => {
  return (
    <div
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{ width: size, height: size }}
    >
      {/* Orbiting orbs — no rings */}
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
        .atom-orbit {
          position: absolute;
          top: 0; left: 0;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }

        .atom-orbit-1 { animation: atom-spin-1 6s linear infinite; }
        .atom-orbit-2 { animation: atom-spin-2 8s linear infinite; }
        .atom-orbit-3 { animation: atom-spin-3 10s linear infinite; }
        .atom-orbit-4 { animation: atom-spin-4 5s linear infinite; }
        .atom-orbit-5 { animation: atom-spin-5 12s linear infinite; }

        .atom-orb {
          position: absolute;
          border-radius: 50%;
        }

        .atom-orb-gold {
          width: 6px; height: 6px;
          background: radial-gradient(circle, #D4AF37 0%, #B87333 80%, transparent 100%);
          box-shadow: 0 0 8px 3px rgba(212, 175, 55, 0.5), 0 0 16px 6px rgba(184, 115, 51, 0.2);
        }
        .atom-orb-white {
          width: 5px; height: 5px;
          background: radial-gradient(circle, #ffffff 0%, rgba(255,255,255,0.5) 60%, transparent 100%);
          box-shadow: 0 0 6px 2px rgba(255, 255, 255, 0.4), 0 0 12px 4px rgba(255, 255, 255, 0.15);
        }
        .atom-orb-bronze {
          width: 5px; height: 5px;
          background: radial-gradient(circle, #E5C5A1 0%, #B87333 80%, transparent 100%);
          box-shadow: 0 0 6px 3px rgba(229, 197, 161, 0.4), 0 0 12px 4px rgba(184, 115, 51, 0.2);
        }
        .atom-orb-gold-sm {
          width: 4px; height: 4px;
          background: radial-gradient(circle, #D4AF37 0%, transparent 100%);
          box-shadow: 0 0 5px 2px rgba(212, 175, 55, 0.4);
        }
        .atom-orb-white-sm {
          width: 3px; height: 3px;
          background: radial-gradient(circle, #fff 0%, transparent 100%);
          box-shadow: 0 0 5px 2px rgba(255, 255, 255, 0.3);
        }

        /* Smooth elliptical orbits at different tilts — slower = smoother */
        @keyframes atom-spin-1 {
          0%   { transform: rotateZ(0deg)   rotateX(70deg)  rotateZ(0deg); }
          100% { transform: rotateZ(360deg) rotateX(70deg)  rotateZ(0deg); }
        }
        @keyframes atom-spin-2 {
          0%   { transform: rotateZ(0deg)   rotateX(65deg)  rotateZ(60deg); }
          100% { transform: rotateZ(360deg) rotateX(65deg)  rotateZ(60deg); }
        }
        @keyframes atom-spin-3 {
          0%   { transform: rotateZ(0deg)   rotateX(70deg)  rotateZ(120deg); }
          100% { transform: rotateZ(360deg) rotateX(70deg)  rotateZ(120deg); }
        }
        @keyframes atom-spin-4 {
          0%   { transform: rotateZ(0deg)   rotateX(75deg)  rotateZ(30deg); }
          100% { transform: rotateZ(360deg) rotateX(75deg)  rotateZ(30deg); }
        }
        @keyframes atom-spin-5 {
          0%   { transform: rotateZ(0deg)   rotateX(60deg)  rotateZ(90deg); }
          100% { transform: rotateZ(360deg) rotateX(60deg)  rotateZ(90deg); }
        }

        /* Position orbs at the edge of orbit */
        .atom-orbit-1 .atom-orb { top: -3px; left: calc(50% - 3px); }
        .atom-orbit-2 .atom-orb { top: -2.5px; left: calc(50% - 2.5px); }
        .atom-orbit-3 .atom-orb { top: -2.5px; left: calc(50% - 2.5px); }
        .atom-orbit-4 .atom-orb { top: -2px; left: calc(50% - 2px); }
        .atom-orbit-5 .atom-orb { top: -1.5px; left: calc(50% - 1.5px); }
      `}</style>
    </div>
  );
};

export default AtomOrbs;
