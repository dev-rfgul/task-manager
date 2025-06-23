
// import React from "react";

// const Footer = () => {
//     return (
//         <footer className="bg-gray-900 text-white px-10 py-12 mt-16">
//             <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 text-sm">
//                 <div>
//                     <h2 className="text-xl font-semibold mb-4">Task AI Studio</h2>
//                     <p className="text-gray-400">Smarter task management with built-in AI. Never miss a deadline again.</p>
//                 </div>

//                 <div>
//                     <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
//                     <ul className="space-y-2 text-gray-400">
//                         <li><a href="#" className="hover:text-white">Features</a></li>
//                         <li><a href="#" className="hover:text-white">How it Works</a></li>
//                         <li><a href="#" className="hover:text-white">Pricing</a></li>
//                         <li><a href="#" className="hover:text-white">Sign In</a></li>
//                         <li><a href="#" className="hover:text-white">Get Started</a></li>
//                     </ul>
//                 </div>

//                 <div>
//                     <h3 className="text-lg font-semibold mb-4">Product Highlights</h3>
//                     <ul className="space-y-2 text-gray-400">
//                         <li>AI-Powered Prioritization</li>
//                         <li>WhatsApp Reminders</li>
//                         <li>Smart To-Do on WhatsApp</li>
//                         <li>Energy-Aware Scheduling</li>
//                     </ul>
//                 </div>

//                 <div>
//                     <h3 className="text-lg font-semibold mb-4">Contact & Info</h3>
//                     <p className="text-gray-400">Need help? Have questions?</p>
//                     <p className="text-gray-400 mt-2">Reach out via our WhatsApp bot or email us at <a href="mailto:support@taskai.studio" className="text-blue-400 hover:underline">support@taskai.studio</a></p>
//                 </div>
//             </div>

//             <div className="mt-12 border-t border-gray-700 pt-6 text-center text-gray-500 text-sm">
//                 © {new Date().getFullYear()} Task AI Studio. All rights reserved.
//             </div>
//         </footer>
//     );
// };

// export default Footer;

import React from "react";
import {
    Facebook,
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
                        <a
                            href="https://facebook.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-400 hover:text-white"
                        >
                            <Facebook size={20} />
                        </a>
                        <a
                            href="https://twitter.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-400 hover:text-white"
                        >
                            <Twitter size={20} />
                        </a>
                        <a
                            href="https://linkedin.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-400 hover:text-white"
                        >
                            <Linkedin size={20} />
                        </a>
                        <a
                            href="https://instagram.com"
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
                        <li><a href="#" className="hover:text-white">Sign In</a></li>
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
                        <a href="mailto:support@taskai.studio" className="text-blue-400 hover:underline">
                            support@taskai.studio
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
