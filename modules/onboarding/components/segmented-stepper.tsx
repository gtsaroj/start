"use client"

import { motion } from "framer-motion"

interface SegmentedStepperProps {
    totalSteps: number
    currentStep: number
}

export function SegmentedStepper({ totalSteps, currentStep }: SegmentedStepperProps) {
    return (
        <div className="flex gap-2 w-full max-w-sm mb-12">
            {Array.from({ length: totalSteps }).map((_, index) => (
                <div key={index} className="flex-1 h-1.5 rounded-full bg-gray-100 overflow-hidden relative">
                    {index <= currentStep && (
                        <motion.div
                            layoutId="stepper-fill"
                            className="absolute inset-0 bg-primary"
                            initial={{ x: "-100%" }}
                            animate={{ x: index < currentStep ? "0%" : index === currentStep ? "0%" : "-100%" }}
                            transition={{ duration: 0.5, ease: "circOut" }}
                        />
                    )}
                </div>
            ))}
        </div>
    )
}
