import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  SKILLS_DATA,
  SKILL_GROUPS,
  SkillItem as SkillItemType,
} from '../data/skills';
import { SkillModule } from './skills/SkillModule';

interface SkillsSectionProps {
  onSelectProject?: (projectId: string) => void;
}

export const SkillsSection: React.FC<SkillsSectionProps> = ({ onSelectProject }) => {
  const [activeSkill, setActiveSkill] = useState<SkillItemType | null>(null);
  const [hoveredSkill, setHoveredSkill] = useState<SkillItemType | null>(null);

  const handleSelectSkill = (skill: SkillItemType) => {
    setActiveSkill((prev) => (prev?.id === skill.id ? null : skill));
  };

  const handleCloseDetail = () => {
    setActiveSkill(null);
  };

  const frontendSkills = SKILLS_DATA.filter((s) => s.category === 'frontend');
  const backendSkills = SKILLS_DATA.filter((s) => s.category === 'backend');
  const databaseSkills = SKILLS_DATA.filter((s) => s.category === 'database');
  const devopsDesignSkills = SKILLS_DATA.filter((s) => s.category === 'devops_design');

  const frontendGroup = SKILL_GROUPS.find((g) => g.id === 'frontend')!;
  const backendGroup = SKILL_GROUPS.find((g) => g.id === 'backend')!;
  const databaseGroup = SKILL_GROUPS.find((g) => g.id === 'database')!;
  const devopsDesignGroup = SKILL_GROUPS.find((g) => g.id === 'devops_design')!;

  return (
    <section
      id="skills"
      className="relative w-full min-h-screen overflow-hidden px-[6vw] md:px-[8vw] lg:px-[10vw] pt-[16vh] pb-[22vh] text-white z-10"
      aria-label="Capabilities and Technology Ecosystem"
    >
      {/* 
        Local Atmospheric Background Video Layer (Space-Portfolio reference: /public/videos/skills-bg.webm)
        Sits strictly local to this section, below content and balanced with the global star field.
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
        {/* Soft radial mask blending the video into the surrounding star field */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 75% 65% at 50% 50%, transparent 25%, rgba(5, 5, 8, 0.75) 75%, #050508 100%)',
          }}
        />
      </div>

      {/* Subtle Central Spatial Atmosphere & Depth Glow */}
      <div
        className="absolute top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] max-w-[1200px] h-[70vh] max-h-[850px] rounded-full pointer-events-none -z-10"
        style={{
          background:
            'radial-gradient(ellipse 65% 55% at 50% 50%, rgba(255, 255, 255, 0.035) 0%, rgba(99, 102, 241, 0.02) 40%, transparent 75%)',
          filter: 'blur(60px)',
        }}
        aria-hidden="true"
      />

      {/* Section Editorial Intro (Matching portfolio editorial standards) */}
      <div className="relative flex flex-col justify-start mb-[10vh] max-w-[1400px] mx-auto">
        {/* Eyebrow badge */}
        <div className="flex items-center gap-3 mb-[2vh]">
          <span className="h-[1px] w-[3vw] bg-white/40" />
          <span className="tracking-[0.4vh] text-[1.25vh] font-bold text-white/50 uppercase font-[family-name:var(--body-font)]">
            03 — Capabilities & Architecture
          </span>
        </div>

        {/* Section Heading */}
        <h2 className="title text-[14vw] md:text-[16vh] font-normal leading-[0.9] tracking-normal m-0 text-left">
          Skills
        </h2>

        {/* Space-Portfolio framing subtitle */}
        <div className="relative mt-[4vh] ml-0 md:ml-[6vw] max-w-[840px]">
          <span className="hidden md:block absolute h-[1px] w-[5vw] -left-[6vw] top-[14%] bg-white/40" />
          <p className="font-[family-name:var(--title-font)] text-[2.2vh] md:text-[2.6vh] text-white/95 leading-snug tracking-wide mb-[1.5vh]">
            Engineering systems, interactive creative tech & scalable cloud foundations.
          </p>
          <p className="font-[family-name:var(--body-font)] text-white/60 text-[1.55vh] max-[750px]:text-[3.2vw] leading-relaxed">
            Organized into four primary architectural control modules spanning reactive client systems,
            high-throughput backends, relational integrity, and containerized deployment infrastructure.
          </p>
        </div>
      </div>

      {/* 
        Spatial Hierarchy: Four Primary Technology Modules
        Organized with subtle vertical offsets and depth layering rather than a flat rigid 2x2 grid.
      */}
      <div className="relative max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 lg:gap-10 items-start">
          {/* Column 1: Frontend & Database */}
          <div className="flex flex-col gap-6 md:gap-10">
            {/* 01 — FRONTEND */}
            <SkillModule
              group={frontendGroup}
              skills={frontendSkills}
              activeSkill={activeSkill}
              hoveredSkill={hoveredSkill}
              onSelectSkill={handleSelectSkill}
              onHoverSkill={setHoveredSkill}
              onCloseDetail={handleCloseDetail}
              onSelectProject={onSelectProject}
              verticalOffsetClass="md:-translate-y-2"
              delayIndex={0}
            />

            {/* 03 — DATABASE */}
            <SkillModule
              group={databaseGroup}
              skills={databaseSkills}
              activeSkill={activeSkill}
              hoveredSkill={hoveredSkill}
              onSelectSkill={handleSelectSkill}
              onHoverSkill={setHoveredSkill}
              onCloseDetail={handleCloseDetail}
              onSelectProject={onSelectProject}
              verticalOffsetClass="md:translate-y-2"
              delayIndex={2}
            />
          </div>

          {/* Column 2: Backend & DevOps / Design */}
          <div className="flex flex-col gap-6 md:gap-10 md:pt-6 lg:pt-8">
            {/* 02 — BACKEND */}
            <SkillModule
              group={backendGroup}
              skills={backendSkills}
              activeSkill={activeSkill}
              hoveredSkill={hoveredSkill}
              onSelectSkill={handleSelectSkill}
              onHoverSkill={setHoveredSkill}
              onCloseDetail={handleCloseDetail}
              onSelectProject={onSelectProject}
              verticalOffsetClass="md:translate-y-4"
              delayIndex={1}
            />

            {/* 04 — DEVOPS / DESIGN */}
            <SkillModule
              group={devopsDesignGroup}
              skills={devopsDesignSkills}
              activeSkill={activeSkill}
              hoveredSkill={hoveredSkill}
              onSelectSkill={handleSelectSkill}
              onHoverSkill={setHoveredSkill}
              onCloseDetail={handleCloseDetail}
              onSelectProject={onSelectProject}
              verticalOffsetClass="md:translate-y-8"
              delayIndex={3}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
