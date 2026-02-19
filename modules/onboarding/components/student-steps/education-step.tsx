"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { StepWrapper } from "../step-wrapper"
import { useOnboardingStore } from "@/modules/onboarding/hooks/use-onboarding-store"
import { useForm } from "react-hook-form"

export function EducationStep() {
    const { nextStep, updateStudentData } = useOnboardingStore()
    const { register, handleSubmit } = useForm()

    const onSubmit = (data: any) => {
        updateStudentData({ education: [data] }) // Simplifying to single education for now
        nextStep()
    }

    return (
        <StepWrapper>
            <h2 className="text-2xl font-bold mb-6">Education Details</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-2">
                    <Label htmlFor="institution">University / College</Label>
                    <Input id="institution" placeholder="e.g. Tribhuvan University" {...register("institution")} required />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="degree">Degree</Label>
                        <Input id="degree" placeholder="e.g. BIT" {...register("degree")} required />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="year">Graduation Year</Label>
                        <Input id="year" placeholder="e.g. 2026" {...register("year")} required />
                    </div>
                </div>

                <div className="pt-4 flex justify-end">
                    <Button type="submit">Continue</Button>
                </div>
            </form>
        </StepWrapper>
    )
}
