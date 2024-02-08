import { motion, useScroll } from "framer-motion";
import { useEffect, useState } from "react";
import { IoArrowUp } from "react-icons/io5";

export const ScrollToTop = () => {
  const { scrollYProgress } = useScroll();
  const [isScrollFixed, setIsScrollFixed] = useState(false);

  const handleScrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const threshold = 100;

      setIsScrollFixed(scrollY > threshold);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <motion.div
      onClick={handleScrollTop}
      style={{
        pathLength: scrollYProgress,
        position: "fixed",
        bottom: isScrollFixed ? "20px" : "-100px",
        right: "8px",
        transition: "bottom 0.3s ease-in-out",
      }}
      className="border border-2 p-4 rounded-full text-buttonColor bg-transparent cursor-pointer border-buttonColor overflow-hidden z-50"
    >
      <IoArrowUp />
    </motion.div>
  );
};
