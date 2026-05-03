interface DiyaSVGProps {
  size?: number
  className?: string
  flickerDelay?: number
}

export default function DiyaSVG({ size = 48, className = '', flickerDelay = 0 }: DiyaSVGProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      {/* Flame */}
      <g
        className="diya-flame"
        style={{ transformOrigin: '24px 16px', animationDelay: `${flickerDelay}s` }}
      >
        {/* Outer flame glow */}
        <ellipse cx="24" cy="18" rx="5" ry="8" fill="rgba(255,180,20,0.25)" />
        {/* Main flame */}
        <path
          d="M24 8 C21 12, 19 15, 20 19 C21 23, 24 24, 24 24 C24 24, 27 23, 28 19 C29 15, 27 12, 24 8Z"
          fill="url(#flame-gradient)"
        />
        {/* Inner bright core */}
        <path
          d="M24 13 C23 16, 22.5 18, 23 20 C23.5 21.5, 24 22, 24 22 C24 22, 24.5 21.5, 25 20 C25.5 18, 25 16, 24 13Z"
          fill="rgba(255,240,180,0.9)"
        />
      </g>

      {/* Wick */}
      <line x1="24" y1="24" x2="24" y2="28" stroke="#8B4513" strokeWidth="1.5" strokeLinecap="round" />

      {/* Oil lamp body */}
      <path
        d="M14 30 Q13 38, 18 40 L30 40 Q35 38, 34 30 Z"
        fill="url(#clay-gradient)"
        stroke="#C4782A"
        strokeWidth="0.8"
      />
      {/* Lamp rim */}
      <ellipse cx="24" cy="30" rx="10" ry="3" fill="url(#rim-gradient)" stroke="#C4782A" strokeWidth="0.8" />
      {/* Oil surface */}
      <ellipse cx="24" cy="29.5" rx="8" ry="2" fill="rgba(212,134,10,0.4)" />

      {/* Spout */}
      <path
        d="M33 29 Q38 27, 38 30 Q38 32, 34 31"
        fill="url(#clay-gradient)"
        stroke="#C4782A"
        strokeWidth="0.8"
      />

      {/* Base glow */}
      <ellipse cx="24" cy="41" rx="10" ry="2" fill="rgba(212,134,10,0.2)" />

      <defs>
        <linearGradient id="flame-gradient" x1="24" y1="8" x2="24" y2="24" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFF3B0" />
          <stop offset="40%" stopColor="#FFB020" />
          <stop offset="100%" stopColor="#D4530A" />
        </linearGradient>
        <linearGradient id="clay-gradient" x1="14" y1="30" x2="34" y2="40" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#D4860A" />
          <stop offset="50%" stopColor="#C06A10" />
          <stop offset="100%" stopColor="#8B4513" />
        </linearGradient>
        <linearGradient id="rim-gradient" x1="14" y1="30" x2="34" y2="30" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#E89A20" />
          <stop offset="50%" stopColor="#F2C94C" />
          <stop offset="100%" stopColor="#E89A20" />
        </linearGradient>
      </defs>
    </svg>
  )
}
