'use client';
import { initializeConstantsinLocalStorage } from '@/components/constants';
import HomeContainer from '@/containers/home/index';
import { SpeedInsights } from '@vercel/speed-insights/next';

const Home = () => {
  initializeConstantsinLocalStorage();

  return (
    <>
      <SpeedInsights />
      <HomeContainer />
    </>
  );
};

export default Home;
