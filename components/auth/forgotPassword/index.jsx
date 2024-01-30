"use client";
import Image from "next/image";
import { useState } from 'react';
import { Formik, Form } from "formik";
import styles from "./styles.module.css";
import {postAPI} from "@/services/fetchAPI";
import { useRouter } from "next/navigation";
import LoadingScreen from '@/components/other/loading';
import Input from '@/components/formElements/input';
import { ToastContainer, toast } from "react-toastify";
import forgotPasswordValidationSchema from "./formikData";
import ErrorText from '@/components/formElements/errorText';
import React from 'react';


const ForgotPasswordComponent = () => {

  const [isAccessing, setIsAccessing] = useState  (false);
  const [isloading, setIsloading] = useState  (false);

  const router = useRouter();

  return (
  <>
    { isloading && (<LoadingScreen isloading={isloading}/>) }
    
    <div className={styles.main}>
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
          email: "",
        }}
        // input check
        validationSchema={forgotPasswordValidationSchema}

        onSubmit={(values) => {

          setIsloading(true);
            
            postAPI("/auth/forgotPassword",  values.email ).then(data => {

              
                if (data?.status === "success") {
                  toast.success(data.message);
                  setIsloading(false);
                  setIsAccessing(true);

                  setTimeout(() => {
                    router.push('/');
                  }, 5000);

                } else if(data && typeof data === "object" && data?.status === "error") {
                    toast.error(data?.message);
                    setIsloading(false);
                }
              
              else{
                toast.error("Bir hata oluştu. Lütfen daha sonra tekrar deneyiniz.");
                setIsloading(false);
              }
            })
          
        }}
      >

        {(props) => (
          <Form onSubmit={props.handleSubmit} className={`${isAccessing ? "blur"  : ""} ${styles.main_container} md:scale-75 2xl:scale-100`} >
            
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
                      labelValue='Email'
                      disabled={isAccessing}
                      id='email'
                      name='email'
                      type='email'
                      value={props.values.email}
                      onChange={props.handleChange}
                      placeholder='Mail adresinizi giriniz.'
                    />
                    {props.touched.email &&
                      <ErrorText >
                        {props.errors.email}
                      </ErrorText>
                    }
                    </div>
                    <div className="w-full flex justify-center my-4">
                      <button
                        disabled={isAccessing}
                        type='submit'
                        className={`${isAccessing == true ? "bg-secondary" : "bg-primary hover:bg-primarydark"}  w-full text-white text-xl 4xl:text-2xl  border rounded-md p-4 `}
                      >
                        Şifre Sıfırlama Maili Gönder
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

export default ForgotPasswordComponent;

