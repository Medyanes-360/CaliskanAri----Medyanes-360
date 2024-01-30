<<<<<<< HEAD
=======
## UNUTULMAMASI GEREKEN KONTROLE TABİ AYARLAR VE YERLER!

1- functions / other / Rate limit yapısında sayfalar ve api isteklerinin sürelerini iş bitiminde ekle

2- functions / other / regularCheckSystemData -> içinde "dataUpdateChecker" config dosyasını çekeceğin verilere göre yenile

3- "newSystemDataProcess" içerisinde "cookieTimeUpdate" fonksiyonu ile hangi aralıkta yenileme kontrol yapacağını belirleriz. süreyi oradan kontrol edebilirsin.

4- heroku gibi bir apiye adres sistemini entegre etmen gerekiyor (adreslerdeki benzer isimlendirmeyi düzeltmen gerekiyor)

5- register - login sayfalarındaki görseller değiştirilecek

6- Slider için veri tabanına ekran ölçüsüne göre görseller eklenmelidir.
aşağıda ekran ölçülerine göre minumum width (genişlik) ölçüleri verilmiştir.

sisize for 2K > 2560 (item.image6Xl)
size for FULL HD > 1920 (item.image4Xl)
size for large desktop > 1536 (item.image2Xl)
size for desktop > 1280 (item.imageXl)
size for tablet > 1024 (item.imageLg)
size for mobile > 768 (item.imageMd)
size for default <= 768 (item.image)

7- bir yerdne resim çekileceği zaman -> "next.config.js" içerisindeki "images" objesindeki "domains" içerisine eklenmesi gerekiyor. <!-- domains: ['source.unsplash.com','images.unsplash.com'], -->

NTOE:

###############################################################################################################
1- veri tabanına sürekli istek atan herkesin kullandığı componentleri 1 kere istek atıp veriyi localstorage yada cookie içinde depolarız ve belirli aralıklar ile bu verinin güncelliğini kontrol ederiz.

## bu şekilde çalışacak olan yapıları aşağıdaki gibi verilerini getirtebilirsin...

// verileri (cookie | localstorage | database) yönetimini sağlayan fonksiyon
//(database ismi | cookie veya localstorage ismi | api url)

-> const {data} = await NewSystemDataProcess("GeneralTopPageBanner", "localStorage", "localStorage", "/other/generalTopPageBanner");
###############################################################################################################