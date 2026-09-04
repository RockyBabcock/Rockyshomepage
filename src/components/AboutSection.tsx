import React, { useEffect, useRef, useState } from 'react';
import { onScrolledIntoView } from '../utils';

interface AboutSectionProps {
  scrollY: number;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ scrollY }) => {
  const [section1InView, setSection1InView] = useState(false);
  const [section2InView, setSection2InView] = useState(false);

  const section1Ref = useRef<HTMLDivElement>(null);
  const section2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (section1Ref.current) {
      onScrolledIntoView(section1Ref.current, () => setSection1InView(true));
    }
    if (section2Ref.current) {
      onScrolledIntoView(section2Ref.current, () => setSection2InView(true));
    }
  }, []);

  // Parallax offset on profile picture
  const profilePicOffsetY = scrollY * 0.12;

  return (
    <div id="about" className="relative w-full overflow-hidden">
      {/* Top Part: Title, Bio, Social Links, and Profile Image */}
      <div
        ref={section1Ref}
        className="relative flex flex-row justify-between overflow-hidden px-[5vw] mt-[30vh] md:mt-[40vh] pb-[5vh]"
      >
        {/* Left Column: Text & Links */}
        <div
          className={`box-border w-[90%] md:w-[50%] mx-auto md:mx-[2vw] pr-0 md:pr-[4vw] flex flex-col justify-center mt-[5vh] z-10 transition-all duration-1000 ${
            section1InView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
        >
          <h1 className="title text-[18vw] md:text-[18vh] font-normal leading-none text-left">
            Hey I'm <br />
            Rocky
          </h1>

          <div className="relative mt-[8vh] ml-0 md:ml-[10vw] w-full md:w-[75%]">
            <span className="hidden md:block absolute h-[1px] w-[8vw] -left-[10vw] top-[18%] bg-white/70" />
            <p className="paragraph text-white/90 text-[1.8vh] max-[950px]:text-[1.8vh] max-[750px]:text-[3.2vw] leading-relaxed">
              I'm a creative technologist and full-stack developer. I specialize in designing and
              developing expressive web experiences, interactive systems, and digital products.
              <br />
              <br />
              I work with teams, creators, and organizations to craft responsive, scalable, and
              meticulously detailed web applications tailor-made for them. Think we can build something
              impactful together? Let's talk over email.
            </p>
          </div>

          <div className="mt-[4vh] ml-0 md:ml-[10vw] flex flex-row gap-[2vw] text-[2.5vh]">
            <span className="button">
              <a
                href="mailto:holmepavolini@gmail.com"
                target="_blank"
                rel="noreferrer"
                className="clickable text-white uppercase text-[1.4vh] tracking-widest font-[family-name:var(--body-font)]"
              >
                Email Me
              </a>
            </span>
            <span className="button">
              <a
                href="https://github.com/Musab-Hassan/musabhassan.com"
                target="_blank"
                rel="noreferrer"
                className="clickable text-white uppercase text-[1.4vh] tracking-widest font-[family-name:var(--body-font)]"
              >
                Github
              </a>
            </span>
          </div>
        </div>

        {/* Right Column: Profile Image with Parallax */}
        <div
          className="hidden md:block w-[50%] overflow-hidden -mt-[25vh] relative select-none"
          style={{
            transform: `translate3d(0, ${profilePicOffsetY}px, 0)`,
          }}
        >
          <img
            src="/assets/imgs/profile-photo.jpg"
            alt="Rocky's Profile"
            className="w-[85%] h-[80%] rounded-[0.5vh] object-cover shadow-[3px_9px_25px_rgba(0,0,0,0.3)]"
          />
        </div>
      </div>

      {/* Bottom Part: Skills / Technical Expertise and Honors */}
      <div
        ref={section2Ref}
        className={`flex flex-col lg:flex-row justify-between px-[8vw] lg:px-[13vw] mt-[12vh] w-full box-border transition-all duration-1000 ${
          section2InView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        {/* Technical Expertise Column */}
        <ul className="list-none text-left w-full lg:w-[50%] p-0 m-0">
          <li className="tracking-[0.6vh] text-[1.3vh] font-bold text-white/60 uppercase py-2">
            technical expertise
          </li>

          <li className="font-[family-name:var(--body-font)] uppercase text-[1.9vh] tracking-[0.4vh] py-[2.2vh] border-b border-[#444] flex flex-row justify-between items-center">
            <span>Front-end</span>
            <div className="flex flex-row gap-4 items-center">
              <img src="/assets/imgs/svg-icons/svelte.svg" alt="Svelte" className="h-[2.3vh]" />
              <img src="/assets/imgs/svg-icons/react.svg" alt="React" className="h-[2.3vh]" />
            </div>
          </li>

          <li className="font-[family-name:var(--body-font)] uppercase text-[1.9vh] tracking-[0.4vh] py-[2.2vh] border-b border-[#444] flex flex-row justify-between items-center">
            <span>Back-end</span>
            <div className="flex flex-row gap-4 items-center">
              <img src="/assets/imgs/svg-icons/nodejs.svg" alt="Node.js" className="h-[2.3vh]" />
              <img src="/assets/imgs/svg-icons/php.svg" alt="PHP" className="h-[2.3vh]" />
            </div>
          </li>

          <li className="font-[family-name:var(--body-font)] uppercase text-[1.9vh] tracking-[0.4vh] py-[2.2vh] border-b border-[#444] flex flex-row justify-between items-center">
            <span>Dev-ops</span>
            <div className="flex flex-row gap-4 items-center">
              <img src="/assets/imgs/svg-icons/firebase.svg" alt="Firebase" className="h-[2.3vh]" />
              <img src="/assets/imgs/svg-icons/gcp.svg" alt="Google Cloud" className="h-[2.3vh]" />
            </div>
          </li>

          <li className="font-[family-name:var(--body-font)] uppercase text-[1.9vh] tracking-[0.4vh] py-[2.2vh] border-b border-[#444] flex flex-row justify-between items-center">
            <span>Mobile</span>
            <div className="flex flex-row gap-4 items-center">
              <img src="/assets/imgs/svg-icons/flutter.svg" alt="Flutter" className="h-[2.3vh]" />
              <img src="/assets/imgs/svg-icons/android.svg" alt="Android" className="h-[2.3vh]" />
              <img src="/assets/imgs/svg-icons/iOS.svg" alt="iOS" className="h-[2.3vh]" />
            </div>
          </li>
        </ul>

        {/* Awards / Recognition Column */}
        <ul className="list-none text-left w-full lg:w-[35%] p-0 m-0 mt-[8vh] lg:mt-0">
          <li className="tracking-[0.6vh] text-[1.3vh] font-bold text-white/60 uppercase py-2">
            awards
          </li>
          <li className="font-[family-name:var(--body-font)] uppercase text-[1.9vh] tracking-[0.4vh] py-[2.2vh] border-b border-[#444] flex flex-row justify-between items-center">
            <span>1x — Awwwards Honors</span>
          </li>
        </ul>
      </div>
    </div>
  );
};
