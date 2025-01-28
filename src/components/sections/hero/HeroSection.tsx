"use client";
import React from "react";
import { motion } from "framer-motion";
import { Sprout } from 'lucide-react';

const HeroSection = () => {
    return (
        <section className="lg:py-16">
            <div className="grid grid-cols-1">
                <motion.div
                    initial={{opacity: 0, scale: 0.5}}
                    animate={{opacity: 1, scale: 1}}
                    transition={{duration: 0.5}}
                    className="place-self-center text-center sm:text-left justify-self-start"
                >
                    <h1 className="text-white mb-4 text-4xl sm:text-5xl lg:text-7xl lg:leading-normal font-extrabold">
                        <span className="text-black block">
                            끊임없는 배움으로
                        </span>
                        <span className="text-[#6f4f28] block mb-1 flex items-center justify-center sm:justify-start">
                            성장하는 개발자
                            <Sprout className="ml-2" color="#22c55e" size={38} />
                        </span>
                    </h1>
                </motion.div>
            </div>
        </section>
    );
};

export default HeroSection;