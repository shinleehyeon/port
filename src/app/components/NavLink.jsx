"use client";
import Link from "next/link";

const NavLink = ({ href, title }) => {
  const handleClick = (e) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      const targetId = href.replace('#', '');
      const elem = document.getElementById(targetId);

      if (elem) {
        const navHeight = 80;
        const elementPosition = elem.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - navHeight;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      }
    }
  };

  return (
      <Link
          href={href}
          onClick={handleClick}
          className="block py-2 pl-3 pr-4 text-[#000000] sm:text-xl rounded md:p-0 transition-all duration-300 hover:scale-110"
      >
        {title}
      </Link>
  );
};

export default NavLink;