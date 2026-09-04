import React, { useState } from 'react';
import {
  SKILL_GROUPS,
  SKILLS_BY_CATEGORY,
  SKILLS_DATA,
  SkillItem,
} from '../data/skills';
import { SkillsIntro } from './skills/SkillsIntro';
import { SkillModule } from './skills/SkillModule';
import { SkillInspectorPortal } from './skills/SkillInspectorPortal';

interface SkillsSectionProps {
  onSelectProject?: (projectId: string) => void;
}

/**
 * SkillsSection
 * Advanced Futuristic Engineering / Creative Technology Control Console
 * 
 * Visual Hierarchy:
 * SPACE ATMOSPHERE
 * → EDITORIAL TYPOGRAPHY
 * → FOUR LARGE TECHNOLOGY MODULES
 * → SMALL UNIFORM TECHNOLOGY CARDS
 * → HIGH-END INTERACTIVE INSPECTOR
 */
export const SkillsSection: React.FC<SkillsSectionProps> = ({ onSelectProject }) => {
  const [selectedSkill, setSelectedSkill] = useState<SkillItem | null>(null);

  const handleSelectSkill = (skill: SkillItem) => {
    setSelectedSkill(skill);
  };

  const handleCloseInspector = () => {
    setSelectedSkill(null);
  };

  return (
    <section
      id="skills"
      className="relative flex flex-col items-center justify-center w-full min-h-screen py-24 sm:py-28 md:py-36 px-4 sm:px-6 md:px-12 lg:px-16 overflow-hidden text-white z-10"
      aria-label="Engineering Capabilities and Technology Control Console"
    >
      {/* 
        Central Atmospheric Space Video Layer (Space-Portfolio reference: /public/videos/skills-bg.webm)
        Sits strictly local behind the console with soft radial mask blending into the global starfield.
      */}
      <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden -z-10 flex items-center justify-center">
        <video
          className="w-full h-full object-cover opacity-20 mix-blend-screen pointer-events-none"
          preload="auto"
          playsInline
          loop
          muted
          autoPlay
          src="/videos/skills-bg.webm"
        />
        {/* Soft radial mask blending the video into the surrounding deep space starfield */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 75% 65% at 50% 50%, transparent 20%, rgba(5, 5, 8, 0.85) 75%, #050508 100%)',
          }}
        />
      </div>

      {/* Controlled Purple Spatial Atmosphere Glow */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-[1200px] h-[80vh] max-h-[800px] rounded-full pointer-events-none -z-10"
        style={{
          background:
            'radial-gradient(ellipse 65% 55% at 50% 50%, rgba(112, 66, 248, 0.12) 0%, rgba(147, 51, 234, 0.03) 45%, transparent 75%)',
          filter: 'blur(80px)',
        }}
        aria-hidden="true"
      />

      {/* EDITORIAL TYPOGRAPHY INTRO */}
      <SkillsIntro totalSkillsCount={SKILLS_DATA.length} />

      {/* 
        FOUR PRIMARY TECHNOLOGY MODULES
        Desktop layout:
        FRONTEND (01)        BACKEND (02)
        DATABASE (03)        DEVOPS / DESIGN (04)
        With subtle architectural offset / spatial composition on large screens.
      */}
      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-start z-10">
        {/* Left Column: 01 FRONTEND & 03 DATABASE */}
        <div className="flex flex-col gap-8 lg:gap-10">
          <SkillModule
            group={SKILL_GROUPS[0]}
            skills={SKILLS_BY_CATEGORY.frontend}
            activeSkillId={selectedSkill?.id}
            onSelectSkill={handleSelectSkill}
            index={0}
          />

          <SkillModule
            group={SKILL_GROUPS[2]}
            skills={SKILLS_BY_CATEGORY.database}
            activeSkillId={selectedSkill?.id}
            onSelectSkill={handleSelectSkill}
            index={2}
          />
        </div>

        {/* Right Column: 02 BACKEND & 04 DEVOPS / DESIGN (subtle spatial offset on lg screens) */}
        <div className="flex flex-col gap-8 lg:gap-10 lg:translate-y-6">
          <SkillModule
            group={SKILL_GROUPS[1]}
            skills={SKILLS_BY_CATEGORY.backend}
            activeSkillId={selectedSkill?.id}
            onSelectSkill={handleSelectSkill}
            index={1}
          />

          <SkillModule
            group={SKILL_GROUPS[3]}
            skills={SKILLS_BY_CATEGORY.devops_design}
            activeSkillId={selectedSkill?.id}
            onSelectSkill={handleSelectSkill}
            index={3}
          />
        </div>
      </div>

      {/* 
        PREMIUM FULL-SCREEN SYSTEM INSPECTOR OVERLAY
        Rendered via React Portal onto document.body to prevent any container clipping
      */}
      <SkillInspectorPortal
        skill={selectedSkill}
        onClose={handleCloseInspector}
        onSelectProject={onSelectProject}
      />
    </section>
  );
};
