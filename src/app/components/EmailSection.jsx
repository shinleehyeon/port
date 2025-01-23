"use client";
import React, { useState, useEffect } from "react";
import { Check, Send } from "lucide-react";
import { motion } from "framer-motion";

const EmailSection = () => {
    const [emailSubmitted, setEmailSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [showAnimation, setShowAnimation] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        subject: '',
        message: ''
    });
    const [showButton, setShowButton] = useState(false);

    useEffect(() => {
        const isFormFilled = formData.email !== '' &&
            formData.subject !== '' &&
            formData.message !== '';
        setShowButton(isFormFilled);
    }, [formData]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await fetch('/api/send', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setEmailSubmitted(true);
                setShowAnimation(true);
                setFormData({ email: '', subject: '', message: '' });
                e.target.reset();

                setTimeout(() => {
                    setShowAnimation(false);
                    setEmailSubmitted(false);
                }, 3000);
            }
        } catch (error) {
            console.error('Failed to send email:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const inputStyles = "bg-transparent border border-primary-500 text-gray-100 text-sm rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent block w-full p-3 transition-all duration-300 ease-in-out";

    return (
        <section id="contact">
            <div className="mt-24">
                <h2 className="text-4xl font-bold text-white mb-8">
                    Contact
                </h2>

                {showAnimation ? (
                    <div className="flex flex-col items-center justify-center h-full max-w-xl ml-0">
                        <div className="bg-green-500 rounded-full p-2 mb-4 animate-bounce">
                            <Check className="w-8 h-8 text-white" />
                        </div>
                        <p className="text-green-500 text-lg font-medium animate-fade-in">
                            이메일 보내기 완료!
                        </p>
                    </div>
                ) : (
                    <form className="flex flex-col space-y-6 max-w-xl pb-24" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="email" className="text-white block mb-2 text-sm font-medium">
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
                        <div>
                            <label htmlFor="subject" className="text-white block text-sm mb-2 font-medium">
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
                            <label htmlFor="message" className="text-white block text-sm mb-2 font-medium">
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
                        {showButton && (
                            <motion.button
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3 }}
                                type="submit"
                                disabled={isLoading}
                                className="group bg-transparent border border-primary-500 text-primary-500 font-medium py-3 px-5 rounded-lg w-full disabled:opacity-50 transition-all duration-300 hover:bg-primary-500 hover:text-white hover:scale-[1.02] active:scale-[0.98]"
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
                        )}
                    </form>
                )}
            </div>
        </section>
    );
};

export default EmailSection;