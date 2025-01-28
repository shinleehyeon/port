import React from "react";
import { FaGithub } from "react-icons/fa";
import Link from "next/link";
import { ProjectCardProps } from "@/types/components";

const ProjectCard: React.FC<ProjectCardProps> = ({ 
  imgUrl, 
  title, 
  description, 
  gitUrl, 
  techStack = [] 
}) => {
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
            {techStack.map((Icon, index) => (
              <Icon key={index} className="w-4 h-4 text-gray-600" />
            ))}
          </div>
        </div>
        <p className="text-[#6D6D6D]">{description}</p>
      </div>
    </div>
  );
};

export default ProjectCard;