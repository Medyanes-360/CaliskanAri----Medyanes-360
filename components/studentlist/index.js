"use client";
import React, { useState } from "react";
import { Formik, Field, ErrorMessage, Form } from "formik";
import * as Yup from "yup";
import { FaArrowLeft, FaPlus, FaExclamationCircle } from "react-icons/fa";
import { RiDeleteBinFill } from "react-icons/ri";
import { PiStudentFill } from "react-icons/pi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ViewStudentList = ({
  classInfo,
  onDeleteStudent,
  onAddStudent,
  onBackToClassList,
  setShowClassButton,
}) => {
  const [confirmDeleteStudent, setConfirmDeleteStudent] = useState(false); //öğrenci silme işleminin onaylanıp onaylanmadığını belirten state
  const [studentToDelete, setStudentToDelete] = useState(null); //silinecek öğrencinin id sini tutan state

  // Yup kütüphanesi kullanılarak form doğrulama şemaları belirlenir.
  const validationSchema = Yup.object({
    newStudentName: Yup.string()
      .matches(/^[a-zA-Z\s]+$/, "Rakam veya özel karakterler kullanılamaz.")
      .min(3, "En az 3 karakter olmalıdır.")
      .required("Bu alan zorunludur."),
    newStudentEmail: Yup.string()
      .email("Geçersiz e-posta adresi girdiniz.")
      .required("Bu alan zorunludur."),
  });

  //silme işlemi başladığında çağrılan fonksiyon
  const handleDeleteConfirmation = (studentId) => {
    setStudentToDelete(studentId);
    setConfirmDeleteStudent(true);
  };

  //silme işlemi iptal edildiğinde çağrılan fonksiyon
  const handleCancelDeleteStudent = () => {
    setStudentToDelete(null);
    setConfirmDeleteStudent(false);
  };

  //silme işlemi onaylandığında çağrılan fonksiyon
  const handleConfirmDeleteStudent = () => {
    onDeleteStudent(studentToDelete);
    setStudentToDelete(null);
    setConfirmDeleteStudent(false);
  };

  return (
    <div id="studentlist" className="container mx-auto">
      <div className="flex flex-row pl-6 items-center h-[60px] sm:h-[90px] md:h-[120px] text-black">
        <button
          id="backtoclasslistbutton"
          onClick={() => {
            onBackToClassList();
            setShowClassButton(true);
          }}
          className="mr-2 hover:scale-105 hover:text-[#6366f1]"
        >
          <FaArrowLeft className="w-3 sm:w-6 h-3 sm:h-6" />
        </button>
        <h2 className="text-[14px] sm:text-[20px] md:text-[26px] font-semibold ">
          {classInfo.name} - Öğrenci Listesi
        </h2>
      </div>

      <div
        id="addstudentform"
        className="flex flex-col lg:flex-row items-center justify-center mb-[50px] shadow-md p-8 rounded-md bg-[#eef2ff] mx-6 sm:mx-8 md:mx-12 relative"
      >
        <Formik
          initialValues={{
            newStudentName: "",
            newStudentEmail: "",
          }}
          validationSchema={validationSchema}
          onSubmit={(values, { resetForm }) => {
            if (values.newStudentName.trim() === "" || values.newStudentEmail.trim() === "") {
              console.log("Lütfen hem adınızı hem de e-posta bilgilerinizi girin!");
            } else {
              onAddStudent(values.newStudentName, values.newStudentEmail);
              resetForm();
              toast.success("Yeni öğrenci bilgileri eklendi!");
            }
          }}
        >
          <Form className="flex flex-col lg:flex-row items-center justify-center">
            <div className="mr-0 lg:mr-8 flex flex-col sm:flex-row items-center justify-center mb-5 lg:mb-0">
              <div className="flex flex-col mr-0 sm:mr-6 mb-3 sm:mb-0 ">
                <Field
                  type="text"
                  name="newStudentName"
                  placeholder="Yeni Öğrenci Adı"
                  className={`border focus:outline-none hover:ring-classprimary hover:ring-1 p-2 rounded-md max-w-[180px] sm:max-w-[238px] text-[8px] sm:text-[16px] text-black bg-white`}
                />
                <ErrorMessage
                  name="newStudentName"
                  component={({ children }) => (
                    <div className="z-10 bg-[#ef4444] text-classwhite flex items-center justify-center rounded-md p-1 mt-2 border border-[2px] border-solid border-[#dddddd] text-[8px] sm:text-sm">
                      <FaExclamationCircle className="mr-2 " />
                      {children}
                    </div>
                  )}
                />
              </div>
              <div className="mr-0 lg:mr-6">
                <Field
                  type="email"
                  name="newStudentEmail"
                  placeholder="example@example.com"
                  className={`border focus:outline-none hover:ring-classprimary hover:ring-1 p-2 rounded-md max-w-[180px] sm:max-w-[238px] text-[8px] sm:text-[16px] text-black bg-white`}
                />
                <ErrorMessage
                  name="newStudentEmail"
                  component={({ children }) => (
                    <div className="z-10 bg-[#ef4444] text-classwhite flex items-center justify-center rounded-md p-1 mt-2 border border-[2px] border-solid border-[#dddddd] text-[8px] sm:text-sm">
                      <FaExclamationCircle className="mr-2 " />
                      {children}
                    </div>
                  )}
                />
              </div>
            </div>
            <div
              id="addstudentbutton"
              className="flex flex-row items-center justify-center bg-classprimary/75 text-white py-2 px-4 sm:px-6 rounded-full hover:scale-105 hover:bg-classprimary w-28 sm:w-44 md:w-48 text-[8px] sm:text-[16px]"
            >
              <button type="submit" className="flex flex-row items-center ">
                <span className="mr-2">
                  <FaPlus />
                </span>
                Öğrenci Ekle
              </button>
            </div>
          </Form>
        </Formik>
      </div>

      <div
        id="studentlisttable"
        className="flex items-center justify-center mx-6 sm:mx-12"
      >
        <table className="table-auto border-collapse border-b border-classtableborder w-full max-w-[900px] text-black">
          <thead>
            <tr className="text-classtablehead text-[10px] sm:text-[12px] md:text-[15px] font-semibold leading-[21px] ">
              <th className="border-b border-classtableborder py-[5px] sm:py-[10px] text-center w-[20px] sm:w-[60px] px-2 sm:px-6 ">
                Fotoğraf
              </th>
              <th className="border-b border-classtableborder p-[5px] sm:p-[10px] text-left">
                Öğrenci Adı & E-mail
              </th>
              <th className="border-b border-classtableborder p-[5px] sm:p-[10px] text-left">
                Sınıf İsmi
              </th>
              <th className="border-b border-classtableborder p-[5px] sm:p-[10px] text-center">
                Seçenekler
              </th>
            </tr>
          </thead>
          <tbody className="text-classtablepcolor text-[8px] sm:text-[10px] md:text-[14px] leading-[20px] font-normal w-full ">
            {classInfo.students.map((student) => (
              <tr key={student.id} className="border-b">
                <td className="border-b border-classtableborder py-4 px-[5px] sm:px-[10px] text-center ">
                  <PiStudentFill className="ml-2 sm:ml-6 w-4 sm:w-6 h-4 sm:h-6" />
                </td>
                <td className="border-b border-classtableborder py-4 px-[5px] sm:px-[10px]">
                  <div className="text-[#333333] text-[9px] sm:text-[12px] md:text-[15px] font-semibold">
                    {student.name}
                  </div>
                  <div>{student.email}</div>
                </td>
                <td className="border-b border-classtableborder py-4 px-[5px] sm:px-[10px]">
                  {classInfo.name}
                </td>
                <td
                  id="deletestudentbutton"
                  className="border-b border-classtableborder py-4 px-[10px] text-center"
                >
                  <button onClick={() => handleDeleteConfirmation(student.id)}>
                    <RiDeleteBinFill className="fill-classdeletebutton w-3 sm:w-5 h-3 sm:h-5 hover:scale-105" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ToastContainer />

      {confirmDeleteStudent && (
        <div className="fixed inset-0 flex items-center justify-center bg-classblack bg-opacity-60 z-50">
          <div className="bg-classwhite p-8 rounded-lg">
            <p className="mb-4 text-lg">
              Bu öğrenciyi silmek istediğinizden emin misiniz?
            </p>
            <div className="flex justify-end">
              <button
                className="mr-3 px-6 py-2 bg-classdeletebutton text-classwhite rounded-full hover:scale-105 cursor-pointer"
                onClick={handleConfirmDeleteStudent}
              >
                Sil
              </button>
              <button
                className="px-4 py-2 text-classdeletebutton hover:scale-105"
                onClick={handleCancelDeleteStudent}
              >
                Kapat
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewStudentList;