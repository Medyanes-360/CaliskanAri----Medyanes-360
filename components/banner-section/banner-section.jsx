"use client";
import { CustomButton } from "../helpers/custom-button";
import "./banner-section.css";
import { useEffect, useState } from "react";
import { getAPI } from "@/services/fetchAPI";

export const BannerSection = () => {
  const [info, setInfo] = useState([]);
  const [button, setButton] = useState([]);
  const [image, setImage] = useState([]);
  const [textColor, setTextColor] = useState(""); // Değişken ismi düzeltildi, küçük harf kullanıldı
  useEffect(() => {
    const textColorData = getAPI("/home/HomeTextColor"); // textColorData tanımlandı
    textColorData
      .then(function (result) {
        console.log(result);
        const mainTextColorInfo = result.find(
          (item) => item.pageId === "informations"
        );
        if (mainTextColorInfo) {
          setTextColor(mainTextColorInfo.TextColor); // setTextColor çağrısı düzeltildi
        } else {
          console.log("Main page için textColor bulunamadı."); // Log mesajı düzeltildi
        }
      })
      .catch(function (error) {
        console.error("Hata oluştu:", error);
      });

    const imageData = getAPI("/home/HomeImage");
    imageData
      .then(function (result) {
        console.log(result);
        setImage(result[0]);
      })
      .catch(function (error) {
        console.error("Hata oluştu:", error);
      });

    const buttonData = getAPI("/home/HomeButton");
    buttonData
      .then(function (result) {
        console.log(result);
        const mainButtonInfo = result.filter(
          (item) => item.pageId === "banner"
        );
        console.log(mainButtonInfo);
        if (mainButtonInfo.length > 0) {
          setButton(mainButtonInfo);
        } else {
          console.log("Main page için bgColor bulunamadı.");
        }
      })
      .catch(function (error) {
        console.error("Hata oluştu:", error);
      });

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
    <div className="h-full banner-section" style={{ color: textColor }}>
      <div className="pt-36 pb-36 bg-banner opacity-80 relative flex flex-col items-center">
        <p className=" text-sm p-3">{bannerTitle1}</p>
        <h2 className=" text-4xl font-semibold pb-10 px-8">{bannerTitle2}</h2>
        <div className="text-center bg-opacity-100 ">
          {button !== null && (
            <div className="ButtonArea xl:flex">
              {button.map((buttonSingle, index) => (
                <CustomButton
                  key={index}
                  title={buttonSingle.title}
                  href={buttonSingle.addressLink}
                  buttonColor={buttonSingle.color}
                  textColor={buttonSingle.textColor}
                  hoverColor={buttonSingle.hoverColor}
                />
              ))}
            </div>
          )}
          <img src={bannerShape} alt="" className="absolute left-0 top-0" />
        </div>
      </div>
    </div>
  );
};
