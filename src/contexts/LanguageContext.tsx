"use client";

import React, { createContext, useContext, useState } from 'react';

type Language = 'ko' | 'en';

interface TranslationKeys {
  "nav.about": string;
  "nav.strengths": string;
  "nav.portfolio": string;
  "nav.contact": string;
  "hero.title1": string;
  "hero.title2": string;
  "about.title": string;
  "about.description": string;
  "about.tabs.skills": string;
  "about.tabs.awards": string;
  "about.skillsInfo": string;
  "strengths.title": string;
  "projects.title": string;
  "contact.title": string;
  "contact.email": string;
  "contact.subject": string;
  "contact.message": string;
  "contact.send": string;
  "contact.success": string;
}

type Translations = {
  [K in Language]: TranslationKeys;
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: keyof TranslationKeys) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const translations: Translations = {
  ko: {
    "nav.about": "자기소개",
    "nav.strengths": "강점",
    "nav.portfolio": "포트폴리오",
    "nav.contact": "문의",
    "hero.title1": "끊임없는 배움으로",
    "hero.title2": "성장하는 개발자",
    "about.title": "자기소개",
    "about.description": "안녕하세요👋, 저는 대한민국에서 소프트웨어를 공부하고 있는\n선린인터넷고등학교에 재학중인 신이현입니다.\n저는 새로운 기술을 배우는 것을 좋아하며\n사람들에게 실질적인 가치와 도움을 줄 수 있는\n서비스를 만들고 싶습니다.",
    "about.tabs.skills": "기술 스택",
    "about.tabs.awards": "수상 실적",
    "about.skillsInfo": "아이콘을 클릭하여 자세한 설명 보기",
    "strengths.title": "강점",
    "projects.title": "포트폴리오",
    "contact.title": "문의",
    "contact.email": "이메일",
    "contact.subject": "제목",
    "contact.message": "메시지",
    "contact.send": "메시지 보내기",
    "contact.success": "이메일 보내기 완료!"
  },
  en: {
    "nav.about": "About",
    "nav.strengths": "Strengths",
    "nav.portfolio": "Portfolio",
    "nav.contact": "Contact",
    "hero.title1": "Continuous Learning,",
    "hero.title2": "Growing Developer",
    "about.title": "About Me",
    "about.description": "Hello👋, I'm Lee Hyeon Shin, a student at Sunrin Internet High School\nstudying software development in South Korea.\nI enjoy learning new technologies and\nwant to create services that provide real value\nand help to people.",
    "about.tabs.skills": "Skills",
    "about.tabs.awards": "Awards",
    "about.skillsInfo": "Click icons for detailed descriptions",
    "strengths.title": "Strengths",
    "projects.title": "Portfolio",
    "contact.title": "Contact",
    "contact.email": "Your email",
    "contact.subject": "Subject",
    "contact.message": "Message",
    "contact.send": "Send Message",
    "contact.success": "Email sent successfully!"
  }
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('ko');

  const t = (key: keyof TranslationKeys): string => {
    return translations[language][key];
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
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};