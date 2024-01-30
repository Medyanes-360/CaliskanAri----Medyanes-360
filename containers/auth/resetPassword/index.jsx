import React from 'react';
import ResetPasswordComponent from '@/components/auth/resetPassword';
import ResetPassword from 'functions/auth/resetPassword';
import {notFound} from 'next/navigation';
import Notification from '@/components/other/notification';


const ResetPasswordContainer = async ({searchParams})  => {



  // eğer key veya mail boş ise 404 Not Foud döndür.
  if(
    searchParams.key == undefined ||
    searchParams.key == null ||
    searchParams.key == "" ||
    searchParams.email == undefined ||
    searchParams.email == "" ||
    searchParams.email == null
    ){
    return notFound();
  }

    // forgotpassword'dan gönderilen ve tablolara eklenen verileri ve geçerlilik süresini kontrol eder
    const {success, error, email} = await ResetPassword(searchParams);

  
    if(!success || error || !email){
      return (
        <Notification type="error" message={error} label="Hatalı İşlem" remainingTime={0} backButtonName="Ana Sayfa" targetButtonName="Şifre Sıfırlama" backUrl="/" targetUrl="/auth/forgotPassword" />
      )
    }
    else{
      return (
        <>  
            <ResetPasswordComponent email={email}/>
        </>
      )
    }
    

  
  

  
}

export default ResetPasswordContainer
