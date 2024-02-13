import { Rating } from "@mui/material";
import { featured } from "../constants";
import { BsPerson } from "react-icons/bs";
import { PiNotebookThin } from "react-icons/pi";
import { info, image } from "../constants/index";
import { useState } from "react";
import { motion } from "framer-motion";

import "./featured-card.css";

export const FeaturedCourses = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const { featuredTitle1, featuredTitle2 } = info;
  const { underline } = image;

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };
  const filteredFeatured = selectedCategory
    ? featured.filter((item) => item.topDesc === selectedCategory)
    : featured;
 

    const container = {
      hidden: { opacity: 1, scale: 0 },
      visible: {
        opacity: 1,
        scale: 1,
        transition: {
          delayChildren: 0.3,
          staggerChildren: 0.2
        }
      }
    }
      
    const item = {
      hidden: { y: 20, opacity: 0 },
      visible: {
        y: 0,
        opacity: 1
      }
    }
  return (
    <div className="bg-cream">
      <div className="mx-auto container px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="flex flex-col items-center justify-between md:flex-row">
          <div>
            <p className="text-cst_grey text-sm pb-2">{featuredTitle1}</p>
            <h2 className="text-4xl font-semibold relative pb-8 text-[#241442]">
              {featuredTitle2}
              <img src={underline} alt="" className="absolute right-20" />
            </h2>
          </div>
          <div className="flex flex-wrap gap-2 w-full justify-center sm:justify-end items-center pt-8 pb-8">
            <button
              onClick={() => handleCategoryClick(null)}
              className={
                selectedCategory === null
                  ? "featured-button"
                  : "featured-select"
              }
            >
              Hepsi
            </button>
            <button
              onClick={() => handleCategoryClick("Business")}
              className={
                selectedCategory === "Business"
                  ? "featured-button"
                  : "featured-select"
              }
            >
              Matematik
            </button>
            <button
              onClick={() => handleCategoryClick("Development")}
              className={
                selectedCategory === "Development"
                  ? "featured-button"
                  : "featured-select"
              }
            >
              Türkçe
            </button>
            <button
              onClick={() => handleCategoryClick("Finance")}
              className={
                selectedCategory === "Finance"
                  ? "featured-button"
                  : "featured-select"
              }
            >
              Fen Bilimleri
            </button>
            <button
              onClick={() => handleCategoryClick("Technology")}
              className={
                selectedCategory === "Technology"
                  ? "featured-button"
                  : "featured-select"
              }
            >
              İngilizce
            </button>
          </div>
        </div>

        <motion.ul className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8 container"  
        variants={container}
    initial="hidden"
    animate="visible">
          {filteredFeatured.map((featured, index) => (
            <motion.li
              key={index}
              className="group relative bg-white border-border border rounded-lg item shadow-lg"
              variants={item}
            >
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-t-md lg:aspect-none">
                <figure className="relative cursor-pointer">
                  <img
                    src={featured.image}
                    alt="featured-courses"
                    className="h-full w-full object-cover object-center lg:h-full lg:w-full "
                  />
                  <figcaption className="absolute  top-3 left-3 bg-white text-cst_grey text-sm rounded py-1 px-2">
                    <p>{featured.topDesc}</p>
                  </figcaption>
                </figure>
              </div>
              <div className="mt-3 mb-3 px-5 pt-3 max-h-full">
                <div className="flex flex-col justify-between items-center min-h-[150px] h-full">
                  <div className="flex mb-3 gap-3">
                    <p className="mt-1 text-sm text-cst_grey flex items-center">
                      <span className="text-md">
                        <BsPerson />
                      </span>
                      {featured.students} Student
                    </p>

                    <p className="mt-1 text-sm text-cst_grey flex items-center">
                      <span className="text-md">
                        <PiNotebookThin />
                      </span>
                      {featured.lessons} Lessons
                    </p>
                  </div>

                  <h3 className="text-xl font-semibold text-gray-700 mb-3">
                    <a href="">
                      <span aria-hidden="true" className="absolute inset-0" />
                      {featured.title}
                    </a>
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">{featured.name}</p>
                  <div className="flex justify-between items-center gap-1">
                    <Rating
                      name="simple-controlled"
                      value={featured.star}
                    />
                    <div className="flex flex-col items-center gap-2">
                    <strike >
                      {featured.discount}
                    </strike>
                    <p className="text-xl font-semibold text-gray-900">
                      {featured.price}
                    </p>
                    </div>
                   
                  </div>
                </div>
              </div>
            </motion.li>
          ))}


        </motion.ul>
      </div>
    </div>
  );
};
