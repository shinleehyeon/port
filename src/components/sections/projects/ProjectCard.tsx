"use client";

import React from "react";
import { FaGithub } from "react-icons/fa";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

interface ProjectCardProps {
  imgUrl: string;
  title: string;
  description: string;
  gitUrl: string;
  techStack?: any[];
  onExpand: () => void;
  isExpanded: boolean;
  details: {
    features: string[];
  };
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  imgUrl,
  title,
  description,
  gitUrl,
  techStack = [],
  onExpand,
  isExpanded,
  details
}) => {
  return (
    <motion.div layout className="w-full">
      <div className="flex flex-col md:flex-row gap-6">
        <motion.div layout className={isExpanded ? "md:w-1/2" : "w-full"}>
          <div
            className="h-52 md:h-72 rounded-t-xl relative group"
            style={{
              background: `url(${imgUrl})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat"
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
              <h5 className="text-xl font-semibold text-black">{title}</h5>
              <div className="flex gap-2">
                {techStack.map((Icon, index) => (
                  <Icon key={index} className="w-4 h-4 text-gray-600" />
                ))}
              </div>
            </div>
            <p className="text-[#6D6D6D] mb-4">{description}</p>
            <button
              onClick={onExpand}
              className="px-6 py-2 rounded-lg bg-black text-white hover:bg-gray-800 transition-colors"
            >
              {isExpanded ? "접기" : "자세히 보기"}
            </button>
          </div>
        </motion.div>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: "auto" }}
              exit={{ opacity: 0, width: 0 }}
              className="md:w-1/2 p-6 bg-[#F5F5F5] rounded-xl"
            >
              <h2 className="text-2xl font-bold text-black mb-6">프로젝트 상세</h2>
              
              <div>
                <h3 className="text-lg font-medium text-black mb-3">주요 기능</h3>
                <ul className="list-disc list-inside text-[#6D6D6D] space-y-2">
                  {details.features.map((feature, index) => (
                    <li key={index} className="text-[#6D6D6D]">{feature}</li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default ProjectCard;