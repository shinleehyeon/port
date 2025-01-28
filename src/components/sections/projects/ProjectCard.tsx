import React from "react";
import { FaGithub } from "react-icons/fa";
import Link from "next/link";
import type { ProjectCardProps } from "@/types/common";

const ProjectCard: React.FC<ProjectCardProps> = ({
  imgUrl,
  title,
  description,
  gitUrl,
  techStack = [],
  tag
}) => {
  const getIconStyle = (iconUrl: string) => {
    if (iconUrl.includes('fastapi')) {
      return { filter: 'invert(41%) sepia(68%) saturate(434%) hue-rotate(127deg) brightness(95%) contrast(94%)' };
    }
    return {};
  };

  const getTechName = (iconUrl: string) => {
    const isMobile = tag.includes('Mobile');
    
    if (iconUrl.includes('react')) {
      return isMobile ? 'React Native' : 'React';
    }
    if (iconUrl.includes('nextjs')) return 'Next.js';
    if (iconUrl.includes('typescript')) return 'TypeScript';
    if (iconUrl.includes('tailwindcss')) return 'Tailwind CSS';
    if (iconUrl.includes('fastapi')) return 'FastAPI';
    if (iconUrl.includes('nestjs')) return 'NestJS';
    
    const namePart = iconUrl.split('/').pop()?.split('-')[0] || '';
    return namePart.charAt(0).toUpperCase() + namePart.slice(1);
  };

  return (
    <div>
      <div
        className="h-52 md:h-72 rounded-t-xl relative group"
        style={{
          background: `url(${imgUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundColor: "#181818"
        }}
      >
        <div className="overlay flex items-center justify-center absolute top-0 left-0 w-full h-full bg-[#181818] opacity-0 group-hover:opacity-80 group-hover:rounded-t-xl transition-all duration-500 ease-in-out">
          <Link
            href={gitUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="h-14 w-14 border-2 relative rounded-full border-[#ADB7BE] hover:border-white transition-all duration-300 hover:scale-110"
          >
            <FaGithub
              className="h-10 w-10 text-[#ADB7BE] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer hover:text-white transition-colors duration-300"
            />
          </Link>
        </div>
      </div>
      <div className="text-[#6D6D6D] rounded-b-xl bg-[#EBEBEB] py-6 px-4">
        <div className="flex items-center justify-between mb-2">
          <h5 className="text-xl font-semibold">{title}</h5>
          <div className="flex gap-2">
            {techStack.map((iconUrl, index) => (
              <div
                key={index}
                className="group relative flex items-center justify-center"
              >
                <img
                  src={iconUrl}
                  alt={getTechName(iconUrl)}
                  className="w-4 h-4 transition-transform duration-300 group-hover:scale-110 user-select-none"
                  draggable="false"
                  onMouseDown={(e) => e.preventDefault()}
                  style={getIconStyle(iconUrl)}
                />
                <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 hidden group-hover:block z-10">
                  <div className="bg-black text-white text-xs py-1 px-2 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {getTechName(iconUrl)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <p className="text-[#6D6D6D]">{description}</p>
      </div>
    </div>
  );
};

export default ProjectCard;