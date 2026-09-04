import React from 'react';
import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';

export const SkillText: React.FC = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center text-center mb-16 sm:mb-20 md:mb-24 z-10 px-4">
      {/* Small futuristic glowing pill / eyebrow matching Space-Portfolio */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#7042f88b] bg-[#030014]/60 backdrop-blur-md shadow-[0_0_20px_rgba(112,66,248,0.2)] mb-5"
      >
        <Sparkles className="text-[#b49bff] w-4 h-4 animate-pulse" />
        <span className="text-[12px] sm:text-[13px] font-medium tracking-wide text-purple-200">
          Crafting with modern technologies
        </span>
      </motion.div>

      {/* Main Title: Skills */}
      <motion.h2
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.15, ease: 'easeOut' }}
        className="text-4xl sm:text-5xl md:text-6xl font-light tracking-tight text-white"
      >
        Skills & Technologies
      </motion.h2>

      {/* Elegant secondary statement */}
      <motion.p
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.25, ease: 'easeOut' }}
        className="text-base sm:text-lg md:text-xl text-neutral-300 font-light mt-3 max-w-xl"
      >
        Making digital experiences with modern technology.
      </motion.p>
    </div>
  );
};
