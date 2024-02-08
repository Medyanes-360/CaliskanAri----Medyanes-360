import { coursesCard } from "../constants";
import "./top-courses.css"
export const TopCoursesCard = () => {

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-20 pt-20">
      {coursesCard.map((course, index) => (
        <div
          key={index}
          className="hover:bg-cst_purple group top-courses bg-no-repeat bg-right-bottom flex flex-row items-center justify-start gap-6 border bg-card hover:bg-cst_purple rounded-md pt-10 pb-10 ps-5 pe-5 "
        >
          <div
            className={`text-3xl flex items-center justify-center border-2 border-solid ${course.border} rounded-full bg-transparent h-16 w-16 text-white p-9`}
            style={{
              backgroundImage: `${course.background}`,
              boxShadow: "0 4px 20px #d0d0d0",
              transition: "all .41s ease-in-out ",
            }}
          >
            {
              <span>
                <course.icon />
              </span>
            }
          </div>
          <div className="flex flex-col">
            <p className="text-xl text-cst_purple">{course.title}</p>
            <p className="text-base text-cst_grey ">{course.quantity}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
