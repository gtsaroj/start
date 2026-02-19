import { Student, IStudent } from "@/modules/user/models/student.model"
import { Employer, IEmployer } from "@/modules/user/models/employer.model"
import { User } from "@/modules/auth/models/user.model"
import { connectToDatabase } from "@/lib/db"

export class OnboardingService {
    /**
     * Complete student onboarding by creating/updating student profile
     * @param userId - The user ID from the authenticated user
     * @param data - Student onboarding data (education, skills, cvUrl, portfolio)
     * @returns Updated student profile
     */
    static async completeStudentOnboarding(
        userId: string,
        data: {
            education?: Array<{
                institution?: string
                degree?: string
                graduationYear?: string
            }>
            skills: string[]
            cvUrl?: string
            portfolio?: string
        }
    ): Promise<IStudent> {
        await connectToDatabase()

        // Verify user exists and has student role
        const user = await User.findById(userId)
        if (!user) {
            throw new Error("User not found")
        }

        if (user.role !== "student") {
            throw new Error("Invalid role. Only students can complete student onboarding")
        }

        // Extract education data (handle array or single object)
        let institution = ""
        let degree = ""
        let graduationYear = ""

        if (data.education && Array.isArray(data.education) && data.education.length > 0) {
            const firstEducation = data.education[0] as { institution?: string; degree?: string; graduationYear?: string }
            institution = firstEducation?.institution || ""
            degree = firstEducation?.degree || ""
            graduationYear = firstEducation?.graduationYear || ""
        } else if (data.education && typeof data.education === 'object' && !Array.isArray(data.education)) {
            const educationObj = data.education as { institution?: string; degree?: string; graduationYear?: string }
            institution = educationObj?.institution || ""
            degree = educationObj?.degree || ""
            graduationYear = educationObj?.graduationYear || ""
        }

        // Validate required fields
        if (!institution || !degree || !graduationYear) {
            throw new Error("Education details (institution, degree, graduationYear) are required")
        }

        if (!data.skills || data.skills.length === 0) {
            throw new Error("At least one skill is required")
        }

        // Create or update student profile
        const studentProfile = await Student.findOneAndUpdate(
            { userId },
            {
                userId,
                institution,
                degree,
                graduationYear,
                skills: data.skills,
                cvUrl: data.cvUrl || undefined,
                portfolio: data.portfolio || undefined,
            },
            {
                new: true,
                upsert: true,
                runValidators: true,
            }
        )

        return studentProfile
    }

    /**
     * Complete employer onboarding by creating/updating employer profile
     * @param userId - The user ID from the authenticated user
     * @param data - Employer onboarding data (companyName, industry, size, location, phone, website)
     * @returns Updated employer profile
     */
    static async completeEmployerOnboarding(
        userId: string,
        data: {
            companyName: string
            industry: string
            size: string
            location: string
            phone?: string
            website?: string
        }
    ): Promise<IEmployer> {
        await connectToDatabase()

        // Verify user exists and has employer role
        const user = await User.findById(userId)
        if (!user) {
            throw new Error("User not found")
        }

        if (user.role !== "employer") {
            throw new Error("Invalid role. Only employers can complete employer onboarding")
        }

        // Validate required fields
        if (!data.companyName || !data.industry || !data.size || !data.location) {
            throw new Error("Company name, industry, size, and location are required")
        }

        // Create or update employer profile
        const employerProfile = await Employer.findOneAndUpdate(
            { userId },
            {
                userId,
                companyName: data.companyName,
                industry: data.industry,
                size: data.size,
                location: data.location,
                phone: data.phone || "",
                website: data.website || undefined,
            },
            {
                new: true,
                upsert: true,
                runValidators: true,
            }
        )

        return employerProfile
    }

    /**
     * Get student onboarding status
     * @param userId - The user ID
     * @returns Student profile if exists, null otherwise
     */
    static async getStudentOnboardingStatus(userId: string): Promise<IStudent | null> {
        await connectToDatabase()
        return await Student.findOne({ userId })
    }

    /**
     * Get employer onboarding status
     * @param userId - The user ID
     * @returns Employer profile if exists, null otherwise
     */
    static async getEmployerOnboardingStatus(userId: string): Promise<IEmployer | null> {
        await connectToDatabase()
        return await Employer.findOne({ userId })
    }
}

