"use client"

import { Check } from "lucide-react"
import { motion } from "framer-motion"

interface SidebarStepperProps {
    steps: { title: string; subtitle?: string }[]
    currentStep: number
}

export function SidebarStepper({ steps, currentStep }: SidebarStepperProps) {
    return (
        <div className="flex flex-col gap-8 w-64 pt-20">
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-primary flex items-center gap-2">
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-lg">G</div>
                    StartGlobal
                </h1>
            </div>

            <div className="flex flex-col gap-6 relative">
                {/* Vertical Line */}
                <div className="absolute left-3 top-2 bottom-2 w-px bg-gray-200 -z-10" />

                {steps.map((step, index) => {
                    const isCompleted = index < currentStep
                    const isCurrent = index === currentStep

                    return (
                        <div key={index} className="flex items-start gap-4">
                            <div
                                className={`
                    w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold border z-10 transition-colors duration-300 mt-0.5
                    ${isCompleted ? "bg-green-500 border-green-500 text-white" : ""}
                    ${isCurrent ? "bg-blue-600 border-blue-600 text-white" : ""}
                    ${!isCompleted && !isCurrent ? "bg-white border-gray-300 text-gray-400" : ""}
                `}
                            >
                                {isCompleted ? <Check className="w-3.5 h-3.5" /> : index + 1}
                            </div>

                            <div className="flex flex-col transition-colors duration-300">
                                <span className={`text-sm font-semibold uppercase tracking-wider ${isCurrent ? "text-blue-600" : isCompleted ? "text-green-600" : "text-gray-400"}`}>
                                    {step.title}
                                </span>
                                {isCurrent && step.subtitle && (
                                    <motion.span
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: "auto" }}
                                        className="text-xs text-gray-500 mt-1"
                                    >
                                        {step.subtitle}
                                    </motion.span>
                                )}
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
