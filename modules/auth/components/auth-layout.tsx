"use client"

import Link from "next/link"
import { Briefcase } from "lucide-react"
import { motion } from "framer-motion"

interface AuthLayoutProps {
    children: React.ReactNode
    title: string
    subtitle: string
    image?: string
}

export function AuthLayout({ children, title, subtitle }: AuthLayoutProps) {
    return (
        <div className="flexmin-h-screen grid lg:grid-cols-2 min-h-screen">
            {/* Visual Sidebar */}
            <div className="hidden lg:flex relative bg-zinc-900 flex-col text-white p-10 justify-between overflow-hidden">
                <div className="absolute inset-0 bg-primary opacity-90 z-0"></div>
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1521737711867-e3b97375f902?q=80&w=2787&auto=format&fit=crop')] bg-cover bg-center mix-blend-overlay opacity-50 z-0"></div>

                {/* Animated Shapes */}
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
                    className="absolute -top-24 -left-24 w-96 h-96 bg-white opacity-10 rounded-[3rem] z-0 blur-3xl"
                />
                <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                    className="absolute top-1/2 -right-24 w-80 h-80 bg-blue-300 opacity-20 rounded-full z-0 blur-3xl"
                />

                <div className="relative z-10 flex items-center space-x-2">
                    <div className="p-2 bg-white/20 backdrop-blur-sm rounded-lg">
                        <Briefcase className="h-6 w-6 text-white" />
                    </div>
                    <span className="text-2xl font-bold tracking-tight">JobBridge Nepal</span>
                </div>

                <div className="relative z-10 max-w-md">
                    <blockquote className="space-y-2">
                        <p className="text-xl font-medium leading-relaxed">
                            &ldquo;This platform helped me secure my first internship within weeks. The verification process gave me confidence in every application I sent.&rdquo;
                        </p>
                        <footer className="text-sm opacity-80 pt-4">
                            <div className="font-semibold">Aarav Shrestha</div>
                            <div>Computer Engineering Student</div>
                        </footer>
                    </blockquote>
                </div>

                <div className="relative z-10 text-sm opacity-70">
                    &copy; 2026 JobBridge Nepal. All rights reserved.
                </div>
            </div>

            {/* Form Area */}
            <div className="flex flex-col justify-center items-center p-6 lg:p-10 bg-white">
                <div className="w-full max-w-sm space-y-6">
                    <div className="flex flex-col space-y-2 text-center">
                        <h1 className="text-3xl font-bold tracking-tighter text-gray-900">{title}</h1>
                        <p className="text-sm text-muted-foreground">{subtitle}</p>
                    </div>

                    {children}

                </div>
            </div>
        </div>
    )
}
