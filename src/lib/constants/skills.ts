import type { Skill } from '@/types/common';

export const skillData: Record<'frontend' | 'backend', Skill[]> = {
  frontend: [
    {
      icon: "/icons/skills/react.svg",
      desc: "React를 활용한 컴포넌트 기반 개발과 상태관리 익숙합니다."
    },
    {
      icon: "/icons/skills/nextjs.svg",
      desc: "Next.js를 이용한 서버 사이드 렌더링 경험이 있습니다."
    },
    {
      icon: "/icons/skills/vite.svg", 
      desc: "Vite를 활용하여 빠른 개발 환경을 구축할 수 있습니다."
    },
    {
      icon: "/icons/skills/tailwindcss.svg", 
      desc: "Tailwind CSS로 반응형 디자인을 구현할 수 있습니다."
    },
    {
      icon: "/icons/skills/typescript.svg",
      desc: "TypeScript를 사용하여 타입을 안전하게 관리할 수 있습니다."
    },
  ],
  backend: [
    {
      icon: "/icons/skills/nodejs.svg",
      desc: "Node.js로 서버 애플리케이션을 개발할 수 있습니다."
    },
    {
      icon: "/icons/skills/python.svg", 
      desc: "Python으로 데이터 처리와 자동화를 구현할 수 있습니다."
    },
    {
      icon: "/icons/skills/mysql.svg", 
      desc: "MySQL을 사용한 데이터베이스 설계 경험이 있습니다."
    },
    {
      icon: "/icons/skills/firebase.svg", 
      desc: "Firebase로 실시간 데이터베이스를 구현할 수 있습니다."
    },
  ]
};