"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from 'react';
import { Formik, Form } from "formik";
import styles from "./styles.module.css";
import { useRouter } from 'next/navigation';
import PopupScreen from "@/components/other/popup";
import LoadingScreen from '@/components/other/loading';
import studentValidationSchema from "./formikData";
import { ToastContainer, toast } from "react-toastify";


// session: giriş yapmış kullanıcıyı temsil eder varsa bilgileri içinde barındırır.
// signIn:  kullanıcıyı giriş yapmaya yönlendirmek için kullanılır.
import { signIn } from "next-auth/react";


const StudentLoginComponent  = ({pageRole}) => {

  const [popupData, setPopupData] = useState({
    popupIsActive: false,
    Title: "Uyarı.",
    subTitle: "Bu bir uyarı bildirimidir.",
    buttonUrl: "/",
    buttonText: "Anasayfa"
  });

  const [isAccessing, setIsAccessing] = useState(false);
  const [isloading, setIsloading] = useState(false);

  const router = useRouter();

  return (
    <>
      <PopupScreen
          setPopupData={setPopupData}
          popupData = {popupData}
      >
      </PopupScreen>

      { isloading && (<LoadingScreen isloading={isloading}/>) }

      <div className={styles.main}>
        <ToastContainer
          position="top-right"
          autoClose={4000}
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
            email: "",
            password: "",
            activationCode: ""
          }}
          // input check
          validationSchema={studentValidationSchema}

          onSubmit={(values) => {
            setIsloading(true);
            // signIn içine hangi provider ile giriş yapılacağı ve giriş bilgileri gönderilir.
            const result = signIn('credentials', {
              email: values.email,
              password: values.password,
              role: pageRole,
              callbackUrl:"/", 
              redirect: false, 
            }).then((res ) => {   
              if(!res){
                toast.error("Bir hata oluştu. Lütfen tekrar deneyiniz.");
                setIsloading(false);
              } 
                      
              else if(!res.ok){
                toast.error(res.error);
                setIsloading(false);

                // verifyEmail şuanda nextauth error içerisinden gelmiyor kontrol et.
                if(res.error.includes("doğrulanmamış") || res.error.includes("doğrulayınız")){
                  setPopupData({ 
                  
                    popupIsActive: true,
                    Title: "Mail Adresiniz Doğrulanmamış!",
                    subTitle: "Girdiğiniz mail adresi henüz doğrulanmamış. Mail adresinize gelen doğrulama kodunu girerek hesabınızı aktif edebilir, veya aşağıdaki butona basarak yeni bir doğrulama maili talep edebilirsiniz.",
                    buttonUrl: "/auth/sendVerifyEmail",
                    buttonText: "Mail Doğrulama"
                  });               
                }
              }
              else{
                setIsAccessing(true);
                setIsloading(false);
                toast.success("Giriş Başarılı (Yönlendiriliyorsunuz...)")
                const timeOut = setInterval(() => {
                  router.push('/');
                  clearInterval(timeOut);
                }, 2000);
              }
            })
            
          
          }}
        >

          {(props) => (
            <Form onSubmit={props.handleSubmit} className={`${isAccessing ? "blur"  : ""} ${styles.main_container}`} >
              
                <div className={styles.container}>
                  <div className={styles.container_left_side}>
                    <img
                      className={styles.left_side_image}
                      src="https://source.unsplash.com/user/erondu/1600x900"
                      alt="img"
                    />
                  </div>
                  <div className={styles.container_right_side}>
                    <div className="w-full">
                      <div className={styles.right_side_logo}>
                        <div
                          className={styles.right_side_logoImage}
                        >
                          <Image
                            src="/logo.png"
                            width="150"
                            height="150"
                            alt="logo"
                            priority={true}
                          />
                        </div>
                      </div>
                      <h1 className="mb-4 mt-4 text-2xl font-bold text-center text-gray-700">
                        Öğrenci Giriş
                      </h1>
                      <div className="mt-4">
                        <label className="block text-sm">Email</label>
                        <input
                        id='email'
                        name='email'
                        autoComplete='off'
                        type='email'
                        value={props.values.email}
                        onChange={props.handleChange}
                        placeholder="Mail adresinizi giriniz."
                        className="w-full px-4 py-2 text-sm border rounded-md focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600"
                        />
                      </div>
                      <div>
                        <label className="block mt-4 text-sm">Şifre</label>

                        <input 
                          id='password'
                          name='password'
                          type='password'
                          value={props.values.password}
                          onChange={props.handleChange}
                          placeholder="******"
                          className="w-full px-4 py-2 text-sm border rounded-md focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600"
                        />
                      </div>
                      <button
                      disabled={isAccessing}
                        className={`${isAccessing ? "bg-gray-600 active:bg-gray-600 hover:bg-gray-600" : "bg-blue-600 active:bg-blue-600 hover:bg-blue-700"} block w-full px-4 py-2 mt-4 text-sm font-medium leading-5 text-center text-white transition-colors duration-150  border border-transparent rounded-lg  focus:outline-none focus:shadow-outline-blue`}
                        type="submit"
                      >
                        Giriş Yap
                      </button>

                      <div className="mt-4 text-center gap-2 flex justify-center items-center flex-col">
                      <p className="text-md">
                      Kayıtlı hesabınız yok mu?<Link href={`/auth/register/${pageRole.toLowerCase()}`} className="text-blue-600 hover:underline"> Öğrenci Kayıt.</Link>
                      </p>
                      <p className="text-md">
                      Şifrenizi mi unuttunuz?<Link href={`/auth/forgotPassword/`} className="text-blue-600 hover:underline"> Şifremi Unuttum.</Link>
                      </p>
                      <p className={`text-md bg-cst_red p-2 rounded ${popupData.popupIsActive ? "block" : "hidden"}`}>
                      Mailiniz Doğrulanmamış mı?<Link href={`/auth/sendVerifyEmail`} className="text-blue-600 hover:underline"> Mail Doğrulama.</Link>
                      </p>
                      </div>
                    </div>
                  </div>
                </div>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
}

export default StudentLoginComponent;
