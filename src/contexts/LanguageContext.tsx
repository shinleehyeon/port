"use client";
import React, { createContext, useContext, useState } from "react";

type Language = "ko" | "en";

interface TranslationKeys {
  // Navigation
  "nav.about": string;
  "nav.strengths": string;
  "nav.portfolio": string;
  "nav.contact": string;

  // Hero
  "hero.title1": string;
  "hero.title2": string;

  // About
  "about.title": string;
  "about.description": string;
  "about.tabs.skills": string;
  "about.tabs.awards": string;
  "about.skillsInfo": string;

  // Strengths
  "strengths.title": string;
  [key: `strengths.${number}.keyword`]: string;
  [key: `strengths.${number}.detail`]: string;

  // Projects
  "projects.title": string;

  // Contact
  "contact.title": string;
  "contact.email": string;
  "contact.subject": string;
  "contact.message": string;
  "contact.send": string;
  "contact.phone": string;
  "contact.phoneNumber": string;
  "contact.success": string;

  // Navbar
  menu: string;
  close: string;
}

type Translations = {
  [K in Language]: TranslationKeys;
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: keyof TranslationKeys | string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
);

export const translations: Translations = {
  ko: {
    "nav.about": "자기소개",
    "nav.strengths": "강점",
    "nav.portfolio": "포트폴리오",
    "nav.contact": "문의",
    menu: "메뉴",
    close: "닫기",
    "hero.title1": "끊임없는 [배움]과 [도전]으로",
    "hero.title2": "성장하는 개발자",
    "about.title": "자기소개",
    "about.description":
      "안녕하세요👋, 저는 대한민국에서 소프트웨어를 공부하며 미래를 위해 끊임없이 도전하는\n선린인터넷고등학교 재학생 신이현입니다. 현재는 웹과 앱 개발에 집중하고 있으며, 다양한 프로젝트 경험을 통해\n개발자로서의 실력을 꾸준히 다져나가고 있습니다.\n\n학업 외에도 여러 대회와 해커톤에 참여하며 최신 트렌드와 문제 해결 방식을 익히고, \n사용자가 진정으로 필요로 하는 서비스를 창의적이고 혁신적인 방법으로 구현하고자 노력하고 있습니다.\n\n또한, 팀원들과의 긴밀한 소통과 협업을 통해 복잡한 문제들을 효과적으로 해결하며, \n항상 실질적인 가치와 도움을 줄 수 있는 결과물을 만들어내기 위해 열정을 쏟고 있습니다.\n앞으로도 지속적인 자기계발과 도전을 통해 사회에 긍정적인 영향을 미치는 혁신적인 서비스를 개발해 나갈 것입니다.\n감사합니다.",
    "about.tabs.skills": "기술 스택",
    "about.tabs.awards": "수상 실적",
    "about.skillsInfo": "아이콘을 클릭하여 자세한 설명 보기",
    "strengths.title": "강점",
    "strengths.1.keyword": "새로운 기술을 배우려는 열정",
    "strengths.1.detail":
      "새로운 기술과 툴을 배우는것을 두려워 하지 않고 더 나은 방법을 찾는것에 열정이 있습니다.",
    "strengths.2.keyword": "팀원과 소통하며 프로젝트에 참여",
    "strengths.2.detail":
      "맡은 프로젝트를 책임감있게 임하며, 팀원들과의 소통을 통해 최상의 결과를 도출하기 위해 노력합니다.",
    "strengths.3.keyword": "체계적인 문제 해결 능력",
    "strengths.3.detail":
      "문제를 논리적으로 분석하고 체계적인 접근 방식으로 해결책을 찾아내는 것을 즐깁니다.",
    "strengths.4.keyword": "맡은 일을 포기하지 않는 열정",
    "strengths.4.detail":
      "한 번 시작한 일은 끝까지 해내려는 강한 의지가 있고, 깊은 몰입을 통해 최상의 결과물을 만들어냅니다.",
    "projects.title": "포트폴리오",
    "contact.title": "문의",
    "contact.email": "이메일",
    "contact.phone": "전화번호",
    "contact.phoneNumber": "전화번호를 입력해주세요",
    "contact.subject": "제목",
    "contact.message": "메시지",
    "contact.send": "메시지 보내기",
    "contact.success": "이메일 보내기 완료!",
  },
  en: {
    "nav.about": "About",
    "nav.strengths": "Strengths",
    "nav.portfolio": "Portfolio",
    "nav.contact": "Contact",
    menu: "Menu",
    close: "Close",
    "hero.title1": "Continuous Learning,",
    "hero.title2": "Growing Developer",
    "about.title": "About Me",
    "about.description":
      "Hello👋, I'm Lee Hyeon Shin, a student at Sunrin Internet High School, studying software development in South Korea.\nCurrently, I am focusing on web and app development, and I am continuously improving my skills as a developer through various project experiences.\n\nIn addition to my studies, I participate in various competitions and hackathons to learn the latest trends and problem-solving approaches, and I strive to implement services that meet the real needs of users in creative and innovative ways.\n\nMoreover, through close communication and collaboration with my team members, I effectively solve complex problems and put in the effort to deliver results that provide real value and assistance.\n\nIn the future, I will continue developing innovative services that positively impact society through continuous self-improvement and challenges. Thank you.",
    "about.tabs.skills": "Skills",
    "about.tabs.awards": "Awards",
    "about.skillsInfo": "Click icons for detailed descriptions",
    "strengths.title": "Strengths",
    "strengths.1.keyword": "Passion for Learning New Technologies",
    "strengths.1.detail":
      "I'm not afraid to learn new technologies and tools, and I'm passionate about finding better ways to solve problems.",
    "strengths.2.keyword": "Collaborative Project Participation",
    "strengths.2.detail":
      "I approach projects with responsibility and strive to achieve the best results through effective communication with team members.",
    "strengths.3.keyword": "Systematic Problem-Solving",
    "strengths.3.detail":
      "I enjoy analyzing problems logically and finding solutions through a systematic approach.",
    "strengths.4.keyword": "Unwavering Dedication",
    "strengths.4.detail":
      "I have a strong will to complete what I start and create the best results through deep focus and commitment.",
    "projects.title": "Portfolio",
    "contact.title": "Contact",
    "contact.email": "Your email",
    "contact.phone": "Phone Number",
    "contact.phoneNumber": "Enter your phone number",
    "contact.subject": "Subject",
    "contact.message": "Message",
    "contact.send": "Send Message",
    "contact.success": "Email sent successfully!",
  },
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [language, setLanguage] = useState<Language>("ko");

  const t = (key: keyof TranslationKeys | string): string => {
    return (
      translations[language][
        key as keyof (typeof translations)[typeof language]
      ] || key
    );
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
