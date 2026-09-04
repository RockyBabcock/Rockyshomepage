import React, { useState } from 'react';
import { SKILL_ROWS, SKILLS_BY_ROW, SkillItem } from '../data/skills';
import { SkillText } from './skills/SkillText';
import { SkillFloatingItem } from './skills/SkillFloatingItem';
import { SkillDetailDrawer } from './skills/SkillDetailDrawer';

interface SkillsSectionProps {
  onSelectProject?: (projectId: string) => void;
}

export const SkillsSection: React.FC<SkillsSectionProps> = ({ onSelectProject }) => {
  const [selectedSkill, setSelectedSkill] = useState<SkillItem | null>(null);
  const [hoveredSkillId, setHoveredSkillId] = useState<string | null>(null);

  return (
    <section
      id="skills"
      className="relative flex flex-col items-center justify-center w-full min-h-screen pt-4 sm:pt-8 md:pt-12 pb-24 sm:pb-32 md:pb-36 px-4 sm:px-6 md:px-12 lg:px-16 overflow-hidden text-white z-10 bg-transparent"
      aria-label="Skills and Technology Constellation"
    >
      {/* 
        WORK → SKILLS SPATIAL ATMOSPHERIC BRIDGE
        Extremely soft, wide purple/blue radial glow positioned between Work and Skills.
        Eliminates vertical dead space, letting the star field continue naturally
        while the purple atmosphere gently emerges before the Skills heading.
      */}
      <div
        className="absolute -top-20 sm:-top-28 left-1/2 -translate-x-1/2 w-[95vw] max-w-[1400px] h-[340px] pointer-events-none -z-10"
        style={{
          background:
            'radial-gradient(ellipse 80% 50% at 50% 50%, rgba(112, 66, 248, 0.08) 0%, rgba(79, 70, 229, 0.02) 45%, transparent 75%)',
          filter: 'blur(90px)',
        }}
        aria-hidden="true"
      />

      {/* 
        LAYER 2: Central Purple Nebula Video Background
        Centered, looping, muted, playsInline, autoPlay at ~0.35 opacity.
        Feathered vertically using CSS mask-image so top and bottom edges dissolve
        naturally into the deep space background without any rectangular boundaries.
      */}
      <div
        className="absolute inset-0 w-full h-full pointer-events-none -z-10 flex items-center justify-center overflow-hidden"
        style={{
          maskImage:
            'linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 0.7) 12%, rgba(0, 0, 0, 1) 25%, rgba(0, 0, 0, 1) 75%, rgba(0, 0, 0, 0.7) 88%, transparent 100%)',
          WebkitMaskImage:
            'linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 0.7) 12%, rgba(0, 0, 0, 1) 25%, rgba(0, 0, 0, 1) 75%, rgba(0, 0, 0, 0.7) 88%, transparent 100%)',
        }}
      >
        <video
          className="w-full h-auto min-h-full min-w-full object-cover opacity-35 pointer-events-none select-none"
          preload="auto"
          playsInline
          loop
          muted
          autoPlay
          src="/videos/skills-bg.webm"
        />
      </div>

      {/* Controlled Purple Spatial Atmosphere Core Glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85vw] max-w-[1100px] h-[75vh] max-h-[750px] rounded-full pointer-events-none -z-10"
        style={{
          background:
            'radial-gradient(ellipse 65% 55% at 50% 50%, rgba(112, 66, 248, 0.14) 0%, rgba(147, 51, 234, 0.04) 50%, transparent 75%)',
          filter: 'blur(90px)',
        }}
        aria-hidden="true"
      />

      {/* CENTERED TYPOGRAPHY (Space-Portfolio inspired SkillText) */}
      <SkillText />

      {/* 
        ORGANIC MULTI-ROW TECHNOLOGY CONSTELLATION
        Floating technology logos without cards, rectangular containers, borders, or badges.
        6 loose horizontal rows with generous organic spacing.
      */}
      <div className="w-full max-w-6xl mx-auto flex flex-col items-center gap-10 sm:gap-14 md:gap-16 z-10">
        {SKILL_ROWS.map((rowDef) => {
          const rowSkills = SKILLS_BY_ROW[rowDef.row] || [];
          return (
            <div
              key={rowDef.row}
              className="w-full flex flex-col items-center"
              onMouseLeave={() => setHoveredSkillId(null)}
            >
              {/* Row Technology Constellation */}
              <div className="flex flex-row justify-center items-center flex-wrap gap-7 sm:gap-9 md:gap-11 lg:gap-14">
                {rowSkills.map((skill, index) => {
                  const isSelected = selectedSkill?.id === skill.id;
                  const isDimmed = selectedSkill !== null
                    ? !isSelected
                    : hoveredSkillId !== null && hoveredSkillId !== skill.id;

                  return (
                    <div
                      key={skill.id}
                      onMouseEnter={() => setHoveredSkillId(skill.id)}
                    >
                      <SkillFloatingItem
                        skill={skill}
                        index={index}
                        onSelect={(selected) => {
                          setSelectedSkill(selected);
                        }}
                        isSelected={isSelected}
                        isDimmed={isDimmed}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Right-Side Slide-Over / Floating HUD Profile Drawer */}
      <SkillDetailDrawer
        skill={selectedSkill}
        onClose={() => setSelectedSkill(null)}
        onSelectProject={onSelectProject}
      />
    </section>
  );
};
