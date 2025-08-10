export interface ProjectCardProps {
  imgUrl: string;
  title: string;
  description: string;
  gitUrl: string;
  techStack?: string[];
  tag?: string[];
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
