'use client';
import React, { useState, useEffect } from "react";
import { Check, Send } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import ScrollAnimationWrapper from '@/components/ui/ScrollAnimationWrapper';

const EmailSection = () => {
    const { t } = useLanguage();
    const [emailSubmitted, setEmailSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [showAnimation, setShowAnimation] = useState(false); // 애니메이션 상태
    const [mounted, setMounted] = useState(false);

    const [formData, setFormData] = useState({
        email: "",
        phoneNumber: "",
        subject: "",
        message: "",
    });

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const response = await fetch("/api/send", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });
            if (response.ok) {
                setEmailSubmitted(true);
                setShowAnimation(true); // 이메일 전송 후 애니메이션 실행
                setFormData({ email: "", phoneNumber: "", subject: "", message: "" });
                e.currentTarget.reset();
            }
        } catch (error) {
            console.error("Failed to send email:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (showAnimation) {
            const timer = setTimeout(() => {
                setShowAnimation(false);
                setEmailSubmitted(false);
            }, 3000); // 3초 후 애니메이션 종료
            return () => clearTimeout(timer);
        }
    }, [showAnimation]);

    const inputStyles =
        "bg-transparent border border-[#6D6D6D] text-black text-sm rounded-lg focus:ring-2 focus:ring-gray-400 focus:outline-none block w-full p-4 transition-all duration-300 ease-in-out";

    const childVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5
            }
        }
    };

    return (
        <AnimatePresence>
            {mounted && (
                <section id="contact" className="mt-24 pt-24">
                    <ScrollAnimationWrapper direction="up" delay={0.1}>
                        <h2 className="text-4xl font-semibold text-black mb-8">
                            {t('contact.title')}
                        </h2>
                    </ScrollAnimationWrapper>

                    {showAnimation ? (
                        <ScrollAnimationWrapper direction="up" delay={0.2}>
                            <div className="flex flex-col items-center justify-center h-full max-w-xl ml-0">
                                <div className="bg-green-500 rounded-full p-2 mb-4 animate-bounce">
                                    <Check className="w-8 h-8 text-black" />
                                </div>
                                <p className="text-green-500 text-lg font-medium animate-fade-in">
                                    {t('contact.success')}
                                </p>
                            </div>
                        </ScrollAnimationWrapper>
                    ) : (
                        <form
                            className="flex flex-col space-y-6 max-w-xl pb-24"
                            onSubmit={handleSubmit}
                        >
                            <ScrollAnimationWrapper direction="up" delay={0.2}>
                                <div className="flex space-x-4">
                                    <div className="w-1/2">
                                        <label htmlFor="email" className="text-black block mb-2 text-sm font-medium">
                                            {t('contact.email')}
                                        </label>
                                        <input
                                            name="email"
                                            type="email"
                                            id="email"
                                            required
                                            className={inputStyles}
                                            placeholder="example@email.com"
                                            onChange={handleInputChange}
                                            value={formData.email}
                                        />
                                    </div>
                                    <div className="w-1/2">
                                        <label htmlFor="phoneNumber" className="text-black block mb-2 text-sm font-medium">
                                            {t('contact.phone')}
                                        </label>
                                        <input
                                            name="phoneNumber"
                                            type="text"
                                            id="phoneNumber"
                                            required
                                            className={inputStyles}
                                            placeholder={t('contact.phoneNumber')}
                                            onChange={handleInputChange}
                                            value={formData.phoneNumber}
                                        />
                                    </div>
                                </div>
                            </ScrollAnimationWrapper>

                            <ScrollAnimationWrapper direction="up" delay={0.3}>
                                <div>
                                    <label htmlFor="subject" className="text-black block text-sm mb-2 font-medium">
                                        {t('contact.subject')}
                                    </label>
                                    <input
                                        name="subject"
                                        type="text"
                                        id="subject"
                                        required
                                        className={inputStyles}
                                        placeholder={t('contact.subject')}
                                        onChange={handleInputChange}
                                        value={formData.subject}
                                    />
                                </div>
                            </ScrollAnimationWrapper>

                            <ScrollAnimationWrapper direction="up" delay={0.4}>
                                <div>
                                    <label htmlFor="message" className="text-black block text-sm mb-2 font-medium">
                                        {t('contact.message')}
                                    </label>
                                    <textarea
                                        name="message"
                                        id="message"
                                        className={inputStyles}
                                        rows={4}
                                        placeholder={t('contact.message')}
                                        onChange={handleInputChange}
                                        value={formData.message}
                                    />
                                </div>
                            </ScrollAnimationWrapper>

                            <ScrollAnimationWrapper direction="up" delay={0.5}>
                                <motion.button
                                    type="submit"
                                    disabled={isLoading}
                                    className="group bg-[#6D6D6D] border border-[#6D6D6D] text-white font-medium py-3 px-5 rounded-lg w-full disabled:opacity-50 transition-all duration-300 hover:text-white"
                                >
                                    {isLoading ? (
                                        "Sending..."
                                    ) : (
                                        <span className="flex items-center justify-center gap-2">
                                            {t('contact.send')}
                                            <Send className="w-4 h-4 transform group-hover:rotate-12 transition-transform" />
                                        </span>
                                    )}
                                </motion.button>
                            </ScrollAnimationWrapper>
                        </form>
                    )}
                </section>
            )}
        </AnimatePresence>
    );
};

export default EmailSection;
