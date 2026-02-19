"use client"

import { Check } from "lucide-react"
import { motion } from "framer-motion"

interface StepperProps {
    steps: string[]
    currentStep: number
}

export function Stepper({ steps, currentStep }: StepperProps) {
    return (
        <div className="w-full py-6">
            <div className="flex items-center justify-between relative z-10">
                {steps.map((step, index) => {
                    const isCompleted = index < currentStep
                    const isCurrent = index === currentStep

                    return (
                        <div key={index} className="flex flex-col items-center flex-1">
                            <motion.div
                                className={`
                                    w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm transition-all duration-300 border-2
                                    ${isCompleted ? "bg-primary border-primary text-white" : ""}
                                    ${isCurrent ? "bg-white border-primary text-primary shadow-lg scale-110" : ""}
                                    ${!isCompleted && !isCurrent ? "bg-white border-gray-200 text-gray-400" : ""}
                                `}
                                initial={false}
                                animate={{
                                    scale: isCurrent ? 1.2 : 1,
                                    /* backgroundColor */
                                }}
                            >
                                {isCompleted ? <Check className="h-5 w-5" /> : index + 1}
                            </motion.div>
                            <span
                                className={`
                                    absolute mt-14 text-xs font-medium uppercase tracking-wider
                                    ${isCurrent ? "text-primary" : "text-gray-400"}
                                `}
                            >
                                {step}
                            </span>
                        </div>
                    )
                })}
            </div>
            {/* Progress Bar Background */}
            <div className="absolute top-11 left-0 w-full h-1 bg-gray-100 -z-0"></div>

            {/* Active Progress Bar */}
            <div className="relative h-1 bg-gray-100 -mt-6 -z-10 rounded-full overflow-hidden mx-6 lg:mx-12">
                <motion.div
                    className="h-full bg-primary"
                    initial={{ width: "0%" }}
                    animate={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                />
            </div>
        </div>
    )
}
