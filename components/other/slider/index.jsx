"use client"
import { Swiper, SwiperSlide } from "swiper/react";
import React, { useEffect, useState } from "react";
import NewSystemDataProcess from "@/functions/other/regularCheckSystemData/newSystemDataProcess";
import Link from 'next/link';
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Image from "next/image";

// import required modules
import {Autoplay, Pagination, Navigation } from "swiper";

// Bu component slider için kullanılır.
// Verileri veri tabanından çeker ve LocalStorage veya Cookie içine kaydeder.

// targetDatabaseUrl -> verilerin çekileceği veri tabanı adresi
const Slider =  ({targetDatabaseUrl}) => {

  const [sliderData, setSliderData] = useState([
    {
      mainText:"ÇALIŞKAN ARI İLE DEV KAMPANYA!",
      subText:"Alacağınız tüm kitaplarda Aralık ayına özel %50 indirim.",
      buttonLink: "/",
      buttonText: "Kampanyaya Git 1",
      mainImage: "https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      
      // standart image size
      bgImage: "https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      // image size for mobile
      bgImageMd: "https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      // image size for tablet
      bgImageLg: "https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      // image size for desktop
      bgImageXl: "https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      // image size for large desktop
      bgImage2Xl: "https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      // image size for FULL HD
      bgImage4Xl: "https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      // image size for 2K
      bgImage6Xl: "https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",

      subTextColour: "rgb(255 255 255)",
      mainTextColour: "rgb(255 255 255)",
      buttonColour: "rgb(255 255 255)",
      buttonTextColour: "rgb(27 27 27)",
      bgColor: "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%)",

      mainImageOpen: true,
      MainTextOpen: true,
      buttonOpen: true,
      subTextOpen: true,
      changePosition: true,
      backgrounBlur: true,
      bgImageOpen: true,
      bgDarkness: true,

      bgDarknessValue: "0.2",

    },
    {
      mainText:"ÇALIŞKAN ARI İLE DEV KAMPANYA!",
      subText:"Alacağınız tüm kitaplarda Aralık ayına özel %50 indirim.",
      buttonLink: "/",
      buttonText: "Kampanyaya Git 1",
      mainImage: "https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      
      // standart image size
      bgImage: "https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      // image size for mobile
      bgImageMd: "https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      // image size for tablet
      bgImageLg: "https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      // image size for desktop
      bgImageXl: "https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      // image size for large desktop
      bgImage2Xl: "https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      // image size for FULL HD
      bgImage4Xl: "https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      // image size for 2K
      bgImage6Xl: "https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",

      subTextColour: "rgb(255 255 255)",
      mainTextColour: "rgb(255 255 255)",
      buttonColour: "rgb(255 255 255)",
      buttonTextColour: "rgb(27 27 27)",
      bgColor: "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%)",

      mainImageOpen: false,
      MainTextOpen: true,
      buttonOpen: true,
      subTextOpen: true,
      changePosition: true,
      backgrounBlur: true,
      bgImageOpen: true,
      bgDarkness: true,

      bgDarknessValue: "0.2",

    },
    {
      mainText:"ÇALIŞKAN ARI İLE DEV KAMPANYA!",
      subText:"Alacağınız tüm kitaplarda Aralık ayına özel %50 indirim.",
      buttonLink: "/",
      buttonText: "Kampanyaya Git 1",
      mainImage: "https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      
      // standart image size
      bgImage: "https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      // image size for mobile
      bgImageMd: "https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      // image size for tablet
      bgImageLg: "https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      // image size for desktop
      bgImageXl: "https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      // image size for large desktop
      bgImage2Xl: "https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      // image size for FULL HD
      bgImage4Xl: "https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      // image size for 2K
      bgImage6Xl: "https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",

      subTextColour: "rgb(255 255 255)",
      mainTextColour: "rgb(255 255 255)",
      buttonColour: "rgb(255 255 255)",
      buttonTextColour: "rgb(27 27 27)",
      bgColor: "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%)",

      mainImageOpen: true,
      MainTextOpen: false,
      buttonOpen: true,
      subTextOpen: true,
      changePosition: true,
      backgrounBlur: true,
      bgImageOpen: true,
      bgDarkness: true,

      bgDarknessValue: "0.2",

    },
    {
      mainText:"ÇALIŞKAN ARI İLE DEV KAMPANYA!",
      subText:"Alacağınız tüm kitaplarda Aralık ayına özel %50 indirim.",
      buttonLink: "/",
      buttonText: "Kampanyaya Git 1",
      mainImage: "https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      
      // standart image size
      bgImage: "https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      // image size for mobile
      bgImageMd: "https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      // image size for tablet
      bgImageLg: "https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      // image size for desktop
      bgImageXl: "https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      // image size for large desktop
      bgImage2Xl: "https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      // image size for FULL HD
      bgImage4Xl: "https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      // image size for 2K
      bgImage6Xl: "https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",

      subTextColour: "rgb(255 255 255)",
      mainTextColour: "rgb(255 255 255)",
      buttonColour: "rgb(255 255 255)",
      buttonTextColour: "rgb(27 27 27)",
      bgColor: "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%)",

      mainImageOpen: true,
      MainTextOpen: true,
      buttonOpen: true,
      subTextOpen: false,
      changePosition: true,
      backgrounBlur: true,
      bgImageOpen: true,
      bgDarkness: true,

      bgDarknessValue: "0.2",

    },
    {
      mainText:"ÇALIŞKAN ARI İLE DEV KAMPANYA!",
      subText:"Alacağınız tüm kitaplarda Aralık ayına özel %50 indirim.",
      buttonLink: "/",
      buttonText: "Kampanyaya Git 1",
      mainImage: "https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      
      // standart image size
      bgImage: "https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      // image size for mobile
      bgImageMd: "https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      // image size for tablet
      bgImageLg: "https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      // image size for desktop
      bgImageXl: "https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      // image size for large desktop
      bgImage2Xl: "https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      // image size for FULL HD
      bgImage4Xl: "https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      // image size for 2K
      bgImage6Xl: "https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",

      subTextColour: "rgb(255 255 255)",
      mainTextColour: "rgb(255 255 255)",
      buttonColour: "rgb(255 255 255)",
      buttonTextColour: "rgb(27 27 27)",
      bgColor: "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%)",

      mainImageOpen: true,
      MainTextOpen: true,
      buttonOpen: true,
      subTextOpen: true,
      changePosition: false,
      backgrounBlur: true,
      bgImageOpen: true,
      bgDarkness: true,

      bgDarknessValue: "0.2",

    },
    {
      mainText:"ÇALIŞKAN ARI İLE DEV KAMPANYA!",
      subText:"Alacağınız tüm kitaplarda Aralık ayına özel %50 indirim.",
      buttonLink: "/",
      buttonText: "Kampanyaya Git 1",
      mainImage: "https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      
      // standart image size
      bgImage: "https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      // image size for mobile
      bgImageMd: "https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      // image size for tablet
      bgImageLg: "https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      // image size for desktop
      bgImageXl: "https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      // image size for large desktop
      bgImage2Xl: "https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      // image size for FULL HD
      bgImage4Xl: "https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      // image size for 2K
      bgImage6Xl: "https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",

      subTextColour: "rgb(255 255 255)",
      mainTextColour: "rgb(255 255 255)",
      buttonColour: "rgb(255 255 255)",
      buttonTextColour: "rgb(27 27 27)",
      bgColor: "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%)",

      mainImageOpen: true,
      MainTextOpen: true,
      buttonOpen: true,
      subTextOpen: true,
      changePosition: true,
      backgrounBlur: false,
      bgImageOpen: true,
      bgDarkness: true,

      bgDarknessValue: "0.2",

    },
    {
      mainText:"ÇALIŞKAN ARI İLE DEV KAMPANYA!",
      subText:"Alacağınız tüm kitaplarda Aralık ayına özel %50 indirim.",
      buttonLink: "/",
      buttonText: "Kampanyaya Git 1",
      mainImage: "https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      
      // standart image size
      bgImage: "https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      // image size for mobile
      bgImageMd: "https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      // image size for tablet
      bgImageLg: "https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      // image size for desktop
      bgImageXl: "https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      // image size for large desktop
      bgImage2Xl: "https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      // image size for FULL HD
      bgImage4Xl: "https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      // image size for 2K
      bgImage6Xl: "https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",

      subTextColour: "rgb(255 255 255)",
      mainTextColour: "rgb(255 255 255)",
      buttonColour: "rgb(255 255 255)",
      buttonTextColour: "rgb(27 27 27)",
      bgColor: "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%)",

      mainImageOpen: true,
      MainTextOpen: true,
      buttonOpen: true,
      subTextOpen: true,
      changePosition: true,
      backgrounBlur: true,
      bgImageOpen: false,
      bgDarkness: true,

      bgDarknessValue: "0.2",

    },
    {
      mainText:"ÇALIŞKAN ARI İLE DEV KAMPANYA!",
      subText:"Alacağınız tüm kitaplarda Aralık ayına özel %50 indirim.",
      buttonLink: "/",
      buttonText: "Kampanyaya Git 1",
      mainImage: "https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      
      // standart image size
      bgImage: "https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      // image size for mobile
      bgImageMd: "https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      // image size for tablet
      bgImageLg: "https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      // image size for desktop
      bgImageXl: "https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      // image size for large desktop
      bgImage2Xl: "https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      // image size for FULL HD
      bgImage4Xl: "https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      // image size for 2K
      bgImage6Xl: "https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",

      subTextColour: "rgb(255 255 255)",
      mainTextColour: "rgb(255 255 255)",
      buttonColour: "rgb(255 255 255)",
      buttonTextColour: "rgb(27 27 27)",
      bgColor: "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%)",

      mainImageOpen: true,
      MainTextOpen: true,
      buttonOpen: true,
      subTextOpen: true,
      changePosition: true,
      backgrounBlur: true,
      bgImageOpen: true,
      bgDarkness: false,

      bgDarknessValue: "0.2",

    },
    

  ]);


  useEffect(() => {

      datafetch();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);





  const datafetch = async () => {

    const {data} = await NewSystemDataProcess(targetDatabaseUrl, "localStorage", "localStorage", "/other/slider");
    if(data) {
      setSliderData(data);
    }
}



  // ekran genişliği tablet ve üstü ise sliderı çalıştır.
  if(sliderData) {
    return (
      <>
        <Swiper
          slidesPerView={1}
          spaceBetween={10}
          
          pagination={{
            clickable: true,
          }}
          autoplay={{
            delay: 400000,
            disableOnInteraction: false,
          }}
          navigation={true}
          modules={[Autoplay, Pagination, Navigation]}
        >
          {sliderData &&  sliderData.map((item, index) => {
            return (

              <SwiperSlide key={index}>
                <div className={`relative w-full`}>
                  { 
                    item.bgImageOpen ? 
                    <div className={`${item.backgrounBlur && "blur-0 md:blur  w-screen relative"}`}>
                      <Image width={700}  height={400} src={ item.bgImage6Xl} alt={item.title ? item.title : "bgImage1"} className={`hidden 4xl:block w-full relative lg:absolute ${!item.backgrounBlur && "max-h-full"}`}/>
                      <Image width={700}  height={400} src={ item.bgImage4Xl} alt={item.title ? item.title : "bgImage1"} className={`hidden 2xl:block 4xl:hidden w-full relative lg:absolute ${!item.backgrounBlur && "max-h-full"}`}/>
                      <Image width={700}  height={400} src={ item.bgImage2Xl} alt={item.title ? item.title : "bgImage1"} className={`hidden xl:block  2xl:hidden w-full relative lg:absolute ${!item.backgrounBlur && "max-h-full"}`}/>
                      <Image width={700}  height={400} src={ item.bgImageXl}  alt={item.title ? item.title : "bgImage1"} className={`hidden lg:block  xl:hidden  w-full relative lg:absolute ${!item.backgrounBlur && "max-h-full"}`}/>
                      <Image width={700}  height={400} src={ item.bgImageMd}  alt={item.title ? item.title : "bgImage1"} className={`hidden md:block  lg:hidden  w-full relative md:absolute ${!item.backgrounBlur && "max-h-full"}`}/>
                      <Image width={700}  height={400} src={ item.bgImage}    alt={item.title ? item.title : "bgImage1"} className={`          block  md:hidden  w-full relative             ${!item.backgrounBlur && "max-h-full"}`}/>
                    <div
                    style={item.bgDarknessValue ? {opacity:item.bgDarknessValue} : {opacity:0.3}}
                     className={`
                    ${item.bgDarkness && "w-full md:h-screen bg-black relative md:absolute "}
                    `}></div>
                    </div>
                    :
                    <div style={{background:item.bgColor}} className="absolute w-full h-full"></div>
                  }
                   
                    <div className={`hidden md:flex  relative w-full gap-4 p-6 px-8  flex-nowrap items-center h-[400px] 
                    ${item.changePosition ? "flex-row-reverse" : "flex-row" /* eğer yön değişikliği varsa */}
                    ${item.mainImage && item.mainImageOpen  ? "justify-around" : "justify-start"}
                    `}>
                      <div className={`${item.mainImage && item.mainImageOpen  ? "max-w-[50%]" : "max-w-[90%]"} px-2 flex flex-col gap-2 justify-center items-center`}>
                        {
                          item.mainText && item.MainTextOpen &&
                          <div>
                            <h4 style={{color:item.mainTextColour}} className={` text-center text-sm md:text-lg lg:text-2xl xl:text-4xl font-semibold ${item.MainTextOpen && "block"}`}>{item.mainText}</h4>
                          </div>
                        }
                        {
                          item.subText && item.subTextOpen &&
                          <div>
                            <p style={{color:item.subTextColour}} className={`text-center text-xs md:text-md lg:text-lg xl:text-2xl ${item.subTextOpen && "block"}`}>{item.subText}</p>
                          </div>
                        }
                        {
                          item.buttonOpen &&
                          <div>
                            <Link href={item.buttonLink}>
                              <button style={{background:item.buttonColour, color:item.buttonTextColour}} className="p-2 rounded-xl font-bold m-2 hover:rotate-6 transition-all md:text-md lg:text-lg xl:text-xl 4xl:text-2xl">{item.buttonText}</button>
                            </Link>
                          </div>
                        }
                      </div>
                      {item.mainImage && item.mainImageOpen &&
                      <div className=" max-w-[50%]  p-4 my-2 ">
                        <div>
                          <Image width={700} height={400} className=" rounded-[40px] h-full max-w-full max-h-[380px] md:p-6 hover:scale-105 transition-all" src={item.mainImage} alt="resim" />
                        </div>
                      </div>
                      }

                      
                  </div>
                  
                  
                </div>
              </SwiperSlide>
            )
          })}
        </Swiper>
      </>
    );
  }
  else{
    return(
      <div className="hidden p-0 m-0 h-0 w-0 z-20 absolute">  
      </div>
    )
  }

}

export default Slider;