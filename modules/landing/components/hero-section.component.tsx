"use client"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { ArrowRight, Briefcase, GraduationCap } from "lucide-react"
import Link from "next/link"

export function HeroSection() {
    return (
        <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 to-white pt-24 pb-20 lg:pt-32 lg:pb-28">
            <div className="container px-4 md:px-6 relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        className="flex-1 text-center lg:text-left"
                    >
                        <div className="inline-flex items-center rounded-full border px-3 py-1 text-sm font-medium text-primary shadow-sm bg-white mb-6">
                            <span className="flex h-2 w-2 rounded-full bg-primary mr-2"></span>
                            #1 Job Platform for Students in Nepal
                        </div>
                        <h1 className="text-4xl lg:text-6xl font-extrabold tracking-tight text-gray-900 mb-6 leading-[1.15]">
                            Kickstart Your Career with <span className="text-primary bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">Dream Opportunities</span>
                        </h1>
                        <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                            JobBridge Nepal connects talented students with top employers for verified internships,
                            part-time jobs, and entry-level positions. Build your future today.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                            <Link href="/auth/signup?role=student">
                                <Button size="lg" className="w-full sm:w-auto text-lg h-12 px-8 rounded-full shadow-lg shadow-blue-200 hover:shadow-xl transition-all">
                                    I&apos;m a Student <ArrowRight className="ml-2 h-5 w-5" />
                                </Button>
                            </Link>
                            <Link href="/auth/signup?role=employer">
                                <Button variant="outline" size="lg" className="w-full sm:w-auto text-lg h-12 px-8 rounded-full hover:bg-gray-50">
                                    Post a Job
                                </Button>
                            </Link>
                        </div>

                        <div className="mt-10 flex items-center justify-center lg:justify-start gap-6 text-sm text-gray-500">
                            <div className="flex items-center gap-2">
                                <div className="h-2 w-2 rounded-full bg-green-500"></div>
                                500+ New Jobs
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                                Verified Employers
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="flex-1 relative"
                    >
                        <div className="relative z-10 bg-white rounded-2xl shadow-2xl p-6 border border-gray-100 max-w-md mx-auto transform rotate-2 hover:rotate-0 transition-transform duration-500">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                                    <Briefcase className="h-6 w-6 text-primary" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg">Junior Frontend Developer</h3>
                                    <p className="text-gray-500 text-sm">TechCorp Nepal • Kathmandu</p>
                                </div>
                                <div className="ml-auto">
                                    <span className="bg-green-100 text-green-700 text-xs font-medium px-2.5 py-0.5 rounded-full">Active</span>
                                </div>
                            </div>
                            <div className="space-y-3 mb-6">
                                <div className="h-2 bg-gray-100 rounded w-3/4"></div>
                                <div className="h-2 bg-gray-100 rounded w-full"></div>
                                <div className="h-2 bg-gray-100 rounded w-5/6"></div>
                            </div>
                            <div className="flex gap-3">
                                <div className="flex-1 bg-gray-50 rounded-lg p-3 text-center">
                                    <div className="text-sm font-bold text-gray-900">Rs. 25k</div>
                                    <div className="text-xs text-gray-500">Salary</div>
                                </div>
                                <div className="flex-1 bg-gray-50 rounded-lg p-3 text-center">
                                    <div className="text-sm font-bold text-gray-900">Remote</div>
                                    <div className="text-xs text-gray-500">Type</div>
                                </div>
                            </div>
                            <Button className="w-full mt-6 rounded-xl">Apply Now</Button>
                        </div>

                        {/* Decorative elements */}
                        <div className="absolute top-10 -right-4 h-24 w-24 bg-yellow-100 rounded-full blur-xl opacity-60 animate-pulse"></div>
                        <div className="absolute -bottom-6 -left-6 h-32 w-32 bg-blue-100 rounded-full blur-xl opacity-60"></div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
