interface TranslationData {
  tags: {
    [key: string]: string;
  };
  title: string;
  projects: {
    [key: string]: {
      title: string;
      description: string;
    };
  };
}

interface ProjectTranslations {
  [key: string]: TranslationData;
}

export const projectTranslations: ProjectTranslations = {
  ko: {
    title: "프로젝트",
    tags: {
      All: "All",
      Web: "Web",
      App: "App",
    },
    projects: {
      fresio: {
        title: "fresio",
        description: "AI 냉장고 어시스턴트 서비스",
      },
      Speakit: {
        title: "Speakit",
        description: "발표를 압도적으로 편안하게 도와주는 서비스",
      },
      "Fusion M": {
        title: "Fusion M",
        description: "자연어를 통해 자동으로 MCP 생성, 배포를 해주는 서비스",
      },
      십시일반: {
        title: "십시일반",
        description: "한끼 기부 서비스",
      },
      EcoQuest: {
        title: "EcoQuest",
        description: "환경 보호를 게임처럼 재미있게 실천할 수 있는 서비스",
      },
      SaveQuest: {
        title: "SaveQuest",
        description: "절약을 쉽고 재미있게 하도록 도와주는 서비스",
      },
      Chromate: {
        title: "Chromate",
        description: "지체 장애인을 위한 AI 음성 확장 프로그램",
      },
      마음이랑: {
        title: "마음이랑",
        description: "ASD 아동 표정인식 치료 서비스",
      },
      Albant: {
        title: "Albant",
        description: "선린 내에서 이룰 수 있는 심부름 서비스",
      },
      Portfolio: {
        title: "포트폴리오",
        description: "개인 프로젝트 사이트",
      },
    },
  },
  en: {
    title: "Portfolio",
    tags: {
      All: "All",
      Web: "Web",
      App: "App",
    },
    projects: {
      fresio: {
        title: "fresio",
        description: "AI Refrigerator Assistant Service",
      },
      Speakit: {
        title: "Speakit",
        description:
          "A Service that Makes Presentations Overwhelmingly Comfortable",
      },
      "Fusion M": {
        title: "Fusion M",
        description:
          "Service that automatically creates and deploys MCP through natural language",
      },
      십시일반: {
        title: "Meal Donation",
        description: "One Meal Donation Service",
      },
      EcoQuest: {
        title: "EcoQuest",
        description: "SDG 13 Climate Action Practice Service",
      },
      마음이랑: {
        title: "Maumi-rang",
        description: "ASD Children Facial Recognition Therapy Service",
      },
      SaveQuest: {
        title: "SaveQuest",
        description: "Service to Make Saving Money Easy and Fun",
      },
      Chromate: {
        title: "Chromate",
        description: "AI Voice Extension for People with Physical Disabilities",
      },
      Albant: {
        title: "Albant",
        description: "Errand Service within Sunrin High School",
      },
      Portfolio: {
        title: "Portfolio",
        description: "Personal Project Website",
      },
    },
  },
};
