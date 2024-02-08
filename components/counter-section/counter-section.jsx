import CountUp, { useCountUp } from "react-countup";
import { FaUserGraduate } from "react-icons/fa";
import { BsPersonVideo3 } from "react-icons/bs";
import { PiCertificate } from "react-icons/pi";
import "./counter-section.css"
export const CounterSection = () => {
  useCountUp({
    ref: "counter",
    end: 1234567,
    enableScrollSpy: true,
    scrollSpyDelay: 1000,
  });

  return (
    <div className="bg-buttonColor counter-section bg-left">
      <div className="mx-auto container px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="text-white font-bold text-4xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          <div className="text-center pb-4">
            <h2>Join In On <br /> Something Big</h2>
          </div>

          <span className="flex items-center justify-center gap-3 pb-4" >
            <span className="text-5xl">
              <FaUserGraduate />
            </span>
            <span className="flex flex-col gap-2">
              <span>
                <CountUp end={50} delay={-1} enableScrollSpy />M
              </span>
              <span className="text-base font-normal">Learners</span>
            </span>
          </span>
          <span className="flex items-center justify-center gap-3 pb-4">
            <span className=" text-5xl">
              <BsPersonVideo3 />
            </span>
            <span className="flex flex-col gap-2">
              <span>
                <CountUp end={120} enableScrollSpy />K
              </span>
              <span className="text-base font-normal">Top Courses</span>
            </span>
          </span>
          <span className="flex items-center justify-center gap-3 pb-4">
            <span className="text-5xl">
              <PiCertificate />
            </span>
            <span className="flex flex-col gap-2">
              <CountUp end={34} enableScrollSpy />
              <span className="text-base font-normal">Best Award</span>
            </span>
          </span>
        </div>
      </div>
    </div>
  );
};
