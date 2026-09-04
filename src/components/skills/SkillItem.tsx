import React from 'react';
import { SkillItem as SkillItemType } from '../../data/skills';
import { TechIcon } from './TechIcon';

interface SkillItemProps {
  skill: SkillItemType;
  onSelect: (skill: SkillItemType) => void;
  isSelected?: boolean;
}

/**
 * Uniform Technology Card
 * Every single technology card strictly adheres to the SAME geometry, padding, and hierarchy:
 * - Left: Technology icon with subtle brand-color backing
 * - Middle: Technology name (13px, font-semibold) + short technical description (11px, text-white/50)
 * - Right: Small contextual badge (e.g. CORE, 2+ YRS, SSR, RELATIONAL, CACHE)
 * 
 * On hover:
 * - Subtle upward movement (-translate-y-0.5)
 * - Brand-color ambient glow and border brightening
 * - Icon scales smoothly (scale-105)
 */
export const SkillItem: React.FC<SkillItemProps> = ({
  skill,
  onSelect,
  isSelected = false,
}) => {
  return (
    <button
      type="button"
      onClick={() => onSelect(skill)}
      aria-label={`Inspect ${skill.name} capability details`}
      aria-haspopup="dialog"
      aria-pressed={isSelected}
      className="group relative flex items-center justify-between w-full h-[66px] px-3.5 py-2.5 rounded-xl text-left select-none cursor-pointer transition-all duration-200 outline-none focus-visible:ring-1 focus-visible:ring-purple-400 focus-visible:ring-offset-1 focus-visible:ring-offset-[#07080e] overflow-hidden"
      style={{
        backgroundColor: isSelected ? 'rgba(255, 255, 255, 0.08)' : 'rgba(255, 255, 255, 0.025)',
        border: `1px solid ${isSelected ? 'rgba(255, 255, 255, 0.25)' : 'rgba(255, 255, 255, 0.08)'}`,
      }}
    >
      {/* Subtle Brand Color Accent Glow on Hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-xl"
        style={{
          background: `radial-gradient(ellipse 90% 80% at 50% 50%, ${skill.brandColor}18 0%, transparent 80%)`,
          boxShadow: `inset 0 0 16px ${skill.brandColor}15`,
        }}
        aria-hidden="true"
      />

      {/* Left: Icon & Text Information */}
      <div className="flex items-center gap-3 min-w-0 pr-2 z-10">
        {/* Technology Icon container */}
        <div
          className="relative flex items-center justify-center w-8 h-8 rounded-lg shrink-0 border border-white/10 transition-transform duration-200 group-hover:scale-105"
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.04)',
            boxShadow: `0 2px 8px ${skill.brandColor}22`,
          }}
        >
          <TechIcon
            icon={skill.icon}
            name={skill.name}
            brandColor={skill.brandColor}
            size={18}
          />
        </div>

        {/* Text Block */}
        <div className="flex flex-col min-w-0">
          <span className="font-[family-name:var(--body-font)] text-[13px] font-semibold text-white/90 tracking-wide truncate group-hover:text-white transition-colors duration-150">
            {skill.name}
          </span>
          <span className="font-[family-name:var(--body-font)] text-[11px] text-white/45 truncate tracking-normal group-hover:text-white/65 transition-colors duration-150">
            {skill.shortRole}
          </span>
        </div>
      </div>

      {/* Right: Contextual Technical Badge */}
      <div className="shrink-0 z-10">
        <span
          className="inline-flex items-center justify-center font-mono text-[9px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded border transition-colors duration-150"
          style={{
            borderColor: `${skill.brandColor}35`,
            backgroundColor: `${skill.brandColor}12`,
            color: skill.brandColor,
          }}
        >
          {skill.badge}
        </span>
      </div>
    </button>
  );
};
