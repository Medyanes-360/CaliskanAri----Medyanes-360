"use client";

import React, { useEffect, useState, useRef } from "react";
import classNames from "classnames";
import ChevronsLeft from "@/assets/icons/ChevronsLeft";
import { usePathname } from "next/navigation";
import ChevronsRight from "@/assets/icons/ChevronsRight";
import ButtonList from "@/components/dashboard/ButtonList";
import UserIcon from "@/assets/icons/UserIcon";
import BurgerIcon from "@/assets/icons/BurgerIcon";
import { useMediaQuery } from "@/lib/table/useMediaQuery";
import home from "@/assets/icons/dashboardEditIcons/home.png";
import homeWhite from "@/assets/icons/dashboardEditIcons/homeWhite.png";
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

import changeNavbarWhite from "@/assets/icons/dashboardEditIcons/changeNavbarWhite.png";
import changeBannerSectionWhite from "@/assets/icons/dashboardEditIcons/changeBannerSectionWhite.png";
import changeCourseSectionWhite from "@/assets/icons/dashboardEditIcons/changeCourseSectionWhite.png";
import changeFeatureSectionWhite from "@/assets/icons/dashboardEditIcons/changeFeatureSectionWhite.png";
import changeFooterSectionWhite from "@/assets/icons/dashboardEditIcons/changeFooterSectionWhite.png";
import changeInfoSectionWhite from "@/assets/icons/dashboardEditIcons/changeInfoSectionWhite.png";
import changeMainSectionWhite from "@/assets/icons/dashboardEditIcons/changeMainSectionWhite.png";
import changeStudentsSectionWhite from "@/assets/icons/dashboardEditIcons/changeStudentsSectionWhite.png";
import changeLogoBannerSectionWhite from "@/assets/icons/dashboardEditIcons/changeLogoBannerSectionWhite.png";
import changeVideoSectionWhite from "@/assets/icons/dashboardEditIcons/changeVideoSectionWhite.png";
const buttons = [
  {
    title: "Kontrol Panali",
    buttons: [
      {
        id: "1.5",
        label: "Ana Sayfa Düzenle",
        icon: home,
        whiteIcon: homeWhite,
        path: "/dashboard/admin/edit",
        childs: [
          {
            id: "1.5.1",
            label: "Navbar Alanını Değiştir",
            icon: changeNavbar,
            whiteIcon: changeNavbarWhite,
            path: "/dashboard/admin/edit/edit-navbar",
          },
          {
            id: "1.5.2",
            label: "Main Alanını Değiştir",
            path: "/dashboard/admin/edit/edit-main",
            icon: changeMainSection,
            whiteIcon: changeMainSectionWhite,
          },
          {
            id: "1.5.2",
            label: "Bilgiler Alanını Değiştir",
            path: "/dashboard/admin/edit/edit-informations",
            icon: changeInfoSection,
            whiteIcon: changeInfoSectionWhite,
          },
          {
            id: "1.5.4",
            label: "Kurslarım Alanını Değiştir",
            path: "/dashboard/admin/edit/edit-courses",
            icon: changeCourseSection,
            whiteIcon: changeCourseSectionWhite,
          },
          {
            id: "1.5.5",
            label: "Öğrenciler Alanını Değiştir",
            path: "/dashboard/admin/edit/edit-students",
            icon: changeStudentsSection,
            whiteIcon: changeStudentsSectionWhite,
          },
          {
            id: "1.5.6",
            label: "Özellikler Alanını Değiştir",
            path: "/dashboard/admin/edit/edit-features",
            icon: changeFeatureSection,
            whiteIcon: changeFeatureSectionWhite,
          },
          {
            id: "1.5.7",
            label: "Video Alanını Değiştir",
            path: "/dashboard/admin/edit/edit-video",
            icon: changeVideoSection,
            whiteIcon: changeVideoSectionWhite,
          },
          {
            id: "1.5.8",
            label: "Logo-Banner Alanını Değiştir",
            path: "/dashboard/admin/edit/edit-logo-banner",
            icon: changeLogoBannerSection,
            whiteIcon: changeLogoBannerSectionWhite,
          },
          {
            id: "1.5.9",
            label: "Banner Alanını Değiştir",
            path: "/dashboard/admin/edit/edit-banner",
            icon: changeBannerSection,
            whiteIcon: changeBannerSectionWhite,
          },
          {
            id: "1.5.10",
            label: "Footer Alanını Değiştir",
            path: "/dashboard/admin/edit/edit-footer",
            icon: changeFooterSection,
            whiteIcon: changeFooterSectionWhite,
          },
        ],
      },
    ],
  },
];

const Sidebar = ({ isOpen, setIsOpen }) => {
  const pathname = usePathname();
  const isMobile = useMediaQuery(768);
  const isResizingRef = useRef(false);
  const sidebarRef = useRef(null);
  const navbarRef = useRef(null);
  const [isResetting, setIsResetting] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(isMobile);

  useEffect(() => {
    if (isMobile) {
      collapse();
    } else {
      resetWidth();
    }
  }, [isMobile]);

  useEffect(() => {
    if (isMobile) {
      collapse();
    }
  }, [pathname, isMobile]);

  const handleMouseDown = (event) => {
    event.preventDefault();
    event.stopPropagation();

    isResizingRef.current = true;
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (event) => {
    if (!isResizingRef.current) return;
    let newWidth = event.clientX;

    if (newWidth < 240) newWidth = 240;
    if (newWidth > 480) newWidth = 480;

    if (sidebarRef.current && navbarRef.current) {
      sidebarRef.current.style.width = `${newWidth}px`;
      navbarRef.current.style.setProperty("left", `${newWidth}px`);
      navbarRef.current.style.setProperty(
        "width",
        `calc(100% - ${newWidth}px)`
      );
    }
  };

  const handleMouseUp = () => {
    isResizingRef.current = false;
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  const resetWidth = () => {
    if (sidebarRef.current && navbarRef.current) {
      setIsCollapsed(false);
      setIsResetting(true);

      sidebarRef.current.style.width = isMobile ? "100%" : "350px";
      navbarRef.current.style.setProperty(
        "width",
        isMobile ? "0" : "calc(100% - 240px)"
      );
      navbarRef.current.style.setProperty("left", isMobile ? "100%" : "240px");
      setTimeout(() => setIsResetting(false), 300);
    }
  };

  const collapse = () => {
    if (sidebarRef.current && navbarRef.current) {
      setIsCollapsed(true);
      setIsResetting(true);

      sidebarRef.current.style.width = "40px";
      navbarRef.current.style.setProperty("width", "100%");
      navbarRef.current.style.setProperty("left", "0");
      setTimeout(() => setIsResetting(false), 300);
    }
  };

  return (
    <>
      <aside
        ref={sidebarRef}
        className={classNames(
          "group/sidebar h-screen overflow-y-auto bg-white relative flex w-60 flex-col z-[50] !bg-muted p-2 pt-8 shadow-sm",
          isResetting && "transition-all ease-in-out duration-300",
          isMobile && "!absolute",
          isMobile && isCollapsed && "!bg-transparent !shadow-none"
        )}
      >
        <div
          onClick={isCollapsed ? resetWidth : collapse}
          role="button"
          className={classNames(
            "h-6 w-6 rounded-lg absolute top-3 right-2 transition text-black"
          )}
        >
          {isMobile && isCollapsed ? (
            <BurgerIcon className="w-6 h-6 [&_path]:fill-muted-foreground" />
          ) : isCollapsed ? (
            <ChevronsRight className="h-6 w-6 [&_path]:fill-muted-foreground" />
          ) : (
            <ChevronsLeft className="h-6 w-6 [&_path]:fill-muted-foreground" />
          )}
        </div>
        <div
          className={classNames(
            !isCollapsed ? " p-4 flex flex-col gap-2" : "hidden"
          )}
        >
          {buttons.map(({ buttons: x, title }, index) => (
            <div
              key={index}
              className="flex flex-col gap-4 border-b border-b-muted-foreground pb-5"
            >
              {!isMobile && (
                <span className="text-sm font-semibold text-muted-foreground">
                  {title}
                </span>
              )}
              <ButtonList buttons={x} level={1} />
            </div>
          ))}
        </div>
        {!isCollapsed && (
          <div
            onMouseDown={handleMouseDown}
            onClick={resetWidth}
            className="opacity-0 group-hover/sidebar:opacity-100 transition cursor-ew-resize absolute h-full w-1 bg-muted-foreground right-0 top-0"
          />
        )}
      </aside>
      <div
        ref={navbarRef}
        className={classNames(
          "absolute top-0 z-[99999] left-60 w-[calc(100%-240px)]",
          isResetting && "transition-all ease-in-out duration-300",
          isMobile && "left-0 w-full"
        )}
      ></div>
    </>
  );
};

export default Sidebar;
