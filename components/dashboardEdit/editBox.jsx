import React from "react";
import Image from "next/image";

function EditBox({
  image,
  title,
  description,
  onClick,
  id,
  path,
  features,
  number,
  small = false,
}) {
  return (
    <div className="m-2 lg:m-5">
      <div
        className={`generalBoxDiv w-36  ${
          features !== undefined ? "lg:h-96 h-72" : "lg:h-52 "
        } ${
          small ? "lg:w-52" : "lg:w-64"
        }  bg-gray-100 rounded-xl p-2 lg:p-5 flex flex-col items-center justify-center cursor-pointer relative shadow-xl hover:scale-110 transition-all duration-500`}
        onClick={onClick}
      >
        {number !== undefined && (
          <div className="numberImageArea bg-red-600 lg:w-8 lg:h-8 h-5 w-5 rounded-full absolute top-2 right-2 flex items-center justify-center">
            <h1 className="text-white font-semibold text-center text-xs lg:text-sm">
              {number}
            </h1>
          </div>
        )}
        <div className="imgArea flex items-center justify-center">
          <Image
            src={image}
            width={80}
            height={80}
            alt={title}
            className="mb-2 lg:w-[80px] lg:h-[80px] h-[35px] w-[35px]"
          />
        </div>
        <div className="titleArea">
          <h1 className=" text-xs lg:text-base font-bold text-center text-gray-600">
            {title}
          </h1>
        </div>
        <div className="descriptionArea lg:my-2 my-1 ">
          <h1
            className={` ${
              features !== undefined
                ? "lg:text-[13px] text-[11px]"
                : "lg:text-[11px] text-[10px]"
            }  text-center font-normal text-gray-600`}
          >
            {description}
          </h1>
        </div>
        {features && (
          <div className="featuresArea px-2 lg:px-0">
            <ul className="list-disc">
              {features.map((feature, index) => (
                <li
                  className="lg:text-[11.5px] text-[10px] text-gray-600"
                  key={index}
                >
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default EditBox;
