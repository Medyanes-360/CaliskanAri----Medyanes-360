"use client";
import Image from "next/image";
import { useState, useEffect } from 'react';
import { Formik, Form } from "formik";
import styles from "./styles.module.css";
import {notFound} from 'next/navigation';
import {postAPI} from '@/services/fetchAPI';
import { useRouter } from 'next/navigation';
import LoadingScreen from '@/components/other/loading';
import Input from '@/components/formElements/input';
import { ToastContainer, toast } from "react-toastify";
import resetPasswordValidationSchema from "./formikData";
import ErrorText from '@/components/formElements/errorText';



 const ResetPasswordComponent = (email) => {
    const [isloading, setIsloading] = useState(false);
    const [isAccessing, setIsAccessing] = useState(false);

    const router = useRouter();

  if(!email){
    return notFound();
  }
  else{
    return (
    <>
      { isloading && (<LoadingScreen isloading={isloading}/>) }

      <div className={`${styles.main} ${isAccessing ? "pointer-events-none" : "pointer-events-auto"}`}>
          <ToastContainer
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
              password: "",
              passwordConfirm: "",
              email: email,
            }}
            // input check
            validationSchema={resetPasswordValidationSchema}

            onSubmit={async (values) => {

              setIsloading(true);

              await postAPI("/auth/resetPassword", values).then((data) => {

                if(!data){
                    toast.error("Şifre sıfırlama sırasında bir hata oluştu. Lütfen daha sonra tekrar deneyiniz.");
                    setIsloading(false);
                }
                else{
                  if (data.status !== "success") {
                    toast.error(data.message);
                    setIsloading(false);
                  }

                  else{
                    setIsAccessing(true);
                    toast.success(data.message + " Lütfen Bekleyin, yönlendiriliyorsunuz...");
                    setIsloading(false);
  
                    //Bilgi verir ve 5 saniye sonra login sayfasına yönlendirir.
                    const timeOut = setInterval(() => {
                      router.push(`/auth/login/${data.role.toLowerCase()}`);
                      clearInterval(timeOut);
                    }, 5000);
                  }

                  
                }
              });
            }}
          >
            {(props) => (
              <Form
                onSubmit={props.handleSubmit}
                className={`${isAccessing ? "blur" : ""} ${styles.main_container}`}
              >
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
                        Şifre Sıfırlama
                      </h1>
                      <div className="mt-4">
                        <Input
                          labelValue="Yeni Şifre"
                          disabled={isAccessing}
                          id="password"
                          name="password"
                          type="password"
                          value={props.values.password}
                          onChange={props.handleChange}
                          placeholder="şifrenizi giriniz."
                        />
                        {props.touched.password && (
                          <ErrorText>{props.errors.password}</ErrorText>
                        )}
                      </div>
                      <div className="mt-4">
                        <Input
                          labelValue="Yeni Şifre Doğrulama"
                          disabled={isAccessing}
                          id="passwordConfirm"
                          name="passwordConfirm"
                          type="password"
                          value={props.values.passwordConfirm}
                          onChange={props.handleChange}
                          placeholder="Şifrenizi tekrar giriniz."
                        />
                        {props.touched.passwordConfirm && (
                          <ErrorText>{props.errors.passwordConfirm}</ErrorText>
                        )}
                      </div>

                      <div className="w-full flex justify-center mt-6">
                        <button
                          disabled={isAccessing}
                          type="submit"
                          className={`${isAccessing == true ? "bg-secondary" : "bg-primary hover:bg-primarydark"}  w-full mb-6 text-white text-xl border rounded-md p-4 `}
                        >
                          Şifreyi Sıfırla
                        </button>
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
}

export default ResetPasswordComponent;

