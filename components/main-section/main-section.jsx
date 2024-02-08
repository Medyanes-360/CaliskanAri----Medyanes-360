import { info, image } from "../constants/index";
import { CustomButton } from "../helpers/custom-button";
import {motion} from "framer-motion"
import "./main-section.css"

const MainSection = () => {
  const { desc1, desc2 } = info;
  const { mainSection,underline,book,pencil,wave,star } = image;
  return (
    <div className="bg-cream pt-10 xl:pt-[0px] main-section-hover">
      <div className=" flex flex-col md:flex-row items-center justify-between container mx-auto pb-32">
        <div className="flex flex-col gap-6 items-start justify-center px-8">
          <p className="text-cst_grey text-sm">{desc1}</p>
          <div>
          <h1 className="text-6xl relative text-cst_purple font-semibold">
           Start Learning From Our Top <span className="main-section py-2 px-8 bg-no-repeat bg-bottom bg">&nbsp;</span> Experts
          <img src={underline} alt="" className="absolute mt-2"/>

          </h1>
          </div>

          <p className="text-cst_grey text-s">{desc2}</p>
          <CustomButton title="Explore All Courses"/>
        </div>
        <div className="w-full pt-20 md:pt-4 lg:pl-48 px-8 relative">
          <img src={mainSection} alt="" />
         <div className="main-section-icons">
         <motion.img
      src={book}
      alt=""
      className="hidden md:flex absolute top-60"
      animate={{
        y: [0, -20, 0],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
      }}
    />
         <motion.img src={pencil} alt="" className="hidden md:flex absolute left-3/4 top-3/4"
          animate={{
            y: [0, -20, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
         />
         <motion.img
      src={wave}
      alt=""
      className="hidden md:flex absolute top-10 right-36"
      animate={{
        y: [0, -20, 0], // Y koordinatındaki hareket
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
      }}
    />

          <motion.img  src={star} alt="" className="hidden md:flex absolute bottom-3/4 left-1/4"/>
         </div>
        </div>
      </div>
    </div>
  );
};

export default MainSection;
