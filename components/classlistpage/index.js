"use client";
import React, { useEffect, useState } from "react";
import EditPopUp from "../editpopup";
import ViewStudentList from "../studentlist";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaEdit } from "react-icons/fa";
import { FaList } from "react-icons/fa";
import { PiStudentFill } from "react-icons/pi";
import { RiDeleteBinFill } from "react-icons/ri";

const ClassListPage = ({ onViewStudentListClick, setShowClassButton }) => {
  const [classes, setClasses] = useState([]);
  const [currentClass, setCurrentClass] = useState(null);
  const [editClassId, setEditClassId] = useState(null);
  const [showEditPopUp, setShowEditPopUp] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(false);

  useEffect(() => {
    fetchClasses();
  }, []);

  const fetchClasses = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/classes");
      const data = await response.json();
      console.log("Fetched classes:", data);
      console.log("Setting classes state:", data);
      setClasses(data);
      console.log("Classes state set successfully!");
    } catch (error) {
      console.error("Error fetching classes:", error);
    }
  };

  //öğrenci ekleme
  const addStudent = async (classId, studentName, studentEmail) => {
    try {
      const response = await fetch("http://localhost:3000/api/students", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: studentName,
          email: studentEmail,
          classId: classId,
        }),
      });
      const data = await response.json();
      console.log("Student added:", data);

      // Durumu yeni sınıf bilgileriyle günceller
      setClasses((prevClasses) =>
        prevClasses.map((classInfo) =>
          classInfo.id === classId
            ? { ...classInfo, students: [...classInfo.students, data] }
            : classInfo
        )
      );
    } catch (error) {
      console.error("Error adding student:", error);
    }
  };

  //sınıf silme
  const deleteClass = async (classId) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/classes?classId=${classId}`,
        {
          method: "DELETE",
        }
      );
      console.log("Class deleted:", response);
      fetchClasses();
    } catch (error) {
      console.error("Error deleting class:", error);
    }
  };

  //öğrenci silme
  const deleteStudent = async (classId, studentId) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/students?studentId=${studentId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        console.error("Error deleting student:", response.statusText);
      } else {
        console.log("Student deleted:", response);
        // Öğrencileri içeren güncellenmiş sınıf listesini getirir
        fetchClasses();
      }
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  };

  // Edit düğmesine tıklandığında çalışacak fonksiyon
  const handleEditClick = (classId) => {
    setShowEditPopUp(true);
    setEditClassId(classId);
  };

  // Öğrenci listesini görüntüle düğmesine tıklandığında çalışacak fonksiyon
  const handleViewStudentList = (classId) => {
    setCurrentClass(classId);
    onViewStudentListClick();
  };

  // Sınıf listesine geri dönmek için kullanılacak fonksiyon
  const handleBackToClassList = () => {
    setCurrentClass(null);
    setShowClassButton(true);
  };

  // Dropdown açma/kapatma
  const handleDropdownToggle = (classId) => {
    setDropdownOpen(dropdownOpen === classId ? null : classId);
  };

  // Dropdown menü için seçim işlemleri
  const handleDropdownSelect = (action, classId) => {
    setDropdownOpen(null);
    if (action === "edit") {
      handleEditClick(classId);
    } else if (action === "view") {
      handleViewStudentList(classId);
    } else if (action === "delete") {
      console.log("Delete button clicked");
      setConfirmDelete(true);
      setEditClassId(classId);
    }
  };

  //class silme işleminin gerçekleştiği fonksiyon
  const handleConfirmDelete = () => {
    deleteClass(editClassId);
    setConfirmDelete(false);
  };

  //class silme işlemini iptal eden fonksiyon
  const handleCancelDelete = () => {
    setConfirmDelete(false);
  };

  // Güncellenen bilgileri edit pop-up tan alma
  const handleUpdateClass = async (
    updatedName,
    updatedGrade,
    updatedSection
  ) => {
    console.log("Updating class:", editClassId);
    console.log("Updated data:", updatedName, updatedGrade, updatedSection);

    // Güncellenen grade alanını tamsayıya dönüştürün, grade string olmamalı
    updatedGrade = parseInt(updatedGrade);

    try {
      const response = await fetch(
        `http://localhost:3000/api/classes?classId=${editClassId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: updatedName,
            grade: updatedGrade,
            section: updatedSection,
          }),
        }
      );

      if (!response.ok) {
        console.error("Error updating class:", response.statusText);
      } else {
        console.log("Class updated:", response);
        fetchClasses(); // Güncelleme başarılıysa sınıf listesini güncelleyin
      }
    } catch (error) {
      console.error("Error updating class:", error);
    }
  };

  return (
    <div id="classlistpage" className="container mx-auto max-w-[1200px]">
      <div>
        {currentClass ? (
          <ViewStudentList
            classInfo={classes.find(
              (classInfo) => classInfo.id === currentClass
            )}
            onDeleteStudent={(studentId) =>
              deleteStudent(currentClass, studentId)
            }
            onAddStudent={(studentName, studentEmail) =>
              addStudent(currentClass, studentName, studentEmail)
            }
            onBackToClassList={handleBackToClassList}
            setShowClassButton={setShowClassButton}
          />
        ) : (
          <>
            <div id="classlist" className="container mx-auto ">
              <table className="table-auto border-collapse  border-b border-classtableborder w-full ">
                <thead>
                  <tr className="text-classtablehead text-[8px] sm:text-[10px] md:text-[12px] lg:text-[15px] font-semibold leading-[12px] sm:leading-[21px] ">
                    <th className="border-b border-classtableborder p-[4px] sm:p-[10px] text-center w-[20px] sm:w-[100px]">
                      Resim
                    </th>
                    <th className="border-b border-classtableborder p-[4px] sm:p-[10px] text-center">
                      Sınıf
                    </th>
                    <th className="border-b border-classtableborder p-[4px] sm:p-[10px] text-center">
                      Sınıf Adı
                    </th>
                    <th className="border-b border-classtableborder p-[4px] sm:p-[10px] text-center">
                      Sınıf Şubesi
                    </th>
                    <th className="border-b border-classtableborder p-[4px] sm:p-[10px] sm:w-[40px] ">
                      Seçenekler
                    </th>
                  </tr>
                </thead>
                <tbody className="text-classtablepcolor text-[6px] sm:text-[10px] lg:text-[14px] leading-[15px] font-normal w-full ">
                  {classes.map((classInfo) => (
                    <tr key={classInfo.id}>
                      <td className="border-b border-classtableborder text-center p-4">
                        <PiStudentFill className="ml-2 sm:ml-6 w-2 sm:w-4 h-2 sm:h-4" />
                      </td>
                      <td className="border-b border-classtableborder text-center p-4">
                        {classInfo.grade}
                      </td>
                      <td className="border-b border-classtableborder text-center p-4">
                        {classInfo.name}
                      </td>
                      <td className="border-b border-classtableborder text-center p-4">
                        {classInfo.section}
                      </td>
                      <td
                        id="dropdownmenu"
                        className="border-b border-classtableborder text-tablepcolor"
                      >
                        <div className="relative inline-block flex items-center justify-center">
                          <div>
                            <button
                              type="button"
                              className="inline-flex text-classtablepcolor "
                              onClick={() => handleDropdownToggle(classInfo.id)}
                            >
                              <BsThreeDotsVertical className="fill-classtablepcolor w-3 sm:w-5 md:w-[26px] h-3 sm:h-5 md:h-[26px] hover:scale-105 hover:fill-[#8b5cf6]" />
                            </button>
                          </div>

                          {dropdownOpen === classInfo.id && (
                            <div
                              className=" absolute top-5 right-5 mt-2 w-32 sm:w-52 md:w-64 rounded-md shadow-lg bg-classwhite ring-1 ring-black ring-opacity-5 z-10"
                              role="menu"
                              aria-orientation="vertical"
                              aria-labelledby="options-menu"
                            >
                              <div role="none">
                                <button
                                  className="block p-[3px] sm:p-[10px] flex flex-row items-center text-[8px] sm:text-[12px] md:text-[15px] hover:bg-[#f3f4f6] w-full"
                                  role="menuitem"
                                  onClick={() =>
                                    handleDropdownSelect("edit", classInfo.id)
                                  }
                                >
                                  <FaEdit className="mr-2 w-2 sm:w-4 h-2 sm:h-4" />
                                  Düzenle
                                </button>
                                <button
                                  className="block p-[3px] sm:p-[10px] flex flex-row items-center text-[8px] sm:text-[12px] md:text-[15px] hover:bg-[#f3f4f6] w-full"
                                  onClick={() => {
                                    handleDropdownSelect("view", classInfo.id);
                                    handleViewStudentList(classInfo.id);
                                  }}
                                >
                                  <FaList className="mr-2 w-2 sm:w-4 h-2 sm:h-4" />
                                  Öğrenci Listesini Görüntüle
                                </button>
                                <button
                                  className="block p-[3px] sm:p-[10px] flex flex-row items-center text-[8px] sm:text-[12px] md:text-[15px] hover:bg-[#f3f4f6] w-full"
                                  onClick={() => {
                                    handleDropdownSelect(
                                      "delete",
                                      classInfo.id
                                    );
                                  }}
                                >
                                  <RiDeleteBinFill className="mr-2 w-2 sm:w-4 h-2 sm:h-4" />
                                  Sınıfı Sil
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {showEditPopUp && (
          <EditPopUp
            classInfo={classes.find(
              (classInfo) => classInfo.id === editClassId
            )}
            onClose={() => setShowEditPopUp(false)}
            onUpdateClass={handleUpdateClass}
          />
        )}

        {confirmDelete && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
            <div className="bg-white p-8 rounded-lg">
              <p className="mb-4 text-lg text-black">
                Bu sınıfı silmek istediğinizden emin misiniz?{" "}
              </p>
              <div className="flex justify-end">
                <button
                  className="mr-3 px-6 py-2 bg-classdeletebutton text-white rounded flex flex-row items-center justify-center text-classwhite  rounded-full hover:scale-105 cursor-pointer"
                  onClick={handleConfirmDelete}
                >
                  Sil
                </button>
                <button
                  className="px-4 py-2 text-classdeletebutton hover:scale-105"
                  onClick={handleCancelDelete}
                >
                  Kapat
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClassListPage;
