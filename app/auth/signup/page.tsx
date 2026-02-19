"use client"

import { AuthLayout } from "@/modules/auth/components/auth-layout"
import { RegisterForm } from "@/modules/auth/components/register-form"

export default function SignUpPage() {
  return (
    <AuthLayout
      title="Create an Account"
      subtitle="Choose your role to get started"
    >
      <RegisterForm />
    </AuthLayout>
  )
}
