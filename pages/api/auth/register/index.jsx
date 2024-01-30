import  createNewUser  from "@/functions/auth/register/index";
import EncryptPassword from "@/functions/auth/encryptPassword";
import { getServerSession } from "next-auth/next";
import  authOptions  from "@/pages/api/auth/[...nextauth]";
import { transporter, mailOptions } from "@/pages/api/mail/nodemailer";
import getTurkeyTime from "@/functions/other/timeNow";
import mailStringCheck from "@/functions/other/mailStringCheck";
import { NextApiRequest, NextApiResponse } from 'next';




const handler = async (req, res) =>  {

    if(!req){
        return res.status(500).json({status: "error", message: "Bir hata oluştu!"});
    }

    //getServerSession:  Kullanıcının oturum açıp açmadığını kontrol eder. Eğer açılmışsa session değişkenine atar.
    const session = await getServerSession(req, res, authOptions)
    if(!session){

    const date = (await getTurkeyTime()).date;
    const time = (await getTurkeyTime()).time;
        
        if(req.method === 'POST' && req.body){
                        
            try {
                const data = req.body;

                // istek yapılan sayfa içerisinden rol bilgisini alır ve atamasını yaparız.
                if(req.headers.referer){                
                    if(req.headers.referer.includes("teacher")){
                        data.role = "teacher";
                    }
                    else{
                        data.role = "student";
                    }
                }
                
                // Eğer kullanıcı gerekli alanları doldurmadan kayıt olmaya çalışırsa hata fırlatır.
                if(
                    !mailStringCheck(data.email) 
                    || (data.role != "student" && data.role != "teacher") 
                    || data.role == ""      || data.role == undefined       || data.role == null
                    || data.name == ""      || data.name == undefined       || data.name == null
                    || data.surname == ""   || data.surname == undefined    || data.surname == null
                    || data.email == ""     || data.email == undefined      || data.email == null
                    || data.password == ""  || data.password == undefined   || data.password == null
                    || data.phone == ""     || data.phone == undefined      || data.phone == null
                    || data.city == ""      || data.city == undefined       || data.city == null
                    || data.town == ""      || data.town == undefined       || data.town == null                    
                ){
                    throw new Error("Lütfen tüm alanları doğru bir şekilde doldurunuz!");
                }

                data.password = await EncryptPassword(data.password);
                
                if(!data.password || data.password.error){
                    throw new Error("pass: Kayıt sırasında bir hata oluştu.");
                }
                
                if(!process.env.MAIL_SECRET){
                    throw new Error("Kayıt sırasında bir hata oluştu...");
                }
                
                const mailKey = await EncryptPassword(process.env.MAIL_SECRET); 
                
                if(!mailKey || typeof mailKey === "object" && mailKey.error){
                    throw new Error("key: Kayıt sırasında bir hata oluştu.");
                }

                const hashedEmail = await EncryptPassword(data.email);
                
                if(!hashedEmail || typeof hashedEmail === "object" && hashedEmail.error){
                    throw new Error("hash: Kayıt sırasında bir hata oluştu.");
                }
                
                if(typeof mailKey == "string"){
                    
                    const createUser = await createNewUser(data, mailKey);
                    if('error' in createUser){
                      throw new Error(createUser.error);
                    }
                    
                }

                
                //mail gönderme işlemi
                transporter.sendMail({
                    ...mailOptions,
                    subject: `${process.env.NEXT_PUBLIC_COMPANY_NAME} Kayıt işlemi`,
                    text: `${process.env.NEXT_PUBLIC_COMPANY_NAME} Kayıt işlemi`,
                    to: data.email,
                    createTime: {date, time},
                    html:`
                    <p>Sevgili</p>
                    <h3 style='color:green'>${data.name} ${data.surname}</h3>
                    <p>${data.email} mail adresinin Kayıt işlemi ${date} tarihinde, ${time} saatinde başarıyla yapıldı!</p>
                    <p>Kayıt edilen telefon: ${data.phone}</p>
                    <a style="cursor:pointer!important" href = ${process.env.NEXT_PUBLIC_URL}/auth/verifyEmail?key=${mailKey}&time=${Date.now()}&email=${hashedEmail}&role=${data.role}>
                        <button style="
                        cursor: pointer!important;
                        background: #3d7bf1;
                        color: white;
                        padding: 15px;
                        border-radius: 10px;
                        border: white;
                        font-weight: 500;
                    ">
                            Hesabınızı Onaylamak İçin Tıklayın.
                        </button>
                    </a>
                    `
                })
                
                return res.status(200).json({status: "success",role: data.role,  message: "Kayıt işlemi başarılı. Lütfen Mail adresinize gönderilen linke tıklayarak hesabınızı onaylayınız."});
            } catch (error) {
                return res.status(500).json({status: "error", message: error.message}); 
           }                   
        }
        else{
            return res.status(405).json({status: "error", message: "Bu sayfaya bu şekilde erişim sağlanamaz!"});
        } 
    }
    else{
        return res.status(401).json({status: "error", message: "Oturum açılmış kullanıcılar kayıt olamaz!"});
    }
};

export default handler;
