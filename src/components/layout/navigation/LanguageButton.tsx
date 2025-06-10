"use client";
import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Globe } from "lucide-react";

interface LanguageButtonProps {
  onLanguageChange?: () => void;
}

const LanguageButton: React.FC<LanguageButtonProps> = ({
  onLanguageChange,
}) => {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === "ko" ? "en" : "ko");
    if (onLanguageChange) {
      onLanguageChange();
    }
  };
  const displayLanguage = language === "ko" ? "EN" : "KO";

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center gap-2 px-3 py-2 border rounded-xl border-gray-300 text-gray-600 hover:text-black hover:border-black transition-colors"
    >
      <Globe className="w-4 h-4" />
      <span className="text-sm font-medium">{displayLanguage}</span>
    </button>
  );
};

export default LanguageButton;
