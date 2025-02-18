type Language = 'ko' | 'en';

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
    title: "포트폴리오",
    tags: {
      "All": "All",
      "Web": "Web",
      "App": "App"
    },
    projects: {
      "fresio": {
        title: "fresio",
        description: "AI 냉장고 어시스턴트 서비스"
      },
      "Speakit": {
        title: "Speakit",
        description: "발표를 압도적으로 편안하게"
      },
      "SaveQuest": {
        title: "SaveQuest",
        description: "절약을 쉽고 재미있게 하도록 도와주는 서비스"
      },
      "Chromate": {
        title: "Chromate",
        description: "지체 장애인을 위한 AI 음성 확장 프로그램"
      },
      "Albant": {
        title: "Albant",
        description: "선린 내에서 이룰 수 있는 심부름 서비스"
      },
      "PortFolio": {
        title: "포트폴리오",
        description: "포트폴리오 사이트"
      }
    }
  },
  en: {
    title: "Portfolio",
    tags: {
      "All": "All",
      "Web": "Web",
      "App": "App"
    },
    projects: {
      "fresio": {
        title: "fresio",
        description: "AI Refrigerator Assistant Service"
      },
      "Speakit": {
        title: "Speakit",
        description: "Making Presentations Comfortable"
      },
      "SaveQuest": {
        title: "SaveQuest",
        description: "Service to Make Saving Money Easy and Fun"
      },
      "Chromate": {
        title: "Chromate",
        description: "AI Voice Extension for People with Physical Disabilities"
      },
      "Albant": {
        title: "Albant",
        description: "Errand Service within Sunrin High School"
      },
      "PortFolio": {
        title: "Portfolio",
        description: "Portfolio Website"
      }
    }
  }
};