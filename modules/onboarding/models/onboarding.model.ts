interface OnboardingUser {
    userId: string;
    phoneNumber: string
}


interface Employee extends OnboardingUser {
    companyName: string
    types: string[]
    size: number
    location: string
}