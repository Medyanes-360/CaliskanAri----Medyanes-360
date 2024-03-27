'use client';
import { useEffect, useState } from 'react';
import { Tab, TabPanel, Tabs, TabsList } from '@mui/base';
import './video-section.css';
import { GoVideo } from 'react-icons/go';
import { AiOutlineControl } from 'react-icons/ai';
import { BsBoxes } from 'react-icons/bs';
import { FaPlay } from 'react-icons/fa';

export const VideoSection = () => {
  const [image, setImage] = useState(null);
  const [info, setInfo] = useState(null);

  useEffect(() => {
    const infoinLocalStorage = JSON.parse(
      localStorage.getItem('constants')
    )?.info;

    if (infoinLocalStorage) {
      const {
        videoTitle1,
        video,
        videoTitle2,
        videoTitle3,
        videoTitle4,
        videoDesc1,
        videoDesc2,
        videoDesc3,
      } = infoinLocalStorage;
      setInfo({
        videoTitle1,
        video,
        videoTitle2,
        videoTitle3,
        videoTitle4,
        videoDesc1,
        videoDesc2,
        videoDesc3,
      });
    }

    const imageinLocalStorage = JSON.parse(
      localStorage.getItem('constants')
    )?.image;

    if (imageinLocalStorage) {
      const { videoCover, underline } = imageinLocalStorage;
      setImage({ videoCover, underline });
    }
  }, []);

  return (
    <div className="bg-cst_purple video-section bg-left-top bg-no-repeat pt-8 ">
      <div className="flex-col items-center justify-center mx-auto container ">
        <div className="flex flex-col items-center justify-center text-white mb-5 lg:mb-0 px-8 lg:px-0">
          <h2 className="text-4xl relative">
            {info?.videoTitle1}
            <img
              src={image?.underline || ''}
              alt=""
              className="absolute right-0"
            />
          </h2>
        </div>
        <div className="flex flex-col lg:flex-row items-center justify-center py-10 px-8 lg:px-0">
          <div>
            <Tabs defaultValue={0} orientation="vertical" className="flex">
              <TabsList className="flex flex-col items-start pl-2 gap-10">
                <div>
                  <Tab className="text-white text-xl flex items-center gap-3">
                    <span className="text-4xl">
                      <GoVideo />
                    </span>
                    {info?.videoTitle2}
                  </Tab>
                  <TabPanel className="text-base text-tabs pt-3" value={0}>
                    {info?.videoDesc1}
                  </TabPanel>
                </div>
                <div>
                  <Tab className="text-white text-xl flex items-center gap-3">
                    <span className="text-4xl">
                      <AiOutlineControl />
                    </span>
                    {info?.videoTitle3}
                  </Tab>
                  <TabPanel className="text-base text-tabs pt-3" value={1}>
                    {info?.videoDesc2}
                  </TabPanel>
                </div>
                <div>
                  <Tab className="text-white text-xl flex items-center gap-3">
                    <span className="text-4xl">
                      <BsBoxes />
                    </span>
                    {info?.videoTitle4}
                  </Tab>
                  <TabPanel className="text-base text-tabs pt-3" value={2}>
                    {info?.videoDesc3}
                  </TabPanel>
                </div>
              </TabsList>
            </Tabs>
          </div>

          <div className="w-full mt-10 lg:mt-0 hover:scale-105 transition-all">
            <a
              href={info?.video}
              target="_blank"
              rel="noopener noreferrer"
              className="relative"
            >
              <img
                src={image?.videoCover || ''}
                alt=""
                className="video-cover bg-videocover bg-no-repeat bg-bottom"
              />

              <span className="absolute right-2/4 bottom-2/4 rounded-full bg-white text-buttonColor w-16 h-16 flex items-center justify-center">
                <FaPlay />
              </span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
