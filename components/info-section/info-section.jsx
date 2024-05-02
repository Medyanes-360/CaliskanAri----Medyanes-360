import { motion } from "framer-motion";
import "./info-section.css";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getAPI } from "@/services/fetchAPI";

export const InfoSection = () => {
  const [bgColor, setBgColor] = useState("");
  const [informations, setInformations] = useState([]);
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

    const infoData = getAPI("/home/HomeInformation");
    infoData
      .then(function (result) {
        console.log(result);
        setInformations(result);
      })
      .catch(function (error) {
        console.error("Hata oluştu:", error);
      });
    const bgColorData = getAPI("/home/HomeBgColor");
    bgColorData
      .then(function (result) {
        console.log(result);
        const mainBgColorInfo = result.find(
          (item) => item.pageId === "informations"
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
  }, []);
  return (
    <div
      className=" info-section bg-center bg-cover py-16"
      style={{ backgroundColor: bgColor, color: textColor }}
    >
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:p-6 ">
        {informations.map((item) => (
          <motion.div key={item.title} className="hoverable-div">
            <div className="flex items-center gap-4 py-5 px-8 info-section-icons">
              <motion.span className={`text-4xl ${item.color}  `}>
                <Image src={item.icon} width={80} height={80} alt={item.icon} />
              </motion.span>
              <span className="flex flex-col gap-2">
                <p className="text-xl">{item.title}</p>
                <p className="text-base ">{item.description}</p>
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
