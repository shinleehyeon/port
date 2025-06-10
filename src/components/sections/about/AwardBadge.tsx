import React from "react";
import { Trophy } from "lucide-react";
import type { AwardBadgeProps } from "@/types/common";

const AwardBadge: React.FC<AwardBadgeProps> = ({ type, typeEn, isEnglish }) => {
  const getBadgeColors = (type: string) => {
    switch (isEnglish ? typeEn : type) {
      case "최우수상":
      case "Grand Prize":
        return "bg-purple-50 text-purple-600";
      case "한국 과학 창의재단 이사장상":
      case "Korea Foundation for Science and Creativity Chairman's Award":
        return "bg-emerald-50 text-emerald-600";
      case "가작상":
      case "Honorable Mention":
        return "bg-blue-50 text-blue-600";
      case "본선진출":
      case "Final":
        return "bg-orange-50 text-orange-600";
      default:
        return "bg-amber-50 text-amber-600";
    }
  };

  return (
    <div
      className={`rounded-full px-3 py-1 text-sm font-medium ${getBadgeColors(type)} flex items-center gap-1`}
    >
      {isEnglish ? typeEn : type}
      <Trophy size={14} />
    </div>
  );
};

export default AwardBadge;
