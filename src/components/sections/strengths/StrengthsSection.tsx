"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const strengthsList = [
    {
        id: 1,
        color: "bg-gradient-to-br from-primary-500 to-secondary-500",
    },
    {
        id: 2,
        color: "bg-gradient-to-br from-primary-500 to-secondary-500",
    },
    {
        id: 3,
        color: "bg-gradient-to-br from-primary-500 to-secondary-500",
    },
    {
        id: 4,
        color: "bg-gradient-to-br from-primary-500 to-secondary-500",
    },
];

interface StrengthCardProps {
    id: number;
    color: string;
    isOpen: boolean;
    onToggle: () => void;
}

const StrengthCard: React.FC<StrengthCardProps> = ({ id, color, isOpen, onToggle }) => {
    const { t } = useLanguage();
    
    const createTranslationKey = (section: string) => `strengths.${id}.${section}` as const;
    
    return (
        <div className="w-full">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="relative bg-[#EBEBEB] rounded-2xl overflow-hidden group border border-[#DADADA] h-full"
            >
                <div className="p-6 cursor-pointer" onClick={onToggle}>
                    <div className="flex items-center justify-between">
                        <h3 className={`text-xl font-medium ${isOpen ? "text-black" : "text-[#6D6D6D]"} select-none`}>
                            {t(createTranslationKey('keyword'))}
                        </h3>
                        <motion.div
                            animate={{ rotate: isOpen ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <ChevronDown className="w-5 h-5 text-black" />
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
                                <p className="text-[#1E1E1E] text-sm mt-4 pt-4 border-t border-gray-700 select-none">
                                    {t(createTranslationKey('detail'))}
                                </p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </motion.div>
        </div>
    );
};

const StrengthsSection: React.FC = () => {
    const { t } = useLanguage();
    const [openStates, setOpenStates] = useState<boolean[]>(new Array(strengthsList.length).fill(false));

    const toggleCard = (index: number) => {
        setOpenStates((prev) => {
            const newStates = [...prev];
            newStates[index] = !newStates[index];
            return newStates;
        });
    };

    return (
        <section id="strengths" className="relative py-16 overflow-hidden mt-4">
            <div
                className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-1/2 bg-gradient-to-b from-primary-500/20 to-transparent blur-3xl -z-10"
            />

            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col space-y-6"
                >
                    <h2 className="text-4xl font-semibold text-black">{t("strengths.title")}</h2>

                    <div className="flex flex-col space-y-4">
                        {strengthsList.map((strength, index) => (
                            <StrengthCard
                                key={index}
                                id={strength.id}
                                color={strength.color}
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