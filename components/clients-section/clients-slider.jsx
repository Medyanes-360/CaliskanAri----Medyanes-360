"use client"
import { Rating } from "@mui/material";
import { clients } from "../constants/index";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination,Mousewheel } from "swiper/modules";

export const ClientSlider = () => {
  return (
    <div className="lg:px-8 mt-10 pb-28">
     <Swiper
        slidesPerView={1}
        spaceBetween={30}
       loop={true}
        pagination={{
          clickable: true,
        }}
       mousewheel={true}
        modules={[Pagination,Mousewheel]}
        className="mySwiper"
        breakpoints={{
          640: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
        }}
      >
        {clients.map((item, index) => (
          <SwiperSlide key={index}>
            <div className="flex items-center gap-3 bg-white border border-border rounded-lg px-10 py-20">
              <figure>
                <img src={item.image} alt="" className="rounded-full w-48"/>
              </figure>
              <div className="flex flex-col gap-2">
                <Rating name="simple-controlled" value={item.star} />
                <p className="text-base text-cst_grey">{item.comment}</p>
                <p className="text-cst_purple font-semibold text-xl">{item.name}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

    </div>
  );
};
