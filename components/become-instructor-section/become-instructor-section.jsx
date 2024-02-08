import { CustomButton } from '../helpers/custom-button';
import {info,image} from "../constants/index";
import {motion} from "framer-motion"
export const BecomeInstructorSection = () => {
    const {beInstractorTitle1,beInstractorTitle2,beInstractorDesc} = info
    const {beinstractor,redCrown,halfCricle,purpleCrown}=image
  return (
    <div className='bg-cream pt-10'>
        <div className="mx-auto container flex flex-col items-center justify-center lg:flex-row p-6">
<div className='flex flex-col items-start gap-5 mb-10 lg:pb-0'>
    <p className='text-cst_grey text-sm'>{beInstractorTitle1}</p>
    <h2 className='text-cst_purple text-4xl font-semibold'>{beInstractorTitle2}</h2>
    <p className='text-cst_grey text-base'>{beInstractorDesc}</p>
    <CustomButton title="Become An Instructor"/>
</div>
<div className='w-full relative '>
    <img src={beinstractor} alt="" />
   <div >
   <motion.img  animate={{
        y: [0, -20, 0], // Y koordinatındaki hareket
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
      }} src={redCrown} alt="" className='hidden md:flex absolute top-24 left-32'  />
    <motion.img src={halfCricle} alt="" className='hidden md:flex absolute top-0 right-24'  />
    <motion.img  animate={{
        y: [0, -20, 0], // Y koordinatındaki hareket
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
      }} src={purpleCrown} alt="" className='hidden md:flex absolute right-72 bottom-60' />
   </div>



</div>
        </div>
    </div>
  )
}
