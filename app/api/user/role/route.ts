import { NextRequest, NextResponse } from "next/server"
import { AuthService } from "@/modules/auth/services/auth.service"
import { cookies } from "next/headers"
import { jwtVerify } from "jose"

export async function PUT(req: NextRequest) {
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

        // 3. Get Role
        const body = await req.json()
        const { role } = body

        if (!['student', 'employer'].includes(role)) {
            return NextResponse.json({ error: "Invalid role" }, { status: 400 })
        }

        // 4. Update Role
        const result = await AuthService.updateRole(userId, role)

        // 5. Update Cookie with new token
        cookies().set('token', result.token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 60 * 60 * 24, // 24 hours
            path: '/',
        })

        return NextResponse.json(
            { message: "Role updated successfully", user: result.user },
            { status: 200 }
        )

    } catch (error) {
        console.error("Role Update Error:", error)
        return NextResponse.json({ error: error instanceof Error ? error.message : "Internal server error" }, { status: 500 })
    }
}
