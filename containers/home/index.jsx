"use client";

import { BannerSection } from '@/components/banner-section/banner-section'
import { BecomeInstructorSection } from '@/components/become-instructor-section/become-instructor-section'
import { BlogSection } from '@/components/blog-section/blog-section'
import { ClientsSection } from '@/components/clients-section/clients-section'
import { CounterSection } from '@/components/counter-section/counter-section'
import { FeaturedCourses } from '@/components/featured-courses/featured-card'
import { Footer } from '@/components/footer/footer'
import { SearchBar } from '@/components/header/searchbar'
import { InfoSection } from '@/components/info-section/info-section'
import { InstructorsSection } from '@/components/instructors-section/instructors-section'
import { LastBanner } from '@/components/last-banner/last-banner'
import LearnersStudents from '@/components/learners-students/learners-students'
import { LogoBanner } from '@/components/logo-banner/logo-banner'
import MainSection from '@/components/main-section/main-section'
import { TopClassCourses } from '@/components/top-class-courses/top-class-courses'
import { VideoSection } from '@/components/video-section/video-section'

// session: giriş yapmış kullanıcıyı temsil eder varsa bilgileri içinde barındırır.
// signIn:  kullanıcıyı giriş yapmaya yönlendirmek için kullanılır.
// signOut: kullanıcıyı çıkış yapmaya yönlendirmek için kullanılır.
import { signIn, signOut, useSession } from 'next-auth/react'

 const HomeContainer = () => {

  // useSession ile session bilgilerine erişebiliriz.
  const {data}= useSession();

  return (
   <>
    <SearchBar/>
    <MainSection/>
    <InfoSection/>
    <TopClassCourses/>
    <LearnersStudents/>
    <FeaturedCourses/>
    <VideoSection/>
    <InstructorsSection/>
    <CounterSection/>
    <ClientsSection/>
    <BannerSection/>
    <BecomeInstructorSection/>
    <LogoBanner/>
    <BlogSection/>
    <LastBanner/>
    <Footer/>
    </>
  )
}

export default HomeContainer;
