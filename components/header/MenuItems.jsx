"use client"
import { useEffect, useRef, useState } from "react";
import DropDown from "./DropDown";
import { ChevronDownIcon } from "@heroicons/react/24/solid";

const MenuItems = ({ items, depthLevel }) => {
    const [dropdown, setDropdown] = useState(false);

    let ref = useRef();

    useEffect(() => {
        const handler = (event) => {
            if (dropdown && ref.current && !ref.current.contains(event.target)) {
                setDropdown(false);
            }
        };
        document.addEventListener("mousedown", handler);
        document.addEventListener("touchstart", handler);
        return () => {
            // Cleanup the event listener
            document.removeEventListener("mousedown", handler);
            document.removeEventListener("touchstart", handler);
        };
    }, [dropdown]);

    const onMouseEnter = () => {
        window.innerWidth > 960 && setDropdown(true);
    };

    const onMouseLeave = () => {
        window.innerWidth > 960 && setDropdown(false);
    };

    return ( 
    <div 
    className = "menu-items"
        ref = {
            ref
        }
        onMouseEnter = {
            onMouseEnter
        }
        onMouseLeave = {
            onMouseLeave
        } >
        {
            items.submenu ? ( 
                <>
                <button type = "button"
                aria-haspopup = "menu"
                aria-expanded = {
                    dropdown ? "true" : "false"
                }
                onClick = {
                    () => setDropdown((prev) => !prev)
                } >
                {
                    items.title
                } {
                    " "
                } {
                    depthLevel === 1 && <ChevronDownIcon
                    className={`transition-all duration-200 ease-in-out h-4 w-4 text-gray-400 ml-2 ${dropdown ? "rotate-180" : "rotate-0"}`}
                    aria-hidden="true"
                  />
                } {
                    depthLevel > 1 && <ChevronDownIcon
                    className={`transition-all duration-200 ease-in-out h-4 w-4 text-gray-400 ml-2 ${dropdown ? "-rotate-90" : "rotate-0"}`}
                    aria-hidden="true"
                  />
                } </button> 
                <DropDown depthLevel = {
                    depthLevel
                }
                submenus = {
                    items.submenu
                }
                dropdown = {
                    dropdown
                }
                />
                </>
            ) : ( <a href = "/#" > {
                    items.title
                } </a>
            )
        } </div>
    );
};

export default MenuItems;
