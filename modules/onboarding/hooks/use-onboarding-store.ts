import { create } from 'zustand'

interface OnboardingState {
    currentStep: number
    studentData: {
        institution?: string
        degree?: string
        graduationYear?: string
        education: any[]
        skills: string[]
        cv: File | null
        cvUrl?: string
        portfolio?: string
    }
    employerData: {
        companyName: string
        industry: string
        size: string
        location: string
        phone?: string
        website?: string
    }

    // Actions
    nextStep: () => void
    prevStep: () => void
    setStep: (step: number) => void
    updateStudentData: (data: Partial<OnboardingState['studentData']>) => void
    updateEmployerData: (data: Partial<OnboardingState['employerData']>) => void
    reset: () => void
}

export const useOnboardingStore = create<OnboardingState>((set) => ({
    currentStep: 0,
    studentData: {
        education: [],
        skills: [],
        cv: null
    },
    employerData: {
        companyName: '',
        industry: '',
        size: '',
        location: ''
    },

    nextStep: () => set((state) => ({ currentStep: state.currentStep + 1 })),
    prevStep: () => set((state) => ({ currentStep: Math.max(0, state.currentStep - 1) })),
    setStep: (step) => set({ currentStep: step }),

    updateStudentData: (data) => set((state) => ({
        studentData: { ...state.studentData, ...data }
    })),

    updateEmployerData: (data) => set((state) => ({
        employerData: { ...state.employerData, ...data }
    })),

    reset: () => set({ currentStep: 0 })
}))
