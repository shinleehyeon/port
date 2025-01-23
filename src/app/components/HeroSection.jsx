"use client";
import React from "react";
import { motion } from "framer-motion";
import { TypeAnimation } from 'react-type-animation';

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
                        <span className="text-black block mb-1">
                            끈임없이 배우는 개발자
                        </span>
                        <TypeAnimation
                            sequence={[
                                'App Developer',
                                2000,
                                'Wep Developer',
                                2000,
                            ]}
                            wrapper="span"
                            speed={10}
                            repeat={Infinity}
                            className="text-[#e9ecef] text-4xl sm:text-5xl lg:text-7xl block"
                        />
                    </h1>
                    <p className="text-gray-400 text-base sm:text-lg mb-6 lg:text-xl">
                        새로운 지식을 탐구하며 창의적이고 열정적인 개발자
                        <br/>
                        지속적으로 성장하고 배움을 통해 가치를 창출하는 개발자
                    </p>
                </motion.div>
            </div>
        </section>
    );
};

export default HeroSection;