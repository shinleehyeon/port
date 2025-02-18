'use client';
import React, { useState, useEffect } from "react";
import { Check, Send } from "lucide-react";
import { motion } from "framer-motion";

const EmailSection = () => {
    const [emailSubmitted, setEmailSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [showAnimation, setShowAnimation] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        phoneNumber: "",
        subject: "",
        message: "",
    });

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
                setShowAnimation(true);
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
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [showAnimation]);

    const inputStyles =
        "bg-transparent border border-[#6D6D6D] text-black text-sm rounded-lg focus:ring-2 focus:ring-gray-400 focus:outline-none block w-full p-4 transition-all duration-300 ease-in-out";

    return (
        <section id="contact" className="mt-24">
            <h2 className="text-4xl font-semibold text-black mb-8">문의</h2>

            {showAnimation ? (
                <section className="flex flex-col items-center justify-center h-full max-w-xl ml-0">
                    <article className="bg-green-500 rounded-full p-2 mb-4 animate-bounce">
                        <Check className="w-8 h-8 text-black" />
                    </article>
                    <p className="text-green-500 text-lg font-medium animate-fade-in">
                        이메일 보내기 완료!
                    </p>
                </section>
            ) : (
                <form
                    className="flex flex-col space-y-6 max-w-xl pb-24"
                    onSubmit={handleSubmit}
                >
                    <div className="flex space-x-4">
                        <div className="w-1/2">
                            <label
                                htmlFor="email"
                                className="text-black block mb-2 text-sm font-medium"
                            >
                                Your email
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
                            <label
                                htmlFor="phoneNumber"
                                className="text-black block mb-2 text-sm font-medium"
                            >
                                Phone Number
                            </label>
                            <input
                                name="phoneNumber"
                                type="text"
                                id="phoneNumber"
                                required
                                className={inputStyles}
                                placeholder="Phone Number"
                                onChange={handleInputChange}
                                value={formData.phoneNumber}
                            />
                        </div>
                    </div>
                    <div>
                        <label
                            htmlFor="subject"
                            className="text-black block text-sm mb-2 font-medium"
                        >
                            Subject
                        </label>
                        <input
                            name="subject"
                            type="text"
                            id="subject"
                            required
                            className={inputStyles}
                            placeholder="제목"
                            onChange={handleInputChange}
                            value={formData.subject}
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="message"
                            className="text-black block text-sm mb-2 font-medium"
                        >
                            Message
                        </label>
                        <textarea
                            name="message"
                            id="message"
                            className={inputStyles}
                            rows={4}
                            placeholder="여기에 메시지를 작성해주세요"
                            onChange={handleInputChange}
                            value={formData.message}
                        />
                    </div>
                    <motion.button
                        initial={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                        type="submit"
                        disabled={isLoading}
                        className="group bg-[#6D6D6D] border border-[#6D6D6D] text-white font-medium py-3 px-5 rounded-lg w-full disabled:opacity-50 transition-all duration-300 hover:text-white"
                    >
                        {isLoading ? (
                            "Sending..."
                        ) : (
                            <span className="flex items-center justify-center gap-2">
                                Send Message
                                <Send className="w-4 h-4 transform group-hover:rotate-12 transition-transform" />
                            </span>
                        )}
                    </motion.button>
                </form>
            )}
        </section>
    );
};

export default EmailSection;
