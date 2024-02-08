import { Fragment, useEffect, useState } from "react";
import { Dialog, Disclosure, Popover, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { image, menus } from "../constants/index";
import { TopBar } from "./topbar";
import { CiSearch } from "react-icons/ci";
import { Badge } from "@mui/material";
import { LiaShoppingBagSolid } from "react-icons/lia";
import { BsHeart } from "react-icons/bs";
import { IoIosLogIn } from "react-icons/io";
import "./header.css";
import { TopInfo } from "./top-info";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
export const SearchBar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isHeaderFixed, setIsHeaderFixed] = useState(false);
  const [isLogoVisible, setIsLogoVisible] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);

  const { logo } = image;
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const threshold = 100;

      setIsHeaderFixed(scrollY > threshold);
      setIsLogoVisible(scrollY > threshold);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <TopInfo />
      <header className="bg-cream flex lg:flex-col justify-between">
        <TopBar />
        <nav
          className={`flex items-center justify-between p-4 ${
            isHeaderFixed ? "fixed -top-1 z-50 w-full  bg-white  " : ""
          }`}
          aria-label="Global"
        >
          <div className="sm:ml-16">
            {isLogoVisible && (
              <a href="#">
                <img
                  className="h-auto max-w-full lg:hidden "
                  src={logo}
                  alt=""
                />
              </a>
            )}
          </div>
          <div className="flex items-center gap-3 lg:hidden  sm:ml-52">
            <div className="flex gap-3">
              <a href="#">
                <IoIosLogIn className="h-6 w-6 text-buttonColor" />
              </a>

              <a href="#">
                <CiSearch className="h-6 w-6" />
              </a>
            </div>
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md text-black"
              onClick={() => setMobileMenuOpen(true)}
            >
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>

          <div className="lg:flex lg:flex-1 hidden">
            {menus.map((menu) => (
              <Popover
                key={menu.name}
                className="relative"
                onMouseEnter={() => setOpenMenu(menu.name)}
                onMouseLeave={() => setOpenMenu(null)}
              >
                <Popover.Button className="hover-animation hover:text-buttonColor flex items-center text-sm font-semibold leading-6 text-gray-900">
                  {menu.name}

                  <ChevronDownIcon
                    className="h-5 w-5 flex-none text-gray-400 me-6"
                    aria-hidden="true"
                  />
                </Popover.Button>

                <Transition
                  as={Fragment}
                  show={openMenu === menu.name}
                  enter="transition ease-out duration-200"
                  enterFrom="opacity-0 translate-y-1"
                  enterTo="opacity-100 translate-y-0"
                  leave="transition ease-in duration-150"
                  leaveFrom="opacity-100 translate-y-0"
                  leaveTo="opacity-0 translate-y-1"
                >
                  <Popover.Panel className="absolute -left-8 top-full z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5">
                    <div className="p-4">
                      {menu.items.map((item, index) => (
                        <div
                          key={index}
                          className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50"
                        >
                          <div className="flex-auto">
                            <a
                              href="#"
                              className="block font-semibold text-gray-900"
                            >
                              {item}
                            </a>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Popover.Panel>
                </Transition>
              </Popover>
            ))}
          </div>
          <div className="lg:flex items-center gap-4 hidden pr-20 pt-2">
            <Badge badgeContent={1} className="text-xl">
              <BsHeart />
            </Badge>
            <span className="text-border ">|</span>
            <Badge badgeContent={1} className="text-2xl">
              <LiaShoppingBagSolid />
            </Badge>
          </div>
        </nav>

        <Dialog
          as="div"
          className="lg:hidden"
          open={mobileMenuOpen}
          onClose={setMobileMenuOpen}
        >
          <div className="fixed inset-0 z-10" />
          <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <a href="#" className="-m-1.5 p-1.5">
                <span className="sr-only">Your Company</span>
                <img className="h-8 w-auto" src={logo} alt="" />
              </a>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  {menus.map((menu, index) => (
                    <Disclosure as="div" className="-mx-3" key={index}>
                      {({ open }) => (
                        <>
                          <Disclosure.Button className="flex hover:text-buttonColor w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                            {menu.name}
                            <ChevronDownIcon
                              className={classNames(
                                open ? "rotate-180" : "",
                                "h-5 w-5 flex-none"
                              )}
                              aria-hidden="true"
                            />
                          </Disclosure.Button>
                          <Disclosure.Panel className="mt-2 space-y-2 ">
                            {menu.items.map((menuItem, itemIndex) => (
                              <Disclosure.Button
                                key={itemIndex}
                                as="a"
                                href={`#${menuItem}`}
                                className="block hover:text-buttonColor rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                              >
                                {menuItem}
                              </Disclosure.Button>
                            ))}
                          </Disclosure.Panel>
                        </>
                      )}
                    </Disclosure>
                  ))}
                </div>

                <div className="py-6">
                  <a
                    href="#"
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    Contact
                  </a>
                </div>
              </div>
            </div>
          </Dialog.Panel>
        </Dialog>
      </header>
    </>
  );
};
