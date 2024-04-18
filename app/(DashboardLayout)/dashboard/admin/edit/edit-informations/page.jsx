"use client";

import SelectedDetail from "@/components/dashboardEdit/selectedDetail";
import { useState } from "react";
const Page = () => {
  const [openModal, setOpenModal] = useState(false);
  return (
    <SelectedDetail
      pageId={"informations"}
      openModal={openModal}
      setOpenModal={setOpenModal}
    />
  );
};

export default Page;
