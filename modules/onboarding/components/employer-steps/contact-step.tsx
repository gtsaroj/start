"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { CleanInput } from "@/components/ui/clean-input"
import { useOnboardingStore } from "../../hooks/use-onboarding-store"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import { Loader2 } from "lucide-react"

const contactSchema = z.object({
    location: z.string().min(2, "Location is required"),
    phone: z.string().min(10, "Phone number must be at least 10 digits"),
})

export function ContactStep() {
    const { employerData, updateEmployerData } = useOnboardingStore()
    const router = useRouter()
    const { toast } = useToast()
    const [isLoading, setIsLoading] = useState(false)

    const form = useForm<z.infer<typeof contactSchema>>({
        resolver: zodResolver(contactSchema),
        defaultValues: {
            location: employerData.location || "",
            phone: employerData.phone || "",
        },
    })

    async function onSubmit(values: z.infer<typeof contactSchema>) {
        setIsLoading(true)
        const finalData = { ...employerData, ...values }
        updateEmployerData(values)

        try {
            const response = await fetch("/api/profile/employer", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(finalData),
            })

            if (!response.ok) throw new Error("Failed to save profile")

            toast({ title: "Setup Complete", description: "Your company profile is ready." })
            router.push("/dashboard/employer")

        } catch (error) {
            toast({
                title: "Error",
                description: "Something went wrong. Please try again.",
                variant: "destructive"
            })
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="space-y-1">
                <h2 className="text-2xl font-semibold tracking-tight">Contact Information</h2>
                <p className="text-muted-foreground">How can candidates reach you?</p>
            </div>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                        control={form.control}
                        name="location"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Headquarters Location</FormLabel>
                                <FormControl>
                                    <CleanInput placeholder="Kathmandu, Nepal" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Phone Number</FormLabel>
                                <FormControl>
                                    <CleanInput placeholder="+977 9800000000" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button type="submit" className="w-full" disabled={isLoading}>
                        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Complete Setup
                    </Button>
                </form>
            </Form>
        </div>
    )
}
