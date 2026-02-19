"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { motion, HTMLMotionProps } from "framer-motion"

interface SelectablePillProps extends HTMLMotionProps<"button"> {
    selected?: boolean
    label: string
}

export function SelectablePill({ className, selected, label, ...props }: SelectablePillProps) {
    return (
        <motion.button
            type="button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            animate={{
                backgroundColor: selected ? "var(--primary-5)" : "#ffffff",
                borderColor: selected ? "var(--primary)" : "#e5e7eb",
                color: selected ? "var(--primary)" : "#4b5563",
            }}
            className={cn(
                "inline-flex items-center justify-center rounded-full border px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
                selected ? "shadow-sm" : "hover:bg-gray-50",
                className
            )}
            {...props}
        >
            {label}
        </motion.button>
    )
}
