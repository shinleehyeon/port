import { IconType } from 'react-icons';

export interface ProjectCardProps {
  imgUrl: string;
  title: string;
  description: string;
  gitUrl: string;
  techStack?: IconType[];
}

export interface ProjectTagProps {
  name: string;
  onClick: (name: string) => void;
  isSelected: boolean;
}

export interface TabButtonProps {
  active: boolean;
  selectTab: () => void;
  children: React.ReactNode;
}