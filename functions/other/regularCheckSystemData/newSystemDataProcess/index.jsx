import { getAPI } from '@/services/fetchAPI';
import { setCookie, getCookie } from 'cookies-next';
import CookieTimeUpdate from '@/functions/other/regularCheckSystemData/cookieTimeUpdate';
// veri tabanından veri çekme fonksiyonu
const getData = async (apiUrl) => {
    try {
      const res = await getAPI(apiUrl);
  
      if (!res) {
        throw new Error("error780");
      }
  
      const data = res.data[0];
  
      if (!data || data.error || data === undefined || data.length === 0) {
        throw new Error("error781");
      }
  
      return {
        error: null,
        data: data,
        status: "success",
        storageType: "database",
      };
    } catch (error) {
      return {
        error: error,
        data: null,
        status: "error",
        storageType: "database",
      };
    }
  };
  

// Bu fonksiyon sadece " GET " isteği yapan componentlerde kullanılacak.
// Bu fonksiyon ile veri tabanından, cookie'den veya localstorage'dan veri çekme işlemleri yapılır.
// İlk olarak cookie veya localstorage'dan veri çekmeyi dener. Eğer veri çekilemezse veri tabanından çekmeye çalışır.
// Eğer veri tabanından da veri çekilemezse hata döndürür.
// Eğer veri tabanından veri çekilebilirse, cookie veya localstorage içine veri kaydı yapılır çünkü: bir sonraki istekte yeniden çekmesin diye.
const NewSystemDataProcess = async (
    componentName, // veri alışverişini yapan componentin adı (veritabanı ile aynı isimle olması önemli)
    storageType  = "database",
    sendStorageLocation = "localStorage",
    apiUrl = + "/" + "other" + "/" + componentName // veri tabanı api adresi
    ) => {
  
    try {

        // cooki'ye zaman fırlatan fonksiyon (sürekli) // 30 dakikada bir çalışır.
        // updateLoop dakika cinsinden değer alır ve o dakika aralığı ile cookie zamanını günceller.
        const updateLoop = 5;
        await CookieTimeUpdate(updateLoop);

//1.0 #### GEREKLİ KONTROLLER ####################################################################################
        if(!componentName ||  componentName == undefined){

            throw new Error("error782");  
        }

//2.1 #### VERİTABANI KONTROLÜ VE İŞLEMLERİ ######################################################################
        if(storageType == "database" && componentName){


            const {data, error, status} = await getData(`${apiUrl}`);

            if(!data || error || status === "error"){
                throw new Error("error783");
            }

            // veri tabanından çekilen verileri cookie veya localstorage'a kaydediyoruz.
            if(sendStorageLocation == "localStorage"){
                localStorage.removeItem(componentName);
                localStorage.setItem(componentName, JSON.stringify(data));          
            }


            // veri tabanından çekilen verileri cookie veya localstorage'a kaydediyoruz.
            if(sendStorageLocation == "cookie"){
                setCookie(componentName, JSON.stringify(data));
            }                 

            // veri tabanından gelen veriyi kullanıcıya döndürürüz.
            return {error: null, data: data, status: "success", storageType: storageType};
            
        }
        
//2.2 #### COOKIE KONTROLÜ VE İŞLEMLERİ ##########################################################################
        else if(storageType == "cookie" && componentName){

            // cookie'den veri çekme işlemi
            let checkCookie = getCookie(componentName)



            if(!checkCookie || checkCookie == undefined || checkCookie == null || typeof(checkCookie) != "string"){

                // veri tabanından veri çeker (Cookie yoksa!)
                const {data, error, status} = await getData(`${apiUrl}`);
      
                if(!data || error || status === "error"){                
                
                    
                    throw new Error("error785");
                }
               
                if(sendStorageLocation == "cookie"){
                   
                    setCookie(componentName, JSON.stringify(data));
                }
                
                else if(sendStorageLocation == "localStorage"){
                    
                    localStorage.removeItem(componentName);
                    localStorage.setItem(componentName, JSON.stringify(data));
                    
                }
                else{
                    
                    throw new Error("error786");
                }
                
                return {error: null, data: data, status: "success", storageType: "database"};

            }
            
            // veri cookie'den gelmişse kullanıcıya döndürürüz.
            return {error: null, data: JSON.parse(checkCookie), status: "success", storageType: storageType};
        }
        
//2.3 #### LOCALSTORAGE KONTROLÜ VE İŞLEMLERİ ####################################################################
        else if(storageType == "localStorage" && localStorage && componentName){

            // localstorage'dan veri çekme işlemi
            const checkLocalStor = localStorage.getItem(componentName);

            if(!checkLocalStor || checkLocalStor == undefined || checkLocalStor == null){
                
                
                // veri tabanından veri çeker (LocalStor yoksa!)
                const {data, error, status} = await getData(`${apiUrl}`);
   
              
                if(!data || error || status === "error"){
                   
                    
                    throw new Error("error787");
                }
               
                if(sendStorageLocation == "cookie"){
                    

                    setCookie(componentName, JSON.stringify(data));

                }
                else if(sendStorageLocation == "localStorage"){
                  
                    
                    localStorage.removeItem(componentName);
                    localStorage.setItem(componentName, JSON.stringify(data));
                }
                else{
                  
                    throw new Error("error788");
                }
               
                return {error: null, data: data, status: "success", storageType: "database"};
            }
          
            // veri Localstorage'dan gelmişse kullanıcıya döndürürüz.
            return {error: null, data: JSON.parse(checkLocalStor), status: "success", storageType: storageType};
        }
        
//3.0 #### HATA KONTROLÜ ########################################################################################

        else{
         
            throw new Error("error789");
        }

    } catch (error) {
        return {error: error, data: null, status: "error", storageType: "no Type"};
    }

}

export default NewSystemDataProcess;
