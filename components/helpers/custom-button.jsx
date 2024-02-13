import { useState } from "react";
import { IoIosArrowRoundForward } from "react-icons/io";

export const CustomButton = ({ title, buttonColor = "#543EE8",hoverColor="#241442", textColor = "white" }) => {
  const [isHovered, setIsHovered] = useState(false);
  const customStyle = {
    backgroundColor: isHovered ? hoverColor : buttonColor,
    color: isHovered ? "white" : textColor,
  };

  return (
    <button className='rounded-full px-10 py-4 text-s hover:bg-cst_purple flex items-center gap-2 text-center justify-center' style={customStyle}
    onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {title}
      <span className="text-2xl"><IoIosArrowRoundForward /></span>
    </button>
  );
};
