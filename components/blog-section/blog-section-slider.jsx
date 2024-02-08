import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Mousewheel, Keyboard } from 'swiper/modules';
import {blogcard} from "../constants/index"
import { BsPerson } from "react-icons/bs";
import { SlCalender } from "react-icons/sl";


export const BlogSectionSlider = () => {
  return (
    <div className="mt-10">
    <Swiper
       slidesPerView={1}
       spaceBetween={30}
       loop={true}
       cssMode={true}
       navigation={true}
       mousewheel={true}
       keyboard={true}
       modules={[Navigation, Mousewheel, Keyboard]}
       className="pb-32"
       breakpoints={{
        640: {
          slidesPerView: 2,
        },
        1024: {
          slidesPerView: 3,
        },
        1280:{
          slidesPerView: 4,

        }
      }}
     >
       {blogcard.map((item, index) => (
         <SwiperSlide key={index}>
           <div className="flex flex-col items-center gap-3 bg-white border border-border rounded-lg pb-10">
             <figure className="overflow-hidden">
               <img src={item.image} alt="" className="rounded-t-lg hover:transform hover:scale-105 transition-transform duration-300 ease-in-out"/>
             </figure>
             <div className="flex flex-col items-start ps-8 gap-2">
               <p className="text-base rounded-md bg-plant text-buttonColor px-3">{item.role}</p>
               <p className="text-cst_purple font-semibold text-xl">{item.title}</p>
               <div className="flex gap-3">
                <div className="text-tabs text-base flex items-center gap-2">
                  <span className="text-md text-buttonColor">
                      <BsPerson />
                    </span>{item.date}
                    </div>
                <div className="flex gap-1 justify-between text-tabs ">
                  <span className="text-tabs text-base flex items-center gap-2"><span className="text-md text-buttonColor"> <SlCalender /></span>By</span>
                  <span className="font-medium text-cst_purple test-base">{item.by}</span>
                  </div>
                   
               </div>
             </div>
           </div>
         </SwiperSlide>
       ))}
     </Swiper>

   </div>
  )
}
