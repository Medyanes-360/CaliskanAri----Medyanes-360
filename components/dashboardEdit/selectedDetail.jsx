"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import DetailEdits from "./detailEdits";
import backArrow from "@/assets/icons/dashboardEditIcons/backArrow.png";

function SelectedDetail({ pageId }) {
  const router = useRouter();
  const [animation, setAnimation] = useState(
    "animate__animated animate__fadeInLeft"
  );
  const goBack = () => {
    router.push("/dashboard/admin/edit");
    setAnimation("animate__animated animate__fadeOutLeft");
  };
  return (
    <>
      <div className="backButton">
        <button onClick={goBack}>
          <Image src={backArrow} width={20} height={20} alt={"back"} />
        </button>
      </div>
      <DetailEdits pageId={pageId} animation={animation} />
    </>
  );
}

export default SelectedDetail;
