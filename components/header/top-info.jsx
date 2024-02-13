import { RiMapPin5Line } from "react-icons/ri";
import { SlCalender } from "react-icons/sl";
import { FiClock } from "react-icons/fi";
import moment from "moment";
import { contact } from "../constants/index.js";


export const TopInfo = () => {
  const {mapUrl,address  } = contact;

  return (
    <div className="bg-cream flex items-center justify-center gap-3 lg:hidden px-10 pt-5 flex-wrap">
           <p className="text-cst_grey flex items-center gap-1 text-xs"> <span className="text-buttonColor"><SlCalender /></span>{moment().format('LL')}</p>
        <a
                 className="flex items-center gap-1 justify-center md:justify-start text-cst_grey text-xs"
                href={mapUrl}
                 rel="noreferrer"
                 target="_blank"
               >
                 <span className="text-buttonColor text-lg">
                   <RiMapPin5Line />
                 </span>
                 {address}
               </a>
              <p className="text-cst_grey flex items-center gap-1 text-xs"><span className="text-buttonColor text-lg"><FiClock /></span>Opening: Mon-Sat 08.00-18.00 </p>
    </div>
  )
}
