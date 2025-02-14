"use client";

import React, { useState, useTransition } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Info } from "lucide-react";
import { FaTrophy } from "react-icons/fa";
import TabButton from "../../ui/button/TabButton";
import { skillData } from "@/lib/constants/skills";
import type { Skill } from "@/types/common";

const fadeInAnimationVariants = {
    initial: { opacity: 0 },
    animate: {
        opacity: 1,
        transition: {
            duration: 0.5,
            ease: "easeOut",
        },
    },
    exit: {
        opacity: 0,
        transition: {
            duration: 0.3,
            ease: "easeIn",
        },
    },
};

const awardsData = [
    {
        title: "동행 해커톤 한국 과학 창의재단 이사장상",
        year: "2024",
        organization: "과학기술정보통신부"
    },
    {
        title: "29th 앱잼 미래부문 최우수상",
        year: "2025",
        organization: "SK플래닛"
    },
    {
        title: "스마틴 앱챌린지 (STAC) 가작상",
        year: "2024",
        organization: "SK플래닛"
    },
];

interface SkillSectionProps {
    title: string;
    skills: Skill[];
    selectedSkill: Skill | null;
    onSkillClick: (skill: Skill | null) => void;
}

const SkillSection: React.FC<SkillSectionProps> = ({
    title,
    skills,
    selectedSkill,
    onSkillClick,
}) => (
    <div className="mb-6">
        <h3 className="text-lg font-semibold mb-3 text-black">{title}</h3>
        <AnimatePresence mode="wait">
            {selectedSkill ? (
                <motion.div
                    key="description"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="cursor-pointer"
                    onClick={() => onSkillClick(null)}
                >
                    <div className="flex items-center gap-4">
                        <img 
                            src={selectedSkill.icon}
                            alt="skill" 
                            className="w-12 h-12 user-select-none"
                            draggable="false"
                            onMouseDown={(e) => e.preventDefault()} 
                        />
                        <p className="text-gray-700">{selectedSkill.desc}</p>
                        <ChevronDown className="w-5 h-5 ml-auto text-gray-500 rotate-180" />
                    </div>
                </motion.div>
            ) : (
                <motion.div key="icons" className="flex flex-wrap gap-4">
                    {skills.map((skill, index) => (
                        <motion.div
                            key={index}
                            variants={fadeInAnimationVariants}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            onClick={() => onSkillClick(skill)}
                            className="cursor-pointer hover:scale-110 transition-transform"
                        >
                            <img 
                                src={skill.icon} 
                                alt="skill" 
                                className="w-12 h-12 user-select-none"
                                draggable="false"
                                onMouseDown={(e) => e.preventDefault()} 
                            />
                        </motion.div>
                    ))}
                </motion.div>
            )}
        </AnimatePresence>
    </div>
);

const AwardSection = () => (
    <div className="grid grid-cols-1 gap-4">
      {awardsData.map((award, index) => (
        <motion.div
          key={index}
          variants={fadeInAnimationVariants}
          initial="initial"
          animate="animate"
          viewport={{ once: true }}
          custom={index}
          className="border-[#DADADA] rounded-xl overflow-hidden group border p-3"
          style={{ backgroundColor: "#EBEBEB" }}
        >
          <div className="flex items-center gap-3">
            <FaTrophy className="text-yellow-500 w-5 h-5" />
            <div>
              <span className="text-gray-500 font-medium text-sm mr-1">
                {award.year}
              </span>
              <span className="text-gray-300 mx-1">•</span>
              <span className="text-gray-400 text-sm ml-1">
                주최 : {award.organization}
              </span>
              <p className="font-medium text-black">{award.title}</p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );

const AboutSection = () => {
    const [tab, setTab] = useState<"skills" | "award">("skills");
    const [selectedFrontend, setSelectedFrontend] = useState<Skill | null>(null);
    const [selectedBackend, setSelectedBackend] = useState<Skill | null>(null);
    const [isPending, startTransition] = useTransition();

    const handleTabChange = (id: "skills" | "award") => {
        startTransition(() => {
            setTab(id);
            setSelectedFrontend(null);
            setSelectedBackend(null);
        });
    };

    return (
        <section id="about" className="pt-24">
            <h2 className="text-4xl font-semibold text-black mb-8">자기소개</h2>
            <div className="md:grid md:grid-cols-2 items-start gap-10 relative">
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
                <div className="mt-4 md:mt-0 text-left flex flex-col h-full">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <p className="text-black text-base lg:text-lg">
                            안녕하세요👋, 저는 대한민국에서 소프트웨어를 공부하고 있는<br/>
                            선린인터넷고등학교에 재학중인 신이현입니다.<br/>
                            저는 새로운 기술을 배우는 것을 좋아하며 <br/>
                            사람들에게 실질적인 가치와 도움을 줄 수 있는<br/> 
                            서비스를 만들고 싶습니다.
                        </p>
                    </motion.div>
                    <div className="flex flex-row justify-start mt-8">
                        <TabButton
                            selectTab={() => handleTabChange("skills")}
                            active={tab === "skills"}
                        >
                            기술 스택
                        </TabButton>
                        <TabButton
                            selectTab={() => handleTabChange("award")}
                            active={tab === "award"}
                        >
                            수상 실적
                        </TabButton>
                    </div>
                    <div className="mt-8">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={tab}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.5 }}
                            >
                                {tab === "skills" ? (
                                    <div>
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
                                        <div className="flex items-center gap-2 text-sm text-gray-500 mt-6">
                                            <Info className="w-4 h-4" />
                                            <p>아이콘을 클릭하여 자세한 설명 보기</p>
                                        </div>
                                    </div>
                                ) : (
                                    <AwardSection />
                                )}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutSection;