import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Sparkles, ArrowUpRight } from 'lucide-react';
import { SkillItem, PROJECT_NAMES } from '../../data/skills';
import { TechLogo } from './TechLogo';

interface SkillDetailOverlayProps {
  skill: SkillItem | null;
  onClose: () => void;
  onSelectProject?: (projectId: string) => void;
}

export const SkillDetailOverlay: React.FC<SkillDetailOverlayProps> = ({
  skill,
  onClose,
  onSelectProject,
}) => {
  // Lock parent scroll-frame and window while overlay is active
  useEffect(() => {
    if (!skill) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    // Save previous overflow state
    const scrollFrame = document.getElementById('scroll-frame');
    const originalOverflow = scrollFrame ? scrollFrame.style.overflowY : '';
    if (scrollFrame) {
      scrollFrame.style.overflowY = 'hidden';
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      if (scrollFrame) {
        scrollFrame.style.overflowY = originalOverflow;
      }
    };
  }, [skill, onClose]);

  return (
    <AnimatePresence>
      {skill && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8">
          {/* Translucent Backdrop with Space Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/75 backdrop-blur-xl"
            aria-hidden="true"
          />

          {/* Floating Technology Profile Surface */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 16 }}
            transition={{ type: 'spring', damping: 28, stiffness: 320 }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="skill-profile-title"
            className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-3xl bg-[#090814]/90 border border-purple-500/20 p-6 sm:p-8 md:p-10 shadow-[0_0_80px_rgba(112,66,248,0.25)] text-white"
          >
            {/* Ambient Radial Color Aura */}
            <div
              className="absolute -top-24 -left-24 w-72 h-72 rounded-full pointer-events-none -z-10"
              style={{
                background: `radial-gradient(circle, ${skill.brandColor}30 0%, rgba(112,66,248,0.15) 50%, transparent 70%)`,
                filter: 'blur(50px)',
              }}
              aria-hidden="true"
            />

            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-5 right-5 sm:top-6 sm:right-6 p-2 rounded-full text-neutral-400 hover:text-white bg-white/5 hover:bg-white/10 transition-colors border border-white/10 outline-none"
              aria-label="Close profile"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header: Large Logo + Technology Name & Role */}
            <div className="flex items-start gap-5 sm:gap-6">
              {/* Prominent Logo */}
              <div
                className="w-18 h-18 sm:w-20 sm:h-20 shrink-0 flex items-center justify-center rounded-2xl bg-white/[0.03] border border-white/10 p-3"
                style={{
                  boxShadow: `0 0 30px ${skill.brandColor}33`,
                }}
              >
                <TechLogo id={skill.id} size={56} className="w-full h-full object-contain" />
              </div>

              <div className="flex-1 min-w-0 pr-8">
                {/* Subtle category eyebrow */}
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-[11px] uppercase tracking-widest text-purple-300 font-semibold flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-[#b49bff]" />
                    {skill.rowTitle}
                  </span>
                </div>

                <h3 id="skill-profile-title" className="text-2xl sm:text-3xl font-semibold tracking-tight text-white">
                  {skill.name}
                </h3>
                <p className="text-sm text-neutral-300 font-medium mt-1">
                  {skill.shortRole}
                </p>
              </div>
            </div>

            {/* Architectural Role & Usage */}
            <div className="mt-6 pt-6 border-t border-white/10 space-y-4">
              <div>
                <h4 className="text-xs uppercase tracking-wider text-neutral-400 font-semibold mb-1.5">
                  Architectural Role
                </h4>
                <p className="text-sm sm:text-base text-neutral-200 leading-relaxed font-light">
                  {skill.role}
                </p>
              </div>

              <div>
                <h4 className="text-xs uppercase tracking-wider text-neutral-400 font-semibold mb-1.5">
                  Application & Implementation
                </h4>
                <p className="text-sm sm:text-base text-neutral-300 leading-relaxed font-light">
                  {skill.usage}
                </p>
              </div>
            </div>

            {/* Key Capability Tags */}
            <div className="mt-6">
              <h4 className="text-xs uppercase tracking-wider text-neutral-400 font-semibold mb-3">
                Key Capabilities
              </h4>
              <div className="flex flex-wrap gap-2">
                {skill.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full text-xs font-medium bg-purple-500/10 text-purple-200 border border-purple-500/25 tracking-wide"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Related Projects (if any) */}
            {skill.relatedProjects && skill.relatedProjects.length > 0 && (
              <div className="mt-6 pt-6 border-t border-white/10">
                <h4 className="text-xs uppercase tracking-wider text-neutral-400 font-semibold mb-3">
                  Applied in Projects
                </h4>
                <div className="flex flex-wrap gap-2.5">
                  {skill.relatedProjects.map((pId) => {
                    const proj = PROJECT_NAMES[pId];
                    if (!proj) return null;
                    return (
                      <button
                        key={pId}
                        onClick={() => {
                          onClose();
                          if (onSelectProject) {
                            onSelectProject(pId);
                          }
                        }}
                        className="group flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-purple-400/40 text-xs text-neutral-300 hover:text-white transition-all duration-200 cursor-pointer"
                      >
                        <span className="font-mono text-purple-400 text-[10px]">{proj.number}</span>
                        <span>{proj.title}</span>
                        <ArrowUpRight className="w-3.5 h-3.5 text-neutral-400 group-hover:text-purple-300 transition-colors" />
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
