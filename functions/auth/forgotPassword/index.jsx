import { getDataByUnique, createNewData, getDataByMany, deleteDataByMany } from "@/services/serviceOperations";
// INFO PAGE: // https://www.prisma.io/docs/concepts/components/prisma-client/crud#update-a-single-record


export default async function createNewForgotPassword(email, { mailKey }) {
  try {

    if (!email || !mailKey) {
      throw new Error("Eksik veri gönderdiniz!");
    }

    // kullanıcı kontrolü
    const mailCheck = await getDataByUnique("AllUser", { email: email });

    // eğer doğrulanmamış bir hesaba bağlı bir kayıt varsa yen iveriyi üzerine yaz
    if (mailCheck == null || mailCheck.error || mailCheck == undefined || mailCheck == "") {
      throw new Error("Bu email adresine kayıtlı bir kullanıcı bulunamadı!");
    }
    else {
      // kullanıcının şifre sıfırlama taleplerini kontrol et
      //ve 24 saat geçmiş olanları sil
      //ve 3 kere şifre sıfırlama talebinde bulunmuşsa son kalan zamanı hesapla ve hata döndür
      // sorun yoksa yeni bir kayıt oluştur
      const ForgotPasswordCheck = await getDataByMany("ForgotPassword", { email: email });
      let currentTimes = [];
      let oldTimes = [];

      if (mailCheck && ForgotPasswordCheck && !ForgotPasswordCheck.error) {

        ForgotPasswordCheck.map(async (item) => {
          const lifeTime = Date.now() - item.validTime;
          const pastHour = Math.floor((lifeTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

          if (pastHour < 24) {
            currentTimes.push(item.validTime);
          }
          else {
            oldTimes.push(item.validTime);
          }
        });
        // 3 kere doğru bir maile şifre sıfırlama talebinde bulunmuşsa son kalan zamanı hesapla ve hata döndür
        if (currentTimes.length >= 3) {
          const lastResetPasswordRequest = currentTimes[currentTimes.length - 1];
          const lifeTime2 = Date.now() - lastResetPasswordRequest;
          const pastHour = Math.floor((lifeTime2 % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          const remainingTime = 24 - pastHour;
          throw new Error("Kısa süre içerisinde 3 kere şifre sıfırlama talebinde bulundunuz. Lütfen " + remainingTime + " saat sonra tekrar deneyiniz.");
        }

        if (oldTimes.length > 0) {
          // 24 saat geçmiş olanları sil
          oldTimes.map(async (item) => {
            const { error } = await deleteDataByMany("ForgotPassword", { validTime: item });
            if (error) {
              throw new Error(error.message);
            }
          });
        }
      }
      // yeni bir kayıt oluştur
      const validTime = Date.now();
      const forgotPasswordFromDB = await createNewData("ForgotPassword", { email: email, secretKey: mailKey, validTime: validTime });
      if (forgotPasswordFromDB.error || forgotPasswordFromDB == null || forgotPasswordFromDB == undefined) {
        throw new Error(forgotPasswordFromDB.error);
      }
      return forgotPasswordFromDB;
    }
  }
  catch (error) {
    return { error };
  }
}
