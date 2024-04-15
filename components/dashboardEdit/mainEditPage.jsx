"use client";

import React, { useState } from "react";
import EditBox from "./EditBox";
import Image from "next/image";
import DetailEdits from "./detailEdits";
import changeNavbar from "@/assets/icons/dashboardEditIcons/changeNavbar.png";
import changeBannerSection from "@/assets/icons/dashboardEditIcons/changeBannerSection.png";
import changeCourseSection from "@/assets/icons/dashboardEditIcons/changeCourseSection.png";
import changeFeatureSection from "@/assets/icons/dashboardEditIcons/changeFeatureSection.png";
import changeFooterSection from "@/assets/icons/dashboardEditIcons/changeFooterSection.png";
import changeInfoSection from "@/assets/icons/dashboardEditIcons/changeInfoSection.png";
import changeMainSection from "@/assets/icons/dashboardEditIcons/changeMainSection.png";
import changeStudentsSection from "@/assets/icons/dashboardEditIcons/changeStudentsSection.png";
import changeLogoBannerSection from "@/assets/icons/dashboardEditIcons/changeLogoBannerSection.png";
import changeVideoSection from "@/assets/icons/dashboardEditIcons/changeVideoSection.png";
import backArrow from "@/assets/icons/dashboardEditIcons/backArrow.png";

function MainEditPage() {
  const [selectedBox, setSelectedBox] = useState(null);
  const [animation, setAnimation] = useState(
    "animate__animated animate__fadeInLeft"
  );
  const [animation1, setAnimation1] = useState(
    "animate__animated animate__fadeInLeft"
  );

  const handleBoxClick = (id) => {
    setAnimation("animate__animated animate__fadeInLeft");
    setAnimation1("animate__animated animate__fadeOutLeft");
    setTimeout(() => {
      setSelectedBox(id);
    }, 500);
  };
  const goBack = () => {
    setAnimation("animate__animated animate__fadeOutLeft");
    setAnimation1("animate__animated animate__fadeInLeft");
    setTimeout(() => {
      setSelectedBox(null);
    }, 500);
  };

  return (
    <>
      {selectedBox === null && (
        <div className={`flex flex-row flex-wrap editBoxesArea ${animation1}`}>
          <EditBox
            id="navbar"
            description={"Buradan navbarı değiştirebilirsiniz"}
            image={changeNavbar}
            title={"Navbar Alanını Değiştir"}
            onClick={() => handleBoxClick("navbar")}
          />
          <EditBox
            id="main"
            description={"Buradan Main alanını değiştirebilirsiniz"}
            image={changeMainSection}
            title={"Main Alanını Değiştir"}
            onClick={() => handleBoxClick("main")}
          />
          <EditBox
            id="info"
            description={"Buradan info alanını değiştirebilirsiniz"}
            image={changeInfoSection}
            title={"Bilgiler Alanını Değiştir"}
            onClick={() => handleBoxClick("info")}
          />
          <EditBox
            id="course"
            description={"Buradan kurslarım alanını değiştirebilirsiniz"}
            image={changeCourseSection}
            title={"Kurslarım Alanını Değiştir"}
            onClick={() => handleBoxClick("course")}
          />
          <EditBox
            id="students"
            description={
              "Buradan Learners and Students alanını değiştirebilirsiniz"
            }
            image={changeStudentsSection}
            title={"Öğrenciler Alanını Değiştir"}
            onClick={() => handleBoxClick("students")}
          />
          <EditBox
            id="features"
            description={"Buradan özellikler alanını değiştirebilirsiniz"}
            image={changeFeatureSection}
            title={"Özellikler Alanını Değiştir"}
            onClick={() => handleBoxClick("features")}
          />
          <EditBox
            id="video"
            description={"Buradan video alanını değiştirebilirsiniz"}
            image={changeVideoSection}
            title={"Video Alanını Değiştir"}
            onClick={() => handleBoxClick("video")}
          />
          <EditBox
            id="logoBanner"
            description={"Buradan logo ve banner alanını değiştirebilirsiniz"}
            image={changeLogoBannerSection}
            title={"Logo-Banner Alanını Değiştir"}
            onClick={() => handleBoxClick("logoBanner")}
          />
          <EditBox
            id="banner"
            description={"Buradan banner alanını değiştirebilirsiniz"}
            image={changeBannerSection}
            title={"Banner Alanını Değiştir"}
            onClick={() => handleBoxClick("banner")}
          />
          <EditBox
            id="footer"
            description={"Buradan Footer alanını değiştirebilirsiniz"}
            image={changeFooterSection}
            title={"Footer Alanını Değiştir"}
            onClick={() => handleBoxClick("footer")}
          />
        </div>
      )}
      {selectedBox !== null && (
        <>
          <div className="backButton">
            <button onClick={goBack}>
              <Image src={backArrow} width={20} height={20} alt={"back"} />
            </button>
          </div>
          <DetailEdits pageId={selectedBox} animation={animation} />
        </>
      )}
    </>
  );
}

export default MainEditPage;
