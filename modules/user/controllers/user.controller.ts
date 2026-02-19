import { NextRequest, NextResponse } from "next/server"
import { UserService } from "../services/user.service"
import { cookies } from "next/headers"
import { jwtVerify } from "jose"

export class UserController {
    static async onboarding(req: NextRequest) {
        try {
            // 1. Get Token
            const token = cookies().get('token')?.value
            if (!token) {
                return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
            }

            // 2. Verify Token
            const secret = new TextEncoder().encode(process.env.JWT_SECRET)
            const { payload } = await jwtVerify(token, secret)
            const userId = payload.userId as string
            const role = payload.role as string

            // 3. Process Data based on Role
            const body = await req.json()

            let profile;
            if (role === 'student') {
                profile = await UserService.createStudentProfile(userId, body)
            } else if (role === 'employer') {
                profile = await UserService.createEmployerProfile(userId, body)
            } else {
                return NextResponse.json({ error: "Invalid role for onboarding" }, { status: 400 })
            }

            return NextResponse.json(
                { message: "Profile setup complete", profile },
                { status: 200 } // 200 OK (update/create)
            )

        } catch (error) {
            console.error("Onboarding Error:", error)
            const message = error instanceof Error ? error.message : "Internal server error"
            // Handle known errors (like duplicate key) differently if needed
            return NextResponse.json({ error: message }, { status: 500 })
        }
    }

    static async updateStudentProfile(req: NextRequest) {
        try {
            const token = cookies().get('token')?.value
            if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

            const secret = new TextEncoder().encode(process.env.JWT_SECRET)
            const { payload } = await jwtVerify(token, secret)
            const userId = payload.userId as string

            const body = await req.json()
            const profile = await UserService.createStudentProfile(userId, body)

            return NextResponse.json({ message: "Student profile updated", profile })
        } catch (error) {
            return NextResponse.json({ error: error instanceof Error ? error.message : "Error" }, { status: 500 })
        }
    }

    static async updateEmployerProfile(req: NextRequest) {
        try {
            const token = cookies().get('token')?.value
            if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

            const secret = new TextEncoder().encode(process.env.JWT_SECRET)
            const { payload } = await jwtVerify(token, secret)
            const userId = payload.userId as string

            const body = await req.json()
            const profile = await UserService.createEmployerProfile(userId, body)

            return NextResponse.json({ message: "Employer profile updated", profile })
        } catch (error) {
            return NextResponse.json({ error: error instanceof Error ? error.message : "Error" }, { status: 500 })
        }
    }
}
