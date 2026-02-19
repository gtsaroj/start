"use client"

import * as React from "react"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"

interface CleanSelectProps {
    placeholder?: string
    options: { value: string; label: string }[]
    value?: string
    onChange: (value: string) => void
    className?: string
}

export function CleanSelect({ placeholder, options, value, onChange, className }: CleanSelectProps) {
    return (
        <Select value={value} onValueChange={onChange}>
            <SelectTrigger
                className={cn(
                    "w-full border-0 border-b border-input rounded-none px-0 py-2 h-10 shadow-none focus:ring-0 focus:border-primary data-[placeholder]:text-muted-foreground",
                    className
                )}
            >
                <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
                {options.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                        {option.label}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    )
}
