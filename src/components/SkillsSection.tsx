import React, { useState } from 'react';
import { SKILL_ROWS, SKILLS_BY_ROW, SkillItem } from '../data/skills';
import { SkillText } from './skills/SkillText';
import { SkillFloatingItem } from './skills/SkillFloatingItem';
import { SkillDetailOverlay } from './skills/SkillDetailOverlay';

interface SkillsSectionProps {
  onSelectProject?: (projectId: string) => void;
}

export const SkillsSection: React.FC<SkillsSectionProps> = ({ onSelectProject }) => {
  const [selectedSkill, setSelectedSkill] = useState<SkillItem | null>(null);
  const [hoveredSkillId, setHoveredSkillId] = useState<string | null>(null);

  return (
    <section
      id="skills"
      className="relative flex flex-col items-center justify-center w-full min-h-screen py-24 sm:py-32 md:py-40 px-4 sm:px-6 md:px-12 lg:px-16 overflow-hidden text-white z-10 bg-transparent"
      aria-label="Skills and Technology Constellation"
    >
      {/* 
        LAYER 2: Central Purple Nebula Video Background (Space-Portfolio reference: /public/videos/skills-bg.webm)
        Centered, looping, muted, playsInline, autoPlay at ~0.35 opacity.
        NO heavy black masks or opaque cards blocking it!
      */}
      <div className="absolute inset-0 w-full h-full pointer-events-none -z-10 flex items-center justify-center overflow-hidden">
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

      {/* Controlled Purple Spatial Atmosphere Glow */}
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
                {rowSkills.map((skill, index) => (
                  <div
                    key={skill.id}
                    onMouseEnter={() => setHoveredSkillId(skill.id)}
                  >
                    <SkillFloatingItem
                      skill={skill}
                      index={index}
                      onSelect={(selected) => setSelectedSkill(selected)}
                      isDimmed={hoveredSkillId !== null && hoveredSkillId !== skill.id}
                    />
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Technology Profile Detail Overlay */}
      <SkillDetailOverlay
        skill={selectedSkill}
        onClose={() => setSelectedSkill(null)}
        onSelectProject={onSelectProject}
      />
    </section>
  );
};
