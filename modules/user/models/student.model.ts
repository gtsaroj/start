import mongoose, { Schema, Document, Model } from "mongoose"

export interface IStudent extends Document {
    userId: mongoose.Types.ObjectId
    institution: string
    degree: string
    graduationYear: string
    skills: string[]
    cvUrl?: string
    portfolio?: string
    createdAt: Date
    updatedAt: Date
}

const StudentSchema = new Schema<IStudent>(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
            unique: true,
        },
        institution: {
            type: String,
            required: true,
        },
        degree: {
            type: String,
            required: true,
        },
        graduationYear: {
            type: String,
            required: true,
        },
        skills: {
            type: [String],
            default: [],
        },
        cvUrl: {
            type: String,
        },
        portfolio: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
)

export const Student: Model<IStudent> = mongoose.models.Student || mongoose.model<IStudent>("Student", StudentSchema)
