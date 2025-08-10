import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import AwardBadge from "@/components/sections/about/AwardBadge";
import { awardsData } from "@/lib/constants/award";
import { ChevronLeft, ChevronRight } from "lucide-react";

const AwardSection: React.FC = () => {
  const { language } = useLanguage();
  const [currentPage, setCurrentPage] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [containerHeight, setContainerHeight] = useState<number | null>(null);
  const [direction, setDirection] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const firstPageRef = useRef<HTMLDivElement>(null);
  const autoIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const totalPages = Math.ceil(awardsData.length / itemsPerPage);

  useEffect(() => {
    if (firstPageRef.current) {
      setContainerHeight(firstPageRef.current.offsetHeight);
    }

    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setItemsPerPage(2);
      } else {
        setItemsPerPage(3);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const startAutoSlide = () => {
      autoIntervalRef.current = setInterval(() => {
        setDirection(1);
        setCurrentPage((prev) => (prev + 1) % totalPages);
      }, 4000);
    };

    const stopAutoSlide = () => {
      if (autoIntervalRef.current) {
        clearInterval(autoIntervalRef.current);
        autoIntervalRef.current = null;
      }
    };

    if (!isHovered) {
      startAutoSlide();
    } else {
      stopAutoSlide();
    }

    return stopAutoSlide;
  }, [isHovered, totalPages]);

  const handleDragEnd = (event: any, info: { offset: { x: number } }) => {
    const dragOffset = info.offset.x;
    if (dragOffset < -100 && currentPage < totalPages - 1) {
      setDirection(1);
      setCurrentPage((prev) => prev + 1);
    } else if (dragOffset > 100 && currentPage > 0) {
      setDirection(-1);
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages - 1) {
      setDirection(1);
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 0) {
      setDirection(-1);
      setCurrentPage((prev) => prev - 1);
    }
  };

  const pageVariants = {
    initial: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    animate: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -300 : 300,
      opacity: 0,
    }),
  };

  return (
    <div
      className="relative overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <AnimatePresence>
        {isHovered && currentPage > 0 && (
          <motion.button
            key="prev-button"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={handlePrev}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10 hover:text-gray-500"
          >
            <ChevronLeft size={24} />
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isHovered && currentPage < totalPages - 1 && (
          <motion.button
            key="next-button"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={handleNext}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10 hover:text-gray-500"
          >
            <ChevronRight size={24} />
          </motion.button>
        )}
      </AnimatePresence>

      <div
        className="overflow-hidden"
        style={{ height: containerHeight ? `${containerHeight}px` : "auto" }}
      >
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentPage}
            className="flex flex-col space-y-4 absolute w-full"
            custom={direction}
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{
              duration: 0.4,
              ease: "easeInOut",
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={handleDragEnd}
          >
            <div ref={firstPageRef} className="flex flex-col space-y-4">
              {awardsData
                .slice(
                  currentPage * itemsPerPage,
                  (currentPage + 1) * itemsPerPage,
                )
                .map((award, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-xl overflow-hidden border border-primary-400 p-4 mx-8"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-gray-500 space-x-2">
                          <span>{award.year}</span>
                          <span>•</span>
                          <span>
                            {language === "en"
                              ? award.organizationEn
                              : award.organizationKo}
                          </span>
                        </div>
                        <AwardBadge
                          type={award.typeKo}
                          typeEn={award.typeEn}
                          isEnglish={language === "en"}
                        />
                      </div>
                      <h3 className="font-medium text-gray-900">
                        {language === "en" ? award.titleEn : award.titleKo}
                      </h3>
                    </div>
                  </div>
                ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex justify-center mt-7 space-x-2">
        {Array.from({ length: totalPages }).map((_, index) => (
          <motion.div
            key={index}
            className={`h-2 rounded-full ${
              index === currentPage ? "bg-black" : "bg-gray-300"
            }`}
            initial={{ width: index === currentPage ? 12 : 8 }}
            animate={{ width: index === currentPage ? 20 : 8 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          ></motion.div>
        ))}
      </div>
    </div>
  );
};

export default AwardSection;
