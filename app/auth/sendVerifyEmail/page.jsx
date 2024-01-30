import SendVerifyEmailContainer  from '@/containers/auth/sendVerifyEmail';
// api>auth>register içinden bu sayfaya searchParams ile doğrulama maillerini gönderiyoruz. 
// buradan da apiye verileri gönderip doğrulama işlemini tamamlıyoruz.

//NOT: mailden tıklanan buton ile searchParams'a veriler gelir.


const SendVerifyEmailPage = () => {

  return (
    <>
      <SendVerifyEmailContainer/>
    </>
  )
}

export default SendVerifyEmailPage