import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import AwardBadge from '@/components/sections/about/AwardBadge';
import { awardsData } from '@/lib/constants/award';
import { fadeInAnimationVariants } from '@/lib/utils/animations';

const AwardSection: React.FC = () => {
    const { language } = useLanguage();

    return (
        <div className="grid grid-cols-1 gap-4">
            {awardsData.map((award, index) => (
                <motion.div
                    key={index}
                    variants={fadeInAnimationVariants}
                    initial="initial"
                    animate="animate"
                    viewport={{ once: true }}
                    custom={index}
                    className="bg-white rounded-xl overflow-hidden border border-primary-400 p-4 max-w-[500px]"
                >
                    <div className="space-y-3">
                        <div className="flex items-center justify-between">
                            <div className="text-sm text-gray-500 space-x-2">
                                <span>{award.year}</span>
                                <span>•</span>
                                <span>{language === 'en' ? award.organizationEn : award.organizationKo}</span>
                            </div>
                            <AwardBadge
                                type={award.typeKo}
                                typeEn={award.typeEn}
                                isEnglish={language === 'en'}
                            />
                        </div>
                        <h3 className="font-medium text-gray-900">
                            {language === 'en' ? award.titleEn : award.titleKo}
                        </h3>
                    </div>
                </motion.div>
            ))}
        </div>
    );
};

export default AwardSection;