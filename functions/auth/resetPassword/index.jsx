import {getDataByUnique,deleteDataByMany} from "@/services/serviceOperations";
import DecryptPassword from "@/functions/auth/decryptPassword";



const ResetPassword = async (searchParams)=>{
  try {
    if (!searchParams) {
      throw new Error("Eksik yada yanlış bir işlem başlattınız.");
    }

    // ForgotPassword tablosundan key eşleşmesi ile verileri yakalarız.
    const forgotPasswordData = await getDataByUnique("ForgotPassword", {
      secretKey: searchParams.key,
    });
    if (
      !forgotPasswordData ||
      forgotPasswordData.error ||
      forgotPasswordData == null
    ) {
      throw new Error("Şifre Sıfırlama Linki Geçersizdir.");
    }

    // Şifre Sıfırlama Linkinin Geçerlilik Süresi 24 Saattir.
    const now = Date.now();
    const LifeTime = now - forgotPasswordData.validTime;
    const pastHour = Math.floor(
      (LifeTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );

    // Eğer geçerlilik süresi dolmuş ise verileri silelim.
    if (pastHour >= 24) {
      const { error } = await deleteDataByMany("ForgotPassword", {
        email: forgotPasswordData.email,
      });

      if (error) {
        throw new Error(error.message);
      }
      throw new Error(
        "Şifre Sıfırlama Linkinin Geçerlilik Süresi Bitmiştir. Lütfen Yeni Bir Şifre Sıfırlama Talebinde Bulununuz."
      );
    }

    // ForgotPassword tablosundan gelen değerler ile DecryptPassword fonksiyonunu kullanarak şifreleri karşılaştırıyoruz.
    const verify = await DecryptPassword(
      forgotPasswordData.email,
      searchParams.email
    );

    if (!verify) {
      throw new Error("Bu mail adresi ile ilgili bir şifre sıfırlama talebi bulunmamaktadır.");
    }

    return { success: true, email: forgotPasswordData.email };
  } catch (error) {
    return { error: error.message };
  }
}

export default ResetPassword;
