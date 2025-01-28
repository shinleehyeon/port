"use client";

import React, { useState } from "react";
import { FaInstagram, FaGithub } from "react-icons/fa";
import { Copy, Check } from "lucide-react";
import Alert from "@/components/ui/Alert";

const Footer = () => {
    const [showNotification, setShowNotification] = useState(false);
    const [copiedText, setCopiedText] = useState("");

    const handleCopy = (text: string, label: string) => {
        navigator.clipboard.writeText(text);
        setCopiedText(label);
        setShowNotification(true);
        setTimeout(() => {
            setShowNotification(false);
        }, 2000);
    };

    return (
        <footer className="footer relative bg-gray-100 text-gray-500 px-20 py-6 text-xs">
            {showNotification && (
                <div className="fixed top-8 left-1/2 transform -translate-x-1/2 z-50">
                    <Alert className="bg-[#6D6D6D] backdrop-blur-sm text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-2">
                        <Check className="h-4 w-4" />
                        <span>{copiedText} 복사됨</span>
                    </Alert>
                </div>
            )}
            
            <div className="w-full flex flex-col sm:flex-row justify-between items-center">
                <div className="text-center sm:text-left">
                    <p>신이현 / 선린인터넷고등학교 / TAPIE</p>
                    <p className="flex flex-wrap items-center gap-2">
                        <span 
                            onClick={() => handleCopy("010-2984-6694", "전화번호")}
                            className="cursor-pointer hover:text-black flex items-center gap-1 transition-all duration-500 ease-in-out group"
                        >
                            전화번호 : 010-2984-6694
                            <Copy className="h-3 w-3 inline opacity-50 group-hover:opacity-100" />
                        </span>
                        <span className="mx-1">/</span>
                        <span 
                            onClick={() => handleCopy("shinlee7878@gmail.com", "이메일")}
                            className="cursor-pointer hover:text-black flex items-center gap-1 transition-colors group"
                        >
                            이메일 : shinlee7878@gmail.com
                            <Copy className="h-3 w-3 inline opacity-50 group-hover:opacity-100" />
                        </span>
                    </p>
                    <p className="mt-2 text-gray-500">
                        Copyright ⓒ 2024 신이현. All rights reserved.
                    </p>
                </div>

                <div className="flex gap-4 mt-4 sm:mt-0">
                    <a
                        href="https://www.instagram.com/hyun._.s08/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center border border-black hover:scale-105 text-black px-4 py-2 rounded-full transition-all duration-300 ease-in-out gap-2 text-xs"
                    >
                        <FaInstagram size={16} /> hyun._.s08
                    </a>
                    <a
                        href="https://github.com/shinleehyeon"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center border border-black hover:scale-105 text-black px-4 py-2 rounded-full transition-all duration-300 ease-in-out gap-2 text-xs"
                    >
                        <FaGithub size={16} /> shinleehyun
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;