import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SkillGroup, SkillItem as SkillItemType } from '../../data/skills';
import { SkillItem } from './SkillItem';
import { SkillDetail } from './SkillDetail';

interface SkillModuleProps {
  group: SkillGroup;
  skills: SkillItemType[];
  activeSkill: SkillItemType | null;
  hoveredSkill: SkillItemType | null;
  onSelectSkill: (skill: SkillItemType) => void;
  onHoverSkill: (skill: SkillItemType | null) => void;
  onCloseDetail: () => void;
  onSelectProject?: (projectId: string) => void;
  verticalOffsetClass?: string;
  delayIndex?: number;
}

export const SkillModule: React.FC<SkillModuleProps> = ({
  group,
  skills,
  activeSkill,
  hoveredSkill,
  onSelectSkill,
  onHoverSkill,
  onCloseDetail,
  onSelectProject,
  verticalOffsetClass = '',
  delayIndex = 0,
}) => {
  const isAnyActiveInModule = skills.some((s) => s.id === activeSkill?.id);
  const activeSkillInModule = isAnyActiveInModule ? activeSkill : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: 0.65,
        delay: 0.1 + delayIndex * 0.1,
        ease: [0.25, 1, 0.5, 1],
      }}
      className={`relative w-full ${verticalOffsetClass}`}
    >
      <div
        className="group relative rounded-2xl md:rounded-3xl p-5 sm:p-6 md:p-7 border border-white/[0.08] hover:border-white/[0.16] transition-all duration-300"
        style={{
          backgroundColor: 'rgba(9, 10, 15, 0.72)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          boxShadow:
            'inset 0 1px 0 rgba(255, 255, 255, 0.07), 0 16px 40px -10px rgba(0, 0, 0, 0.6)',
        }}
      >
        {/* Subtle Module Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/[0.07] pb-4 mb-4">
          <div className="flex items-center gap-2.5">
            <span className="font-[family-name:var(--title-font)] text-white/40 text-xs sm:text-[13px] tracking-[0.2em] font-bold">
              {group.number}
            </span>
            <span className="text-white/20 text-xs">•</span>
            <h3 className="font-[family-name:var(--title-font)] text-white text-base sm:text-lg font-medium tracking-wide m-0">
              {group.title}
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded-full text-[10px] font-mono tracking-wider font-semibold uppercase bg-white/[0.05] border border-white/10 text-white/60">
              {group.badge}
            </span>
          </div>
        </div>

        {/* Subtitle / Scope descriptor */}
        <p className="font-[family-name:var(--body-font)] text-xs text-white/50 leading-relaxed mb-5 max-w-xl">
          {group.subtitle}
        </p>

        {/* Consistent Uniform Technology Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-3">
          {skills.map((skill) => {
            const isActive = activeSkill?.id === skill.id;
            const isMuted =
              (hoveredSkill !== null && hoveredSkill.id !== skill.id) ||
              (activeSkill !== null && activeSkill.id !== skill.id);

            return (
              <SkillItem
                key={skill.id}
                skill={skill}
                isActive={isActive}
                isMuted={isMuted}
                onSelect={onSelectSkill}
                onHover={onHoverSkill}
              />
            );
          })}
        </div>

        {/* Contextual In-Module Detail Inspector */}
        <AnimatePresence>
          {activeSkillInModule && (
            <SkillDetail
              skill={activeSkillInModule}
              onClose={onCloseDetail}
              onSelectProject={onSelectProject}
            />
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};
