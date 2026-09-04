import React, { useState } from 'react';
import {
  ROW_1_CORE_SKILLS,
  ROW_2_FRONTEND_SKILLS,
  ROW_3_BACKEND_SKILLS,
  ROW_4_INFRA_SKILLS,
  ROW_5_DESIGN_SKILLS,
  SkillItem,
} from '../data/skills';
import { SkillText } from './skills/SkillText';
import { SkillDataProvider } from './skills/SkillDataProvider';
import { SkillDetailModal } from './skills/SkillDetailModal';

interface SkillsSectionProps {
  onSelectProject?: (projectId: string) => void;
}

/**
 * SkillsSection
 * Completely rebuilt strictly based on sanidhyy/space-portfolio:
 * Skills
 *   ↓
 * SkillText
 *   ↓
 * multiple horizontal flex-wrap skill arrays
 *   ↓
 * floating technology icons
 *   ↓
 * staggered entrance animation
 *   ↓
 * central atmospheric video
 */
export const SkillsSection: React.FC<SkillsSectionProps> = ({ onSelectProject }) => {
  const [activeSkill, setActiveSkill] = useState<SkillItem | null>(null);

  const handleSelectSkill = (skill: SkillItem) => {
    setActiveSkill((prev) => (prev?.id === skill.id ? null : skill));
  };

  const handleCloseModal = () => {
    setActiveSkill(null);
  };

  // Cumulative offset index for smooth, continuous stagger across all bands
  const row1Offset = 0;
  const row2Offset = ROW_1_CORE_SKILLS.length;
  const row3Offset = row2Offset + ROW_2_FRONTEND_SKILLS.length;
  const row4Offset = row3Offset + ROW_3_BACKEND_SKILLS.length;
  const row5Offset = row4Offset + ROW_4_INFRA_SKILLS.length;

  return (
    <section
      id="skills"
      className="relative flex flex-col items-center justify-center w-full min-h-screen py-24 sm:py-28 md:py-36 px-4 sm:px-6 md:px-12 overflow-hidden text-white z-10"
      aria-label="Technology Constellation and Capabilities"
    >
      {/* 
        Central Atmospheric Space Video Layer (Space-Portfolio reference: /public/videos/skills-bg.webm)
        Sits strictly local behind the floating icons with soft radial mask blending into the global star field.
      */}
      <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden -z-10 flex items-center justify-center">
        <video
          className="w-full h-full object-cover opacity-25 mix-blend-screen pointer-events-none"
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
              'radial-gradient(ellipse 75% 65% at 50% 50%, transparent 25%, rgba(5, 5, 8, 0.8) 75%, #050508 100%)',
          }}
        />
      </div>

      {/* Subtle Central Purple Spatial Atmosphere Glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85vw] max-w-[1100px] h-[75vh] max-h-[750px] rounded-full pointer-events-none -z-10"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(112, 66, 248, 0.12) 0%, rgba(147, 51, 234, 0.04) 45%, transparent 75%)',
          filter: 'blur(70px)',
        }}
        aria-hidden="true"
      />

      {/* Editorial Space-Portfolio Header (Welcome box pill + Heading + Technical Statement) */}
      <SkillText />

      {/*
        Spatial Technology Constellation
        Multiple organic horizontal flex-wrap bands (matching Space Portfolio's skills.tsx layout)
      */}
      <div className="flex flex-col items-center justify-center w-full max-w-6xl mx-auto gap-4 sm:gap-6 md:gap-8 z-10">
        {/* ROW / GROUP 01 — Core Technologies */}
        <div className="flex flex-row justify-around flex-wrap items-center gap-6 sm:gap-8 md:gap-14 w-full max-w-4xl">
          {ROW_1_CORE_SKILLS.map((skill, i) => (
            <SkillDataProvider
              key={skill.id}
              skill={skill}
              index={row1Offset + i}
              onSelect={handleSelectSkill}
              isSelected={activeSkill?.id === skill.id}
            />
          ))}
        </div>

        {/* ROW / GROUP 02 — Frontend & Reactive Systems */}
        <div className="flex flex-row justify-around flex-wrap items-center gap-5 sm:gap-8 md:gap-12 w-full max-w-4xl">
          {ROW_2_FRONTEND_SKILLS.map((skill, i) => (
            <SkillDataProvider
              key={skill.id}
              skill={skill}
              index={row2Offset + i}
              onSelect={handleSelectSkill}
              isSelected={activeSkill?.id === skill.id}
            />
          ))}
        </div>

        {/* ROW / GROUP 03 — Graphics, Shaders & Backend Architecture */}
        <div className="flex flex-row justify-around flex-wrap items-center gap-6 sm:gap-8 md:gap-14 w-full max-w-3xl">
          {ROW_3_BACKEND_SKILLS.map((skill, i) => (
            <SkillDataProvider
              key={skill.id}
              skill={skill}
              index={row3Offset + i}
              onSelect={handleSelectSkill}
              isSelected={activeSkill?.id === skill.id}
            />
          ))}
        </div>

        {/* ROW / GROUP 04 — Infrastructure, Cloud & Data Integrity */}
        <div className="flex flex-row justify-around flex-wrap items-center gap-5 sm:gap-7 md:gap-12 w-full max-w-4xl">
          {ROW_4_INFRA_SKILLS.map((skill, i) => (
            <SkillDataProvider
              key={skill.id}
              skill={skill}
              index={row4Offset + i}
              onSelect={handleSelectSkill}
              isSelected={activeSkill?.id === skill.id}
            />
          ))}
        </div>

        {/* ROW / GROUP 05 — Design, Tooling & Mobile Ergonomics */}
        <div className="flex flex-row justify-around flex-wrap items-center gap-6 sm:gap-8 md:gap-12 w-full max-w-2xl">
          {ROW_5_DESIGN_SKILLS.map((skill, i) => (
            <SkillDataProvider
              key={skill.id}
              skill={skill}
              index={row5Offset + i}
              onSelect={handleSelectSkill}
              isSelected={activeSkill?.id === skill.id}
            />
          ))}
        </div>
      </div>

      {/* Progressive Disclosure: Compact Rich Inspector Dialog */}
      <SkillDetailModal
        skill={activeSkill}
        onClose={handleCloseModal}
        onSelectProject={onSelectProject}
      />
    </section>
  );
};
