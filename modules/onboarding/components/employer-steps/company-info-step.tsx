"use client"

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
import { CleanSelect } from "@/components/ui/clean-select" // Imported CleanSelect
import { SelectablePill } from "@/components/ui/selectable-pill"
import { useOnboardingStore } from "../../hooks/use-onboarding-store"
import { SegmentedStepper } from "../segmented-stepper"
import { motion } from "framer-motion"

const companyInfoSchema = z.object({
    companyName: z.string().min(2, "Company name is required"),
    industry: z.string().min(1, "Please select an industry"),
    size: z.string().min(1, "Please select company size"),
})

const INDUSTRIES = [
    "Tech & Software", "Finance", "Healthcare", "Education",
    "E-commerce", "Agency", "Consulting", "Other"
]

const SIZES = [
    { value: "1-10", label: "1-10 (Startup)" },
    { value: "11-50", label: "11-50" },
    { value: "51-200", label: "51-200" },
    { value: "201-500", label: "201-500" },
    { value: "500+", label: "500+ (Enterprise)" }
]

export function CompanyInfoStep() {
    const { employerData, updateEmployerData, nextStep } = useOnboardingStore()

    const form = useForm<z.infer<typeof companyInfoSchema>>({
        resolver: zodResolver(companyInfoSchema),
        defaultValues: {
            companyName: employerData.companyName || "",
            industry: employerData.industry || "",
            size: employerData.size || "",
        },
    })

    function onSubmit(values: z.infer<typeof companyInfoSchema>) {
        updateEmployerData(values)
        nextStep()
    }

    // Animation variants
    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    }

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    }

    return (
        <div className="max-w-xl mx-auto py-10">

            <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="space-y-8"
            >
                <motion.div variants={item} className="space-y-1">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900">Tell us about your company</h2>
                    <p className="text-gray-500 text-lg">Workspaces are shared environments where teams can collaborate.</p>
                </motion.div>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

                        {/* Industry - Pills */}
                        <motion.div variants={item} className="space-y-4">
                            <FormField
                                control={form.control}
                                name="industry"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-base font-medium">What kind of company are you?</FormLabel>
                                        <FormControl>
                                            <div className="flex flex-wrap gap-3">
                                                {INDUSTRIES.map((industry) => (
                                                    <SelectablePill
                                                        key={industry}
                                                        label={industry}
                                                        selected={field.value === industry}
                                                        onClick={() => field.onChange(industry)}
                                                    />
                                                ))}
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </motion.div>

                        {/* Company Name & Size */}
                        <motion.div variants={item} className="grid gap-8">
                            <FormField
                                control={form.control}
                                name="companyName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-base">Company Name</FormLabel>
                                        <FormControl>
                                            <CleanInput placeholder="e.g. Stripe Inc." {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="size"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-base">How large is your company?</FormLabel>
                                        <FormControl>
                                            <CleanSelect
                                                options={SIZES}
                                                placeholder="Select employee count"
                                                value={field.value}
                                                onChange={field.onChange}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </motion.div>

                        <motion.div variants={item}>
                            <Button type="submit" size="lg" className="w-full bg-black text-white hover:bg-gray-800 rounded-full h-12 text-base font-medium">
                                Continue
                            </Button>
                        </motion.div>
                    </form>
                </Form>
            </motion.div>
        </div >
    )
}
