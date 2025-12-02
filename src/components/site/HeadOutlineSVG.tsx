interface HeadOutlineSVGProps {
  isAnimating: boolean;
  className?: string;
}

export const HeadOutlineSVG = ({ isAnimating, className = "" }: HeadOutlineSVGProps) => {
  if (!isAnimating) return null;

  return (
    <div className={className}>
      <svg 
        width="450" 
        height="520" 
        viewBox="0 0 512 512"
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        style={{display:'block', margin:'auto', filter:'drop-shadow(0 0 25px #c98a5caa)'}}
      >
        <defs>
          <linearGradient id="sweep-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#B87333" />
            <stop offset="15%" stopColor="#D4A574" />
            <stop offset="40%" stopColor="#FFFFFF" />
            <stop offset="60%" stopColor="#FFFFFF" />
            <stop offset="85%" stopColor="#D4A574" />
            <stop offset="100%" stopColor="#B87333" />
            <animate 
              attributeName="x1" 
              values="-100%;200%" 
              dur="4s" 
              repeatCount="indefinite" 
            />
            <animate 
              attributeName="x2" 
              values="0%;300%" 
              dur="4s" 
              repeatCount="indefinite" 
            />
          </linearGradient>
        </defs>
        
        <style>
          {`
            .glow {
              stroke: url(#sweep-gradient);
              stroke-width: 26;
              stroke-linecap: round;
              stroke-linejoin: round;
              fill: none;
              filter: drop-shadow(0 0 8px #c98a5c);
            }

            .inner {
              stroke: url(#sweep-gradient);
              stroke-width: 22;
              stroke-linecap: round;
              stroke-linejoin: round;
              fill: none;
              filter: drop-shadow(0 0 6px #c98a5c);
            }

            .heart {
              stroke: url(#sweep-gradient);
              stroke-width: 18;
              stroke-linecap: round;
              stroke-linejoin: round;
              fill: none;
              filter: drop-shadow(0 0 5px #c98a5c);
            }
          `}
        </style>

        {/* Outer head outline */}
        <path 
          className="glow"
          d="M180 450 
             C120 450 90 400 90 330 
             V200 
             C90 110 160 60 250 60 
             H300 
             C390 60 450 120 450 210 
             C450 300 390 360 300 360 
             H250 
             C230 360 215 365 200 375"
        />

        {/* Inner circle */}
        <path
          className="inner"
          d="M260 140 
             C210 140 170 180 170 230 
             C170 280 210 320 260 320 
             C310 320 350 280 350 230 
             C350 180 310 140 260 140"
        />

        {/* Heart */}
        <path
          className="heart"
          d="
             M240 210 
             C240 190 260 180 270 200 
             C280 180 300 190 300 210 
             C300 245 270 260 270 260 
             C270 260 240 245 240 210
          "
        />

        {/* Arrows */}
        <path 
          className="heart"
          d="M200 180 L175 155" 
        />
        <path 
          className="heart"
          d="M320 180 L345 155" 
        />
      </svg>
    </div>
  );
};
