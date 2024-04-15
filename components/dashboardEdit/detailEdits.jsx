"use client";

import React from "react";
import EditBox from "./editBox";
import changeBgColor from "@/assets/icons/dashboardEditIcons/changeBgColor.png";
import changeText from "@/assets/icons/dashboardEditIcons/changeText.png";
import changeImage from "@/assets/icons/dashboardEditIcons/changeImage.png";
import changeColor from "@/assets/icons/dashboardEditIcons/changeColor.png";
import changePosition from "@/assets/icons/dashboardEditIcons/changePosition.png";
import addButton from "@/assets/icons/dashboardEditIcons/addButton.png";
function DetailEdits({ pageId, animation }) {
  return (
    <>
      <h1 className="text-center text-gray-700 text-xl font-semibold">
        {pageId.toUpperCase()}
      </h1>
      <div className={`flex flex-row flex-wrap editBoxesArea ${animation}`}>
        <EditBox
          id={1}
          description={`Buradan ${pageId} sayfasının arka plan rengini değiştirebilirsiniz`}
          image={changeBgColor}
          title={"Arka Plan Değiştir"}
        />
        <EditBox
          id={2}
          description={`Buradan ${pageId} sayfasında yer alan yazıları değiştirebilirsiniz`}
          image={changeText}
          title={"Yazıları Değiştir"}
        />
        <EditBox
          id={3}
          description={`Buradan ${pageId} sayfasında yer alan resimleri değiştirebilirsiniz`}
          image={changeImage}
          title={"Resimleri Değiştir"}
        />
        <EditBox
          id={4}
          description={`Buradan ${pageId} sayfasında yer alan renkleri değiştirebilirsiniz`}
          image={changeColor}
          title={"Renkleri Değiştir"}
        />
        <EditBox
          id={5}
          description={`Buradan ${pageId} sayfasında yer alan ögelerin yerlerini değiştirebilirsiniz`}
          image={changePosition}
          title={"Yer Değiştir"}
        />
        <EditBox
          id={6}
          description={`Buradan ${pageId} sayfasına buton ekleme işlemi yapabilirsiniz`}
          image={addButton}
          title={"Buton Ekle"}
        />
      </div>
    </>
  );
}

export default DetailEdits;
