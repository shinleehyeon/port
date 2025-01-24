"use client";
import React, {useTransition, useState} from "react";
import Image from "next/image";
import TabButton from "./TabButton";
import {motion, AnimatePresence} from "framer-motion";
import {FaTrophy} from "react-icons/fa";
import {ChevronDown, Info} from "lucide-react";

const skillData = {
    frontend: [
        {icon: "https://skillicons.dev/icons?i=react", desc: "React를 활용한 컴포넌트 기반 개발과 상태관리 익숙합니다."},
        {icon: "https://skillicons.dev/icons?i=nextjs", desc: "Next.js를 이용한 서버 사이드 렌더링 경험이 있습니다."},
        {icon: "https://skillicons.dev/icons?i=vite", desc: "Vite를 활용하여 빠른 개발 환경을 구축할 수 있습니다."},
        {icon: "https://skillicons.dev/icons?i=tailwind", desc: "Tailwind CSS로 반응형 디자인을 구현할 수 있습니다."},
        {icon: "https://skillicons.dev/icons?i=typescript", desc: "TypeScript를 사용하여 타입을 안전하게 관리할 수 있습니다."},
    ],
    backend: [
        {icon: "https://skillicons.dev/icons?i=nodejs", desc: "Node.js로 서버 애플리케이션을 개발할 수 있습니다."},
        {icon: "https://skillicons.dev/icons?i=python", desc: "Python으로 데이터 처리와 자동화를 구현할 수 있습니다."},
        {icon: "https://skillicons.dev/icons?i=mysql", desc: "MySQL을 사용한 데이터베이스 설계 경험이 있습니다."},
        {icon: "https://skillicons.dev/icons?i=firebase", desc: "Firebase로 실시간 데이터베이스를 구현할 수 있습니다."},
    ],
};

const awardsData = [
    {
        title: "동행 해커톤 창의재단이사장상(2위)",
        year: "2024",
    },
    {
        title: "스마틴 앱챌린지 (STAC) 가작상",
        year: "2024",
    },
];

const fadeInAnimationVariants = {
    initial: {opacity: 0},
    animate: {
        opacity: 1,
        transition: {
            duration: 0.5,
            ease: "easeOut"
        }
    },
    exit: {
        opacity: 0,
        transition: {
            duration: 0.3,
            ease: "easeIn"
        }
    }
};

const SkillSection = ({ title, skills, selectedSkill, onSkillClick }) => (
    <div className="mb-6">
        <h3 className="text-lg font-semibold mb-3 text-black">{title}</h3>
        <AnimatePresence mode="wait">
            {selectedSkill ? (
                <motion.div
                    key="description"
                    initial={{opacity: 0, y: 20}}
                    animate={{opacity: 1, y: 0}}
                    exit={{opacity: 0, y: -20}}
                    transition={{duration: 0.5, ease: "easeInOut"}}
                    className="cursor-pointer"
                    onClick={() => onSkillClick(null)}
                >
                    <div className="flex items-center gap-4">
                        <img src={selectedSkill.icon} alt="skill" className="w-12 h-12"/>
                        <p className="text-gray-700">{selectedSkill.desc}</p>
                        <ChevronDown className="w-5 h-5 ml-auto text-gray-500 rotate-180" />
                    </div>
                </motion.div>
            ) : (
                <motion.div
                    key="icons"
                    className="flex flex-wrap gap-8"
                >
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
                            <img src={skill.icon} alt="skill" className="w-12 h-12"/>
                        </motion.div>
                    ))}
                </motion.div>
            )}
        </AnimatePresence>
    </div>
);

const TAB_DATA = [
    {
        title: "Skills",
        id: "skills",
        content: ({selectedFrontend, selectedBackend, onFrontendClick, onBackendClick}) => (
            <div>
                <div className="flex flex-col space-y-1">
                    <SkillSection
                        title="Frontend"
                        skills={skillData.frontend}
                        selectedSkill={selectedFrontend}
                        onSkillClick={onFrontendClick}
                    />
                    <SkillSection
                        title="Backend"
                        skills={skillData.backend}
                        selectedSkill={selectedBackend}
                        onSkillClick={onBackendClick}
                    />
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500 mt-6">
                    <Info className="w-4 h-4"/>
                    <p>아이콘을 클릭하여 설명 보기</p>
                </div>
            </div>
        ),
    },
    {
        title: "Award",
        id: "award",
        content: () => (
            <div className="grid grid-cols-1 gap-4">
                {awardsData.map((award, index) => (
                    <motion.div
                        key={index}
                        variants={fadeInAnimationVariants}
                        initial="initial"
                        animate="animate"
                        viewport={{once: true}}
                        custom={index}
                        className="border-[#DADADA] rounded-xl overflow-hidden group border p-3"
                        style={{backgroundColor: "#EBEBEB"}}
                    >
                        <div className="flex items-center gap-3">
                            <FaTrophy className="text-yellow-500 w-5 h-5"/>
                            <div>
                                <span className="text-primary-500 text-sm">
                                    {award.year}
                                </span>
                                <p className="font-medium text-black">{award.title}</p>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        ),
    },
];

const AboutSection = () => {
    const [tab, setTab] = useState("skills");
    const [selectedFrontend, setSelectedFrontend] = useState(null);
    const [selectedBackend, setSelectedBackend] = useState(null);
    const [isPending, startTransition] = useTransition();

    const handleTabChange = (id) => {
        startTransition(() => {
            setTab(id);
            setSelectedFrontend(null);
            setSelectedBackend(null);
        });
    };

    return (
        <section id="about" className="pt-24">
            <h2 className="text-4xl font-bold text-black mb-8">About</h2>
            <div className="md:grid md:grid-cols-2 items-start gap-10 relative">
                <div className="relative w-[300px] h-[400px]">
                    <Image
                        src="/images/about.png"
                        alt="Hero image"
                        fill
                        className="rounded-xl object-cover"
                    />
                </div>
                <div className="mt-4 md:mt-0 text-left flex flex-col h-full">
                    <motion.div
                        initial={{opacity: 0, y: 20}}
                        animate={{opacity: 1, y: 0}}
                        transition={{duration: 0.5}}
                    >
                        <p className="text-black text-base lg:text-lg">
                            안녕하세요👋, 저는 대한민국에서 소프트웨어를 공부하고 있는 선린인터넷고등학교에 재학중인
                            신이현입니다. 저는 새로운 기술을 배우는 것을 좋아하며 사람들에게 실질적인 가치와 도움을 제공하는 서비스를 만들고 싶습니다.
                        </p>
                    </motion.div>
                    <div className="flex flex-row justify-start mt-8">
                        <TabButton
                            selectTab={() => handleTabChange("skills")}
                            active={tab === "skills"}
                        >
                            사용 기술
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
                                initial={{opacity: 0, y: 20}}
                                animate={{opacity: 1, y: 0}}
                                exit={{opacity: 0, y: -20}}
                                transition={{duration: 0.5}}
                            >
                                {tab === "skills"
                                    ? TAB_DATA[0].content({
                                        selectedFrontend,
                                        selectedBackend,
                                        onFrontendClick: setSelectedFrontend,
                                        onBackendClick: setSelectedBackend
                                    })
                                    : TAB_DATA[1].content()
                                }
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutSection;