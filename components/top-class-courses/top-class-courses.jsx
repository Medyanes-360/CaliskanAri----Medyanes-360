import { image } from "../constants/index";
import { TopCoursesCard } from "./top-courses-card";
import { useEffect, useState } from "react";
import { getAPI } from "@/services/fetchAPI";

export const TopClassCourses = () => {
  const [info, setInfo] = useState([]);
  const [bgColor, setBgColor] = useState("");
  const [textColor, setTextColor] = useState(""); // Değişken ismi düzeltildi, küçük harf kullanıldı
  useEffect(() => {
    const textColorData = getAPI("/home/HomeTextColor"); // textColorData tanımlandı
    textColorData
      .then(function (result) {
        console.log(result);
        const mainTextColorInfo = result.find(
          (item) => item.pageId === "courses"
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

    const bgColorData = getAPI("/home/HomeBgColor");
    bgColorData
      .then(function (result) {
        console.log(result);
        const mainBgColorInfo = result.find(
          (item) => item.pageId === "courses"
        );
        if (mainBgColorInfo) {
          setBgColor(mainBgColorInfo.bgColor);
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
  const {
    classCoursesTitle1,
    classCoursesTitle2,
    classCoursesDesc1,
    classCoursesDesc2,
  } = info;
  return (
    <div className="" style={{ backgroundColor: bgColor, color: textColor }}>
      <div className="mx-auto container flex flex-col items-center justify-between p-6 ">
        <div className="flex flex-col justify-center items-center">
          <p className="text-sm  pb-5 pt-24">{classCoursesTitle1}</p>
          <h2 className=" text-4xl font-semibold">
            {classCoursesTitle2}
            <img src={image.underline} alt="" />
          </h2>
          <p className="text-base  pt-5 ">{classCoursesDesc1}</p>
          <p className="text-base ">{classCoursesDesc2}</p>
        </div>
        <TopCoursesCard />
      </div>
    </div>
  );
};
