"use client";
import React, { useRef } from "react";
import { motion } from "framer-motion";
import ProjectCard from "./ProjectCard";
import { projectsData } from "@/lib/constants/projects";
import { projectTranslations } from "@/lib/constants/projectTranslations";
import { useLanguage } from "@/contexts/LanguageContext";
import ScrollAnimationWrapper from "@/components/ui/ScrollAnimationWrapper";
import type { Project } from "@/types/common";

const ProjectsSection: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { language } = useLanguage();

  return (
    <section id="projects" className="mb-24 overflow-hidden">
      <div className="container mx-auto px-10 max-w-[1400px]">
        <ScrollAnimationWrapper direction="up" delay={0.1}>
          <h2 className="text-left text-4xl font-semibold text-black mt-4 mb-8 md:mb-12">
            {projectTranslations[language].title}
          </h2>
        </ScrollAnimationWrapper>
      </div>

      <div ref={ref} className="relative w-full">
        <div className="relative overflow-hidden space-y-8">
          <motion.div
            className="flex gap-8"
            animate={{
              x: [0, -((500 + 32) * projectsData.length)],
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 80,
                ease: "linear",
              },
            }}
          >
            {[...projectsData, ...projectsData].map(
              (project: Project, index: number) => (
                <div
                  key={`row1-${project.id}-${index}`}
                  className="flex-shrink-0 w-[450px] md:w-[500px]"
                >
                  <ProjectCard
                    title={
                      projectTranslations[language].projects[project.title]
                        ?.title || project.title
                    }
                    description={
                      projectTranslations[language].projects[project.title]
                        ?.description || project.description
                    }
                    imgUrl={project.image}
                    gitUrl={project.gitUrl}
                    techStack={project.techStack}
                    tag={project.tag}
                  />
                </div>
              ),
            )}
          </motion.div>

          <motion.div
            className="flex gap-8"
            animate={{
              x: [-((500 + 32) * projectsData.length), 0],
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 80,
                ease: "linear",
              },
            }}
          >
            {[...projectsData, ...projectsData].map(
              (project: Project, index: number) => (
                <div
                  key={`row2-${project.id}-${index}`}
                  className="flex-shrink-0 w-[450px] md:w-[500px]"
                >
                  <ProjectCard
                    title={
                      projectTranslations[language].projects[project.title]
                        ?.title || project.title
                    }
                    description={
                      projectTranslations[language].projects[project.title]
                        ?.description || project.description
                    }
                    imgUrl={project.image}
                    gitUrl={project.gitUrl}
                    techStack={project.techStack}
                    tag={project.tag}
                  />
                </div>
              ),
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
