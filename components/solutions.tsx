"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { ArrowRight } from "lucide-react"

const solutions = [
  {
    title: "Automation Solutions",
    description: "Streamline your operations with our advanced automation systems",
  },
  {
    title: "Control Systems",
    description: "Precise control for complex industrial processes",
  },
  {
    title: "Maintenance Services",
    description: "Comprehensive support to keep your systems running efficiently",
  },
]

export default function Solutions() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <section ref={ref} className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">Solutions</h2>
          <p className="text-xl text-gray-600">Tailored to your industry needs</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {solutions.map((solution, index) => (
            <motion.div
              key={solution.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="group cursor-pointer"
            >
              <div className="p-8 rounded-2xl bg-gray-50 hover:bg-gray-100 transition-colors duration-300">
                <h3 className="text-2xl font-semibold mb-4 group-hover:text-blue-600 transition-colors">
                  {solution.title}
                </h3>
                <p className="text-gray-600 mb-6">{solution.description}</p>
                <div className="flex items-center text-blue-600">
                  <span className="font-medium">Learn more</span>
                  <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

