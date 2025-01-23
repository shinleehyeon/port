"use client";
import React, { useState, useRef } from "react";
import ProjectCard from "./ProjectCard";
import { motion, useInView, AnimatePresence } from "framer-motion";

const ProjectTag = ({ name, onClick, isSelected }) => {
    const buttonStyles = isSelected
        ? "text-white border-primary-500 bg-primary-700 hover:bg-primary-600"
        : "text-[#ADB7BE] border-slate-600 hover:border-white";

    return (
        <button
            className={`${buttonStyles} rounded-full px-6 py-3 text-xl cursor-pointer transition-all duration-300 hover:text-white hover:scale-105`}
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
        description: "SW동행 해커톤",
        image: "/images/projects/fresio.png",
        tag: ["All", "Mobile"],
        gitUrl: "https://github.com/shinleehyun/fresio",
    },
    {
        id: 2,
        title: "SaveQuest",
        description: "STAC 공모전 작품",
        image: "/images/projects/SaveQuest.png",
        tag: ["All", "Mobile"],
        gitUrl: "https://github.com/SaveQuest",
    },
    {
        id: 3,
        title: "Albant",
        description: "선린 방학 프로젝트",
        image: "/images/projects/Albant.png",
        tag: ["All", "Mobile"],
        gitUrl: "https://github.com/shinleehyun/albant",
    },
    {
        id: 4,
        title: "Chromate",
        description: "음성ai 어시스턴트",
        image: "/images/projects/Chromate.png",
        tag: ["All", "Web"],
        gitUrl: "https://github.com/shinleehyeon/chromate",
    },
    {
        id: 5,
        title: "Mangoland",
        description: "클릭커 게임 앱",
        image: "/images/projects/mangoland.png",
        tag: ["All", "Mobile"],
        gitUrl: "/",
    },
    {
        id: 6,
        title: "NodeChat",
        description: "실시간 채팅 사이트",
        image: "/images/projects/chat.png",
        tag: ["All", "Web"],
        gitUrl: "https://github.com/shinleehyeon/nodechatapp",
    },
    {
        id: 7,
        title: "KanBan",
        description: "드래그를 이용한 할일 리스트",
        image: "/images/projects/kanban.png",
        tag: ["All", "Web"],
        gitUrl: "https://github.com/shinleehyeon/taskproject",
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
            <h2 className="text-left text-4xl font-bold text-white mt-4 mb-8 md:mb-12">
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