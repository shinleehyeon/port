import type { Skill } from '@/types/common';

export const skillData: Record<'frontend' | 'backend', Skill[]> = {
  frontend: [
    {
      icon: "/icons/skills/react.svg",
      desc: "React를 활용한 컴포넌트 기반 개발과 상태관리에 익숙합니다.",
      descEn: "Familiar with component-based development and state management using React."
    },
    {
      icon: "/icons/skills/nextjs.svg",
      desc: "Next.js를 이용한 서버 사이드 렌더링 경험이 있습니다.",
      descEn: "Experience with server-side rendering using Next.js."
    },
    {
      icon: "/icons/skills/vite.svg",
      desc: "Vite를 활용하여 빠른 개발 환경을 구축할 수 있습니다.",
      descEn: "Can set up fast development environments using Vite."
    },
    {
      icon: "/icons/skills/tailwindcss.svg",
      desc: "Tailwind CSS로 반응형 디자인을 구현할 수 있습니다.",
      descEn: "Can implement responsive designs using Tailwind CSS."
    },
    {
      icon: "/icons/skills/scss.svg",
      desc: "SCSS를 사용하여 효율적이고 유지보수가 쉬운 스타일링을 구현할 수 있습니다.",
      descEn: "Can implement efficient and maintainable styling using SCSS."
    },
  ],
  backend: [
    {
      icon: "/icons/skills/nodejs.svg",
      desc: "Node.js로 서버 애플리케이션을 개발할 수 있습니다.",
      descEn: "Can develop server applications using Node.js."
    },
    {
      icon: "/icons/skills/express.svg",
      desc: "Express.js를 활용하여 간단한 웹 서버와 API를 만들 수 있습니다.",
      descEn: "Can design and implement RESTful APIs using Express.js."
    },
    {
      icon: "/icons/skills/python.svg",
      desc: "Python으로 데이터 처리와 자동화를 구현할 수 있습니다.",
      descEn: "Can implement data processing and automation using Python."
    },
    {
      icon: "/icons/skills/mysql.svg",
      desc: "MySQL을 사용한 데이터베이스 설계 경험이 있습니다.",
      descEn: "Experience with database design using MySQL."
    },
    {
      icon: "/icons/skills/firebase.svg",
      desc: "Firebase로 실시간 데이터베이스를 구현할 수 있습니다.",
      descEn: "Can implement real-time databases using Firebase."
    },
  ]
};