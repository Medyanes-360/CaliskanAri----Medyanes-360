import { contact, resources, footercourses } from "../constants/index.js";
import { RiMapPin5Line } from "react-icons/ri";
import { FiPhoneCall } from "react-icons/fi";
import { CgFacebook } from "react-icons/cg";
import { BsTwitter,BsDot } from "react-icons/bs";
import { TiSocialLinkedin } from "react-icons/ti";
import { BiLogoPinterestAlt } from "react-icons/bi";
import { PiInstagramLogo } from "react-icons/pi";
import { ScrollToTop } from "../helpers/scroll-to-top.jsx";

export const Footer = () => {
  const { phone, mapUrl,address } = contact;
  return (
    <>
      <div className="bg-white text-center grid lg:grid-cols-4 md:grid-cols-2 md:text-start my-20 container mx-auto ">
        <div>
          <ul className="text-cst_grey flex flex-col gap-3 leading-7">
            <li className="text-cst_purple font-semibold text-xl pb-3">
              QuikLearn
            </li>
            <li>
              When An Unknown Printer Took Galley Of Type And Scrambled It To
              Make Pspecimen Bookt Has.
            </li>
            <li>
              <a
                className="flex items-center gap-2 justify-center md:justify-start"
                href={mapUrl}
                rel="noreferrer"
                target="_blank"
              >
                <span className="text-tabs text-lg">
                  <RiMapPin5Line />
                </span>
                {address}
              </a>
            </li>
            <li>
              <a href={`tel:${phone}`} className="flex items-center justify-center md:justify-start gap-2">
                <span className="text-tabs text-lg">
                  <FiPhoneCall />
                </span>
                {phone}
              </a>
            </li>
          </ul>
          <ul className="flex text-cst_grey gap-5 mt-5 text-lg md:justify-start justify-center">
            <li className="bg-card rounded-full p-2 hover:bg-buttonColor hover:text-white">
              <a href="#" target="_blank" rel="noopener noreferrer">
                <CgFacebook />
              </a>
            </li>
            <li className="bg-card rounded-full p-2 hover:bg-buttonColor hover:text-white">
              <a href="#" target="_blank" rel="noopener noreferrer">
                <BsTwitter />
              </a>
            </li>
            <li className="bg-card rounded-full p-2 hover:bg-buttonColor hover:text-white">
              <a href="#" target="_blank" rel="noopener noreferrer">
                <TiSocialLinkedin />
              </a>
            </li>
            <li className="bg-card rounded-full p-2 hover:bg-buttonColor hover:text-white">
              <a href="#" target="_blank" rel="noopener noreferrer">
                <BiLogoPinterestAlt />
              </a>
            </li>
            <li className="bg-card rounded-full p-2 hover:bg-buttonColor hover:text-white">
              <a href="#" target="_blank" rel="noopener noreferrer">
                <PiInstagramLogo />
              </a>
            </li>
          </ul>
        </div>
        <div>
          <ul className="text-cst_grey flex flex-col gap-3 leading-7 mt-7">
            <li className="text-cst_purple font-semibold text-xl pb-3">Resource</li>
            {resources.map((item, index) => (
              <li key={index}> {item.label} </li>
            ))}
          </ul>
        </div>
        <div>
          <ul className="text-cst_grey flex flex-col gap-3 leading-7 mt-7">
            <li className="text-cst_purple font-semibold text-xl pb-3">Courses</li>
            {footercourses.map((item, index) => (
              <li key={index}>{item.label}</li>
            ))}
          </ul>
        </div>
        <div>
          <ul className="text-cst_grey flex flex-col gap-3 leading-7 mt-7">
            <li className="text-cst_purple font-semibold text-xl pb-3">
              Join Our Newsletter
            </li>
            <li>
              Nown Printer Took Galley Type And Scrambled It To Make Following
              With Us
            </li>
            <li className="relative flex">
              <input
                type="text"
                name="email"
                id="email"
                className="block w-full bg-white rounded-lg border-0 py-4 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 sm:text-sm sm:leading-6 mx-3 sm:mx-0"
                placeholder="Your Email Address"
              />
              <div className="absolute inset-y-0 right-2 flex items-center">
                <button className="hover:bg-cst_purple hover:text-white flex gap-2 px-3 py-2 items-center bg-buttonColor rounded-lg text-white text-lg hover:bg-cst_purple mx-3 sm:mx-0">
                  Sign Up
                </button>
              </div>
            </li>
            <li>We Only Send Interesting And Relevant Emails.</li>
          </ul>
        </div>

      </div>
      <div className="lg:flex lg:justify-around  bg-cream pt-8 pb-5 text-cst_grey text-center text-sm relative">
        <p>© 2023 quiklearn. All Rights Reserved by RadiusTheme</p>
        <div className="flex items-center justify-center gap-3">
          <span>Privacy Policy</span>
         <BsDot />
          <span>Term Conditions</span>
        </div>
      <ScrollToTop/>


      </div>
    </>
  );
};
