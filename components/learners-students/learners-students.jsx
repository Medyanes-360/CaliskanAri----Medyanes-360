'use client';
import { useEffect, useState } from 'react';
import { CustomButton } from '../helpers/custom-button';
import { motion } from 'framer-motion';

const LearnersStudents = () => {
  const [image, setImage] = useState(null);
  const [info, setInfo] = useState(null);

  useEffect(() => {
    // TODO: database'e tasinacak
    const infoinLocalStorage = JSON.parse(
      localStorage.getItem('constants')
    )?.info;

    if (infoinLocalStorage) {
      const {
        learnersStudentsTitle1,
        learnersStudentsTitle2,
        learnersStudentsDesc,
      } = infoinLocalStorage;
      setInfo({
        learnersStudentsTitle1,
        learnersStudentsTitle2,
        learnersStudentsDesc,
      });
    }

    // TODO: database'e tasinacak
    const imageinLocalStorage = JSON.parse(
      localStorage.getItem('constants')
    )?.image;

    if (imageinLocalStorage) {
      const { studentPhoto, underline, redCrown } = imageinLocalStorage;
      setImage({ studentPhoto, underline, redCrown });
    }
  }, []);

  return (
    <div className="bg-cream">
      <div className="container mx-auto flex flex-col lg:flex-row items-center justify-center p-6">
        <div className="w-full relative mx-4">
          <img src={image?.studentPhoto || ''} alt="" />
          <motion.img
            animate={{
              y: [0, -20, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
            src={image?.redCrown || ''}
            alt=""
            className="absolute top-6 left-32 hidden md:flex"
          />
        </div>
        <div className="flex flex-col gap-6">
          <p className="text-sm text-cst_grey pt-8">
            {info?.learnersStudentsTitle1}
          </p>
          <div>
            <h2 className="text-4xl text-cst_purple font-semibold relative">
              {info?.learnersStudentsTitle2}
              <img src={image?.underline || ''} alt="" className="absolute " />
            </h2>
          </div>
          <p className="text-base text-cst_grey">
            {info?.learnersStudentsDesc}
          </p>
          <div>
            <CustomButton title="Etkileşimli Alıştırmaları Keşfet" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearnersStudents;
