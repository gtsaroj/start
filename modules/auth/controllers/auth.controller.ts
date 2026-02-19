import { NextRequest, NextResponse } from "next/server"
import { AuthService } from "../services/auth.service"
import { z } from "zod"
import { cookies } from "next/headers"

const registerSchema = z.object({
    name: z.string().min(2),
    email: z.string().email(),
    password: z.string().min(6),
})

const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
})

export class AuthController {
    // Handle Register Request
    static async register(req: NextRequest) {
        try {
            const body = await req.json()

            // Validate input
            const validation = registerSchema.safeParse(body)
            if (!validation.success) {
                return NextResponse.json(
                    { error: "Validation failed", details: validation.error.format() },
                    { status: 400 }
                )
            }

            const user = await AuthService.register(validation.data)
            const token = await AuthService.createToken(user)

            // Set Cookie
            cookies().set('token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 60 * 60 * 24, // 24 hours
                path: '/',
            })

            return NextResponse.json(
                {
                    message: "User registered successfully",
                    user: {
                        id: user._id,
                        name: user.name,
                        email: user.email,
                        role: user.role
                    }
                },
                { status: 201 }
            )
        } catch (error) {
            const message = error instanceof Error ? error.message : "Internal server error"
            const status = message === "User already exists with this email" ? 409 : 500

            return NextResponse.json({ error: message }, { status })
        }
    }

    // Handle Login Request
    static async login(req: NextRequest) {
        try {
            const body = await req.json()

            const validation = loginSchema.safeParse(body)
            if (!validation.success) {
                return NextResponse.json(
                    { error: "Validation failed" },
                    { status: 400 }
                )
            }

            const user = await AuthService.login(validation.data.email, validation.data.password)
            const token = await AuthService.createToken(user)

            // Set Cookie
            cookies().set('token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 60 * 60 * 24, // 24 hours
                path: '/',
            })

            return NextResponse.json(
                {
                    message: "Login successful",
                    user: {
                        id: user._id,
                        name: user.name,
                        email: user.email,
                        role: user.role
                    }
                },
                { status: 200 }
            )

        } catch (error) {
            const message = error instanceof Error ? error.message : "Internal server error"
            const status = message === "Invalid credentials" ? 401 : 500

            return NextResponse.json({ error: message }, { status })
        }
    }
}
