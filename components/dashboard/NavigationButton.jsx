'use client'
import classNames from 'classnames';
import React from 'react';
import ChevronsRight from "@/assets/icons/ChevronsRight";

const NavigationButton = ({
                              id, onClick, label, icon: Icon, active, level, onExpand, expanded, isChilds, child
                          }) => {

    const handleExpand = (event) => {
        event.stopPropagation();
        onExpand?.();
    };

    return (<div
        key={id}
        id={id}
        onClick={(e) => {
            if (isChilds && !!id) {
                handleExpand(e)
            } else {
                onClick()
            }
        }}
        className={classNames("flex items-center h-fit gap-4 rounded-lg py-3 relative px-4 text-sm font-medium", "cursor-pointer group", "transition-all duration-200 ease-in-out", active ? "!bg-muted-foreground" : "bg-muted hover:bg-trans-cst_purple",)}
    >
        {level > 1 && !active && <div className="w-1.5 h-1.5 absolute left-0 rounded-full bg-muted-foreground" />}
        {Icon && <Icon className={classNames(
            !active ? "stroke-muted-foreground" : "stroke-muted"
        )}/>}
        {label && label !== "" &&
            <span className={classNames("text-muted-foreground font-semibold", active && "!text-muted")}>{label}
</span>}

        {isChilds && !!id && (<div
            role="button"
            className={classNames("h-full transition-all duration-200 hover:bg-secondary/50 mr-1 p-1 rounded-xl ml-auto", expanded || active ? "rotate-90" : "")}
            onClick={handleExpand}
        >
            <ChevronsRight
                className={classNames(
                    "h-4 w-4 shrink-0",
                    expanded ? "[&_path]:fill-muted-foreground" : "[&_path]:text-muted"
                )}
            />
        </div>)}
    </div>);
};

export default NavigationButton;
