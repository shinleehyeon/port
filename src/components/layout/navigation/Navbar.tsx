"use client";
import Link from "next/link";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import LanguageButton from "./LanguageButton";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import { useLanguage } from "@/contexts/LanguageContext";
import { AnimatePresence, motion } from 'framer-motion';
import NavLink from "./NavLink";

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

    const headerMotionProps = {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        transition: { duration: 0.3, delay: 0.18 },
    };

    return (
        <>
            <nav className="fixed top-0 left-0 right-0 z-20 bg-white">
                <motion.div
                    className="container mx-auto px-10 py-4 max-w-7xl flex items-center justify-between"
                    {...headerMotionProps}
                >
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
                        className="flex items-center px-3 py-2 border rounded border-gray-300 text-gray-600 hover:text-black hover:border-black transition-all duration-300"
                    >
                        <div className="flex items-center">
                            {navbarOpen ? (
                                <>
                                    <XMarkIcon className="h-5 w-5" />
                                    <span className="ml-2">{t("close")}</span>
                                </>
                            ) : (
                                <>
                                    <Bars3Icon className="h-5 w-5" />
                                    <span className="ml-2">{t("menu")}</span>
                                </>
                            )}
                        </div>
                    </button>
                </motion.div>
                <AnimatePresence mode="wait">
                    {navbarOpen && (
                        <div className="fixed top-[73px] left-0 right-0 h-[calc(100vh-73px)]">
                            <motion.div
                                className="absolute inset-0 bg-black/50"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                onClick={closeNavbar}
                            />
                            <motion.div
                                className="relative bg-white z-10 overflow-hidden"
                                initial={{ height: 0 }}
                                animate={{ height: 'auto' }}
                                exit={{ height: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <div className="container mx-auto px-10 py-4 pb-8">
                                    <div className="flex flex-col space-y-4">
                                        {navLinks.map((link, index) => (
                                            <motion.div
                                                key={link.path}
                                                initial={{ opacity: 0, y: -20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -20 }}
                                                transition={{
                                                    duration: 0.2,
                                                    delay: navbarOpen ? index * 0.02 + 0.1 : 0,
                                                }}
                                            >
                                                <NavLink
                                                    href={link.path}
                                                    title={link.title}
                                                    onClick={closeNavbar}
                                                />
                                            </motion.div>
                                        ))}
                                        <motion.div
                                            initial={{ opacity: 0, y: -20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -20 }}
                                            transition={{
                                                duration: 0.2,
                                                delay: navbarOpen ? navLinks.length * 0.02 + 0.1 : 0,
                                            }}
                                            className="pt-2 pb-6"
                                        >
                                            <LanguageButton />
                                        </motion.div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>
            </nav>
        </>
    );
};

export default Navbar;