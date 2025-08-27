"use client";
import React, { useState } from "react";
import ProjectCard from "./ProjectCard";
import { projectsData } from "@/lib/constants/projects";
import { projectTranslations } from "@/lib/constants/projectTranslations";
import { useLanguage } from "@/contexts/LanguageContext";
import ScrollAnimationWrapper from "@/components/ui/ScrollAnimationWrapper";
import type { Project } from "@/types/common";

const ProjectsSection: React.FC = () => {
  const { language } = useLanguage();
  const [selectedTag, setSelectedTag] = useState<string>("All");

  const filteredProjects = projectsData.filter((project) =>
    selectedTag === "All" ? true : project.tag.includes(selectedTag)
  );

  const tags = ["All", "App", "Web"];

  return (
    <section id="projects" className="mb-24">
      <div className="container mx-auto px-10 max-w-[1400px]">
        <ScrollAnimationWrapper direction="up" delay={0.1}>
          <h2 className="text-left text-4xl font-semibold text-black mt-4 mb-8 md:mb-12">
            {projectTranslations[language].title}
          </h2>
        </ScrollAnimationWrapper>

        <ScrollAnimationWrapper direction="up" delay={0.2}>
          <div className="flex gap-4 mb-8">
            {tags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-6 py-2 rounded-full font-medium transition-all duration-200 ${
                  selectedTag === tag
                    ? "bg-black text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </ScrollAnimationWrapper>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project: Project, index: number) => (
            <ScrollAnimationWrapper
              key={project.id}
              direction="up"
              delay={0.1 * (index + 1)}
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
