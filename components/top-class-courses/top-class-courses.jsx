'use client';
import { useEffect, useState } from 'react';
import { TopCoursesCard } from './top-courses-card';

export const TopClassCourses = () => {
  const [image, setImage] = useState(null);
  const [info, setInfo] = useState(null);

  useEffect(() => {
    const infoinLocalStorage = JSON.parse(
      localStorage.getItem('constants')
    )?.info;

    if (infoinLocalStorage) {
      const {
        classCoursesTitle1,
        classCoursesTitle2,
        classCoursesDesc1,
        classCoursesDesc2,
      } = infoinLocalStorage;
      setInfo({
        classCoursesTitle1,
        classCoursesTitle2,
        classCoursesDesc1,
        classCoursesDesc2,
      });
    }

    const imageinLocalStorage = JSON.parse(
      localStorage.getItem('constants')
    )?.image;

    if (imageinLocalStorage) {
      setImage(imageinLocalStorage);
    }
  }, []);

  return (
    <div className="bg-cream">
      <div className="mx-auto container flex flex-col items-center justify-between p-6 ">
        <div className="flex flex-col justify-center items-center">
          <p className="text-sm text-cst_grey pb-5 pt-24">
            {info?.classCoursesTitle1}
          </p>
          <h2 className="text-cst_purple text-4xl font-semibold">
            {info?.classCoursesTitle2}
            <img src={image?.underline} alt="" />
          </h2>
          <p className="text-base text-cst_grey pt-5 ">
            {info?.classCoursesDesc1}
          </p>
          <p className="text-base text-cst_grey">{info?.classCoursesDesc2}</p>
        </div>
        <TopCoursesCard />
      </div>
    </div>
  );
};
