import { transporter, mailOptions } from "@/pages/api/mail/nodemailer";

const handler = async (req, res) => {

    const session = await getServerSession(req, res, authOptions)
    if (!session) {
        const date = (await getTurkeyTime()).date;
        const time = (await getTurkeyTime()).time;

        //getServerSession:  Kullanıcının oturum açıp açmadığını kontrol eder. Eğer açılmışsa session değişkenine atar.

        if (req.method === 'POST') {
            try {
                const { email, message } = req.body;

                if (!email || !mailStringCheck(email) || email == "" || email == null || email == undefined) {
                    throw new Error("Lütfen girdiğiniz email adresini kontrol ediniz.");
                }

                if (!process.env.MAIL_SECRET) {
                    throw new Error("Şifre sıfırlama işlemi sırasında bir hata oluştu!");
                }

                //mail gönderme işlemi
                transporter.sendMail({
                    ...mailOptions,
                    subject: `TEST`,
                    text: message,
                    to: email,
                    createTime: { date, time },
                })

                return res.status(200).json({ status: "success", message: "Şifre sıfırlama bağlantısı mail adresinize gönderildi." });
            } catch (error) {
                return res.status(500).json({ status: "error", message: error.message });
            }
        }
        else {
            return res.status(405).json({ status: "error", message: "hatalı bir istek gerçekleştirdiniz." });
        }

    }
    else {
        return res.status(401).json({ status: "error", message: "Oturum açılmış kullanıcılar şifre sıfırlama işlemi yapamaz." });
    }
};

export default handler;