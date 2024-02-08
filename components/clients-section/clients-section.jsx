"use client"
import { info, image } from "../constants/index";
import { ClientSlider } from "./clients-slider";
export const ClientsSection = () => {
  const { clientTitle1, clientTitle2, clientDesc } = info;
  const { underline } = image;
  return (
    <div className="bg-cream pt-24">
      <div className="mx-auto container p-6 relative">
        <div className="flex flex-col items-center justify-center">
          <p className="text-cst_grey text-sm p-1">{clientTitle1}</p>
          <div className="text-cst_purple text-4xl font-semibold relative pb-6">
            <h2>{clientTitle2}</h2>
            <img src={underline} alt="" className="absolute right-7" />
          </div>
          <p className="text-cst_grey text-base">{clientDesc}</p>
        </div>
        <img
        className="absolute -top-14 right-3"
          src="https://www.radiustheme.com/demo/wordpress/themes/quiklearn/wp-content/themes/quiklearn/assets/element/red-star.svg" alt=""
        />
      </div>
      <ClientSlider />
    </div>
  );
};
