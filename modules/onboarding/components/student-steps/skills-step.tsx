"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { StepWrapper } from "../step-wrapper"
import { useOnboardingStore } from "@/modules/onboarding/hooks/use-onboarding-store"
import { useState } from "react"
import { X, Plus } from "lucide-react"

export function SkillsStep() {
    const { nextStep, prevStep, updateStudentData, studentData } = useOnboardingStore()
    const [skillInput, setSkillInput] = useState("")
    const [skills, setSkills] = useState<string[]>(studentData.skills || [])

    const addSkill = () => {
        if (skillInput.trim() && !skills.includes(skillInput.trim())) {
            setSkills([...skills, skillInput.trim()])
            setSkillInput("")
        }
    }

    const removeSkill = (skillToRemove: string) => {
        setSkills(skills.filter(s => s !== skillToRemove))
    }

    const handleContinue = () => {
        updateStudentData({ skills })
        nextStep()
    }

    return (
        <StepWrapper>
            <h2 className="text-2xl font-bold mb-2">Skills & Interests</h2>
            <p className="text-gray-500 mb-6">Add skills to help us match you with the right jobs.</p>

            <div className="space-y-6">
                <div className="space-y-2">
                    <Label>Add Skills (e.g. React, Python, Accounting)</Label>
                    <div className="flex gap-2">
                        <Input
                            value={skillInput}
                            onChange={(e) => setSkillInput(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && addSkill()}
                            placeholder="Type a skill and press Enter"
                        />
                        <Button type="button" onClick={addSkill} variant="secondary">
                            <Plus className="h-4 w-4" />
                        </Button>
                    </div>
                </div>

                <div className="flex flex-wrap gap-2 min-h-[100px] border rounded-lg p-4 bg-gray-50">
                    {skills.length === 0 && (
                        <span className="text-gray-400 text-sm">No skills added yet.</span>
                    )}
                    {skills.map(skill => (
                        <div key={skill} className="bg-white border rounded-full px-3 py-1 text-sm flex items-center shadow-sm">
                            {skill}
                            <button onClick={() => removeSkill(skill)} className="ml-2 text-gray-400 hover:text-red-500">
                                <X className="h-3 w-3" />
                            </button>
                        </div>
                    ))}
                </div>

                <div className="pt-4 flex justify-between">
                    <Button variant="outline" onClick={prevStep}>Back</Button>
                    <Button onClick={handleContinue} disabled={skills.length === 0}>Continue</Button>
                </div>
            </div>
        </StepWrapper>
    )
}
