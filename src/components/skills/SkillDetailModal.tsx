import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ExternalLink } from 'lucide-react';
import { SkillItem, PROJECT_NAMES } from '../../data/skills';

interface SkillDetailModalProps {
  skill: SkillItem | null;
  onClose: () => void;
  onSelectProject?: (projectId: string) => void;
}

/**
 * Compact Progressive Disclosure Modal
 * Opens when a user clicks any floating skill icon in the constellation.
 * Keeps the main spatial composition pure and uncluttered while providing rich context.
 */
export const SkillDetailModal: React.FC<SkillDetailModalProps> = ({
  skill,
  onClose,
  onSelectProject,
}) => {
  // Close on Escape key press
  useEffect(() => {
    if (!skill) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [skill, onClose]);

  return (
    <AnimatePresence>
      {skill && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 select-none">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/65 backdrop-blur-md cursor-pointer"
            aria-hidden="true"
          />

          {/* Modal Container */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="skill-modal-title"
            initial={{ opacity: 0, scale: 0.92, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 15 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            className="relative w-full max-w-lg rounded-2xl border border-white/15 p-6 sm:p-7 shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden"
            style={{
              backgroundColor: 'rgba(12, 13, 20, 0.88)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              boxShadow: `0 0 35px ${skill.brandColor}22, inset 0 1px 0 rgba(255,255,255,0.12)`,
            }}
          >
            {/* Ambient top brand accent highlight */}
            <div
              className="absolute top-0 left-0 right-0 h-[2px]"
              style={{ backgroundColor: skill.brandColor }}
              aria-hidden="true"
            />

            {/* Header: Icon, Name, Category, Close Button */}
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-white/10">
              <div className="flex items-center gap-3.5">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center p-2 border border-white/15 shadow-inner"
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    boxShadow: `0 0 15px ${skill.brandColor}33`,
                  }}
                >
                  <img
                    src={skill.icon}
                    alt=""
                    aria-hidden="true"
                    className="w-full h-full object-contain filter drop-shadow-sm"
                  />
                </div>

                <div className="flex flex-col">
                  <h3
                    id="skill-modal-title"
                    className="font-[family-name:var(--title-font)] text-xl font-medium text-white tracking-wide"
                  >
                    {skill.name}
                  </h3>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-[10px] font-mono tracking-wider font-semibold uppercase px-2 py-0.5 rounded bg-white/[0.06] text-white/70 border border-white/10">
                      {skill.badge}
                    </span>
                    <span className="text-white/30 text-xs">•</span>
                    <span className="text-[11px] font-mono text-white/50 uppercase tracking-wider">
                      {skill.category.replace('_', ' / ')}
                    </span>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={onClose}
                aria-label="Close dialog"
                className="text-white/50 hover:text-white p-1.5 rounded-lg hover:bg-white/10 transition-colors focus:outline-none"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content Body */}
            <div className="flex flex-col gap-4 mt-5 text-left">
              {/* Role */}
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-white/40 block mb-1">
                  Architectural Role
                </span>
                <p className="font-[family-name:var(--body-font)] text-sm text-white/90 leading-relaxed font-medium">
                  {skill.role}
                </p>
              </div>

              {/* Usage */}
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-white/40 block mb-1">
                  Application & Implementation
                </span>
                <p className="font-[family-name:var(--body-font)] text-xs sm:text-[13px] text-white/70 leading-relaxed">
                  {skill.usage}
                </p>
              </div>

              {/* Tags */}
              {skill.tags && skill.tags.length > 0 && (
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-white/40 block mb-1.5">
                    Capability Domains
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {skill.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-white/[0.04] border border-white/10 text-white/70"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Related Projects */}
              {skill.relatedProjects && skill.relatedProjects.length > 0 && (
                <div className="pt-2 border-t border-white/10 mt-1">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-white/40 block mb-2">
                    Applied In Projects
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {skill.relatedProjects.map((projId) => {
                      const projInfo = PROJECT_NAMES[projId] || {
                        title: projId,
                        number: '00',
                      };
                      return (
                        <button
                          key={projId}
                          type="button"
                          onClick={() => {
                            onClose();
                            if (onSelectProject) {
                              onSelectProject(projId);
                            }
                          }}
                          className="group inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/[0.05] hover:bg-white/[0.12] border border-white/10 hover:border-white/25 transition-all text-left cursor-pointer"
                        >
                          <span className="text-[10px] font-mono text-white/40 group-hover:text-white/70">
                            {projInfo.number}
                          </span>
                          <span className="text-xs text-white/80 group-hover:text-white font-medium">
                            {projInfo.title}
                          </span>
                          <ExternalLink className="w-3 h-3 text-white/40 group-hover:text-white ml-0.5 transition-colors" />
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
