"use client";

import React, { useMemo } from "react";

// Paper cut text effect with 3D shadow and overlay animations

interface PaperCutTextProps {
  text?: string;
  textColor?: string;
  textBorderWidth?: number;
  textBorderColor?: string;
  backgroundColor?: string;
  overlayGradientStart?: string;
  overlayGradientEnd?: string;
  shadowColor?: string;
  shadowBlur?: number;
  animationDuration?: number;
  letterDelay?: number;
  font?: React.CSSProperties;
  borderRadius?: number;
  padding?: string;
  className?: string;
}

export default function PaperCutText(props: PaperCutTextProps) {
  const {
    text = "PAPER",
    textColor = "#808080",
    textBorderWidth = 0.01,
    textBorderColor = "rgba(0, 0, 0, 0.3)",
    backgroundColor,
    overlayGradientStart = "#ffffff",
    overlayGradientEnd = "#eef0e9",
    shadowColor = "rgba(0, 0, 0, 0.4)",
    shadowBlur = 5,
    animationDuration = 3,
    letterDelay = 0.2,
    font,
    borderRadius = 0,
    padding = "20px",
    className,
  } = props;

  const letters = useMemo(() => {
    return text.split("").map((char, index) => ({
      char,
      isSpace: char === " ",
      delay: index * letterDelay,
    }));
  }, [text, letterDelay]);

  const containerStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
    ...(backgroundColor && { backgroundColor }),
    borderRadius: `${borderRadius}px`,
    overflow: "hidden",
    padding,
  };

  const textContainerStyle: React.CSSProperties = {
    position: "relative",
    textTransform: "uppercase",
    display: "flex",
    ...font,
  };

  const spaceStyle: React.CSSProperties = {
    width: "0.3em",
  };

  const letterStyle: React.CSSProperties = {
    position: "relative",
    display: "flex",
  };

  const sourceStyle: React.CSSProperties = {
    color: textColor,
    WebkitTextStroke: `${textBorderWidth}em ${textBorderColor}`,
    display: "flex",
  };

  const overlayBaseStyle: React.CSSProperties = {
    position: "absolute",
    top: 0,
    left: 0,
    pointerEvents: "none",
    userSelect: "none",
  };

  return (
    <div style={containerStyle} className={className}>
      <style>
        {`
          @keyframes papercut-shadow {
            0%, 20%, 100% {
              transform: skew(0, 20deg) translateY(0.1em) translateX(0.05em);
              opacity: 1;
            }
            10% {
              transform: skew(0, 0) translateY(0) translateX(0);
              opacity: 0;
            }
          }

          @keyframes papercut-overlay {
            0%, 20%, 100% {
              transform: rotateY(-30deg) skew(0, -10deg);
            }
            10% {
              transform: rotateY(0deg) skew(0, 0);
            }
          }
        `}
      </style>
      <div style={textContainerStyle}>
        {letters.map((item, index) => {
          if (item.isSpace) {
            return <div key={`space-${index}`} style={spaceStyle} />;
          }

          const overlayStyle: React.CSSProperties = {
            ...overlayBaseStyle,
            backgroundImage: `linear-gradient(90deg, ${overlayGradientStart} 50%, ${overlayGradientEnd})`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            transformOrigin: "left",
            animation: `papercut-overlay ${animationDuration}s infinite ease-out ${item.delay}s`,
          };

          const shadowStyle: React.CSSProperties = {
            ...overlayBaseStyle,
            filter: `blur(${shadowBlur}px)`,
            backgroundImage: `linear-gradient(90deg, ${shadowColor} 30%, transparent)`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            animation: `papercut-shadow ${animationDuration}s infinite ${item.delay}s`,
          };

          return (
            <div key={`letter-${index}`} style={letterStyle}>
              <span style={sourceStyle}>{item.char}</span>
              <span style={shadowStyle}>{item.char}</span>
              <span style={overlayStyle}>{item.char}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

