"use client";
import Link from "next/link";
import Image from "next/image";
import React, { useState } from "react";
import NavLink from "./NavLink";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import Logo from "../../../public/logo.svg";

const navLinks = [
    { title: "About", path: "#about" },
    { title: "Strengths", path: "#strengths" },
    { title: "Portfolio", path: "#portfolio" },
    { title: "Contact", path: "#contact" },
];

const Navbar = () => {
    const [navbarOpen, setNavbarOpen] = useState(false);

    const closeNavbar = () => {
        setNavbarOpen(false);
    };

    return (
        <nav className="fixed top-0 left-0 right-0 z-10 bg-white/75 backdrop-blur-md">
            <div className="container flex items-center justify-between mx-auto px-20 py-4 max-w-7xl">
                <Link href={"/"} className="flex items-center gap-2">
                    <Image
                        src={Logo}
                        alt="Logo"
                        className="w-auto h-8 md:h-10"
                        priority
                    />
                    <span className="text-black text-lg md:text-xl font-bold">hyun</span>
                </Link>

                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link, index) => (
                        <NavLink key={index} href={link.path} title={link.title} />
                    ))}
                </div>

                <div className="md:hidden">
                    <button
                        onClick={() => setNavbarOpen(!navbarOpen)}
                        className="flex items-center px-3 py-2 border rounded border-gray-300 text-gray-600 hover:text-black hover:border-black transition-colors"
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
                className={`md:hidden absolute top-full left-0 right-0 bg-white/75 backdrop-blur-md transition-all duration-300 ease-in-out ${
                    navbarOpen ? "opacity-100 visible" : "opacity-0 invisible"
                }`}
            >
                <div className="flex flex-col items-center py-4 space-y-4">
                    {navLinks.map((link, index) => (
                        <Link
                            key={index}
                            href={link.path}
                            onClick={closeNavbar}
                            className="text-black hover:text-gray-700 text-lg transition-colors"
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