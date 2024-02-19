import { contact } from "../constants/index";
import { PiPhoneCallLight } from "react-icons/pi";
import { CiSearch } from "react-icons/ci";
import { categories } from "../constants/index";
import { Popover, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { Fragment } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from 'next/link'
import Image from "next/image";

export const TopBar = () => {
  const { data } = useSession();
  const { phone } = contact;

  return (
    <div className=" flex justify-between items-center mx-6 my-2">
      <div>
        <a href="#">
          <Image
            className="h-auto max-w-ful mb-4"
            src="/logo.png"
            width={100}
            height={100}
            alt="Logo"
          />
        </a>
      </div>
      <div className="basis-1/2 relative rounded-md hidden lg:flex">
        <div className="absolute inset-y-0 left-5 flex items-center">
          <Popover.Group className="lg:gap-x-12">
            <Popover className="relative">
              <Popover.Button className="flex items-center gap-x-1 text-sm leading-6 text-gray-900">
                Product
                <ChevronDownIcon
                  className="h-5 w-5 flex-none text-gray-400 ml-5"
                  aria-hidden="true"
                />
                <span className="pl-4 text-border">|</span>
              </Popover.Button>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
              >
                <Popover.Panel className="absolute -left-8 top-full z-40 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5">
                  <div className="p-4">
                    {categories.map((item) => (
                      <div
                        key={item.name}
                        className="group relative flex items-start gap-x-6 rounded-lg p-4 text-sm hover:bg-gray-50"
                      >
                        <div className="flex-auto">
                          <a href={item.href} className="text-gray-900">
                            {item.name}
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </Popover.Panel>
              </Transition>
            </Popover>
          </Popover.Group>
        </div>
        <input
          type="text"
          name="price"
          id="price"
          className="block bg-[#fff] w-full rounded-full border-0 py-4 pl-40 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
          placeholder="Kursları buradan arayabilrsiniz..."
        />
        <div className="absolute inset-y-0 right-2 flex items-center">
          <button className="flex gap-2 px-3 py-2 items-center bg-buttonColor rounded-3xl text-white text-lg hover:bg-cst_purple">
            <CiSearch style={{ fontSize: "25px" }} /> Ara
          </button>
        </div>
      </div>

      <div className="flex items-center">
        <div className="justify-center items-center hidden lg:flex">
          <span className="bg-white rounded-full  text-buttonColor p-4 ms-2 border border-border">
            <PiPhoneCallLight style={{ fontSize: "20px" }} />
          </span>
          <span className="pl-3">
            <p className="text-cst_grey text-sm">Hızlı İletişim</p>
            <a className="text-[#241442]" href={`tel:${phone}`}>
              {phone}
            </a>
          </span>
        </div>
        <div className="text-border px-4 hidden lg:flex">|</div>

        <div className="gap-5 pt-5 lg:pt-0 hidden lg:flex pr-3">
          {!data ? (
            <>
              <button
                onClick={() => signIn()}
                className="flex-shrink-0 rounded-3xl px-6 py-3 border border-border text-sm text-[#241442] transition-all duration-200 hover:bg-cst_purple hover:text-white text-center"
              >
                Giriş Yap
              </button>
              <Link href="/auth/register/student" className="flex-shrink-0 rounded-3xl px-6 py-3 border transition-all duration-200 border-border text-sm bg-cst_purple text-white hover:bg-buttonColor text-center">
                Kayıt Ol
              </Link>
              <Link
              href="/auth/register/teacher"
                className="flex-shrink-0 rounded-3xl px-6 py-3 border border-border text-sm text-[#241442] transition-all duration-200 hover:bg-cst_purple hover:text-white text-center"
              >
                Öğretmen Girişi
              </Link>
              <Link href="/auth/login/teacher" className="flex-shrink-0 rounded-3xl px-6 py-3 border transition-all duration-200 border-border text-sm bg-cst_purple text-white hover:bg-buttonColor text-center">
              Öğretmen Kayıt Ol
              </Link>
            </>
          ) : (
            <>
              {data?.user?.role === "admin" && <Link href="/dashboard/admin" className="flex-shrink-0 rounded-3xl px-6 py-3 border transition-all duration-200 border-border text-sm bg-cst_purple text-white hover:bg-buttonColor text-center">
                Dashboard
              </Link>}

              <button onClick={() => signOut()} className="flex-shrink-0 rounded-3xl px-6 py-3 border transition-all duration-200 border-border text-sm bg-cst_red text-white hover:bg-buttonColor text-center">
                Çıkış yap
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
