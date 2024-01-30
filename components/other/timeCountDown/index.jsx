"use client";

import React, { useEffect, useState } from "react";
import CalculateTime from "@/functions/other/calculateTime";


export const TimeCountDown = ({ data }) => {


  // veri tabanından gelen verileri üzerinde güncel tutacak olan state.
  const [time, setTime] = useState({
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  
// ilk başlatma anında props olarak gelen verileri "CalculateTime" e gönderir ve (ay - gün - saat - dakika - saniye) olarak ayrıştırır.
// ve bu değerleri "time" state'ine atar.
  useEffect(() => {
    if (data && data.endBannerTime) {
      const { months, days, hours, minutes, seconds } = CalculateTime(data.endBannerTime);

      if(months != 0 || days != 0 || hours != 0 || minutes != 0 || seconds != 0){
        setTime({
          months,
          days,
          hours,
          minutes,
          seconds,
        });
      } 
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

 
// her saniye başı çalışır ve "time" state'indeki değerleri günceller.
  useEffect(() => {
    
    if(time.seconds != 0 || time.minutes != 0 || time.hours != 0 || time.days != 0 || time.months != 0){
      const timeOut = setInterval(() => {

        let data = {
          months: time.months,
          days: time.days,
          hours: time.hours,
          minutes: time.minutes,
          seconds: time.seconds,
        }
        
        if(data.seconds != 0 && data.seconds != undefined){
          data.seconds = data.seconds - 1;
        }else if(data.minutes != 0 && data.minutes != undefined){
          data.minutes = data.minutes - 1;
          data.seconds = 59;
        }else if(data.hours != 0 && data.hours != undefined){
          data.hours = data.hours - 1;
          data.minutes = 59;
          data.seconds = 59;
        }else if(data.days != 0 && data.days != undefined){
          data.days = data.days - 1;
          data.hours = 23;
          data.minutes = 59;
          data.seconds = 59;
        }else if(data.months != 0 && data.months != undefined){
          data.months = data.months - 1;
          data.days = 30;
          data.hours = 23;
          data.minutes = 59;
          data.seconds = 59;
        }
        setTime(data);   
  
          clearInterval(timeOut);
        },1000);
    }
    
  }, [time]);

  return (
    <div>
      {data && (
        <div className="grid grid-flow-col gap-2 text-center auto-cols-max">
          {time.months > 0 && (
            <div className="flex flex-col w-14 bg-neutral rounded-xl-box text-neutral-content hover:scale-110 transition-all">
              <div className="countdown font-mono  bg-primary rounded-t-xl py-1">
                <span className="text-white font-bold text-2xl">{time.months < 10 && 0}{time.months}</span>
              </div>
              <span className="text-primary font-bold text-xs border-l border-b border-r border-primary rounded-b-xl py-1 bg-white">Ay</span>
            </div>
          )}
          {(time.days > 0 || time.months > 0) && (
            <div className="flex flex-col w-14 bg-neutral rounded-xl-box text-neutral-content hover:scale-110 transition-all">
              <div className="countdown font-mono  bg-primary rounded-t-xl py-1">
                <span className="text-white font-bold text-2xl">{time.days < 10 && 0}{time.days}</span>
              </div>
              <span className="text-primary font-bold text-xs border-l border-b border-r border-primary rounded-b-xl py-1 bg-white">Gün</span>
            </div>
          )}
          {(time.hours > 0 || time.days > 0 || time.months > 0) && (
            <div className="flex flex-col w-14 bg-neutral rounded-xl-box text-neutral-content hover:scale-110 transition-all">
              <div className="countdown font-mono  bg-primary rounded-t-xl py-1">
                <span className="text-white font-bold text-2xl">{time.hours < 10 && 0}{time.hours}</span>
              </div>
              <span className="text-primary font-bold text-xs border-l border-b border-r border-primary rounded-b-xl py-1 bg-white">Saat</span>
            </div>
          )}
          {(time.minutes > 0 || time.hours > 0 || time.days > 0 || time.months > 0) && (
            <div className="flex flex-col w-14 bg-neutral rounded-xl-box text-neutral-content hover:scale-110 transition-all">
              <div className="countdown font-mono  bg-primary rounded-t-xl py-1">
                <span className="text-white font-bold text-2xl">{time.minutes < 10 && 0}{time.minutes}</span>
              </div>
              <span className="text-primary font-bold text-xs border-l border-b border-r border-primary rounded-b-xl py-1 bg-white">Dakika</span>
            </div>
          )}
          {(time.seconds >= 0 || time.minutes > 0 || time.hours > 0 || time.days > 0 || time.months > 0) && (time.seconds != 0 || time.minutes != 0 || time.hours != 0 || time.days != 0 || time.months != 0) && (
            <div className="flex flex-col w-14 bg-neutral rounded-xl-box text-neutral-content hover:scale-110 transition-all">
              <div className="countdown font-mono  bg-primary rounded-t-xl py-1">
                <span className="text-white font-bold text-2xl">{time.seconds < 10 && 0}{time.seconds}</span>
              </div>
              <span className="text-primary font-bold text-xs border-l border-b border-r border-primary rounded-b-xl py-1 bg-white">Saniye</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TimeCountDown;
