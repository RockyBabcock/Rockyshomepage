import React from 'react';
import { motion } from 'motion/react';
import { SkillItem as SkillItemType } from '../../data/skills';

interface SkillItemProps {
  skill: SkillItemType;
  index: number;
  isActive: boolean;
  isMuted: boolean;
  onSelect: (skill: SkillItemType) => void;
  onHover: (skill: SkillItemType | null) => void;
}

/**
 * Technical Control Module Card
 * Recreates the Space Portfolio skill data provider animation principle:
 * Intersection Observer + Motion + index-based progressive entrance delay.
 */
export const SkillItem: React.FC<SkillItemProps> = ({
  skill,
  index,
  isActive,
  isMuted,
  onSelect,
  onHover,
}) => {
  const cardVariants = {
    hidden: { opacity: 0, y: 14 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: Math.min(index * 0.06, 0.45),
        duration: 0.4,
        ease: [0.25, 1, 0.5, 1],
      },
    },
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      className="w-full"
    >
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onSelect(skill);
        }}
        onMouseEnter={() => onHover(skill)}
        onMouseLeave={() => onHover(null)}
        onFocus={() => onHover(skill)}
        onBlur={() => onHover(null)}
        aria-label={`${skill.name}: ${skill.shortRole}`}
        aria-pressed={isActive}
        className={`group relative text-left w-full h-[110px] p-3 rounded-xl border transition-all duration-200 select-none cursor-pointer flex flex-col justify-between overflow-hidden outline-none ${
          isActive
            ? 'bg-white/[0.09] border-white/35 shadow-[0_4px_24px_rgba(0,0,0,0.5)] -translate-y-0.5'
            : isMuted
            ? 'bg-white/[0.015] border-white/[0.05] opacity-50'
            : 'bg-white/[0.03] border-white/[0.08] hover:bg-white/[0.065] hover:border-white/20 hover:-translate-y-0.5 hover:shadow-[0_4px_18px_rgba(0,0,0,0.35)]'
        }`}
        style={{
          boxShadow: isActive
            ? `inset 0 1px 0 rgba(255,255,255,0.18), 0 0 20px ${skill.brandColor}24, 0 4px 16px rgba(0,0,0,0.5)`
            : undefined,
        }}
      >
        {/* Active state brand indicator bar */}
        {isActive && (
          <span
            className="absolute top-0 left-0 right-0 h-[2px] opacity-90"
            style={{ backgroundColor: skill.brandColor }}
            aria-hidden="true"
          />
        )}

        {/* Top bar: Icon on left, Contextual Badge on right */}
        <div className="flex items-center justify-between gap-2 w-full">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center p-1.5 border transition-transform duration-200 group-hover:scale-105"
            style={{
              backgroundColor: isActive
                ? 'rgba(255, 255, 255, 0.08)'
                : 'rgba(255, 255, 255, 0.04)',
              borderColor: isActive
                ? `${skill.brandColor}66`
                : 'rgba(255, 255, 255, 0.1)',
            }}
          >
            <img
              src={skill.icon}
              alt=""
              aria-hidden="true"
              loading="lazy"
              className="w-full h-full object-contain filter drop-shadow-sm"
            />
          </div>

          <span className="px-1.5 py-0.5 rounded text-[9px] font-mono font-semibold tracking-wider uppercase border border-white/10 text-white/60 bg-white/[0.03] whitespace-nowrap transition-colors group-hover:text-white/90 group-hover:border-white/20">
            {skill.badge}
          </span>
        </div>

        {/* Card info: Name and short descriptive technical role */}
        <div className="flex flex-col mt-1 min-w-0">
          <span className="font-[family-name:var(--title-font)] text-[13.5px] font-medium text-white tracking-wide truncate group-hover:text-white transition-colors">
            {skill.name}
          </span>
          <span className="font-[family-name:var(--body-font)] text-[11px] text-white/50 leading-snug line-clamp-1 mt-0.5 group-hover:text-white/70 transition-colors">
            {skill.shortRole}
          </span>
        </div>
      </button>
    </motion.div>
  );
};
