"use client";
import React, { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import ProjectCard from "./ProjectCard";
import ProjectTag from "./ProjectTag";
import { projectsData } from "@/lib/constants/projects";
import { projectTranslations } from "@/lib/constants/projectTranslations";
import { fadeInAnimationVariants } from "@/lib/utils/animations";
import { useLanguage } from "@/contexts/LanguageContext";
import ScrollAnimationWrapper from "@/components/ui/ScrollAnimationWrapper";
import type { Project } from "@/types/common";

const ProjectsSection: React.FC = () => {
  const [tag, setTag] = useState<string>("All");
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const { language } = useLanguage();

  const handleTagChange = (newTag: string): void => {
    setTag(newTag);
  };

  const filteredProjects = projectsData.filter((project: Project) =>
    project.tag.includes(tag),
  );

  return (
    <section id="portfolio" className="mb-24">
      <ScrollAnimationWrapper direction="up" delay={0.1}>
        <h2 className="text-left text-4xl font-semibold text-black mt-4 mb-8 md:mb-12">
          {projectTranslations[language].title}
        </h2>
      </ScrollAnimationWrapper>

      <ScrollAnimationWrapper direction="down" delay={0.2}>
        <div className="text-white flex flex-row justify-center items-center gap-4 py-8">
          {["All", "Web", "App"].map((tagName, index) => (
            <ProjectTag
              key={tagName}
              name={tagName}
              displayName={projectTranslations[language].tags[tagName]}
              isSelected={tag === tagName}
              onClick={handleTagChange}
            />
          ))}
        </div>
      </ScrollAnimationWrapper>

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
            {filteredProjects.map((project: Project, index: number) => (
              <ScrollAnimationWrapper
                key={project.id}
                direction="up"
                delay={0.1 + index * 0.1}
                className="h-full"
              >
                <motion.li
                  variants={fadeInAnimationVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  custom={index}
                  layout
                  className="h-full"
                >
                  <ProjectCard
                    title={
                      projectTranslations[language].projects[project.title]
                        .title
                    }
                    description={
                      projectTranslations[language].projects[project.title]
                        .description
                    }
                    imgUrl={project.image}
                    gitUrl={project.gitUrl}
                    techStack={project.techStack}
                    tag={project.tag}
                  />
                </motion.li>
              </ScrollAnimationWrapper>
            ))}
          </motion.ul>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default ProjectsSection;
