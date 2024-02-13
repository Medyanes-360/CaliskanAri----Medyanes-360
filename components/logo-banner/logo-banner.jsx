import {logobanner} from "../constants/index"

export const LogoBanner = () => {
  return (
    <div className="bg-cream py-24 sm:py-32">
    <div className="mx-auto container px-6">
      <h2 className="text-center text-2xl  font-semibold leading-8 text-gray-900">
        Trusted By Over 13,400 Great Teams
      </h2>
      <p className="text-center text-cst_grey text-base pt-10">Leading Companies Use The Same Courses To Help Employees Keep Their Skills Fresh.</p>
      <div className=" mt-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 items-center gap-x-8 gap-y-10">
       { logobanner.map((item,index)=>(
        <div key={index}>
             <img
          className="col-span-2 max-h-24 w-full object-contain lg:col-span-1 saturate-0 hover:saturate-100 transition duration-700 delay-150 ease-in-out"
          src={item.logo}
          alt="Transistor"
          width={158}
          height={48}

        />
        </div>
       ))}

      </div>
    </div>
  </div>
  )
}
