import { NextApiRequest, NextApiResponse } from 'next';
import authOptions from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
import { createNewData, deleteDataAll} from "@/services/serviceOperations";


const handler = async (req, res) => {

    const session = await getServerSession(req, res, authOptions)
    
    if(!session){
        return res.status(500).json({status: "error", error: "Oturum açmanız gerekiyor!"});
    }

    
    // Admin panelinden gelen istekler burada karşılanacak
    else if(req.method === 'POST' && session){
        try {

            const body =await req.body;
            if(!body){
                throw new Error("Bir hata oluştu!");
            }

            if(body.role !== "admin"){
                throw new Error("Yetkiniz yok!");
            }

            if(!body.role && body.isActive==null && !body.mainTextColor && !body.underTextColor && !body.buttonColor && !body.backgroundColor){
                throw new Error("Esik veriden dolayı bir hata oluştu!");
            }

            const deleteDataFromDb = await deleteDataAll("GeneralTopPageBanner");
            if(!deleteDataFromDb || deleteDataFromDb.error){
                throw new Error(deleteDataFromDb.error);
            }

            delete body.role;

            const data = await createNewData ("GeneralTopPageBanner", body);

            if(!data || data.error){
                throw new Error(data.error);
            }
            return res.status(200).json({status: "success", message: "api isteği başarılı"});

        } catch (error) {
            return res.status(500).json({status: "error", error: error.message}); 
        }
    }

    else{
        return res.status(500).json({status: "error", error: "Bir hata oluştu!"});
    }

}

export default handler;