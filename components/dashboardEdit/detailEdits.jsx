"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import EditBox from "./editBox";
import backArrow from "@/assets/icons/dashboardEditIcons/backArrow.png";
import changeBgColor from "@/assets/icons/dashboardEditIcons/changeBgColor.png";
import changeText from "@/assets/icons/dashboardEditIcons/changeText.png";
import changeImage from "@/assets/icons/dashboardEditIcons/changeImage.png";
import changeColor from "@/assets/icons/dashboardEditIcons/changeColor.png";
import changePosition from "@/assets/icons/dashboardEditIcons/changePosition.png";
import addButton from "@/assets/icons/dashboardEditIcons/addButton.png";
function DetailEdits({ pageId, openModal, setOpenModal }) {
  const router = useRouter();
  const [animation, setAnimation] = useState(
    "animate__animated animate__fadeInLeft"
  );

  const openModalWithContent = (content) => {
    setOpenModal({ isOpen: true, content });
  };
  const goBack = () => {
    router.push("/dashboard/admin/edit");
    setAnimation("animate__animated animate__fadeOutLeft");
  };
  return (
    <>
      <div className="flex items-center justify-center">
        <div className="backButton w-1/3 justify-start flex">
          <button
            onClick={goBack}
            className="flex bg-[#2c536a] p-2 text-gray-100 hover:text-[#2c536a] hover:bg-gray-200 rounded-2xl mx-2 lg:mx-5 transition-all duration-500"
          >
            <i class="fa-solid fa-circle-chevron-left my-auto"></i>
            <h1 className="lg:text-sm text-xs ml-3 font-semibold">Geri</h1>
          </button>
        </div>
        <h1 className="text-center text-gray-700 lg:text-xl text-sm font-semibold tracking-wide w-1/3">
          {pageId === "navbar"
            ? "Gezinme Çubuğu Sayfası Düzenleme"
            : pageId === "banner"
            ? "Afiş Sayfası Düzenleme"
            : pageId === "courses"
            ? "Kurslar Sayfası Düzenleme"
            : pageId === "features"
            ? "Dersler Sayfası Düzenleme"
            : pageId === "footer"
            ? "Altbilgi Sayfası Düzenleme"
            : pageId === "informations"
            ? "Bilgiler Sayfası Düzenleme"
            : pageId === "logoBanner"
            ? "Logo ve Afiş Sayfası Düzenleme"
            : pageId === "main"
            ? "Ana Sayfa Düzenleme"
            : pageId === "students"
            ? "Öğrenciler Sayfası Düzenleme"
            : pageId === "video"
            ? "Video Sayfası Düzenleme"
            : ""}
        </h1>
        <div className="w-1/3"></div>
      </div>
      <div
        className={`flex flex-row flex-wrap editBoxesArea items-center justify-center w-full ${animation}`}
      >
        {pageId === "navbar" && (
          <>
            <EditBox
              number={2}
              onClick={() => openModalWithContent("backgroundColor")}
              small={true}
              id={1}
              description={`Buradan ${pageId} sayfasının arka plan rengini değiştirebilirsiniz`}
              image={changeBgColor}
              title={"Arka Plan Değiştir"}
            />
            <EditBox
              number={1}
              onClick={() => openModalWithContent("yazı")}
              small={true}
              id={2}
              description={`Buradan ${pageId} sayfasında yer alan yazıları değiştirebilirsiniz`}
              image={changeText}
              title={"Yazıları Değiştir"}
            />
            <EditBox
              number={3}
              onClick={() => openModalWithContent("resim")}
              small={true}
              id={3}
              description={`Buradan ${pageId} sayfasında yer alan resimleri değiştirebilirsiniz`}
              image={changeImage}
              title={"Resimleri Değiştir"}
            />
            <EditBox
              number={1}
              onClick={() => openModalWithContent("renk")}
              small={true}
              id={4}
              description={`Buradan ${pageId} sayfasında yer alan yazı renklerini değiştirebilirsiniz`}
              image={changeColor}
              title={"Renkleri Değiştir"}
            />
          </>
        )}
        {pageId === "banner" && (
          <>
            <EditBox
              number={2}
              onClick={() => openModalWithContent("backgroundColor")}
              small={true}
              id={1}
              description={`Buradan ${pageId} sayfasının arka plan rengini değiştirebilirsiniz`}
              image={changeBgColor}
              title={"Arka Plan Değiştir"}
            />
            <EditBox
              number={1}
              onClick={() => openModalWithContent("yazı")}
              small={true}
              id={2}
              description={`Buradan ${pageId} sayfasında yer alan yazıları değiştirebilirsiniz`}
              image={changeText}
              title={"Yazıları Değiştir"}
            />
            <EditBox
              number={1}
              onClick={() => openModalWithContent("renk")}
              small={true}
              id={4}
              description={`Buradan ${pageId} sayfasında yer alan yazı renklerini değiştirebilirsiniz`}
              image={changeColor}
              title={"Renkleri Değiştir"}
            />
            <EditBox
              number={3}
              onClick={() => openModalWithContent("buton")}
              small={true}
              id={5}
              description={`Buradan ${pageId} sayfasına buton ekleme işlemi yapabilirsiniz`}
              image={addButton}
              title={"Buton Ekle"}
            />
          </>
        )}
        {pageId === "courses" && (
          <>
            <EditBox
              number={2}
              onClick={() => openModalWithContent("backgroundColor")}
              small={true}
              id={1}
              description={`Buradan ${pageId} sayfasının arka plan rengini değiştirebilirsiniz`}
              image={changeBgColor}
              title={"Arka Plan Değiştir"}
            />
            <EditBox
              number={1}
              onClick={() => openModalWithContent("yazı")}
              small={true}
              id={2}
              description={`Buradan ${pageId} sayfasında yer alan yazıları değiştirebilirsiniz`}
              image={changeText}
              title={"Yazıları Değiştir"}
            />
            <EditBox
              number={1}
              onClick={() => openModalWithContent("renk")}
              small={true}
              id={4}
              description={`Buradan ${pageId} sayfasında yer alan yazı renklerini değiştirebilirsiniz`}
              image={changeColor}
              title={"Renkleri Değiştir"}
            />
            <EditBox
              number={3}
              onClick={() => openModalWithContent("buton")}
              small={true}
              id={5}
              description={`Buradan ${pageId} sayfasına buton ekleme işlemi yapabilirsiniz`}
              image={addButton}
              title={"Kurs Düzenle-Ekle"}
            />
          </>
        )}
        {pageId === "features" && (
          <>
            <EditBox
              number={2}
              onClick={() => openModalWithContent("backgroundColor")}
              small={true}
              id={1}
              description={`Buradan ${pageId} sayfasının arka plan rengini değiştirebilirsiniz`}
              image={changeBgColor}
              title={"Arka Plan Değiştir"}
            />
            <EditBox
              number={1}
              onClick={() => openModalWithContent("yazı")}
              small={true}
              id={2}
              description={`Buradan ${pageId} sayfasında yer alan yazıları değiştirebilirsiniz`}
              image={changeText}
              title={"Yazıları Değiştir"}
            />

            <EditBox
              number={1}
              onClick={() => openModalWithContent("renk")}
              small={true}
              id={4}
              description={`Buradan ${pageId} sayfasında yer alan yazı renklerini değiştirebilirsiniz`}
              image={changeColor}
              title={"Renkleri Değiştir"}
            />
            <EditBox
              number={3}
              onClick={() => openModalWithContent("buton")}
              small={true}
              id={6}
              description={`Buradan ${pageId} sayfasına buton ekleme işlemi yapabilirsiniz`}
              image={addButton}
              title={"Ders Düzenle-Ekle"}
            />
            <EditBox
              number={4}
              onClick={() => openModalWithContent("butonCategory")}
              small={true}
              id={6}
              description={`Buradan ${pageId} sayfasına buton ekleme işlemi yapabilirsiniz`}
              image={addButton}
              title={"Kategori Düzenle-Ekle"}
            />
          </>
        )}
        {pageId === "footer" && (
          <>
            <EditBox
              number={2}
              onClick={() => openModalWithContent("backgroundColor")}
              small={true}
              id={1}
              description={`Buradan ${pageId} sayfasının arka plan rengini değiştirebilirsiniz`}
              image={changeBgColor}
              title={"Arka Plan Değiştir"}
            />
            <EditBox
              number={1}
              onClick={() => openModalWithContent("yazı")}
              small={true}
              id={2}
              description={`Buradan ${pageId} sayfasında yer alan yazıları değiştirebilirsiniz`}
              image={changeText}
              title={"Yazıları Değiştir"}
            />
            <EditBox
              number={1}
              onClick={() => openModalWithContent("renk")}
              small={true}
              id={4}
              description={`Buradan ${pageId} sayfasında yer alan yazı renklerini değiştirebilirsiniz`}
              image={changeColor}
              title={"Renkleri Değiştir"}
            />
          </>
        )}
        {pageId === "informations" && (
          <>
            <EditBox
              number={2}
              onClick={() => openModalWithContent("backgroundColor")}
              small={true}
              id={1}
              description={`Buradan ${pageId} sayfasının arka plan rengini değiştirebilirsiniz`}
              image={changeBgColor}
              title={"Arka Plan Değiştir"}
            />
            <EditBox
              number={1}
              onClick={() => openModalWithContent("yazı")}
              small={true}
              id={2}
              description={`Buradan ${pageId} sayfasında yer alan yazıları değiştirebilirsiniz`}
              image={changeText}
              title={"Yazıları Değiştir"}
            />
            <EditBox
              number={3}
              onClick={() => openModalWithContent("resim")}
              small={true}
              id={3}
              description={`Buradan ${pageId} sayfasında yer alan resimleri değiştirebilirsiniz`}
              image={changeImage}
              title={"Resimleri Değiştir"}
            />
            <EditBox
              number={1}
              onClick={() => openModalWithContent("renk")}
              small={true}
              id={4}
              description={`Buradan ${pageId} sayfasında yer alan yazı renklerini değiştirebilirsiniz`}
              image={changeColor}
              title={"Renkleri Değiştir"}
            />
          </>
        )}
        {pageId === "logoBanner" && (
          <>
            <EditBox
              number={2}
              onClick={() => openModalWithContent("backgroundColor")}
              small={true}
              id={1}
              description={`Buradan ${pageId} sayfasının arka plan rengini değiştirebilirsiniz`}
              image={changeBgColor}
              title={"Arka Plan Değiştir"}
            />
            <EditBox
              number={1}
              onClick={() => openModalWithContent("yazı")}
              small={true}
              id={2}
              description={`Buradan ${pageId} sayfasında yer alan yazıları değiştirebilirsiniz`}
              image={changeText}
              title={"Yazıları Değiştir"}
            />
            <EditBox
              number={3}
              onClick={() => openModalWithContent("resim")}
              small={true}
              id={3}
              description={`Buradan ${pageId} sayfasında yer alan resimleri değiştirebilirsiniz`}
              image={changeImage}
              title={"Resimleri Değiştir"}
            />
            <EditBox
              number={1}
              onClick={() => openModalWithContent("renk")}
              small={true}
              id={4}
              description={`Buradan ${pageId} sayfasında yer alan yazı renklerini değiştirebilirsiniz`}
              image={changeColor}
              title={"Renkleri Değiştir"}
            />
          </>
        )}
        {pageId === "main" && (
          <>
            <EditBox
              number={2}
              onClick={() => openModalWithContent("backgroundColor")}
              small={true}
              id={1}
              description={`Buradan ${pageId} sayfasının arka plan rengini değiştirebilirsiniz`}
              image={changeBgColor}
              title={"Arka Plan Değiştir"}
            />
            <EditBox
              number={1}
              onClick={() => openModalWithContent("yazı")}
              small={true}
              id={2}
              description={`Buradan ${pageId} sayfasında yer alan yazıları değiştirebilirsiniz`}
              image={changeText}
              title={"Yazıları Değiştir"}
            />
            <EditBox
              number={3}
              onClick={() => openModalWithContent("resim")}
              small={true}
              id={3}
              description={`Buradan ${pageId} sayfasında yer alan resimleri değiştirebilirsiniz`}
              image={changeImage}
              title={"Resimleri Değiştir"}
            />
            <EditBox
              number={1}
              onClick={() => openModalWithContent("renk")}
              small={true}
              id={4}
              description={`Buradan ${pageId} sayfasında yer alan yazı renklerini değiştirebilirsiniz`}
              image={changeColor}
              title={"Renkleri Değiştir"}
            />
            <EditBox
              number={4}
              onClick={() => openModalWithContent("yer")}
              small={true}
              id={5}
              description={`Buradan ${pageId} sayfasında yer alan ögelerin yerlerini değiştirebilirsiniz`}
              image={changePosition}
              title={"Yer Değiştir"}
            />
            <EditBox
              number={5}
              onClick={() => openModalWithContent("buton")}
              small={true}
              id={6}
              description={`Buradan ${pageId} sayfasına buton ekleme işlemi yapabilirsiniz`}
              image={addButton}
              title={"Buton Ekle"}
            />
          </>
        )}
        {pageId === "students" && (
          <>
            <EditBox
              number={2}
              onClick={() => openModalWithContent("backgroundColor")}
              small={true}
              id={1}
              description={`Buradan ${pageId} sayfasının arka plan rengini değiştirebilirsiniz`}
              image={changeBgColor}
              title={"Arka Plan Değiştir"}
            />
            <EditBox
              number={1}
              onClick={() => openModalWithContent("yazı")}
              small={true}
              id={2}
              description={`Buradan ${pageId} sayfasında yer alan yazıları değiştirebilirsiniz`}
              image={changeText}
              title={"Yazıları Değiştir"}
            />
            <EditBox
              number={3}
              onClick={() => openModalWithContent("resim")}
              small={true}
              id={3}
              description={`Buradan ${pageId} sayfasında yer alan resimleri değiştirebilirsiniz`}
              image={changeImage}
              title={"Resimleri Değiştir"}
            />
            <EditBox
              number={1}
              onClick={() => openModalWithContent("renk")}
              small={true}
              id={4}
              description={`Buradan ${pageId} sayfasında yer alan yazı renklerini değiştirebilirsiniz`}
              image={changeColor}
              title={"Renkleri Değiştir"}
            />
            <EditBox
              number={4}
              onClick={() => openModalWithContent("yer")}
              small={true}
              id={5}
              description={`Buradan ${pageId} sayfasında yer alan ögelerin yerlerini değiştirebilirsiniz`}
              image={changePosition}
              title={"Yer Değiştir"}
            />
            <EditBox
              number={5}
              onClick={() => openModalWithContent("buton")}
              small={true}
              id={6}
              description={`Buradan ${pageId} sayfasına buton ekleme işlemi yapabilirsiniz`}
              image={addButton}
              title={"Buton Ekle"}
            />
          </>
        )}
        {pageId === "video" && (
          <>
            <EditBox
              number={2}
              onClick={() => openModalWithContent("backgroundColor")}
              small={true}
              id={1}
              description={`Buradan ${pageId} sayfasının arka plan rengini değiştirebilirsiniz`}
              image={changeBgColor}
              title={"Arka Plan Değiştir"}
            />
            <EditBox
              number={1}
              onClick={() => openModalWithContent("yazı")}
              small={true}
              id={2}
              description={`Buradan ${pageId} sayfasında yer alan yazıları değiştirebilirsiniz`}
              image={changeText}
              title={"Yazıları Değiştir"}
            />
            <EditBox
              number={3}
              onClick={() => openModalWithContent("resim")}
              small={true}
              id={3}
              description={`Buradan ${pageId} sayfasında yer alan resimleri değiştirebilirsiniz`}
              image={changeImage}
              title={"Resimleri Değiştir"}
            />
            <EditBox
              number={1}
              onClick={() => openModalWithContent("renk")}
              small={true}
              id={4}
              description={`Buradan ${pageId} sayfasında yer alan yazı renklerini değiştirebilirsiniz`}
              image={changeColor}
              title={"Renkleri Değiştir"}
            />
            <EditBox
              number={4}
              onClick={() => openModalWithContent("yer")}
              small={true}
              id={5}
              description={`Buradan ${pageId} sayfasında yer alan ögelerin yerlerini değiştirebilirsiniz`}
              image={changePosition}
              title={"Yer Değiştir"}
            />
          </>
        )}
      </div>
    </>
  );
}

export default DetailEdits;
