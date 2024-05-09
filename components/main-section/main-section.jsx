import { CustomButton } from "../helpers/custom-button";
import { motion } from "framer-motion";
import "./main-section.css";
import { useEffect, useState } from "react";
import { getAPI } from "@/services/fetchAPI";

const MainSection = () => {
  const [info, setInfo] = useState([]);
  const [button, setButton] = useState([]);
  const [image, setImage] = useState([]);
  const [bgColor, setBgColor] = useState("");
  const [position, setPosition] = useState();
  const [textColor, setTextColor] = useState(""); // Değişken ismi düzeltildi, küçük harf kullanıldı
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
    const bgColorData = getAPI("/home/HomeBgColor");
    bgColorData
      .then(function (result) {
        console.log(result);
        const mainBgColorInfo = result.find((item) => item.pageId === "main");
        if (mainBgColorInfo) {
          setBgColor(mainBgColorInfo.bgColor);
        } else {
          console.log("Main page için bgColor bulunamadı.");
        }
      })
      .catch(function (error) {
        console.error("Hata oluştu:", error);
      });

    const buttonData = getAPI("/home/HomeButton");
    buttonData
      .then(function (result) {
        console.log(result);
        const mainButtonInfo = result.filter((item) => item.pageId === "main");
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

    const positionData = getAPI("/home/HomePosition");
    positionData
      .then(function (result) {
        console.log(result);
        const mainPositionInfo = result.find((item) => item.pageId === "main");
        if (mainPositionInfo) {
          setPosition(mainPositionInfo.position);
        } else {
          console.log("Main page için bgColor bulunamadı.");
        }
      })
      .catch(function (error) {
        console.error("Hata oluştu:", error);
      });
    const textColorData = getAPI("/home/HomeTextColor"); // textColorData tanımlandı
    textColorData
      .then(function (result) {
        console.log(result);
        const mainTextColorInfo = result.find((item) => item.pageId === "main");
        if (mainTextColorInfo) {
          setTextColor(mainTextColorInfo.TextColor); // setTextColor çağrısı düzeltildi
        } else {
          console.log("Main page için textColor bulunamadı."); // Log mesajı düzeltildi
        }
      })
      .catch(function (error) {
        console.error("Hata oluştu:", error);
      });

    const imageData = getAPI("/home/HomeImage"); // textColorData tanımlandı
    imageData
      .then(function (result) {
        console.log(result);
        setImage(result[0]);
      })
      .catch(function (error) {
        console.error("Hata oluştu:", error);
      });
  }, []);
  const { title, desc1, desc2 } = info;
  const { mainSection, underline, book, pencil, wave, star } = image;

  return (
    <div
      className={`xl:pt-[0px] main-section-hover`}
      style={{ backgroundColor: bgColor, color: textColor }} // textColor eklendi
    >
      <div
        className={` flex  ${
          position == 1
            ? "md:flex-row-reverse flex-col-reverse"
            : "md:flex-row flex-col"
        } items-center justify-between container mx-auto pb-20`}
      >
        <div
          className={`flex flex-col gap-6 item-center md:items-start ${
            position == 2 ? "xl:pl-32" : "xl:pl-0"
          } justify-center xl:w-1/2 px-8`}
        >
          <p className=" text-sm">{desc1}</p>
          <div>
            <h1 className="lg:text-6xl text-2xl relative  font-semibold">
              {title}
              <img
                src={underline}
                alt=""
                className="absolute mt-1 text pl-0 lg:pl-10"
              />
            </h1>
          </div>

          <p className=" text-s">{desc2}</p>

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
        </div>
        <div
          className={`w-full pt-10 md:pt-4 ${
            position == 1 ? "xl:pl-32" : "xl:pl-12"
          } relative scale-90 xl:w-1/2 px-8`}
        >
          <div className="main-section-icons">
            <img src={mainSection} className="xl:pl-20" alt="" />
            <motion.img
              src={book}
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
              src={pencil}
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
              src={wave}
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
              src={star}
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
