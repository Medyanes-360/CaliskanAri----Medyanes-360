import dataUpdateChecker from '@/functions/other/regularCheckSystemData/dataUpdateChecker';
import { setCookie, getCookie } from 'cookies-next';

// Bu fonksiyonun amacı cookie içerisinden gelen zamanı kontrol etmek 
// zaman yok ise yeni bir zaman dilimini cookie içerisine aktarmaktır.
// cookie içerisinde belirlenen aralıklarla güncel zamanı sürekli bulundurmayı sağlar.
// "updateLoop" props'u ile gelen değer zamanı güncelleme aralığını belirler.
// bu fonksiyon "middleware" içerisinde tanımlanmıştır.



const CookieTimeUpdate = async (updateLoop=10)=> {
    try {

        // cookie içerisinde "lastUpdateTime" VARSA! burası çalışır...
        if(getCookie('lastUpdateTime')){
            const cookieValue = getCookie('lastUpdateTime')
            // cookie içerisindeki json değerini JSON.parse() ile objeye çevirerek  kullanabilirsiniz.
            const lastUpdateTime = JSON.parse(cookieValue).Date
            const currentTime = new Date().getTime().toString()
            const timeDifference = parseInt(currentTime) - parseInt(lastUpdateTime)
            // 1000 milisaniye = 1 saniye
            // 1000 * 60 milisaniye = 1 dakika

            // Burası 30 dakikadan fazla zaman geçmişse çalışır...
            // updateLoop -> 30 dakika
           
            if(timeDifference > 1000 * 60 * updateLoop){
                
                dataUpdateChecker();
                //responseCookies.cookies.delete("lastUpdateTime");
                 setCookie(
                    "lastUpdateTime",
                    JSON.stringify({Date: new Date().getTime().toString(), Time: new Date().toLocaleTimeString()
                }))

                // dataUpdateChecker() fonksiyonu ile
                // verilerin güncelliğini burası her çalıştığında kontrol ederiz.
                
                return {error: null, status: "success"}
            }
        }
        
        //#######################################################################################

        // cookie içerisinde "lastUpdateTime" YOKSA! burası çalışır...
        else{
            setCookie(
                "lastUpdateTime",
                JSON.stringify({Date: new Date().getTime().toString(), Time: new Date().toLocaleTimeString()
            }))
            
            dataUpdateChecker();
            return {error: null, status: "success"}
        }
    
    } catch (error) {
        console.log(error);
            return {
                error: error,
                status: "error",
                data: null
            }

    }
}

export default CookieTimeUpdate
