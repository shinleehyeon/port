"use client";
import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { skillData } from "@/lib/constants/skills";
import type { Skill } from "@/types/common";
import { useLanguage } from "@/contexts/LanguageContext";
import AwardSection from "./AwardSection";
import SkillSection from "./SkillSection";
import ScrollAnimationWrapper from "@/components/ui/ScrollAnimationWrapper";

const AboutSection: React.FC = () => {
  const [selectedFrontend, setSelectedFrontend] = useState<Skill | null>(null);
  const [selectedBackend, setSelectedBackend] = useState<Skill | null>(null);
  const [selectedInfrastructure, setSelectedInfrastructure] =
    useState<Skill | null>(null);
  const { t } = useLanguage();

  return (
    <section id="about" className="pt-24 mb-24">
      <ScrollAnimationWrapper>
        <h2 className="text-4xl font-semibold text-black mb-8">
          {t("about.title")}
        </h2>
      </ScrollAnimationWrapper>

      <div className="md:grid md:grid-cols-2 items-start gap-10 relative">
        <ScrollAnimationWrapper delay={0.2} direction="left">
          <div className="relative w-[300px] h-[400px]">
            <Image
              src="/images/about.png"
              alt="Hero image"
              fill
              priority
              className="rounded-xl object-cover user-select-none"
              draggable="false"
              onMouseDown={(e) => e.preventDefault()}
            />
          </div>
        </ScrollAnimationWrapper>
        <ScrollAnimationWrapper delay={0.4} direction="right">
          <div className="mt-4 md:mt-0 text-left flex flex-col h-full">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-black text-base lg:text-lg whitespace-pre-line">
                {t("about.description")}
              </p>
            </motion.div>
          </div>
        </ScrollAnimationWrapper>
      </div>
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-10">
        <ScrollAnimationWrapper delay={0.6} direction="up">
          <div>
            <h3 className="text-2xl font-semibold text-black mb-4">
              {t("about.tabs.awards")}
            </h3>
            <AwardSection />
          </div>
        </ScrollAnimationWrapper>
        <ScrollAnimationWrapper delay={0.8} direction="up">
          <div>
            <h3 className="text-2xl font-semibold text-black mb-4">
              {t("about.tabs.skills")}
            </h3>
            <SkillSection
              title="Frontend"
              skills={skillData.frontend}
              selectedSkill={selectedFrontend}
              onSkillClick={setSelectedFrontend}
            />
            <SkillSection
              title="Backend"
              skills={skillData.backend}
              selectedSkill={selectedBackend}
              onSkillClick={setSelectedBackend}
            />
            <SkillSection
              title="Infrastructure"
              skills={skillData.infrastructure}
              selectedSkill={selectedInfrastructure}
              onSkillClick={setSelectedInfrastructure}
            />
            <p className="text-sm text-gray-500 mt-4 flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-info w-4 h-4"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M12 16v-4" />
                <path d="M12 8h.01" />
              </svg>
              {t("about.skillsInfo")}
            </p>
          </div>
        </ScrollAnimationWrapper>
      </div>
    </section>
  );
};

export default AboutSection;
