import { CustomButton } from "../helpers/custom-button";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { getAPI } from "@/services/fetchAPI";
const LearnersStudents = () => {
  const [info, setInfo] = useState([]);
  const [bgColor, setBgColor] = useState("");
  const [image, setImage] = useState([]);
  const [position, setPosition] = useState();
  const [button, setButton] = useState([]);
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
          (item) => item.pageId === "students"
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

    const positionData = getAPI("/home/HomePosition");
    positionData
      .then(function (result) {
        console.log(result);
        const mainPositionInfo = result.find(
          (item) => item.pageId === "students"
        );
        if (mainPositionInfo) {
          setPosition(mainPositionInfo.position);
        } else {
          console.log("Main page için bgColor bulunamadı.");
        }
      })
      .catch(function (error) {
        console.error("Hata oluştu:", error);
      });
  }, []);
  const { studentPhoto, underline, redCrown } = image;
  const {
    learnersStudentsTitle1,
    learnersStudentsTitle2,
    learnersStudentsDesc,
  } = info;
  return (
    <div className="" style={{ backgroundColor: bgColor, color: textColor }}>
      <div
        className={`container mx-auto flex  ${
          position == 1
            ? "md:flex-row flex-col"
            : "md:flex-row-reverse flex-col-reverse"
        } items-center justify-center pb-0 p-6`}
      >
        <div className="xl:w-1/2 mt-3 xl:mt-0 relative mx-4 flex items-center justify-center">
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
        <div
          className={`flex ${
            position == 2 ? "xl:pl-36" : "xl:pl-0"
          } flex-col gap-6 xl:w-1/2`}
        >
          <p className="text-sm  pt-8">{learnersStudentsTitle1}</p>
          <div>
            <h2 className="text-4xl  font-semibold relative">
              {learnersStudentsTitle2}
              <img src={underline} alt="" className="absolute " />
            </h2>
          </div>
          <p className="text-base ">{learnersStudentsDesc}</p>
          <div>
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
        </div>
      </div>
    </div>
  );
};

export default LearnersStudents;
