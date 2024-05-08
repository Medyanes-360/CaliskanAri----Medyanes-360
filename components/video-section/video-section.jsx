import { Tab, TabPanel, Tabs, TabsList } from "@mui/base";
import "./video-section.css";
import { GoVideo } from "react-icons/go";
import { AiOutlineControl } from "react-icons/ai";
import { BsBoxes } from "react-icons/bs";
import { FaPlay } from "react-icons/fa";
import { useEffect, useState } from "react";
import { getAPI } from "@/services/fetchAPI";

export const VideoSection = () => {
  const [info, setInfo] = useState([]);
  const [position, setPosition] = useState();
  const [bgColor, setBgColor] = useState("");
  const [image, setImage] = useState([]);
  const [textColor, setTextColor] = useState(""); // Değişken ismi düzeltildi, küçük harf kullanıldı
  useEffect(() => {
    const textColorData = getAPI("/home/HomeTextColor"); // textColorData tanımlandı
    textColorData
      .then(function (result) {
        console.log(result);
        const mainTextColorInfo = result.find(
          (item) => item.pageId === "video"
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

    const bgColorData = getAPI("/home/HomeBgColor");
    bgColorData
      .then(function (result) {
        console.log(result);
        const mainBgColorInfo = result.find((item) => item.pageId === "video");
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
        const mainPositionInfo = result.find((item) => item.pageId === "video");
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
  const {
    videoTitle1,
    video,
    videoTitle2,
    videoTitle3,
    videoTitle4,
    videoDesc1,
    videoDesc2,
    videoDesc3,
  } = info;
  const { videoCover, underline } = image;
  return (
    <div
      className={` video-section  bg-left-top bg-no-repeat pt-8 `}
      style={{ backgroundColor: bgColor, color: textColor }}
    >
      <div
        className={`flex-col items-center  justify-center mx-auto container `}
      >
        <div
          className={`flex flex-col items-center justify-center  mb-5 lg:mb-0 px-8 lg:px-0`}
        >
          <h2 className="text-4xl relative">
            {videoTitle1}
            <img src={underline} alt="" className="absolute right-0" />
          </h2>
        </div>
        <div
          className={`flex items-center justify-center py-10 px-8  ${
            position == 1
              ? "md:flex-row flex-col"
              : "md:flex-row-reverse flex-col-reverse"
          } lg:px-0`}
        >
          <div
            className={`xl:w-1/2 ${position == 1 ? "xl:pl-36" : "xl:pl-20"} `}
          >
            <Tabs defaultValue={0} orientation="vertical" className="flex">
              <TabsList className="flex flex-col items-start pl-2 gap-10">
                <div>
                  <Tab className="text-xl flex items-center gap-3">
                    <span className="text-4xl">
                      <GoVideo />
                    </span>
                    {videoTitle2}
                  </Tab>
                  <TabPanel className="text-base text-tabs pt-3" value={0}>
                    {videoDesc1}
                  </TabPanel>
                </div>
                <div>
                  <Tab className=" text-xl flex items-center gap-3">
                    <span className="text-4xl">
                      <AiOutlineControl />
                    </span>
                    {videoTitle3}
                  </Tab>
                  <TabPanel className="text-base text-tabs pt-3" value={1}>
                    {videoDesc2}
                  </TabPanel>
                </div>
                <div>
                  <Tab className=" text-xl flex items-center gap-3">
                    <span className="text-4xl">
                      <BsBoxes />
                    </span>
                    {videoTitle4}
                  </Tab>
                  <TabPanel className="text-base text-tabs pt-3" value={2}>
                    {videoDesc3}
                  </TabPanel>
                </div>
              </TabsList>
            </Tabs>
          </div>

          <div
            className={`w-full mt-10 lg:mt-0 hover:scale-105 transition-all ${
              position == 2 ? "xl:pl-48" : "xl:pl-0"
            } flex items-center justify-center xl:w-1/2`}
          >
            <a
              href={video}
              target="_blank"
              rel="noopener noreferrer"
              className="relative"
            >
              <img
                src={videoCover}
                alt=""
                className="video-cover bg-videocover bg-no-repeat bg-bottom"
              />

              <span className="absolute right-2/4 bottom-2/4 rounded-full bg-white text-buttonColor w-16 h-16 flex items-center justify-center">
                <FaPlay />
              </span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
