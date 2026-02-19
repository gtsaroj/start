"use client"

import { AuthLayout } from "@/modules/auth/components/auth-layout"
import { LoginForm } from "@/modules/auth/components/login-form"

export default function SignInPage() {
  return (
    <AuthLayout
      title="Welcome Back"
      subtitle="Enter your credentials to access your account"
    >
      <LoginForm />
    </AuthLayout>
  )
}
