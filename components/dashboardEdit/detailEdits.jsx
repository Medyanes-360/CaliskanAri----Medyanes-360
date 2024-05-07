"use client";

import React from "react";
import EditBox from "./editBox";
import changeBgColor from "@/assets/icons/dashboardEditIcons/changeBgColor.png";
import changeText from "@/assets/icons/dashboardEditIcons/changeText.png";
import changeImage from "@/assets/icons/dashboardEditIcons/changeImage.png";
import changeColor from "@/assets/icons/dashboardEditIcons/changeColor.png";
import changePosition from "@/assets/icons/dashboardEditIcons/changePosition.png";
import addButton from "@/assets/icons/dashboardEditIcons/addButton.png";
function DetailEdits({ pageId, animation, openModal, setOpenModal }) {
  const openModalWithContent = (content) => {
    setOpenModal({ isOpen: true, content });
  };

  return (
    <>
      <h1 className="text-center text-gray-700 text-xl font-semibold">
        {pageId === "navbar"
          ? "Gezinme Çubuğu Sayfası"
          : pageId === "banner"
          ? "Afiş Sayfası"
          : pageId === "courses"
          ? "Kurslar Sayfası"
          : pageId === "features"
          ? "Dersler Sayfası"
          : pageId === "footer"
          ? "Altbilgi Sayfası"
          : pageId === "informations"
          ? "Bilgiler Sayfası"
          : pageId === "logoBanner"
          ? "Logo ve Afiş Sayfası"
          : pageId === "main"
          ? "Ana Sayfası"
          : pageId === "students"
          ? "Öğrenciler Sayfası"
          : pageId === "video"
          ? "Video Sayfası"
          : ""}
      </h1>
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
            <EditBox
              onClick={() => openModalWithContent("yer")}
              small={true}
              id={5}
              description={`Buradan ${pageId} sayfasında yer alan ögelerin yerlerini değiştirebilirsiniz`}
              image={changePosition}
              title={"Yer Değiştir"}
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
