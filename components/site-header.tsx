"use client"

import { Button } from "@/components/ui/button"
import { Briefcase } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { useEffect, useState } from "react"

export function SiteHeader() {
    const [scrolled, setScrolled] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20)
        }
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    return (
        <header className={cn(
            "fixed top-0 w-full z-50 transition-all duration-300",
            scrolled ? "bg-white/80 backdrop-blur-md border-b shadow-sm py-3" : "bg-transparent py-5"
        )}>
            <div className="container px-4 md:px-6 flex justify-between items-center">
                <Link href="/" className="flex items-center space-x-2 group">
                    <div className="bg-primary/10 p-2 rounded-lg group-hover:bg-primary/20 transition-colors">
                        <Briefcase className="h-6 w-6 text-primary" />
                    </div>
                    <span className="text-xl font-bold text-gray-900 tracking-tight">JobBridge<span className="text-primary">.Nepal</span></span>
                </Link>

                <nav className="hidden md:flex items-center space-x-8 text-sm font-medium text-gray-600">
                    <Link href="#features" className="hover:text-primary transition-colors">Features</Link>
                    <Link href="#jobs" className="hover:text-primary transition-colors">Find Jobs</Link>
                    <Link href="#employers" className="hover:text-primary transition-colors">For Employers</Link>
                </nav>

                <div className="flex items-center space-x-4">
                    <Link href="/auth/signin">
                        <Button variant="ghost" className="hidden sm:inline-flex text-gray-600 hover:text-primary hover:bg-blue-50">
                            Sign In
                        </Button>
                    </Link>
                    <Link href="/auth/signup">
                        <Button className="rounded-full shadow-lg shadow-blue-200/50 hover:shadow-blue-200 transaction-all">
                            Get Started
                        </Button>
                    </Link>
                </div>
            </div>
        </header>
    )
}
