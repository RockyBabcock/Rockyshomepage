import React from 'react';
import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';

/**
 * SkillText
 * Directly adapted from Space Portfolio's components/sub/skill-text.tsx:
 * Welcome pill with icon + editorial heading + technical statement + supporting description.
 */
export const SkillText: React.FC = () => {
  const slideInFromTop = {
    hidden: { y: -25, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: [0.25, 1, 0.5, 1],
      },
    },
  };

  const slideInFromLeft = {
    hidden: { x: -40, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        delay: 0.15,
        duration: 0.6,
        ease: [0.25, 1, 0.5, 1],
      },
    },
  };

  const slideInFromRight = {
    hidden: { x: 40, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        delay: 0.25,
        duration: 0.6,
        ease: [0.25, 1, 0.5, 1],
      },
    },
  };

  return (
    <div className="w-full max-w-4xl flex flex-col items-center justify-center text-center mx-auto mb-10 md:mb-14 select-none">
      {/* Welcome-box pill badge with glowing sparkle */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={slideInFromTop}
        className="flex items-center gap-2 py-1.5 px-3.5 rounded-full border border-purple-500/30 bg-purple-950/20 backdrop-blur-md shadow-[0_0_15px_rgba(112,66,248,0.2)] mb-4"
      >
        <Sparkles className="w-3.5 h-3.5 text-purple-400" aria-hidden="true" />
        <span className="font-mono text-[11px] sm:text-xs font-semibold tracking-widest text-purple-200 uppercase">
          03 — Capabilities & Architecture
        </span>
      </motion.div>

      {/* Large Editorial Heading */}
      <motion.h2
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={slideInFromLeft}
        className="title text-[13vw] sm:text-[14vh] font-normal leading-[0.9] tracking-normal m-0 text-white"
      >
        Skills
      </motion.h2>

      {/* Concise Technical Statement */}
      <motion.p
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={slideInFromRight}
        className="font-[family-name:var(--title-font)] text-lg sm:text-2xl md:text-3xl text-white/95 font-medium tracking-wide mt-3 mb-2"
      >
        Technologies I use to design, build, and experiment.
      </motion.p>

      {/* Supporting Editorial Scope */}
      <motion.p
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          hidden: { opacity: 0, y: 15 },
          visible: {
            opacity: 1,
            y: 0,
            transition: { delay: 0.35, duration: 0.5 },
          },
        }}
        className="font-[family-name:var(--body-font)] text-xs sm:text-sm md:text-[15px] text-white/60 max-w-2xl leading-relaxed mt-1"
      >
        Spanning reactive client architectures, distributed backend runtimes,
        spatial 3D WebGL, and scalable cloud infrastructure.
      </motion.p>
    </div>
  );
};
