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

export interface Strength {
  keyword: string;
  detail: string;
  color: string;
}