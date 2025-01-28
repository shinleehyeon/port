export interface NavItem {
  title: string;
  path: string;
}

export interface Skill {
  icon: string;
  desc: string;
}

export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tag: string[];
  gitUrl: string;
  techStack: IconType[];
}

export interface Strength {
  keyword: string;
  detail: string;
  color: string;
}