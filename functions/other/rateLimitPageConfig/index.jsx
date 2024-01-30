import RateLimit from '@/functions/other/rateLimit';



const pageConfig = {
    login: {
        maxRequest: 3,
        timeLimit: "15 s",  
        errorMessage: "Kısa zamanda çok fazla istek attınız.",
        backUrl: "/",
        targetUrl: process.env.NEXT_PUBLIC_URL + "/auth/login/student",
        targetButtonName: "Giriş Yap",
        backButtonName: "Ana Sayfa",
        label: "Lütfen Dikkat!",

    },

    register: {
        maxRequest: 3,
        timeLimit: "45 s",   
        errorMessage: "Kısa zamanda çok fazla istek attınız.",
        backUrl: "/",
        targetUrl: process.env.NEXT_PUBLIC_URL + "/auth/register/student",
        targetButtonName: "Kayıt Ol",
        backButtonName: "Ana Sayfa",
        label: "Lütfen Dikkat!",
    },

    sendVerifyEmail: {
        maxRequest: 3,
        timeLimit: "15 s",   
        errorMessage: "Kısa zamanda çok fazla istek attınız.",
        backUrl: "/",
        targetUrl: process.env.NEXT_PUBLIC_URL + "/auth/sendVerifyEmail",
        targetButtonName: "Mail Doğrula",
        backButtonName: "Ana Sayfa",
        label: "Lütfen Dikkat!",
    },

    verifyEmail: {
        maxRequest: 3,
        timeLimit: "15 s",   
        errorMessage: "Kısa zamanda çok fazla istek attınız.",
        backUrl: "/",
        targetUrl: process.env.NEXT_PUBLIC_URL + "/auth/verifyEmail",
        targetButtonName: "Mail Doğrula",
        backButtonName: "Ana Sayfa",
        label: "Lütfen Dikkat!",
    },
    
    forgotPassword: {
        maxRequest: 3,
        timeLimit: "15 s",   
        errorMessage: "Kısa zamanda çok fazla istek attınız.",
        backUrl: "/",
        targetUrl: process.env.NEXT_PUBLIC_URL + "/auth/forgotPassword",
        targetButtonName: "Şifremi Unuttum",
        backButtonName: "Ana Sayfa",
        label: "Lütfen Dikkat!",
    },

    // admin paneli için istekleri kontrol eder.
    // generalTopPageBanner: {
    //     maxRequest: 3,
    //     timeLimit: "15 s",   
    //     errorMessage: "Kısa zamanda çok fazla istek attınız.",
    //     backUrl: "/",
    //     targetUrl: process.env.NEXT_PUBLIC_URL + "/dashboard/admin",
    //     targetButtonName: "Genel Duyuru İşlemleri",
    //     backButtonName: "Ana Sayfa",
    //     label: "Lütfen Dikkat!",
    // }
};




const rateLimitPageConfig = async (req, pathname)=>{
    try {
        // kullanıcının gittiği sayfanın path bilgisini alırız.
        const path = pathname;

        // path adresinin içerisinden yukarıda tanımladığımız "pageConfig" nesnesindeki sayfaların başlangıç kısmını aratırız.
        const currentPage = Object.keys(pageConfig).find(page => path.includes(page));
        if (currentPage) {
            // sayfa başlangıç kısmı ile eşleşen sayfa var ise rate limit kontrolü yapılır.
            const {maxRequest, timeLimit, errorMessage, backUrl, targetUrl, targetButtonName, backButtonName, label} = pageConfig[currentPage];
            
            const {error, success, reset} = await RateLimit(req, maxRequest, timeLimit);

            if (error) {
                throw new Error(error);
            }

            if (!success) {
                let error =  new Error();
                error.message = errorMessage;
                error.reset = reset;
                error.targetUrl = targetUrl;
                error.backUrl = backUrl;                
                error.targetButtonName = targetButtonName;
                error.backButtonName = backButtonName;
                error.label = label;
                throw error;
            }
            else {
                return {success: true};
            }

        }
        else {
            return {success: true};
        } 

    } catch (error) {
        return {
            error: error.message, // string
            success: false, // boolean
            reset: error.reset,  // number
            backUrl: error.backUrl,  // string
            targetUrl: error.targetUrl,  // string
            targetButtonName: error.targetButtonName, // string 
            backButtonName: error.backButtonName, // string
            label: error.label, // string
        };
    }
}

export default rateLimitPageConfig;
