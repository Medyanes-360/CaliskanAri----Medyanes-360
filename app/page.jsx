'use client'
import HomeContainer from "@/containers/home/index";
import { SpeedInsights } from "@vercel/speed-insights/next"

const Home = () => {
  return (
    <>
      <SpeedInsights/>
      <HomeContainer />
    </>
  );
};

export default Home;
