"use client";
import GeneralTopPageBannerComponent from "@/components/other/generalTopPageBanner";
import { ToastContainer, toast } from 'react-toastify';
import React, { useState, useEffect } from "react";
import HashLoader from "react-spinners/HashLoader";
import {postAPI, getAPI} from '@/services/fetchAPI/index';
import { HexColorPicker } from "react-colorful";
import { useSession } from 'next-auth/react';
import ValidationSchema from './formikData';
import {notFound} from 'next/navigation';
import { Formik, Form } from "formik";


const GeneralTopPageBanner = () => {
  

  const [allData, setAllData] = useState();
    const [color, setColor] = useState("");
    const [mainTextColor, setMainTextColor] = useState("");
    const [underTextColor, setUnderTextColor] = useState("");
    const [buttonColor, setButtonColor] = useState("");
    const [backgroundColor, setBackgroundColor] = useState("");
    const [mainText, setMainText] = useState("");

    const [buttonTextColor, setButtonTextColor] = useState("");
    const [buttonLink, setButtonLink] = useState("");
    const [buttonText, setButtonText] = useState("");

    const [detailText, setDetailText] = useState("");
    const [isActive, setIsActive] = useState();
    const [startBannerTime, setStartBannerTime] = useState("");
    const [endBannerTime, setEndBannerTime] = useState("");

    // panel içerisinde verileri anlık görebilmek için kullanılan state (yanlızca panelde kullanılır.)
    const [allDataPanel, setAllDataPanel] = useState();

        // veri tabanından güncel verileri alıp state içerisine set eder.
        useEffect(() => {

          if(!user || user.role != pageRole ){
            return notFound();
          }

          // veri tabanından alınan verileri set etme işlemini yapan fonksiyonu burada çalıştırdık.
          getAPI("/other/generalTopPageBanner").then((res) => {
            if(res){
              setAllData(res.data[0]);
            }
          });
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [])
      
      
      useEffect(() => {
        if(allData){
          setMainText(allData.mainText);
          setDetailText(allData.detailText);
          setButtonTextColor(allData.buttonTextColor);
          setButtonLink(allData.buttonLink);
          setButtonText(allData.buttonText);
          setIsActive(allData.isActive);
          setStartBannerTime(allData.startBannerTime);
          setEndBannerTime(allData.endBannerTime);
          setMainTextColor(allData.mainTextColor);
          setUnderTextColor(allData.underTextColor);
          setButtonColor(allData.buttonColor);
          setBackgroundColor(allData.backgroundColor);
        }
      }, [allData])
  
      useEffect(() => {
  
  
        // panel içerisinde verileri anlık görebilmek için kullanılan state (yanlızca panelde kullanılır.)
        setAllDataPanel(
          {
            color:color,
            mainTextColor:mainTextColor,
            underTextColor:underTextColor,
            buttonColor:buttonColor,
            backgroundColor:backgroundColor,
            mainText:mainText,
            buttonTextColor:buttonTextColor,
            buttonLink:buttonLink,
            buttonText:buttonText,
            detailText:detailText,
            isActive:isActive,
            startBannerTime:startBannerTime,
            endBannerTime:endBannerTime,
          }
        )      
      }, [allData, color, mainTextColor, underTextColor, buttonColor, backgroundColor, mainText, buttonTextColor, buttonLink, buttonText, detailText, isActive, startBannerTime, endBannerTime])
      



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
    // bu günün tarihini string ifadeye çevirir.
    const formattedDate = () => {
      const date = new Date(Date.now());
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      const hours = String(date.getHours()).padStart(2, "0");
      const minutes = String(date.getMinutes()).padStart(2, "0");

      const formattedDate = `${year}-${month}-${day}T${hours}:${minutes}`;
      return formattedDate;
    };
    
    return (
      <> {
        allData || true ?
        <div className={`w-full h-full rounded shadow px-4 bg-[#c5d2de]  sm:px-6 py-6`}>

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
            // input verileri
            initialValues={{
              role: pageRole, // admin -> panel kim içinse o tanımlanacak

              startBannerTime: "",
              endBannerTime: "",
              mainText: "",
              detailText: "",
              buttonLink: "",
              buttonText: "",
              
              isActive: false,

              buttonTextColor: buttonTextColor,
              mainTextColor: mainTextColor,
              underTextColor: underTextColor,
              buttonColor: buttonColor,
              backgroundColor: backgroundColor,
            }}
            // input check
            validationSchema={ValidationSchema}

            onSubmit={(values) => {
              postAPI("/dashboard/admin/generalTopPageBanner", values).then((res) =>{
                if(res.status && (res.status === 200 || res.status === "success")){
                  const timeOut = setInterval(() => {
                    //setIsloading(false);
                    clearInterval(timeOut);
                  }, 2000);

                    toast.success("Güncelleme işlemi başarılı!");                               
                }
                else{
                  toast.error(res.error);
                }
              }).catch((err) =>{
                toast.error(err.message);
              });


              
            }}
          >
            {(props) => (
              props.values.startBannerTime = startBannerTime,
              props.values.endBannerTime = endBannerTime,
              props.values.mainText = mainText,
              props.values.detailText = detailText,
              props.values.isActive = true,
              props.values.mainTextColor = mainTextColor,
              props.values.underTextColor = underTextColor,
              props.values.buttonColor = buttonColor,
              props.values.backgroundColor = backgroundColor,
              props.values.buttonTextColor = buttonTextColor,
              props.values.buttonLink = buttonLink,
              props.values.buttonText = buttonText,

            <Form onSubmit={props.handleSubmit}>
              <div className="w-full  p-2 flex flex-col my-4 bg-secondary rounded-xl justify-center items-center">
                  <div className="red p-6 w-full">

                  </div>
                  <label className="text-white font-bold text-xl md:text-4xl mt-2">
                    Örnek tasarım
                  </label>
                  <p className="text-xs text-white text-center">(Aşağıdaki panel üzerinden yaptığınız değişiklikleri bu alanda canlı olarak görebilir ve test edebilirsiniz)</p>
                
          <div className="my-2 p-2 w-full relative">
          {GeneralTopPageBannerComponent && allDataPanel && <GeneralTopPageBannerComponent allDataPanel={allDataPanel} isDashboard = {true}/>}
          </div>
              </div>
                
                
                <div className="flex flex-col w-full mx-auto min-h-screen">
                
                  <div className="w-full  p-4 flex bg-secondary rounded justify-center items-center">
                  
                    <label className="text-white font-bold text-xl md:text-4xl">
                      Genel Duyuru Paneli
                    </label>
                  </div>
                  <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
                    
                    <div>
                      <div className="w-full flex flex-wrap md:flex-nowrap 2xl:flex-nowrap flex-col sm:flex-row justify-between items-center gap-x-4">
                        {/* BANNER START TIME */}
                        <div className=" shadow w-full p-2 rounded-xl bg-white flex flex-col justify-center items-center mt-6 sm:mt-6">
                          <label className="mb-2 block text-center text-xl">
                            Başlangıç Tarihi
                          </label>
                          <div className="relative bg-white w-60 rounded shadow border-blue-200 border">
                            <input
                              type="datetime-local"
                              className=" bg-white w-full rounded  border-secondary p-2 text-lg text-secondary"
                              name="startBannerTime"
                              onChange={(e) =>
                                {
                                  props.handleChange({
                                    target: {
                                      name: "startBannerTime",
                                      value: e.target.value,
                                    }
                                  });
                                  setStartBannerTime(e.target.value);
                                }
                              }
                              min={formattedDate()}
                            />
                          </div>
                        </div>

                        {/* BANNER END TIME */}
                        <div className=" shadow w-full p-2 rounded-xl bg-white flex flex-col justify-center items-center mt-6 sm:mt-6">
                          <label className="mb-2 block text-center text-xl">
                            Bitiş Tarihi
                          </label>
                          <div className="relative bg-white w-60 rounded shadow border-blue-200 border">
                            <input
                              type="datetime-local"
                              value={endBannerTime}
                              className=" bg-white w-full rounded  border-secondary p-2 text-lg text-secondary"
                              name="endBannerTime"
                              onChange={(e) =>
                                {
                                  props.handleChange({
                                    target: {
                                      name: "endBannerTime",
                                      value: e.target.value,
                                    },
                                  });
                                  setEndBannerTime(e.target.value);
                                }
                              }
                              min={formattedDate()}
                            />
                          </div>
                        </div>
                      </div>

                      {/* MAIN TEXT TDETAIL TEXT */}
                      <div className=" shadow p-2 rounded-xl bg-white mt-6 sm:mt-6 min-w-[200px] overflow-hidden">
                        <label htmlFor="mainText" className="pl-4 block text-xl ">
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
                          placeholder="Ana Başlığınızı giriniz."
                          className="min-w-[200px] mb-4 shadow w-full px-4 py-2 text-md border border-blue-200 rounded-xl focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600"
                        />

                        <label htmlFor="mainText" className="pl-4 block text-xl ">
                          Alt Metin
                        </label>
                        <textarea
                          id="detailText"
                          name="detailText"
                          autoComplete="off"
                          value={detailText}
                          onChange={(e)=>{
                            props.handleChange({
                              target: {
                                name: "detailText",
                                value: e.target.value,
                              },
                            });
                            setDetailText(e.target.value);
                          }}
                          
                          placeholder="Alt başlığınızı giriniz."
                          className="min-w-[200px] resize overflow shadow max-w-full w-full px-4 py-2 text-md border border-blue-200 rounded-xl focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600"
                        />


                        <label htmlFor="buttonText" className="pl-4 mt-2 block text-xl">
                          <div className="flex flex-row flex-nowrap justify-start items-center gap-2">
                            Buton Metni<p className="text-xs">(Eğer burayı boş bırakırsanız buton gözükmeyecektir.)</p>
                          </div>
                        </label>
                        <input
                          id="buttonText"
                          name="buttonText"
                          autoComplete="off"
                          type="text"
                          value={buttonText}
                          onChange={(e)=>{
                            props.handleChange({
                              target: {
                                name: "buttonText",
                                value: e.target.value,
                              },
                            });
                            setButtonText(e.target.value);
                          }}
                          placeholder="Detaylı Bilgi  İçin Tıklayınız..."
                          className="min-w-[200px] mb-4 shadow w-full px-4 py-2 text-md border border-blue-200 rounded-xl focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600"
                        />

                        <label htmlFor="buttonLink" className="pl-4 mt-2 block text-xl">
                        <div className="flex flex-row flex-wrap md:flex-nowrap justify-start items-center gap-2">
                        Buton Bağlantı Adresi<p className="text-xs">({`${process.env.NEXT_PUBLIC_URL && process.env.NEXT_PUBLIC_URL}/... #### örnek: ${process.env.NEXT_PUBLIC_URL && process.env.NEXT_PUBLIC_URL}/buraya_yazilan_adres/...`   })</p>
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
                          className="min-w-[200px] mb-4 shadow w-full px-4 py-2 text-md border border-blue-200 rounded-xl focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600"
                        />
                      </div>

                      {/* SWITCH BUTTON */}
                      <div className=" shadow relative p-2 rounded-xl bg-white mt-6 sm:mt-6 min-w-[200px] overflow-hidden flex gap-6 justify-center items-center">
                        <label className="block text-center text-xl my-2">
                          Bu Yapı Aktif Olsun mu?
                        </label>
                        <div className="p-1 bg-gray-300 border-gray-500 shadow rounded-xl pl-2">
                          <input
                            className="mr-2 mt-[0.3rem] h-3.5 w-8 appearance-none rounded-[0.4375rem] bg-white before:pointer-events-none before:absolute before:h-3.5 before:w-3.5 before:rounded-full before:bg-transparent before:content-[''] after:absolute after:z-[2] after:-mt-[0.1875rem] after:h-5 after:w-5 after:rounded-full after:border-none after:bg-neutral-200 after:shadow-[0_0px_3px_0_rgb(0_0_0_/_7%),_0_2px_2px_0_rgb(0_0_0_/_4%)] after:transition-[background-color_0.2s,transform_0.2s] after:content-[''] checked:bg-primary checked:after:absolute checked:after:z-[2] checked:after:-mt-[3px] checked:after:ml-[1.0625rem] checked:after:h-5 checked:after:w-5 checked:after:rounded-full checked:after:border-none checked:after:bg-primary checked:after:shadow-[0_3px_1px_-2px_rgba(0,0,0,0.2),_0_2px_2px_0_rgba(0,0,0,0.14),_0_1px_5px_0_rgba(0,0,0,0.12)] checked:after:transition-[background-color_0.2s,transform_0.2s] checked:after:content-[''] hover:cursor-pointer focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[3px_-1px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-5 focus:after:w-5 focus:after:rounded-full focus:after:content-[''] checked:focus:border-primary checked:focus:bg-primary checked:focus:before:ml-[1.0625rem] checked:focus:before:scale-100 checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:bg-neutral-600 dark:after:bg-neutral-400 dark:checked:bg-primary dark:checked:after:bg-primary dark:focus:before:shadow-[3px_-1px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca]"
                            type="checkbox"
                            name="isActive"
                            checked={isActive ? isActive : false}
                            onChange={(e)=>{
                              props.handleChange({
                                target: {
                                  name: "isActive",
                                  value: e.target.checked,
                                },
                              });
                              setIsActive(e.target.checked);
                            }
                              
                            }
                          />
                        </div>
                      </div>
                      {/* SUBMIT BUTTON */}
                      <div className="w-full flex justify-center items-center content-center mt-6 px-4">
                          <button
                            className={`shadow w-1/2 bg-secondary hover:bg-primary hover:scale-110 transition-all block px-4 py-4 mt-6 text-md font-medium text-center text-white  border border-transparent rounded-lg focus:shadow-outline-blue`}
                            type="submit"
                          >
                            Ayarları kaydet
                          </button>
                      </div>
                    </div>

                    <div>
                      {/* COLOR OPTIONS */}
                      <div className="bg-white mt-6 p-4 sm:mt-6 rounded-xl shadow ">
                        <HexColorPicker
                          color={color}
                          className="min-w-full px-2"
                          onChange={(color) => {
                            setColor(color)                          
                          }}
                        />
                        <div className="m-2 my-4 bg-gray-200 rounded p-2">
                          <label className="block text-center text-secondary font-bold rounded">
                            Dikkat!{" "}
                          </label>
                          <label className="block text-center text-secondary font-bold rounded">
                            Yukarıda bulunan renk paletinden rengi seçtikten sonra
                          </label>
                          <label className="block text-center text-secondary font-bold rounded">
                            aşağıdaki butona tıklayarak renk atamalarınızı
                            yapabilirsiniz.
                          </label>
                        </div>
                        <div className="flex flex-row flex-wrap items-center justify-between gap-4 m-2">
                          
                          {/* Ana Başlık Rengi */}
                          <div className="w-full sm:w-auto flex flex-col justify-between items-center border-blue-200 border shadow p-2 gap-4 rounded-xl">
                            <label className="text-center">Ana Başlık Rengi</label>
                            <div
                              style={{ background: mainTextColor }}
                              className="p-6  rounded inline-block border-2 border-opacity-50"
                            ></div>
                            <button
                            type='button'
                              onClick={() => {
                                setMainTextColor(color),
                                  props.handleChange({
                                    target: { name: "mainTextColor", value: color },
                                  });
                              }}
                              className={`bg-gray-500 hover:bg-primary hover:scale-105 transition-all block px-2 py-2 text-center text-white  rounded-lg focus:shadow-outline-blue`}
                            >
                              Rengi kaydet
                            </button>
                          </div>

                          {/* Alt Metin Rengi */}
                          <div className="w-full sm:w-auto flex flex-col justify-between items-center border-blue-200 border shadow p-2 gap-4 rounded-xl">
                            <label className="text-center">Alt Metin Rengi</label>
                            <div
                              style={{ background: underTextColor }}
                              className="p-6  rounded inline-block border-2 border-opacity-50"
                            ></div>
                            <button
                            type='button'
                              onClick={() => {
                                setUnderTextColor(color),
                                  props.handleChange({
                                    target: { name: "underTextColor", value: color },
                                  });
                              }}
                              className={`bg-gray-500 hover:bg-primary hover:scale-105 transition-all block px-2 py-2 text-center text-white  rounded-lg focus:shadow-outline-blue`}
                            >
                              Rengi kaydet
                            </button>
                          </div>

                          {/* Buton Rengi */}
                          <div className="w-full sm:w-auto flex flex-col justify-between items-center border-blue-200 border shadow p-2 gap-4 rounded-xl">
                            <label className="text-center">Buton Rengi</label>
                            <div
                              style={{ background: buttonColor }}
                              className="p-6  rounded inline-block border-2 border-opacity-50"
                            ></div>
                            <button
                            type='button'
                              onClick={() => {
                                setButtonColor(color),
                                  props.handleChange({
                                    target: { name: "buttonColor", value: color },
                                  });
                              }}
                              className={`bg-gray-500 hover:bg-primary hover:scale-105 transition-all block px-2 py-2 text-center text-white  rounded-lg focus:shadow-outline-blue`}
                            >
                              Rengi kaydet
                            </button>
                          </div>

                          {/* Buton Yazı Rengi */}
                          <div className="w-full sm:w-auto flex flex-col justify-between items-center border-blue-200 border shadow p-2 gap-4 rounded-xl">
                            <label className="text-center">Buton Yazı Rengi</label>
                            <div
                              style={{ background: buttonTextColor }}
                              className="p-6  rounded inline-block border-2 border-opacity-50"
                            ></div>
                            <button
                            type='button'
                              onClick={() => {
                                setButtonTextColor(color),
                                  props.handleChange({
                                    target: { name: "buttonTextColor", value: color },
                                  });
                              }}
                              className={`bg-gray-500 hover:bg-primary hover:scale-105 transition-all block px-2 py-2 text-center text-white  rounded-lg focus:shadow-outline-blue`}
                            >
                              Rengi kaydet
                            </button>
                          </div>

                          {/* Arkaplan Rengi */}
                          <div className="w-full sm:w-auto flex flex-col justify-between items-center border-blue-200 border shadow p-2 gap-4 rounded-xl">
                            <label className="text-center">Arkaplan Rengi</label>
                            <div
                              style={{ background: backgroundColor }}
                              className="p-6  rounded inline-block border-2 border-opacity-50"
                            ></div>
                            <button
                            type='button'
                              onClick={() => {
                                setBackgroundColor(color),
                                  props.handleChange({
                                    target: { name: "backgroundColor", value: color },
                                  });
                              }}
                              className={`bg-gray-500 hover:bg-primary hover:scale-105 transition-all block px-2 py-2 text-center text-white rounded-lg focus:shadow-outline-blue`}
                            >
                              Rengi kaydet
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
        :
        //  allData yüklenene kadar ekranda "Loading.." yükleniyor yapısını gösteriyoruz.
        <div className='w-full h-screen bg-white border-2'>
          <div className='w-full h-full flex justify-center items-center'>
          <div className="flex flex-col gap-4 justify-center items-center content-center rounded-full">
          <HashLoader
                color="#3d7bf1"
                aria-label="Loading Spinner"
                cssOverride={{}}
                size={100}
                loading={true}
                
                />
                <h2 className='text-primary font-bold text-2xl'>Yükleniyor...</h2>
          </div>
          </div>
        </div>

      }      
        
      </>
    );
  };

export default GeneralTopPageBanner;
