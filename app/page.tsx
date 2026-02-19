import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { HeroSection } from "@/modules/landing/components/hero-section.component"
import { FeatureGrid } from "@/modules/landing/components/feature-grid.component"
import { StatsSection } from "@/modules/landing/components/stats-section.component"
import { RoleSelection } from "@/modules/landing/components/role-selection.component"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white font-sans selection:bg-primary/10 selection:text-primary">
      <SiteHeader />

      <main>
        <HeroSection />
        <StatsSection />
        <RoleSelection />
        <FeatureGrid />

        {/* Call to Action Section */}
        <section className="py-24 bg-primary relative overflow-hidden">
          <div className="container px-4 md:px-6 relative z-10 text-center">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Ready to Start Your Journey?</h2>
            <p className="text-blue-100 text-lg max-w-2xl mx-auto mb-10">
              Join thousands of students and employers already using JobBridge Nepal to build the future.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-primary font-bold py-4 px-8 rounded-full shadow-lg hover:shadow-xl hover:bg-gray-50 transition-all transform hover:-translate-y-1">
                Sign Up Now - It&apos;s Free
              </button>
            </div>
          </div>
          {/* Background pattern */}
          <div className="absolute top-0 left-0 w-full h-full opacity-10">
            <div className="absolute transform -rotate-12 -top-24 -left-24 w-96 h-96 rounded-3xl bg-white blur-3xl"></div>
            <div className="absolute transform rotate-12 -bottom-24 -right-24 w-96 h-96 rounded-3xl bg-white blur-3xl"></div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
