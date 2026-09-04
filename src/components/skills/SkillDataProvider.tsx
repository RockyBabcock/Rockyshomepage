import React from 'react';
import { motion } from 'motion/react';
import { SkillItem } from '../../data/skills';

interface SkillDataProviderProps {
  skill: SkillItem;
  index: number;
  onSelect: (skill: SkillItem) => void;
  isSelected?: boolean;
}

/**
 * SkillDataProvider
 * Faithfully reproduces the Space Portfolio skill data provider animation principle:
 * Intersection Observer (whileInView) + Motion + index-based progressive stagger delay.
 * 
 * Technology icons float directly suspended in the deep-space atmosphere without
 * restrictive rectangular card containers or heavy dashboard borders.
 */
export const SkillDataProvider: React.FC<SkillDataProviderProps> = ({
  skill,
  index,
  onSelect,
  isSelected = false,
}) => {
  const animationDelay = 0.08;

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 18,
      scale: 0.92,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: index * animationDelay,
        duration: 0.45,
        ease: [0.25, 1, 0.5, 1],
      },
    },
  };

  const iconWidth = skill.width || 64;
  const iconHeight = skill.height || 64;

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={itemVariants}
      className="relative flex flex-col items-center justify-center p-2.5 sm:p-3.5 group select-none"
    >
      <button
        type="button"
        onClick={() => onSelect(skill)}
        aria-label={`View details for ${skill.name}`}
        aria-haspopup="dialog"
        aria-pressed={isSelected}
        className="relative flex flex-col items-center justify-center focus:outline-none transition-transform duration-300 group-hover:scale-110 group-hover:-translate-y-1 cursor-pointer"
      >
        {/* Subtle Ambient Brand Glow Ring behind icon on hover */}
        <div
          className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none blur-xl -z-10"
          style={{
            background: `radial-gradient(circle, ${skill.brandColor}66 0%, transparent 70%)`,
            transform: 'scale(1.4)',
          }}
          aria-hidden="true"
        />

        {/* Floating Technology Icon */}
        <div
          className="relative flex items-center justify-center transition-all duration-300"
          style={{
            width: iconWidth,
            height: iconHeight,
          }}
        >
          <img
            src={skill.icon}
            alt={skill.name}
            loading="lazy"
            className="w-full h-full object-contain filter drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)] transition-all duration-300 group-hover:drop-shadow-[0_6px_20px_rgba(255,255,255,0.25)]"
          />
        </div>

        {/* Small floating technical label underneath */}
        <div className="flex flex-col items-center mt-2 pointer-events-none">
          <span className="font-[family-name:var(--body-font)] text-[12px] sm:text-[13px] text-white/70 font-medium tracking-wide transition-colors duration-200 group-hover:text-white whitespace-nowrap">
            {skill.name}
          </span>
          <span className="text-[9px] font-mono tracking-widest text-white/40 uppercase opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200">
            {skill.badge}
          </span>
        </div>
      </button>
    </motion.div>
  );
};
