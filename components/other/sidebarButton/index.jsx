"use client"
import React, {useState } from 'react';
import { VscCircleFilled } from "react-icons/vsc";
import { RiArrowDropDownLine} from "react-icons/ri";
import style from './styles.module.css';

// YAPILACAKLAR: https://www.framer.com/motion/ EFEKTLERİ İLE DAHA EFEKTİF CSS YAZILACAK.


// ...props dememizin sebebi: children harici gele nher şeyi props ismi altında al ve kullan.
const Button = ({text, label="", icon, buttonDisabled=false, children=null, contentData}) => {

  const [dropdownIsActive, setDropdownIsActive] = useState(false);
  return (  
    <div className={`${children ? "mt-[-2px]" : ""} relative ${dropdownIsActive && children && ""}`}>

      {label && <label htmlFor={text + label + "1"} className='pl-2 px-1 border-b bg-gray-700 text-white border-gray-400 py-4 w-full block'>{label}</label>} 
      
      <button id={`${text + label}`} disabled={buttonDisabled} className={`group px-2 h-12 flex w-full flex-row justify-between items-center text-secondary ${children ? "hover:bg-primary hover hover:text-white mt-[-2px]" : style.test + " hover:bg-secondary hover:text-white"} ${children && dropdownIsActive && "bg-primary text-white"}`} onClick={() => setDropdownIsActive(!dropdownIsActive)}>
        
        <div className={`flex w-full flex-row items-center gap-2 group-hover:text-white group-hover:font-bold ${contentData?.name == text  && "text-primary font-bold border-r-4 mr-4 border-primary"}`}>
          {!children && !label && <div className={`${style.test2}`}></div>}
          
          {!children && <VscCircleFilled size={10} className={`text-[rgba(185,199,212)] opacity-0  ${contentData?.name == text && "opacity-100 text-primary"}`}/>}
          {icon && <div>{icon}</div>}
          <div>{text}</div>
        </div>
        
        <div className={`${children ? 'block' : 'hidden'}`}>
          <RiArrowDropDownLine size={30} className={`${dropdownIsActive ? "rotate-0" : "-rotate-90"} transition-all`}/>
        </div>
      </button>
      <ul className={`${children && dropdownIsActive ? 'block' : 'hidden'} pl-4 transition-all relative`}>
        <li>
          {children}
        </li>
      </ul>
    </div>
  )
}

export default Button
