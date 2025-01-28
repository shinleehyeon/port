"use client";

import React, { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import ProjectCard from "./ProjectCard";
import ProjectTag from "./ProjectTag";
import { projectsData } from "@/lib/constants/projects";
import { fadeInAnimationVariants } from "@/lib/utils/animations";
import type { Project } from "@/types/common";

const ProjectsSection: React.FC = () => {
  const [tag, setTag] = useState<string>("All");
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  const handleTagChange = (newTag: string): void => {
    setTag(newTag);
    setSelectedProject(null);
  };

  const handleProjectSelect = (projectId: number) => {
    setSelectedProject(selectedProject === projectId ? null : projectId);
  };

  const filteredProjects = projectsData.filter((project: Project) =>
    project.tag.includes(tag)
  );

  const displayedProjects = selectedProject 
    ? filteredProjects.filter(project => project.id === selectedProject)
    : filteredProjects;

  return (
    <section id="portfolio">
      <h2 className="text-left text-4xl font-bold text-black mt-4 mb-8 md:mb-12">
        Portfolio
      </h2>
      
      <AnimatePresence mode="wait">
        {!selectedProject && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-white flex flex-row justify-center items-center gap-4 py-8"
          >
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
          </motion.div>
        )}
      </AnimatePresence>

      <div ref={ref} className="relative">
        <AnimatePresence mode="wait">
          <motion.ul
            key={tag + (selectedProject || '')}
            className="grid md:grid-cols-3 gap-8 md:gap-12"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {displayedProjects.map((project: Project, index: number) => {
              const defaultDetails = {
                features: ["기능 1", "기능 2", "기능 3"],
                developmentPeriod: "2024.01 - 2024.02",
                techDescription: project.techStack.map((Icon, i) => ({
                  icon: Icon,
                  name: `Tech ${i + 1}`,
                  description: "기술 설명"
                }))
              };
              
              return (
                <motion.li
                  key={project.id}
                  variants={fadeInAnimationVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  custom={index}
                  layout
                  className={selectedProject ? "md:col-span-3" : ""}
                >
                  <ProjectCard
                    title={project.title}
                    description={project.description}
                    imgUrl={project.image}
                    gitUrl={project.gitUrl}
                    techStack={project.techStack}
                    details={project.details || defaultDetails}
                    onExpand={() => handleProjectSelect(project.id)}
                    isExpanded={selectedProject === project.id}
                  />
                </motion.li>
              );
            })}
          </motion.ul>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default ProjectsSection;