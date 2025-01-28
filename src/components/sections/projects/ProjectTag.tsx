import React from "react";
import { ProjectTagProps } from "@/types/components";

const ProjectTag: React.FC<ProjectTagProps> = ({ name, onClick, isSelected }) => {
  const buttonStyles = isSelected
    ? "text-white border-primary-500 bg-black"
    : "text-[#6D6D6D] border-slate-600 hover:border-white";

  return (
    <button
      className={`${buttonStyles} rounded-xl px-6 py-3 text-xl cursor-pointer transition-all duration-300 hover:scale-105`}
      onClick={() => onClick(name)}
    >
      {name}
    </button>
  );
};

export default ProjectTag;