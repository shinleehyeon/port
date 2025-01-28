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
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  const handleTagChange = (newTag: string): void => {
    setTag(newTag);
  };

  const filteredProjects = projectsData.filter((project: Project) =>
    project.tag.includes(tag)
  );

  return (
    <section id="portfolio">
      <h2 className="text-left text-4xl font-bold text-black mt-4 mb-8 md:mb-12">
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
            {filteredProjects.map((project: Project, index: number) => (
              <motion.li
                key={project.id}
                variants={fadeInAnimationVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                custom={index}
                layout
              >
                <ProjectCard
                  title={project.title}
                  description={project.description}
                  imgUrl={project.image}
                  gitUrl={project.gitUrl}
                  techStack={project.techStack}
                  tag={project.tag} 
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