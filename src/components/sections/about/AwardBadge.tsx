import React from 'react';
import type { AwardBadgeProps } from '@/types/common';

const AwardBadge: React.FC<AwardBadgeProps> = ({ type, typeEn, isEnglish }) => {
    const getBadgeColors = (type: string) => {
        switch (isEnglish ? typeEn : type) {
            case "최우수상":
            case "Grand Prize":
                return "bg-purple-50 text-purple-600";
            case "한국 과학 창의재단 이사장상":
            case "Korea Foundation for Science and Creativity Chairman's Award":
                return "bg-emerald-50 text-emerald-600";
            default:
                return "bg-amber-50 text-amber-600";
        }
    };
    
    return (
        <div className={`rounded-full px-3 py-1 text-sm font-medium ${getBadgeColors(type)}`}>
            {isEnglish ? typeEn : type}
        </div>
    );
};

export default AwardBadge;  