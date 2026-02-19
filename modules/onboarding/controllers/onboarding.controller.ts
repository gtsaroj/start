import { NextRequest, NextResponse } from "next/server";
import z from "zod";
import { OnboardingService } from "../services/onboarding.service";

const studentOnboardingSchema = z.object({
    institution: z.string().optional(),
    degree: z.string().optional(),
    graduationYear: z.string().optional(),
    education: z.array(z.any()),
    skills: z.array(z.string()),
    cvUrl: z.string().optional(),
    portfolio: z.string().optional(),
})

const employerOnboardingSchema = z.object({
    companyName: z.string(),
    industry: z.string(),
    size: z.string(),
    location: z.string(),
    phone: z.string().optional(),
    website: z.string().optional(),
})

export class OnboardingController {
    static async studentOnboarding(req: NextRequest) {
        try {
            const { searchParams } = new URL(req.url)
            const userId = searchParams.get("id") as string

            if (!userId) {
                return NextResponse.json(
                    { error: "User ID is required" },
                    { status: 400 }
                )
            }

            const { education, skills, cvUrl, portfolio } = await req.json()
            const validation = studentOnboardingSchema.safeParse({ education, skills, cvUrl, portfolio })
            
            if (!validation.success) {
                return NextResponse.json(
                    { error: validation.error.issues.map(issue => issue.message).join(", ") },
                    { status: 400 }
                )
            }

            // Call service to complete onboarding
            const studentProfile = await OnboardingService.completeStudentOnboarding(userId, {
                education,
                skills,
                cvUrl,
                portfolio,
            })

            return NextResponse.json(
                {
                    message: "Student onboarding completed successfully",
                    profile: studentProfile,
                },
                { status: 200 }
            )
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Internal server error"
            return NextResponse.json(
                { error: errorMessage },
                { status: errorMessage.includes("not found") ? 404 : 500 }
            )
        }
    }

    static async employerOnboarding(req: NextRequest) {
        try {
            const { searchParams } = new URL(req.url)
            const userId = searchParams.get("id") as string

            if (!userId) {
                return NextResponse.json(
                    { error: "User ID is required" },
                    { status: 400 }
                )
            }

            const { companyName, industry, size, location, phone, website } = await req.json()
            const validation = employerOnboardingSchema.safeParse({ companyName, industry, size, location, phone, website })
            
            if (!validation.success) {
                return NextResponse.json(
                    { error: validation.error.issues.map(issue => issue.message).join(", ") },
                    { status: 400 }
                )
            }

            // Call service to complete onboarding
            const employerProfile = await OnboardingService.completeEmployerOnboarding(userId, {
                companyName,
                industry,
                size,
                location,
                phone,
                website,
            })

            return NextResponse.json(
                {
                    message: "Employer onboarding completed successfully",
                    profile: employerProfile,
                },
                { status: 200 }
            )
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Internal server error"
            return NextResponse.json(
                { error: errorMessage },
                { status: errorMessage.includes("not found") ? 404 : 500 }
            )
        }
    }
}


