import {getAPI, postAPI} from "@/services/fetchAPI";
import dataUpdateConfig from "./dataUpdateConfig"
import { setCookie, getCookie, deleteCookie } from 'cookies-next';

// bu fonksiyon veri tabanından gelen verileri kontrol eder ve güncelleme olan verileri bulur.
const findNewData = (data) => {
  const newData = Object.keys(data).reduce((acc, key) => {
    if (data[key].isNewData === true) {
      acc.push(data[key]);
    }
    return acc;
  }, []);
  
  return newData;
};

// BU FONKSİYON: backend'de bir veri güncellendiğinde ve veri tabanına yeni bir veri girişi olduğunda...;
// çalışır ve hangi verinin güncellendiğini veri tabanından alır ve getirir.
// güncelleme yapılan verinin "cookie - localstorage" kaydını siler.
// sebebi: kayıt silindiğinde component kayda ulaşamaz ve güncel veriyi tekrar veritabanından istek atarak çekebilir.
// böylelikle verilerin güncelliği sağlanmış olunur.

const DataUpdateChecker = async () => {

  // tüm güncelleştirmelerin ve kayıtların üzerinde barındırdığı config dosyasını alıyoruz.
  // NOT: Eğer güncelliği takip edilmesi gereken yeni bir veri eklenirse, "dataUpdateConfig.tsx" dosyasına eklenmelidir!
  const DataConfig = dataUpdateConfig();

  try {
    
    // alınan verileri bak -> 
    //güncelleştirme olan verileri bul ->
    // cookie kaydını sil ->
    // veri tabanındaki dataUpdateChecker değerlerini false yap ve değerlerini güncelle.   

    // api ile veri tabanından güncelleme raporunu alıyoruz...
    getAPI("/other/dataUpdateChecker").then(async (res) => {
      
      if(res.status === "success" && res.data[0]){

        // gelen json değeri parse ederek objeye çevirdik ve veriyi içinden aldık.
        const data = JSON.parse(res.data[0].Configdata);
        
        // değişen verileri burada yakalarız.
        const checkedStatus = findNewData(data);
        
        let removeDataValue = [];

        checkedStatus.map((item) => {
          if(item.isNewData === true){
            removeDataValue.push(item.name);
          }
        })
     
        const process = {
          // silinecek veriler burada
          data: DataConfig,
          removeValue: removeDataValue
        }

        if(removeDataValue.length >= 1 && removeDataValue != null && removeDataValue != undefined){

          // Veri tabanındaki, Cookie ve Local Storage içindeki verileri güncelleme işlemi için POST isteği atıyoruz.
          postAPI("/other/dataUpdateChecker", process).then((res) => {
            if(res.status === "success"){
              // veri tabanındaki verileri güncelledikten sonra cookie ve local storage içindeki verileri sileriz.
              removeDataValue.map((item) => {
                deleteCookie(item);                
                localStorage.removeItem(item);
              })
            }          
          })
        }
          
      }

      // eğer veri yoksa burası çalışır...
      else{
        //eğer veri tabanından veri çekilemez veya hata oluşur ise eski veriyi silip yeniden sıfır veri ile başlatıyoruz.
        // apiye yeniden ekleme işlemi için POST isteği atıyoruz.
        
        const process = {
          data: DataConfig,
          process: "createData"
        }
        
        // verileri veri tabanına göndermek üzere apiye istek atar.
        postAPI("/other/dataUpdateChecker", process).then((res) => {
          if(res.status === "success"){

            // veri tabanındaki verileri güncelledikten sonra cookie ve local storage içindeki verileri sileriz.
            const removeData = JSON.parse(process.data)[0].name;

            deleteCookie(removeData);                
            localStorage.removeItem(removeData);
          }
        })
      }
    })  
  } catch (error) {
        return error;
  }
}

export default DataUpdateChecker
