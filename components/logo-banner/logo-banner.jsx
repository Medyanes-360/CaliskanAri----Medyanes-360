'use client';
import { useEffect, useState } from 'react';

export const LogoBanner = () => {
  const [logobanner, setLogobanner] = useState(null);

  useEffect(() => {
    // TODO: database'e tasinacak
    const logobannerinLocalStorage = JSON.parse(
      localStorage.getItem('constants')
    )?.logobanner;

    if (logobannerinLocalStorage) {
      setLogobanner(logobannerinLocalStorage);
    }
  }, []);

  return (
    <div className="bg-cream py-24 sm:py-32">
      <div className="mx-auto container px-6">
        <h2 className="text-center text-2xl  font-semibold leading-8 text-gray-900">
          15 Yıllık Tecrübe ve Deneyim
        </h2>
        <p className="text-center text-cst_grey text-base pt-4">
          Uzman kadromuz ve profesyonel çalışma ortaklarımız ile sizlere en iyi
          hizmeti vermekten mutluluk duyuyoruz.
        </p>
        <div className=" mt-10 flex flex-row gap-10 justify-around">
          {logobanner?.map((item, index) => (
            <a href={item.link ? item.link : '#'}>
              <div key={index}>
                <img
                  className="col-span-2 max-h-32 w-full object-contain lg:col-span-1 saturate-0 hover:saturate-100 transition duration-700 delay-150 ease-in-out"
                  src={item.logo}
                  alt="Transistor"
                  width={158}
                  height={48}
                />
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
