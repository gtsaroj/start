"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { GraduationCap, Building2, ChevronRight, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"

export default function RoleSelectionPage() {
    const [selectedRole, setSelectedRole] = useState<"student" | "employer" | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()
    const { toast } = useToast()

    const handleContinue = async () => {
        if (!selectedRole) return

        setIsLoading(true)
        try {
            const response = await fetch("/api/user/role", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ role: selectedRole })
            })

            if (!response.ok) {
                const error = await response.json()
                throw new Error(error.error || "Failed to update role")
            }

            toast({
                title: "Role updated!",
                description: `Proceeding to ${selectedRole} onboarding...`
            })

            router.push(`/onboarding/${selectedRole}`)
        } catch (error) {
            toast({
                title: "Error",
                description: error instanceof Error ? error.message : "Something went wrong",
                variant: "destructive"
            })
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4">
            <div className="w-full max-w-4xl space-y-8">
                <div className="text-center space-y-4">
                    <h1 className="text-3xl md:text-5xl font-bold text-gray-900 tracking-tight">
                        How will you use JobBridge?
                    </h1>
                    <p className="text-xl text-gray-500 max-w-2xl mx-auto">
                        Select your account type to personalize your experience.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mt-12">
                    {/* Student Card */}
                    <Card
                        className={`
                            relative overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-xl border-2 p-8
                            ${selectedRole === 'student' ? 'border-primary bg-blue-50/50' : 'border-transparent hover:border-gray-200'}
                        `}
                        onClick={() => setSelectedRole("student")}
                    >
                        <div className="flex flex-col items-center text-center space-y-4 relative z-10">
                            <div className={`p-4 rounded-full ${selectedRole === 'student' ? 'bg-primary text-white' : 'bg-blue-100 text-primary'}`}>
                                <GraduationCap className="w-8 h-8 md:w-12 md:h-12" />
                            </div>
                            <h3 className="text-2xl font-bold">I am a Student</h3>
                            <p className="text-gray-500">
                                Find internships, part-time jobs, and kickstart your career.
                            </p>
                        </div>
                    </Card>

                    {/* Employer Card */}
                    <Card
                        className={`
                            relative overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-xl border-2 p-8
                            ${selectedRole === 'employer' ? 'border-primary bg-blue-50/50' : 'border-transparent hover:border-gray-200'}
                        `}
                        onClick={() => setSelectedRole("employer")}
                    >
                        <div className="flex flex-col items-center text-center space-y-4 relative z-10">
                            <div className={`p-4 rounded-full ${selectedRole === 'employer' ? 'bg-primary text-white' : 'bg-blue-100 text-primary'}`}>
                                <Building2 className="w-8 h-8 md:w-12 md:h-12" />
                            </div>
                            <h3 className="text-2xl font-bold">I am an Employer</h3>
                            <p className="text-gray-500">
                                Post jobs, manage applications, and hire top talent.
                            </p>
                        </div>
                    </Card>
                </div>

                <div className="flex justify-center pt-8">
                    <Button
                        size="lg"
                        className="text-lg px-12 py-6 rounded-full font-bold shadow-lg shadow-primary/20 transition-all hover:scale-105"
                        disabled={!selectedRole || isLoading}
                        onClick={handleContinue}
                    >
                        {isLoading && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
                        Continue
                        {!isLoading && <ChevronRight className="ml-2 h-5 w-5" />}
                    </Button>
                </div>
            </div>
        </div>
    )
}
