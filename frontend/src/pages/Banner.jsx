// src/Landing.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Banner = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white">
      {/* Navigation */}
      <nav className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <svg className="h-8 w-8 text-indigo-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 5H7C5.89543 5 5 5.89543 5 7V19C5 20.1046 5.89543 21 7 21H17C18.1046 21 19 20.1046 19 19V7C19 5.89543 18.1046 5 17 5H15M9 5C9 6.10457 9.89543 7 11 7H13C14.1046 7 15 6.10457 15 5M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M9 14L11 16L15 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="ml-2 text-2xl font-bold text-indigo-600">TaskSync AI</span>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-gray-600 hover:text-indigo-600 transition">Features</a>
            <a href="#how-it-works" className="text-gray-600 hover:text-indigo-600 transition">How it Works</a>
            <a href="#pricing" className="text-gray-600 hover:text-indigo-600 transition">Pricing</a>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <button className="px-4 py-2 text-indigo-600 font-medium hover:text-indigo-700 transition">Sign In</button>
            <Link to="/app" className="px-4 py-2 bg-indigo-600 text-white rounded-md font-medium hover:bg-indigo-700 transition">Get Started</Link>
          </div>
          <button className="md:hidden text-gray-500 focus:outline-none">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-16 md:py-24">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 md:pr-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight">
              Organize Tasks <span className="text-indigo-600">Intelligently.</span>
            </h1>
            <p className="mt-4 text-xl text-gray-600">
              TaskSync AI learns your work patterns and prioritizes tasks based on time constraints, importance, and your productivity peaks.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Link to="/app" className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium text-center hover:bg-indigo-700 transition">
                Try For Free
              </Link>
              <a href="#how-it-works" className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium text-center hover:border-gray-400 transition">
                See How It Works
              </a>
            </div>
            <div className="mt-8 flex items-center text-gray-500">
              <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              <span>No credit card required</span>
              <span className="mx-3">•</span>
              <span>14-day free trial</span>
            </div>
          </div>
          <div className="md:w-1/2 mt-12 md:mt-0">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg transform rotate-3 scale-105 opacity-10"></div>
              <img src="https://images.unsplash.com/photo-1586282023692-6bfbd629e85d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="TaskSync AI Dashboard" className="rounded-lg shadow-2xl relative z-10" />
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="bg-gray-50 py-12">
        <div className="container mx-auto px-6">
          <p className="text-center text-gray-500 font-medium mb-8">Trusted by productivity-focused teams worldwide</p>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-70">
            <div className="h-8">
              <svg viewBox="0 0 100 30" fill="currentColor" className="h-full text-gray-400">
                <rect width="100" height="30" fill="none" />
                <text x="10" y="20" fontFamily="Arial" fontSize="16" fontWeight="bold">Company 1</text>
              </svg>
            </div>
            <div className="h-8">
              <svg viewBox="0 0 100 30" fill="currentColor" className="h-full text-gray-400">
                <rect width="100" height="30" fill="none" />
                <text x="10" y="20" fontFamily="Arial" fontSize="16" fontWeight="bold">Company 2</text>
              </svg>
            </div>
            <div className="h-8">
              <svg viewBox="0 0 100 30" fill="currentColor" className="h-full text-gray-400">
                <rect width="100" height="30" fill="none" />
                <text x="10" y="20" fontFamily="Arial" fontSize="16" fontWeight="bold">Company 3</text>
              </svg>
            </div>
            <div className="h-8">
              <svg viewBox="0 0 100 30" fill="currentColor" className="h-full text-gray-400">
                <rect width="100" height="30" fill="none" />
                <text x="10" y="20" fontFamily="Arial" fontSize="16" fontWeight="bold">Company 4</text>
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="container mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-800">Intelligent Task Management</h2>
          <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
            TaskSync AI doesn't just organize your tasks — it learns from your habits and optimizes your workday.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-10">
          <div className="bg-white p-8 rounded-xl shadow-lg transition hover:shadow-xl">
            <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-6">
              <svg className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">AI Prioritization</h3>
            <p className="text-gray-600">
              Our AI analyzes deadlines, estimated time to completion, and task importance to suggest optimal work order.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-lg transition hover:shadow-xl">
            <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-6">
              <svg className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Time Optimization</h3>
            <p className="text-gray-600">
              Automatically arranges your day to maximize productivity during your peak performance hours.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-lg transition hover:shadow-xl">
            <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-6">
              <svg className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Productivity Insights</h3>
            <p className="text-gray-600">
              Track your completion rates, work patterns, and get personalized suggestions to improve efficiency.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="bg-gray-50 py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-800">How TaskSync AI Works</h2>
            <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
              Our intelligent system learns and adapts to how you work best
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center text-white text-xl font-bold mb-4">1</div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Add Your Tasks</h3>
              <p className="text-gray-600">
                Enter tasks with details like title, description, and estimated time to completion.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center text-white text-xl font-bold mb-4">2</div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">AI Analyzes Priorities</h3>
              <p className="text-gray-600">
                Our algorithm evaluates deadline proximity, importance, and your productivity patterns.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center text-white text-xl font-bold mb-4">3</div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Follow Recommendations</h3>
              <p className="text-gray-600">
                Get smart suggestions on which tasks to tackle first for maximum productivity.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center text-white text-xl font-bold mb-4">4</div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Improve Over Time</h3>
              <p className="text-gray-600">
                The AI learns from your completion patterns and refines its recommendations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="container mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-800">What Our Users Say</h2>
          <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
            TaskSync AI has helped thousands of professionals optimize their workflow
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold mr-4">JS</div>
              <div>
                <h4 className="font-semibold text-gray-800">Jamie Smith</h4>
                <p className="text-gray-500 text-sm">Product Manager</p>
              </div>
            </div>
            <p className="text-gray-600">
              "TaskSync AI has completely transformed how I manage my team's workflow. The smart prioritization ensures we're always working on what matters most."
            </p>
            <div className="mt-4 flex text-yellow-400">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-lg">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600 font-bold mr-4">MJ</div>
              <div>
                <h4 className="font-semibold text-gray-800">Michael Johnson</h4>
                <p className="text-gray-500 text-sm">Freelance Developer</p>
              </div>
            </div>
            <p className="text-gray-600">
              "As someone juggling multiple projects, the AI prioritization has been a game-changer. I'm completing projects faster with less stress and better focus."
            </p>
            <div className="mt-4 flex text-yellow-400">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>
          </div>

        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="bg-gray-50 py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-800">Simple Pricing</h2>
            <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
              Choose the plan that works best for your team
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Starter</h3>
              <p className="text-gray-600 mb-4">For small teams just getting started</p>
              <div className="flex items-center justify-center bg-indigo-600 text-white font-bold rounded-lg h-12 w-24 mb-4">
                $9
              </div>
              <p className="text-gray-600 mb-4">Per user / month</p>
              <ul className="text-gray-600">
                <li className="flex items-center gap-2 mb-2">
                  <svg className="h-5 w-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" clipRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9 9a1 1 0 011-1h1V6a1 1 0 112 0v2h1a1 1 0 110 2h-1v1a1 1 0 11-2 0V9H9a1 1 0 01-1-1z" />
                  </svg>
                  <span>Up to 5 users</span>
                </li>
                <li className="flex items-center gap-2 mb-2">
                  <svg className="h-5 w-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" clipRule="evenodd" d="M10 18a8
                      8 0 100-16 8 8 0 000 16zM9 9a1 1 0 011-1h1V6a1 1 0 112 0v2h1a1 1 0 110 2h-1v1a1 1 0 11-2 0V9H9a1 1 0 01-1-1z" />
                  </svg>
                  <span>Unlimited tasks</span>
                </li>
                <li className="flex items-center gap-2 mb-2">
                  <svg className="h-5 w-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" clipRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9 9a1 1 0 011-1h1V6a1 1 0 112 0v2h1a1 1 0 110 2h-1v1a1 1 0 11-2 0V9H9a1 1 0 01-1-1z" />
                  </svg>
                  <span>Advanced analytics</span>
                </li>
              </ul>
              <a href="#!" className="block bg-indigo-600 text-white rounded-lg font-semibold text-center py-3 hover:bg-indigo-700 transition mt-6">Get Started</a>
            </div>
          </div>
        </div>
      </section>
      {/* end this code now just close the return statement  */}
    </div>
  );
}
export default Banner;