"use client"

import { motion } from "framer-motion"

export function StepWrapper({ children }: { children: React.ReactNode }) {
    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="w-full max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-sm border border-gray-100 min-h-[400px]"
        >
            {children}
        </motion.div>
    )
}
