"use client";
import React, { useState, useRef } from "react";
import ProjectCard from "./ProjectCard";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { FaReact, FaNodeJs, FaAndroid } from "react-icons/fa";
import {
    SiNextdotjs,
    SiTailwindcss,
    SiFirebase,
    SiKotlin,
    SiSpring,
    SiNestjs,
    SiPython,
    SiNodemon, SiExpress
} from "react-icons/si";

const ProjectTag = ({ name, onClick, isSelected }) => {
    const buttonStyles = isSelected
        ? "text-white border-primary-500 bg-black"
        : "text-[#6D6D6D] border-slate-600 hover:border-white";

    return (
        <button
            className={`${buttonStyles} rounded-xl px-6 py-3 text-xl cursor-pointer transition-all duration-300 hover:scale-105`}
            onClick={() => onClick(name)}
        >
            {name}
        </button>
    );
};

const projectsData = [
    {
        id: 1,
        title: "fresio",
        description: "AI 냉장고 어시스턴트 서비스",
        image: "/images/projects/fresio.png",
        tag: ["All", "Mobile"],
        gitUrl: "https://github.com/shinleehyun/fresio",
        techStack: [FaReact, SiPython]
    },
    {
        id: 2,
        title: "SaveQuest",
        description: "절약을 쉽고 재미있게 하도록 도와주는 서비스",
        image: "/images/projects/SaveQuest.png",
        tag: ["All", "Mobile"],
        gitUrl: "https://github.com/SaveQuest",
        techStack: [FaReact, SiNestjs]
    },
    {
        id: 3,
        title: "Chromate",
        description: "지체 장애인을 위한 AI 음성 확장 프로그램",
        image: "/images/projects/Chromate.png",
        tag: ["All", "Web"],
        gitUrl: "https://github.com/shinleehyeon/chromate",
        techStack: [FaReact, SiTailwindcss]
    },
    {
        id: 4,
        title: "Albant",
        description: "선린 내에서 이룰 수 있는 심부름 서비스",
        image: "/images/projects/Albant.png",
        tag: ["All", "Mobile"],
        gitUrl: "https://github.com/shinleehyun/albant",
        techStack: [FaReact, SiPython]
    },
    {
        id: 5,
        title: "Mangoland",
        description: "클릭커 게임 앱",
        image: "/images/projects/mangoland.png",
        tag: ["All", "Mobile"],
        gitUrl: "/",
        techStack: [FaReact, SiPython]
    },
    {
        id: 6,
        title: "NodeChat",
        description: "실시간 채팅 사이트",
        image: "/images/projects/chat.png",
        tag: ["All", "Web"],
        gitUrl: "https://github.com/shinleehyeon/nodechatapp",
        techStack: [FaReact, SiExpress]
    },
];

const ProjectsSection = () => {
    const [tag, setTag] = useState("All");
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    const handleTagChange = (newTag) => {
        setTag(newTag);
    };

    const filteredProjects = projectsData.filter((project) =>
        project.tag.includes(tag)
    );

    const cardVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: (index) => ({
            y: 0,
            opacity: 1,
            transition: {
                delay: index * 0.1,
                duration: 0.5,
                ease: "easeOut",
            },
        }),
        exit: {
            y: 20,
            opacity: 0,
            transition: {
                duration: 0.3,
                ease: "easeIn",
            },
        },
    };

    return (
        <section id="portfolio">
            <h2 className="text-left text-4xl font-bold text-black mt-4 mb-8 md:mb-12">
                Portfolio
            </h2>
            <div className="text-white flex flex-row justify-center items-center gap-4 py-8">
                <ProjectTag
                    onClick={handleTagChange}
                    name="All"
                    isSelected={tag === "All"}
                />
                <ProjectTag
                    onClick={handleTagChange}
                    name="Web"
                    isSelected={tag === "Web"}
                />
                <ProjectTag
                    onClick={handleTagChange}
                    name="Mobile"
                    isSelected={tag === "Mobile"}
                />
            </div>
            <div ref={ref} className="relative">
                <AnimatePresence mode="wait">
                    <motion.ul
                        key={tag}
                        className="grid md:grid-cols-3 gap-8 md:gap-12"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                    >
                        {filteredProjects.map((project, index) => (
                            <motion.li
                                key={project.id}
                                variants={cardVariants}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                custom={index}
                                layout
                            >
                                <ProjectCard
                                    title={project.title}
                                    description={project.description}
                                    imgUrl={project.image}
                                    gitUrl={project.gitUrl}
                                    previewUrl={project.previewUrl}
                                    techStack={project.techStack}
                                />
                            </motion.li>
                        ))}
                    </motion.ul>
                </AnimatePresence>
            </div>
        </section>
    );
};

export default ProjectsSection;