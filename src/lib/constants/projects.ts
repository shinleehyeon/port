import { FaReact, FaNodeJs, FaAndroid } from "react-icons/fa";
import {
  SiNextdotjs,
  SiTailwindcss,
  SiFirebase,
  SiKotlin,
  SiSpring,
  SiNestjs,
  SiPython,
  SiNodemon,
  SiExpress,
  SiPwa,
  SiWebpack,
  SiFastapi,
  SiTypescript
} from "react-icons/si";
import type { Project } from '@/types/common';

export const projectsData: Project[] = [
  {
    id: 1,
    title: "fresio",
    description: "AI 냉장고 어시스턴트 서비스",
    image: "/images/projects/fresio.png",
    tag: ["All", "Mobile"],
    gitUrl: "https://github.com/shinleehyun/fresio",
    techStack: [FaReact, SiFastapi, SiTypescript]
  },
  {
    id: 2,
    title: "SaveQuest",
    description: "절약을 쉽고 재미있게 하도록 도와주는 서비스",
    image: "/images/projects/SaveQuest.png",
    tag: ["All", "Mobile"],
    gitUrl: "https://github.com/SaveQuest",
    techStack: [FaReact, SiNestjs, SiTypescript]
  },
  {
    id: 3,
    title: "Chromate",
    description: "지체 장애인을 위한 AI 음성 확장 프로그램",
    image: "/images/projects/Chromate.png",
    tag: ["All", "Web"],
    gitUrl: "https://github.com/shinleehyeon/chromate",
    techStack: [FaReact, SiTailwindcss, SiFastapi]
  },
  {
    id: 4,
    title: "Albant",
    description: "선린 내에서 이룰 수 있는 심부름 서비스",
    image: "/images/projects/Albant.png",
    tag: ["All", "Mobile"],
    gitUrl: "https://github.com/shinleehyun/albant",
    techStack: [FaReact, SiFastapi]
  },
  {
    id: 7,
    title: "PortFolio",
    description: "포트폴리오 사이트",
    image: "/images/projects/port.png",
    tag: ["All", "Web"],
    gitUrl: "hhttps://github.com/shinleehyeon/port",
    techStack: [SiNextdotjs, SiTailwindcss, SiTypescript]
  }
]