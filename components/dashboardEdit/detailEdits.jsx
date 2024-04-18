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
        {pageId.toUpperCase()}
      </h1>
      <div className={`flex flex-row flex-wrap editBoxesArea ${animation}`}>
        {pageId === "navbar" && (
          <>
            <EditBox
              onClick={() => openModalWithContent("backgroundColor")}
              small={true}
              id={1}
              description={`Buradan ${pageId} sayfasının arka plan rengini değiştirebilirsiniz`}
              image={changeBgColor}
              title={"Arka Plan Değiştir"}
            />
            <EditBox
              onClick={() => openModalWithContent("yazı")}
              small={true}
              id={2}
              description={`Buradan ${pageId} sayfasında yer alan yazıları değiştirebilirsiniz`}
              image={changeText}
              title={"Yazıları Değiştir"}
            />
            <EditBox
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
              onClick={() => openModalWithContent("backgroundColor")}
              small={true}
              id={1}
              description={`Buradan ${pageId} sayfasının arka plan rengini değiştirebilirsiniz`}
              image={changeBgColor}
              title={"Arka Plan Değiştir"}
            />
            <EditBox
              onClick={() => openModalWithContent("yazı")}
              small={true}
              id={2}
              description={`Buradan ${pageId} sayfasında yer alan yazıları değiştirebilirsiniz`}
              image={changeText}
              title={"Yazıları Değiştir"}
            />
            <EditBox
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
        {pageId === "courses" && (
          <>
            <EditBox
              onClick={() => openModalWithContent("backgroundColor")}
              small={true}
              id={1}
              description={`Buradan ${pageId} sayfasının arka plan rengini değiştirebilirsiniz`}
              image={changeBgColor}
              title={"Arka Plan Değiştir"}
            />
            <EditBox
              onClick={() => openModalWithContent("yazı")}
              small={true}
              id={2}
              description={`Buradan ${pageId} sayfasında yer alan yazıları değiştirebilirsiniz`}
              image={changeText}
              title={"Yazıları Değiştir"}
            />
            <EditBox
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
            <EditBox
              onClick={() => openModalWithContent("buton")}
              small={true}
              id={6}
              description={`Buradan ${pageId} sayfasına buton ekleme işlemi yapabilirsiniz`}
              image={addButton}
              title={"Kurs Ekle"}
            />
          </>
        )}
        {pageId === "features" && (
          <>
            <EditBox
              onClick={() => openModalWithContent("backgroundColor")}
              small={true}
              id={1}
              description={`Buradan ${pageId} sayfasının arka plan rengini değiştirebilirsiniz`}
              image={changeBgColor}
              title={"Arka Plan Değiştir"}
            />
            <EditBox
              onClick={() => openModalWithContent("yazı")}
              small={true}
              id={2}
              description={`Buradan ${pageId} sayfasında yer alan yazıları değiştirebilirsiniz`}
              image={changeText}
              title={"Yazıları Değiştir"}
            />
            <EditBox
              onClick={() => openModalWithContent("resim")}
              small={true}
              id={3}
              description={`Buradan ${pageId} sayfasında yer alan resimleri değiştirebilirsiniz`}
              image={changeImage}
              title={"Resimleri Değiştir"}
            />
            <EditBox
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
        {pageId === "footer" && (
          <>
            <EditBox
              onClick={() => openModalWithContent("backgroundColor")}
              small={true}
              id={1}
              description={`Buradan ${pageId} sayfasının arka plan rengini değiştirebilirsiniz`}
              image={changeBgColor}
              title={"Arka Plan Değiştir"}
            />
            <EditBox
              onClick={() => openModalWithContent("yazı")}
              small={true}
              id={2}
              description={`Buradan ${pageId} sayfasında yer alan yazıları değiştirebilirsiniz`}
              image={changeText}
              title={"Yazıları Değiştir"}
            />
            <EditBox
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
        {pageId === "informations" && (
          <>
            <EditBox
              onClick={() => openModalWithContent("backgroundColor")}
              small={true}
              id={1}
              description={`Buradan ${pageId} sayfasının arka plan rengini değiştirebilirsiniz`}
              image={changeBgColor}
              title={"Arka Plan Değiştir"}
            />
            <EditBox
              onClick={() => openModalWithContent("yazı")}
              small={true}
              id={2}
              description={`Buradan ${pageId} sayfasında yer alan yazıları değiştirebilirsiniz`}
              image={changeText}
              title={"Yazıları Değiştir"}
            />
            <EditBox
              onClick={() => openModalWithContent("resim")}
              small={true}
              id={3}
              description={`Buradan ${pageId} sayfasında yer alan resimleri değiştirebilirsiniz`}
              image={changeImage}
              title={"Resimleri Değiştir"}
            />
            <EditBox
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
              onClick={() => openModalWithContent("backgroundColor")}
              small={true}
              id={1}
              description={`Buradan ${pageId} sayfasının arka plan rengini değiştirebilirsiniz`}
              image={changeBgColor}
              title={"Arka Plan Değiştir"}
            />
            <EditBox
              onClick={() => openModalWithContent("yazı")}
              small={true}
              id={2}
              description={`Buradan ${pageId} sayfasında yer alan yazıları değiştirebilirsiniz`}
              image={changeText}
              title={"Yazıları Değiştir"}
            />
            <EditBox
              onClick={() => openModalWithContent("resim")}
              small={true}
              id={3}
              description={`Buradan ${pageId} sayfasında yer alan resimleri değiştirebilirsiniz`}
              image={changeImage}
              title={"Resimleri Değiştir"}
            />
            <EditBox
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
              onClick={() => openModalWithContent("backgroundColor")}
              small={true}
              id={1}
              description={`Buradan ${pageId} sayfasının arka plan rengini değiştirebilirsiniz`}
              image={changeBgColor}
              title={"Arka Plan Değiştir"}
            />
            <EditBox
              onClick={() => openModalWithContent("yazı")}
              small={true}
              id={2}
              description={`Buradan ${pageId} sayfasında yer alan yazıları değiştirebilirsiniz`}
              image={changeText}
              title={"Yazıları Değiştir"}
            />
            <EditBox
              onClick={() => openModalWithContent("resim")}
              small={true}
              id={3}
              description={`Buradan ${pageId} sayfasında yer alan resimleri değiştirebilirsiniz`}
              image={changeImage}
              title={"Resimleri Değiştir"}
            />
            <EditBox
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
        {pageId === "students" && (
          <>
            <EditBox
              onClick={() => openModalWithContent("backgroundColor")}
              small={true}
              id={1}
              description={`Buradan ${pageId} sayfasının arka plan rengini değiştirebilirsiniz`}
              image={changeBgColor}
              title={"Arka Plan Değiştir"}
            />
            <EditBox
              onClick={() => openModalWithContent("yazı")}
              small={true}
              id={2}
              description={`Buradan ${pageId} sayfasında yer alan yazıları değiştirebilirsiniz`}
              image={changeText}
              title={"Yazıları Değiştir"}
            />
            <EditBox
              onClick={() => openModalWithContent("resim")}
              small={true}
              id={3}
              description={`Buradan ${pageId} sayfasında yer alan resimleri değiştirebilirsiniz`}
              image={changeImage}
              title={"Resimleri Değiştir"}
            />
            <EditBox
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
              onClick={() => openModalWithContent("backgroundColor")}
              small={true}
              id={1}
              description={`Buradan ${pageId} sayfasının arka plan rengini değiştirebilirsiniz`}
              image={changeBgColor}
              title={"Arka Plan Değiştir"}
            />
            <EditBox
              onClick={() => openModalWithContent("yazı")}
              small={true}
              id={2}
              description={`Buradan ${pageId} sayfasında yer alan yazıları değiştirebilirsiniz`}
              image={changeText}
              title={"Yazıları Değiştir"}
            />
            <EditBox
              onClick={() => openModalWithContent("resim")}
              small={true}
              id={3}
              description={`Buradan ${pageId} sayfasında yer alan resimleri değiştirebilirsiniz`}
              image={changeImage}
              title={"Resimleri Değiştir"}
            />
            <EditBox
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
      </div>
    </>
  );
}

export default DetailEdits;
