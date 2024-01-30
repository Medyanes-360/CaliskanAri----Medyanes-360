import { NextApiRequest, NextApiResponse } from 'next';
import {createNewData, getAllData, deleteDataAll} from "@/services/serviceOperations";



const handler = async (req, res) => {
    if(req.method === 'POST'){
        
        try {
            if(!req.body){
                throw new Error("error778");
            }

           // veriyi veri tabanından çekeriz.
            const data = await getAllData("dataUpdateChecker");
            if(!data || data.error || data === undefined || data.length === 0){
                return res.status(500).json({status: "error", error: data.error, data: null});
            }

            //dataFromDB içindeki ConfigData içindeki verileri al ve req body içindeki veriler ile karşılaştır.
            // name değerleri eşleşenlerin isNewData değerini true yap.

            // veri tabanından gelen veri
            const dataFromDB = JSON.parse(data[0].Configdata);

            // req body içindeki değişen veri
            const reqBodyData = req.body;

            //
            for (let i = 0; i < dataFromDB.length; i++) {
                if (reqBodyData.includes(dataFromDB[i].name) && !dataFromDB[i].isNewData) {
                  dataFromDB[i].isNewData = true;
                }
            }
              
            
            const readyForSendDB = {
                Configdata: JSON.stringify(dataFromDB)
            }

            // veri tabanındaki tüm veriyi sil.
            const deleteDataFromDb = await deleteDataAll("dataUpdateChecker");

            if(!deleteDataFromDb || deleteDataFromDb.error || deleteDataFromDb === undefined){
                return res.status(500).json({status: "error", error: deleteDataFromDb.error, data: null});
            }

            // veri tabanına yeni veri ekliyoruz.
            const createNewDataToDb = await createNewData("dataUpdateChecker", readyForSendDB);

            if(!createNewDataToDb || createNewDataToDb.error || createNewDataToDb === undefined){
                return res.status(500).json({status: "error", error: createNewDataToDb.error, data: null});
            }           


           // güncellenen kısmı değiştiririz
           // son güncel veriyi veri tabanına tekrar göndeririz.   

            return res.status(200).json({status: "success", data: data});
        } catch (error) {
            return res.status(500).json({status: "error", error: error, data: null});         
        }      
    }
}

export default handler;