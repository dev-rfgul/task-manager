
import React from "react";
import {
    Twitter,
    Linkedin,
    Instagram,
} from "lucide-react";

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white px-10 py-12 mt-16">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 text-sm">
                <div>
                    <h2 className="text-xl font-semibold mb-4">Task AI Studio</h2>
                    <p className="text-gray-400 mb-4">
                        Smarter task management with built-in AI. Never miss a deadline again.
                    </p>

                    <div className="flex space-x-4 mt-4">
                        {/* Custom TikTok Icon */}
                        <a
                            href="https://www.tiktok.com/@taskai.studio"

                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-400 hover:text-white"
                        >
                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6">
                                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43V7.56a8.16 8.16 0 0 0 4.77 1.52V5.71a4.85 4.85 0 0 1-1.04-.98v-.04z" fill="#25F4EE" />
                                <path d="M17.5 4.67c-.8-.77-1.3-1.84-1.3-3.02h-1.02c.26 2.05 1.74 3.73 3.59 4.17V3.65c-.75-.59-1.27-1.52-1.27-2.98h-1.02c.26 2.05 1.74 3.73 3.59 4.17-.33-.06-.65-.1-.97-.17z" fill="#FF0050" />
                                <path d="M12.32 15.67a2.89 2.89 0 0 0-5.2 1.74 2.89 2.89 0 0 0 2.31-4.64c.28.05.57.09.88.13v-3.5a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43V7.56c1.48.9 3.18 1.41 4.77 1.52V5.71c-1.8-.44-3.28-2.12-3.59-4.17-.26 1.59-.97 2.97-2.07 3.92v10.21h-2.65z" fill="#FF0050" />
                                <path d="M19.59 6.69c-1.59-.11-3.29-.62-4.77-1.52v8.1a6.34 6.34 0 0 1-10.86 4.43A6.33 6.33 0 0 1 8.3 9.35a6.84 6.84 0 0 1 1 .05v3.5a2.93 2.93 0 0 0-.88-.13 2.89 2.89 0 0 0-2.31 4.64 2.89 2.89 0 0 0 5.2-1.74V2h3.45c.03 1.41.53 2.48 1.3 3.02.33.07.65.11.97.17 1.1-.95 1.81-2.33 2.07-3.92 1.31.44 2.79 2.12 3.59 4.17V3.65c-1.85-.44-3.33-2.12-3.59-4.17h1.02c0 1.46.52 2.39 1.27 2.98v2.07a4.85 4.85 0 0 0 1.04.98z" fill="#25F4EE" />
                            </svg>
                        </a>
                        <a
                            href="https://x.com/taskaistudio"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-400 hover:text-white"
                        >
                            <Twitter size={20} />
                        </a>
                        <a
                            href="https://www.linkedin.com/company/task-ai-studio/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-400 hover:text-white"
                        >
                            <Linkedin size={20} />
                        </a>
                        <a
                            href="https://www.instagram.com/taskaistudio/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-400 hover:text-white"
                        >
                            <Instagram size={20} />
                        </a>
                    </div>
                </div>

                <div>
                    <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                    <ul className="space-y-2 text-gray-400">
                        <li><a href="#" className="hover:text-white">Features</a></li>
                        <li><a href="#" className="hover:text-white">How it Works</a></li>
                        <li><a href="#" className="hover:text-white">Pricing</a></li>
                        <li><a href="/login" className="hover:text-white">Sign In</a></li>
                        <li><a href="#" className="hover:text-white">Get Started</a></li>
                    </ul>
                </div>

                <div>
                    <h3 className="text-lg font-semibold mb-4">Product Highlights</h3>
                    <ul className="space-y-2 text-gray-400">
                        <li>AI-Powered Prioritization</li>
                        <li>WhatsApp Reminders</li>
                        <li>Smart To-Do on WhatsApp</li>
                        <li>Energy-Aware Scheduling</li>
                    </ul>
                </div>

                <div>
                    <h3 className="text-lg font-semibold mb-4">Contact & Info</h3>
                    <p className="text-gray-400">Need help? Have questions?</p>
                    <p className="text-gray-400 mt-2">
                        Reach out via our WhatsApp bot or email us at{" "}
                        <a href="mailto:taskai.studio@gmail.com" className="text-blue-400 hover:underline">
                            taskai.studio@gmail.com
                        </a>
                    </p>
                </div>
            </div>

            <div className="mt-12 border-t border-gray-700 pt-6 text-center text-gray-500 text-sm">
                © {new Date().getFullYear()} Task AI Studio. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
