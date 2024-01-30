// INFO PAGE: // https://www.prisma.io/docs/concepts/components/prisma-client/crud#update-a-single-record
import { getDataByUnique, createNewData } from "@/services/serviceOperations";



const createNewUser = async (user, mailKey) =>{
  try {
    
    // kullanıcı kontrolü
    const mailCheck = await getDataByUnique(user.role, {email: user.email});
 
    // eğer doğrulanmamış bir hesaba bağlı bir kayıt varsa yen iveriyi üzerine yaz
    if (mailCheck != null && !mailCheck.error) {
      return { error: "Bu e-mail adresine kayıtlı başka bir hesap bulunmaktadır. Şifremi unuttum bölümünden şifrenizi sıfırlayabilirsiniz." };
    }

    else {
      user.verified = false;
      // Kullanıcıyı veritabanına kayıt eder.
      const userFromDB = await createNewData(user.role, user);
      
      //Kayıt olan her kullanıcıyı tek tabloda birleştiririz. 
      const allUserFromDB = await createNewData("AllUser", {
        email: user.email,
        role : user.role,
        name : user.name,
        surname : user.surname,
      });
      
      // E-mail doğrulama işlemi için veritabanına kayıt oluşturur.
      const createVerifyDB = await createNewData("VerifyEmail", {
        email: user.email,
        secretKey: mailKey,
        validTime: Date.now(),
      }); 
      
      if( createVerifyDB.error || userFromDB.error || allUserFromDB.error || !createVerifyDB || !userFromDB || !allUserFromDB){
        return { error: "Kayıt oluşturulamadı." };
      }

      return { success: "Kayıt başarılı. E-mail adresinize doğrulama kodu gönderildi." };
    }          
  } 
  catch (error) {
    return { error: error.message };
  }
}

export default createNewUser;


      // TELEFON KONTROL İSTEĞİ (DURDURULDU ŞİMDİLİK!)
      // const phoneCheck = await prisma.user.findUnique({
      //   where: {
      //     phone: user.phone
      //   },
      // })

      // TELEFON KONTROL KOŞULU (DURDURULDU ŞİMDİLİK!)
      // // Eğer öğrenci ile eşleşen bir kayıt varsa hata döndür
      // else if (phoneCheck != null && phoneCheck.phone == user.phone) {
      //   return { error: "Girdiğiniz telefon numarası ile daha önce kayıt yapılmış." };
      // }   
