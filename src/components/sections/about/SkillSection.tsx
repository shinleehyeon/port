import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import type { Skill } from "@/types/common";

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
}) => {
  const { language } = useLanguage();

  return (
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
              <p className="text-gray-700">
                {language === "en" ? selectedSkill.descEn : selectedSkill.desc}
              </p>
              <ChevronDown className="w-5 h-5 ml-auto text-gray-500 rotate-180" />
            </div>
          </motion.div>
        ) : (
          <motion.div key="icons" className="flex flex-wrap gap-4">
            {skills.map((skill, index) => (
              <motion.div
                key={index}
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
};

export default SkillSection;
