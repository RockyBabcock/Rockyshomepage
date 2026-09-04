import React from 'react';
import {
  SiHtml5,
  SiCss,
  SiJavascript,
  SiTypescript,
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiFramer,
  SiGreensock,
  SiSvelte,
  SiRemix,
  SiNuxt,
  SiAstro,
  SiRadixui,
  SiShadcnui,
  SiVite,
  SiNodedotjs,
  SiExpress,
  SiPhp,
  SiGraphql,
  SiTrpc,
  SiSocketdotio,
  SiPostgresql,
  SiMysql,
  SiMongodb,
  SiPrisma,
  SiDrizzle,
  SiSupabase,
  SiFirebase,
  SiRedis,
  SiDocker,
  SiThreedotjs,
  SiWebgl,
  SiOpengl,
  SiBlender,
  SiFigma,
  SiRive,
  SiVercel,
  SiCloudflare,
  SiD3,
  SiEthereum,
} from 'react-icons/si';
import { FaAws } from 'react-icons/fa6';
import {
  Network,
  Radio,
  Zap,
  Activity,
  Braces,
  Wrench,
  KeyRound,
  FileCheck,
} from 'lucide-react';

interface TechLogoProps {
  id: string;
  className?: string;
  size?: number;
  isConceptual?: boolean;
}

/**
 * TechLogo
 * Renders official brand vector marks using Simple Icons (react-icons/si) for real products
 * and restrained, neutral technical glyphs for conceptual architectural patterns (REST, SSE, WebSockets, etc.)
 */
export const TechLogo: React.FC<TechLogoProps> = ({
  id,
  className = '',
  size = 56,
}) => {
  const pixelSize = `${size}px`;

  // Standard brand icon wrapper to ensure strict React 19 SVG type safety and consistent sizing
  const renderBrand = (iconNode: React.ReactNode) => (
    <span
      className={`inline-flex items-center justify-center shrink-0 ${className}`}
      style={{ width: pixelSize, height: pixelSize }}
    >
      {iconNode}
    </span>
  );

  // Conceptual architectural glyph wrapper: visually distinguishes conceptual protocols from official company brands
  const renderConceptualGlyph = (icon: React.ReactNode, accentColor = '#94A3B8') => (
    <div
      style={{ width: pixelSize, height: pixelSize }}
      className={`relative flex items-center justify-center shrink-0 rounded-2xl border border-white/15 bg-white/[0.04] text-neutral-200 transition-colors duration-200 ${className}`}
    >
      <div style={{ color: accentColor }} className="w-3/5 h-3/5 flex items-center justify-center">
        {icon}
      </div>
      {/* Subtle protocol corner mark indicating conceptual architecture */}
      <span
        className="absolute bottom-1 right-1 w-1.5 h-1.5 rounded-full"
        style={{ backgroundColor: accentColor, opacity: 0.75 }}
        aria-hidden="true"
      />
    </div>
  );

  switch (id) {
    // =========================================================================
    // ROW 1: CORE WEB
    // =========================================================================
    case 'html5':
      return renderBrand(<SiHtml5 size={size} color="#E34F26" />);

    case 'css3':
      return renderBrand(<SiCss size={size} color="#1572B6" />);

    case 'javascript':
      return renderBrand(<SiJavascript size={size} color="#F7DF1E" />);

    case 'typescript':
      return renderBrand(<SiTypescript size={size} color="#3178C6" />);

    case 'react':
      return renderBrand(<SiReact size={size} color="#61DAFB" />);

    case 'nextjs':
      return renderBrand(<SiNextdotjs size={size} color="#FFFFFF" />);

    case 'tailwind':
      return renderBrand(<SiTailwindcss size={size} color="#38BDF8" />);

    case 'motion':
      return renderBrand(<SiFramer size={size} color="#F550FA" />);

    case 'gsap':
      return renderBrand(<SiGreensock size={size} color="#88CE02" />);

    // =========================================================================
    // ROW 2: FRONTEND / PRODUCT
    // =========================================================================
    case 'svelte':
      return renderBrand(<SiSvelte size={size} color="#FF3E00" />);

    case 'remix':
      return renderBrand(<SiRemix size={size} color="#FFFFFF" />);

    case 'nuxt':
      return renderBrand(<SiNuxt size={size} color="#00DC82" />);

    case 'astro':
      return renderBrand(<SiAstro size={size} color="#FF5D01" />);

    case 'radix':
      return renderBrand(<SiRadixui size={size} color="#FFFFFF" />);

    case 'shadcn':
      return renderBrand(<SiShadcnui size={size} color="#FFFFFF" />);

    case 'react-native':
      return renderBrand(<SiReact size={size} color="#61DAFB" />);

    case 'vite':
      return renderBrand(<SiVite size={size} color="#646CFF" />);

    // =========================================================================
    // ROW 3: BACKEND
    // =========================================================================
    case 'nodejs':
      return renderBrand(<SiNodedotjs size={size} color="#5FA04E" />);

    case 'express':
      return renderBrand(<SiExpress size={size} color="#FFFFFF" />);

    case 'php':
      return renderBrand(<SiPhp size={size} color="#777BB4" />);

    case 'rest-api':
      // Conceptual: REST API Architectural Resource Contract
      return renderConceptualGlyph(<Network className="w-full h-full stroke-[1.8]" />, '#10B981');

    case 'graphql':
      return renderBrand(<SiGraphql size={size} color="#E10098" />);

    case 'trpc':
      return renderBrand(<SiTrpc size={size} color="#2563EB" />);

    case 'websockets':
      // Conceptual: Full-Duplex Bidirectional Protocol
      return renderConceptualGlyph(<Radio className="w-full h-full stroke-[1.8]" />, '#F59E0B');

    case 'socketio':
      return renderBrand(<SiSocketdotio size={size} color="#FFFFFF" />);

    case 'sse':
      // Conceptual: Server-Sent Events Unidirectional Stream
      return renderConceptualGlyph(<Zap className="w-full h-full stroke-[1.8]" />, '#06B6D4');

    // =========================================================================
    // ROW 4: DATABASE & INFRASTRUCTURE
    // =========================================================================
    case 'postgresql':
      return renderBrand(<SiPostgresql size={size} color="#4169E1" />);

    case 'mysql':
      return renderBrand(<SiMysql size={size} color="#00758F" />);

    case 'mongodb':
      return renderBrand(<SiMongodb size={size} color="#47A248" />);

    case 'prisma':
      return renderBrand(<SiPrisma size={size} color="#5A67D8" />);

    case 'drizzle':
      return renderBrand(<SiDrizzle size={size} color="#C5F74F" />);

    case 'supabase':
      return renderBrand(<SiSupabase size={size} color="#3ECF8E" />);

    case 'firebase':
      return renderBrand(<SiFirebase size={size} color="#FFCA28" />);

    case 'redis':
      return renderBrand(<SiRedis size={size} color="#DC382D" />);

    case 'docker':
      return renderBrand(<SiDocker size={size} color="#2496ED" />);

    // =========================================================================
    // ROW 5: CREATIVE / 3D / DESIGN
    // =========================================================================
    case 'threejs':
      return renderBrand(<SiThreedotjs size={size} color="#FFFFFF" />);

    case 'webgl':
      return renderBrand(<SiWebgl size={size} color="#990000" />);

    case 'glsl':
      // Official Khronos OpenGL / GLSL shading language
      return renderBrand(<SiOpengl size={size} color="#5586A4" />);

    case 'spline':
      // Official Spline 3D Design & Vector Mark
      return (
        <span
          className={`inline-flex items-center justify-center shrink-0 ${className}`}
          style={{ width: pixelSize, height: pixelSize }}
        >
          <svg
            width={pixelSize}
            height={pixelSize}
            viewBox="0 0 100 100"
            fill="none"
          >
            <rect width="100" height="100" rx="24" fill="#0A0A1F" />
            <path
              d="M30 68c10 8 20 8 30 0s20-8 30 0M20 50c10-8 20-8 30 0s20 8 30 0M20 32c10 8 20 8 30 0s20-8 30 0"
              stroke="#5A54FF"
              strokeWidth="6"
              strokeLinecap="round"
            />
          </svg>
        </span>
      );

    case 'blender':
      return renderBrand(<SiBlender size={size} color="#E87D0D" />);

    case 'figma':
      return renderBrand(<SiFigma size={size} color="#F24E1E" />);

    case 'framer':
      return renderBrand(<SiFramer size={size} color="#0055FF" />);

    case 'rive':
      return renderBrand(<SiRive size={size} color="#FF8E00" />);

    // =========================================================================
    // ROW 6: AI / WEB3 / CLOUD
    // =========================================================================
    case 'vercel-ai':
      return renderBrand(<SiVercel size={size} color="#FFFFFF" />);

    case 'ai-streaming':
      // Conceptual: Chunked Token Streaming Protocol
      return renderConceptualGlyph(<Activity className="w-full h-full stroke-[1.8]" />, '#14B8A6');

    case 'function-calling':
      // Conceptual: Structured Tool & Function Calling Schema
      return renderConceptualGlyph(<Braces className="w-full h-full stroke-[1.8]" />, '#8B5CF6');

    case 'tool-use':
      // Conceptual: Autonomous Agent Tool Execution
      return renderConceptualGlyph(<Wrench className="w-full h-full stroke-[1.8]" />, '#EC4899');

    case 'cloudflare-workers':
      return renderBrand(<SiCloudflare size={size} color="#F38020" />);

    case 'vercel-edge':
      return renderBrand(<SiVercel size={size} color="#FFFFFF" />);

    case 'aws-lambda':
      return renderBrand(<FaAws size={size} color="#FF9900" />);

    case 'privy':
      // Conceptual / Web3 Key Management & Embedded Wallets
      return renderConceptualGlyph(<KeyRound className="w-full h-full stroke-[1.8]" />, '#3B82F6');

    case 'siwe':
      // Sign-In With Ethereum: Ethereum cryptographic identity protocol
      return renderBrand(<SiEthereum size={size} color="#627EEA" />);

    case 'eip-712':
      // Conceptual: Typed Structured Cryptographic Data Signatures
      return renderConceptualGlyph(<FileCheck className="w-full h-full stroke-[1.8]" />, '#8C8C8C');

    case 'd3':
      return renderBrand(<SiD3 size={size} color="#F9A03F" />);

    default:
      return (
        <div
          style={{ width: pixelSize, height: pixelSize }}
          className={`flex items-center justify-center shrink-0 rounded-2xl border border-white/10 bg-white/5 text-neutral-400 font-mono text-xs font-semibold ${className}`}
        >
          {id.slice(0, 3).toUpperCase()}
        </div>
      );
  }
};
