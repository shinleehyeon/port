import { FaReact } from "react-icons/fa";
import {
  SiNextdotjs,
  SiTailwindcss,
  SiFastapi,
  SiTypescript,
  SiNestjs
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
    techStack: [FaReact, SiFastapi, SiTypescript],
    details: {
      features: [
        "AI를 활용한 식재료 인식 기능",
        "유통기한 관리 및 알림 시스템",
        "레시피 추천 서비스",
        "식재료 재고 관리"
      ],
      techDescriptions: [
        { tech: "React", icon: FaReact },
        { tech: "FastAPI", icon: SiFastapi },
        { tech: "TypeScript", icon: SiTypescript }
      ],
      developmentPeriod: "2023.10 - 2024.01"
    }
  },
  {
    id: 2,
    title: "SaveQuest",
    description: "절약을 쉽고 재미있게 하도록 도와주는 서비스",
    image: "/images/projects/SaveQuest.png",
    tag: ["All", "Mobile"],
    gitUrl: "https://github.com/SaveQuest",
    techStack: [FaReact, SiNestjs, SiTypescript],
    details: {
      features: [
        "게이미피케이션을 활용한 절약 미션",
        "실시간 지출 추적 시스템",
        "커뮤니티 기반 절약 팁 공유",
        "개인화된 절약 목표 설정"
      ],
      techDescriptions: [
        { tech: "React", icon: FaReact },
        { tech: "NestJS", icon: SiNestjs },
        { tech: "TypeScript", icon: SiTypescript }
      ],
      developmentPeriod: "2023.12 - 2024.02"
    }
  },
  {
    id: 3,
    title: "Chromate",
    description: "지체 장애인을 위한 AI 음성 확장 프로그램",
    image: "/images/projects/Chromate.png",
    tag: ["All", "Web"],
    gitUrl: "https://github.com/shinleehyeon/chromate",
    techStack: [FaReact, SiTailwindcss, SiFastapi],
    details: {
      features: [
        "음성 인식 및 변환 기능",
        "크롬 확장 프로그램 통합",
        "맞춤형 음성 설정",
        "실시간 자막 생성"
      ],
      techDescriptions: [
        { tech: "React", icon: FaReact },
        { tech: "TailwindCSS", icon: SiTailwindcss },
        { tech: "FastAPI", icon: SiFastapi }
      ],
      developmentPeriod: "2024.01 - 2024.02"
    }
  },
  {
    id: 4,
    title: "Albant",
    description: "선린 내에서 이룰 수 있는 심부름 서비스",
    image: "/images/projects/Albant.png",
    tag: ["All", "Mobile"],
    gitUrl: "https://github.com/shinleehyun/albant",
    techStack: [FaReact, SiFastapi],
    details: {
      features: [
        "실시간 심부름 요청/수락 시스템",
        "위치 기반 서비스 매칭",
        "안전한 결제 시스템",
        "사용자 평가 기능"
      ],
      techDescriptions: [
        { tech: "React Native", icon: FaReact },
        { tech: "FastAPI", icon: SiFastapi }
      ],
      developmentPeriod: "2023.09 - 2023.12"
    }
  },
  {
    id: 7,
    title: "PortFolio",
    description: "포트폴리오 사이트",
    image: "/images/projects/port.png",
    tag: ["All", "Web"],
    gitUrl: "https://github.com/shinleehyeon/port",
    techStack: [SiNextdotjs, SiTailwindcss, SiTypescript],
    details: {
      features: [
        "반응형 디자인",
        "모던한 UI/UX",
        "프로젝트 쇼케이스",
        "연락처 폼"
      ],
      techDescriptions: [
        { tech: "Next.js", icon: SiNextdotjs },
        { tech: "TailwindCSS", icon: SiTailwindcss },
        { tech: "TypeScript", icon: SiTypescript }
      ],
      developmentPeriod: "2024.02 - 2024.03"
    }
  }
];