import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { IoClose } from "react-icons/io5";
import { FaExclamationCircle } from "react-icons/fa";

const EditPopUp = ({ classInfo, onClose, onUpdateClass }) => {
  const initialValues = {
    name: classInfo.name,
    grade: classInfo.grade,
    section: classInfo.section,
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, "En az 3 karakter olmalıdır.")
      .required("Bu alan zorunludur."),
    grade: Yup.number().required("Bu alan zorunludur."),
    section: Yup.string().required("Bu alan zorunludur."),
  });

  const handleSave = (values) => {
    onUpdateClass(values.name, values.grade, values.section);
    onClose();
  };

  return (
    <div
      id="editpopuppage"
      className="fixed inset-0 flex  items-center justify-center bg-black bg-opacity-60 z-50"
    >
      <div className="relative bg-classwhite p-4 sm:p-8 rounded-md shadow-md w-[340px] sm:w-[400px] md:w-[450px] text-black">
        <h2 className="text-sm sm:text-2xl font-bold mb-4">
          Sınıf Bilgilerini Düzenle
        </h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSave}
        >
          {({ isSubmitting }) => (
            <Form>
              <div id="classnameinput" className="mb-4 ">
                <label
                  htmlFor="className"
                  className="w-full flex flex-row items-center text-black"
                >
                  <p className="w-[85px] sm:w-[150px] text-[14px] sm:[16px]">
                    Sınıf Adı:
                  </p>
                  <Field
                    type="text"
                    name="name"
                    id="className"
                    className={`bg-white border border-[#9ca3af] focus:outline-none hover:ring-classprimary hover:ring-1 p-2 rounded-md mr-6 max-w-[150px] sm:max-w-[238px] text-sm`}
                  />
                  <ErrorMessage
                    name="name"
                    component={({ children }) => (
                      <div className="z-10 bg-[#ef4444] text-classwhite flex items-center justify-center rounded-md p-1 mt-2 border border-[2px] border-solid border-[#dddddd] text-[8px] sm:text-sm">
                        <FaExclamationCircle className="mr-2" />
                        {children}
                      </div>
                    )}
                  />
                </label>
              </div>
              <div id="gradeinput" className="mb-4">
                <label
                  htmlFor="classGrade"
                  className="w-full flex flex-row items-center text-black"
                >
                  <p className="w-[85px] sm:w-[150px] text-[14px] sm:[16px]">
                    Sınıf:
                  </p>
                  <Field
                    type="number"
                    as="select"
                    name="grade"
                    id="classGrade"
                    className={`bg-white border border-[#9ca3af] focus:outline-none hover:ring-classprimary hover:ring-1 p-2 rounded-md mr-6 max-w-[150px] sm:max-w-[238px] text-sm`}
                  >
                    {/* 1-12 */}
                    {[...Array(12)].map((_, index) => (
                      <option key={index + 1} value={index + 1}>
                        {index + 1}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage
                    name="grade"
                    component={({ children }) => (
                      <div className="z-10 bg-[#ef4444] text-white flex items-center justify-center rounded-md p-1 mt-2 border border-[2px] border-solid border-[#dddddd] text-[8px] sm:text-sm">
                        <FaExclamationCircle className="mr-2" />
                        {children}
                      </div>
                    )}
                  />
                </label>
              </div>
              <div className="mb-4">
                <label
                  htmlFor="classSection"
                  className="w-full flex flex-row items-center text-black"
                >
                  <p className="w-[85px] sm:w-[150px] text-[14px] sm:[16px]">
                    Sınıf Şubesi:
                  </p>
                  <Field
                    as="select"
                    name="section"
                    id="classSection"
                    className={`bg-white border border-[#9ca3af] focus:outline-none hover:ring-classprimary hover:ring-1 p-2 rounded-md mr-6 max-w-[150px] sm:max-w-[238px] text-sm`}
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
                  <ErrorMessage
                    name="section"
                    component={({ children }) => (
                      <div className="z-10 bg-[#ef4444] text-classwhite flex items-center justify-center rounded-md p-1 mt-2 border border-[2px] border-solid border-[#dddddd] text-[8px] sm:text-sm">
                        <FaExclamationCircle className="mr-2" />
                        {children}
                      </div>
                    )}
                  />
                </label>
              </div>
              <div id="buttons" className="flex justify-end">
                <button
                  type="submit"
                  className="flex items-center justify-center bg-classprimary/75 text-classwhite py-2 sm:py-4 px-4 sm:px-6 rounded-full hover:scale-105 hover:bg-classprimary w-16 sm:w-24 cursor-pointer text-sm sm:text-[16px]"
                  disabled={isSubmitting}
                >
                  Kaydet
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="absolute top-4 right-4 text-[#ef4444] hover:scale-105 hover:text-[#dc2626]"
                >
                  <IoClose className="w-5 sm:w-8 h-5 smh-8" />
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default EditPopUp;
