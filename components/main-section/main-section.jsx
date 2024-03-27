// import { info, image } from '../constants/index';
'use client';
import { useEffect, useState } from 'react';
import { CustomButton } from '../helpers/custom-button';
import { motion } from 'framer-motion';
import './main-section.css';

const MainSection = () => {
  // const { desc1, desc2 } = info;
  // const { mainSection,underline,book,pencil,wave,star } = image;

  const [image, setImage] = useState(null);
  const [info, setInfo] = useState(null);

  useEffect(() => {
    // TODO: database'e tasinacak
    const infoinLocalStorage = JSON.parse(
      localStorage.getItem('constants')
    )?.info;

    if (infoinLocalStorage) {
      const { desc1, desc2 } = infoinLocalStorage;
      setInfo({ desc1, desc2 });
    }

    // TODO: database'e tasinacak
    const imageinLocalStorage = JSON.parse(
      localStorage.getItem('constants')
    )?.image;

    if (imageinLocalStorage) {
      const { mainSection, underline, book, pencil, wave, star } =
        imageinLocalStorage;
      setImage({ mainSection, underline, book, pencil, wave, star });
    }
  }, []);

  return (
    <div className="bg-cream  xl:pt-[0px] main-section-hover">
      <div className=" flex flex-col md:flex-row items-center justify-between container mx-auto pb-20">
        <div className="flex flex-col gap-6 item-center md:items-start justify-center px-8">
          {/* <p className="text-cst_grey text-sm">{info?.desc1}</p> */}
          <div>
            <h1 className="lg:text-6xl text-2xl relative text-cst_purple font-semibold">
              Çalışkan Arı İle Öğrenmek Artık{' '}
              <span className="leading-relaxed main-section py-2 px-8 bg-no-repeat bg-bottom bg">
                &nbsp;
              </span>{' '}
              Çok Kolay
              <img
                src={image?.underline}
                alt=""
                className="absolute mt-1 text pl-0 lg:pl-10"
              />
            </h1>
          </div>

          <p className="text-cst_grey text-s">{info?.desc2}</p>
          <CustomButton title="Etkileşimli Alıştırmaları Keşfet" />
        </div>
        <div className="w-full pt-10 md:pt-4 xl:pl-48 px-8 relative scale-90">
          <img src={image?.mainSection || ''} alt="" />
          <div className="main-section-icons">
            <motion.img
              src={image?.book || ''}
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
            <motion.img
              src={image?.pencil || ''}
              alt=""
              className="hidden md:flex absolute left-3/4 top-3/4"
              animate={{
                y: [0, -20, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
            />
            <motion.img
              src={image?.wave || ''}
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

            <motion.img
              src={image?.star || ''}
              alt=""
              className="hidden md:flex absolute bottom-3/4 left-1/4"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainSection;
