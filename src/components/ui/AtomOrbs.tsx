import React from 'react';

interface AtomOrbsProps {
  size?: number;
  className?: string;
}

/**
 * Pure-CSS atom-style orbiting orbs.
 * Large circular orbs with smooth CSS keyframe animations, no rings.
 */
const AtomOrbs: React.FC<AtomOrbsProps> = ({ size = 128, className = '' }) => {
  return (
    <div
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{ width: size, height: size }}
    >
      {/* Orbiting orbs — no rings, large circular dots */}
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
          display: block;
        }

        .atom-orb-gold {
          width: 12px; height: 12px;
          background: radial-gradient(circle, #D4AF37 0%, #B87333 60%, transparent 100%);
          box-shadow: 0 0 12px 5px rgba(212, 175, 55, 0.6), 0 0 24px 10px rgba(184, 115, 51, 0.3);
        }
        .atom-orb-white {
          width: 10px; height: 10px;
          background: radial-gradient(circle, #ffffff 0%, rgba(255,255,255,0.6) 50%, transparent 100%);
          box-shadow: 0 0 10px 4px rgba(255, 255, 255, 0.5), 0 0 20px 8px rgba(255, 255, 255, 0.2);
        }
        .atom-orb-bronze {
          width: 10px; height: 10px;
          background: radial-gradient(circle, #E5C5A1 0%, #B87333 60%, transparent 100%);
          box-shadow: 0 0 10px 5px rgba(229, 197, 161, 0.5), 0 0 20px 8px rgba(184, 115, 51, 0.25);
        }
        .atom-orb-gold-sm {
          width: 8px; height: 8px;
          background: radial-gradient(circle, #D4AF37 0%, rgba(212, 175, 55, 0.4) 60%, transparent 100%);
          box-shadow: 0 0 8px 4px rgba(212, 175, 55, 0.5);
        }
        .atom-orb-white-sm {
          width: 7px; height: 7px;
          background: radial-gradient(circle, #fff 0%, rgba(255,255,255,0.4) 60%, transparent 100%);
          box-shadow: 0 0 8px 3px rgba(255, 255, 255, 0.4);
        }

        /* Smooth elliptical orbits at different tilts */
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
        .atom-orbit-1 .atom-orb { top: -6px; left: calc(50% - 6px); }
        .atom-orbit-2 .atom-orb { top: -5px; left: calc(50% - 5px); }
        .atom-orbit-3 .atom-orb { top: -5px; left: calc(50% - 5px); }
        .atom-orbit-4 .atom-orb { top: -4px; left: calc(50% - 4px); }
        .atom-orbit-5 .atom-orb { top: -3.5px; left: calc(50% - 3.5px); }
      `}</style>
    </div>
  );
};

export default AtomOrbs;
