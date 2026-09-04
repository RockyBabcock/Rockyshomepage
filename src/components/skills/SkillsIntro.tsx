import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Terminal, Cpu, Database, Layers } from 'lucide-react';

interface SkillsIntroProps {
  totalSkillsCount: number;
}

/**
 * Editorial Typography & Space Atmosphere Introduction
 * SPACE ATMOSPHERE → EDITORIAL TYPOGRAPHY → FOUR LARGE TECHNOLOGY MODULES
 */
export const SkillsIntro: React.FC<SkillsIntroProps> = ({ totalSkillsCount }) => {
  const slideDown = {
    hidden: { y: -20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.45, ease: [0.25, 1, 0.5, 1] },
    },
  };

  const slideLeft = {
    hidden: { x: -30, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { delay: 0.1, duration: 0.5, ease: [0.25, 1, 0.5, 1] },
    },
  };

  const slideRight = {
    hidden: { x: 30, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { delay: 0.2, duration: 0.5, ease: [0.25, 1, 0.5, 1] },
    },
  };

  return (
    <div className="w-full max-w-5xl flex flex-col items-center justify-center text-center mx-auto mb-14 md:mb-20 select-none">
      {/* Welcome-box pill badge with glowing sparkle */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={slideDown}
        className="flex items-center gap-2 py-1.5 px-4 rounded-full border border-purple-500/30 bg-purple-950/25 backdrop-blur-md shadow-[0_0_20px_rgba(112,66,248,0.25)] mb-4"
      >
        <Sparkles className="w-3.5 h-3.5 text-purple-400" aria-hidden="true" />
        <span className="font-mono text-[11px] sm:text-xs font-semibold tracking-widest text-purple-200 uppercase">
          03 — Engineering Systems & Architecture
        </span>
      </motion.div>

      {/* Large Editorial Heading */}
      <motion.h2
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={slideLeft}
        className="title text-[13vw] sm:text-[14vh] font-normal leading-[0.88] tracking-normal m-0 text-white"
      >
        Skills
      </motion.h2>

      {/* Concise Technical Statement */}
      <motion.p
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={slideRight}
        className="font-[family-name:var(--title-font)] text-lg sm:text-2xl md:text-3xl text-white/95 font-medium tracking-wide mt-4 mb-2"
      >
        Advanced Engineering Systems & Creative Technology
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
            transition: { delay: 0.3, duration: 0.5 },
          },
        }}
        className="font-[family-name:var(--body-font)] text-xs sm:text-sm md:text-[15px] text-white/60 max-w-2xl leading-relaxed mt-1"
      >
        Structured across four independent architectural control modules spanning type-safe client interfaces,
        asynchronous backend runtimes, resilient persistence layers, and spatial 3D creative pipelines.
      </motion.p>

      {/* System Telemetry Badges */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          hidden: { opacity: 0, y: 12 },
          visible: {
            opacity: 1,
            y: 0,
            transition: { delay: 0.4, duration: 0.5 },
          },
        }}
        className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mt-6 pt-5 border-t border-white/[0.08]"
      >
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/[0.03] border border-white/10 font-mono text-[11px] text-white/70">
          <Layers className="w-3.5 h-3.5 text-sky-400" />
          <span>4 CONTROL MODULES</span>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/[0.03] border border-white/10 font-mono text-[11px] text-white/70">
          <Terminal className="w-3.5 h-3.5 text-emerald-400" />
          <span>{totalSkillsCount} CAPABILITY UNITS</span>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/[0.03] border border-white/10 font-mono text-[11px] text-white/70">
          <Cpu className="w-3.5 h-3.5 text-purple-400" />
          <span>ZERO RUNTIME AMBIGUITY</span>
        </div>
      </motion.div>
    </div>
  );
};
