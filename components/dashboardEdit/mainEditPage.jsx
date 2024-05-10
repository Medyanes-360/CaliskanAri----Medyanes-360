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
      <div
        className={`flex flex-row flex-wrap editBoxesArea items-center justify-center w-full ${animation1}`}
      >
        <EditBox
          id="navbar"
          path="/edit-navbar"
          description={"Buradan Gezinme Çubuğunu değiştirebilirsiniz"}
          features={[
            "Arka plan rengini değiştirebilirsiniz.",
            "Yazı rengini değiştirebilirsiniz.",
            "Logoyu değiştirebilirsiniz.",
            "Yazıları değiştirebilirsiniz.",
          ]}
          image={changeNavbar}
          title={"Gezinme Çubuğu Alanını Değiştir"}
          onClick={() =>
            handleBoxClick("navbar", "/dashboard/admin/edit/edit-navbar")
          }
        />
        <EditBox
          id="main"
          path="/edit-main"
          features={[
            "Arka plan rengini değiştirebilirsiniz.",
            "Yazı rengini değiştirebilirsiniz.",
            "Resimi değiştirebilirsiniz.",
            "Yazıları değiştirebilirsiniz.",
            "Resim ve yazının yerini değiştirebilirsiniz.",
            "Buton ekleyebilirsiniz.",
          ]}
          description={"Buradan Anasayfa alanını değiştirebilirsiniz"}
          image={changeMainSection}
          title={"Anasayfa Alanını Değiştir"}
          onClick={() =>
            handleBoxClick("main", "/dashboard/admin/edit/edit-main")
          }
        />
        <EditBox
          id="info"
          path="/edit-informations"
          features={[
            "Arka plan rengini değiştirebilirsiniz.",
            "Yazı rengini değiştirebilirsiniz.",
            "Resimi değiştirebilirsiniz.",
            "Yazıları değiştirebilirsiniz.",
          ]}
          description={"Buradan bilgiler alanını değiştirebilirsiniz"}
          image={changeInfoSection}
          title={"Bilgiler Alanını Değiştir"}
          onClick={() =>
            handleBoxClick("info", "/dashboard/admin/edit/edit-informations")
          }
        />
        <EditBox
          id="course"
          path="/edit-courses"
          features={[
            "Arka plan rengini değiştirebilirsiniz.",
            "Yazı rengini değiştirebilirsiniz.",
            "Yazıları değiştirebilirsiniz.",
            "Kurs ekleyip düzenleyebilirsiniz.",
          ]}
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
          features={[
            "Arka plan rengini değiştirebilirsiniz.",
            "Yazı rengini değiştirebilirsiniz.",
            "Logoyu değiştirebilirsiniz.",
            "Yazıları değiştirebilirsiniz.",
            "Resim ve yazının yerini değiştirebilirsiniz.",
            "Buton ekleyebilirsiniz.",
          ]}
          description={"Buradan Öğrenciler alanını değiştirebilirsiniz"}
          image={changeStudentsSection}
          title={"Öğrenciler Alanını Değiştir"}
          onClick={() =>
            handleBoxClick("students", "/dashboard/admin/edit/edit-students")
          }
        />
        <EditBox
          id="features"
          path="/edit-features"
          features={[
            "Arka plan rengini değiştirebilirsiniz.",
            "Yazı rengini değiştirebilirsiniz.",
            "Yazıları değiştirebilirsiniz.",
            "Ders ekleyip düzenleyebilirsiniz.",
            "Kategori ekleyip düzenleyebilirsiniz.",
          ]}
          description={"Buradan dersler alanını değiştirebilirsiniz"}
          image={changeFeatureSection}
          title={"Dersler Alanını Değiştir"}
          onClick={() =>
            handleBoxClick("features", "/dashboard/admin/edit/edit-features")
          }
        />
        <EditBox
          id="video"
          features={[
            "Arka plan rengini değiştirebilirsiniz.",
            "Yazı rengini değiştirebilirsiniz.",
            "Resim değiştirebilirsiniz.",
            "Yazıları değiştirebilirsiniz.",
            "Resim ve yazının yerini değiştirebilirsiniz.",
          ]}
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
          features={[
            "Arka plan rengini değiştirebilirsiniz.",
            "Yazı rengini değiştirebilirsiniz.",
            "Resimleri değiştirebilirsiniz.",
            "Yazıları değiştirebilirsiniz.",
          ]}
          description={"Buradan Logo ve Afiş alanını değiştirebilirsiniz"}
          image={changeLogoBannerSection}
          title={"Logo ve Afiş Alanını Değiştir"}
          onClick={() =>
            handleBoxClick(
              "logoBanner",
              "/dashboard/admin/edit/edit-logo-banner"
            )
          }
        />
        <EditBox
          id="banner"
          features={[
            "Arka plan rengini değiştirebilirsiniz.",
            "Yazı rengini değiştirebilirsiniz.",
            "Yazıları değiştirebilirsiniz.",
            "Buton ekleyip düzenleyebilirsiniz.",
          ]}
          path="/edit-banner"
          description={"Buradan afiş alanını değiştirebilirsiniz"}
          image={changeBannerSection}
          title={"Afiş Alanını Değiştir"}
          onClick={() =>
            handleBoxClick("banner", "/dashboard/admin/edit/edit-banner")
          }
        />
        <EditBox
          id="footer"
          features={[
            "Arka plan rengini değiştirebilirsiniz.",
            "Yazı rengini değiştirebilirsiniz.",
            "Yazıları değiştirebilirsiniz.",
          ]}
          path="/edit-footer"
          description={"Buradan altbilgi alanını değiştirebilirsiniz"}
          image={changeFooterSection}
          title={"Altbilgi Alanını Değiştir"}
          onClick={() =>
            handleBoxClick("footer", "/dashboard/admin/edit/edit-footer")
          }
        />
      </div>
    </>
  );
}

export default MainEditPage;
