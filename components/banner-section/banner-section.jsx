"use client";
import { CustomButton } from "../helpers/custom-button";
import { image } from "../constants/index";
import "./banner-section.css";
import { useEffect, useState } from "react";
import { getAPI } from "@/services/fetchAPI";

export const BannerSection = () => {
  const [info, setInfo] = useState([]);
  useEffect(() => {
    const infoData = getAPI("/home/HomeInfo");
    infoData
      .then(function (result) {
        console.log(result);
        setInfo(result[0]);
      })
      .catch(function (error) {
        console.error("Hata oluştu:", error);
      });
  }, []);
  const { bannerTitle1, bannerTitle2 } = info;
  const { bannerShape } = image;

  return (
    <div className="h-full banner-section">
      <div className="pt-36 pb-36 bg-banner opacity-80 relative flex flex-col items-center">
        <p className="text-white text-sm p-3">{bannerTitle1}</p>
        <h2 className="text-white text-4xl font-semibold pb-10 px-8">
          {bannerTitle2}
        </h2>
        <div className="text-center bg-opacity-100 ">
          <CustomButton title="İletişime Geç" href="/iletisim" />
          <img src={bannerShape} alt="" className="absolute left-0 top-0" />
        </div>
      </div>
    </div>
  );
};
