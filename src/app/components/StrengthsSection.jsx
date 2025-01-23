"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const strengthsList = [
    {
        keyword: "새로운 기술을 배우려는 열정",
        detail: "새로운 기술과 도구를 학습하는 것을 즐기며, 지속적인 자기 개발을 통해 더 나은 개발자가 되기 위해 노력합니다.",
        color: "bg-gradient-to-br from-primary-500 to-secondary-500"
    },
    {
        keyword: "헌신적으로 프로젝트에 참여",
        detail: "맡은 프로젝트에 대한 강한 책임감을 가지고 있으며, 팀원들과의 협업을 통해 최상의 결과를 도출하기 위해 노력합니다.",
        color: "bg-gradient-to-br from-primary-500 to-secondary-500"
    },
    {
        keyword: "체계적인 문제 해결 능력",
        detail: "문제를 논리적으로 분석하고 체계적인 접근 방식으로 해결책을 찾아내는 것을 즐깁니다.",
        color: "bg-gradient-to-br from-primary-500 to-secondary-500"
    },
    {
        keyword: "시작하면 끝까지 몰입하는 열정",
        detail: "한 번 시작한 일은 끝까지 해내려는 강한 의지를 가지고 있으며, 깊은 몰입을 통해 최상의 결과물을 만들어냅니다.",
        color: "bg-gradient-to-br from-primary-500 to-secondary-500"
    }
];

const StrengthCard = ({ strength, isOpen, onToggle }) => {
    return (
        <div className="w-full">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="relative bg-[#121212] rounded-2xl overflow-hidden group border border-gray-800 h-full"
            >
                <div className="p-6 cursor-pointer" onClick={onToggle}>
                    <div className="flex items-center justify-between">
                        <h3 className={`text-xl font-bold ${isOpen ? 'text-white' : 'text-[#ADB7BE]'}`}>
                            {strength.keyword}
                        </h3>
                        <motion.div
                            animate={{ rotate: isOpen ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <ChevronDown className="w-5 h-5 text-white" />
                        </motion.div>
                    </div>

                    <AnimatePresence>
                        {isOpen && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="overflow-hidden"
                            >
                                <p className="text-[#ADB7BE] text-sm mt-4 pt-4 border-t border-gray-700">
                                    {strength.detail}
                                </p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </motion.div>
        </div>
    );
};

const StrengthsSection = () => {
    const [openStates, setOpenStates] = useState(new Array(strengthsList.length).fill(false));

    const toggleCard = (index) => {
        setOpenStates((prev) => {
            const newStates = [...prev];
            newStates[index] = !newStates[index];
            return newStates;
        });
    };

    return (
        <section id="strengths" className="relative py-16 overflow-hidden mt-4">
            <div
                className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-1/2 bg-gradient-to-b from-primary-500/20 to-transparent blur-3xl -z-10"/>

            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{opacity: 0, y: 20}}
                    animate={{opacity: 1, y: 0}}
                    transition={{duration: 0.5}}
                    className="flex flex-col space-y-6"
                >
                    <h2 className="text-4xl font-bold text-white">
                        Strengths
                    </h2>

                    <div className="flex flex-col space-y-4">
                        {strengthsList.map((strength, index) => (
                            <StrengthCard
                                key={index}
                                strength={strength}
                                isOpen={openStates[index]}
                                onToggle={() => toggleCard(index)}
                            />
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default StrengthsSection;