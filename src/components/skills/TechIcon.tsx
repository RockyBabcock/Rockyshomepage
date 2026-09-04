import React, { useState } from 'react';

interface TechIconProps {
  icon: string;
  name: string;
  brandColor?: string;
  className?: string;
  size?: number;
}

/**
 * Clean inline SVG vector paths for technologies without standalone image assets
 */
const INLINE_TECH_VECTORS: Record<string, (color: string) => React.ReactNode> = {
  nextjs: (color) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-full h-full">
      <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="1.6" fill="rgba(255,255,255,0.03)" />
      <path d="M9 8v8l8-9.5" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M15 12v4" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  ),
  remix: (color) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full text-white">
      <path d="M3 6h6v4H6v8h4v-4h4v4h4V6h-6V2H3v4z" fill={color} />
    </svg>
  ),
  nuxt: (color) => (
    <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
      <path d="M2 18L9 5l7 13H2z" stroke={color} strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M12 18l4-7 6 7H12z" stroke="#00DC82" strokeWidth="1.8" strokeLinejoin="round" />
    </svg>
  ),
  astro: (color) => (
    <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" className="w-full h-full">
      <path d="M12 2l2.4 6.9L21 11l-6.6 2.1L12 20l-2.4-6.9L3 11l6.6-2.1L12 2z" strokeLinejoin="round" />
      <circle cx="12" cy="11" r="2" fill={color} />
    </svg>
  ),
  css: (color) => (
    <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.6" className="w-full h-full">
      <path d="M4 3l2 15 6 3 6-3 2-15H4z" strokeLinejoin="round" />
      <path d="M8 8h8M8 12h7m-7 4l4 1 4-1" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  framer: (color) => (
    <svg viewBox="0 0 24 24" fill={color} className="w-full h-full">
      <path d="M4 2h16v7h-8zM4 9h8l8 7H4zM4 16h8v7z" />
    </svg>
  ),
  gsap: (color) => (
    <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" className="w-full h-full">
      <circle cx="12" cy="12" r="9" />
      <path d="M8 12h8M12 8v8" strokeLinecap="round" />
      <path d="M16 8l-8 8" strokeLinecap="round" />
    </svg>
  ),
  radix: (color) => (
    <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" className="w-full h-full">
      <circle cx="7" cy="12" r="4" fill={color} fillOpacity="0.3" />
      <rect x="13" y="8" width="8" height="8" rx="2" fill={color} fillOpacity="0.6" />
    </svg>
  ),
  shadcn: (color) => (
    <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" className="w-full h-full">
      <path d="M20 18l-8 4-8-4V6l8-4 8 4v12z" strokeLinejoin="round" />
      <path d="M4 6l8 4 8-4M12 10v12" strokeLinejoin="round" />
    </svg>
  ),
  graphql: (color) => (
    <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.6" className="w-full h-full">
      <circle cx="12" cy="4" r="2" fill={color} />
      <circle cx="19" cy="8" r="2" fill={color} />
      <circle cx="19" cy="16" r="2" fill={color} />
      <circle cx="12" cy="20" r="2" fill={color} />
      <circle cx="5" cy="16" r="2" fill={color} />
      <circle cx="5" cy="8" r="2" fill={color} />
      <path d="M12 4l7 4v8l-7 4-7-4V8z" strokeLinejoin="round" />
      <path d="M12 4v16M5 8l14 8M19 8L5 16" />
    </svg>
  ),
  trpc: (color) => (
    <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" className="w-full h-full">
      <path d="M3 7h18M12 7v13" strokeLinecap="round" />
      <circle cx="12" cy="12" r="3" stroke={color} fill="rgba(37,99,235,0.2)" />
    </svg>
  ),
  websockets: (color) => (
    <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" className="w-full h-full">
      <path d="M4 12a8 8 0 0 1 16 0" strokeLinecap="round" />
      <path d="M7 12a5 5 0 0 1 10 0" strokeLinecap="round" />
      <path d="M10 12a2 2 0 0 1 4 0" strokeLinecap="round" />
      <circle cx="12" cy="16" r="1.5" fill={color} />
    </svg>
  ),
  prisma: (color) => (
    <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.7" className="w-full h-full">
      <path d="M5 20l7-17 7 17-7-4-7 4z" strokeLinejoin="round" fill="rgba(255,255,255,0.04)" />
      <path d="M12 3v13" />
    </svg>
  ),
  drizzle: (color) => (
    <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" className="w-full h-full">
      <path d="M12 2L4 9l8 4 8-4-8-7z" strokeLinejoin="round" />
      <path d="M4 14l8 4 8-4" strokeLinejoin="round" />
      <path d="M4 18l8 4 8-4" strokeLinejoin="round" />
    </svg>
  ),
  supabase: (color) => (
    <svg viewBox="0 0 24 24" fill={color} className="w-full h-full">
      <path d="M13 2.5L3 14.5h7.5L9.5 22.5 21 9.5h-8z" />
    </svg>
  ),
  redis: (color) => (
    <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.7" className="w-full h-full">
      <ellipse cx="12" cy="6" rx="8" ry="3" fill="rgba(220,56,45,0.15)" />
      <path d="M4 6v6c0 1.66 3.58 3 8 3s8-1.34 8-3V6" />
      <path d="M4 12v6c0 1.66 3.58 3 8 3s8-1.34 8-3v-6" />
    </svg>
  ),
  kafka: (color) => (
    <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" className="w-full h-full">
      <circle cx="12" cy="12" r="3" fill={color} />
      <circle cx="19" cy="7" r="2" />
      <circle cx="19" cy="17" r="2" />
      <circle cx="5" cy="12" r="2" />
      <path d="M7 12h2m6-1.5l2-2m-2 7l2 2" />
    </svg>
  ),
  sql: (color) => (
    <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.7" className="w-full h-full">
      <ellipse cx="12" cy="6" rx="8" ry="3" />
      <path d="M4 6v12c0 1.66 3.58 3 8 3s8-1.34 8-3V6" />
      <path d="M4 12c0 1.66 3.58 3 8 3s8-1.34 8-3" />
      <path d="M9 16h6" strokeLinecap="round" />
    </svg>
  ),
  mongodb: (color) => (
    <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.7" className="w-full h-full">
      <path d="M12 2C9 7 6 11 6 15c0 3.3 2.7 6 6 6s6-2.7 6-6c0-4-3-8-6-13z" fill="rgba(71,162,72,0.15)" />
      <path d="M12 2v19" />
    </svg>
  ),
  mysql: (color) => (
    <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.7" className="w-full h-full">
      <ellipse cx="12" cy="7" rx="8" ry="3.5" />
      <path d="M4 7v10c0 1.93 3.58 3.5 8 3.5s8-1.57 8-3.5V7" />
      <path d="M4 12c0 1.93 3.58 3.5 8 3.5s8-1.57 8-3.5" />
    </svg>
  ),
  github: (color) => (
    <svg viewBox="0 0 24 24" fill={color} className="w-full h-full">
      <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z" />
    </svg>
  ),
  actions: (color) => (
    <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" className="w-full h-full">
      <circle cx="12" cy="12" r="9" />
      <path d="M10 8l6 4-6 4V8z" fill={color} />
    </svg>
  ),
  aws: (color) => (
    <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" className="w-full h-full">
      <path d="M4 14c4 3 12 3 16 0" strokeLinecap="round" />
      <path d="M18 12l2 2-2 2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6 9l3-5 3 5M7.5 7h3" />
    </svg>
  ),
  cloudflare: (color) => (
    <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" className="w-full h-full">
      <path d="M5 16h14a4 4 0 0 0 0-8 6 6 0 0 0-11-2 5 5 0 0 0-3 10z" strokeLinejoin="round" />
    </svg>
  ),
  vercel: (color) => (
    <svg viewBox="0 0 24 24" fill={color} className="w-full h-full">
      <path d="M12 2L2 20h20L12 2z" />
    </svg>
  ),
  ai: (color) => (
    <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" className="w-full h-full">
      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" strokeLinecap="round" />
      <circle cx="12" cy="12" r="3" fill={color} />
    </svg>
  ),
  blender: (color) => (
    <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.7" className="w-full h-full">
      <circle cx="12" cy="13" r="5" fill="rgba(232,125,13,0.2)" />
      <path d="M12 8V3M8 10L4 7M16 10l4-3" strokeLinecap="round" />
    </svg>
  ),
  webgl: (color) => (
    <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" className="w-full h-full">
      <polygon points="12 2 2 7 12 12 22 7 12 2" strokeLinejoin="round" />
      <polyline points="2 17 12 22 22 17" strokeLinejoin="round" />
      <polyline points="2 12 12 17 22 12" strokeLinejoin="round" />
    </svg>
  ),
  d3: (color) => (
    <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" className="w-full h-full">
      <path d="M4 4v16h16" strokeLinecap="round" />
      <path d="M4 14l5-5 4 3 6-7" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="9" cy="9" r="1.5" fill={color} />
      <circle cx="13" cy="12" r="1.5" fill={color} />
      <circle cx="19" cy="5" r="1.5" fill={color} />
    </svg>
  ),
  web3: (color) => (
    <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.7" className="w-full h-full">
      <polygon points="12 2 4 13 12 17 20 13 12 2" strokeLinejoin="round" fill="rgba(98,126,234,0.1)" />
      <polygon points="12 18 4 14 12 22 20 14 12 18" strokeLinejoin="round" />
    </svg>
  ),
};

export const TechIcon: React.FC<TechIconProps> = ({
  icon,
  name,
  brandColor = '#A855F7',
  className = 'w-full h-full',
  size,
}) => {
  const [imgError, setImgError] = useState(false);

  // Check if icon is an inline vector key
  const vectorRenderer = INLINE_TECH_VECTORS[icon.toLowerCase()];
  if (vectorRenderer) {
    return (
      <div
        className={`flex items-center justify-center ${className}`}
        style={size ? { width: size, height: size } : undefined}
      >
        {vectorRenderer(brandColor)}
      </div>
    );
  }

  // If icon is a path and hasn't errored
  if (icon.startsWith('/') && !imgError) {
    return (
      <img
        src={icon}
        alt={name}
        loading="lazy"
        onError={() => setImgError(true)}
        className={`object-contain filter drop-shadow-sm ${className}`}
        style={size ? { width: size, height: size } : undefined}
      />
    );
  }

  // Fallback: Elegant technical monogram badge with brand color
  const initials = name
    .split(/\s+/)
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <div
      className={`flex items-center justify-center font-mono font-bold tracking-tight rounded-md border text-[11px] ${className}`}
      style={{
        width: size || '100%',
        height: size || '100%',
        borderColor: `${brandColor}40`,
        backgroundColor: `${brandColor}15`,
        color: brandColor,
      }}
    >
      {initials}
    </div>
  );
};
