// // // src/Landing.jsx
// // import React from 'react';
// // import { Link } from 'react-router-dom';

// // const Banner = () => {
// //   return (
// //     <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white">
// //       {/* Navigation */}
// //       <nav className="container mx-auto px-6 py-4">
// //         <div className="flex justify-between items-center">
// //           <div className="flex items-center">
// //             <svg className="h-8 w-8 text-indigo-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
// //               <path d="M9 5H7C5.89543 5 5 5.89543 5 7V19C5 20.1046 5.89543 21 7 21H17C18.1046 21 19 20.1046 19 19V7C19 5.89543 18.1046 5 17 5H15M9 5C9 6.10457 9.89543 7 11 7H13C14.1046 7 15 6.10457 15 5M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
// //               <path d="M9 14L11 16L15 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
// //             </svg>
// //             <span className="ml-2 text-2xl font-bold text-indigo-600">TaskSync AI</span>
// //           </div>
// //           <div className="hidden md:flex items-center space-x-8">
// //             <a href="#features" className="text-gray-600 hover:text-indigo-600 transition">Features</a>
// //             <a href="#how-it-works" className="text-gray-600 hover:text-indigo-600 transition">How it Works</a>
// //             <a href="#pricing" className="text-gray-600 hover:text-indigo-600 transition">Pricing</a>
// //           </div>
// //           <div className="hidden md:flex items-center space-x-4">
// //             <button className="px-4 py-2 text-indigo-600 font-medium hover:text-indigo-700 transition">Sign In</button>
// //             <Link to="/app" className="px-4 py-2 bg-indigo-600 text-white rounded-md font-medium hover:bg-indigo-700 transition">Get Started</Link>
// //           </div>
// //           <button className="md:hidden text-gray-500 focus:outline-none">
// //             <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
// //               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
// //             </svg>
// //           </button>
// //         </div>
// //       </nav>

// //       {/* Hero Section */}
// //       <section className="container mx-auto px-6 py-16 md:py-24">
// //         <div className="flex flex-col md:flex-row items-center">
// //           <div className="md:w-1/2 md:pr-12">
// //             <h1 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight">
// //               Organize Tasks <span className="text-indigo-600">Intelligently.</span>
// //             </h1>
// //             <p className="mt-4 text-xl text-gray-600">
// //               TaskSync AI learns your work patterns and prioritizes tasks based on time constraints, importance, and your productivity peaks.
// //             </p>
// //             <div className="mt-8 flex flex-col sm:flex-row gap-4">
// //               <Link to="/app" className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium text-center hover:bg-indigo-700 transition">
// //                 Try For Free
// //               </Link>
// //               <a href="#how-it-works" className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium text-center hover:border-gray-400 transition">
// //                 See How It Works
// //               </a>
// //             </div>
// //             <div className="mt-8 flex items-center text-gray-500">
// //               <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
// //                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
// //               </svg>
// //               <span>No credit card required</span>
// //               <span className="mx-3">•</span>
// //               <span>14-day free trial</span>
// //             </div>
// //           </div>
// //           <div className="md:w-1/2 mt-12 md:mt-0">
// //             <div className="relative">
// //               <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg transform rotate-3 scale-105 opacity-10"></div>
// //               <img src="https://images.unsplash.com/photo-1586282023692-6bfbd629e85d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="TaskSync AI Dashboard" className="rounded-lg shadow-2xl relative z-10" />
// //             </div>
// //           </div>
// //         </div>
// //       </section>

// //       {/* Social Proof */}
// //       <section className="bg-gray-50 py-12">
// //         <div className="container mx-auto px-6">
// //           <p className="text-center text-gray-500 font-medium mb-8">Trusted by productivity-focused teams worldwide</p>
// //           <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-70">
// //             <div className="h-8">
// //               <svg viewBox="0 0 100 30" fill="currentColor" className="h-full text-gray-400">
// //                 <rect width="100" height="30" fill="none" />
// //                 <text x="10" y="20" fontFamily="Arial" fontSize="16" fontWeight="bold">Company 1</text>
// //               </svg>
// //             </div>
// //             <div className="h-8">
// //               <svg viewBox="0 0 100 30" fill="currentColor" className="h-full text-gray-400">
// //                 <rect width="100" height="30" fill="none" />
// //                 <text x="10" y="20" fontFamily="Arial" fontSize="16" fontWeight="bold">Company 2</text>
// //               </svg>
// //             </div>
// //             <div className="h-8">
// //               <svg viewBox="0 0 100 30" fill="currentColor" className="h-full text-gray-400">
// //                 <rect width="100" height="30" fill="none" />
// //                 <text x="10" y="20" fontFamily="Arial" fontSize="16" fontWeight="bold">Company 3</text>
// //               </svg>
// //             </div>
// //             <div className="h-8">
// //               <svg viewBox="0 0 100 30" fill="currentColor" className="h-full text-gray-400">
// //                 <rect width="100" height="30" fill="none" />
// //                 <text x="10" y="20" fontFamily="Arial" fontSize="16" fontWeight="bold">Company 4</text>
// //               </svg>
// //             </div>
// //           </div>
// //         </div>
// //       </section>

// //       {/* Features */}
// //       <section id="features" className="container mx-auto px-6 py-20">
// //         <div className="text-center mb-16">
// //           <h2 className="text-3xl font-bold text-gray-800">Intelligent Task Management</h2>
// //           <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
// //             TaskSync AI doesn't just organize your tasks — it learns from your habits and optimizes your workday.
// //           </p>
// //         </div>

// //         <div className="grid md:grid-cols-3 gap-10">
// //           <div className="bg-white p-8 rounded-xl shadow-lg transition hover:shadow-xl">
// //             <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-6">
// //               <svg className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
// //                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
// //               </svg>
// //             </div>
// //             <h3 className="text-xl font-semibold text-gray-800 mb-2">AI Prioritization</h3>
// //             <p className="text-gray-600">
// //               Our AI analyzes deadlines, estimated time to completion, and task importance to suggest optimal work order.
// //             </p>
// //           </div>

// //           <div className="bg-white p-8 rounded-xl shadow-lg transition hover:shadow-xl">
// //             <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-6">
// //               <svg className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
// //                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
// //               </svg>
// //             </div>
// //             <h3 className="text-xl font-semibold text-gray-800 mb-2">Time Optimization</h3>
// //             <p className="text-gray-600">
// //               Automatically arranges your day to maximize productivity during your peak performance hours.
// //             </p>
// //           </div>

// //           <div className="bg-white p-8 rounded-xl shadow-lg transition hover:shadow-xl">
// //             <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-6">
// //               <svg className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
// //                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
// //               </svg>
// //             </div>
// //             <h3 className="text-xl font-semibold text-gray-800 mb-2">Productivity Insights</h3>
// //             <p className="text-gray-600">
// //               Track your completion rates, work patterns, and get personalized suggestions to improve efficiency.
// //             </p>
// //           </div>
// //         </div>
// //       </section>

// //       {/* How It Works */}
// //       <section id="how-it-works" className="bg-gray-50 py-20">
// //         <div className="container mx-auto px-6">
// //           <div className="text-center mb-16">
// //             <h2 className="text-3xl font-bold text-gray-800">How TaskSync AI Works</h2>
// //             <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
// //               Our intelligent system learns and adapts to how you work best
// //             </p>
// //           </div>

// //           <div className="grid md:grid-cols-4 gap-8">
// //             <div className="flex flex-col items-center text-center">
// //               <div className="w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center text-white text-xl font-bold mb-4">1</div>
// //               <h3 className="text-lg font-semibold text-gray-800 mb-2">Add Your Tasks</h3>
// //               <p className="text-gray-600">
// //                 Enter tasks with details like title, description, and estimated time to completion.
// //               </p>
// //             </div>

// //             <div className="flex flex-col items-center text-center">
// //               <div className="w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center text-white text-xl font-bold mb-4">2</div>
// //               <h3 className="text-lg font-semibold text-gray-800 mb-2">AI Analyzes Priorities</h3>
// //               <p className="text-gray-600">
// //                 Our algorithm evaluates deadline proximity, importance, and your productivity patterns.
// //               </p>
// //             </div>

// //             <div className="flex flex-col items-center text-center">
// //               <div className="w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center text-white text-xl font-bold mb-4">3</div>
// //               <h3 className="text-lg font-semibold text-gray-800 mb-2">Follow Recommendations</h3>
// //               <p className="text-gray-600">
// //                 Get smart suggestions on which tasks to tackle first for maximum productivity.
// //               </p>
// //             </div>

// //             <div className="flex flex-col items-center text-center">
// //               <div className="w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center text-white text-xl font-bold mb-4">4</div>
// //               <h3 className="text-lg font-semibold text-gray-800 mb-2">Improve Over Time</h3>
// //               <p className="text-gray-600">
// //                 The AI learns from your completion patterns and refines its recommendations.
// //               </p>
// //             </div>
// //           </div>
// //         </div>
// //       </section>

// //       {/* Testimonials */}
// //       <section className="container mx-auto px-6 py-20">
// //         <div className="text-center mb-16">
// //           <h2 className="text-3xl font-bold text-gray-800">What Our Users Say</h2>
// //           <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
// //             TaskSync AI has helped thousands of professionals optimize their workflow
// //           </p>
// //         </div>

// //         <div className="grid md:grid-cols-3 gap-8">
// //           <div className="bg-white p-8 rounded-xl shadow-lg">
// //             <div className="flex items-center mb-4">
// //               <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold mr-4">JS</div>
// //               <div>
// //                 <h4 className="font-semibold text-gray-800">Jamie Smith</h4>
// //                 <p className="text-gray-500 text-sm">Product Manager</p>
// //               </div>
// //             </div>
// //             <p className="text-gray-600">
// //               "TaskSync AI has completely transformed how I manage my team's workflow. The smart prioritization ensures we're always working on what matters most."
// //             </p>
// //             <div className="mt-4 flex text-yellow-400">
// //               <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
// //                 <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
// //               </svg>
// //               <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
// //                 <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
// //               </svg>
// //               <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
// //                 <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
// //               </svg>
// //               <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
// //                 <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
// //               </svg>
// //               <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
// //                 <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
// //               </svg>
// //             </div>
// //           </div>

// //           <div className="bg-white p-8 rounded-xl shadow-lg">
// //             <div className="flex items-center mb-4">
// //               <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600 font-bold mr-4">MJ</div>
// //               <div>
// //                 <h4 className="font-semibold text-gray-800">Michael Johnson</h4>
// //                 <p className="text-gray-500 text-sm">Freelance Developer</p>
// //               </div>
// //             </div>
// //             <p className="text-gray-600">
// //               "As someone juggling multiple projects, the AI prioritization has been a game-changer. I'm completing projects faster with less stress and better focus."
// //             </p>
// //             <div className="mt-4 flex text-yellow-400">
// //               <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
// //                 <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
// //               </svg>
// //               <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
// //                 <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
// //               </svg>
// //               <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
// //                 <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
// //               </svg>
// //               <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
// //                 <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
// //               </svg>
// //               <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
// //                 <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
// //               </svg>
// //             </div>
// //           </div>

// //         </div>
// //       </section>

// //       {/* Pricing */}
// //       <section id="pricing" className="bg-gray-50 py-20">
// //         <div className="container mx-auto px-6">
// //           <div className="text-center mb-16">
// //             <h2 className="text-3xl font-bold text-gray-800">Simple Pricing</h2>
// //             <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
// //               Choose the plan that works best for your team
// //             </p>
// //           </div>

// //           <div className="grid md:grid-cols-3 gap-8">
// //             <div className="bg-white p-8 rounded-xl shadow-lg">
// //               <h3 className="text-xl font-semibold text-gray-800 mb-2">Starter</h3>
// //               <p className="text-gray-600 mb-4">For small teams just getting started</p>
// //               <div className="flex items-center justify-center bg-indigo-600 text-white font-bold rounded-lg h-12 w-24 mb-4">
// //                 $9
// //               </div>
// //               <p className="text-gray-600 mb-4">Per user / month</p>
// //               <ul className="text-gray-600">
// //                 <li className="flex items-center gap-2 mb-2">
// //                   <svg className="h-5 w-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
// //                     <path fillRule="evenodd" clipRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9 9a1 1 0 011-1h1V6a1 1 0 112 0v2h1a1 1 0 110 2h-1v1a1 1 0 11-2 0V9H9a1 1 0 01-1-1z" />
// //                   </svg>
// //                   <span>Up to 5 users</span>
// //                 </li>
// //                 <li className="flex items-center gap-2 mb-2">
// //                   <svg className="h-5 w-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
// //                     <path fillRule="evenodd" clipRule="evenodd" d="M10 18a8
// //                       8 0 100-16 8 8 0 000 16zM9 9a1 1 0 011-1h1V6a1 1 0 112 0v2h1a1 1 0 110 2h-1v1a1 1 0 11-2 0V9H9a1 1 0 01-1-1z" />
// //                   </svg>
// //                   <span>Unlimited tasks</span>
// //                 </li>
// //                 <li className="flex items-center gap-2 mb-2">
// //                   <svg className="h-5 w-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
// //                     <path fillRule="evenodd" clipRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9 9a1 1 0 011-1h1V6a1 1 0 112 0v2h1a1 1 0 110 2h-1v1a1 1 0 11-2 0V9H9a1 1 0 01-1-1z" />
// //                   </svg>
// //                   <span>Advanced analytics</span>
// //                 </li>
// //               </ul>
// //               <a href="#!" className="block bg-indigo-600 text-white rounded-lg font-semibold text-center py-3 hover:bg-indigo-700 transition mt-6">Get Started</a>
// //             </div>
// //           </div>
// //         </div>
// //       </section>
// //       {/* end this code now just close the return statement  */}
// //     </div>
// //   );
// // }
// // export default Banner;


// // src/Landing.jsx
// import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';

// const Banner = () => {
//   // States for controlling animations
//   const [isVisible, setIsVisible] = useState(false);
//   const [scrollY, setScrollY] = useState(0);
//   const [animatedElements, setAnimatedElements] = useState({});

//   // Observer for elements scrolling into view
//   useEffect(() => {
//     setIsVisible(true);

//     const handleScroll = () => {
//       setScrollY(window.scrollY);
      
//       // Find elements to animate on scroll
//       const sections = document.querySelectorAll('.animate-on-scroll');
//       const newAnimatedElements = {...animatedElements};
      
//       sections.forEach(section => {
//         const sectionTop = section.getBoundingClientRect().top;
//         const sectionId = section.id || section.className;
        
//         if (sectionTop < window.innerHeight * 0.75) {
//           newAnimatedElements[sectionId] = true;
//         }
//       });
      
//       setAnimatedElements(newAnimatedElements);
//     };

//     window.addEventListener('scroll', handleScroll);
//     handleScroll(); // Initial check
    
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white">
//       {/* Navigation */}
//       <nav className={`container mx-auto px-6 py-4 transition-all duration-500 ${scrollY > 50 ? 'bg-white shadow-md fixed top-0 left-0 right-0 z-50' : ''}`}>
//         <div className="flex justify-between items-center">
//           <div className="flex items-center">
//             <svg className={`h-8 w-8 text-indigo-600 transition-transform duration-700 ${isVisible ? 'rotate-0' : '-rotate-180'}`} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//               <path d="M9 5H7C5.89543 5 5 5.89543 5 7V19C5 20.1046 5.89543 21 7 21H17C18.1046 21 19 20.1046 19 19V7C19 5.89543 18.1046 5 17 5H15M9 5C9 6.10457 9.89543 7 11 7H13C14.1046 7 15 6.10457 15 5M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
//               <path d="M9 14L11 16L15 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
//             </svg>
//             <span className={`ml-2 text-2xl font-bold text-indigo-600 transition-all duration-700 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}>TaskSync AI</span>
//           </div>
//           <div className="hidden md:flex items-center space-x-8">
//             {['Features', 'How it Works', 'Pricing'].map((item, index) => (
//               <a 
//                 key={item} 
//                 href={`#${item.toLowerCase().replace(/\s+/g, '-')}`} 
//                 className={`text-gray-600 hover:text-indigo-600 transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}
//                 style={{transitionDelay: `${index * 100}ms`}}
//               >
//                 {item}
//               </a>
//             ))}
//           </div>
//           <div className="hidden md:flex items-center space-x-4">
//             <button className={`px-4 py-2 text-indigo-600 font-medium hover:text-indigo-700 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>Sign In</button>
//             <Link 
//               to="/app" 
//               className={`px-4 py-2 bg-indigo-600 text-white rounded-md font-medium hover:bg-indigo-700 transition-all duration-700 hover:scale-105 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}
//               style={{transitionDelay: '200ms'}}
//             >
//               Get Started
//             </Link>
//           </div>
//           <button className="md:hidden text-gray-500 focus:outline-none">
//             <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
//             </svg>
//           </button>
//         </div>
//       </nav>

//       {/* Hero Section */}
//       <section className="container mx-auto px-6 py-16 md:py-24">
//         <div className="flex flex-col md:flex-row items-center">
//           <div className="md:w-1/2 md:pr-12">
//             <h1 className={`text-4xl md:text-5xl font-bold text-gray-800 leading-tight transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
//               Organize Tasks <span className="text-indigo-600">Intelligently.</span>
//             </h1>
//             <p className={`mt-4 text-xl text-gray-600 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{transitionDelay: '100ms'}}>
//               TaskSync AI learns your work patterns and prioritizes tasks based on time constraints, importance, and your productivity peaks.
//             </p>
//             <div className={`mt-8 flex flex-col sm:flex-row gap-4 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{transitionDelay: '200ms'}}>
//               <Link to="/app" className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium text-center hover:bg-indigo-700 transition hover:scale-105 transform">
//                 Try For Free
//               </Link>
//               <a href="#how-it-works" className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium text-center hover:border-gray-400 transition hover:scale-105 transform">
//                 See How It Works
//               </a>
//             </div>
//             <div className={`mt-8 flex items-center text-gray-500 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{transitionDelay: '300ms'}}>
//               <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
//               </svg>
//               <span>No credit card required</span>
//               <span className="mx-3">•</span>
//               <span>14-day free trial</span>
//             </div>
//           </div>
//           <div className={`md:w-1/2 mt-12 md:mt-0 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`} style={{transitionDelay: '400ms'}}>
//             <div className="relative">
//               <div className={`absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg transform rotate-3 scale-105 opacity-10 transition-all duration-1000 ${isVisible ? 'animate-pulse' : ''}`}></div>
//               <img src="https://images.unsplash.com/photo-1586282023692-6bfbd629e85d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="TaskSync AI Dashboard" className="rounded-lg shadow-2xl relative z-10 transition-transform hover:scale-102 transform" />
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Social Proof */}
//       <section className="bg-gray-50 py-12 animate-on-scroll">
//         <div className="container mx-auto px-6">
//           <p className={`text-center text-gray-500 font-medium mb-8 transition-all duration-700 ${animatedElements['animate-on-scroll'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>Trusted by productivity-focused teams worldwide</p>
//           <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-70">
//             {[1, 2, 3, 4].map((company, index) => (
//               <div 
//                 key={company} 
//                 className={`h-8 transition-all duration-700 ${animatedElements['animate-on-scroll'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} 
//                 style={{transitionDelay: `${index * 100}ms`}}
//               >
//                 <svg viewBox="0 0 100 30" fill="currentColor" className="h-full text-gray-400">
//                   <rect width="100" height="30" fill="none" />
//                   <text x="10" y="20" fontFamily="Arial" fontSize="16" fontWeight="bold">Company {company}</text>
//                 </svg>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Features */}
//       <section id="features" className="container mx-auto px-6 py-20 animate-on-scroll">
//         <div className="text-center mb-16">
//           <h2 className={`text-3xl font-bold text-gray-800 transition-all duration-700 ${animatedElements['features'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>Intelligent Task Management</h2>
//           <p className={`mt-4 text-xl text-gray-600 max-w-2xl mx-auto transition-all duration-700 ${animatedElements['features'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{transitionDelay: '100ms'}}>
//             TaskSync AI doesn't just organize your tasks — it learns from your habits and optimizes your workday.
//           </p>
//         </div>

//         <div className="grid md:grid-cols-3 gap-10">
//           {[
//             {
//               icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />,
//               title: "AI Prioritization",
//               description: "Our AI analyzes deadlines, estimated time to completion, and task importance to suggest optimal work order."
//             },
//             {
//               icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />,
//               title: "Time Optimization",
//               description: "Automatically arranges your day to maximize productivity during your peak performance hours."
//             },
//             {
//               icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />,
//               title: "Productivity Insights",
//               description: "Track your completion rates, work patterns, and get personalized suggestions to improve efficiency."
//             }
//           ].map((feature, index) => (
//             <div 
//               key={feature.title} 
//               className={`bg-white p-8 rounded-xl shadow-lg transition-all duration-700 hover:shadow-xl hover:-translate-y-2 ${animatedElements['features'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
//               style={{transitionDelay: `${index * 150 + 200}ms`}}
//             >
//               <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-6">
//                 <svg className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   {feature.icon}
//                 </svg>
//               </div>
//               <h3 className="text-xl font-semibold text-gray-800 mb-2">{feature.title}</h3>
//               <p className="text-gray-600">{feature.description}</p>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* How It Works */}
//       <section id="how-it-works" className="bg-gray-50 py-20 animate-on-scroll">
//         <div className="container mx-auto px-6">
//           <div className="text-center mb-16">
//             <h2 className={`text-3xl font-bold text-gray-800 transition-all duration-700 ${animatedElements['how-it-works'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>How TaskSync AI Works</h2>
//             <p className={`mt-4 text-xl text-gray-600 max-w-2xl mx-auto transition-all duration-700 ${animatedElements['how-it-works'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{transitionDelay: '100ms'}}>
//               Our intelligent system learns and adapts to how you work best
//             </p>
//           </div>

//           <div className="grid md:grid-cols-4 gap-8">
//             {[
//               { step: "1", title: "Add Your Tasks", desc: "Enter tasks with details like title, description, and estimated time to completion." },
//               { step: "2", title: "AI Analyzes Priorities", desc: "Our algorithm evaluates deadline proximity, importance, and your productivity patterns." },
//               { step: "3", title: "Follow Recommendations", desc: "Get smart suggestions on which tasks to tackle first for maximum productivity." },
//               { step: "4", title: "Improve Over Time", desc: "The AI learns from your completion patterns and refines its recommendations." }
//             ].map((step, index) => (
//               <div 
//                 key={step.step} 
//                 className={`flex flex-col items-center text-center transition-all duration-700 ${animatedElements['how-it-works'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
//                 style={{transitionDelay: `${index * 150 + 200}ms`}}
//               >
//                 <div className="w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center text-white text-xl font-bold mb-4 transition-transform hover:scale-110 hover:bg-indigo-700">{step.step}</div>
//                 <h3 className="text-lg font-semibold text-gray-800 mb-2">{step.title}</h3>
//                 <p className="text-gray-600">{step.desc}</p>
//               </div>
//             ))}
//           </div>
          
//           <div className={`mt-12 flex justify-center transition-all duration-1000 ${animatedElements['how-it-works'] ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`} style={{transitionDelay: '800ms'}}>
//             <div className="h-1 bg-indigo-200 w-3/4 relative">
//               {[25, 50, 75].map((pos) => (
//                 <div key={pos} className="absolute top-1/2 -translate-y-1/2" style={{left: `${pos}%`}}>
//                   <div className="h-3 w-3 bg-indigo-600 rounded-full"></div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Testimonials */}
//       <section className="container mx-auto px-6 py-20 animate-on-scroll">
//         <div className="text-center mb-16">
//           <h2 className={`text-3xl font-bold text-gray-800 transition-all duration-700 ${animatedElements['animate-on-scroll'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>What Our Users Say</h2>
//           <p className={`mt-4 text-xl text-gray-600 max-w-2xl mx-auto transition-all duration-700 ${animatedElements['animate-on-scroll'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{transitionDelay: '100ms'}}>
//             TaskSync AI has helped thousands of professionals optimize their workflow
//           </p>
//         </div>

//         <div className="grid md:grid-cols-3 gap-8">
//           {[
//             {
//               initials: "JS",
//               name: "Jamie Smith",
//               role: "Product Manager",
//               quote: "TaskSync AI has completely transformed how I manage my team's workflow. The smart prioritization ensures we're always working on what matters most.",
//               bgColor: "bg-blue-100",
//               textColor: "text-blue-600"
//             },
//             {
//               initials: "MJ",
//               name: "Michael Johnson",
//               role: "Freelance Developer",
//               quote: "As someone juggling multiple projects, the AI prioritization has been a game-changer. I'm completing projects faster with less stress and better focus.",
//               bgColor: "bg-green-100",
//               textColor: "text-green-600"
//             }
//           ].map((testimonial, index) => (
//             <div 
//               key={testimonial.name} 
//               className={`bg-white p-8 rounded-xl shadow-lg transition-all duration-700 hover:shadow-xl hover:-translate-y-2 ${animatedElements['animate-on-scroll'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
//               style={{transitionDelay: `${index * 150 + 200}ms`}}
//             >
//               <div className="flex items-center mb-4">
//                 <div className={`w-12 h-12 ${testimonial.bgColor} rounded-full flex items-center justify-center ${testimonial.textColor} font-bold mr-4`}>{testimonial.initials}</div>
//                 <div>
//                   <h4 className="font-semibold text-gray-800">{testimonial.name}</h4>
//                   <p className="text-gray-500 text-sm">{testimonial.role}</p>
//                 </div>
//               </div>
//               <p className="text-gray-600">{testimonial.quote}</p>
//               <div className="mt-4 flex text-yellow-400">
//                 {[...Array(5)].map((_, i) => (
//                   <svg key={i} className={`h-5 w-5 transition-all duration-300`} style={{transitionDelay: `${i * 100}ms`, opacity: animatedElements['animate-on-scroll'] ? 1 : 0}} fill="currentColor" viewBox="0 0 20 20">
//                     <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//                   </svg>
//                 ))}
//               </div>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* Pricing */}
//       <section id="pricing" className="bg-gray-50 py-20 animate-on-scroll">
//         <div className="container mx-auto px-6">
//           <div className="text-center mb-16">
//             <h2 className={`text-3xl font-bold text-gray-800 transition-all duration-700 ${animatedElements['pricing'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>Simple Pricing</h2>
//             <p className={`mt-4 text-xl text-gray-600 max-w-2xl mx-auto transition-all duration-700 ${animatedElements['pricing'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{transitionDelay: '100ms'}}>
//               Choose the plan that works best for your team
//             </p>
//           </div>

//           <div className="grid md:grid-cols-3 gap-8">
//             <div 
//               className={`bg-white p-8 rounded-xl shadow-lg transition-all duration-700 hover:shadow-xl hover:-translate-y-2 ${animatedElements['pricing'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
//             >
//               <h3 className="text-xl font-semibold text-gray-800 mb-2">Starter</h3>
//               <p className="text-gray-600 mb-4">For small teams just getting started</p>
//               <div className={`flex items-center justify-center bg-indigo-600 text-white font-bold rounded-lg h-12 w-24 mb-4 transition-all duration-500 ${animatedElements['pricing'] ? 'scale-100' : 'scale-0'}`} style={{transitionDelay: '300ms'}}>
//                 $9
//               </div>
//               <p className="text-gray-600 mb-4">Per user / month</p>
//               <ul className="text-gray-600">
//                 {['Up to 5 users', 'Unlimited tasks', 'Advanced analytics'].map((feature, i) => (
//                   <li 
//                     key={feature} 
//                     className={`flex items-center gap-2 mb-2 transition-all duration-500 ${animatedElements['pricing'] ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}
//                     style={{transitionDelay: `${i * 100 + 400}ms`}}
//                   >
//                     <svg className="h-5 w-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
//                       <path fillRule="evenodd" clipRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9 9a1 1 0 011-1h1V6a1 1 0 112 0v2h1a1 1 0 110 2h-1v1a1 1 0 11-2 0V9H9a1 1 0 01-1-1z" />
//                     </svg>
//                     <span>{feature}</span>
//                   </li>
//                 ))}
//               </ul>
//               <a 
//                 href="#!" 
//                 className={`block bg-indigo-600 text-white rounded-lg font-semibold text-center py-3 hover:bg-indigo-700 transition mt-6 ${animatedElements['pricing'] ? 'opacity-100 translate-y-0 hover:scale-105' : 'opacity-0 translate-y-4'}`}
//                 style={{transitionDelay: '700ms'}}
//               >
//                 Get Started
//               </a>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Back to top button that appears when scrolling */}
//       {scrollY > 500 && (
//         <button 
//           onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}
//           className="fixed bottom-8 right-8 bg-indigo-600 text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:bg-indigo-700 transition-all duration-300 hover:scale-110 z-50"
//         >
//           <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
//           </svg>
//         </button>
//       )}
//     </div>
//   );
// }

// export default Banner;

import React from 'react';

const TaskPrioritizerLanding = () => {
  // Simple function to handle the scroll behavior for navigation links
  const handleSmoothScroll = (e, targetId) => {
    e.preventDefault();
    
    if (targetId === '#') return;
    
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  };

  return (
    <>
      {/* Navigation */}
      <nav className="bg-white shadow-md">
        <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <span className="font-bold text-xl">TaskPriority AI</span>
          </div>
          <div className="hidden md:flex space-x-6">
            <a href="#features" onClick={(e) => handleSmoothScroll(e, '#features')} className="hover:text-indigo-600">Features</a>
            <a href="#how-it-works" onClick={(e) => handleSmoothScroll(e, '#how-it-works')} className="hover:text-indigo-600">How It Works</a>
            <a href="#pricing" onClick={(e) => handleSmoothScroll(e, '#pricing')} className="hover:text-indigo-600">Pricing</a>
          </div>
          <div>
            <a href="#signup" onClick={(e) => handleSmoothScroll(e, '#signup')} className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition">Get Started</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
        <div className="max-w-6xl mx-auto px-4 py-16 md:py-24 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Never Struggle with Task Priorities Again</h1>
            <p className="text-xl mb-6">Our AI analyzes your tasks and tells you exactly what to work on first, so you can be more productive every day.</p>
            <a href="#signup" onClick={(e) => handleSmoothScroll(e, '#signup')} className="bg-white text-indigo-600 font-medium px-6 py-3 rounded-lg hover:bg-gray-100 transition">Try For Free</a>
          </div>
          <div className="md:w-1/2">
            <img src="/api/placeholder/600/400" alt="Task prioritization interface" className="rounded-lg shadow-xl mx-auto" />
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section id="features" className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose TaskPriority AI?</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="text-indigo-600 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Smart Prioritization</h3>
              <p>Our AI analyzes deadlines, importance, and complexity to recommend the optimal task order.</p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="text-indigo-600 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Save Time</h3>
              <p>Stop wasting time figuring out what to do next. Our AI makes the decision for you in seconds.</p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="text-indigo-600 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Boost Productivity</h3>
              <p>Users report completing 30% more tasks when following our AI's prioritization recommendations.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-indigo-100 rounded-full h-16 w-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-indigo-600 font-bold text-xl">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Enter Your Tasks</h3>
              <p>Simply add your to-do list items into our easy-to-use interface.</p>
            </div>
            
            <div className="text-center">
              <div className="bg-indigo-100 rounded-full h-16 w-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-indigo-600 font-bold text-xl">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">AI Analysis</h3>
              <p>Our algorithm analyzes each task based on multiple factors.</p>
            </div>
            
            <div className="text-center">
              <div className="bg-indigo-100 rounded-full h-16 w-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-indigo-600 font-bold text-xl">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Get Prioritized List</h3>
              <p>Receive your optimized task list and start being more productive.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="bg-gray-50 rounded-xl p-8 shadow-lg">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 mb-6 md:mb-0 md:pr-8">
                <h2 className="text-3xl font-bold mb-4">Try It Now</h2>
                <p className="mb-6">Enter a few sample tasks below to see how our AI prioritization works.</p>
                
                <div className="space-y-4">
                  <div>
                    <input type="text" placeholder="Task 1" className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                  </div>
                  <div>
                    <input type="text" placeholder="Task 2" className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                  </div>
                  <div>
                    <input type="text" placeholder="Task 3" className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                  </div>
                  <div>
                    <button className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700 transition">Prioritize Tasks</button>
                  </div>
                </div>
              </div>
              
              <div className="md:w-1/2">
                <div className="bg-white p-6 rounded-lg border shadow">
                  <h3 className="font-bold text-lg mb-4">Your Prioritized Tasks:</h3>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <span className="bg-green-500 text-white px-2 py-1 rounded mr-3">1</span>
                      <span>Sample prioritized task #1</span>
                    </div>
                    <div className="flex items-center">
                      <span className="bg-blue-500 text-white px-2 py-1 rounded mr-3">2</span>
                      <span>Sample prioritized task #2</span>
                    </div>
                    <div className="flex items-center">
                      <span className="bg-purple-500 text-white px-2 py-1 rounded mr-3">3</span>
                      <span>Sample prioritized task #3</span>
                    </div>
                  </div>
                  <p className="mt-4 text-sm text-gray-500">AI recommendation based on urgency and importance</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Simple Pricing</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md border border-gray-200">
              <h3 className="text-xl font-bold mb-2">Free</h3>
              <p className="text-gray-500 mb-4">For casual users</p>
              <div className="text-4xl font-bold mb-6">$0</div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Up to 5 tasks per day
                </li>
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Basic prioritization
                </li>
                <li className="flex items-center text-gray-400">
                  <svg className="h-5 w-5 text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  No saved lists
                </li>
              </ul>
              <a href="#signup" onClick={(e) => handleSmoothScroll(e, '#signup')} className="block text-center bg-indigo-100 text-indigo-600 px-4 py-2 rounded-md hover:bg-indigo-200 transition w-full">Sign Up</a>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md border border-indigo-200 transform scale-105 relative">
              <div className="absolute top-0 right-0 bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg">POPULAR</div>
              <h3 className="text-xl font-bold mb-2">Pro</h3>
              <p className="text-gray-500 mb-4">For individuals</p>
              <div className="text-4xl font-bold mb-6">$9.99<span className="text-base font-normal">/mo</span></div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Unlimited tasks
                </li>
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Advanced AI prioritization
                </li>
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Save up to 10 lists
                </li>
              </ul>
              <a href="#signup" onClick={(e) => handleSmoothScroll(e, '#signup')} className="block text-center bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition w-full">Get Started</a>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md border border-gray-200">
              <h3 className="text-xl font-bold mb-2">Teams</h3>
              <p className="text-gray-500 mb-4">For businesses</p>
              <div className="text-4xl font-bold mb-6">$24.99<span className="text-base font-normal">/mo</span></div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  All Pro features
                </li>
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Team collaboration
                </li>
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Priority support
                </li>
              </ul>
              <a href="#signup" onClick={(e) => handleSmoothScroll(e, '#signup')} className="block text-center bg-indigo-100 text-indigo-600 px-4 py-2 rounded-md hover:bg-indigo-200 transition w-full">Contact Sales</a>
            </div>
          </div>
        </div>
      </section>

      {/* Signup Section */}
      <section id="signup" className="py-16 bg-indigo-600 text-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Start Prioritizing Your Tasks Today</h2>
          <p className="text-xl mb-8">Join thousands of users who are getting more done with TaskPriority AI.</p>
          
          <div className="max-w-md mx-auto">
            <div className="flex">
              <input type="email" placeholder="Enter your email" className="flex-1 px-4 py-3 rounded-l text-gray-800 focus:outline-none" />
              <button className="bg-indigo-800 hover:bg-indigo-900 px-6 py-3 rounded-r font-medium transition">Get Started</button>
            </div>
            <p className="mt-4 text-sm opacity-80">Free to get started. No credit card required.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-300 py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="mb-6 md:mb-0">
              <div className="flex items-center space-x-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                <span className="font-bold text-xl text-white">TaskPriority AI</span>
              </div>
              <p className="mt-2">Making productivity smarter with AI.</p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-white font-semibold mb-3">Product</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="hover:text-white">Features</a></li>
                  <li><a href="#" className="hover:text-white">Pricing</a></li>
                  <li><a href="#" className="hover:text-white">Testimonials</a></li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-white font-semibold mb-3">Company</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="hover:text-white">About Us</a></li>
                  <li><a href="#" className="hover:text-white">Careers</a></li>
                  <li><a href="#" className="hover:text-white">Contact</a></li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-white font-semibold mb-3">Legal</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="hover:text-white">Privacy</a></li>
                  <li><a href="#" className="hover:text-white">Terms</a></li>
                  <li><a href="#" className="hover:text-white">Security</a></li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
            <p>© 2025 TaskPriority AI. All rights reserved.</p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <a href="#" className="hover:text-white">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              </a>
              <a href="#" className="hover:text-white">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
              <a href="#" className="hover:text-white">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default TaskPrioritizerLanding;