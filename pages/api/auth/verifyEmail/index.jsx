import VerifyEmail from  "@/functions/auth/verifyEmail";
import { getServerSession } from "next-auth/next";
import  authOptions  from "@/pages/api/auth/[...nextauth]";
import { NextApiRequest, NextApiResponse } from 'next';



const handler = async (req, res) =>{
        const {key, email, role} = req.body;
        
    if(req.method !== "POST"){
        return res.status(405).json({status: "error", error: "Method Not Allowed", message: "Method Not Allowed"});
    }
    else{
        const session = await getServerSession(req, res, authOptions)
        
        if(!session){   
            try {                
                if(!email) {

                    throw new Error("Lütfen Email Adresinizin Doğru Olduğundan Emin Olun.");
                }

                if(!key || !role) {
                    throw new Error("Mail Doğrulama Sırasında Bir Hata Oluştu. Lütfen Tekrar Deneyin.");
                }

                // Mailden gönderilen parametreleri fonksiyona gönderip kontrol ederiz.
                // Eğer kontrol edilen parametreler doğruysa kullanıcının email adresini onaylarız.
                const {error, status, message} = await VerifyEmail({key, email, role});
                if(error && status != "success"){
                    throw new Error(error);
                }

                if(status == "success"){ 
                    return res.status(200).json({status: "success",  message: message});
                }
                
            }
            catch (error) {
        
                return res.status(401).json({status: "error", error: error?.message, message: error?.message});
            }
        }
        
        else{
            return res.status(401).json({status: "error", error: "Zaten Giriş Yapmışsınız.", message: "Zaten Giriş Yapmışsınız."});
        }
    }
}

export default handler;

