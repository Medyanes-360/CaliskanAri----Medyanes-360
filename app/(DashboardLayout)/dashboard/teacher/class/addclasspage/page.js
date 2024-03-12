"use client";
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FaArrowLeft, FaPlus, FaExclamationCircle } from "react-icons/fa";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";

const AddClassPage = () => {
  const router = useRouter(); //önceki sayfaya dönmek için

  //form için yup ile doğrulama şeması
  const validationSchema = Yup.object({
    name: Yup.string()
      .min(3, "En az 3 karakter olmalıdır.")
      .required("Bu alan zorunludur."),
    grade: Yup.string().required("Bu alan zorunludur."),
    section: Yup.string().required("Bu alan zorunludur."),
  });

  
  const handleAddClass = async (values, { setSubmitting }) => {
    try {
      const response = await fetch("http://localhost:3000/api/classes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: values.name,
          grade: values.grade,
          section: values.section,
        }),
      });

      if (!response.ok) {
        console.error("Failed to add class:", response.statusText);
        toast.error("Sınıf eklenirken bir hata oluştu.");
        return;
      }

      const data = await response.json();
      console.log("Class added successfully:", data);

      toast.success("Yeni sınıf bilgileri eklendi!", {
        onClose: () => {
          router.back();
        },
      });
    } catch (error) {
      console.error("Error adding class:", error);
      toast.error("Sınıf eklenirken bir hata oluştu.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div id="addclasspage" className="container mx-auto">
      {/* Sınıf listesine sayfasına geri dönmek için button*/}
      <div
        id="backtoclasspagebutton"
        className="flex flex-row ml-6 items-center h-[60px] sm:h-[120px] text-black"
      >
        <Link href={"/dashboard/teacher/class"} className="mr-2">
          <FaArrowLeft className=" w-3 sm:w-6 h-3 sm:h-6 hover:scale-105 hover:text-[#6366f1]" />
        </Link>
        <h2 className="text-[14px] sm:text-[20px] md:text-[26px]">
          Sınıf Ekle
        </h2>
      </div>
      <div className="pb-[15px] sm:pb-[30px] text-[12px] sm:text-[18px] text-classtablehead leading-[21px] font-semibold tracking-wide m-4 sm:m-8 ">
        <h2>SINIF BİLGİLERİ </h2>
      </div>

      {/* Yeni sınıf eklemek için form*/}

      <Formik
        initialValues={{
          name: "",
          grade: "",
          section: "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleAddClass}
      >
        <Form
          id="addclassform"
          className="flex flex-col items-center justify-center"
        >
          <div
            id="addclassinputs"
            className="flex flex-col lg:flex-row gap-6 lg:gap-3 mb-6"
          >
            <div
              id="classnameinput"
              className="flex flex-col items-left relative "
            >
              <label
                htmlFor="name"
                className="absolute left-4 -top-3 font-semibold bg-white px-1 text-[#818386] text-[10px] sm:text-[14px]"
              >
                Sınıf Adı*
              </label>
              <Field
                type="text"
                id="name"
                name="name"
                className={`text-black bg-white border border-[#9ca3af]
    focus:outline-none hover:ring-classprimary hover:ring-1 p-2 rounded-md sm:mr-6 max-w-[180px] sm:max-w-[238px]`}
              />
              {/* Class Name için error mesajı */}
              <ErrorMessage
                name="name"
                component={({ children }) => (
                  <div className="z-10 bg-[#ef4444] text-white flex items-center justify-center rounded-md p-1 mt-2 border border-[2px] border-solid border-[#dddddd] text-[8px] sm:text-sm">
                    <FaExclamationCircle className="mr-2" />
                    {children}
                  </div>
                )}
              />
            </div>
            <div
              id="gradeinput"
              className="flex flex-col items-left relative min-w-[100px]"
            >
              <label
                htmlFor="grade"
                className="absolute left-4 -top-3 font-semibold px-1 bg-white  text-[#818386] text-[10px] sm:text-[14px]"
              >
                Sınıf*
              </label>
              <Field
                as="select"
                id="grade"
                name="grade"
                className={`text-black bg-white border border-[#9ca3af]
    focus:outline-none hover:ring-classprimary hover:ring-1 p-2 rounded-md sm:mr-6 max-w-[180px] sm:max-w-[238px]`}
              >
                {/* 1-12 */}
                {[...Array(12)].map((_, index) => (
                  <option key={index + 1} value={index + 1}>
                    {index + 1}
                  </option>
                ))}
              </Field>
              {/* Class Grade için error mesajı */}
              <ErrorMessage
                name="grade"
                component={({ children }) => (
                  <div className="z-10 bg-[#ef4444] text-white flex items-center justify-center rounded-md p-1 mt-2 border border-[2px] border-solid border-[#dddddd] text-[8px] sm:text-sm">
                    <FaExclamationCircle className="mr-2" />
                    {children}
                  </div>
                )}
              />
            </div>
            <div
              id="sectioninput"
              className="flex flex-col items-left relative min-w-[150px] "
            >
              <label
                htmlFor="section"
                className="absolute left-4 -top-3 font-semibold bg-white px-1 text-[#818386] text-[10px] sm:text-[14px] "
              >
                Sınıf Şubesi*
              </label>
              <Field
                as="select"
                id="section"
                name="section"
                className={`text-black bg-white border border-[#9ca3af]
    focus:outline-none hover:ring-classprimary hover:ring-1 p-2 rounded-md sm:mr-6 max-w-[180px] sm:max-w-[238px]`}
              >
                {/*A-Z*/}
                {Array.from({ length: 26 }, (_, index) => (
                  <option
                    key={String.fromCharCode(65 + index)}
                    value={String.fromCharCode(65 + index)}
                  >
                    {String.fromCharCode(65 + index)}
                  </option>
                ))}
              </Field>
              {/* Section için error mesajı */}
              <ErrorMessage
                name="section"
                component={({ children }) => (
                  <div className="z-10 bg-[#ef4444] text-white flex items-center justify-center rounded-md p-1 mt-2 border border-[2px] border-solid border-[#dddddd] text-[8px] sm:text-sm">
                    <FaExclamationCircle className="mr-2" />
                    {children}
                  </div>
                )}
              />
            </div>
          </div>

          <div
            id="addclassbutton"
            className="flex flex-row items-center justify-center bg-classprimary/75 text-white py-4 px-6 rounded-full hover:scale-105 hover:bg-classprimary w-36 sm:w-40 md:w-44 h-14 sm:f-full text-sm cursor-pointer"
          >
            <button type="submit" className="flex flex-row items-center ">
              <span className="mr-2">
                <FaPlus />
              </span>
              Sınıf Ekle
            </button>
          </div>
        </Form>
      </Formik>
      <ToastContainer />
    </div>
  );
};

export default AddClassPage;
