"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import EditBox from "./editBox";
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

function MainEditPage({ selected, setSelected }) {
  const router = useRouter();
  const [animation1, setAnimation1] = useState(
    "animate__animated animate__fadeInLeft"
  );

  const handleBoxClick = (id, path) => {
    router.push(path);
    setAnimation1("animate__animated animate__fadeOutLeft");
  };

  return (
    <>
      <div className={`flex flex-row flex-wrap editBoxesArea ${animation1}`}>
        <EditBox
          id="navbar"
          path="/edit-navbar"
          description={"Buradan navbarı değiştirebilirsiniz"}
          image={changeNavbar}
          title={"Navbar Alanını Değiştir"}
          onClick={() =>
            handleBoxClick("navbar", "/dashboard/admin/edit/edit-navbar")
          }
        />
        <EditBox
          id="main"
          path="/edit-main"
          description={"Buradan Main alanını değiştirebilirsiniz"}
          image={changeMainSection}
          title={"Main Alanını Değiştir"}
          onClick={() =>
            handleBoxClick("main", "/dashboard/admin/edit/edit-main")
          }
        />
        <EditBox
          id="info"
          path="/edit-informations"
          description={"Buradan info alanını değiştirebilirsiniz"}
          image={changeInfoSection}
          title={"Bilgiler Alanını Değiştir"}
          onClick={() =>
            handleBoxClick("info", "/dashboard/admin/edit/edit-informations")
          }
        />
        <EditBox
          id="course"
          path="/edit-courses"
          description={"Buradan kurslarım alanını değiştirebilirsiniz"}
          image={changeCourseSection}
          title={"Kurslarım Alanını Değiştir"}
          onClick={() =>
            handleBoxClick("course", "/dashboard/admin/edit/edit-courses")
          }
        />
        <EditBox
          id="students"
          path="/edit-students"
          description={
            "Buradan Learners and Students alanını değiştirebilirsiniz"
          }
          image={changeStudentsSection}
          title={"Öğrenciler Alanını Değiştir"}
          onClick={() =>
            handleBoxClick("students", "/dashboard/admin/edit/edit-students")
          }
        />
        <EditBox
          id="features"
          path="/edit-features"
          description={"Buradan özellikler alanını değiştirebilirsiniz"}
          image={changeFeatureSection}
          title={"Özellikler Alanını Değiştir"}
          onClick={() =>
            handleBoxClick("features", "/dashboard/admin/edit/edit-features")
          }
        />
        <EditBox
          id="video"
          path="/edit-video"
          description={"Buradan video alanını değiştirebilirsiniz"}
          image={changeVideoSection}
          title={"Video Alanını Değiştir"}
          onClick={() =>
            handleBoxClick("video", "/dashboard/admin/edit/edit-video")
          }
        />
        <EditBox
          id="logoBanner"
          path="/edit-logo-banner"
          description={"Buradan logo ve banner alanını değiştirebilirsiniz"}
          image={changeLogoBannerSection}
          title={"Logo-Banner Alanını Değiştir"}
          onClick={() =>
            handleBoxClick(
              "logoBanner",
              "/dashboard/admin/edit/edit-logo-banner"
            )
          }
        />
        <EditBox
          id="banner"
          path="/edit-banner"
          description={"Buradan banner alanını değiştirebilirsiniz"}
          image={changeBannerSection}
          title={"Banner Alanını Değiştir"}
          onClick={() =>
            handleBoxClick("banner", "/dashboard/admin/edit/edit-banner")
          }
        />
        <EditBox
          id="footer"
          path="/edit-footer"
          description={"Buradan Footer alanını değiştirebilirsiniz"}
          image={changeFooterSection}
          title={"Footer Alanını Değiştir"}
          onClick={() =>
            handleBoxClick("footer", "/dashboard/admin/edit/edit-footer")
          }
        />
      </div>
    </>
  );
}

export default MainEditPage;
