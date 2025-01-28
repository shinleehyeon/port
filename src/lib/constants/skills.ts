import type { Skill } from '@/types/common';

export const skillData: Record<'frontend' | 'backend', Skill[]> = {
  frontend: [
    {
      icon: "https://skillicons.dev/icons?i=react",
      desc: "React를 활용한 컴포넌트 기반 개발과 상태관리 익숙합니다."
    },
    {
      icon: "https://skillicons.dev/icons?i=nextjs",
      desc: "Next.js를 이용한 서버 사이드 렌더링 경험이 있습니다."
    }
  ],
  backend: [
    {
      icon: "https://skillicons.dev/icons?i=nodejs",
      desc: "Node.js로 서버 애플리케이션을 개발할 수 있습니다."
    }
  ]
};