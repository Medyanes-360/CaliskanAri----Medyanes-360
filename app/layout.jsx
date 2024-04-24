"use client";
import "@/styles/global.css";
import "react-toastify/dist/ReactToastify.css";
import { SessionProvider } from "next-auth/react";
import Navbar from "@/components/other/navbar";
import { ThemeProvider } from "next-themes";

/*
import { signIn, signOut, useSession } from 'next-auth/react'
const {data}= useSession();
data?.user?.role -> kullanıcının rolüne erişebiliriz.
1- admin
2- teacher
3- student
*/
const links = [
  { url: "/", text: "Ana Sayfa" },
  {
    url: "#",
    text: "Giriş Yap",
    bannedRoles: ["admin", "teacher", "student"],
    submenu: [
      {
        url: "/auth/login/admin",
        text: "Admin Giriş",
        bannedRoles: ["teacher", "student"],
      },
      {
        url: "/auth/login/teacher",
        text: "Öğretmen Giriş",
        bannedRoles: ["teacher", "student"],
      },
      {
        url: "/auth/login/student",
        text: "Öğrenci Giriş",
        bannedRoles: ["teacher", "student"],
      },
    ],
  },
  {
    url: "#",
    text: "Kayıt Ol",
    bannedRoles: ["admin", "teacher", "student"],
    submenu: [
      {
        url: "/auth/register/teacher",
        text: "Öğretmen Kayıt",
        bannedRoles: ["teacher", "student"],
      },
      {
        url: "/auth/register/student",
        text: "Öğrenci Kayıt",
        bannedRoles: ["teacher", "student"],
      },
    ],
  },

  {
    url: "#",
    text: "Dashboards",
    accessRoles: ["admin", "teacher", "student"],
    submenu: [
      {
        url: "/dashboard/admin",
        text: "Admin Dashboard",
        accessRoles: ["admin"],
      },
      {
        url: "/dashboard/teacher",
        text: "Öğretmen Dashboard",
        accessRoles: ["teacher"],
        bannedRoles: ["admin", "student"],
      },
      {
        url: "/dashboard/student",
        text: "Öğrenci Dashboard",
        accessRoles: ["student"],
        bannedRoles: ["admin", "teacher"],
      },
    ],
  },

  // {
  //   url: '/products',
  //   text: 'Products',
  //   accessRoles: ['admin'],
  //   bannedRoles: ['teacher', 'student'],
  //   submenu: [
  //     { url: '/auth/login/admin', text: 'Admin Giriş', accessRoles: ['admin'], bannedRoles: ['teacher', 'student'] },
  //     { url: '/products/category2', text: 'Category 5' },
  //     { url: '/products/category3', text: 'Category 6' },
  //   ],
  // },
  // {
  //   url: '/contact',
  //   text: 'Contact',
  //   button: true,
  // },
  // Diğer linkleri burada da tanımlayabilirsiniz
];

const RootLayout = ({ children, session }) => {
  return (
    <html lang="tr">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css"
          integrity="sha512-SnH5WK+bZxgPHs44uWIX+LLJAJ9/2PkPKZ5QiAj6Ta86w+fsb2TkcmfRyVX3pBnMFcV7oQPJkl9QevSCWr3W6A=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"
        />
      </head>
      <body>
        <ThemeProvider>
          {/* SessionProvider ile sarmallarız ki tüm route lara erişebilelim diye / yukarıda "use client" tanımlamayı unutma! */}
          <SessionProvider session={session}>
            {/* <Navbar links={links}/> */}
            {children}
          </SessionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
};

export default RootLayout;
