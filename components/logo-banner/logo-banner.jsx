import { useEffect, useState } from "react";
import { getAPI } from "@/services/fetchAPI";

export const LogoBanner = () => {
  const [logobanner, setLogobanner] = useState([]);
  const [info, setInfo] = useState([]);
  const [bgColor, setBgColor] = useState("");
  const [textColor, setTextColor] = useState(""); // Değişken ismi düzeltildi, küçük harf kullanıldı
  useEffect(() => {
    const textColorData = getAPI("/home/HomeTextColor"); // textColorData tanımlandı
    textColorData
      .then(function (result) {
        console.log(result);
        const mainTextColorInfo = result.find(
          (item) => item.pageId === "logoBanner"
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
          (item) => item.pageId === "logoBanner"
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
    const logoBannerData = getAPI("/home/HomeLogoBanner");
    logoBannerData
      .then(function (result) {
        console.log(result);
        setLogobanner(result);
      })
      .catch(function (error) {
        console.error("Hata oluştu:", error);
      });
  }, []);
  const { clientTitle1, clientTitle2, clientDesc } = info;
  return (
    <div
      className="py-24 sm:py-32"
      style={{ backgroundColor: bgColor, color: textColor }}
    >
      <div className="mx-auto container px-6">
        <h2 className="text-center text-2xl  font-semibold leading-8 ">
          {clientTitle1}
        </h2>
        <h2 className="text-center text-lg  font-semibold leading-8 ">
          {clientTitle2}
        </h2>
        <p className="text-center  text-base pt-4">{clientDesc}</p>
        <div className=" mt-10 flex flex-row gap-10 justify-around">
          {logobanner.map((item, index) => (
            <a href={item.link ? item.link : "#"} key={index}>
              <img
                className="col-span-2 max-h-32 w-full object-contain lg:col-span-1 saturate-0 hover:saturate-100 transition duration-700 delay-150 ease-in-out"
                src={item.logo}
                alt="Transistor"
                width={158}
                height={48}
              />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
