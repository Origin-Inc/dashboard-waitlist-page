export function TwilightArt({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 600 700"
      className={className}
      aria-hidden
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#1a0e4d" />
          <stop offset="0.35" stopColor="#3a1a7a" />
          <stop offset="0.65" stopColor="#8b4aa8" />
          <stop offset="0.85" stopColor="#f4a1c1" />
          <stop offset="1" stopColor="#ffd3b3" />
        </linearGradient>
        <radialGradient id="moon" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#fff7ea" />
          <stop offset="1" stopColor="#ffd3b3" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="halo" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.6" />
          <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
        <filter id="blur" x="-10%" y="-10%" width="120%" height="120%">
          <feGaussianBlur stdDeviation="16" />
        </filter>
      </defs>

      <rect width="600" height="700" fill="url(#sky)" />

      {/* Stars */}
      <g fill="white" opacity="0.9">
        <circle cx="80" cy="60" r="0.8" />
        <circle cx="140" cy="100" r="1.1" />
        <circle cx="210" cy="40" r="0.7" />
        <circle cx="310" cy="90" r="1.2" />
        <circle cx="400" cy="55" r="0.9" />
        <circle cx="470" cy="120" r="1.3" />
        <circle cx="540" cy="70" r="0.8" />
        <circle cx="70" cy="180" r="0.6" />
        <circle cx="250" cy="200" r="1" />
        <circle cx="360" cy="175" r="0.7" />
        <circle cx="530" cy="210" r="0.9" />
      </g>

      {/* Halo */}
      <circle cx="460" cy="150" r="180" fill="url(#halo)" />

      {/* Moon */}
      <circle cx="460" cy="150" r="54" fill="url(#moon)" />
      <circle cx="460" cy="150" r="48" fill="#ffeedd" />
      <circle cx="448" cy="142" r="6" fill="#f0c8a8" opacity="0.4" />
      <circle cx="472" cy="158" r="4" fill="#f0c8a8" opacity="0.35" />

      {/* Distant rolling mountains */}
      <path
        d="M0 470 C 80 420, 160 440, 240 460 S 380 430, 460 450 S 560 440, 600 445 L 600 700 L 0 700 Z"
        fill="#6a3e8f"
        opacity="0.55"
      />
      <path
        d="M0 510 C 90 470, 180 500, 280 510 S 420 480, 520 500 S 600 495, 600 495 L 600 700 L 0 700 Z"
        fill="#c46da8"
        opacity="0.55"
      />
      <path
        d="M0 570 C 90 540, 180 560, 300 565 S 460 550, 600 560 L 600 700 L 0 700 Z"
        fill="#ffa78f"
        opacity="0.55"
      />

      {/* Ground glow */}
      <ellipse cx="300" cy="700" rx="500" ry="100" fill="#ffd3b3" opacity="0.8" filter="url(#blur)" />

      {/* Soft clouds */}
      <g opacity="0.55">
        <ellipse cx="120" cy="380" rx="90" ry="14" fill="#ffd9e7" />
        <ellipse cx="480" cy="360" rx="120" ry="16" fill="#e8c7ff" />
        <ellipse cx="280" cy="420" rx="150" ry="18" fill="#ffd9e7" />
      </g>

      {/* Glowing mushrooms */}
      <g>
        <ellipse cx="130" cy="640" rx="36" ry="8" fill="black" opacity="0.15" />
        <path d="M115 640 C 115 595, 145 595, 145 640 Z" fill="#fff0c4" />
        <path
          d="M110 622 C 113 600, 147 600, 150 622 C 150 634, 110 634, 110 622 Z"
          fill="#ff9aa2"
        />
        <path
          d="M117 610 C 122 598, 138 598, 143 610"
          stroke="#fff7e0"
          strokeWidth="1.5"
          strokeLinecap="round"
          fill="none"
          opacity="0.8"
        />
        <circle cx="125" cy="612" r="2" fill="#fff7e0" opacity="0.9" />
        <circle cx="136" cy="615" r="1.4" fill="#fff7e0" opacity="0.8" />
      </g>

      <g>
        <ellipse cx="500" cy="645" rx="24" ry="6" fill="black" opacity="0.15" />
        <path d="M492 645 C 492 615, 508 615, 508 645 Z" fill="#fff0c4" />
        <path
          d="M487 628 C 490 612, 510 612, 513 628 C 513 638, 487 638, 487 628 Z"
          fill="#b6d6ff"
        />
        <circle cx="497" cy="620" r="1.4" fill="#fff7e0" opacity="0.9" />
        <circle cx="504" cy="624" r="1.2" fill="#fff7e0" opacity="0.8" />
      </g>
    </svg>
  );
}
