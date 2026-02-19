"use client"

import { useOnboardingStore } from "@/modules/onboarding/hooks/use-onboarding-store"
import { Stepper } from "@/modules/onboarding/components/stepper"
import { EducationStep } from "@/modules/onboarding/components/student-steps/education-step"
import { SkillsStep } from "@/modules/onboarding/components/student-steps/skills-step"
import { ResumeStep } from "@/modules/onboarding/components/student-steps/resume-step"
import { AnimatePresence } from "framer-motion"

export default function StudentOnboardingPage() {
    const { currentStep } = useOnboardingStore()
    const steps = ["Education", "Skills", "Resume"]

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4">
            <div className="max-w-3xl mx-auto space-y-8">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-gray-900">Complete Your Profile</h1>
                    <p className="text-gray-500 mt-2">Let&apos;s get you ready for top opportunities.</p>
                </div>

                <Stepper steps={steps} currentStep={currentStep} />

                <div className="relative">
                    <AnimatePresence mode="wait">
                        {currentStep === 0 && <EducationStep key="education" />}
                        {currentStep === 1 && <SkillsStep key="skills" />}
                        {currentStep === 2 && <ResumeStep key="resume" />}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    )
}
