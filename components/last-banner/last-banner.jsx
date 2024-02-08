import { CustomButton } from "../helpers/custom-button"
import "./last-banner.css"
import {image} from "../constants/index"


export const LastBanner = () => {
    const {graduation}=image
  return (

    <div className="bg-buttonColor last-banner">
        <div className="last-banner-mount flex flex-col gap-5 lg:flex-row items-center justify-between bg-no-repeat bg-left-bottom px-20 pt-10">
        <div><img src={graduation} alt="" /></div>
        <h2 className="text-white font-semibold text-4xl text-center lg:text-start">Affordable Online Courses & Learning Opportunities For You</h2>
        <span className="mb-10 lg:mb-0">
       <CustomButton title="Start Learning Today" buttonColor="white" textColor="#543EE8"/>

        </span>
        </div>
    

    </div>

  )
}
