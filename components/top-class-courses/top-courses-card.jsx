import { useEffect, useState } from "react";
import "./top-courses.css";
import Image from "next/image";
import { getAPI } from "@/services/fetchAPI";
export const TopCoursesCard = () => {
  const [coursesCard, setCoursesCard] = useState([]);
  useEffect(() => {
    const coursesData = getAPI("/home/HomeCoursesCard");
    coursesData
      .then(function (result) {
        console.log(result);
        setCoursesCard(result);
      })
      .catch(function (error) {
        console.error("Hata oluştu:", error);
      });
  }, []);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-20 pt-20">
      {coursesCard.map((course, index) => (
        <div
          key={index}
          style={{
            borderColor: course.boxBorder,
            backgroundColor: course.boxBackground,
          }}
          className={`hover:bg-cst_purple hover:cursor-pointer group top-courses bg-no-repeat bg-right-bottom flex flex-row items-center justify-start gap-6 border border-gray-200 rounded-md pt-10 pb-10 ps-5 pe-5 `}
        >
          <div
            className={`text-3xl flex items-center justify-center border-2 border-solid  rounded-full bg-transparent h-16 w-16 text-white bg-[${course.background}]`}
            style={{
              borderColor: course.border,
              backgroundColor: course.background,
              boxShadow: "0 4px 20px #d0d0d0",
              transition: "all .41s ease-in-out ",
            }}
          >
            {
              <Image
                className="p-3 flex items-center justify-center mx-auto"
                src={course.icon}
                width={50}
                height={50}
                alt={course.icon}
              />
            }
          </div>
          <div className="flex flex-col">
            <p className="text-xl text-cst_purple">{course.title}</p>
            {/* <p className="text-base text-cst_grey ">{course.quantity}</p> */}
          </div>
          <div></div>
        </div>
      ))}
    </div>
  );
};
