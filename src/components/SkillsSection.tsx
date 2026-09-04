import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  SKILLS_DATA,
  SKILL_CATEGORIES,
  SkillCategoryId,
  SkillItem,
  PROJECT_NAMES,
} from '../data/skills';

interface SkillsSectionProps {
  onSelectProject?: (projectId: string) => void;
}

export const SkillsSection: React.FC<SkillsSectionProps> = ({ onSelectProject }) => {
  const [selectedCategory, setSelectedCategory] = useState<SkillCategoryId | 'all'>('all');
  const [activeSkillId, setActiveSkillId] = useState<string>('typescript');
  const [hoveredSkillId, setHoveredSkillId] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const detailPanelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const activeSkill =
    SKILLS_DATA.find((s) => s.id === (hoveredSkillId && !isMobile ? hoveredSkillId : activeSkillId)) ||
    SKILLS_DATA[0];

  const handleCardClick = (skill: SkillItem) => {
    setActiveSkillId(skill.id);
    // On mobile, scroll detail panel gently into view if tapped
    if (isMobile && detailPanelRef.current) {
      detailPanelRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, skill: SkillItem) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setActiveSkillId(skill.id);
    } else if (e.key === 'Escape') {
      setHoveredSkillId(null);
    }
  };

  const filteredCategories =
    selectedCategory === 'all'
      ? SKILL_CATEGORIES
      : SKILL_CATEGORIES.filter((cat) => cat.id === selectedCategory);

  return (
    <section
      id="skills"
      className="relative w-full overflow-hidden px-[6vw] md:px-[8vw] lg:px-[11vw] pt-[20vh] pb-[25vh] text-white z-10"
      aria-label="Skills & Technology Ecosystem"
    >
      {/* Top Editorial Intro */}
      <div className="relative flex flex-col justify-start mb-[10vh]">
        {/* Category Eyebrow */}
        <div className="flex items-center gap-3 mb-[2vh]">
          <span className="h-[1px] w-[3vw] bg-white/40" />
          <span className="tracking-[0.5vh] text-[1.3vh] font-bold text-white/50 uppercase font-[family-name:var(--body-font)]">
            03 — Capabilities & Stack
          </span>
        </div>

        {/* Section Heading */}
        <h2 className="title text-[14vw] md:text-[16vh] font-normal leading-[0.9] tracking-normal m-0 text-left">
          Skills
        </h2>

        {/* Editorial Subtitle & Context Paragraph */}
        <div className="relative mt-[5vh] ml-0 md:ml-[6vw] max-w-[850px]">
          <span className="hidden md:block absolute h-[1px] w-[5vw] -left-[6vw] top-[14%] bg-white/40" />
          <p className="font-[family-name:var(--title-font)] text-[2.2vh] md:text-[2.8vh] text-white/95 leading-snug tracking-wide mb-[2vh]">
            Technologies I use to design, build, and experiment.
          </p>
          <p className="font-[family-name:var(--body-font)] text-white/70 text-[1.7vh] max-[750px]:text-[3.2vw] leading-relaxed">
            Spanning interface design, type-safe frontend engineering, serverless backends,
            relational databases, real-time 3D graphics, and cloud deployment pipelines. Each
            technology represents active architectural practice across client applications and
            spatial experiments.
          </p>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap items-center gap-[1.2vh] mb-[8vh] border-b border-white/15 pb-[3vh]">
        <button
          type="button"
          onClick={() => setSelectedCategory('all')}
          className={`px-[1.8vh] py-[0.9vh] rounded-full text-[1.3vh] font-[family-name:var(--body-font)] uppercase tracking-[0.2vh] cursor-pointer clickable transition-all duration-300 ${
            selectedCategory === 'all'
              ? 'bg-white text-black font-semibold shadow-[0_0_15px_rgba(255,255,255,0.25)]'
              : 'bg-white/[0.04] text-white/70 hover:text-white hover:bg-white/[0.1] border border-white/10'
          }`}
        >
          All Ecosystem
        </button>
        {SKILL_CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            type="button"
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-[1.8vh] py-[0.9vh] rounded-full text-[1.3vh] font-[family-name:var(--body-font)] uppercase tracking-[0.2vh] cursor-pointer clickable transition-all duration-300 ${
              selectedCategory === cat.id
                ? 'bg-white text-black font-semibold shadow-[0_0_15px_rgba(255,255,255,0.25)]'
                : 'bg-white/[0.04] text-white/70 hover:text-white hover:bg-white/[0.1] border border-white/10'
            }`}
          >
            {cat.number} — {cat.title}
          </button>
        ))}
      </div>

      {/* Main Content Split: Categories & Skills Grid on Left/Main, Active Detail Panel on Side/Bottom */}
      <div className="flex flex-col xl:flex-row gap-[6vh] xl:gap-[4vw] items-start">
        {/* Left / Primary: Category Sections & Skill Cards */}
        <div className="w-full xl:w-[65%] flex flex-col gap-[7vh]">
          {filteredCategories.map((category) => {
            const categorySkills = SKILLS_DATA.filter((s) => s.category === category.id);
            if (categorySkills.length === 0) return null;

            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
                className="flex flex-col"
              >
                {/* Category Header */}
                <div className="flex flex-col md:flex-row md:items-baseline justify-between border-b border-white/15 pb-[1.5vh] mb-[3vh]">
                  <div className="flex items-center gap-[1.5vh]">
                    <span className="font-[family-name:var(--title-font)] text-[1.9vh] font-bold text-white/40">
                      {category.number}
                    </span>
                    <h3 className="font-[family-name:var(--body-font)] text-[1.8vh] uppercase tracking-[0.3vh] text-white font-semibold m-0">
                      {category.title}
                    </h3>
                  </div>
                  <span className="text-white/50 text-[1.4vh] font-[family-name:var(--body-font)] mt-1 md:mt-0">
                    {category.description}
                  </span>
                </div>

                {/* Skill Items Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-[2vh]">
                  {categorySkills.map((skill, index) => {
                    const isSelected = activeSkill.id === skill.id;
                    const isHovered = hoveredSkillId === skill.id;
                    const anyHoveredOrActive = Boolean(hoveredSkillId || activeSkillId);
                    const isMuted = anyHoveredOrActive && !isSelected && !isHovered;

                    return (
                      <motion.div
                        key={skill.id}
                        initial={{ opacity: 0, y: 16, scale: 0.96 }}
                        whileInView={{ opacity: 1, y: 0, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 0.45,
                          delay: index * 0.05,
                          ease: [0.25, 1, 0.5, 1],
                        }}
                        onMouseEnter={() => setHoveredSkillId(skill.id)}
                        onMouseLeave={() => setHoveredSkillId(null)}
                        onClick={() => handleCardClick(skill)}
                        onKeyDown={(e) => handleKeyDown(e, skill)}
                        tabIndex={0}
                        role="button"
                        aria-pressed={isSelected}
                        aria-label={`View details for ${skill.name}`}
                        className={`group relative p-[2vh] rounded-[1vh] border transition-all duration-300 cursor-pointer clickable select-none outline-none focus-visible:ring-2 focus-visible:ring-white/80 ${
                          isSelected
                            ? 'bg-white/[0.1] border-white/60 shadow-[0_4px_24px_rgba(255,255,255,0.12)] -translate-y-1'
                            : isHovered
                            ? 'bg-white/[0.07] border-white/40 -translate-y-1'
                            : 'bg-white/[0.03] border-white/10 hover:border-white/30'
                        } ${isMuted ? 'opacity-55' : 'opacity-100'}`}
                      >
                        {/* Top Icon & Featured Indicator */}
                        <div className="flex items-center justify-between mb-[1.8vh]">
                          <div className="w-[4vh] h-[4vh] p-[0.6vh] rounded-[0.6vh] bg-white/[0.05] border border-white/10 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                            <img
                              src={skill.icon}
                              alt=""
                              aria-hidden="true"
                              className="w-full h-full object-contain filter drop-shadow"
                            />
                          </div>
                          {skill.featured && (
                            <span className="text-[1vh] uppercase font-mono tracking-wider px-[0.8vh] py-[0.2vh] rounded bg-white/10 text-white/70 border border-white/10">
                              Core
                            </span>
                          )}
                        </div>

                        {/* Title & Role */}
                        <h4 className="font-[family-name:var(--body-font)] text-[1.6vh] font-semibold text-white tracking-wide mb-[0.6vh]">
                          {skill.name}
                        </h4>
                        <p className="text-white/50 text-[1.2vh] font-[family-name:var(--body-font)] leading-snug line-clamp-2">
                          {skill.role}
                        </p>

                        {/* Subtle Active Accent Dot */}
                        {isSelected && (
                          <div className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                        )}
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Right / Sticky: Anchored Skill Detail Panel */}
        <div
          ref={detailPanelRef}
          className="w-full xl:w-[35%] xl:sticky xl:top-[16vh] transition-all duration-300"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSkill.id}
              initial={{ opacity: 0, y: 12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.98 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="p-[3.5vh] rounded-[1.2vh] bg-[#171718]/90 backdrop-blur-md border border-white/20 shadow-[0_12px_40px_rgba(0,0,0,0.6)] flex flex-col text-left"
            >
              {/* Header: Icon, Name & Category */}
              <div className="flex items-start justify-between border-b border-white/15 pb-[2.5vh] mb-[2.5vh]">
                <div className="flex items-center gap-[2vh]">
                  <div className="w-[6vh] h-[6vh] p-[1vh] rounded-[0.8vh] bg-white/[0.06] border border-white/20 flex items-center justify-center">
                    <img
                      src={activeSkill.icon}
                      alt=""
                      aria-hidden="true"
                      className="w-full h-full object-contain filter drop-shadow"
                    />
                  </div>
                  <div>
                    <h3 className="font-[family-name:var(--title-font)] text-[2.4vh] md:text-[2.8vh] font-normal text-white m-0">
                      {activeSkill.name}
                    </h3>
                    <span className="text-white/50 text-[1.2vh] font-[family-name:var(--body-font)] uppercase tracking-[0.2vh]">
                      {SKILL_CATEGORIES.find((c) => c.id === activeSkill.category)?.number} —{' '}
                      {SKILL_CATEGORIES.find((c) => c.id === activeSkill.category)?.title}
                    </span>
                  </div>
                </div>
              </div>

              {/* Architectural Role */}
              <div className="mb-[2vh]">
                <span className="text-[1.1vh] font-bold text-white/50 uppercase tracking-[0.3vh] font-[family-name:var(--body-font)] block mb-[0.6vh]">
                  Architectural Role
                </span>
                <p className="text-white font-[family-name:var(--body-font)] text-[1.5vh] font-medium leading-relaxed">
                  {activeSkill.role}
                </p>
              </div>

              {/* Description & Technical Usage */}
              <div className="mb-[2.5vh]">
                <span className="text-[1.1vh] font-bold text-white/50 uppercase tracking-[0.3vh] font-[family-name:var(--body-font)] block mb-[0.6vh]">
                  Application & Usage
                </span>
                <p className="text-white/80 font-[family-name:var(--body-font)] text-[1.4vh] leading-relaxed mb-[1.2vh]">
                  {activeSkill.shortDescription}
                </p>
                <p className="text-white/60 font-[family-name:var(--body-font)] text-[1.3vh] leading-relaxed">
                  {activeSkill.usage}
                </p>
              </div>

              {/* Tags */}
              <div className="mb-[3vh]">
                <span className="text-[1.1vh] font-bold text-white/50 uppercase tracking-[0.3vh] font-[family-name:var(--body-font)] block mb-[1vh]">
                  Key Capabilities
                </span>
                <div className="flex flex-wrap gap-[0.8vh]">
                  {activeSkill.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-[1.2vh] py-[0.4vh] rounded-full bg-white/[0.06] border border-white/10 text-white/70 text-[1.2vh] font-[family-name:var(--body-font)]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Related Production Work */}
              {activeSkill.relatedProjects && activeSkill.relatedProjects.length > 0 && (
                <div className="border-t border-white/15 pt-[2.5vh]">
                  <span className="text-[1.1vh] font-bold text-white/50 uppercase tracking-[0.3vh] font-[family-name:var(--body-font)] block mb-[1.2vh]">
                    Featured in Featured Work
                  </span>
                  <div className="flex flex-col gap-[1vh]">
                    {activeSkill.relatedProjects.map((projId) => {
                      const proj = PROJECT_NAMES[projId];
                      if (!proj) return null;
                      return (
                        <button
                          key={projId}
                          type="button"
                          onClick={() => onSelectProject?.(projId)}
                          className="w-full flex items-center justify-between p-[1.2vh] rounded-[0.6vh] bg-white/[0.04] hover:bg-white/[0.1] border border-white/10 hover:border-white/30 text-left transition-all duration-200 cursor-pointer clickable group"
                          aria-label={`Jump to ${proj.title} in Work section`}
                        >
                          <div className="flex items-center gap-2">
                            <span className="text-white/40 text-[1.2vh] font-mono">
                              {proj.number}
                            </span>
                            <span className="text-white text-[1.4vh] font-[family-name:var(--body-font)] font-medium group-hover:text-white">
                              {proj.title}
                            </span>
                          </div>
                          <span className="text-white/40 group-hover:text-white text-[1.4vh] transition-transform duration-200 group-hover:translate-x-1">
                            ↗
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
