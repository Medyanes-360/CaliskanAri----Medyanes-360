import ForgotPasswordContainer from '@/containers/auth/forgotPassword'
// api>auth>register içinden bu sayfaya searchParams ile doğrulama maillerini gönderiyoruz. 
// buradan da apiye verileri gönderip doğrulama işlemini tamamlıyoruz.
const ForgotPassword = () => {      

  return (
    <>
      <ForgotPasswordContainer/>
    </>
  )
}

export default ForgotPassword;