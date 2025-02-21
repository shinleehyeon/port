'use client';
import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { skillData } from "@/lib/constants/skills";
import type { Skill } from "@/types/common";
import { useLanguage } from '@/contexts/LanguageContext';
import AwardSection from './AwardSection';
import SkillSection from './SkillSection';

const AboutSection: React.FC = () => {
    const [selectedFrontend, setSelectedFrontend] = useState<Skill | null>(null);
    const [selectedBackend, setSelectedBackend] = useState<Skill | null>(null);
    const { t } = useLanguage();

    return (
        <section id="about" className="pt-24 mb-24">
            <h2 className="text-4xl font-semibold text-black mb-8">{t("about.title")}</h2>
            <div className="md:grid md:grid-cols-2 items-start gap-10 relative">
                <motion.div
                    className="relative w-[300px] h-[400px]"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <Image
                        src="/images/about.png"
                        alt="Hero image"
                        fill
                        priority
                        className="rounded-xl object-cover user-select-none"
                        draggable="false"
                        onMouseDown={(e) => e.preventDefault()}
                    />
                </motion.div>
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
            </div>
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-10">
                <div>
                    <h3 className="text-2xl font-semibold text-black mb-4">{t("about.tabs.awards")}</h3>
                    <AwardSection />
                </div>
                <div>
                    <h3 className="text-2xl font-semibold text-black mb-4">{t("about.tabs.skills")}</h3>
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
                </div>
            </div>
        </section>
    );
};

export default AboutSection;