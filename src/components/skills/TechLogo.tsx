import React from 'react';

interface TechLogoProps {
  id: string;
  className?: string;
  size?: number;
}

export const TechLogo: React.FC<TechLogoProps> = ({ id, className = '', size = 64 }) => {
  const pixelSize = `${size}px`;

  switch (id) {
    // =========================================================================
    // ROW 1: CORE WEB
    // =========================================================================
    case 'html5':
      return (
        <svg width={pixelSize} height={pixelSize} viewBox="0 0 512 512" className={className} fill="none">
          <path fill="#E34F26" d="M71 460L30 0h452l-41 460-185 52z" />
          <path fill="#EF652A" d="M256 472l149-41 35-391H256v432z" />
          <path fill="#EBEBEB" d="M109 90h147v68H181l8 88h67v68h-68l-4-48h-69l11 126 130 36v71L109 423l-15-167h69l5 56 88 24v-68H176l-5-56h85V90H109z" />
          <path fill="#FFFFFF" d="M256 90h147l-15 168h-66l6-68H256V90zm0 156h68l-7 88-61 17v71l130-36 12-140H256v-68z" />
        </svg>
      );

    case 'css3':
      return (
        <svg width={pixelSize} height={pixelSize} viewBox="0 0 512 512" className={className} fill="none">
          <path fill="#1572B6" d="M71 460L30 0h452l-41 460-185 52z" />
          <path fill="#33A9DC" d="M256 472l149-41 35-391H256v432z" />
          <path fill="#EBEBEB" d="M256 90h-73l5 56h68v68h-68l-5-56H114l11 126h131v68h-68l-4-48H115l9 104 132 37V395l-71-19-4-47h-69l8 94 136 38V90z" />
          <path fill="#FFFFFF" d="M256 90h147l-15 168h-66l6-68H256V90zm0 156h68l-7 88-61 17v71l130-36 12-140H256v-68z" />
        </svg>
      );

    case 'javascript':
      return (
        <svg width={pixelSize} height={pixelSize} viewBox="0 0 630 630" className={className}>
          <rect width="630" height="630" rx="80" fill="#F7DF1E" />
          <path d="M423.2 492.8c12.6 20.7 29.2 36 58.5 36 24.7 0 40.2-12.4 40.2-29.6 0-20.5-16.4-28-43.9-39.8l-15.1-6.4c-43.7-18.7-72.6-42.3-72.6-92.4 0-45.9 35.1-80.6 90.1-80.6 39.1 0 67.3 13.7 86.7 48.5l-47.5 30.5c-10.4-18.7-22-25.7-39.2-25.7-17.5 0-28.7 11.2-28.7 25 0 17.5 10.9 24.6 36.1 35.4l15.1 6.5c51.9 22.3 81.3 45.4 81.3 96.6 0 55.4-43.7 84.7-99.8 84.7-56 0-92.4-27.4-110.1-64.8l48.9-23.9zm-198.8 4.2c9.5 16.6 18.2 30.7 39.2 30.7 20 0 32.7-8 32.7-38.7V284.1h60.4v205.9c0 62.8-36.8 91.1-90.8 91.1-48.9 0-77.5-25.3-92.1-56.1l50.6-28z" />
        </svg>
      );

    case 'typescript':
      return (
        <svg width={pixelSize} height={pixelSize} viewBox="0 0 128 128" className={className}>
          <rect width="128" height="128" rx="24" fill="#3178C6" />
          <path fill="#FFFFFF" d="M72.2 99.4c0-4.5 1.4-8 4.1-10.6 2.7-2.6 6.8-4.6 12.3-6.1l7.1-1.9c3.3-.9 5.8-2 7.4-3.4 1.7-1.4 2.5-3.3 2.5-5.7 0-2.7-1.1-4.9-3.2-6.5-2.2-1.6-5.2-2.4-9.1-2.4-4 0-7.3 1-9.9 2.9-2.6 1.9-4.2 4.9-4.8 8.9l-11.8-1.5c1.1-6.5 4.3-11.7 9.5-15.5 5.2-3.8 11.9-5.7 20-5.7 7.7 0 14.1 1.7 19 5.1 5 3.4 7.4 8.5 7.4 15.3 0 4.2-1.3 7.6-4 10.1-2.6 2.5-6.5 4.6-11.5 6.1l-7.3 2c-4 .9-6.9 2.1-8.6 3.6-1.7 1.5-2.5 3.5-2.5 6 0 2.9 1.2 5.1 3.7 6.8 2.5 1.7 6 2.5 10.6 2.5 4.6 0 8.5-1.1 11.5-3.4 3-2.3 4.9-5.7 5.7-10.3l11.4 1.9c-1.3 7.2-4.8 12.8-10.4 16.7-5.6 3.9-12.8 5.9-21.7 5.9-8.4 0-15.3-2-20.7-5.9-5.7-3.9-8.5-9.3-8.5-16.3zM21 53.6h48.3v11.5h-17.6v50.4H38.7V65.1H21V53.6z" />
        </svg>
      );

    case 'react':
    case 'react-native':
      return (
        <svg width={pixelSize} height={pixelSize} viewBox="-11.5 -10.23 23 20.46" className={className}>
          <circle cx="0" cy="0" r="2.05" fill="#61DAFB" />
          <g stroke="#61DAFB" strokeWidth="1" fill="none">
            <ellipse rx="11" ry="4.2" />
            <ellipse rx="11" ry="4.2" transform="rotate(60)" />
            <ellipse rx="11" ry="4.2" transform="rotate(120)" />
          </g>
        </svg>
      );

    case 'nextjs':
      return (
        <svg width={pixelSize} height={pixelSize} viewBox="0 0 180 180" className={className} fill="none">
          <circle cx="90" cy="90" r="88" fill="#000" stroke="#FFF" strokeWidth="4" />
          <path d="M149.5 153.5L78.6 57H59v66h14.8V79.2l62.3 84.4c4.6-3.2 8.9-6.7 13.4-10.1z" fill="#FFF" />
          <path d="M121 57h15v66h-15z" fill="#FFF" />
        </svg>
      );

    case 'tailwind':
      return (
        <svg width={pixelSize} height={pixelSize} viewBox="0 0 24 24" className={className} fill="none">
          <path fill="#38BDF8" d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.336 6.182 14.975 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.336 13.382 8.975 12 6.001 12z" />
        </svg>
      );

    case 'motion':
      return (
        <svg width={pixelSize} height={pixelSize} viewBox="0 0 24 24" className={className} fill="none">
          <path fill="#F550FA" d="M4 0h16v8h-8zM4 8h8l8 8H4zM4 16h8v8z" />
        </svg>
      );

    case 'gsap':
      return (
        <svg width={pixelSize} height={pixelSize} viewBox="0 0 100 100" className={className} fill="none">
          <circle cx="50" cy="50" r="46" fill="#111" stroke="#88CE02" strokeWidth="4" />
          <path fill="#88CE02" d="M30 65c-6-5-9-12-9-20 0-15 11-25 29-25 15 0 25 8 28 20l-14 4c-2-7-7-11-14-11-8 0-14 5-14 12 0 6 4 10 11 12l10 3c14 4 20 11 20 22 0 14-11 23-28 23-14 0-25-7-29-19l14-5c2 7 8 11 15 11 7 0 13-4 13-11 0-5-3-9-10-11l-13-4z" />
        </svg>
      );

    // =========================================================================
    // ROW 2: FRONTEND / PRODUCT
    // =========================================================================
    case 'svelte':
      return (
        <svg width={pixelSize} height={pixelSize} viewBox="0 0 100 120" className={className} fill="none">
          <path fill="#FF3E00" d="M85 24c-12-19-38-25-57-13L15 20C4 27-2 40 1 52c2 10 9 18 19 22l-4 3c-12 8-16 23-10 36 6 12 18 20 32 20 7 0 15-2 21-6l13-8c11-7 17-20 14-32-2-10-9-18-19-22l4-3c12-8 16-23 10-36z" />
          <path fill="#FFFFFF" d="M38 31c6-4 14-2 18 4l2 3c-1 1-2 1-3 2l-2 1c-4-4-10-5-15-2-5 3-7 9-4 14l2 4c4 7 14 10 21 6l13-8c7-4 11-12 9-20-1-6-5-11-11-14 1-1 2-1 3-2l2-1c8 4 14 11 15 20 2 11-3 22-13 28l-13 8c-10 6-23 3-29-7l-2-4c-4-7-2-16 4-22zm24 58c-6 4-14 2-18-4l-2-3c1-1 2-1 3-2l2-1c4 4 10 5 15 2 5-3 7-9 4-14l-2-4c-4-7-14-10-21-6l-13 8c-7 4-11 12-9 20 1 6 5 11 11 14-1 1-2 1-3 2l-2 1c-8-4-14-11-15-20-2-11 3-22 13-28l13-8c10-6 23-3 29 7l2 4c4 7 2 16-4 22z" />
        </svg>
      );

    case 'remix':
      return (
        <svg width={pixelSize} height={pixelSize} viewBox="0 0 100 100" className={className} fill="none">
          <circle cx="50" cy="50" r="46" fill="#000" stroke="#E879F9" strokeWidth="3" />
          <path fill="#E879F9" d="M30 28h22c10 0 18 6 18 16 0 7-4 12-10 14l12 18H57L46 58h-6v18H30V28zm10 20h11c5 0 8-3 8-7s-3-7-8-7H40v14z" />
        </svg>
      );

    case 'nuxt':
      return (
        <svg width={pixelSize} height={pixelSize} viewBox="0 0 128 128" className={className} fill="none">
          <path fill="#00DC82" d="M72 96L40 40 8 96h64zm16 0L56 40l16-28 48 84H88z" />
          <path fill="#002E3B" d="M72 96l16-28 16 28H72z" />
        </svg>
      );

    case 'astro':
      return (
        <svg width={pixelSize} height={pixelSize} viewBox="0 0 128 128" className={className} fill="none">
          <path fill="#FF5D01" d="M64 12c-4 16-16 36-34 44 14 6 26 2 34-8 8 10 20 14 34 8-18-8-30-28-34-44z" />
          <path fill="#FFF" d="M46 64l-18 48h18l6-16h24l6 16h18L82 64H46zm14 20l6-16 6 16H60z" />
        </svg>
      );

    case 'radix':
      return (
        <svg width={pixelSize} height={pixelSize} viewBox="0 0 25 25" className={className} fill="none">
          <circle cx="6" cy="6" r="4" fill="#7C3AED" />
          <circle cx="19" cy="6" r="4" fill="#A78BFA" />
          <path d="M12 12a7 7 0 0 1 7 7h-7v-7z" fill="#C4B5FD" />
          <path d="M6 12a7 7 0 0 0 7 7V12H6z" fill="#7C3AED" />
        </svg>
      );

    case 'shadcn':
      return (
        <svg width={pixelSize} height={pixelSize} viewBox="0 0 256 256" className={className} fill="none">
          <path d="M208 128l-80 80-80-80 80-80 80 80z" stroke="#FFF" strokeWidth="18" fill="none" />
          <path d="M192 40L40 192" stroke="#FFF" strokeWidth="18" strokeLinecap="round" />
        </svg>
      );

    case 'vite':
      return (
        <svg width={pixelSize} height={pixelSize} viewBox="0 0 32 32" className={className} fill="none">
          <path fill="#646CFF" d="M29.5 5.5L16.8 28.2a1.5 1.5 0 01-2.6 0L2.5 5.5a1.5 1.5 0 011.8-2.2l11.4 3.7a1.5 1.5 0 001 0l11-3.7a1.5 1.5 0 011.8 2.2z" />
          <path fill="#FFD21E" d="M19.8 3.5l-9.4 12.8a.5.5 0 00.4.8h4.6l-2.4 7.6a.5.5 0 00.9.4l9.4-12.8a.5.5 0 00-.4-.8h-4.6l2.4-7.6a.5.5 0 00-.9-.4z" />
        </svg>
      );

    // =========================================================================
    // ROW 3: BACKEND
    // =========================================================================
    case 'nodejs':
      return (
        <svg width={pixelSize} height={pixelSize} viewBox="0 0 128 128" className={className} fill="none">
          <path fill="#5FA04E" d="M64 12l48 28v56l-48 28-48-28V40l48-28z" />
          <path fill="#FFF" d="M64 36c12 0 20 6 20 16 0 8-5 13-13 15v1c9 2 15 8 15 17 0 12-10 19-22 19-14 0-23-7-23-20h12c0 6 4 10 11 10 6 0 10-3 10-9s-4-9-10-9h-6v-10h6c5 0 9-3 9-8s-4-8-9-8c-6 0-10 3-10 9H37c0-11 9-17 27-17z" />
        </svg>
      );

    case 'express':
      return (
        <svg width={pixelSize} height={pixelSize} viewBox="0 0 120 120" className={className} fill="none">
          <circle cx="60" cy="60" r="54" fill="#0D0D12" stroke="#444" strokeWidth="3" />
          <text x="60" y="70" fill="#FFF" fontSize="34" fontWeight="bold" fontFamily="sans-serif" textAnchor="middle">
            ex
          </text>
        </svg>
      );

    case 'php':
      return (
        <svg width={pixelSize} height={pixelSize} viewBox="0 0 128 128" className={className} fill="none">
          <ellipse cx="64" cy="64" rx="58" ry="36" fill="#777BB4" />
          <path fill="#FFF" d="M34 52h14c6 0 10 3 10 8s-4 8-10 8h-6l-3 16H30l9-32zm7 9l-2 7h5c3 0 5-1 5-4s-2-3-5-3h-3zm25-9h9l-6 23h9l-2 9H57l9-32zm19 0h14c6 0 10 3 10 8s-4 8-10 8h-6l-3 16H76l9-32zm7 9l-2 7h5c3 0 5-1 5-4s-2-3-5-3h-3z" />
        </svg>
      );

    case 'rest-api':
      return (
        <svg width={pixelSize} height={pixelSize} viewBox="0 0 24 24" className={className} fill="none">
          <rect x="2" y="5" width="20" height="14" rx="4" stroke="#10B981" strokeWidth="2" />
          <path d="M6 12h12M14 9l3 3-3 3M10 15l-3-3 3-3" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );

    case 'graphql':
      return (
        <svg width={pixelSize} height={pixelSize} viewBox="0 0 100 100" className={className} fill="none">
          <path fill="#E10098" d="M50 8l36 21v42L50 92 14 71V29L50 8zm0 8L20 33v34l30 17 30-17V33L50 16z" />
          <circle cx="50" cy="8" r="7" fill="#E10098" />
          <circle cx="86" cy="29" r="7" fill="#E10098" />
          <circle cx="86" cy="71" r="7" fill="#E10098" />
          <circle cx="50" cy="92" r="7" fill="#E10098" />
          <circle cx="14" cy="71" r="7" fill="#E10098" />
          <circle cx="14" cy="29" r="7" fill="#E10098" />
          <path stroke="#E10098" strokeWidth="3" d="M14 29l72 42M86 29L14 71M50 8v84" />
        </svg>
      );

    case 'trpc':
      return (
        <svg width={pixelSize} height={pixelSize} viewBox="0 0 100 100" className={className} fill="none">
          <circle cx="50" cy="50" r="46" fill="#1E293B" stroke="#2563EB" strokeWidth="3" />
          <path d="M50 20v60M30 40l20-20 20 20M35 55l15 15 15-15" stroke="#2563EB" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );

    case 'websockets':
      return (
        <svg width={pixelSize} height={pixelSize} viewBox="0 0 24 24" className={className} fill="none">
          <circle cx="12" cy="12" r="4" fill="#F59E0B" />
          <path d="M4.93 4.93a10 10 0 0 1 14.14 0M7.76 7.76a6 6 0 0 1 8.48 0M16.24 16.24a6 6 0 0 1-8.48 0M19.07 19.07a10 10 0 0 1-14.14 0" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );

    case 'socketio':
      return (
        <svg width={pixelSize} height={pixelSize} viewBox="0 0 100 100" className={className} fill="none">
          <circle cx="50" cy="50" r="46" fill="#010101" stroke="#FFF" strokeWidth="3" />
          <path d="M54 22l-18 32h16l-6 26 22-36H52l6-22z" fill="#FFF" />
        </svg>
      );

    case 'sse':
      return (
        <svg width={pixelSize} height={pixelSize} viewBox="0 0 24 24" className={className} fill="none">
          <path d="M4 6h16M4 12h12M4 18h8" stroke="#06B6D4" strokeWidth="3" strokeLinecap="round" />
          <circle cx="18" cy="18" r="3" fill="#06B6D4" />
        </svg>
      );

    // =========================================================================
    // ROW 4: DATABASE & INFRASTRUCTURE
    // =========================================================================
    case 'postgresql':
      return (
        <svg width={pixelSize} height={pixelSize} viewBox="0 0 128 128" className={className} fill="none">
          <circle cx="64" cy="64" r="54" fill="#336791" />
          <path fill="#FFF" d="M64 26c-18 0-28 12-28 26 0 18 14 26 14 38 0 8-5 12-10 12-3 0-6-1-8-3l-4 7c3 3 8 4 12 4 11 0 18-8 18-20 0-16-14-22-14-38 0-9 6-17 18-17s18 8 18 17c0 16-14 22-14 38 0 12 7 20 18 20 4 0 9-1 12-4l-4-7c-2 2-5 3-8 3-5 0-10-4-10-12 0-12 14-20 14-38 0-14-10-26-28-26z" />
        </svg>
      );

    case 'mysql':
      return (
        <svg width={pixelSize} height={pixelSize} viewBox="0 0 128 128" className={className} fill="none">
          <rect width="128" height="128" rx="28" fill="#00758F" />
          <path fill="#F29111" d="M36 84c6-14 18-26 34-30-8 8-10 18-8 28-8-2-18-2-26 2z" />
          <path fill="#FFF" d="M68 40c12 2 22 10 26 22-8-4-18-4-26-2 2-6 2-14 0-20zm-24 48c18-2 36 2 48 10-10-4-22-6-34-4-6 0-10-2-14-6z" />
        </svg>
      );

    case 'mongodb':
      return (
        <svg width={pixelSize} height={pixelSize} viewBox="0 0 24 24" className={className} fill="none">
          <path fill="#47A248" d="M12 1.5C11.5 2 7 8 7 14c0 4.5 3 7.5 5 8.5 2-1 5-4 5-8.5 0-6-4.5-12-5-12.5zm-.5 19.5v-17c.5.5 3.5 5 3.5 10 0 3-2 6-3.5 7z" />
        </svg>
      );

    case 'prisma':
      return (
        <svg width={pixelSize} height={pixelSize} viewBox="0 0 100 100" className={className} fill="none">
          <path fill="#5A67D8" d="M48 12l38 72-68-12 30-60z" />
          <path fill="#FFF" opacity="0.6" d="M48 12l-30 60 68 12-38-72zm0 8l26 50-48-8 22-42z" />
        </svg>
      );

    case 'drizzle':
      return (
        <svg width={pixelSize} height={pixelSize} viewBox="0 0 100 100" className={className} fill="none">
          <circle cx="50" cy="50" r="46" fill="#18181B" stroke="#C5F74F" strokeWidth="3" />
          <path d="M38 28l24 44M54 28L30 72" stroke="#C5F74F" strokeWidth="8" strokeLinecap="round" />
        </svg>
      );

    case 'supabase':
      return (
        <svg width={pixelSize} height={pixelSize} viewBox="0 0 100 100" className={className} fill="none">
          <path fill="#3ECF8E" d="M56 12L20 58h28l-8 30 38-46H48l8-30z" />
        </svg>
      );

    case 'firebase':
      return (
        <svg width={pixelSize} height={pixelSize} viewBox="0 0 100 100" className={className} fill="none">
          <path fill="#FFA000" d="M22 72L42 16l14 26-34 30z" />
          <path fill="#FFCA28" d="M78 72L60 28l-8 14 26 30z" />
          <path fill="#FF8F00" d="M22 72l28 20 28-20-28-56-28 56z" />
        </svg>
      );

    case 'redis':
      return (
        <svg width={pixelSize} height={pixelSize} viewBox="0 0 100 100" className={className} fill="none">
          <path fill="#DC382D" d="M50 14L16 32l34 18 34-18-34-18zm0 24L16 56l34 18 34-18-34-18zm0 24L16 80l34 18 34-18-34-18z" />
        </svg>
      );

    case 'docker':
      return (
        <svg width={pixelSize} height={pixelSize} viewBox="0 0 120 120" className={className} fill="none">
          <path fill="#2496ED" d="M106 58c-3-2-8-2-12 0-2-8-8-14-16-16l-4 4c2 4 2 8 0 12-4-2-10-2-14 2H14c-4 12 0 28 10 36 14 10 40 10 60 0 16-8 22-22 22-38z" />
          <rect x="28" y="44" width="10" height="10" rx="1" fill="#2496ED" />
          <rect x="42" y="44" width="10" height="10" rx="1" fill="#2496ED" />
          <rect x="56" y="44" width="10" height="10" rx="1" fill="#2496ED" />
          <rect x="42" y="30" width="10" height="10" rx="1" fill="#2496ED" />
          <rect x="56" y="30" width="10" height="10" rx="1" fill="#2496ED" />
          <rect x="70" y="30" width="10" height="10" rx="1" fill="#2496ED" />
        </svg>
      );

    // =========================================================================
    // ROW 5: CREATIVE / 3D / DESIGN
    // =========================================================================
    case 'threejs':
      return (
        <svg width={pixelSize} height={pixelSize} viewBox="0 0 100 100" className={className} fill="none">
          <polygon points="50,12 86,74 14,74" stroke="#FFF" strokeWidth="5" fill="none" />
          <polygon points="50,12 50,74 14,74" fill="#FFF" fillOpacity="0.15" />
          <circle cx="50" cy="50" r="8" fill="#FFF" />
        </svg>
      );

    case 'webgl':
      return (
        <svg width={pixelSize} height={pixelSize} viewBox="0 0 100 100" className={className} fill="none">
          <circle cx="50" cy="50" r="46" fill="#180000" stroke="#990000" strokeWidth="3" />
          <polygon points="50,22 78,38 78,70 50,86 22,70 22,38" stroke="#FF2222" strokeWidth="4" fill="none" />
          <path d="M50 22v64M22 38l56 32M78 38L22 70" stroke="#FF2222" strokeWidth="2" />
        </svg>
      );

    case 'glsl':
      return (
        <svg width={pixelSize} height={pixelSize} viewBox="0 0 100 100" className={className} fill="none">
          <circle cx="50" cy="50" r="46" fill="#180010" stroke="#F43F5E" strokeWidth="3" />
          <polygon points="50,18 80,50 50,82 20,50" fill="#F43F5E" fillOpacity="0.4" stroke="#F43F5E" strokeWidth="4" />
          <circle cx="50" cy="50" r="12" fill="#FFF" />
        </svg>
      );

    case 'spline':
      return (
        <svg width={pixelSize} height={pixelSize} viewBox="0 0 100 100" className={className} fill="none">
          <circle cx="50" cy="50" r="46" fill="#0A0A1F" stroke="#5A54FF" strokeWidth="3" />
          <path d="M28 66c8 10 24 10 32 0s24-10 32 0M28 50c8-10 24-10 32 0s24 10 32 0M28 34c8 10 24 10 32 0s24-10 32 0" stroke="#5A54FF" strokeWidth="5" strokeLinecap="round" />
        </svg>
      );

    case 'blender':
      return (
        <svg width={pixelSize} height={pixelSize} viewBox="0 0 100 100" className={className} fill="none">
          <circle cx="50" cy="56" r="24" fill="#E87D0D" />
          <circle cx="50" cy="56" r="12" fill="#2563EB" />
          <circle cx="50" cy="56" r="6" fill="#FFF" />
          <ellipse cx="28" cy="34" rx="8" ry="16" transform="rotate(-30 28 34)" fill="#E87D0D" />
          <ellipse cx="50" cy="24" rx="8" ry="16" fill="#E87D0D" />
          <ellipse cx="72" cy="34" rx="8" ry="16" transform="rotate(30 72 34)" fill="#E87D0D" />
        </svg>
      );

    case 'figma':
      return (
        <svg width={pixelSize} height={pixelSize} viewBox="0 0 38 57" className={className} fill="none">
          <path d="M19 28.5a9.5 9.5 0 1 1 19 0 9.5 9.5 0 0 1-19 0z" fill="#1ABCFE" />
          <path d="M0 47.5A9.5 9.5 0 0 1 9.5 38H19v9.5a9.5 9.5 0 1 1-19 0z" fill="#0ACF83" />
          <path d="M19 0v19h9.5a9.5 9.5 0 1 0 0-19H19z" fill="#FF7262" />
          <path d="M0 9.5A9.5 9.5 0 0 0 9.5 19H19V0H9.5A9.5 9.5 0 0 0 0 9.5z" fill="#F24E1E" />
          <path d="M0 28.5A9.5 9.5 0 0 0 9.5 38H19V19H9.5A9.5 9.5 0 0 0 0 28.5z" fill="#A259FF" />
        </svg>
      );

    case 'framer':
      return (
        <svg width={pixelSize} height={pixelSize} viewBox="0 0 24 24" className={className} fill="none">
          <path fill="#0055FF" d="M4 0h16v8h-8zM4 8h8l8 8H4zM4 16h8v8z" />
        </svg>
      );

    case 'rive':
      return (
        <svg width={pixelSize} height={pixelSize} viewBox="0 0 100 100" className={className} fill="none">
          <rect width="100" height="100" rx="24" fill="#111" stroke="#FF8E00" strokeWidth="3" />
          <path d="M30 25h24c10 0 16 6 16 14 0 6-4 11-10 13l14 23H58L46 54h-4v21H30V25zm12 18h10c4 0 7-2 7-5s-3-5-7-5H42v10z" fill="#FF8E00" />
        </svg>
      );

    // =========================================================================
    // ROW 6: AI / WEB3 / CLOUD
    // =========================================================================
    case 'vercel-ai':
      return (
        <svg width={pixelSize} height={pixelSize} viewBox="0 0 100 100" className={className} fill="none">
          <circle cx="50" cy="50" r="46" fill="#000" stroke="#FFF" strokeWidth="3" />
          <path d="M50 20l26 46H24z" fill="#FFF" />
          <circle cx="50" cy="48" r="5" fill="#000" />
        </svg>
      );

    case 'ai-streaming':
      return (
        <svg width={pixelSize} height={pixelSize} viewBox="0 0 24 24" className={className} fill="none">
          <path d="M2 12c4-8 8-8 12 0s8 8 12 0" stroke="#14B8A6" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M2 6c4-8 8-8 12 0s8 8 12 0" stroke="#14B8A6" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
          <path d="M2 18c4-8 8-8 12 0s8 8 12 0" stroke="#14B8A6" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
        </svg>
      );

    case 'function-calling':
      return (
        <svg width={pixelSize} height={pixelSize} viewBox="0 0 24 24" className={className} fill="none">
          <path d="M7 4a3 3 0 0 0-3 3v2a3 3 0 0 1-3 3 3 3 0 0 1 3 3v2a3 3 0 0 0 3 3M17 4a3 3 0 0 1 3 3v2a3 3 0 0 0 3 3 3 3 0 0 0-3 3v2a3 3 0 0 1-3 3" stroke="#8B5CF6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="12" cy="12" r="2" fill="#8B5CF6" />
        </svg>
      );

    case 'tool-use':
      return (
        <svg width={pixelSize} height={pixelSize} viewBox="0 0 24 24" className={className} fill="none">
          <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" stroke="#EC4899" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );

    case 'cloudflare-workers':
      return (
        <svg width={pixelSize} height={pixelSize} viewBox="0 0 100 100" className={className} fill="none">
          <path fill="#F38020" d="M76 56c-1-8-8-14-16-14-3 0-6 1-9 3-4-9-13-15-23-15-13 0-24 9-26 22-7 1-12 7-12 14 0 8 7 14 15 14h66c7 0 13-6 13-13 0-6-5-10-8-11z" />
          <path d="M42 46l8 10 16-18" stroke="#FFF" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );

    case 'vercel-edge':
      return (
        <svg width={pixelSize} height={pixelSize} viewBox="0 0 100 100" className={className} fill="none">
          <circle cx="50" cy="50" r="46" fill="#050508" stroke="#FFF" strokeWidth="3" />
          <path d="M50 22l28 48H22z" fill="#FFF" />
        </svg>
      );

    case 'aws-lambda':
      return (
        <svg width={pixelSize} height={pixelSize} viewBox="0 0 100 100" className={className} fill="none">
          <rect width="100" height="100" rx="24" fill="#232F3E" stroke="#FF9900" strokeWidth="3" />
          <path d="M30 76l18-48h10l18 48h-11l-4-12H45l-4 12H30zm18-20h10l-5-16-5 16z" fill="#FF9900" />
        </svg>
      );

    case 'privy':
      return (
        <svg width={pixelSize} height={pixelSize} viewBox="0 0 100 100" className={className} fill="none">
          <circle cx="50" cy="50" r="46" fill="#0B132B" stroke="#3B82F6" strokeWidth="3" />
          <path d="M50 25c-10 0-18 8-18 18v8h-4v24h44V51h-4v-8c0-10-8-18-18-18zm-10 18c0-5 4-10 10-10s10 5 10 10v8H40v-8z" fill="#3B82F6" />
        </svg>
      );

    case 'siwe':
      return (
        <svg width={pixelSize} height={pixelSize} viewBox="0 0 100 100" className={className} fill="none">
          <circle cx="50" cy="50" r="46" fill="#1C1E38" stroke="#627EEA" strokeWidth="3" />
          <path fill="#627EEA" d="M50 18L32 48l18 10 18-10L50 18z" />
          <path fill="#8A92B2" d="M50 62L32 52l18 28 18-28-18 10z" />
        </svg>
      );

    case 'eip-712':
      return (
        <svg width={pixelSize} height={pixelSize} viewBox="0 0 24 24" className={className} fill="none">
          <rect x="4" y="3" width="16" height="18" rx="2" stroke="#8C8C8C" strokeWidth="2" />
          <path d="M8 8h8M8 12h8M8 16h5" stroke="#8C8C8C" strokeWidth="2" strokeLinecap="round" />
          <circle cx="16" cy="16" r="2" fill="#627EEA" />
        </svg>
      );

    case 'd3':
      return (
        <svg width={pixelSize} height={pixelSize} viewBox="0 0 100 100" className={className} fill="none">
          <circle cx="50" cy="50" r="46" fill="#1F1300" stroke="#F9A03F" strokeWidth="3" />
          <path d="M30 30h18c12 0 18 8 18 20s-6 20-18 20H30V30zm12 28h6c5 0 7-3 7-8s-2-8-7-8h-6v16z" fill="#F9A03F" />
          <circle cx="72" cy="62" r="6" fill="#F9A03F" />
        </svg>
      );

    default:
      return (
        <svg width={pixelSize} height={pixelSize} viewBox="0 0 24 24" className={className} fill="none">
          <circle cx="12" cy="12" r="10" stroke="#888" strokeWidth="2" />
          <text x="12" y="16" fill="#888" fontSize="10" textAnchor="middle">
            {id.slice(0, 3).toUpperCase()}
          </text>
        </svg>
      );
  }
};
