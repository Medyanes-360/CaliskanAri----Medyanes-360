'use client';
import { useEffect, useState } from 'react';
import { CustomButton } from '../helpers/custom-button';
import './banner-section.css';

export const BannerSection = () => {
  const [bannerTitle1, setBannerTitle1] = useState(null);
  const [bannerTitle2, setBannerTitle2] = useState(null);
  const [bannerShape, setBannerShape] = useState(null);

  useEffect(() => {
    const infoinLocalStorage = JSON.parse(
      localStorage.getItem('constants')
    )?.info;

    if (infoinLocalStorage) {
      setBannerTitle1(infoinLocalStorage.bannerTitle1);
      setBannerTitle2(infoinLocalStorage.bannerTitle2);
    }

    const imageinLocalStorage = JSON.parse(
      localStorage.getItem('constants')
    )?.image;

    if (imageinLocalStorage) {
      setBannerShape(imageinLocalStorage.bannerShape);
    }
  }, []);

  return (
    <div className="h-full banner-section">
      <div className="pt-36 pb-36 bg-banner opacity-80 relative flex flex-col items-center">
        <p className="text-white text-sm p-3">
          {bannerTitle1 ? bannerTitle1 : null}
        </p>
        <h2 className="text-white text-4xl font-semibold pb-10 px-8">
          {bannerTitle2 ? bannerTitle2 : null}
        </h2>
        <div className="text-center bg-opacity-100 ">
          <CustomButton title="İletişime Geç" href="/iletisim" />
          <img
            src={bannerShape ? bannerShape : null}
            alt=""
            className="absolute left-0 top-0"
          />
        </div>
      </div>
    </div>
  );
};
