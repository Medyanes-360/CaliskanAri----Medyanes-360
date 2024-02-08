/*
NAVBAR COMPONENTİNİ ÇAĞIRDIĞIMIZ YERDE LİNK YAPISINI AŞAĞIDAKİ FORMATTA İÇİNE GÖNDERMEMİZ GEREKİYOR.
const links = [
    { url: '/', text: 'Ana Sayfa' },
    {
      url: '/createProduct/createProduct',
      text: 'Ürün ve Koleksiyon',
      submenu: [
        { url: '/createProduct/measurements', text: 'Ölçü Oluştur' },
        { url: '/createProduct/fabrics', text: 'Kartela Oluştur' },
        { url: '/createProduct/metals', text: 'Metal Oluştur' },
        { url: '/createProduct/colors', text: 'Renk Oluştur' },
      ],
    },
*/
// components/Navbar.js


"use client"
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { MdOutlineKeyboardArrowDown, MdOutlineMenu, MdOutlineClose} from "react-icons/md";
import LoadingScreen from '@/components/other/loading';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { signIn, signOut, useSession } from 'next-auth/react'




const Navbar = ({ links }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openSubMenuIndex, setOpenSubMenuIndex] = useState(null);
  const [isloading, setIsloading] = useState(true);
  const [userRole, setUserRole] = useState("");

  const checkLinkRoles = (accessRoles, bannedRoles, userRole) => {

    //checkLinkRoles(link.accessRoles, link.bannedRoles, userRole)
    // accessRoles[] -> linklerin erişim rollerini tutar. Birden fazla erişime izin verilen rol olabilir.
    // bannedRoles[] -> linklerin yasaklanan rollerini tutar. Birden fazla yasaklanan rol olabilir.
    // userRole -> kullanıcının rolünü tutar. boş ise kullanıcı giriş yapmamış demektir.
    if((accessRoles === undefined || accessRoles === "") && (bannedRoles === undefined || bannedRoles === "")){
      return true;
    }

    // Kural 1: bannedRoles dizisinde herhangi bir değer var mı kontrol et. Eğer varsa:
    else if (userRole && bannedRoles && bannedRoles.length > 0 && bannedRoles.includes(userRole)) {
      return false;
    }

    // Kural 2: Eğer accessRoles dizisi doluysa ve userRole değeri accessRoles içinde bir değere eşleşmiyorsa, false döndür.
    else if (userRole && accessRoles && accessRoles.length > 0 && !accessRoles.includes(userRole)) {

      return false;
    }

    // Kural 3: Engellenenler listesinde yoksa veya engeliler tanımı yoksa.
    else if(!bannedRoles || !bannedRoles.includes(userRole) || bannedRoles.length === 0){
      // erişime izin verilenler tanımı yoksa
      if(!accessRoles){
        return true;
      }

      // erişim kısıtlılığı varsa
      if(accessRoles || accessRoles.length > 0){

        // ve erişime izin verilenler içinde kullanıcının rolü varsa
        if(userRole && accessRoles.includes(userRole)){
          return true;
        
        }
        else{
          return false;
        }
      }
      return false;
    }

    else{
      return false;
    }
  };

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const {data}= useSession();


  // data -> içi boş ise kullanıcı giriş yapmamış demektir.
  // data -> içi dolu ise kullanıcı giriş yapmış demektir.
  // data.user -> kullanıcı bilgilerini içerir.

  const fetchUserData = async () => {
    if (data && data.user && data.user.role) {
      setUserRole(data.user.role);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [data]);
  

  useEffect(() => {
    setIsloading(false);
    setOpenSubMenuIndex(null);

 }, [pathname, searchParams])

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
    setOpenSubMenuIndex(null); // Ana menüyü açarken alt menüleri kapat
  };

  const handleSubMenuToggle = (index) => {
    // Alt menüyü açarken diğer alt menüleri kapat
    setOpenSubMenuIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  // Ana menüyü açık tutmak için
  const handleMenuMouseEnter = () => {
    setIsMenuOpen(true);
  };

  // Ana menüyü kapalı tutmak için
  const handleMenuMouseLeave = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      {isloading && <LoadingScreen isloading={isloading} />}
      
      <nav className="bg-gray-800 p-2 relative z-50">
        
        <div className="w-full mx-auto">
          <div
            className="flex flex-col md:flex-row md:justify-around justify-between items-center"
            onMouseEnter={handleMenuMouseEnter}
            onMouseLeave={handleMenuMouseLeave}
          >
            <div className="w-full md:w-auto flex flex-row md:justify-around justify-between items-center">
              <Link href="/"><div className="text-white font-bold text-xl hover:scale-110 transition-all hover:cursor-pointer">
              <Image
                src="/logo.png"
                width={80}
                height={80}
                alt="Picture of the author"
              />
                </div></Link>
              <div className="md:hidden">
                <button
                  onClick={()=>{handleMenuToggle; setIsloading(true)}}
                  className="text-white focus:outline-none px-3 py-2"
                >
                  {isMenuOpen ? <MdOutlineClose size={30}/> : <MdOutlineMenu size={30}/> }
                </button>
              </div>
            </div>

            <div className={`${isMenuOpen ? 'block' : 'hidden md:block'} md:flex md:space-x-4 md:items-center`}>
              {links.map((link, index) => (
                // linklere hangi rollerin erişebileceğini belirleyen fonksiyon.
                checkLinkRoles(link.accessRoles, link.bannedRoles, userRole) &&
                <div key={index} className="relative">
                  {link.submenu ? (
                    <>
                    <Link href={link.url}
                    >
                      <button
                        onMouseEnter={() => handleSubMenuToggle(index)}
                        
                        className="text-white hover:bg-gray-700 px-3 py-2 rounded-md md:inline-block"
                      >
                        {link.text}
                        
                        <MdOutlineKeyboardArrowDown className={`w-5 h-5 inline ml-1 transition-transform ${
                            openSubMenuIndex === index ? 'transform rotate-180' : ''
                          }`}/>
                        
                      </button>
                      </Link>
                      {openSubMenuIndex === index && (
                        <div className="absolute bg-gray-800 rounded-md shadow-md mt-2 py-2 w-40 z-40 md:left-0"
                        onMouseLeave={() => handleSubMenuToggle(index)}
                        
                        >
                          {link.submenu.map((sublink, subIndex) => (
                            // Sublinklere hangi rollerin erişebileceğini belirleyen fonksiyon.
                            checkLinkRoles(sublink.accessRoles, sublink.bannedRoles, userRole) &&
                            <Link href={sublink.url} key={subIndex}
                            onClick={()=>{setIsMenuOpen(!isMenuOpen);}}
                            >
                              <div className="block text-white hover:bg-gray-700 px-3 py-2 rounded-md">
                                {sublink.text}
                              </div>
                            </Link>
                          ))}
                        </div>
                      )}
                    </>
                  ) 
                  :  
                  (
                    !link.button ? (
                    <Link href={link.url} key={index}

                    >
                      <div className="text-white hover:bg-gray-700 px-3 py-2 rounded-md md:inline-block">
                        {link.text}
                      </div>
                    </Link>
                    ) : (
                      <Link href={link.url} key={index}

                      >
                      <button className="text-white bg-cst_red-600 hover:bg-cst_red px-3 py-2 rounded-md md:inline-block">
                        {link.text}
                      </button>
                    </Link>
                    )
                  )}
                </div>
              ))}
              {
                data?.user &&
                <button className='text-cst_red-600 font-bold transition-all hover:font-bold hover:text-white hover:p-2 hover:rounded hover:bg-cst_red-600' onClick={()=> signOut()}>Çıkış Yap</button>
              }
              
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;






