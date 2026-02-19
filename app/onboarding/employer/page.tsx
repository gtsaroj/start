"use client"

import { useOnboardingStore } from "@/modules/onboarding/hooks/use-onboarding-store"
import { SidebarStepper } from "@/modules/onboarding/components/sidebar-stepper" // Correct import
import { CompanyInfoStep } from "@/modules/onboarding/components/employer-steps/company-info-step"
import { ContactStep } from "@/modules/onboarding/components/employer-steps/contact-step"
import { AnimatePresence } from "framer-motion"

export default function EmployerOnboardingPage() {
    const { currentStep } = useOnboardingStore()

    const steps = [
        { title: "Company Profile", subtitle: "Industry, size &w name" },
        { title: "Contact Details", subtitle: "Location & phone" },
        { title: "Team", subtitle: "Invite members" }, // Placeholder for future
        { title: "Review", subtitle: "Verify information" } // Placeholder
    ]

    // Only showing first 2 steps as active implementation used for now
    const displaySteps = steps.slice(0, 2)

    return (
        <div className="flex min-h-screen bg-gray-50">
            {/* Left Sidebar */}
            <aside className="w-80 bg-white border-r border-gray-100 hidden md:block pt-8 pl-12 fixed h-full z-20">
                <SidebarStepper steps={steps} currentStep={currentStep} />
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 md:ml-80">
                <div className="max-w-3xl mx-auto py-12 px-8">
                    {/* Mobile Stepper could go here if needed, keeping it desktop-first as per image */}

                    <div className="relative min-h-[600px]">
                        <AnimatePresence mode="wait">
                            {currentStep === 0 && <CompanyInfoStep key="company" />}
                            {currentStep === 1 && <ContactStep key="contact" />}
                        </AnimatePresence>
                    </div>
                </div>
            </main>
        </div>
    )
}
