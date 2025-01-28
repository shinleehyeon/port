
import React from 'react';

interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const Alert: React.FC<AlertProps> = ({ children, className, ...props }) => {
  return (
    <div
      className={`rounded-lg p-4 animate-fadeIn ${className}`}
      role="alert"
      {...props}
    >
      {children}
    </div>
  );
};

export default Alert;