import MenuItems from "./MenuItems";
import { AnimatePresence, motion } from "framer-motion";

const DropDown = ({ submenus, dropdown, depthLevel }) => {
  const dropdownClass = depthLevel > 1 ? "dropdown-submenu" : "";
  depthLevel = depthLevel + 1;
  return (
    <AnimatePresence>
      {dropdown && (
        <motion.ul
        key={depthLevel}
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 25 }}
          className={`dropdown ${dropdownClass} ${dropdown ? "show" : ""}`}
        >
          {" "}
          {submenus.map((submenu, index) => (
            <MenuItems items={submenu} key={index} depthLevel={depthLevel} />
          ))}{" "}
        </motion.ul>
      )}
    </AnimatePresence>
  );
};

export default DropDown;
