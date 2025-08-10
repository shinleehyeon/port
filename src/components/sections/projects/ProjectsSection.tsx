"use client";
import React, { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import ProjectCard from "./ProjectCard";
import ProjectTag from "./ProjectTag";
import { projectsData } from "@/lib/constants/projects";
import { projectTranslations } from "@/lib/constants/projectTranslations";
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
    <section id="portfolio" className="mb-24 overflow-hidden">
      <div className="container mx-auto px-10 max-w-[1400px]">
        <ScrollAnimationWrapper direction="up" delay={0.1}>
          <h2 className="text-left text-4xl font-semibold text-black mt-4 mb-8 md:mb-12">
            {projectTranslations[language].title}
          </h2>
        </ScrollAnimationWrapper>

        <ScrollAnimationWrapper direction="down" delay={0.2}>
          <div className="text-white flex flex-row justify-center items-center gap-4 py-8">
            {["All", "Web", "App"].map((tagName) => (
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
      </div>

      <div ref={ref} className="relative w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={tag}
            className="relative overflow-hidden space-y-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="flex gap-8"
              animate={{
                x: ["0%", "-100%"],
              }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 40,
                  ease: "linear",
                },
              }}
            >
              {[...filteredProjects, ...filteredProjects].map(
                (project: Project, index: number) => (
                  <div
                    key={`row1-${project.id}-${index}`}
                    className="flex-shrink-0 w-[350px] md:w-[400px]"
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
                  </div>
                ),
              )}
            </motion.div>

            <motion.div
              className="flex gap-8"
              animate={{
                x: ["-100%", "0%"],
              }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 40,
                  ease: "linear",
                },
              }}
            >
              {[...filteredProjects, ...filteredProjects].map(
                (project: Project, index: number) => (
                  <div
                    key={`row2-${project.id}-${index}`}
                    className="flex-shrink-0 w-[350px] md:w-[400px]"
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
                  </div>
                ),
              )}
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default ProjectsSection;
