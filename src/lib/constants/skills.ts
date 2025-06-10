import type { Skill } from "@/types/common";

export const skillData: Record<
  "frontend" | "backend" | "infrastructure",
  Skill[]
> = {
  frontend: [
    {
      icon: "/icons/skills/react.svg",
      desc: "React를 활용한 컴포넌트 기반 아키텍처 설계 및 상태 관리에 능숙합니다.",
      descEn:
        "Skilled in architecting component-based user interfaces and managing application state using React.",
    },
    {
      icon: "/icons/skills/reactnative.svg",
      desc: "React Native를 활용한 모바일 애플리케이션 개발 경험이 있습니다.",
      descEn:
        "Experience in developing mobile applications using React Native.",
    },
    {
      icon: "/icons/skills/nextjs.svg",
      desc: "Next.js 기반의 서버 사이드 렌더링 및 정적 사이트 생성을 활용한 퍼포먼스 최적화 경험이 있습니다.",
      descEn:
        "Experienced in optimizing performance using server-side rendering (SSR) and static site generation (SSG) with Next.js.",
    },
    {
      icon: "/icons/skills/tailwindcss.svg",
      desc: "Tailwind CSS를 사용하여 유틸리티 우선 스타일링 기반의 반응형 UI를 설계하고 구현할 수 있습니다.",
      descEn:
        "Proficient in designing and developing responsive UIs using utility-first CSS with Tailwind CSS.",
    },
    {
      icon: "/icons/skills/scss.svg",
      desc: "SCSS의 중첩, 믹스인, 변수 등을 활용하여 확장성과 유지보수성이 뛰어난 스타일 구조를 구현할 수 있습니다.",
      descEn:
        "Capable of building scalable and maintainable style architectures using SCSS features such as nesting, mixins, and variables.",
    },
  ],
  backend: [
    {
      icon: "/icons/skills/nodejs.svg",
      desc: "Node.js로 서버 애플리케이션을 개발할 수 있습니다.",
      descEn: "Can develop server applications using Node.js.",
    },
    {
      icon: "/icons/skills/express.svg",
      desc: "Express.js 프레임워크를 기반으로 HTTP 요청 처리, 라우팅, 미들웨어 구성 등을 통해 효율적인 웹 서버 및 RESTful API를 설계하고 구현할 수 있습니다.",
      descEn:
        "Proficient in designing and implementing scalable RESTful APIs using Express.js, including routing, middleware integration, and request/response lifecycle management.",
    },
    {
      icon: "/icons/skills/mysql.svg",
      desc: "MySQL을 사용한 데이터베이스 설계 경험이 있습니다.",
      descEn: "Experience with database design using MySQL.",
    },
    {
      icon: "/icons/skills/springboot.svg",
      desc: "Spring Boot를 활용한 RESTful API 개발 경험이 있습니다.(공부중)",
      descEn:
        "Experience in developing RESTful APIs using Spring Boot. (Learning)",
    },
  ],
  infrastructure: [
    {
      icon: "/icons/skills/dokploy.svg",
      desc: "Dokploy를 활용한 애플리케이션 배포 및 관리 경험이 있습니다.",
      descEn:
        "Experience in application deployment and management using Dokploy.",
    },
    {
      icon: "/icons/skills/aws.svg",
      desc: "AWS EC2, S3, RDS, CloudWatch 등의 서비스를 활용한 웹 애플리케이션 인프라 구축 및 운영 경험이 있습니다.",
      descEn:
        "Experience in building and operating web application infrastructure using AWS services such as EC2, S3, RDS, and CloudWatch.",
    },
    {
      icon: "/icons/skills/vercel.svg",
      desc: "Vercel을 활용한 프론트엔드 애플리케이션의 자동 배포 및 성능 최적화 경험이 있습니다.",
      descEn:
        "Experience in automated deployment and performance optimization of frontend applications using Vercel.",
    },
  ],
};
