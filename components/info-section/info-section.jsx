import { informations } from "../constants/index"
import { motion } from "framer-motion"
import "./info-section.css"

export const InfoSection = () => {
  return (
    <div className="bg-cst_purple info-section bg-center bg-cover py-16">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:p-6 text-white">
        {informations.map((item) => (
          <motion.div key={item.title}  className="hoverable-div">
            <div className="flex items-center gap-4 py-5 px-8 info-section-icons">
              <motion.span  className={`text-4xl ${item.color}  `}>
                {item.icon && <item.icon />}
              </motion.span>
              <span className="flex flex-col gap-2">
                <p className="text-xl">{item.title}</p>
                <p className="text-base text-lightgrey">{item.description}</p>
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
