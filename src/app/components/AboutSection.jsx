"use client";
import React, { useTransition, useState } from "react";
import Image from "next/image";
import TabButton from "./TabButton";
import { motion, AnimatePresence } from "framer-motion";
import { FaTrophy } from "react-icons/fa";

const skillData = {
    row1: "https://skillicons.dev/icons?i=react,nextjs,vite,tailwind",
    row2: "https://skillicons.dev/icons?i=nodejs,python,mysql,firebase",
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
            <div className="flex flex-col gap-4">
                <motion.img
                    src={skillData.row1}
                    alt="Skills row 1"
                    className="w-full max-w-[300px] h-auto "
                    variants={fadeInAnimationVariants}
                    initial="initial"
                    animate="animate"
                    custom={0}
                />
                <motion.img
                    src={skillData.row2}
                    alt="Skills row 2"
                    className="w-full max-w-[300px] h-auto"
                    variants={fadeInAnimationVariants}
                    initial="initial"
                    animate="animate"
                    custom={0}
                />
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
                        className="border-[#DADADA] rounded-xl overflow-hidden group border p-3" style={{ backgroundColor: "#EBEBEB"}}
                    >
                        <div className="flex items-center gap-3">
                            <FaTrophy className="text-yellow-500 w-5 h-5" />
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
    const [isPending, startTransition] = useTransition();

    const handleTabChange = (id) => {
        startTransition(() => {
            setTab(id);
        });
    };

    return (
        <section id="about" className="pt-24">
            <h2 className="text-4xl font-bold text-black mb-8">About</h2>
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
                        <p className="text-black text-base lg:text-lg">
                            안녕하세요👋, 저는 대한민국에서 소프트웨어를 공부하고 있는 선린인터넷고등학교 프론트엔드
                            개발자 신이현입니다. 저는 새로운 기술을 배우는 것을 좋아하며 사람들에게 실질적인 가치를 제공하는 서비스를 만들고 싶습니다.
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