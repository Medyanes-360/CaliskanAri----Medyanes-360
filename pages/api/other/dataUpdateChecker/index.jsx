import { NextResponse } from 'next/server';
import { NextApiRequest, NextApiResponse } from 'next';
import {getAllData, createNewData, deleteDataAll} from "@/services/serviceOperations";


const handler = async (req, res) => {

    try {
        //  ( components / other / generalTopPageBanner.tsx )'den gelen istekler burada karşılanacak.
    if(req.method === 'GET'){
        
        try {
            const data = await getAllData("dataUpdateChecker");
            if (!data || data.error || data === undefined || data.length === 0) {
                return res.status(500).json({ status: "error", error: data.error, data: null });
            }
            return res.status(200).json({ status: "success", data: data });
        } catch (error) {
            return res.status(500).json({ status: "error", error: error, data: null });
        }       
      
    }

    // ##########################################################################
    // ##########################################################################

    if(req.method === 'POST'){
        
        try {
            const responseCookies = NextResponse.next();

            if(!req.body){
                throw new Error("error778");
            }

            // veri tabanındaki tüm verileri sil.
            const deleteDataFromDb = await deleteDataAll("dataUpdateChecker");
            if(!deleteDataFromDb || deleteDataFromDb.error || deleteDataFromDb === undefined){
                return res.status(500).json({status: "error", error: deleteDataFromDb.error, data: null});
            }            

            // veri tabanına yeni veri ekliyoruz.
            const data = await createNewData("dataUpdateChecker", {Configdata: req.body.data});
            if(!data || data.error || data === undefined){
                return res.status(500).json({status: "error", error: data.error, data: null});
            }  

            return res.status(200).json({status: "success", data: data});
        } catch (error) {
            return res.status(500).json({status: "error", error: error, data: null});         
        } 
            
    }
    } catch (error) {
        return res.status(500).json({status: "error", error: error, data: null});
    }

}

export default handler;