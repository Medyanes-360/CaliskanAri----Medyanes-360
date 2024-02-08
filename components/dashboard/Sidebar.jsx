'use client'

import React, {useEffect, useState, useRef} from 'react'
import classNames from "classnames";
import ChevronsLeft from "@/assets/icons/ChevronsLeft";
import {usePathname} from "next/navigation";
import ChevronsRight from "@/assets/icons/ChevronsRight";
import ButtonList from "@/components/dashboard/ButtonList";
import UserIcon from "@/assets/icons/UserIcon";
import BurgerIcon from "@/assets/icons/BurgerIcon";
import {useMediaQuery} from "@/lib/table/useMediaQuery";

const buttons = [
    {
        title: "Dashboard",
        buttons: [
            {
                id: "1.1",
                icon: UserIcon,
                label: "Add Company",
                path: "/dashboard/addcompany",
            },
            {
                id: "1.2",
                label: "Add Person",
                icon: UserIcon,
                path: "/dashboard/Addperson"
            },
            {
                id: "1.3",
                label: "Add Suplier",
                icon: UserIcon,
                path: "/dashboard/addsuplier"
            },
        ]
    },
    {
        title: "Others",
        buttons: [
            {
                id: "1.4",
                label: "Stock",
                icon: UserIcon,
                childs: [
                    {
                        id: "1.4.1",
                        label: "Stock",
                        icon: UserIcon,
                        path: "/dashboard/Stock",
                    },
                    {
                        id: "1.4.2",
                        label: "Stock Control",
                        path: "/dashboard/Stockcontrol",
                        icon: UserIcon,
                    }
                ]
            }
        ]
    }
]

const Sidebar = ({isOpen, setIsOpen}) => {
    const pathname = usePathname()
    const isMobile = useMediaQuery(768);
    const isResizingRef = useRef(false);
    const sidebarRef = useRef(null);
    const navbarRef = useRef(null);
    const [isResetting, setIsResetting] = useState(false);
    const [isCollapsed, setIsCollapsed] = useState(isMobile);

    useEffect(() => {
        if (isMobile) {
            collapse();
        } else {
            resetWidth();
        }
    }, [isMobile]);

    useEffect(() => {
        if (isMobile) {
            collapse();
        }
    }, [pathname, isMobile]);

    const handleMouseDown = (
        event
    ) => {
        event.preventDefault();
        event.stopPropagation();

        isResizingRef.current = true;
        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
    };

    const handleMouseMove = (event) => {
        if (!isResizingRef.current) return;
        let newWidth = event.clientX;

        if (newWidth < 240) newWidth = 240;
        if (newWidth > 480) newWidth = 480;

        if (sidebarRef.current && navbarRef.current) {
            sidebarRef.current.style.width = `${newWidth}px`;
            navbarRef.current.style.setProperty("left", `${newWidth}px`);
            navbarRef.current.style.setProperty("width", `calc(100% - ${newWidth}px)`);
        }
    };

    const handleMouseUp = () => {
        isResizingRef.current = false;
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
    };

    const resetWidth = () => {
        if (sidebarRef.current && navbarRef.current) {
            setIsCollapsed(false);
            setIsResetting(true);

            sidebarRef.current.style.width = isMobile ? "100%" : "300px";
            navbarRef.current.style.setProperty(
                "width",
                isMobile ? "0" : "calc(100% - 240px)"
            );
            navbarRef.current.style.setProperty(
                "left",
                isMobile ? "100%" : "240px"
            );
            setTimeout(() => setIsResetting(false), 300);
        }
    };

    const collapse = () => {
        if (sidebarRef.current && navbarRef.current) {
            setIsCollapsed(true);
            setIsResetting(true);

            sidebarRef.current.style.width = "40px";
            navbarRef.current.style.setProperty("width", "100%");
            navbarRef.current.style.setProperty("left", "0");
            setTimeout(() => setIsResetting(false), 300);
        }
    }

    return (
        <>
            <aside
                ref={sidebarRef}
                className={classNames(
                    "group/sidebar h-screen overflow-y-auto bg-white relative flex w-60 flex-col z-[50] !bg-muted p-2 pt-8 shadow-sm",
                    isResetting && "transition-all ease-in-out duration-300",
                    isMobile && "!absolute",
                    isMobile && isCollapsed && "!bg-transparent !shadow-none"
                )}
            >
                <div
                    onClick={isCollapsed ? resetWidth : collapse}
                    role="button"
                    className={classNames(
                        "h-6 w-6 rounded-lg absolute top-3 right-2 transition",
                    )}
                >
                    {
                        isMobile && isCollapsed ? <BurgerIcon className="w-6 h-6 [&_path]:fill-muted-foreground"/>
                            : isCollapsed ? <ChevronsRight className="h-6 w-6 [&_path]:fill-muted-foreground"/> :
                                <ChevronsLeft className="h-6 w-6 [&_path]:fill-muted-foreground"/>
                    }
                </div>
                <div className={
                    classNames(
                        !isCollapsed ? " p-4 flex flex-col gap-2" : "hidden"
                    )
                }>
                    {buttons.map(({buttons: x, title}, index) => (
                        <div key={index} className="flex flex-col gap-4 border-b border-b-muted-foreground pb-5">
                            {!isMobile && <span className="text-sm font-semibold text-muted-foreground">{title}</span>}
                            <ButtonList buttons={x} level={1}/>
                        </div>
                    ))}
                </div>
                {
                !isCollapsed && <div
                        onMouseDown={handleMouseDown}
                        onClick={resetWidth}
                        className="opacity-0 group-hover/sidebar:opacity-100 transition cursor-ew-resize absolute h-full w-1 bg-muted-foreground right-0 top-0"
                    />
                }
            </aside>
            <div
                ref={navbarRef}
                className={classNames(
                    "absolute top-0 z-[99999] left-60 w-[calc(100%-240px)]",
                    isResetting && "transition-all ease-in-out duration-300",
                    isMobile && "left-0 w-full"
                )}
            >
            </div>
        </>
    )
};

export default Sidebar;
