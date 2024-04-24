"use client";

import SelectedDetail from "@/components/dashboardEdit/selectedDetail";
import { useState } from "react";
import Image from "next/image";
import navbar from "@/assets/image/dashboardImages/informations.png";
import n1 from "@/assets/image/dashboardImages/number-1.png";
import n2 from "@/assets/image/dashboardImages/number-2.png";
import n3 from "@/assets/image/dashboardImages/number-3.png";
import n4 from "@/assets/image/dashboardImages/number-4.png";
const Page = () => {
  const [openModal, setOpenModal] = useState(false);
  return (
    <>
      <SelectedDetail
        pageId={"informations"}
        openModal={openModal}
        setOpenModal={setOpenModal}
      />
      <div className="descriptionArea m-5">
        <div className="imgArea relative ">
          <Image
            src={navbar}
            width={""}
            height={""}
            alt="navbar"
            className="w-full rounded-xl"
          />
        </div>
        <div className="informations  flex flex-col items-start justify-center bg-gray-100 p-1 lg:p-5 rounded-xl my-5">
          <div className="infoBox flex flex-row m-5">
            <Image
              src={n1}
              width={"30vw"}
              height={"10vw"}
              alt="navbar"
              className="w-6 h-6 mr-4 my-auto "
            />
            <h1 className="text-xs lg:text-sm text-left text-gray-600 font-semibold flex items-center justify-center">
              Yazıları değiştir ve Renkleri değiştir alanından burada yer alan
              yazıları ve bu yazıların rengini değiştirebilirsiniz.
            </h1>
          </div>
          <div className="infoBox flex flex-row m-5">
            <Image
              src={n2}
              width={"30vw"}
              height={"10vw"}
              alt="navbar"
              className="w-6 h-6 mr-4 my-auto "
            />
            <h1 className="text-xs lg:text-sm text-left text-gray-600 font-semibold flex items-center justify-center">
              Arkplanı değiştir alanından buranın arka plan rengini
              değiştirebilirsiniz.
            </h1>
          </div>
          <div className="infoBox flex flex-row m-5">
            <Image
              src={n3}
              width={"30vw"}
              height={"10vw"}
              alt="navbar"
              className="w-6 h-6 mr-4 my-auto "
            />
            <h1 className="text-xs lg:text-sm text-left text-gray-600 font-semibold flex items-center justify-center">
              Resimleri değiştir alanından buradaki resimi değiştirebilirsiniz.
            </h1>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
