import loginFunction from "@/functions/auth/login/index";
import mailStringCheck from "@/functions/other/mailStringCheck";
import { NextApiRequest, NextApiResponse } from 'next';


const handler = async (req, res) => {
    if(!req){
         return res.status(500).json({error: "İstek bulunamadı."});
    }
    if(req.method === 'POST'){
        try {
            const data = req.body;

            if(!data.email || !data.password || !data || !mailStringCheck(data.email)){
                throw new Error("Girdiğiniz bilgilerde hata var. Lütfen kontrol ediniz.");
            }
            
            // kullanıcı verilerini sorgula / şifreleri karşılaştır.
            const {userFromDB, error, verifyEmail, status} = await loginFunction(data);

            if(error || !userFromDB){
                let error2 = new Error();
                error2.message = error.message;
                error2.status = status;
                error2.verify = verifyEmail;
                throw error2;
            }
        
            return res.status(200).json({success: true,verifyEmail: userFromDB.verified , userFromDB: userFromDB, message: "Giriş işlemi başarılı"});

        } catch (error) {   
            return res.status(500).json({status: error.status, error: error.message, verifyEmail: error.verify}); 
       }                   
    } 
    else{
        return res.status(500).json({error: "Giriş metodunda hata oluştu."});            
    }     

};

export default handler;
