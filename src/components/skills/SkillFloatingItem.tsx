import React, { useState } from 'react';
import { motion } from 'motion/react';
import { SkillItem } from '../../data/skills';
import { TechLogo } from './TechLogo';

interface SkillFloatingItemProps {
  skill: SkillItem;
  index: number;
  onSelect: (skill: SkillItem) => void;
  isDimmed?: boolean;
}

export const SkillFloatingItem: React.FC<SkillFloatingItemProps> = ({
  skill,
  index,
  onSelect,
  isDimmed = false,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  // Staggered celestial entry animation matching Space-Portfolio principles
  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 24,
      scale: 0.88,
    },
    visible: (customIndex: number) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: Math.min(customIndex * 0.04 + 0.1, 1.2),
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
      },
    }),
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onSelect(skill);
    }
  };

  return (
    <motion.div
      custom={index}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={itemVariants}
      className={`group relative flex flex-col items-center justify-center cursor-pointer transition-opacity duration-300 outline-none select-none ${
        isDimmed ? 'opacity-35' : 'opacity-100'
      }`}
      onClick={() => onSelect(skill)}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      tabIndex={0}
      role="button"
      aria-label={`View ${skill.name} architecture profile`}
    >
      {/* Floating Logo Object: Pure icon with brand glow, NO rectangular card or border */}
      <div
        className="relative flex items-center justify-center transition-transform duration-300 ease-out group-hover:scale-115 group-active:scale-105"
        style={{
          filter: isHovered
            ? `drop-shadow(0 0 20px ${skill.brandColor}99) drop-shadow(0 0 35px rgba(112, 66, 248, 0.3))`
            : 'drop-shadow(0 4px 12px rgba(0, 0, 0, 0.4))',
        }}
      >
        {/* Soft radial aura behind logo on hover */}
        <div
          className="absolute inset-0 -inset-x-2 -inset-y-2 rounded-full pointer-events-none transition-opacity duration-300 opacity-0 group-hover:opacity-100"
          style={{
            background: `radial-gradient(circle, ${skill.brandColor}25 0%, rgba(112, 66, 248, 0.15) 50%, transparent 75%)`,
            filter: 'blur(12px)',
          }}
          aria-hidden="true"
        />

        {/* Responsive Logo Container */}
        <div className="w-[52px] h-[52px] sm:w-[64px] sm:h-[64px] md:w-[72px] md:h-[72px] flex items-center justify-center relative z-10">
          <TechLogo id={skill.id} size={64} className="w-full h-full object-contain" />
        </div>
      </div>

      {/* Subtle, elegant label underneath: No heavy badge, no rectangular box */}
      <span className="mt-2.5 text-[11px] sm:text-xs font-medium tracking-wide text-neutral-400 group-hover:text-white transition-colors duration-200 text-center whitespace-nowrap">
        {skill.name}
      </span>
    </motion.div>
  );
};
