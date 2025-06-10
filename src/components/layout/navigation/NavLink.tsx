"use client";
import React from "react";
import Link from "next/link";

interface NavLinkProps {
  href: string;
  title: string;
  onClick?: () => void;
}

const NavLink: React.FC<NavLinkProps> = ({ href, title, onClick }) => {
  const handleClick = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      const targetId = href.replace("#", "");
      const elem = document.getElementById(targetId);
      if (elem) {
        const navHeight = 80;
        const elementPosition = elem.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - navHeight;
        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
        setTimeout(() => {
          if (onClick) {
            onClick();
          }
        }, 400);
      }
    } else {
      if (onClick) {
        onClick();
      }
    }
  };

  return (
    <Link
      href={href}
      onClick={handleClick}
      className="block py-2 pl-3 pr-4 text-gray-500 sm:text-xl rounded md:p-0 transition-colors duration-300 hover:text-black"
    >
      {title}
    </Link>
  );
};

export default NavLink;
