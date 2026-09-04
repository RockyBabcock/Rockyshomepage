import React from 'react';
import { motion } from 'motion/react';
import { SkillItem, PROJECT_NAMES, SKILL_GROUPS } from '../../data/skills';

interface SkillDetailProps {
  skill: SkillItem;
  onClose: () => void;
  onSelectProject?: (projectId: string) => void;
}

export const SkillDetail: React.FC<SkillDetailProps> = ({
  skill,
  onClose,
  onSelectProject,
}) => {
  const group = SKILL_GROUPS.find((g) => g.id === skill.category);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12, height: 0 }}
      animate={{ opacity: 1, y: 0, height: 'auto' }}
      exit={{ opacity: 0, y: 8, height: 0 }}
      transition={{ duration: 0.26, ease: [0.25, 1, 0.5, 1] }}
      className="mt-4 pt-4 border-t border-white/10 overflow-hidden"
    >
      <div className="rounded-xl bg-white/[0.04] border border-white/12 p-4 text-left shadow-xl relative">
        {/* Close Button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          aria-label="Close detailed view"
          className="absolute top-3 right-3 w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/70 hover:text-white text-xs transition-colors cursor-pointer"
        >
          ✕
        </button>

        {/* Header with icon and name */}
        <div className="flex items-center gap-3 mb-3 pr-8">
          <div
            className="w-10 h-10 rounded-lg flex items-center justify-center p-2 border"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.06)',
              borderColor: `${skill.brandColor}55`,
              boxShadow: `0 0 16px ${skill.brandColor}25`,
            }}
          >
            <img src={skill.icon} alt="" className="w-full h-full object-contain" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="font-[family-name:var(--title-font)] text-base font-medium text-white m-0 leading-tight">
                {skill.name}
              </h4>
              <span className="px-1.5 py-0.5 rounded text-[9px] font-mono font-semibold uppercase tracking-wider bg-white/10 text-white/80">
                {skill.badge}
              </span>
            </div>
            <span className="text-white/45 text-[11px] font-[family-name:var(--body-font)] block mt-0.5">
              {group?.number} — {group?.title}
            </span>
          </div>
        </div>

        {/* Architectural Role */}
        <div className="mb-2.5">
          <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest block mb-0.5 font-[family-name:var(--body-font)]">
            Architectural Role
          </span>
          <p className="font-[family-name:var(--body-font)] text-xs text-white/95 font-medium leading-snug">
            {skill.role}
          </p>
        </div>

        {/* Application / Usage */}
        <div className="mb-3">
          <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest block mb-0.5 font-[family-name:var(--body-font)]">
            Application & Implementation
          </span>
          <p className="font-[family-name:var(--body-font)] text-[11.5px] text-white/70 leading-relaxed">
            {skill.usage}
          </p>
        </div>

        {/* Key Capabilities Tags */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {skill.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 rounded-full bg-white/[0.05] border border-white/10 text-white/75 text-[10.5px] font-[family-name:var(--body-font)]"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Related Projects */}
        {skill.relatedProjects && skill.relatedProjects.length > 0 && (
          <div className="border-t border-white/10 pt-2.5 mt-2">
            <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest block mb-1.5 font-[family-name:var(--body-font)]">
              Featured in Work
            </span>
            <div className="flex flex-wrap gap-2">
              {skill.relatedProjects.map((projId) => {
                const proj = PROJECT_NAMES[projId];
                if (!proj) return null;
                return (
                  <button
                    key={projId}
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectProject?.(projId);
                    }}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 text-left transition-colors cursor-pointer text-white/80 hover:text-white"
                  >
                    <span className="text-white/40 text-[10px] font-mono">{proj.number}</span>
                    <span className="text-[11px] font-medium font-[family-name:var(--body-font)]">
                      {proj.title}
                    </span>
                    <span className="text-white/45 text-[10px]">↗</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};
