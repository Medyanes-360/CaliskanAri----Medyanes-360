'use client';
import { useEffect, useState } from 'react';
import { CustomButton } from '../helpers/custom-button';
import { BsPerson } from 'react-icons/bs';
import { PiNotebookThin } from 'react-icons/pi';

export const InstructorsSection = () => {
  const [info, setInfo] = useState(null);
  const [image, setImage] = useState(null);
  const [instructors, setInstructors] = useState(null);

  useEffect(() => {
    // TODO: database'e tasinacak
    const infoinLocalStorage = JSON.parse(
      localStorage.getItem('constants')
    )?.info;

    if (infoinLocalStorage) {
      const { instructorsTitle1, instructorsTitle2, instructorsDesc } =
        infoinLocalStorage;
      setInfo({ instructorsTitle1, instructorsTitle2, instructorsDesc });
    }

    // TODO: database'e tasinacak
    const imageinLocalStorage = JSON.parse(
      localStorage.getItem('constants')
    )?.image;

    if (imageinLocalStorage) {
      const { underline } = imageinLocalStorage;
      setImage({ underline });
    }

    // TODO: database'e tasinacak
    const instructorsinLocalStorage = JSON.parse(
      localStorage.getItem('constants')
    )?.instructors;

    if (instructorsinLocalStorage) {
      setInstructors(instructorsinLocalStorage);
    }
  }, []);
  return (
    <div className="bg-cream pt-8 pb-16">
      <div className="mx-auto container flex-col items-center justify-between p-6">
        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
          <div className="flex flex-col items-start justify-start gap-3 pb-8">
            <p className="text-cst_grey text-sm">{info?.instructorsTitle1}</p>
            <div>
              <h2 className="text-cst_purple text-4xl font-semibold relative pb-2">
                {info?.instructorsTitle2}
                <img
                  src={image?.underline || ''}
                  alt=""
                  className="absolute right-20"
                />
              </h2>
            </div>
            <p className="text-cst_grey text-base">{info?.instructorsDesc}</p>
            <CustomButton title="See All Instructors" />
          </div>

          {instructors?.map((item, index) => (
            <div key={index} className="flex bg-card border rounded-2xl w-auto">
              <div className="pt-10 w-52">
                <img src={item.image} alt="" />
              </div>
              <div className="flex flex-col justify-center gap-6">
                <div>
                  <h3 className="text-cst_purple text-2xl font-semibold">
                    {item.name}
                  </h3>
                  <p className="text-buttonColor">{item.job}</p>
                </div>

                <div className="text-cst_grey">
                  <p className="flex items-center gap-2">
                    <span className="text-md">
                      <PiNotebookThin />
                    </span>
                    {item.course}
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="text-md">
                      <BsPerson />
                    </span>
                    {item.student}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
