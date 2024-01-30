import { updateDataByAny, getDataByUnique, deleteDataByMany } from "@/services/serviceOperations";
import EncryptPassword from "@/functions/auth/encryptPassword";
import { getServerSession } from "next-auth/next";
import authOptions from "@/pages/api/auth/[...nextauth]";
import mailStringCheck from "@/functions/other/mailStringCheck";
import { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req, res) => {
   
   
    //getServerSession:  Kullanıcının oturum açıp açmadığını kontrol eder. Eğer açılmışsa session değişkenine atar.
    const session = await getServerSession(req, res, authOptions)
        
    if(!session){
        if(req.method === 'POST'){

            const body = req.body;
            const email = body.email.email;
            const password = body.password;
            const passwordConfirm = body.passwordConfirm;
               
            try {
                if(!mailStringCheck(email) || !email){
                    throw new Error("Geçersiz mail adresi!");
                }
                if(
                    password == null || password == "" ||  password == undefined ||
                    passwordConfirm == null || passwordConfirm == "" ||  passwordConfirm == undefined ||
                    password != passwordConfirm || !passwordConfirm || !password
                ){ 
                    throw new Error("Şifreler uyuşmuyor!");
                }
                const hashedNewPassword = await EncryptPassword(password);
                if(!hashedNewPassword || typeof hashedNewPassword === "object" && hashedNewPassword.error){
                    throw new Error("Şifre oluşturulamadı!");
                }
                const allUserFromDB = await getDataByUnique("AllUser", {email: email});
                if(!allUserFromDB || allUserFromDB.error || allUserFromDB == null){
                    throw new Error("Kullanıcı bulunamadı!");
                }
                const role = await allUserFromDB.role;
                const userFromDB = await updateDataByAny(role, {email: email}, { verified: true, password: hashedNewPassword});
                if(!userFromDB || userFromDB.error || userFromDB == null){
                    throw new Error("Kullanıcı güncellenemedi!");
                }

                // Şifre sıfırlama işlemi başarılı ise ForgotPassword ve VerifyEmail tablolarından ilgili kayıtları siler.
                await deleteDataByMany("ForgotPassword", {email: email});
                await deleteDataByMany("VerifyEmail", {email: email});
             
                return res.status(200).json({status: "success",role: allUserFromDB.role, message: "Şifre başarıyla değiştirildi!"});

                // Eğer kullanıcı gerekli alanları doldurmadan kayıt olmaya çalışırsa hata fırlatır.

            } catch (error) {
                return res.status(500).json({status: "error", error: error.message});       
            }      

        }
        else{
            return res.status(500).json({status: "error", error: "Şifre sıfırlama işleminde bir hata oluştu!"});
        }
    }
    else{
        return res.status(500).json({status: "error", error: "Şifre sıfırlama işleminde bir hata oluştu!"});
    }
}

export default handler;