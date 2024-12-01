import React, { useState, useEffect } from "react";

import { FaChevronUp } from "react-icons/fa";

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled down
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 100) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  // Scroll to top when button is clicked
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Smooth scrolling
    });
  };

  return (
    <div>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-[10%] right-[2%] md:p-4 p-3 rounded-full bg-[#ff6162] text-white shadow-lg hover:bg-[#c84c52a8] transition duration-300 z-[1000]"
          aria-label="Scroll to top"
        >
          <FaChevronUp className="md:text-[22px] text-[18px]" />
        </button>
      )}
    </div>
  );
};

export default ScrollToTop;
