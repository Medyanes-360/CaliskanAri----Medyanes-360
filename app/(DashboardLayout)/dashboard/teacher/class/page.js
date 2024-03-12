"use client";
import Link from "next/link";
import React, { useState } from "react";
import { FaSquarePlus } from "react-icons/fa6";
import ClassListPage from "@/components/classlistpage";

function ClassPage() {
  const [showClassButton, setShowClassButton] = useState(true);// showClassButton state'i ve onu güncellemek için setShowClassButton fonksiyonunu tanımlanır.

  // Öğrenci listesini görüntüleme butonuna tıklandığında çalışacak fonksiyon.
  const handleViewStudentListClick = () => {
    setShowClassButton(false); // showClassButton'u false olarak güncelleyerek "Class" ve "Add Class" butonları gizlenir.
  };

  return (
    <div id="classpage" className="container mx-auto">
      <div className="flex flex-row items-center p-2 sm:p-12">
        {showClassButton && (
          <>
            <Link href="/class">
              <p className="text-[14px] text-black sm:text-[20px] md:text-[26px] mr-2">Sınıf</p>
            </Link>
            <Link href="/dashboard/teacher/class/addclasspage">
              <FaSquarePlus className="w-5 sm:w-7 md:w-9 h-5 sm:h-7 md:h-9 fill-classprimary hover:scale-105 transition duration-300 ease-in-out" />
            </Link>
          </>
        )}
      </div>
      <div className="container">
      <ClassListPage
        onViewStudentListClick={handleViewStudentListClick}
        setShowClassButton={setShowClassButton}
      />
      </div>
    </div>
  );
}

export default ClassPage;
