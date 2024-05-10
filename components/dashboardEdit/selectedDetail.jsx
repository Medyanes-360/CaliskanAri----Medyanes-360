"use client";

import React, { useState } from "react";
import DetailEdits from "./detailEdits";
import EditModal from "./editModal";

function SelectedDetail({ pageId, openModal, setOpenModal }) {
  const closeModal = () => {
    setOpenModal(false);
  };
  return (
    <>
      <DetailEdits
        pageId={pageId}
        openModal={openModal}
        setOpenModal={setOpenModal}
      />
      <EditModal
        pageId={pageId}
        isOpen={openModal}
        onClose={closeModal}
        modalContent={openModal?.content}
      />
    </>
  );
}

export default SelectedDetail;
