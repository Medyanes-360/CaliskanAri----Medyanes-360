import React from "react";
import Image from "next/image";

function EditBox({
  image,
  title,
  description,
  onClick,
  id,
  path,
  small = false,
}) {
  return (
    <div className="m-2 lg:m-5">
      <div
        className={`generalBoxDiv w-36 h-32 ${
          small ? "lg:w-52" : "lg:w-64"
        } lg:h-52 bg-gray-100 rounded-xl p-2 lg:p-5 flex flex-col items-center justify-center cursor-pointer`}
        onClick={onClick}
      >
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
        <div className="descriptionArea">
          <h1 className="text-[11px] text-center font-normal text-gray-500">
            {description}
          </h1>
        </div>
      </div>
    </div>
  );
}

export default EditBox;