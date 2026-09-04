import React from 'react';
import { motion } from 'motion/react';
import { SkillGroup, SkillItem as SkillItemType } from '../../data/skills';
import { SkillItem } from './SkillItem';

interface SkillModuleProps {
  group: SkillGroup;
  skills: SkillItemType[];
  activeSkillId?: string | null;
  onSelectSkill: (skill: SkillItemType) => void;
  index: number;
}

/**
 * Large Dark Translucent Architectural Control System Container
 * Represents one of the four foundational pillars:
 * 01 — FRONTEND
 * 02 — BACKEND
 * 03 — DATABASE
 * 04 — DEVOPS / DESIGN
 */
export const SkillModule: React.FC<SkillModuleProps> = ({
  group,
  skills,
  activeSkillId,
  onSelectSkill,
  index,
}) => {
  const moduleVariants = {
    hidden: {
      opacity: 0,
      y: 28,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: index * 0.12,
        ease: [0.25, 1, 0.5, 1],
      },
    },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.08 }}
      variants={moduleVariants}
      className="relative flex flex-col w-full rounded-2xl sm:rounded-3xl p-5 sm:p-7 md:p-8 overflow-hidden transition-all duration-300"
      style={{
        backgroundColor: 'rgba(7, 8, 15, 0.72)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: '1px solid rgba(255, 255, 255, 0.09)',
        boxShadow:
          '0 20px 50px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.06)',
      }}
    >
      {/* Controlled Atmospheric Ambient Corner Glow */}
      <div
        className="absolute top-0 right-0 w-80 h-80 pointer-events-none rounded-full blur-3xl -z-10 opacity-30"
        style={{
          background: `radial-gradient(circle, ${group.accentColor}33 0%, rgba(112, 66, 248, 0.1) 40%, transparent 70%)`,
          transform: 'translate(25%, -25%)',
        }}
        aria-hidden="true"
      />

      {/* Top Accent Line */}
      <div
        className="absolute top-0 left-8 right-8 h-[1px]"
        style={{
          background: `linear-gradient(90deg, transparent 0%, ${group.accentColor}66 30%, ${group.accentColor}88 50%, ${group.accentColor}66 70%, transparent 100%)`,
        }}
        aria-hidden="true"
      />

      {/* Module Header: System Identifier, Title, Subtitle, Metric */}
      <div className="flex flex-col gap-2.5 mb-6 pb-5 border-b border-white/[0.07]">
        <div className="flex items-center justify-between gap-3 flex-wrap">
          {/* Module Identifier & Title */}
          <div className="flex items-center gap-2.5">
            <span
              className="font-mono text-xs sm:text-sm font-semibold tracking-wider px-2 py-0.5 rounded border"
              style={{
                borderColor: `${group.accentColor}44`,
                backgroundColor: `${group.accentColor}15`,
                color: group.accentColor,
              }}
            >
              {group.number}
            </span>
            <h3 className="font-[family-name:var(--title-font)] text-lg sm:text-xl md:text-2xl font-semibold text-white tracking-wide">
              {group.title}
            </h3>
          </div>

          {/* System Badge */}
          <div className="flex items-center gap-2">
            <span className="font-mono text-[10px] tracking-widest text-white/50 uppercase border border-white/10 px-2.5 py-0.5 rounded-full bg-white/[0.03]">
              {group.badge}
            </span>
            <span className="font-mono text-[10px] text-white/35">
              {skills.length} UNITS
            </span>
          </div>
        </div>

        {/* Subtitle / Architectural Scope */}
        <p className="font-[family-name:var(--body-font)] text-xs sm:text-[13px] text-white/55 max-w-xl leading-relaxed">
          {group.subtitle}
        </p>
      </div>

      {/* Uniform Technology Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
        {skills.map((skill) => (
          <SkillItem
            key={skill.id}
            skill={skill}
            onSelect={onSelectSkill}
            isSelected={activeSkillId === skill.id}
          />
        ))}
      </div>
    </motion.div>
  );
};
