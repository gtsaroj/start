import mongoose, { Schema, Document, Model } from "mongoose"

export interface IEmployer extends Document {
    userId: mongoose.Types.ObjectId
    companyName: string
    industry: string
    size: string
    location: string
    phone: string
    website?: string
    createdAt: Date
    updatedAt: Date
}

const EmployerSchema = new Schema<IEmployer>(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
            unique: true,
        },
        companyName: {
            type: String,
            required: true,
        },
        industry: {
            type: String,
            required: true,
        },
        size: {
            type: String,
            required: true,
        },
        location: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
            required: true,
        },
        website: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
)

export const Employer: Model<IEmployer> = mongoose.models.Employer || mongoose.model<IEmployer>("Employer", EmployerSchema)
