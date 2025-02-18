export interface NavItem {
  title: string;
  path: string;
}

export interface Skill {
  icon: string;
  desc: string;
  descEn: string;
}

export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tag: string[];
  gitUrl: string;
  techStack: string[];
}

export interface ProjectCardProps {
  imgUrl: string;
  title: string;
  description: string;
  gitUrl: string;
  techStack: string[];
  tag: string[];
}

export interface ProjectTagProps {
  name: string;
  displayName: string;
  onClick: (name: string) => void;
  isSelected: boolean;
}

export interface Strength {
  keyword: string;
  detail: string;
  color: string;
}

export type AwardType = "최우수상" | "한국 과학 창의재단 이사장상" | "가작상";

export interface AwardBadgeProps {
  type: string;
  typeEn: string;
  isEnglish: boolean;
}

export interface Award {
  titleKo: string;
  titleEn: string;
  year: string;
  organizationKo: string;
  organizationEn: string;
  typeKo: string;
  typeEn: string;
}