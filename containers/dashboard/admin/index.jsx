'use client'
import Sidebar from '@/components/dashboard/sidebar';
import Content from '@/components/dashboard/content';
import { useSession } from "next-auth/react"

// ##################################################################
//  KULLANILACAK OLAN PANELLERİN İMPORTLARI AŞAĞIDA YAPILMIŞTIR. ####
import GeneralTopPageBanner from '@/components/dashboard/panels/admin/generalTopPageBanner';
import Slider from '@/components/dashboard/panels/admin/slider';

// ##################################################################

import { useState, useEffect } from 'react';


 const AdminContainer = () => {

  const { data: session, status } = useSession();

   /*
  -> content içerisinde kullanılacak olan panel componentini state olarak tutuyoruz
  -> kullanımı aşağıdaki gibi olmalıdır!  
      { 
        id:"/", -> id değeri unique olmalıdır.
        buttonRole: "admin", -> admin, student, teacher, all değerlerinden biri olmalıdır.
        name:"Ana Sayfa", -> butonun üzerinde yazacak olan yazı
        parentButton:false, -> eğer butonun bir üst butonu varsa true olmalıdır.
        parentButtonId:"", -> eğer butonun bir üst butonu varsa üst butonun id değeri yazılmalıdır.       
        component: false, -> eğer butonun bir üst butonu yoksa false olmalıdır. eğer butonun bir üst butonu varsa içerisine component yazılmalıdır.
        link: "/", -> eğer butonun bir üst butonu yoksa link değeri yazılmalıdır. eğer butonun bir üst butonu varsa boş bırakılmalıdır.
        index:0 -> butonun sırası yazılmalıdır.
      }
  */
      const [contentData, setContentData] = useState([]);
  
  //  Sidebar içine gönderilecek olan butonların listesi (sessiondan alınan role göre filtrelenecek)
  const [adminSidebar, setAdminSidebar] = useState([
    {
      id:"/",
      buttonRole: "admin",
      name:"Ana Sayfa",
      parentButton:false,
      parentButtonId:"",      
      component: false,
      link: "/",
      index:0
    },
    {
      id:"GeneralTopPageBanner",
      buttonRole: "admin",
      name:"Genel Duyuru",
      parentButton:true,
      parentButtonId:"Ana Sayfa",
      component: <GeneralTopPageBanner />,
      link:"",
      index:0
    },
    {
      id:"Slider",
      buttonRole: "admin",
      name:"Slider",
      parentButton:true,
      parentButtonId:"Ana Sayfa",
      component: <Slider />,
      link:"",
      index:0
    }
    
  ]);

  //  Sidebar içine gönderilecek olan butonların listesi (sessiondan alınan role göre filtrelenecek)
  const [studentSidebar, setStudentSidebar] = useState([]);

    //  Sidebar içine gönderilecek olan butonların listesi (sessiondan alınan role göre filtrelenecek)
  const [teacherSidebar, setTeacherSidebar] = useState([]);

    useEffect(() => {
      console.log("contentData: ", contentData);
    }, [contentData])
    
  

    useEffect(() => {
      
      if(status == "authenticated" && (session.user.role == "admin" || session.user.role == "student" || session.user.role == "teacher")){
        if(session.user.role == "admin"){
          setContentData(adminSidebar)
        }
        else if(session.user.role == "student"){
          if(session.user.role == "student"){
            setContentData(studentSidebar)
          }      
        }
        else if(session.user.role == "teacher"){
          if(session.user.role == "teacher"){
            setContentData(teacherSidebar)
          }
        }
        else{
          setContentData([])
        }
      }
    }, [])

    
    useEffect(() => {
      console.log(contentData);
    }, [contentData])

  return (
    <>

      <div className='flex'>
        <Sidebar setContentData={setContentData} contentData={contentData}/>
        <Content setContentData={setContentData} contentData={contentData}/>
      </div>

    </>
  )
}

export default AdminContainer;

