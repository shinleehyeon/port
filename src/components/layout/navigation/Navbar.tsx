"use client";
import Link from "next/link";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import LanguageButton from "./LanguageButton";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import { useLanguage } from "@/contexts/LanguageContext";

const Navbar = () => {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    document.body.style.overflow = navbarOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [navbarOpen]);

  const navLinks = [
    { title: t("nav.about"), path: "#about" },
    { title: t("nav.strengths"), path: "#strengths" },
    { title: t("nav.portfolio"), path: "#portfolio" },
    { title: t("nav.contact"), path: "#contact" },
  ];

  const closeNavbar = () => {
    setNavbarOpen(false);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-20 bg-white/75 backdrop-blur-md">
        <div className="container mx-auto px-10 py-4 max-w-7xl flex items-center justify-between">
          <Link href={"/"} className="flex items-center gap-2">
            <Image
              src="/logo.svg"
              alt="Logo"
              width={32}
              height={32}
              className="w-auto h-8 md:h-10"
              priority
            />
            <span className="text-black text-lg md:text-xl font-bold">hyeon</span>
          </Link>
          <button
            onClick={() => setNavbarOpen(!navbarOpen)}
            className={`flex items-center px-3 py-2 border rounded border-gray-300 text-gray-600 hover:text-black hover:border-black transition-all duration-300 ${navbarOpen ? 'hidden' : ''}`}
          >
            {navbarOpen ? (
              <XMarkIcon className="h-5 w-5" />
            ) : (
              <>
                <Bars3Icon className="h-5 w-5" />
                <span className="ml-2">{t("menu")}</span>
              </>
            )}
          </button>
        </div>
        <div
          className={`absolute top-full left-0 right-0 bg-white/75 backdrop-blur-md transition-all duration-500 ease-in-out transform ${
            navbarOpen ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-2"
          }`}
        >
          <div className="container mx-auto px-10 py-4">
            <div className="flex flex-col space-y-4">
              {navLinks.map((link, index) => (
                <Link
                  key={index}
                  href={link.path}
                  onClick={closeNavbar}
                  className="text-gray-500 hover:text-black text-2xl tracking-wider transform transition-all duration-300 hover:translate-x-2 hover:scale-105 opacity-0"
                  style={
                    navbarOpen
                      ? {
                          animation: `slideIn 0.3s forwards`,
                          animationDelay: `${150 + index * 100}ms`,
                        }
                      : {}
                  }
                >
                  {link.title}
                </Link>
              ))}
              <div className="pt-2">
                <LanguageButton />
              </div>
            </div>
          </div>
        </div>
      </nav>
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm transition-all duration-500 ease-in-out ${
          navbarOpen ? "opacity-100 visible z-10" : "opacity-0 invisible -z-10"
        }`}
        onClick={closeNavbar}
      />
      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </>
  );
};

export default Navbar;
