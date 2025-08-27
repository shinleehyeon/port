"use client";
import React from "react";
import ProjectCard from "./ProjectCard";
import { projectsData } from "@/lib/constants/projects";
import { projectTranslations } from "@/lib/constants/projectTranslations";
import { useLanguage } from "@/contexts/LanguageContext";
import ScrollAnimationWrapper from "@/components/ui/ScrollAnimationWrapper";
import type { Project } from "@/types/common";

const ProjectsSection: React.FC = () => {
  const { language } = useLanguage();

  return (
    <section id="projects" className="mb-24">
      <div className="container mx-auto px-10 max-w-[1400px]">
        <ScrollAnimationWrapper direction="up" delay={0.1}>
          <h2 className="text-left text-4xl font-semibold text-black mt-4 mb-8 md:mb-12">
            {projectTranslations[language].title}
          </h2>
        </ScrollAnimationWrapper>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projectsData.map((project: Project) => (
            <ScrollAnimationWrapper 
              key={project.id} 
              direction="up" 
              delay={0.1 * project.id}
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
            </ScrollAnimationWrapper>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
