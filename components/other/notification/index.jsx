"use client"
import { useRouter } from 'next/navigation';
import LoadingScreen from '@/components/other/loading';
import { useState , useEffect, useCallback} from "react";
import { useSearchParams, usePathname } from 'next/navigation';
import {MdDone, MdWarningAmber, MdCircleNotifications, MdOutlineErrorOutline } from "react-icons/md";


// targetUrl = yönlendirilecek sayfa
// label = başlık
// type = info, error, success, warning
// message = gösterilecek mesaj
// targetUrl = buton yazısı


 const Notification = ({
  type="info", 
  message="Lütfen tekrar deneyiniz.", 
  label="Bir Hata Oluştu.", 
  targetUrl="/", 
  targetButtonName="Ana Sayfa",
  backButtonName="Geri Dön",
  backUrl = "/",
  remainingTime = 20
}) =>{
  const [isloading, setIsloading] = useState(false);
  const router = useRouter();
  
  const searchParams = useSearchParams();
  const pathname = usePathname();
 
  if(searchParams){
    if(searchParams.get("type") || searchParams.get("message")){
      type = searchParams.get("type") || "error";
      message = searchParams.get("message") || "Bir hata oluştu.";
      label = searchParams.get("label") || "Lütfen tekrar deneyiniz.";
      targetButtonName = searchParams.get("targetButtonName") || "Ana Sayfa";
      backButtonName = searchParams.get("backButtonName") || "Geri Dön";
      remainingTime = Number(searchParams.get("remainingTime")) || 10;
      targetUrl = searchParams.get("targetUrl") || "/";
      backUrl = searchParams.get("backUrl") || "/";
    } 
  }


  const  [countDown, setCountDown] = useState(  remainingTime );


  // useCallback hook'u, fonksiyonu bellekte saklar ve
  // bağımlılıklarının değişmesi durumunda yeniden oluşturulmasını sağlar.
  // Bu, React'ta performansı artırmak için kullanılan bir tekniktir.
  const createQueryString = useCallback((name, value) => {
    if(searchParams){
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value.toString());

      return params.toString();
    }
  },
    [searchParams],
  );

  
  // içine gönderilen saniye kadar geri sayım sayacı çalışır.
  function startCountdown(seconds) {
    let countdownInterval = setInterval(() => {
      if (seconds <= -1) {
        clearInterval(countdownInterval);
        return;
      }
      setCountDown(seconds);

      // searchparams ve path yapısını buradan değiştiriyoruz
      // aşağıdaki kodun en önemli özelliği sayfayı yenilemeden targetUrl yapısını değiştirmesidir.
      // createQueryString -> parametredeki değeri değiştirir.
      window.history.pushState({}, '', `${pathname}?${createQueryString('remainingTime', seconds)}`)
      --seconds;
      --remainingTime;
    }, 1000);
  }
  

  useEffect(() => {
    // sayfa her render olduğunda fonksiyonu çalıştırır.
    startCountdown(countDown-1);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  

  
  
  return (
    <>
      {isloading && <LoadingScreen isloading={isloading} />}
      <div
        className={`absolute w-full h-full flex flex-col items-center text-xl justify-center select-none
    ${type == "info" && "bg-blue-500"}
    ${type == "error" && "bg-cst_red"}
    ${type == "success" && "bg-cst_green"}
    ${type == "warning" && "bg-cst_yellow"}
    `}
      >
        <div className={`bg-white inline-block rounded shadow-lg py-6`}>
          <div className="flex flex-col justify-center items-center ">
            {type == "info" && (
              <MdCircleNotifications size={80} className="text-blue-500" />
            )}
            {type == "error" && (
              <MdOutlineErrorOutline size={80} className="text-cst_red" />
            )}
            {type == "success" && (
              <MdDone size={80} className="text-cst_green" />
            )}
            {type == "warning" && (
              <MdWarningAmber size={80} className="text-cst_yellow" />
            )}

            <div
              className={`w-full flex justify-start flex-col py-4 px-6 my-6 gap-2
            ${type == "info" && "bg-blue-100"}
            ${type == "error" && "bg-cst_red"}
            ${type == "success" && "bg-cst_green"}
            ${type == "warning" && "bg-cst_yellow"}
          `}
            >
              <h3 className=" font-bold text-xl">{label}</h3>
              <p
                className={`
            ${type == "info" && "text-blue-500"}
            ${type == "error" && "text-cst_red"}
            ${type == "success" && "text-cst_green"}
            ${type == "warning" && "text-cst_yellow"}
            `}
              >{`${
                countDown
                  ? message +
                    " " +
                    countDown +
                    " saniye sonra tekrar deneyiniz."
                  : message
              } `}</p>
            </div>
          </div>
          <div className={`w-full flex justify-center items-center gap-4 p-4`}>
            <button
              onClick={() => {
                if (countDown <= 0) {
                  setIsloading(true);
                  router.replace(targetUrl);
                } else {
                  // Do nothing
                }
              }}
              className={` bg-gray-500  transition-all p-4 hover:scale-100 rounded text-white shadow
          ${countDown > 0 && "bg-gray-500   hover:bg-gray-500 hover:scale-100 cursor-default"}
          ${countDown <= 0 && type == "info" && "bg-blue-500 hover:scale-110 hover:bg-blue-600"}
          ${countDown <= 0 && type == "error" && "bg-cst_red hover:scale-110 hover:bg-blue-600"}
          ${countDown <= 0 && type == "success" && "bg-cst_green hover:scale-110 hover:bg-blue-600"}
          ${countDown <= 0 && type == "warning" && "bg-cst_yellow hover:scale-110 hover:bg-blue-600"}
          `}
          
            >
              {`${targetButtonName} ${countDown > 0 ? `(${countDown})` : "" }`}
            </button>
            <button
              onClick={() => {
                setIsloading(true);
                  router.replace(backUrl);
              }}
              className={`
          ${!backButtonName && "hidden"}
          hover:scale-110 transition-all p-4 rounded text-white shadow
          ${type == "info" && "bg-blue-500 hover:bg-blue-600"}
          ${type == "error" && "bg-cst_red hover:bg-blue-600"}
          ${type == "success" && "bg-cst_green hover:bg-blue-600"}
          ${type == "warning" && "bg-cst_yellow hover:bg-blue-600"}
          `}
            >
              {`${backButtonName}`}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Notification;