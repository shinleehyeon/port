"use client";

import React, { useState, useTransition } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Info } from "lucide-react";
import TabButton from "../../ui/button/TabButton";
import { skillData } from "@/lib/constants/skills";
import type { Skill, Award, AwardType, AwardBadgeProps } from "@/types/common";

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

const awardsData: Award[] = [
    {
        title: "SW 동행 해커톤",
        year: "2024",
        organization: "과학기술정보통신부",
        type: "한국 과학 창의재단 이사장상"
    },
    {
        title: "29th 앱잼",
        year: "2025",
        organization: "SK플래닛",
        type: "최우수상"
    },
    {
        title: "스마틴 앱챌린지 (STAC)",
        year: "2024",
        organization: "SK플래닛",
        type: "가작상"
    },
];

const AwardBadge: React.FC<AwardBadgeProps> = ({ type }) => {
    const getBadgeColors = (type: AwardType) => {
        switch (type) {
            case "최우수상":
                return "bg-purple-50 text-purple-600";
            case "한국 과학 창의재단 이사장상":
                return "bg-emerald-50 text-emerald-600";
            default:
                return "bg-amber-50 text-amber-600";
        }
    };
    
    const colors = getBadgeColors(type);
    
    return (
        <div className={`rounded-full px-3 py-1 text-sm font-medium ${colors}`}>
            {type}
        </div>
    );
};

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

const AwardSection: React.FC = () => (
    <div className="grid grid-cols-1 gap-4">
        {awardsData.map((award, index) => (
            <motion.div
                key={index}
                variants={fadeInAnimationVariants}
                initial="initial"
                animate="animate"
                viewport={{ once: true }}
                custom={index}
                className="bg-white rounded-xl overflow-hidden border border-primary-400 p-4"
            >
                <div className="space-y-3">
                    <div className="flex items-center justify-between">
                        <div className="text-sm text-gray-500 space-x-2">
                            <span>{award.year}</span>
                            <span>•</span>
                            <span>{award.organization}</span>
                        </div>
                        <AwardBadge type={award.type} />
                    </div>
                    <h3 className="font-medium text-gray-900">
                        {award.title}
                    </h3>
                </div>
            </motion.div>
        ))}
    </div>
);

const AboutSection: React.FC = () => {
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