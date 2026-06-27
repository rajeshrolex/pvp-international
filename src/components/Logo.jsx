import React from 'react';

export default function Logo({ className = "w-10 h-10", variant = "color" }) {
  // Colors based on official PVP International brand guidelines
  const colors = {
    color: {
      bg: "#F2B824",         // Warm Gold/Yellow
      primary: "#0F3F62",    // Deep Blue
      circle: "#0F3F62"
    },
    light: {
      bg: "transparent",
      primary: "#FFFFFF",
      circle: "#FFFFFF"
    },
    monochrome: {
      bg: "transparent",
      primary: "currentColor",
      circle: "currentColor"
    }
  };

  const selected = colors[variant] || colors.color;

  return (
    <svg 
      viewBox="0 0 500 500" 
      className={`${className} transition-transform duration-300`}
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Outer Circle Background */}
      {variant === 'color' && (
        <circle 
          cx="250" 
          cy="250" 
          r="235" 
          fill={selected.bg} 
        />
      )}
      
      {/* Circle Ring */}
      <circle 
        cx="250" 
        cy="250" 
        r="225" 
        stroke={selected.circle} 
        strokeWidth="12" 
        fill="none"
      />

      {/* PVP Letters Group */}
      <g fill={selected.primary}>
        {/* First 'p' Stem */}
        <rect x="110" y="130" width="36" height="240" rx="3" />
        
        {/* First 'p' Bowl */}
        <path 
          d="M 146 130 H 200 C 215 130 218 145 218 175 V 275 C 218 305 215 320 200 320 H 146 Z M 146 165 V 285 H 176 C 184 285 188 280 188 265 V 185 C 188 170 184 165 176 165 Z" 
          fillRule="evenodd" 
        />

        {/* Middle 'v' */}
        <path 
          d="M 214 130 H 252 L 260 195 L 268 130 H 306 L 278 320 H 242 Z" 
        />

        {/* Second 'p' Stem */}
        <rect x="306" y="130" width="36" height="240" rx="3" />
        
        {/* Second 'p' Bowl */}
        <path 
          d="M 342 130 H 396 C 411 130 414 145 414 175 V 275 C 414 305 411 320 396 320 H 342 Z M 342 165 V 285 H 372 C 380 285 384 280 384 265 V 185 C 384 170 380 165 372 165 Z" 
          fillRule="evenodd" 
        />

        {/* 'international' Text */}
        <text 
          x="226" 
          y="360" 
          fontFamily="Georgia, 'Times New Roman', serif" 
          fontSize="27" 
          fontWeight="bold" 
          letterSpacing="0.5" 
          textAnchor="middle"
        >
          international
        </text>
      </g>
    </svg>
  );
}
