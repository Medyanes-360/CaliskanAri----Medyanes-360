'use client';
import { useEffect, useState } from 'react';
import { CustomButton } from '../helpers/custom-button';
import { motion } from 'framer-motion';
export const BecomeInstructorSection = () => {
  const [info, setInfo] = useState(null);
  const [image, setImage] = useState(null);

  useEffect(() => {
    const infoinLocalStorage = JSON.parse(
      localStorage.getItem('constants')
    )?.info;
    if (infoinLocalStorage) {
      const { beInstractorTitle1, beInstractorTitle2, beInstractorDesc } =
        infoinLocalStorage;
      setInfo({ beInstractorTitle1, beInstractorTitle2, beInstractorDesc });
    }

    const imageinLocalStorage = JSON.parse(
      localStorage.getItem('constants')
    )?.image;
    if (imageinLocalStorage) {
      const { beinstractor, redCrown, halfCricle, purpleCrown } =
        imageinLocalStorage;
      setImage({ beinstractor, redCrown, halfCricle, purpleCrown });
    }
  }, []);

  return (
    <div className="bg-cream pt-10">
      <div className="mx-auto container flex flex-col items-center justify-center lg:flex-row p-6">
        <div className="flex flex-col items-start gap-5 mb-10 lg:pb-0">
          <p className="text-cst_grey text-sm">{info?.beInstractorTitle1}</p>
          <h2 className="text-cst_purple text-4xl font-semibold">
            {info?.beInstractorTitle2}
          </h2>
          <p className="text-cst_grey text-base">{info?.beInstractorDesc}</p>
          <CustomButton title="Become An Instructor" />
        </div>
        <div className="w-full relative ">
          <img src={image?.beinstractor || ''} alt="" />
          <div>
            <motion.img
              animate={{
                y: [0, -20, 0], // Y koordinatındaki hareket
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
              src={image?.redCrown || ''}
              alt=""
              className="hidden md:flex absolute top-24 left-32"
            />
            <motion.img
              src={image?.halfCricle || ''}
              alt=""
              className="hidden md:flex absolute top-0 right-24"
            />
            <motion.img
              animate={{
                y: [0, -20, 0], // Y koordinatındaki hareket
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
              src={image?.purpleCrown || ''}
              alt=""
              className="hidden md:flex absolute right-72 bottom-60"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
