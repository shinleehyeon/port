import React, { ReactNode } from "react";
import { motion } from "framer-motion";

const variants = {
    default: { width: 0 },
    active: { width: "calc(100% - 0.75rem)" },
};

interface TabButtonProps {
    active: boolean;
    selectTab: () => void;
    children: ReactNode;
}

const TabButton: React.FC<TabButtonProps> = ({ active, selectTab, children }) => {
    const buttonClasses = active ? "text-black" : "text-gray-400";

    return (
        <button onClick={selectTab}>
            <p className={`mr-3 font-semibold  ${buttonClasses}`}>
                {children}
            </p>
            <motion.div
                animate={active ? "active" : "default"}
                variants={variants}
                className="h-1 bg-primary-500 mt-2 mr-3"
            ></motion.div>
        </button>
    );
};

export default TabButton;
