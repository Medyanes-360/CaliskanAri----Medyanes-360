import React from "react";
// string olan gelen tarih ve saat bilgisini gün - saat - dakika - saniye cinsinden hesaplayıp döndürür.


// verinin aldığı tip -> "2023-05-12T17:44" şeklinde bir sitring ifade benzeri olmalıdır.
const calculateTime = (time) => {
    const date = new Date(time); // gelen string ifadeyi Date objesine çevirme
    const now = new Date(); // şu anki tarih ve zaman
  
    if(date > now){
      // farkı hesapla
      const diffInMilliseconds = Math.abs(now.getTime() - date.getTime()); // farkı milisaniye cinsinden hesapla
    
      // sonucu hesapla
      const seconds = Math.floor(diffInMilliseconds / 1000) % 60;
      const minutes = Math.floor(diffInMilliseconds / (1000 * 60)) % 60;
      const hours = Math.floor(diffInMilliseconds / (1000 * 60 * 60)) % 24;
      const days = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24)) % 30; // varsayılan olarak ayın son gününe kadar hesaplanıyor
      const months = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24 * 30));
    
      return {
        months,
        days,
        hours,
        minutes,
        seconds,
      };
    }
    else{
      return {
        months: 0,
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      };
    }
  }

    export default calculateTime;