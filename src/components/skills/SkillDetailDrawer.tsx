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
            DO NOT black out the Skills section!
            Keeps stars, nebula video, and constellation alive and visible beneath.
          */}
          <motion.div
            key="drawer-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/25 pointer-events-auto cursor-pointer"
            aria-hidden="true"
          />

          {/* 
            RIGHT-SIDE FLOATING HUD PANEL (Desktop) / BOTTOM SHEET (Mobile)
            Translucent dark glass surface with restrained brand-color aura.
          */}
          <motion.aside
            key="drawer-panel"
            initial={isMobile ? { y: '100%' } : { x: '100%' }}
            animate={isMobile ? { y: 0 } : { x: 0 }}
            exit={isMobile ? { y: '100%' } : { x: '100%' }}
            transition={{
              duration: 0.55,
              ease: [0.16, 1, 0.3, 1],
            }}
            id="skill-detail-drawer"
            className={`
              fixed z-50 overflow-hidden flex flex-col pointer-events-auto
              bg-[#06050e]/90 backdrop-blur-2xl text-white
              border-white/10 shadow-[0_0_60px_rgba(0,0,0,0.8)]
              ${
                isMobile
                  ? 'bottom-0 left-0 right-0 max-h-[86vh] rounded-t-3xl border-t'
                  : 'top-3 bottom-3 right-3 w-full max-w-[420px] rounded-2xl border'
              }
            `}
            role="dialog"
            aria-modal="true"
            aria-labelledby="skill-drawer-title"
          >
            {/* Ambient dynamic brand-color ambient glow inside the panel */}
            <div
              className="absolute -top-16 -right-16 w-64 h-64 rounded-full pointer-events-none -z-10 opacity-20 blur-3xl"
              style={{ backgroundColor: skill.brandColor || '#7042f8' }}
              aria-hidden="true"
            />
            <div
              className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full pointer-events-none -z-10 opacity-15 blur-3xl"
              style={{ backgroundColor: '#7042f8' }}
              aria-hidden="true"
            />

            {/* Mobile Drag/Grab Indicator */}
            {isMobile && (
              <div className="w-full flex items-center justify-center pt-3 pb-1">
                <div className="w-12 h-1 rounded-full bg-white/20" />
              </div>
            )}

            {/* Header: Category Eyebrow + Type Badge + Close Button */}
            <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-white/10 shrink-0">
              <div className="flex items-center gap-2.5">
                <span className="text-[11px] font-mono tracking-widest text-purple-300 uppercase">
                  {skill.rowTitle}
                </span>
                <span className="text-white/20">•</span>
                <span
                  className={`text-[10px] font-mono tracking-wider px-2 py-0.5 rounded-full border ${
                    skill.isConceptual
                      ? 'border-emerald-500/30 text-emerald-300 bg-emerald-500/10'
                      : 'border-purple-500/30 text-purple-200 bg-purple-500/10'
                  }`}
                >
                  {skill.isConceptual ? 'ARCHITECTURE PROTOCOL' : 'TECHNOLOGY STACK'}
                </span>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="p-1.5 rounded-full text-neutral-400 hover:text-white hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-400/50"
                aria-label="Close details"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Content Container */}
            <div className="flex-1 overflow-y-auto px-6 py-6 space-y-7 custom-scrollbar">
              {/* Technology Identity Section */}
              <div className="flex items-start gap-4">
                <div
                  className="relative shrink-0 p-3 rounded-2xl border border-white/10 bg-white/[0.03] shadow-[0_0_25px_rgba(0,0,0,0.5)] flex items-center justify-center"
                  style={{
                    boxShadow: `0 0 30px ${skill.brandColor}22`,
                  }}
                >
                  <TechLogo id={skill.id} size={52} isConceptual={skill.isConceptual} />
                </div>

                <div className="flex-1 min-w-0 pt-1">
                  <h3
                    id="skill-drawer-title"
                    className="text-2xl font-light tracking-tight text-white truncate"
                  >
                    {skill.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-300 font-normal mt-0.5">
                    {skill.shortRole}
                  </p>
                </div>
              </div>

              {/* Curated Editorial Summary Statement */}
              <div className="text-sm sm:text-[14px] leading-relaxed text-neutral-200 font-light border-l-2 border-purple-500/40 pl-3.5 py-0.5">
                {skill.editorialSummary || skill.role}
              </div>

              {/* Information Group 1: Role */}
              <div className="space-y-2">
                <h4 className="text-[11px] font-mono tracking-widest text-neutral-400 uppercase">
                  Role
                </h4>
                <p className="text-xs sm:text-[13px] leading-relaxed text-neutral-200 font-light">
                  {skill.role}
                </p>
              </div>

              {/* Information Group 2: Application */}
              <div className="space-y-2">
                <h4 className="text-[11px] font-mono tracking-widest text-neutral-400 uppercase">
                  Application
                </h4>
                <p className="text-xs sm:text-[13px] leading-relaxed text-neutral-300 font-light">
                  {skill.usage}
                </p>
              </div>

              {/* Information Group 3: Capabilities */}
              {skill.tags && skill.tags.length > 0 && (
                <div className="space-y-2.5">
                  <h4 className="text-[11px] font-mono tracking-widest text-neutral-400 uppercase">
                    Capabilities
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {skill.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[11px] sm:text-xs text-neutral-300 font-mono px-2.5 py-1 rounded-full border border-white/10 bg-white/[0.03]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Information Group 4: Selected Projects */}
              {skill.relatedProjects && skill.relatedProjects.length > 0 && (
                <div className="space-y-2.5 pt-2 border-t border-white/10">
                  <h4 className="text-[11px] font-mono tracking-widest text-neutral-400 uppercase">
                    Selected Projects
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

            {/* Inset Footer Note */}
            <div className="px-6 py-3 border-t border-white/10 bg-black/40 flex items-center justify-between text-[11px] font-mono text-neutral-500 shrink-0">
              <span>EXPLORING CONSTELLATION</span>
              <span className="text-purple-400/80">ESC TO CLOSE</span>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};
