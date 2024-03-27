'use client';
import { initializeConstantsinLocalStorage } from '@/components/constants';
import HomeContainer from '@/containers/home/index';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { useEffect } from 'react';

const Home = () => {
  useEffect(() => {
    initializeConstantsinLocalStorage();
  }, []);

  return (
    <>
      <SpeedInsights />
      <HomeContainer />
    </>
  );
};

export default Home;
