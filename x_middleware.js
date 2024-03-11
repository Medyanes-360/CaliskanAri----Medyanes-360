import { NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt';
import RateLimitPageConfig from '@/functions/other/rateLimitPageConfig';
import DatabaseWhenUpdate from  '@/functions/other/regularCheckSystemData/databaseWhenUpdate';


// kullanıcıların gidebileceği sayfaların başlangıç kısmını belirleriz.
const roles = {
  student: '/student',
  teacher: '/teacher',
  admin: '/admin',
};


export default async function middleware(req) {

  // Tüm istekleri burada yakalarız.
  const { pathname } = new URL(req.url) || new URL(req.nextUrl);

    //########################################################################################################
    // Sistemin kendi API isteklerini görmezden gelir.########################################################
    if (
      pathname.startsWith("/_next") ||
      pathname.startsWith("/api/auth/session") ||
      pathname.startsWith("/api/auth/signin") ||
      pathname.startsWith("/api/auth/signout") ||
      pathname.startsWith("/api/auth/providers") ||
      pathname.startsWith("/api/auth/callback") ||
      pathname.startsWith("/api/auth/csrf") ||
      pathname.startsWith("/api/auth/error") ||
      pathname.startsWith("/api/auth/_log") ||
      pathname.startsWith("/api/auth/_")
    ) {
      // Bu bir dosya isteği, atla.
      return NextResponse.next();
    }

    //########################################################################################################
    // sistem API istekleri haricinde...######################################################################
    // /api/auth ile başlayan tüm gelen isteklerin hepsini kontrol eder. #####################################
    else if (pathname.startsWith("/api/") && !pathname.startsWith("/api/mail")) {
      
      // rate limit kontrolü burada başlar.
      if(!req.method === "GET"){ // İSTEK TİPİNE GÖRE "GET" gewlirse rate limiti çalıştırmıyoruz!
        
        const { success, error, reset, backUrl, targetUrl, targetButtonName, backButtonName, label } = await RateLimitPageConfig(req, pathname);
      

        if (!success || error && false) {

          // kullanıcı limiti aştı ise kullanıcıyı başka bir sayfaya yönlendirir.
          return NextResponse.redirect(new URL(
            `/notification?type=error&message=${error}&label=${label}&remainingTime=${reset}&targetButtonName=${targetButtonName}&backButtonName=${backButtonName}&targetUrl=${targetUrl}&backUrl=${backUrl}`,req.url));
        }
      }  
    }
    //########################################################################################################
    // kullanıcının gittiği sayfaları (oturum açılmış) ve (oturum kapalı) durumuna göre kontrol eder. ########
    else {

      // kullanıcının oturum bilgilerini alır.
      const session =  await getToken({ req, secret: process.env.NEXTAUTH_SECRET});

      //########################################################################################################
      // kullanıcı oturum açmış ise. aşağıdaki sayfalara gitmesine izin VERMEZ! ################################
      if (session) {
        if (
          (!pathname.startsWith(roles[session.role]) &&
          !pathname.startsWith(`/dashboard${(roles[session.role])}`)) ||
          pathname.startsWith("/auth/login") ||
          pathname.startsWith("/auth/register") ||
          pathname.startsWith("/auth/sendVerifyEmail") ||
          pathname.startsWith("/auth/forgotPassword") ||
          pathname.startsWith("/auth/resetPassword") ||
          pathname.startsWith("/auth/verifyEmail")
        ) {
           return NextResponse.rewrite(new URL("/", req.url));
        }
        else{
          
          return NextResponse.next();
        }
      }

      //########################################################################################################
      // kullanıcı oturum açmamış ise. aşağıdakileri kontrol eder ##############################################
      if (
        !session && 
        (
        !pathname.startsWith("/auth/") ||
        !pathname.startsWith("/api/")) &&
        !pathname.startsWith("/auth/login") &&
        !pathname.startsWith("/notification") &&
        !pathname.startsWith("/auth/register") &&
        !pathname.startsWith("/auth/verifyEmail") &&
        !pathname.startsWith("/auth/forgotPassword") &&
        !pathname.startsWith("/auth/sendVerifyEmail") &&
        !pathname.startsWith("/auth/resetPassword") &&
        pathname.startsWith("/dashboard")
        
      ) {        
        return NextResponse.rewrite(new URL("/", req.url));
      }
      else{
        
        return NextResponse.next();
      }
    }

    // dataUpdateConfig verilerinde güncelleştirme durumu olduğunda çalışır ve güncellenen veriyi veri tabanına kaydeder.
    if(req.method === "POST"){

      await DatabaseWhenUpdate(pathname, req);
     
    }
  }

export const config = {
  // kontrol işleminin hangi sayfalarda olacağını belirleriz.
  // aşağıda örnek olarak belirtilen sayfanın ve ona bağlı tüm alt sayfaların kontrolü yapılıyor.
  // buraya sayfayı yazmazsanız -> hiçbir zaman kontrol edilmeyecektir.
  matcher: [
    '/',
    '/admin/:path*',
    '/student/:path*',
    '/teacher/:path*',
    '/auth/:path*',
    '/api/:path*',
    '/dashboard/:path*',


    // aşağıdaki isteklerden birisi geliyorsa o zaman çalışma dedik!.   NOT: YİNEDE GİDİYOR AMA DURMASINDA FAYDA VAR!
    //'/((?!api/auth/session|_next|api/auth/signin|api/auth/signout|api/auth/providers|api/auth/callback|api/auth/csrf|api/auth/error|api/auth/_log|api/auth/_|favicon.ico).*)',
  ],
};