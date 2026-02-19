import { Student, IStudent } from "../models/student.model"
import { Employer, IEmployer } from "../models/employer.model"
import { User, IUser } from "@/modules/auth/models/user.model"
import { connectToDatabase } from "@/lib/db"
import mongoose from "mongoose"

export class UserService {
    static async createStudentProfile(userId: string, data: Partial<IStudent>) {
        await connectToDatabase()

        // Ensure user exists
        const user = await User.findById(userId)
        if (!user) throw new Error("User not found")
        if (user.role !== 'student') throw new Error("Invalid role for student profile")

        // Create or Update
        const profile = await Student.findOneAndUpdate(
            { userId },
            { ...data, userId },
            { new: true, upsert: true }
        )
        return profile
    }

    static async createEmployerProfile(userId: string, data: Partial<IEmployer>) {
        await connectToDatabase()

        const user = await User.findById(userId)
        if (!user) throw new Error("User not found")
        if (user.role !== 'employer') throw new Error("Invalid role for employer profile")

        const profile = await Employer.findOneAndUpdate(
            { userId },
            { ...data, userId },
            { new: true, upsert: true }
        )
        return profile
    }
}
