"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, Building2, GraduationCap, ShieldCheck } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

export function RoleSelection() {
    return (
        <section className="py-24 bg-white relative overflow-hidden">
            <div className="container px-4 md:px-6 relative z-10">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-4">
                        Who Are You?
                    </h2>
                    <p className="text-lg text-gray-600">
                        Tailored experiences for everyone in the ecosystem.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                    <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
                        <Card className="h-full border-2 border-transparent hover:border-blue-100 shadow-sm hover:shadow-xl transition-all">
                            <CardHeader className="text-center pt-8">
                                <div className="h-16 w-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <GraduationCap className="h-8 w-8 text-primary" />
                                </div>
                                <CardTitle className="text-xl mb-2">Student</CardTitle>
                                <CardDescription>
                                    Find internships, part-time jobs, and build your career profile.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="pb-8 text-center">
                                <Link href="/auth/signup?role=student">
                                    <Button variant="outline" className="w-full border-blue-200 text-blue-700 hover:bg-blue-50 hover:text-blue-800">
                                        Join as Student <ArrowRight className="ml-2 h-4 w-4" />
                                    </Button>
                                </Link>
                            </CardContent>
                        </Card>
                    </motion.div>

                    <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
                        <Card className="h-full border-2 border-transparent hover:border-green-100 shadow-sm hover:shadow-xl transition-all">
                            <CardHeader className="text-center pt-8">
                                <div className="h-16 w-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Building2 className="h-8 w-8 text-green-600" />
                                </div>
                                <CardTitle className="text-xl mb-2">Employer</CardTitle>
                                <CardDescription>
                                    Post jobs, manage applications, and hire top student talent.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="pb-8 text-center">
                                <Link href="/auth/signup?role=employer">
                                    <Button variant="outline" className="w-full border-green-200 text-green-700 hover:bg-green-50 hover:text-green-800">
                                        Hire Talent <ArrowRight className="ml-2 h-4 w-4" />
                                    </Button>
                                </Link>
                            </CardContent>
                        </Card>
                    </motion.div>

                    <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
                        <Card className="h-full border-2 border-transparent hover:border-purple-100 shadow-sm hover:shadow-xl transition-all">
                            <CardHeader className="text-center pt-8">
                                <div className="h-16 w-16 bg-purple-50 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <ShieldCheck className="h-8 w-8 text-purple-600" />
                                </div>
                                <CardTitle className="text-xl mb-2">Institution</CardTitle>
                                <CardDescription>
                                    Monitor student placements and manage campus recruitment.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="pb-8 text-center">
                                <Link href="/auth/signup?role=admin">
                                    <Button variant="outline" className="w-full border-purple-200 text-purple-700 hover:bg-purple-50 hover:text-purple-800">
                                        Partner With Us <ArrowRight className="ml-2 h-4 w-4" />
                                    </Button>
                                </Link>
                            </CardContent>
                        </Card>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
