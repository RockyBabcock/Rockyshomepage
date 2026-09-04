import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ArrowUpRight } from 'lucide-react';
import { SkillItem, PROJECT_NAMES } from '../../data/skills';
import { TechLogo } from './TechLogo';

interface SkillDetailDrawerProps {
  skill: SkillItem | null;
  onClose: () => void;
  onSelectProject?: (projectId: string) => void;
}

/**
 * SkillDetailDrawer
 * Spatial technology intelligence panel for inspected skills.
 * Features translucent deep-space glass, subtle purple/blue edge glow,
 * official brand logos, and a clean editorial hierarchy.
 */
export const SkillDetailDrawer: React.FC<SkillDetailDrawerProps> = ({
  skill,
  onClose,
  onSelectProject,
}) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Keyboard close on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (skill) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [skill, onClose]);

  return (
    <AnimatePresence>
      {skill && (
        <>
          {/* 
            Subtle transparent click-catcher backdrop:
            DO NOT heavily black out the section!
            Constellation, stars, and nebula video remain alive and visible beneath.
          */}
          <motion.div
            key="drawer-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/25 pointer-events-auto cursor-pointer"
            aria-hidden="true"
          />

          {/* 
            RIGHT-SIDE FLOATING HUD PANEL (Desktop) / BOTTOM SHEET (Mobile)
            Translucent deep-space glass with purple edge aura
          */}
          <motion.aside
            key="drawer-panel"
            initial={isMobile ? { y: '100%' } : { x: '100%' }}
            animate={isMobile ? { y: 0 } : { x: 0 }}
            exit={isMobile ? { y: '100%' } : { x: '100%' }}
            transition={{
              type: 'spring',
              damping: 30,
              stiffness: 280,
            }}
            id="skill-detail-drawer"
            className={`
              fixed z-50 overflow-hidden flex flex-col pointer-events-auto
              bg-[#030014]/92 backdrop-blur-2xl text-white
              border-white/10
              shadow-[-1px_0_24px_rgba(112,66,248,0.22),-20px_0_60px_rgba(0,0,0,0.85)]
              ${
                isMobile
                  ? 'bottom-0 left-0 right-0 max-h-[88vh] rounded-t-3xl border-t'
                  : 'top-0 bottom-0 right-0 w-full sm:w-[450px] md:w-[460px] h-full border-l'
              }
            `}
            role="dialog"
            aria-modal="true"
            aria-labelledby="skill-drawer-title"
          >
            {/* Ambient dynamic brand-color ambient glow inside the panel */}
            <div
              className="absolute -top-12 -right-12 w-60 h-60 rounded-full pointer-events-none -z-10 opacity-20 blur-3xl"
              style={{ backgroundColor: skill.brandColor || '#7042f8' }}
              aria-hidden="true"
            />
            <div
              className="absolute -bottom-12 -left-12 w-60 h-60 rounded-full pointer-events-none -z-10 opacity-15 blur-3xl"
              style={{ backgroundColor: '#7042f8' }}
              aria-hidden="true"
            />

            {/* Mobile Grab Indicator */}
            {isMobile && (
              <div className="w-full flex items-center justify-center pt-3 pb-1">
                <div className="w-12 h-1 rounded-full bg-white/25" />
              </div>
            )}

            {/* Header: Category Indicator & Sleek Close Button */}
            <div className="flex items-center justify-between px-7 pt-6 pb-4 border-b border-white/10 shrink-0">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono tracking-widest text-purple-300 uppercase">
                  {skill.category || skill.rowTitle}
                </span>
                <span className="text-white/20">•</span>
                <span className="text-[10px] font-mono tracking-wider text-neutral-400">
                  {skill.rowTitle}
                </span>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="p-1.5 rounded-full text-neutral-400 hover:text-white hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-400/50 cursor-pointer"
                aria-label="Close details"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Content Container */}
            <div className="flex-1 overflow-y-auto px-7 py-6 space-y-7 custom-scrollbar">
              {/* Technology Focus: Large Official Logo & Title */}
              <div className="flex items-center gap-4">
                <div
                  className="relative shrink-0 p-3.5 rounded-2xl border border-white/10 bg-white/[0.04] shadow-[0_0_30px_rgba(0,0,0,0.6)] flex items-center justify-center"
                  style={{
                    boxShadow: `0 0 35px ${skill.brandColor}26`,
                  }}
                >
                  <TechLogo id={skill.id} size={56} />
                </div>

                <div className="flex-1 min-w-0">
                  <h3
                    id="skill-drawer-title"
                    className="text-2xl sm:text-3xl font-light tracking-tight text-white truncate"
                  >
                    {skill.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-400 font-normal mt-0.5">
                    {skill.category || skill.shortRole}
                  </p>
                </div>
              </div>

              {/* Editorial Positioning Statement */}
              <div className="text-sm sm:text-[15px] leading-relaxed text-neutral-100 font-light border-l-2 border-purple-500/60 pl-4 py-0.5">
                {skill.positioning || skill.editorialSummary || skill.role}
              </div>

              {/* Practical Experience */}
              <div className="space-y-2">
                <h4 className="text-[11px] font-mono tracking-widest text-neutral-400 uppercase">
                  Application & Experience
                </h4>
                <p className="text-xs sm:text-[13px] leading-relaxed text-neutral-300 font-light">
                  {skill.experience || skill.usage}
                </p>
              </div>

              {/* Capabilities Chips */}
              {skill.tags && skill.tags.length > 0 && (
                <div className="space-y-2.5">
                  <h4 className="text-[11px] font-mono tracking-widest text-neutral-400 uppercase">
                    Capabilities
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {skill.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs text-neutral-300 font-normal px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.03] hover:border-purple-400/40 hover:bg-purple-500/10 hover:text-white transition-all duration-200 cursor-default"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Related Projects Reference Rows */}
              {skill.relatedProjects && skill.relatedProjects.length > 0 && (
                <div className="space-y-2.5 pt-2 border-t border-white/10">
                  <h4 className="text-[11px] font-mono tracking-widest text-neutral-400 uppercase">
                    Related Projects
                  </h4>

                  <div className="space-y-1.5">
                    {skill.relatedProjects.map((projKey) => {
                      const projInfo = PROJECT_NAMES[projKey] || {
                        title: projKey,
                        number: '•',
                      };

                      return (
                        <button
                          key={projKey}
                          type="button"
                          onClick={() => {
                            if (onSelectProject) {
                              onSelectProject(projKey);
                            }
                            onClose();
                          }}
                          className="group w-full flex items-center justify-between py-2.5 px-3 rounded-lg border border-transparent hover:border-purple-500/30 hover:bg-purple-500/10 transition-all duration-200 text-left cursor-pointer"
                        >
                          <div className="flex items-center gap-3">
                            <span className="text-xs font-mono text-neutral-500 group-hover:text-purple-300 transition-colors">
                              {projInfo.number}
                            </span>
                            <span className="text-xs sm:text-sm text-neutral-200 group-hover:text-white font-light transition-colors">
                              {projInfo.title}
                            </span>
                          </div>
                          <ArrowUpRight className="w-3.5 h-3.5 text-neutral-500 group-hover:text-purple-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Refined Spatial Status Bar */}
            <div className="px-7 py-3 border-t border-white/10 bg-black/40 flex items-center justify-between text-[11px] font-mono text-neutral-500 shrink-0">
              <span className="tracking-wider">ROCKY BABCOCK • ARCHITECTURE</span>
              <span className="text-purple-400/90">ESC TO CLOSE</span>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};
