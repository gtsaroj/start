"use client"

import { motion } from "framer-motion"

export function StatsSection() {
    return (
        <section className="py-20 bg-gray-50 border-y border-gray-100">
            <div className="container px-4 md:px-6">
                <div className="grid md:grid-cols-3 gap-8 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="text-5xl font-extrabold text-primary mb-2">10k+</div>
                        <div className="text-lg font-medium text-gray-600">Active Students</div>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <div className="text-5xl font-extrabold text-green-600 mb-2">500+</div>
                        <div className="text-lg font-medium text-gray-600">Partner Companies</div>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                    >
                        <div className="text-5xl font-extrabold text-purple-600 mb-2">50+</div>
                        <div className="text-lg font-medium text-gray-600">Universities Connected</div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
