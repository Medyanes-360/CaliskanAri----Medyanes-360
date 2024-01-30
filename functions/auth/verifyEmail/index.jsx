import { getDataByUnique, updateDataByAny, deleteDataByMany } from "@/services/serviceOperations";

import DecryptPassword from "@/functions/auth/decryptPassword"



const VerifyEmail = async ({key, email, role})=>{
   try {
    const verifyEmailData = await getDataByUnique("VerifyEmail", {secretKey: key});
     if(!verifyEmailData || verifyEmailData.error  || verifyEmailData == null) {
        throw new Error("Mail Doğrulama Linki Geçersizdir.");
     }
      const now = Date.now();
      const LifeTime = now - verifyEmailData.validTime;
      const pastHour = Math.floor((LifeTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      
      // 24 saat geçerlilik süresi var.
      // 24 saat geçerlilik süresi dolmuşsa kaydı sil.
      if(pastHour >= 24){
         const {error} = await deleteDataByMany("VerifyEmail", {email: verifyEmailData.email});
            if(error){
              throw new Error(error.message);
            }
         throw new Error("Mail Doğrulama Linkinin Geçerlilik Süresi Bitmiştir. Lütfen Yeni Bir Mail Doğrulama Talebinde Bulununuz.");
      }
      // mail adresi doğrulama işlemi
      const  verify = await DecryptPassword(verifyEmailData.email, email)
      
      if(!verify) {
         throw new Error("Girdiğiniz Mail Adresi Geçersizdir.");
      }

      // mail adresi doğrulama işlemi
      const mailCheck = await getDataByUnique(role, {email: verifyEmailData.email});

    if (!mailCheck || mailCheck.role !== role || mailCheck == null || mailCheck.error) {
      throw new Error("Kullanıcı kaydı bulunamadı.");
    }

    if (mailCheck.verified){ 
      throw new Error("Mail adresiniz zaten onaylanmış.");
    }
    // Veri tabanında mail adresi onaylanmış olarak güncelle.
    const userFromDB = await updateDataByAny(role, {email: verifyEmailData.email}, { verified: true});
      
      if (!userFromDB || userFromDB.error) {
         throw new Error("Mail adresiniz onaylanamadı bir hata ile karşılaşıldı!");
      }

    // verifyEmail tablosundan kayıtları sil.
    const deleteVerifyEmail = await deleteDataByMany ("VerifyEmail", {email: verifyEmailData.email});

    if (!deleteVerifyEmail || deleteVerifyEmail.error) {
      throw new Error("Mail adresiniz onaylanamadı bir hata ile karşılaşıldı!");
    }

    return {status: "success", message: "Mail adresiniz başarıyla onaylandı!"};

   } catch (error) {

      return {error: error?.message, status: "error"};
   }

}

export default VerifyEmail;