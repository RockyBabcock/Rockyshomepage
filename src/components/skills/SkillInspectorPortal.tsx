import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import { X, ExternalLink, ShieldCheck, ArrowRight } from 'lucide-react';
import { SkillItem, PROJECT_NAMES, SKILL_GROUPS } from '../../data/skills';
import { TechIcon } from './TechIcon';

interface SkillInspectorPortalProps {
  skill: SkillItem | null;
  onClose: () => void;
  onSelectProject?: (projectId: string) => void;
}

/**
 * Premium Full-Screen Technology System Inspector Overlay
 * Rendered using createPortal directly onto document.body to break out
 * of any clipping, transform, or overflow contexts.
 */
export const SkillInspectorPortal: React.FC<SkillInspectorPortalProps> = ({
  skill,
  onClose,
  onSelectProject,
}) => {
  // Lock body scroll while inspector is open
  useEffect(() => {
    if (!skill) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [skill, onClose]);

  if (typeof document === 'undefined') return null;

  // Find parent group for category identification
  const currentGroup = skill
    ? SKILL_GROUPS.find((g) => g.id === skill.category)
    : null;

  return createPortal(
    <AnimatePresence>
      {skill && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-6 md:p-8 select-none"
          role="dialog"
          aria-modal="true"
          aria-labelledby="inspector-skill-title"
          aria-describedby="inspector-skill-role"
        >
          {/* Full-screen Dark Translucent Glass Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            onClick={onClose}
            className="absolute inset-0 bg-black/70 backdrop-blur-md cursor-pointer"
            aria-hidden="true"
          />

          {/* Floating High-End System Inspector Panel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 10 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex flex-col w-full max-w-[760px] max-h-[85vh] rounded-2xl sm:rounded-3xl overflow-hidden border border-white/15 shadow-[0_30px_70px_rgba(0,0,0,0.88)] z-10"
            style={{
              backgroundColor: 'rgba(10, 11, 18, 0.94)',
              backdropFilter: 'blur(28px)',
              WebkitBackdropFilter: 'blur(28px)',
              boxShadow: `0 0 45px ${skill.brandColor}22, inset 0 1px 0 rgba(255,255,255,0.12)`,
            }}
          >
            {/* Top Brand Accent Status Line */}
            <div
              className="absolute top-0 left-0 right-0 h-[2.5px]"
              style={{
                background: `linear-gradient(90deg, transparent 0%, ${skill.brandColor} 30%, ${skill.brandColor} 70%, transparent 100%)`,
              }}
              aria-hidden="true"
            />

            {/* Subtle Ambient Radial Light Halo */}
            <div
              className="absolute -top-24 -right-24 w-80 h-80 rounded-full pointer-events-none blur-3xl -z-10"
              style={{
                background: `radial-gradient(circle, ${skill.brandColor}25 0%, transparent 70%)`,
              }}
              aria-hidden="true"
            />

            {/* ============================================================== */}
            {/* HEADER: Category Identifier, Icon, Name, Badge, Close Button */}
            {/* ============================================================== */}
            <div className="flex items-start justify-between gap-4 p-5 sm:p-7 md:p-8 border-b border-white/10 shrink-0 bg-white/[0.02]">
              <div className="flex items-start gap-4 sm:gap-5 min-w-0">
                {/* Large Branded Technology Icon Container */}
                <div
                  className="relative flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-2xl border border-white/15 shrink-0 shadow-lg"
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    boxShadow: `0 0 20px ${skill.brandColor}33`,
                  }}
                >
                  <TechIcon
                    icon={skill.icon}
                    name={skill.name}
                    brandColor={skill.brandColor}
                    size={32}
                  />
                </div>

                {/* Title & Metadata Hierarchy */}
                <div className="flex flex-col min-w-0 pt-0.5">
                  {/* Category Identifier */}
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-mono text-[10px] sm:text-[11px] font-semibold tracking-widest text-white/50 uppercase">
                      {currentGroup ? `${currentGroup.number} — ${currentGroup.title}` : 'SYSTEM MODULE'}
                    </span>
                    <span className="text-white/20 text-xs">•</span>
                    <span className="font-mono text-[10px] text-white/40 uppercase tracking-wider">
                      CAPABILITY INSPECTOR
                    </span>
                  </div>

                  {/* Technology Name */}
                  <h2
                    id="inspector-skill-title"
                    className="font-[family-name:var(--title-font)] text-2xl sm:text-3xl font-bold text-white tracking-wide truncate"
                  >
                    {skill.name}
                  </h2>

                  {/* Contextual Badges */}
                  <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                    <span
                      className="inline-flex items-center font-mono text-[10px] sm:text-[11px] font-bold tracking-wider uppercase px-2.5 py-0.5 rounded border"
                      style={{
                        borderColor: `${skill.brandColor}55`,
                        backgroundColor: `${skill.brandColor}18`,
                        color: skill.brandColor,
                      }}
                    >
                      {skill.badge}
                    </span>
                    <span className="text-[11px] font-mono text-white/50 px-2 py-0.5 rounded bg-white/[0.04] border border-white/[0.08]">
                      {skill.category.toUpperCase().replace('_', ' / ')}
                    </span>
                  </div>
                </div>
              </div>

              {/* Close Button */}
              <button
                type="button"
                onClick={onClose}
                aria-label="Close inspector dialog"
                className="shrink-0 p-2 rounded-xl text-white/50 hover:text-white bg-white/[0.04] hover:bg-white/[0.1] border border-white/10 transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-purple-400"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* ============================================================== */}
            {/* MAIN CONTENT: Role, Implementation, Key Capabilities, Work    */}
            {/* ============================================================== */}
            <div className="flex flex-col gap-6 p-5 sm:p-7 md:p-8 overflow-y-auto overflow-x-hidden text-left custom-scrollbar">
              {/* Architectural Role */}
              <div>
                <div className="flex items-center gap-1.5 mb-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-white/40" />
                  <span className="text-[11px] font-mono uppercase tracking-widest text-white/45 font-semibold">
                    Architectural Role
                  </span>
                </div>
                <p
                  id="inspector-skill-role"
                  className="font-[family-name:var(--body-font)] text-base sm:text-lg text-white font-medium leading-snug"
                >
                  {skill.role}
                </p>
              </div>

              {/* Application / Implementation */}
              <div>
                <span className="text-[11px] font-mono uppercase tracking-widest text-white/45 font-semibold block mb-2">
                  Application & Implementation
                </span>
                <div className="p-4 rounded-xl bg-white/[0.025] border border-white/[0.07]">
                  <p className="font-[family-name:var(--body-font)] text-xs sm:text-sm text-white/80 leading-relaxed">
                    {skill.usage}
                  </p>
                </div>
              </div>

              {/* Key Capabilities */}
              {skill.tags && skill.tags.length > 0 && (
                <div>
                  <span className="text-[11px] font-mono uppercase tracking-widest text-white/45 font-semibold block mb-2.5">
                    Key Capabilities & Primitives
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {skill.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center font-mono text-xs px-3 py-1 rounded-lg bg-white/[0.04] border border-white/10 text-white/85 tracking-wide"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Related Work / Applied in Projects */}
              {skill.relatedProjects && skill.relatedProjects.length > 0 && (
                <div className="pt-3 border-t border-white/10 mt-1">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] font-mono uppercase tracking-widest text-white/45 font-semibold">
                      Applied In Projects
                    </span>
                    <span className="text-[10px] font-mono text-white/35">
                      VERIFIED PRODUCTION IMPLEMENTATION
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
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
                          className="group flex items-center justify-between p-3 rounded-xl bg-white/[0.035] hover:bg-white/[0.08] border border-white/10 hover:border-white/25 transition-all text-left cursor-pointer"
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            <span className="font-mono text-xs font-semibold text-white/40 group-hover:text-purple-300 transition-colors">
                              {projInfo.number}
                            </span>
                            <span className="font-[family-name:var(--body-font)] text-xs sm:text-[13px] font-semibold text-white/90 group-hover:text-white truncate">
                              {projInfo.title}
                            </span>
                          </div>
                          <div className="flex items-center gap-1 text-white/40 group-hover:text-white shrink-0 ml-2 transition-colors">
                            <span className="text-[10px] font-mono opacity-0 group-hover:opacity-100 transition-opacity hidden sm:inline">
                              VIEW
                            </span>
                            <ArrowRight className="w-3.5 h-3.5 -translate-x-1 group-hover:translate-x-0 transition-transform" />
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* ============================================================== */}
            {/* FOOTER: Status Bar & Keyboard Hint                             */}
            {/* ============================================================== */}
            <div className="flex items-center justify-between px-5 sm:px-7 py-3 border-t border-white/10 bg-white/[0.015] shrink-0">
              <div className="flex items-center gap-2">
                <div
                  className="w-1.5 h-1.5 rounded-full animate-pulse"
                  style={{ backgroundColor: skill.brandColor }}
                />
                <span className="font-mono text-[10px] text-white/40 tracking-wider">
                  SYSTEM STATUS: OPERATIONAL
                </span>
              </div>
              <span className="font-mono text-[10px] text-white/35 hidden sm:inline">
                PRESS <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-white/60 font-mono text-[9px]">ESC</kbd> TO EXIT
              </span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
};
