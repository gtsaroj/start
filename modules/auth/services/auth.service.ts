import { User, IUser } from "../models/user.model"
import { connectToDatabase } from "@/lib/db"
import { SignJWT } from "jose"
import { Mongoose } from "mongoose"
import { string } from "zod"

export class AuthService {
    // Register new user
    static async register(userData: Partial<IUser>) {
        console.log("AuthService.register received:", { ...userData, password: userData.password ? "***" : "MISSING" })

        await connectToDatabase()

        const existingUser = await User.findOne({ email: userData.email })
        if (existingUser) {
            throw new Error("User already exists with this email")
        }

        const newUser = await User.create(userData)
        return newUser
    }

    // Update User Role
    static async updateRole(userId: string, newRole: "student" | "employer") {
        await connectToDatabase()

        const user = await User.findById(userId)
        if (!user) throw new Error("User not found")

        user.role = newRole
        await user.save()

        // Generate new token with updated role
        const token = await this.createToken(user)
        return { user, token }
    }

    // Login user
    static async login(email: string, password?: string) {
        await connectToDatabase()

        const user = await User.findOne({ email }).select("+password")

        if (!user) {
            throw new Error("Invalid credentials")
        }

        // If using credentials provider, check password
        if (user.provider === "credentials" && password) {
            const isMatch = await user.comparePassword(password)
            if (!isMatch) {
                throw new Error("Invalid credentials")
            }
        }

        return user
    }

    // Generate JWT Token
    static async createToken(user: IUser) {
        const secret = new TextEncoder().encode(process.env.JWT_SECRET)
        const token = await new SignJWT({
            userId: user._id.toString(),
            role: user.role,
            email: user.email
        })
            .setProtectedHeader({ alg: 'HS256' })
            .setExpirationTime('24h')
            .sign(secret)

        return token
    }

}
