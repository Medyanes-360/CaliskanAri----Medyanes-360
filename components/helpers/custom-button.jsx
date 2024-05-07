import { useState } from "react";
import { IoIosArrowRoundForward } from "react-icons/io";
import Link from "next/link";

export const CustomButton = ({
  title,
  href = "/",
  buttonColor = "#0169fd",
  hoverColor = "#001e9d",
  textColor = "white",
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const customStyle = {
    backgroundColor: isHovered ? hoverColor : buttonColor,
    color: isHovered ? "white" : textColor,
  };

  return (
    <Link target="_blank" href={href}>
      <button
        className="rounded-full px-10 py-4 text-s hover:bg-cst_purple transition-all duration-500 xl:mr-3 mt-3 flex items-center gap-2 text-center justify-center"
        style={customStyle}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {title}
        <span className="text-2xl">
          <IoIosArrowRoundForward />
        </span>
      </button>
    </Link>
  );
};
