import React from 'react';
import { SkillItem as SkillItemType } from '../../data/skills';

interface SkillItemProps {
  skill: SkillItemType;
  isActive: boolean;
  isMuted: boolean;
  onSelect: (skill: SkillItemType) => void;
  onHover: (skill: SkillItemType | null) => void;
}

export const SkillItem: React.FC<SkillItemProps> = ({
  skill,
  isActive,
  isMuted,
  onSelect,
  onHover,
}) => {
  return (
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
      className={`group relative text-left w-full h-[108px] p-3 rounded-xl border transition-all duration-250 select-none cursor-pointer flex flex-col justify-between overflow-hidden outline-none ${
        isActive
          ? 'bg-white/[0.09] border-white/35 shadow-[0_4px_24px_rgba(0,0,0,0.5)] -translate-y-0.5'
          : isMuted
          ? 'bg-white/[0.018] border-white/[0.05] opacity-50'
          : 'bg-white/[0.03] border-white/[0.08] hover:bg-white/[0.06] hover:border-white/20 hover:-translate-y-0.5 hover:shadow-[0_4px_18px_rgba(0,0,0,0.35)]'
      }`}
      style={{
        boxShadow: isActive
          ? `inset 0 1px 0 rgba(255,255,255,0.15), 0 0 20px ${skill.brandColor}22`
          : undefined,
      }}
    >
      {/* Subtle brand color accent line on top when active */}
      {isActive && (
        <span
          className="absolute top-0 left-0 right-0 h-[2px] opacity-80"
          style={{ backgroundColor: skill.brandColor }}
          aria-hidden="true"
        />
      )}

      {/* Top row: Icon on left, Status Badge on right */}
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

        <span
          className="px-1.5 py-0.5 rounded text-[9px] font-mono font-semibold tracking-wider uppercase border border-white/10 text-white/60 bg-white/[0.03] whitespace-nowrap transition-colors group-hover:text-white/90 group-hover:border-white/20"
        >
          {skill.badge}
        </span>
      </div>

      {/* Bottom info: Technology Name and short role */}
      <div className="flex flex-col mt-1 min-w-0">
        <span className="font-[family-name:var(--title-font)] text-[13.5px] font-medium text-white tracking-wide truncate group-hover:text-white transition-colors">
          {skill.name}
        </span>
        <span className="font-[family-name:var(--body-font)] text-[11px] text-white/50 leading-snug line-clamp-1 mt-0.5 group-hover:text-white/70 transition-colors">
          {skill.shortRole}
        </span>
      </div>
    </button>
  );
};
