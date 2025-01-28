import { IconType } from 'react-icons';

export interface NavItem {
  title: string;
  path: string;
}

export interface Skill {
  icon: string;
  desc: string;
}

export interface TechDescription {
  tech: string;
  icon: IconType;
}

export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tag: string[];
  gitUrl: string;
  techStack: IconType[];
  details: ProjectDetails;
}

export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tag: string[];
  gitUrl: string;
  techStack: IconType[];
  details: ProjectDetails;
}