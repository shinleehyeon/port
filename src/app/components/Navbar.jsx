"use client";
import Link from "next/link";
import Image from "next/image";
import React, { useState } from "react";
import NavLink from "./NavLink";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import Logo from "../../../public/logo.svg";

const navLinks = [
  {
    title: "About",
    path: "#about",
  },
  {
    title: "Strengths",
    path: "#strengths",
  },
  {
    title: "Portfolio",
    path: "#portfolio",
  },
  {
    title: "Contact",
    path: "#contact",
  },
];

const Navbar = () => {
  const [navbarOpen, setNavbarOpen] = useState(false);

  const closeNavbar = () => {
    setNavbarOpen(false);
  };

  return (
      <nav className="fixed mx-auto top-0 left-0 right-0 z-10 backdrop-blur-md bg-[#121212]/70 border-b border-[#33353F]/50">
        <div className="flex container items-center justify-between mx-auto px-4 py-2 lg:py-4">
          <Link href={"/"} className="flex items-center gap-2">
            <Image
                src={Logo}
                alt="Logo"
                className="w-auto h-8 md:h-10"
                priority
            />
            <span className="text-white text-lg md:text-xl font-bold">hyun</span>
          </Link>

          <div className="hidden md:flex items-center gap-8 justify-center">
            {navLinks.map((link, index) => (
                <NavLink key={index} href={link.path} title={link.title} />
            ))}
          </div>

          <div className="md:hidden">
            <button
                onClick={() => setNavbarOpen(!navbarOpen)}
                className="flex items-center px-3 py-2 border rounded border-slate-200/50 text-slate-200 hover:text-white hover:border-white transition-colors"
            >
              {navbarOpen ? (
                  <XMarkIcon className="h-5 w-5" />
              ) : (
                  <Bars3Icon className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        <div
            className={`md:hidden absolute top-full left-0 right-0 bg-[#121212]/95 backdrop-blur-md transition-all duration-300 ease-in-out ${
                navbarOpen ? "opacity-100 visible" : "opacity-0 invisible"
            }`}
        >
          <div className="flex flex-col items-center py-4 space-y-4">
            {navLinks.map((link, index) => (
                <Link
                    key={index}
                    href={link.path}
                    onClick={closeNavbar}
                    className="text-white hover:text-gray-300 transition-colors text-lg"
                >
                  {link.title}
                </Link>
            ))}
          </div>
        </div>
      </nav>
  );
};

export default Navbar;