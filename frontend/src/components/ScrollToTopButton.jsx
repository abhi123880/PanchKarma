import React, { useState, useEffect } from "react";
import "../styles/ScrollToTopButton.css";

export default function ScrollToTopButton() {
  const [showButton, setShowButton] = useState(false);
  const [scrollPercent, setScrollPercent] = useState(0);

  useEffect(() => {
    function handleScroll() {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight =
        document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

      setShowButton(scrollTop > 200);
      setScrollPercent(Math.round(scrolled));
    }

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Responsive SVG ring
  const size = 48; // matches default button size
  const stroke = 4;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = Math.min(scrollPercent, 100);
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return showButton ? (
    <button
      className="scroll-top-btn"
      onClick={handleClick}
      aria-label="Scroll to top"
      tabIndex={0}
    >
      {scrollPercent === 100 ? (
        <span className="arrow only-arrow">
          <svg width="60%" height="60%" viewBox="0 0 24 24" fill="none">
            <polyline
              points="6 15 12 9 18 15"
              stroke="#fff"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      ) : (
        <>
          <svg
            className="progress-ring"
            width="100%"
            height="100%"
            viewBox={`0 0 ${size} ${size}`}
          >
            <circle
              className="progress-ring__circle"
              stroke="#60a5fa"
              strokeWidth={stroke}
              fill="transparent"
              r={radius}
              cx={size / 2}
              cy={size / 2}
              style={{
                strokeDasharray: circumference,
                strokeDashoffset,
                transition: "stroke-dashoffset 0.3s",
              }}
            />
          </svg>
          <span className="percent center">{scrollPercent}%</span>
        </>
      )}
    </button>
  ) : null;
}
