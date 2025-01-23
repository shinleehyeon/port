import React from "react";
import { FaInstagram, FaGithub } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="footer bg-black text-gray-500 px-20 py-6 text-xs">
            <div className="w-full flex flex-col sm:flex-row justify-between items-center">
                <div className="text-center sm:text-left">
                    <p>신이현 / 선린인터넷고등학교 / TAPIE</p>
                    <p>전화번호 : 010-2984-6694 / 이메일 : shinlee7878@gmail.com</p>
                    <p className="mt-2 text-gray-500">Copyright ⓒ 2024 신이현. All rights reserved.</p>
                </div>

                <div className="flex gap-4 mt-4 sm:mt-0">
                    <a
                        href="https://www.instagram.com/hyun._.s08/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center border border-gray-500 hover:border-white text-white px-4 py-2 rounded-full transition-colors gap-2 text-xs"
                    >
                        <FaInstagram size={16} /> instagram
                    </a>
                    <a
                        href="https://github.com/shinleehyeon"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center border border-gray-500 hover:border-white text-white px-4 py-2 rounded-full transition-colors gap-2 text-xs"
                    >
                        <FaGithub size={16} /> github
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
