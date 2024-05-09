import { contact, resources, footercourses } from "../constants/index.js";
import { RiMapPin5Line } from "react-icons/ri";
import { FiPhoneCall } from "react-icons/fi";
import { CgFacebook } from "react-icons/cg";
import { BsTwitter, BsDot } from "react-icons/bs";
import { TiSocialLinkedin } from "react-icons/ti";
import { BiLogoPinterestAlt } from "react-icons/bi";
import { PiInstagramLogo } from "react-icons/pi";
import { ScrollToTop } from "../helpers/scroll-to-top.jsx";
import { useEffect, useState } from "react";
import { getAPI } from "@/services/fetchAPI";

export const Footer = () => {
  const [contact, setContact] = useState([]);
  const [resources, setResources] = useState([]);
  const [courses, setCourses] = useState([]);
  const [bgColor, setBgColor] = useState("");
  const [textColor, setTextColor] = useState(""); // Değişken ismi düzeltildi, küçük harf kullanıldı
  useEffect(() => {
    const textColorData = getAPI("/home/HomeTextColor"); // textColorData tanımlandı
    textColorData
      .then(function (result) {
        console.log(result);
        const mainTextColorInfo = result.find(
          (item) => item.pageId === "footer"
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
        const mainBgColorInfo = result.find((item) => item.pageId === "footer");
        if (mainBgColorInfo) {
          setBgColor(mainBgColorInfo.bgColor);
        } else {
          console.log("Main page için bgColor bulunamadı.");
        }
      })
      .catch(function (error) {
        console.error("Hata oluştu:", error);
      });
    const infoData = getAPI("/home/HomeContact");
    infoData
      .then(function (result) {
        console.log(result[0]);
        setContact(result[0]);
      })
      .catch(function (error) {
        console.error("Hata oluştu:", error);
      });
    const resourceData = getAPI("/home/HomeResources");
    resourceData
      .then(function (result) {
        console.log(result);
        setResources(result);
      })
      .catch(function (error) {
        console.error("Hata oluştu:", error);
      });
    const courseData = getAPI("/home/HomeFooterCourses");
    courseData
      .then(function (result) {
        console.log(result);
        setCourses(result);
      })
      .catch(function (error) {
        console.error("Hata oluştu:", error);
      });
  }, []);
  const { phone, mapUrl, address } = contact;
  return (
    <>
      <div
        className=" text-center grid lg:grid-cols-4 md:grid-cols-2 md:text-start my-20 container mx-auto"
        style={{ backgroundColor: bgColor, color: textColor }}
      >
        <div>
          <ul className="text-cst_grey flex flex-col gap-3 leading-7">
            <li className="text-cst_purple font-semibold text-xl pb-3">
              Çalışkan Arı Yayınları
            </li>
            <li>En çok satılan yayın evi.</li>
            <li>
              <a
                className="flex items-center gap-2 justify-center md:justify-start"
                href={mapUrl}
                rel="noreferrer"
                target="_blank"
              >
                <span className="text-tabs text-lg">
                  <RiMapPin5Line />
                </span>
                {address}
              </a>
            </li>
            <li>
              <a
                href={`tel:${phone}`}
                className="flex items-center justify-center md:justify-start gap-2"
              >
                <span className="text-tabs text-lg">
                  <FiPhoneCall />
                </span>
                {phone}
              </a>
            </li>
          </ul>
          <ul className="flex text-cst_grey gap-5 mt-5 text-lg md:justify-start justify-center">
            <li className="bg-card rounded-full p-2 hover:bg-buttonColor hover:text-white">
              <a href="#" target="_blank" rel="noopener noreferrer">
                <CgFacebook />
              </a>
            </li>
            <li className="bg-card rounded-full p-2 hover:bg-buttonColor hover:text-white">
              <a href="#" target="_blank" rel="noopener noreferrer">
                <BsTwitter />
              </a>
            </li>
            <li className="bg-card rounded-full p-2 hover:bg-buttonColor hover:text-white">
              <a href="#" target="_blank" rel="noopener noreferrer">
                <TiSocialLinkedin />
              </a>
            </li>
            <li className="bg-card rounded-full p-2 hover:bg-buttonColor hover:text-white">
              <a href="#" target="_blank" rel="noopener noreferrer">
                <BiLogoPinterestAlt />
              </a>
            </li>
            <li className="bg-card rounded-full p-2 hover:bg-buttonColor hover:text-white">
              <a href="#" target="_blank" rel="noopener noreferrer">
                <PiInstagramLogo />
              </a>
            </li>
          </ul>
        </div>
        <div>
          <ul className="text-cst_grey flex flex-col gap-3 leading-7 mt-7">
            <li className="text-cst_purple font-semibold text-xl pb-3">
              Kaynaklar
            </li>
            {resources.map((item, index) => (
              <li key={index}> {item.label} </li>
            ))}
          </ul>
        </div>
        <div>
          <ul className="text-cst_grey flex flex-col gap-3 leading-7 mt-7">
            <li className="text-cst_purple font-semibold text-xl pb-3">
              Kurslar
            </li>
            {courses.map((item, index) => (
              <li key={index}>{item.label}</li>
            ))}
          </ul>
        </div>
        <div>
          <ul className="text-cst_grey flex flex-col gap-3 leading-7 mt-7">
            <li className="text-cst_purple font-semibold text-xl pb-3">
              Haber Kanalımıza Katılın.
            </li>
            <li>
              Haber kanalımıza kayıt olarak en güncel bilgilerden haberdar
              olabilirsiniz.
            </li>
            <li className="relative flex">
              <input
                type="text"
                name="email"
                id="email"
                className="block w-full bg-white rounded-lg border-0 py-4 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 sm:text-sm sm:leading-6 mx-3 sm:mx-0"
                placeholder="E-mail Adresiniz"
              />
              <div className="absolute inset-y-0 right-2 flex items-center">
                <button className="hover:bg-cst_purple hover:text-white flex gap-2 px-3 py-2 items-center bg-buttonColor rounded-lg text-white text-lg hover:bg-cst_purple mx-3 sm:mx-0">
                  Üye Ol
                </button>
              </div>
            </li>
            <li>Yalnızca İlginç ve İlgili E-postalar Göndeririz.</li>
          </ul>
        </div>
      </div>
      <div className="lg:flex lg:justify-around  bg-cream pt-8 pb-5 text-cst_grey text-center text-sm relative">
        <p>
          © Çalışkan Arı Tüm hakları saklıdır. İzinsiz kullanılması yasaktır.
        </p>

        <ScrollToTop />
      </div>
    </>
  );
};
