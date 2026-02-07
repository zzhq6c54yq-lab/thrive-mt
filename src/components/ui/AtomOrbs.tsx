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
          width: 28px; height: 28px;
          background: radial-gradient(circle, #D4AF37 0%, #B87333 50%, rgba(184, 115, 51, 0.2) 80%, transparent 100%);
          box-shadow: 0 0 20px 10px rgba(212, 175, 55, 0.7), 0 0 40px 20px rgba(184, 115, 51, 0.35), 0 0 60px 30px rgba(212, 175, 55, 0.15);
        }
        .atom-orb-white {
          width: 24px; height: 24px;
          background: radial-gradient(circle, #ffffff 0%, rgba(255,255,255,0.7) 40%, rgba(255,255,255,0.2) 70%, transparent 100%);
          box-shadow: 0 0 18px 8px rgba(255, 255, 255, 0.6), 0 0 36px 16px rgba(255, 255, 255, 0.25), 0 0 50px 24px rgba(255, 255, 255, 0.1);
        }
        .atom-orb-bronze {
          width: 22px; height: 22px;
          background: radial-gradient(circle, #E5C5A1 0%, #B87333 50%, rgba(184, 115, 51, 0.2) 80%, transparent 100%);
          box-shadow: 0 0 16px 8px rgba(229, 197, 161, 0.6), 0 0 32px 14px rgba(184, 115, 51, 0.3), 0 0 48px 20px rgba(229, 197, 161, 0.1);
        }
        .atom-orb-gold-sm {
          width: 18px; height: 18px;
          background: radial-gradient(circle, #D4AF37 0%, rgba(212, 175, 55, 0.5) 50%, rgba(212, 175, 55, 0.1) 80%, transparent 100%);
          box-shadow: 0 0 14px 7px rgba(212, 175, 55, 0.6), 0 0 28px 12px rgba(212, 175, 55, 0.25);
        }
        .atom-orb-white-sm {
          width: 16px; height: 16px;
          background: radial-gradient(circle, #fff 0%, rgba(255,255,255,0.5) 50%, rgba(255,255,255,0.1) 80%, transparent 100%);
          box-shadow: 0 0 12px 6px rgba(255, 255, 255, 0.5), 0 0 24px 10px rgba(255, 255, 255, 0.2);
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
        .atom-orbit-1 .atom-orb { top: -14px; left: calc(50% - 14px); }
        .atom-orbit-2 .atom-orb { top: -12px; left: calc(50% - 12px); }
        .atom-orbit-3 .atom-orb { top: -11px; left: calc(50% - 11px); }
        .atom-orbit-4 .atom-orb { top: -9px; left: calc(50% - 9px); }
        .atom-orbit-5 .atom-orb { top: -8px; left: calc(50% - 8px); }
      `}</style>
    </div>
  );
};

export default AtomOrbs;
