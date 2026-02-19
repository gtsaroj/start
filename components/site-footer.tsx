import { Briefcase, Facebook, Instagram, Linkedin, Twitter } from "lucide-react"

export function SiteFooter() {
    return (
        <footer className="bg-gray-900 text-gray-300 py-16">
            <div className="container px-4 md:px-6">
                <div className="grid md:grid-cols-4 gap-12 mb-12">
                    <div className="col-span-1 md:col-span-2">
                        <div className="flex items-center space-x-2 mb-4 text-white">
                            <Briefcase className="h-6 w-6 text-primary" />
                            <span className="text-xl font-bold">JobBridge.Nepal</span>
                        </div>
                        <p className="text-gray-400 max-w-sm leading-relaxed">
                            Connecting ambitious students with forward-thinking employers.
                            The smartest way to start your career journey in Nepal.
                        </p>
                    </div>
                    <div>
                        <h4 className="text-white font-semibold mb-4">Platform</h4>
                        <ul className="space-y-3 text-sm">
                            <li><a href="#" className="hover:text-primary transition-colors">Find Jobs</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Post a Job</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Institutions</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Pricing</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-white font-semibold mb-4">Legal</h4>
                        <ul className="space-y-3 text-sm">
                            <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Terms of Service</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Cookie Policy</a></li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-sm text-gray-500">
                        &copy; 2026 JobBridge Nepal. All rights reserved.
                    </p>
                    <div className="flex space-x-6">
                        <a href="#" className="text-gray-400 hover:text-white transition-colors"><Facebook className="h-5 w-5" /></a>
                        <a href="#" className="text-gray-400 hover:text-white transition-colors"><Twitter className="h-5 w-5" /></a>
                        <a href="#" className="text-gray-400 hover:text-white transition-colors"><Instagram className="h-5 w-5" /></a>
                        <a href="#" className="text-gray-400 hover:text-white transition-colors"><Linkedin className="h-5 w-5" /></a>
                    </div>
                </div>
            </div>
        </footer>
    )
}
