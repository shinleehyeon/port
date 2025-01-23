"use client";
import React, { useTransition, useState } from "react";
import Image from "next/image";
import TabButton from "./TabButton";
import { motion, AnimatePresence } from "framer-motion";
import {
    SiReact,
    SiPython,
    SiJavascript,
    SiTypescript,
    SiNodedotjs,
    SiVite,
    SiNextdotjs,
    SiTailwindcss,
} from "react-icons/si";
import { FaTrophy } from "react-icons/fa";

const skillsData = [
    { name: "React", icon: SiReact, color: "#61DAFB" },
    { name: "Next.js", icon: SiNextdotjs, color: "#ffffff" },
    { name: "Python", icon: SiPython, color: "#3776AB" },
    { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
    { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
    { name: "Node.js", icon: SiNodedotjs, color: "#339933" },
    { name: "Vite", icon: SiVite, color: "#646CFF" },
    { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4" },
];

const competitionData = [
    {
        title: "2022 넥슨 청소년 프로그래밍 챌린지 (NYPC)",
        link: "https://nypc.github.io/",
        year: "2022",
    },
    {
        title: "스마틴 앱챌린지 (STAC)",
        link: "https://www.stac.or.kr/",
        year: "2024",
    },
    {
        title: "SW 동행 해커톤",
        link: "https://www.kosac.re.kr/menus/270/boards/386/posts/40735?page=1",
        year: "2024",
    },
];

const awardsData = [
    {
        title: "동행 해커톤 창의재단 이사장상",
        year: "2024",
    },
    {
        title: "스마틴 앱챌린지 (STAC) 가작상",
        year: "2024",
    },
];

const fadeInAnimationVariants = {
    initial: {
        opacity: 0,
        y: 50,
    },
    animate: (index) => ({
        opacity: 1,
        y: 0,
        transition: {
            delay: 0.1 * index,
            duration: 0.5,
            ease: "easeOut",
        },
    }),
};

const TAB_DATA = [
    {
        title: "Skills",
        id: "skills",
        content: (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {skillsData.map((skill, index) => (
                    <motion.div
                        key={skill.name}
                        variants={fadeInAnimationVariants}
                        initial="initial"
                        animate="animate"
                        viewport={{ once: true }}
                        custom={index}
                        className="bg-primary-500/20 px-4 py-3 rounded-lg text-center"
                    >
                        <div className="flex items-center justify-center gap-2">
                            <skill.icon
                                className="w-5 h-5"
                                style={{ color: skill.color }}
                            />
                            <span>{skill.name}</span>
                        </div>
                    </motion.div>
                ))}
            </div>
        ),
    },
    {
        title: "Competition",
        id: "competition",
        content: (
            <div className="grid grid-cols-1 gap-4">
                {competitionData.map((competition, index) => (
                    <motion.a
                        key={index}
                        href={competition.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        variants={fadeInAnimationVariants}
                        initial="initial"
                        animate="animate"
                        viewport={{ once: true }}
                        custom={index}
                        whileHover={{ scale: 1.02, x: 10 }}
                        className="bg-primary-500/20 p-4 rounded-lg group"
                    >
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <span className="text-primary-400 font-medium">
                                    {competition.year}
                                </span>
                                <span className="font-medium group-hover:text-primary-400 transition-colors">
                                    {competition.title}
                                </span>
                            </div>
                            <motion.span
                                className="text-primary-400"
                                initial={{ opacity: 0, x: -10 }}
                                whileHover={{ opacity: 1, x: 0 }}
                            >
                                →
                            </motion.span>
                        </div>
                    </motion.a>
                ))}
            </div>
        ),
    },
    {
        title: "Award",
        id: "award",
        content: (
            <div className="grid grid-cols-1 gap-4">
                {awardsData.map((award, index) => (
                    <motion.div
                        key={index}
                        variants={fadeInAnimationVariants}
                        initial="initial"
                        animate="animate"
                        viewport={{ once: true }}
                        custom={index}
                        className="bg-primary-500/20 p-4 rounded-lg"
                    >
                        <div className="flex items-center gap-3">
                            <FaTrophy className="text-yellow-500 w-5 h-5" />
                            <div>
                                <span className="text-primary-400 text-sm">
                                    {award.year}
                                </span>
                                <p className="font-medium">{award.title}</p>
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
    const [isPending, startTransition] = useTransition();

    const handleTabChange = (id) => {
        startTransition(() => {
            setTab(id);
        });
    };

    return (
        <section id="about" className="pt-24">
            <h2 className="text-4xl font-bold text-white mb-8">About</h2>
            <div className="md:grid md:grid-cols-2 items-start gap-8">
                <div className="relative w-full h-[360px] md:h-[360px]">
                    <Image
                        src="/images/hero-image.jpeg"
                        alt="Hero image"
                        fill
                        className="rounded-xl object-cover"
                        style={{ objectFit: 'cover' }}
                    />
                </div>
                <div className="mt-4 md:mt-0 text-left flex flex-col h-full">
                    <motion.div
                        initial={{opacity: 0, y: 20}}
                        animate={{opacity: 1, y: 0}}
                        transition={{duration: 0.5}}
                    >
                        <p className="text-base lg:text-lg">
                            안녕하세요👋, 저는 대한민국에서 소프트웨어를 공부하고 있는 선린인터넷고등학교 프론트엔드
                            개발자 신이현입니다. 저는 새로운 기술을 배우는 것을 좋아하며 사람들에게 실질적인 가치를 제공하는 서비스를 만들고 싶습니다.
                        </p>
                    </motion.div>
                    <div className="flex flex-row justify-start mt-8">
                        <TabButton
                            selectTab={() => handleTabChange("skills")}
                            active={tab === "skills"}
                        >
                            Skills
                        </TabButton>
                        <TabButton
                            selectTab={() => handleTabChange("competition")}
                            active={tab === "competition"}
                        >
                            Competition
                        </TabButton>
                        <TabButton
                            selectTab={() => handleTabChange("award")}
                            active={tab === "award"}
                        >
                            Award
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
                                {TAB_DATA.find((t) => t.id === tab).content}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutSection;