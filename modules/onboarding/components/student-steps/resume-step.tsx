"use client"

import { Button } from "@/components/ui/button"
import { useState } from "react"
import { useOnboardingStore } from "../../hooks/use-onboarding-store"
import { useDropzone } from "react-dropzone"
import { UploadCloud, FileText, X, Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"

export function ResumeStep() {
    const { studentData, updateStudentData } = useOnboardingStore()
    const [file, setFile] = useState<File | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()
    const { toast } = useToast()

    const onDrop = (acceptedFiles: File[]) => {
        if (acceptedFiles.length > 0) {
            setFile(acceptedFiles[0])
            // In a real app, you'd upload this to S3/Cloudinary here and get a URL
            // For now, we'll simulate a URL
            updateStudentData({ cv: acceptedFiles[0], cvUrl: URL.createObjectURL(acceptedFiles[0]) })
        }
    }

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'application/pdf': ['.pdf'],
            'application/msword': ['.doc'],
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
        },
        maxFiles: 1
    })

    const handleSubmit = async () => {
        setIsLoading(true)
        try {
            // Construct the final data payload from store
            const finalData = {
                institution: studentData.institution,
                degree: studentData.degree,
                graduationYear: studentData.graduationYear,
                skills: studentData.skills,
                cvUrl: studentData.cvUrl || "https://example.com/demo-cv.pdf" // Fallback for demo
            }

            const response = await fetch("/api/profile/student", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(finalData)
            })

            if (!response.ok) throw new Error("Failed to create profile")

            toast({ title: "Profile Ready!", description: "Welcome to your student dashboard." })
            router.push("/dashboard/student")

        } catch (error) {
            toast({
                title: "Error",
                description: "Could not save profile. Try again.",
                variant: "destructive"
            })
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="space-y-1">
                <h2 className="text-2xl font-semibold tracking-tight">Upload your Resume</h2>
                <p className="text-muted-foreground">Let employers know your story.</p>
            </div>

            <div
                {...getRootProps()}
                className={`
          border-2 border-dashed rounded-lg p-10 text-center cursor-pointer transition-colors
          ${isDragActive ? 'border-primary bg-primary/5' : 'border-gray-200 hover:border-primary/50'}
        `}
            >
                <input {...getInputProps()} />
                <div className="flex flex-col items-center gap-4">
                    <div className="p-4 bg-blue-50 rounded-full text-primary">
                        <UploadCloud className="w-8 h-8" />
                    </div>
                    <div>
                        <p className="text-lg font-medium">Click or drag file to upload</p>
                        <p className="text-sm text-gray-500">PDF, DOC, DOCX up to 5MB</p>
                    </div>
                </div>
            </div>

            {file && (
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border">
                    <div className="flex items-center gap-3">
                        <FileText className="w-5 h-5 text-primary" />
                        <div>
                            <p className="text-sm font-medium">{file.name}</p>
                            <p className="text-xs text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                        </div>
                    </div>
                    <Button variant="ghost" size="icon" onClick={(e) => { e.stopPropagation(); setFile(null); }}>
                        <X className="w-4 h-4" />
                    </Button>
                </div>
            )}

            <Button className="w-full" disabled={!file && !studentData.cvUrl || isLoading} onClick={handleSubmit}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Finish Setup
            </Button>
        </div>
    )
}
