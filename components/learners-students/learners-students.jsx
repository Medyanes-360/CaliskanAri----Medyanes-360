import { image, info } from "../constants/index";
import { CustomButton } from "../helpers/custom-button";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { getAPI } from "@/services/fetchAPI";
const LearnersStudents = () => {
  const { studentPhoto, underline, redCrown } = image;
  const [info, setInfo] = useState([]);
  const [bgColor, setBgColor] = useState("");
  const [textColor, setTextColor] = useState(""); // Değişken ismi düzeltildi, küçük harf kullanıldı
  useEffect(() => {
    const textColorData = getAPI("/home/HomeTextColor"); // textColorData tanımlandı
    textColorData
      .then(function (result) {
        console.log(result);
        const mainTextColorInfo = result.find(
          (item) => item.pageId === "students"
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
          (item) => item.pageId === "students"
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
    learnersStudentsTitle1,
    learnersStudentsTitle2,
    learnersStudentsDesc,
  } = info;
  return (
    <div className="" style={{ backgroundColor: bgColor, color: textColor }}>
      <div className="container mx-auto flex flex-col lg:flex-row items-center justify-center p-6">
        <div className="w-full relative mx-4">
          <img src={studentPhoto} alt="" />
          <motion.img
            animate={{
              y: [0, -20, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
            src={redCrown}
            alt=""
            className="absolute top-6 left-32 hidden md:flex"
          />
        </div>
        <div className="flex flex-col gap-6">
          <p className="text-sm  pt-8">{learnersStudentsTitle1}</p>
          <div>
            <h2 className="text-4xl  font-semibold relative">
              {learnersStudentsTitle2}
              <img src={underline} alt="" className="absolute " />
            </h2>
          </div>
          <p className="text-base ">{learnersStudentsDesc}</p>
          <div>
            <CustomButton title="Etkileşimli Alıştırmaları Keşfet" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearnersStudents;
