"use client";
import {postAPI, getAPI} from '@/services/fetchAPI/index';
import { ToastContainer, toast } from 'react-toastify';
import React, { useState, useEffect } from "react";
import HashLoader from "react-spinners/HashLoader";
import { HexColorPicker } from "react-colorful";
import { useSession } from 'next-auth/react';
import ValidationSchema from './formikData';
import {notFound} from 'next/navigation';
import { Formik, Form } from "formik";
import ImageUploader from '@/components/formElements/imageUploader';

const Slider = () => {

    const [mainText, setMainText] = useState();
    const [subText, setSubText] = useState();
    const [buttonText, setButtonText] = useState();
    const [buttonLink, setButtonLink] = useState();

    const [bgImage, setBgImage] = useState("");
    const [bgImageMd, setBgImageMd] = useState("");
    const [bgImageLg, setBgImageLg] = useState("");
    const [bgImageXl, setBgImageXl] = useState("");
    const [bgImage2Xl, setBgImage2Xl] = useState("");
    const [bgImage4Xl, setBgImage4Xl] = useState("");
    const [bgImage6Xl, setBgImage6Xl] = useState("");
    const [mainImage, setMainImage] = useState("");

    const [subTextColour, setSubTextColour] = useState("#000000");
    const [mainTextColour, setMainTextColour] = useState("#000000");
    const [buttonColour, setButtonColour] = useState("#000000");
    const [buttonTextColour, setButtonTextColour] = useState("#000000");
    const [bgColor, setBgColor] = useState("#000000");

    const [mainImageOpen, setMainImageOpen] = useState(false);
    const [MainTextOpen, setMainTextOpen] = useState(false);
    const [buttonOpen, setButtonOpen] = useState(false);
    const [subTextOpen, setSubTextOpen] = useState(false);
    const [changePosition, setChangePosition] = useState(false);
    const [backgrounBlur, setBackgrounBlur] = useState(false);
    const [bgImageOpen, setBgImageOpen] = useState(false);
    const [bgDarkness, setBgDarkness] = useState(false);

    const [bgDarknessValue, setBgDarknessValue] = useState("0.0");

    const [isLoading, setIsloading] = useState(false);

    const [sliderData, setSliderData] = useState();

    const [isEdit, setIsEdit] = useState(false);


//###################################################################
// sayfa rol kontrolü - erişim olmaz ise notfound'a yönlendirir. ####

  const pageRole = "admin";

  const {data}= useSession();
  const user = data.user;
  
  if(!user || user.role != pageRole ){
    return notFound();
  }

//###################################################################
//###################################################################

  else{
    return (
        <>

            <div className={`w-full  rounded shadow px-4 bg-[#c5d2de]  sm:px-6 py-6`}>
                <ToastContainer
                    className="4xl:text-4xl min:w-40"
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="dark"
                />

                <Formik
                initialValues={{
                    role: pageRole, // admin -> panel kim içinse o tanımlanacak
                    mainText: "",
                    subText: "",
                    buttonText: "",
                    buttonLink: "",
                    mainImage: "",
                    bgImage: "",
                    bgImageMd: "",
                    bgImageLg: "",
                    bgImageXl: "",
                    bgImage2Xl: "",
                    bgImage4Xl: "",
                    bgImage6Xl: "",
                    subTextColour: "",
                    mainTextColour: "",
                    buttonColour: "",
                    buttonTextColour: "",
                    bgColor: "",
                    mainImageOpen,
                    MainTextOpen,
                    buttonOpen,
                    subTextOpen,
                    changePosition,
                    backgrounBlur,
                    bgImageOpen,
                    bgDarkness,
                    bgDarknessValue: "0.0"
                }}

                validationSchema={ValidationSchema}
                
                onSubmit={(values) => {
                    postAPI("/dashboard/admin/slider", values)
                    .then((res) => {
                        if (res.status && (res.status === 200 || res.status === "success")) {
                        const timeOut = setInterval(() => {
                            // setIsloading(false);
                            clearInterval(timeOut);
                        }, 2000);
                        toast.success("Güncelleme işlemi başarılı!");
                        } else {
                        toast.error(res.error);
                        }
                    })
                    .catch((err) => {
                        toast.error(err.message);
                    });
                }}
                >

                {(props) => (
                    <Form onSubmit={props.handleSubmit}>
                        
                        <div className="flex flex-col w-full mx-auto min-h-screen">

                            <div className="w-full  p-4 flex bg-secondary rounded justify-center items-center">
                                <label className="text-white font-bold text-xl md:text-4xl">
                                    Slider Paneli
                                </label>
                            </div>

                            {/* buranın altında inputlar olacak */}
                            <div className='grid grid-cols-1 lg:grid-cols-2 gap-2'>

                                {/* Slider İçerik Bölümü */}
                                <div className="flex flex-col flex-nowrap gap-4 shadow p-2 rounded-xl bg-white mt-6 sm:mt-6 min-w-[200px] overflow-hidden">
                                    

                                    <div className='w-full flex justify-center items-center bg-gray-100 rounded-lg p-2'>
                                        <h2 className='text-md lg:text-xl text-secondary'>Slider İçerik Bölümü</h2>
                                    </div>
                                    
                                    {/* MAIN TEXT  START*/}
                                    <div className='w-full'>
                                            <label htmlFor="mainText" className="pl-2 block text-xl ">
                                                Ana Başlık
                                            </label>
                                            <input
                                            id="mainText"
                                            name="mainText"
                                            autoComplete="off"
                                            type="text"
                                            value={mainText}
                                            onChange={(e)=>{
                                                props.handleChange({
                                                    target: {
                                                        name: "mainText",
                                                        value: e.target.value,
                                                    },
                                                });
                                                setMainText(e.target.value);
                                            }}
                                            placeholder="Ana başlığınızı giriniz."
                                            className="min-w-[200px] shadow w-full px-4 py-2 text-md border border-blue-200 rounded-xl focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600"
                                            />
                                        </div>    

                                        {/* SUB TEXT  START*/}
                                        <div className='w-full'>
                                            <label htmlFor="mainText" className="pl-2 block text-xl ">
                                                Alt Açıklama Metni
                                            </label>
                                            <input
                                                id="subText"
                                                name="subText"
                                                autoComplete="off"
                                                type="text"
                                                value={buttonText}
                                                onChange={(e)=>{
                                                    props.handleChange({
                                                        target: {
                                                            name: "subText",
                                                            value: e.target.value,
                                                        },
                                                    });
                                                    setButtonText(e.target.value);
                                                }}
                                                placeholder="Alt açıklama yazınızı giriniz."
                                                className="min-w-[200px] shadow w-full px-4 py-2 text-md border border-blue-200 rounded-xl focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600"
                                            />
                                        </div>

                                        {/* BUTTON TEXT  START*/}
                                        <div className='w-full'>
                                            <label htmlFor="buttonText" className="pl-2 mt-2 block text-xl">
                                                <div className="flex flex-row flex-nowrap justify-start items-center gap-2">
                                                    <div className='flex min-w-[110px]'>Buton Metni</div><p className="text-xs">(Eğer burayı boş bırakırsanız buton gözükmeyecektir.)</p>
                                                </div>
                                            </label>
                                            <input
                                                id="buttonText"
                                                name="buttonText"
                                                autoComplete="off"
                                                type="text"
                                                value={subText}
                                                onChange={(e)=>{
                                                    props.handleChange({
                                                        target: {
                                                            name: "buttonText",
                                                            value: e.target.value,
                                                        },
                                                    });
                                                    setSubText(e.target.value);
                                                }}
                                                placeholder="Buton içinde yazacak olan yazıyı giriniz."
                                                className="min-w-[200px] shadow w-full px-4 py-2 text-md border border-blue-200 rounded-xl focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600"
                                            />
                                        </div>

                                        {/* BUTTON LINK  START*/}
                                        <div>
                                            <label htmlFor="buttonLink" className="pl-2 mt-2 block text-xl my-2">
                                                <div className="flex flex-col flex-wrap md:flex-nowrap justify-start items-start">
                                                <div>Buton Bağlantı Adresi</div>
                                                <p className="text-xs">({`${process.env.NEXT_PUBLIC_URL && process.env.NEXT_PUBLIC_URL}/... #### örnek: ${process.env.NEXT_PUBLIC_URL && process.env.NEXT_PUBLIC_URL}/buraya_yazilan_adres/...`   })</p>
                                                </div>                                    
                                            </label>
                                            <input
                                            id="buttonLink"
                                            name="buttonLink"
                                            autoComplete="off"
                                            type="text"
                                            value={buttonLink}
                                            onChange={(e)=>{
                                                props.handleChange({
                                                    target: {
                                                        name: "buttonLink",
                                                        value: e.target.value,
                                                    },
                                                });
                                                setButtonLink(e.target.value);
                                            }}
                                            placeholder="https://www.caliskanari.com/.../..."
                                            className="min-w-[200px] shadow w-full px-4 py-2 text-md border border-blue-200 rounded-xl focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600"
                                            />
                                        </div>
                                    
                                        {/* IS ACTIVE OR NOT OPTIONS */}
                                        <div className='w-full flex flex-row mt-2 justify-start items-start gap-2 lg:gap-4 flex-wrap'>
                                            
                                            {/* Ana Başlık */}
                                            <div className='w-full lg:w-auto flex justify-between gap-4 glex-row bg-gray-100 p-2 rounded-xl'>
                                                        <label htmlFor="MainTextOpen" className="pl-2 mt-2 block text-xl">Ana Başlık:</label>
                                                        <div  onClick={() => setMainTextOpen(!MainTextOpen)} className={`relative hover:cursor-pointer p-2 border-gray-500   shadow rounded-xl pl-4 ${MainTextOpen ? "bg-blue-400" : "bg-cst_red"}`}>
                                                        <input
                                                            className="mr-2 mt-[0.3rem] h-3.5 w-8 appearance-none rounded-[0.4375rem] bg-white before:pointer-events-none before:absolute before:h-3.5 before:w-3.5 before:rounded-full before:bg-transparent before:content-[''] after:absolute after:z-[2] after:-mt-[0.1875rem] after:h-5 after:w-5 after:rounded-full after:border-none after:bg-neutral-200 after:shadow-[0_0px_3px_0_rgb(0_0_0_/_7%),_0_2px_2px_0_rgb(0_0_0_/_4%)] after:transition-[background-color_0.2s,transform_0.2s] after:content-[''] checked:bg-primary checked:after:absolute checked:after:z-[2] checked:after:-mt-[3px] checked:after:ml-[1.0625rem] checked:after:h-5 checked:after:w-5 checked:after:rounded-full checked:after:border-none checked:after:bg-primary checked:after:shadow-[0_3px_1px_-2px_rgba(0,0,0,0.2),_0_2px_2px_0_rgba(0,0,0,0.14),_0_1px_5px_0_rgba(0,0,0,0.12)] checked:after:transition-[background-color_0.2s,transform_0.2s] checked:after:content-[''] hover:cursor-pointer focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[3px_-1px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-5 focus:after:w-5 focus:after:rounded-full focus:after:content-[''] checked:focus:border-primary checked:focus:bg-primary checked:focus:before:ml-[1.0625rem] checked:focus:before:scale-100 checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:bg-neutral-600 dark:after:bg-neutral-400 dark:checked:bg-primary dark:checked:after:bg-primary dark:focus:before:shadow-[3px_-1px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca]"
                                                            type="checkbox"
                                                            name="MainTextOpen"
                                                            checked={MainTextOpen ? MainTextOpen : false}
                                                            onChange={(e)=>{
                                                                props.handleChange({
                                                                    target: {
                                                                    name: "MainTextOpen",
                                                                    value: e.target.checked,
                                                                    },
                                                                });
                                                                setMainTextOpen(e.target.checked);
                                                                }                                                
                                                            }
                                                        />
                                                        </div>                                      
                                            </div>
                                                
                                            {/* Alt Başlık */}
                                            <div className='w-full lg:w-auto flex justify-between gap-4 glex-row bg-gray-100 p-2 rounded-xl'>
                                                        <label htmlFor="subTextOpen" className="pl-2 mt-2 block text-xl">Alt Açıklama:</label>
                                                        <div  onClick={() => setSubTextOpen(!subTextOpen)} className={`relative hover:cursor-pointer p-2 border-gray-500   shadow rounded-xl pl-4 ${subTextOpen ? "bg-blue-400" : "bg-cst_red"}`}>
                                                        <input
                                                            className="mr-2 mt-[0.3rem] h-3.5 w-8 appearance-none rounded-[0.4375rem] bg-white before:pointer-events-none before:absolute before:h-3.5 before:w-3.5 before:rounded-full before:bg-transparent before:content-[''] after:absolute after:z-[2] after:-mt-[0.1875rem] after:h-5 after:w-5 after:rounded-full after:border-none after:bg-neutral-200 after:shadow-[0_0px_3px_0_rgb(0_0_0_/_7%),_0_2px_2px_0_rgb(0_0_0_/_4%)] after:transition-[background-color_0.2s,transform_0.2s] after:content-[''] checked:bg-primary checked:after:absolute checked:after:z-[2] checked:after:-mt-[3px] checked:after:ml-[1.0625rem] checked:after:h-5 checked:after:w-5 checked:after:rounded-full checked:after:border-none checked:after:bg-primary checked:after:shadow-[0_3px_1px_-2px_rgba(0,0,0,0.2),_0_2px_2px_0_rgba(0,0,0,0.14),_0_1px_5px_0_rgba(0,0,0,0.12)] checked:after:transition-[background-color_0.2s,transform_0.2s] checked:after:content-[''] hover:cursor-pointer focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[3px_-1px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-5 focus:after:w-5 focus:after:rounded-full focus:after:content-[''] checked:focus:border-primary checked:focus:bg-primary checked:focus:before:ml-[1.0625rem] checked:focus:before:scale-100 checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:bg-neutral-600 dark:after:bg-neutral-400 dark:checked:bg-primary dark:checked:after:bg-primary dark:focus:before:shadow-[3px_-1px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca]"
                                                            type="checkbox"
                                                            name="subTextOpen"
                                                            checked={subTextOpen ? subTextOpen : false}
                                                            onChange={(e)=>{
                                                                props.handleChange({
                                                                    target: {
                                                                    name: "subTextOpen",
                                                                    value: e.target.checked,
                                                                    },
                                                                });
                                                                setSubTextOpen(e.target.checked);
                                                                }                                                
                                                            }
                                                        />
                                                        </div>                                      
                                            </div>
                                            
                                            {/* Buton */}              
                                            <div className='w-full lg:w-auto flex justify-between gap-4 glex-row bg-gray-100 p-2 rounded-xl'>
                                                    <label htmlFor="buttonOpen" className="pl-2 mt-2 block text-xl">Buton:</label>
                                                    <div  onClick={() => setButtonOpen(!buttonOpen)} className={`relative hover:cursor-pointer p-2 border-gray-500   shadow rounded-xl pl-4 ${buttonOpen ? "bg-blue-400" : "bg-cst_red"}`}>
                                                    <input
                                                        className="mr-2 mt-[0.3rem] h-3.5 w-8 appearance-none rounded-[0.4375rem] bg-white before:pointer-events-none before:absolute before:h-3.5 before:w-3.5 before:rounded-full before:bg-transparent before:content-[''] after:absolute after:z-[2] after:-mt-[0.1875rem] after:h-5 after:w-5 after:rounded-full after:border-none after:bg-neutral-200 after:shadow-[0_0px_3px_0_rgb(0_0_0_/_7%),_0_2px_2px_0_rgb(0_0_0_/_4%)] after:transition-[background-color_0.2s,transform_0.2s] after:content-[''] checked:bg-primary checked:after:absolute checked:after:z-[2] checked:after:-mt-[3px] checked:after:ml-[1.0625rem] checked:after:h-5 checked:after:w-5 checked:after:rounded-full checked:after:border-none checked:after:bg-primary checked:after:shadow-[0_3px_1px_-2px_rgba(0,0,0,0.2),_0_2px_2px_0_rgba(0,0,0,0.14),_0_1px_5px_0_rgba(0,0,0,0.12)] checked:after:transition-[background-color_0.2s,transform_0.2s] checked:after:content-[''] hover:cursor-pointer focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[3px_-1px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-5 focus:after:w-5 focus:after:rounded-full focus:after:content-[''] checked:focus:border-primary checked:focus:bg-primary checked:focus:before:ml-[1.0625rem] checked:focus:before:scale-100 checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:bg-neutral-600 dark:after:bg-neutral-400 dark:checked:bg-primary dark:checked:after:bg-primary dark:focus:before:shadow-[3px_-1px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca]"
                                                        type="checkbox"
                                                        name="buttonOpen"
                                                        checked={buttonOpen ? buttonOpen : false}
                                                        onChange={(e)=>{
                                                            props.handleChange({
                                                                target: {
                                                                name: "buttonOpen",
                                                                value: e.target.checked,
                                                                },
                                                            });
                                                            setButtonOpen(e.target.checked);
                                                            }                                                
                                                        }
                                                    />
                                                    </div>                                      
                                            </div>

                                            {/* Koyulaştır */}
                                            <div className='w-full lg:w-auto flex justify-between gap-4 glex-row bg-gray-100 p-2 rounded-xl'>
                                                    <label htmlFor="bgDarkness" className="pl-2 mt-2 block text-xl">Koyulaştır:</label>
                                                    <div  onClick={() => setBgDarkness(!bgDarkness)} className={`relative hover:cursor-pointer p-2 border-gray-500   shadow rounded-xl pl-4 ${bgDarkness ? "bg-blue-400" : "bg-cst_red"}`}>
                                                    <input
                                                        className="mr-2 mt-[0.3rem] h-3.5 w-8 appearance-none rounded-[0.4375rem] bg-white before:pointer-events-none before:absolute before:h-3.5 before:w-3.5 before:rounded-full before:bg-transparent before:content-[''] after:absolute after:z-[2] after:-mt-[0.1875rem] after:h-5 after:w-5 after:rounded-full after:border-none after:bg-neutral-200 after:shadow-[0_0px_3px_0_rgb(0_0_0_/_7%),_0_2px_2px_0_rgb(0_0_0_/_4%)] after:transition-[background-color_0.2s,transform_0.2s] after:content-[''] checked:bg-primary checked:after:absolute checked:after:z-[2] checked:after:-mt-[3px] checked:after:ml-[1.0625rem] checked:after:h-5 checked:after:w-5 checked:after:rounded-full checked:after:border-none checked:after:bg-primary checked:after:shadow-[0_3px_1px_-2px_rgba(0,0,0,0.2),_0_2px_2px_0_rgba(0,0,0,0.14),_0_1px_5px_0_rgba(0,0,0,0.12)] checked:after:transition-[background-color_0.2s,transform_0.2s] checked:after:content-[''] hover:cursor-pointer focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[3px_-1px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-5 focus:after:w-5 focus:after:rounded-full focus:after:content-[''] checked:focus:border-primary checked:focus:bg-primary checked:focus:before:ml-[1.0625rem] checked:focus:before:scale-100 checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:bg-neutral-600 dark:after:bg-neutral-400 dark:checked:bg-primary dark:checked:after:bg-primary dark:focus:before:shadow-[3px_-1px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca]"
                                                        type="checkbox"
                                                        name="bgDarkness"
                                                        checked={bgDarkness ? bgDarkness : false}
                                                        onChange={(e)=>{
                                                            props.handleChange({
                                                                target: {
                                                                name: "bgDarkness",
                                                                value: e.target.checked,
                                                                },
                                                            });
                                                            setBgDarkness(e.target.checked);
                                                            }                                                
                                                        }
                                                    />
                                                    </div>                                      
                                            </div>
                                            
                                            {/* Ana Resim */}
                                            <div className='w-full lg:w-auto flex justify-between gap-4 glex-row bg-gray-100 p-2 rounded-xl'>
                                                    <label htmlFor="mainImageOpen" className="pl-2 mt-2 block text-xl">Ana Resim:</label>
                                                    <div  onClick={() => setMainImageOpen(!mainImageOpen)} className={`relative hover:cursor-pointer p-2 border-gray-500   shadow rounded-xl pl-4 ${mainImageOpen ? "bg-blue-400" : "bg-cst_red"}`}>
                                                    <input
                                                        className="mr-2 mt-[0.3rem] h-3.5 w-8 appearance-none rounded-[0.4375rem] bg-white before:pointer-events-none before:absolute before:h-3.5 before:w-3.5 before:rounded-full before:bg-transparent before:content-[''] after:absolute after:z-[2] after:-mt-[0.1875rem] after:h-5 after:w-5 after:rounded-full after:border-none after:bg-neutral-200 after:shadow-[0_0px_3px_0_rgb(0_0_0_/_7%),_0_2px_2px_0_rgb(0_0_0_/_4%)] after:transition-[background-color_0.2s,transform_0.2s] after:content-[''] checked:bg-primary checked:after:absolute checked:after:z-[2] checked:after:-mt-[3px] checked:after:ml-[1.0625rem] checked:after:h-5 checked:after:w-5 checked:after:rounded-full checked:after:border-none checked:after:bg-primary checked:after:shadow-[0_3px_1px_-2px_rgba(0,0,0,0.2),_0_2px_2px_0_rgba(0,0,0,0.14),_0_1px_5px_0_rgba(0,0,0,0.12)] checked:after:transition-[background-color_0.2s,transform_0.2s] checked:after:content-[''] hover:cursor-pointer focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[3px_-1px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-5 focus:after:w-5 focus:after:rounded-full focus:after:content-[''] checked:focus:border-primary checked:focus:bg-primary checked:focus:before:ml-[1.0625rem] checked:focus:before:scale-100 checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:bg-neutral-600 dark:after:bg-neutral-400 dark:checked:bg-primary dark:checked:after:bg-primary dark:focus:before:shadow-[3px_-1px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca]"
                                                        type="checkbox"
                                                        name="mainImageOpen"
                                                        checked={mainImageOpen ? mainImageOpen : false}
                                                        onChange={(e)=>{
                                                            props.handleChange({
                                                                target: {
                                                                name: "mainImageOpen",
                                                                value: e.target.checked,
                                                                },
                                                            });
                                                            setMainImageOpen(e.target.checked);
                                                            }                                                
                                                        }
                                                    />
                                                    </div>                                      
                                            </div>
                                                
                                            {/* Yer Değiştir */}
                                            <div className='w-full lg:w-auto flex justify-between gap-4 glex-row bg-gray-100 p-2 rounded-xl'>
                                                    <label htmlFor="changePosition" className="pl-2 mt-2 block text-xl">Yer Değiştir:</label>
                                                    <div  onClick={() => setChangePosition(!changePosition)} className={`relative hover:cursor-pointer p-2 border-gray-500   shadow rounded-xl pl-4 ${changePosition ? "bg-blue-400" : "bg-cst_red"}`}>
                                                    <input
                                                        className="mr-2 mt-[0.3rem] h-3.5 w-8 appearance-none rounded-[0.4375rem] bg-white before:pointer-events-none before:absolute before:h-3.5 before:w-3.5 before:rounded-full before:bg-transparent before:content-[''] after:absolute after:z-[2] after:-mt-[0.1875rem] after:h-5 after:w-5 after:rounded-full after:border-none after:bg-neutral-200 after:shadow-[0_0px_3px_0_rgb(0_0_0_/_7%),_0_2px_2px_0_rgb(0_0_0_/_4%)] after:transition-[background-color_0.2s,transform_0.2s] after:content-[''] checked:bg-primary checked:after:absolute checked:after:z-[2] checked:after:-mt-[3px] checked:after:ml-[1.0625rem] checked:after:h-5 checked:after:w-5 checked:after:rounded-full checked:after:border-none checked:after:bg-primary checked:after:shadow-[0_3px_1px_-2px_rgba(0,0,0,0.2),_0_2px_2px_0_rgba(0,0,0,0.14),_0_1px_5px_0_rgba(0,0,0,0.12)] checked:after:transition-[background-color_0.2s,transform_0.2s] checked:after:content-[''] hover:cursor-pointer focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[3px_-1px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-5 focus:after:w-5 focus:after:rounded-full focus:after:content-[''] checked:focus:border-primary checked:focus:bg-primary checked:focus:before:ml-[1.0625rem] checked:focus:before:scale-100 checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:bg-neutral-600 dark:after:bg-neutral-400 dark:checked:bg-primary dark:checked:after:bg-primary dark:focus:before:shadow-[3px_-1px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca]"
                                                        type="checkbox"
                                                        name="changePosition"
                                                        checked={changePosition ? changePosition : false}
                                                        onChange={(e)=>{
                                                            props.handleChange({
                                                                target: {
                                                                name: "changePosition",
                                                                value: e.target.checked,
                                                                },
                                                            });
                                                            setChangePosition(e.target.checked);
                                                            }                                                
                                                        }
                                                    />
                                                    </div>                                      
                                                
                                            </div>

                                            {/* Arka Plan Resmi */}
                                            <div className='w-full lg:w-auto flex justify-between gap-4 glex-row bg-gray-100 p-2 rounded-xl'>
                                                    <label htmlFor="bgImageOpen" className="pl-2 mt-2 block text-xl">Arkaplandaki Resmi:</label>
                                                    <div  onClick={() => setBgImageOpen(!bgImageOpen)} className={`relative hover:cursor-pointer p-2 border-gray-500   shadow rounded-xl pl-4 ${bgImageOpen ? "bg-blue-400" : "bg-cst_red"}`}>
                                                    <input
                                                        className="mr-2 mt-[0.3rem] h-3.5 w-8 appearance-none rounded-[0.4375rem] bg-white before:pointer-events-none before:absolute before:h-3.5 before:w-3.5 before:rounded-full before:bg-transparent before:content-[''] after:absolute after:z-[2] after:-mt-[0.1875rem] after:h-5 after:w-5 after:rounded-full after:border-none after:bg-neutral-200 after:shadow-[0_0px_3px_0_rgb(0_0_0_/_7%),_0_2px_2px_0_rgb(0_0_0_/_4%)] after:transition-[background-color_0.2s,transform_0.2s] after:content-[''] checked:bg-primary checked:after:absolute checked:after:z-[2] checked:after:-mt-[3px] checked:after:ml-[1.0625rem] checked:after:h-5 checked:after:w-5 checked:after:rounded-full checked:after:border-none checked:after:bg-primary checked:after:shadow-[0_3px_1px_-2px_rgba(0,0,0,0.2),_0_2px_2px_0_rgba(0,0,0,0.14),_0_1px_5px_0_rgba(0,0,0,0.12)] checked:after:transition-[background-color_0.2s,transform_0.2s] checked:after:content-[''] hover:cursor-pointer focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[3px_-1px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-5 focus:after:w-5 focus:after:rounded-full focus:after:content-[''] checked:focus:border-primary checked:focus:bg-primary checked:focus:before:ml-[1.0625rem] checked:focus:before:scale-100 checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:bg-neutral-600 dark:after:bg-neutral-400 dark:checked:bg-primary dark:checked:after:bg-primary dark:focus:before:shadow-[3px_-1px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca]"
                                                        type="checkbox"
                                                        name="bgImageOpen"
                                                        checked={bgImageOpen ? bgImageOpen : false}
                                                        onChange={(e)=>{
                                                            props.handleChange({
                                                                target: {
                                                                name: "bgImageOpen",
                                                                value: e.target.checked,
                                                                },
                                                            });
                                                            setBgImageOpen(e.target.checked);
                                                            }                                                
                                                        }
                                                    />
                                                    </div>                                      
                                            </div>

                                            {/* Bulanıklaştır */}
                                            <div className='w-full lg:w-auto flex justify-between gap-4 glex-row bg-gray-100 p-2 rounded-xl'>
                                                    <label htmlFor="backgrounBlur" className="pl-2 mt-2 block text-xl">Bulanıklaştır:</label>
                                                    <div  onClick={() => setBackgrounBlur(!backgrounBlur)} className={`relative hover:cursor-pointer p-2 border-gray-500   shadow rounded-xl pl-4 ${backgrounBlur ? "bg-blue-400" : "bg-cst_red"}`}>
                                                    <input
                                                        className="mr-2 mt-[0.3rem] h-3.5 w-8 appearance-none rounded-[0.4375rem] bg-white before:pointer-events-none before:absolute before:h-3.5 before:w-3.5 before:rounded-full before:bg-transparent before:content-[''] after:absolute after:z-[2] after:-mt-[0.1875rem] after:h-5 after:w-5 after:rounded-full after:border-none after:bg-neutral-200 after:shadow-[0_0px_3px_0_rgb(0_0_0_/_7%),_0_2px_2px_0_rgb(0_0_0_/_4%)] after:transition-[background-color_0.2s,transform_0.2s] after:content-[''] checked:bg-primary checked:after:absolute checked:after:z-[2] checked:after:-mt-[3px] checked:after:ml-[1.0625rem] checked:after:h-5 checked:after:w-5 checked:after:rounded-full checked:after:border-none checked:after:bg-primary checked:after:shadow-[0_3px_1px_-2px_rgba(0,0,0,0.2),_0_2px_2px_0_rgba(0,0,0,0.14),_0_1px_5px_0_rgba(0,0,0,0.12)] checked:after:transition-[background-color_0.2s,transform_0.2s] checked:after:content-[''] hover:cursor-pointer focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[3px_-1px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-5 focus:after:w-5 focus:after:rounded-full focus:after:content-[''] checked:focus:border-primary checked:focus:bg-primary checked:focus:before:ml-[1.0625rem] checked:focus:before:scale-100 checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:bg-neutral-600 dark:after:bg-neutral-400 dark:checked:bg-primary dark:checked:after:bg-primary dark:focus:before:shadow-[3px_-1px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca]"
                                                        type="checkbox"
                                                        name="backgrounBlur"
                                                        checked={backgrounBlur ? backgrounBlur : false}
                                                        onChange={(e)=>{
                                                            props.handleChange({
                                                                target: {
                                                                name: "backgrounBlur",
                                                                value: e.target.checked,
                                                                },
                                                            });
                                                            setBackgrounBlur(e.target.checked);
                                                            }                                                
                                                        }
                                                    />
                                                    </div>                                      
                                            </div>
                                            
                                            

                                            

                                                
                                            
                                            
                                        </div>
                                </div>

                                {/* Resim Yükleme Bölümü */}
                                <div className="flex flex-col flex-nowrap gap-4 shadow p-2 rounded-xl bg-white mt-6 sm:mt-6 min-w-[200px] overflow-hidden">
                                    <div className='w-full flex justify-center items-center bg-gray-100 rounded-lg p-2'>
                                        <h2 className='text-md lg:text-xl text-secondary'>Resim Yükleme Bölümü</h2>
                                    </div> 

                                    {/* BgImage Link */}
                                    <div className='w-full'>
                                            <label htmlFor="bgImage" className="pl-2  text-xl block">
                                                Standart Resim <p className='text-sm inline-block text-cst_red'>{` ( 0px - 768px)`} </p>
                                            </label>
                                            <div className='flex flex-col md:flex-row justify-center items-center gap-2'>

                                                <input
                                                    id="bgImage"
                                                name="bgImage"
                                                autoComplete="off"
                                                type="text"
                                                value=""
                                                onChange={(e)=>{
                                                    props.handleChange({
                                                        target: {
                                                            name: "bgImage",
                                                            value: e.target.value,
                                                        },
                                                    });
                                                    setBgImage(e.target.value);
                                                }}
                                                placeholder="Standart resim linkini giriniz yada seçiniz."
                                                className="min-w-[200px] shadow w-full px-4 py-2 text-md border border-blue-200 rounded-xl focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600"
                                                />

                                                <ImageUploader fileLocation={"fileLocation"} fileName={"fileName"} />
                                                
                                                
                                                
                                            </div>
                                    </div>
                                    

                                    {/* BgImageMd Link */}
                                    <div className='w-full'>
                                            <label htmlFor="bgImageMd" className="pl-2  text-xl block">
                                                M Resim <p className='text-sm inline-block text-cst_red-600'>{` ( 768px - 1024px)`} </p>
                                            </label>
                                            <div className='flex flex-row justify-center items-center gap-2'>
                                                <input
                                                id="bgImageMd"
                                                name="bgImageMd"
                                                autoComplete="off"
                                                type="text"
                                                value=""
                                                onChange={(e)=>{
                                                    props.handleChange({
                                                        target: {
                                                            name: "bgImageMd",
                                                            value: e.target.value,
                                                        },
                                                    });
                                                    setBgImageMd(e.target.value);
                                                }}
                                                placeholder="M boyutundaki resim linkini giriniz yada seçiniz."
                                                className="min-w-[200px] shadow w-full px-4 py-2 text-md border border-blue-200 rounded-xl focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600"
                                                />
                                                
                                                <ImageUploader fileLocation={"fileLocation"} fileName={"fileName"} />
                                            </div>
                                    </div>

                                    {/* BgImageLg Link */}
                                    <div className='w-full'>
                                            <label htmlFor="bgImageLg" className="pl-2  text-xl block">
                                                L Resim <p className='text-sm inline-block text-cst_red-600'>{` ( 1024px - 1280px)`} </p>
                                            </label>
                                            <div className='flex flex-row justify-center items-center gap-2'>
                                                <input
                                                id="bgImageLg"
                                                name="bgImageLg"
                                                autoComplete="off"
                                                type="text"
                                                value=""
                                                onChange={(e)=>{
                                                    props.handleChange({
                                                        target: {
                                                            name: "bgImageLg",
                                                            value: e.target.value,
                                                        },
                                                    });
                                                    setBgImageLg(e.target.value);
                                                }}
                                                placeholder="L boyutundaki resim linkini giriniz yada seçiniz."
                                                className="min-w-[200px] shadow w-full px-4 py-2 text-md border border-blue-200 rounded-xl focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600"
                                                />
                                                <ImageUploader fileLocation={"fileLocation"} fileName={"fileName"} />
                                            </div>
                                    </div>

                                    {/* BgImageXl Link */}
                                    <div className='w-full'>
                                            <label htmlFor="bgImageXl" className="pl-2  text-xl block">
                                                XL Resim <p className='text-sm inline-block text-cst_red-600'>{` ( 1280px - 1536px)`} </p>
                                            </label>
                                            <div className='flex flex-row justify-center items-center gap-2'>
                                                <input
                                                id="bgImageXl"
                                                name="bgImageXl"
                                                autoComplete="off"
                                                type="text"
                                                value=""
                                                onChange={(e)=>{
                                                    props.handleChange({
                                                        target: {
                                                            name: "bgImageXl",
                                                            value: e.target.value,
                                                        },
                                                    });
                                                    setBgImageXl(e.target.value);
                                                }}
                                                placeholder="XL boyutundaki resim linkini giriniz yada seçiniz."
                                                className="min-w-[200px] shadow w-full px-4 py-2 text-md border border-blue-200 rounded-xl focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600"
                                                />
                                                <ImageUploader fileLocation={"fileLocation"} fileName={"fileName"} />
                                            </div>
                                    </div>

                                    {/* BgImage2Xl Link */}
                                    <div className='w-full'>
                                            <label htmlFor="bgImage2Xl" className="pl-2  text-xl block">
                                                2XL Resim <p className='text-sm inline-block text-cst_red-600'>{` ( 1536px - 1920px)`} </p>
                                            </label>
                                            <div className='flex flex-row justify-center items-center gap-2'>
                                                <input
                                                id="bgImage2Xl"
                                                name="bgImage2Xl"
                                                autoComplete="off"
                                                type="text"
                                                value=""
                                                onChange={(e)=>{
                                                    props.handleChange({
                                                        target: {
                                                            name: "bgImage2Xl",
                                                            value: e.target.value,
                                                        },
                                                    });
                                                    setBgImage2Xl(e.target.value);
                                                }}
                                                placeholder="2XL boyutundaki resim linkini giriniz yada seçiniz."
                                                className="min-w-[200px] shadow w-full px-4 py-2 text-md border border-blue-200 rounded-xl focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600"
                                                />
                                                <ImageUploader fileLocation={"fileLocation"} fileName={"fileName"} />
                                            </div>
                                    </div>

                                    {/* BgImage4Xl Link */}
                                    <div className='w-full'>
                                            <label htmlFor="bgImage4Xl" className="pl-2  text-xl block">
                                                4XL Resim <p className='text-sm inline-block text-cst_red-600'>{` ( 1920px - 2560px)`} </p>
                                            </label>
                                            <div className='flex flex-row justify-center items-center gap-2'>
                                                <input
                                                id="bgImage4Xl"
                                                name="bgImage4Xl"
                                                autoComplete="off"
                                                type="text"
                                                value=""
                                                onChange={(e)=>{
                                                    props.handleChange({
                                                        target: {
                                                            name: "bgImage4Xl",
                                                            value: e.target.value,
                                                        },
                                                    });
                                                    setBgImage4Xl(e.target.value);
                                                }}
                                                placeholder="4XL boyutundaki resim linkini giriniz yada seçiniz."
                                                className="min-w-[200px] shadow w-full px-4 py-2 text-md border border-blue-200 rounded-xl focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600"
                                                />
                                                <ImageUploader fileLocation={"fileLocation"} fileName={"fileName"} />
                                            </div>
                                    </div>

                                    {/* BgImage6Xl Link */}
                                    <div className='w-full'>
                                            <label htmlFor="bgImage6Xl" className="pl-2  text-xl block">
                                                6XL Resim <p className='text-sm inline-block text-cst_red-600'>{` ( 2560px ve üstü)`} </p>
                                            </label>
                                            <div className='flex flex-row justify-center items-center gap-2'>
                                                <input
                                                id="bgImage6Xl"
                                                name="bgImage6Xl"
                                                autoComplete="off"
                                                type="text"
                                                value=""
                                                onChange={(e)=>{
                                                    props.handleChange({
                                                        target: {
                                                            name: "bgImage6Xl",
                                                            value: e.target.value,
                                                        },
                                                    });
                                                    setBgImage6Xl(e.target.value);
                                                }}
                                                placeholder="6XL boyutundaki resim linkini giriniz yada seçiniz."
                                                className="min-w-[200px] shadow w-full px-4 py-2 text-md border border-blue-200 rounded-xl focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600"
                                                />
                                                <ImageUploader fileLocation={"fileLocation"} fileName={"fileName"} />
                                            </div>
                                    </div>

                                    

                                </div>
                            </div>
                            {/* SUBMIT BUTTON */}
                            <div className="w-full flex justify-center items-center content-center mt-2 px-4">
                                <button
                                    className={`shadow w-1/2 bg-secondary hover:bg-primary hover:scale-110 transition-all block px-4 py-4 mt-6 text-md font-medium text-center text-white  border border-transparent rounded-lg focus:shadow-outline-blue`} type="submit">
                                    Ayarları kaydet
                                </button>
                            </div>
                        </div>
                        

                    </Form>
                )}
                </Formik>
            </div>      
        </>
      );
  }


}

export default Slider
