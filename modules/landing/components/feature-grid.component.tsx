import { Star, Users, Building2, TrendingUp } from "lucide-react"

export function FeatureGrid() {
    const features = [
        {
            icon: Star,
            title: "Verified Opportunities",
            description: "Every job and internship is verified by our team and school admins to ensure safety and quality.",
            color: "text-blue-600",
            bg: "bg-blue-100"
        },
        {
            icon: TrendingUp,
            title: "Smart Matching",
            description: "Our AI-powered engine connects you with jobs that match your skills, schedule, and career goals.",
            color: "text-green-600",
            bg: "bg-green-100"
        },
        {
            icon: Building2,
            title: "Top Employers",
            description: "Connect with Nepal's leading companies, startups, and organizations offering growth opportunities.",
            color: "text-purple-600",
            bg: "bg-purple-100"
        },
        {
            icon: Users,
            title: "Community Focused",
            description: "Join a thriving community of students and alumni sharing experiences and career advice.",
            color: "text-orange-600",
            bg: "bg-orange-100"
        }
    ]

    return (
        <section className="py-24 bg-white">
            <div className="container px-4 md:px-6">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-4">
                        Why Choose JobBridge?
                    </h2>
                    <p className="text-lg text-gray-600">
                        We are more than just a job board. We are your partner in building a successful career from day one.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, index) => (
                        <div key={index} className="group p-6 rounded-2xl border border-gray-100 hover:border-blue-100 hover:shadow-lg transition-all duration-300">
                            <div className={`w-14 h-14 rounded-xl ${feature.bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                                <feature.icon className={`h-7 w-7 ${feature.color}`} />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-primary transition-colors">
                                {feature.title}
                            </h3>
                            <p className="text-gray-600 leading-relaxed">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
