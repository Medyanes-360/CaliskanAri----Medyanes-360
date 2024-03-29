'use client';
import { useEffect, useState } from 'react';
import { BlogSectionSlider } from './blog-section-slider';

export const BlogSection = () => {
  const [info, setInfo] = useState(null);
  const [image, setImage] = useState(null);

  useEffect(() => {
    // TODO: database'e tasinacak
    const infoinLocalStorage = JSON.parse(
      localStorage.getItem('constants')
    )?.info;

    if (infoinLocalStorage) {
      const { blogTitle1, blogTitle2, blogDesc } = infoinLocalStorage;
      setInfo({ blogTitle1, blogTitle2, blogDesc });
    }

    // TODO: database'e tasinacak
    const imageinLocalStorage = JSON.parse(
      localStorage.getItem('constants')
    )?.image;

    if (imageinLocalStorage) {
      const { underline } = imageinLocalStorage;
      setImage({ underline });
    }
  }, []);

  return (
    <div className="bg-cream">
      <div className="container mx-auto sm:px-0 px-3">
        <div className="flex flex-col items-center justify-center">
          <p className="text-sm text-cst_grey p-2">{info?.blogTitle1}</p>
          <div>
            <h2 className="text-cst_purple text-4xl font-semibold p-2 relative pb-6">
              {info?.blogTitle2}
              <img
                src={image?.underline || ''}
                alt=""
                className="absolute right-4036"
              />
            </h2>
          </div>
          <p className="text-cst_grey tex-base">{info?.blogDesc}</p>
        </div>
        <BlogSectionSlider />
      </div>
    </div>
  );
};
