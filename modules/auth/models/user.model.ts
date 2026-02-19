import mongoose, { Schema, Document, Model } from "mongoose"
import bcrypt from "bcryptjs"

export interface IUser extends Document {
    name: string
    email: string
    password?: string
    role: "student" | "employer" | "admin" | "user"
    image?: string
    provider?: string
    createdAt: Date
    updatedAt: Date
    comparePassword(candidatePassword: string): Promise<boolean>
}

const UserSchema = new Schema<IUser>(
    {
        name: {
            type: String,
            required: [true, "Name is required"],
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            trim: true,
            lowercase: true,
        },
        password: {
            type: String,
            select: false, // Don't return password by default
        },
        role: {
            type: String,
            enum: ["student", "employer", "admin", "user"],
            default: "user",
        },
        image: String,
        provider: {
            type: String,
            default: "credentials"
        }
    },
    {
        timestamps: true,
    }
)

// Hash password before saving
UserSchema.pre("save", async function (next) {
    if (!this.isModified("password") || !this.password) {
        return next()
    }

    try {
        const salt = await bcrypt.genSalt(10)
        this.password = await bcrypt.hash(this.password, salt)
        next()
    } catch (error) {
        return next(error as Error)
    }
})

// Method to compare password
UserSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
    if (!this.password) return false
    return bcrypt.compare(candidatePassword, this.password)
}

// Check if model exists before compiling to avoid OverwriteModelError in Next.js hot reload
export const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>("User", UserSchema)
