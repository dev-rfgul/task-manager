import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Home= () => {
  // States for controlling animations
  const [isVisible, setIsVisible] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [animatedElements, setAnimatedElements] = useState({});

     const [menuOpen, setMenuOpen] = useState(false);

  // Observer for elements scrolling into view
  useEffect(() => {
    setIsVisible(true);

    const handleScroll = () => {
      setScrollY(window.scrollY);
      
      // Find elements to animate on scroll
      const sections = document.querySelectorAll('.animate-on-scroll');
      const newAnimatedElements = {...animatedElements};
      
      sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const sectionId = section.id || section.className;
        
        if (sectionTop < window.innerHeight * 0.75) {
          newAnimatedElements[sectionId] = true;
        }
      });
      
      setAnimatedElements(newAnimatedElements);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white">
      {/* Navigation */}

<nav className={`container mx-auto px-6 py-4 transition-all duration-500 ${scrollY > 50 ? 'bg-white shadow-md fixed top-0 left-0 right-0 z-50' : ''}`}>
  <div className="flex justify-between items-center">
    <div className="flex items-center">
      <svg className={`h-8 w-8 text-indigo-600 transition-transform duration-700 ${isVisible ? 'rotate-0' : '-rotate-180'}`} viewBox="0 0 24 24" fill="none">
        <path d="M9 5H7C5.89543 5 5 5.89543 5 7V19C5 20.1046 5.89543 21 7 21H17C18.1046 21 19 20.1046 19 19V7C19 5.89543 18.1046 5 17 5H15M9 5C9 6.10457 9.89543 7 11 7H13C14.1046 7 15 6.10457 15 5M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M9 14L11 16L15 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span className={`ml-2 text-2xl font-bold text-indigo-600 transition-all duration-700 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}>Task AI Studio</span>
    </div>

    {/* Desktop Nav */}
    <div className="hidden md:flex items-center space-x-8">
      {['Features', 'How it Works', 'Pricing'].map((item, index) => (
        <a
          key={item}
          href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
          className={`text-gray-600 hover:text-indigo-600 transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}
          style={{ transitionDelay: `${index * 100}ms` }}
        >
          {item}
        </a>
      ))}
    </div>

    <div className="hidden md:flex items-center space-x-4">
      <Link
        to="/login"
        className={`px-4 py-2 text-indigo-600 font-medium hover:text-indigo-700 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}
        style={{ transitionDelay: '200ms' }}
      >
        Sign In
      </Link>
      <Link
        to="/signup"
        className={`px-4 py-2 bg-indigo-600 text-white rounded-md font-medium hover:bg-indigo-700 transition-all duration-700 hover:scale-105 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}
        style={{ transitionDelay: '200ms' }}
      >
        Get Started
      </Link>
    </div>

    {/* Mobile Toggle Button */}
    <button
      className="md:hidden text-gray-500 focus:outline-none"
      onClick={() => setMenuOpen(!menuOpen)}
    >
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d={menuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
        />
      </svg>
    </button>
  </div>

  {/* Mobile Menu */}
  {menuOpen && (
    <div className="md:hidden mt-4 space-y-2 px-6">
      {['Features', 'How it Works', 'Pricing'].map((item) => (
        <a
          key={item}
          href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
          className="block text-gray-600 hover:text-indigo-600 transition-all duration-300"
        >
          {item}
        </a>
      ))}
      <hr className="my-2" />
      <Link
        to="/login"
        className="block text-indigo-600 font-medium hover:text-indigo-700 transition duration-300"
      >
        Sign In
      </Link>
      <Link
        to="/signup"
        className="block bg-indigo-600 text-white text-center rounded-md py-2 font-medium hover:bg-indigo-700 transition duration-300"
      >
        Get Started
      </Link>
    </div>
  )}
</nav>


      {/* Hero Section */}
      <section className="container mx-auto px-6 py-16 md:py-24">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 md:pr-12">
            <h1 className={`text-4xl md:text-5xl font-bold text-gray-800 leading-tight transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              Organize Tasks <span className="text-indigo-600">Intelligently.</span>
            </h1>
            <p className={`mt-4 text-xl text-gray-600 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{transitionDelay: '100ms'}}>
              Task AI Studio learns your work patterns and prioritizes tasks based on time constraints, importance, and your productivity peaks.
            </p>
            <div className={`mt-8 flex flex-col sm:flex-row gap-4 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{transitionDelay: '200ms'}}>
              <Link to="/login" className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium text-center hover:bg-indigo-700 transition hover:scale-105 transform">
                Try For Free
              </Link>
              <a href="#how-it-works" className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium text-center hover:border-gray-400 transition hover:scale-105 transform">
                See How It Works
              </a>
            </div>
         <div
  className={`mt-8 flex flex-col md:flex-row md:items-center text-gray-500 transition-all duration-700 ${
    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
  }`}
  style={{ transitionDelay: '300ms' }}
>
  <div className="flex items-center mb-2 md:mb-0">
    <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
    </svg>
    <span>No credit card required</span>
  </div>
  <div className="flex items-center mb-2 md:mb-0">
    <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
    </svg>

    <span>Free Access to WhatsApp chatbot</span>
  </div>
  <div className="flex items-center mb-2 md:mb-0">
    <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
    </svg>
   

    <span>5 AI Suggestions per day</span>
  </div>


</div>

          </div>
          <div className={`md:w-1/2 mt-12 md:mt-0 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`} style={{transitionDelay: '400ms'}}>
            <div className="relative">
              <div className={`absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg transform rotate-3 scale-105 opacity-10 transition-all duration-1000 ${isVisible ? 'animate-pulse' : ''}`}></div>
              <img src="https://images.unsplash.com/photo-1586282023692-6bfbd629e85d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Task AI Studio AI Dashboard" className="rounded-lg shadow-2xl relative z-10 transition-transform hover:scale-102 transform" />
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="bg-gray-50 py-12 animate-on-scroll">
        <div className="container mx-auto px-6">
          <p className={`text-center text-gray-500 font-medium mb-8 transition-all duration-700 ${animatedElements['animate-on-scroll'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>Trusted by productivity-focused teams worldwide</p>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-70">
            {[1, 2, 3, 4].map((company, index) => (
              <div 
                key={company} 
                className={`h-8 transition-all duration-700 ${animatedElements['animate-on-scroll'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} 
                style={{transitionDelay: `${index * 100}ms`}}
              >
                <svg viewBox="0 0 100 30" fill="currentColor" className="h-full text-gray-400">
                  <rect width="100" height="30" fill="none" />
                  <text x="10" y="20" fontFamily="Arial" fontSize="16" fontWeight="bold">Company {company}</text>
                </svg>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="container mx-auto px-6 py-20 animate-on-scroll">
        <div className="text-center mb-16">
          <h2 className={`text-3xl font-bold text-gray-800 transition-all duration-700 ${animatedElements['features'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>Intelligent Task Management</h2>
          <p className={`mt-4 text-xl text-gray-600 max-w-2xl mx-auto transition-all duration-700 ${animatedElements['features'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{transitionDelay: '100ms'}}>
            Task AI Studio AI doesn't just organize your tasks — it learns from your habits and optimizes your workday.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-10">
          {[
            {
              icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />,
              title: "AI Prioritization",
              description: "Our AI analyzes deadlines, estimated time to completion, and task importance to suggest optimal work order."
            },
            {
              icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />,
              title: "Whatsapp Alerts",
              description: "Automatically sends WhatsApp notifications for tasks that need attention, ensuring you never miss a deadline."
            },
            {
              icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />,
              title: "Whatsapp chatbot",
              description: "Get Free Access to our WhatsApp chatbot that helps you view your tasks, so that you dont have to visit website every time."
            }
          ].map((feature, index) => (
            <div 
              key={feature.title} 
              className={`bg-white p-8 rounded-xl shadow-lg transition-all duration-700 hover:shadow-xl hover:-translate-y-2 ${animatedElements['features'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{transitionDelay: `${index * 150 + 200}ms`}}
            >
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-6">
                <svg className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {feature.icon}
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="bg-gray-50 py-20 animate-on-scroll">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className={`text-3xl font-bold text-gray-800 transition-all duration-700 ${animatedElements['how-it-works'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>How Task AI Studio AI Works</h2>
            <p className={`mt-4 text-xl text-gray-600 max-w-2xl mx-auto transition-all duration-700 ${animatedElements['how-it-works'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{transitionDelay: '100ms'}}>
              Our intelligent system learns and adapts to how you work best
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: "1", title: "Add Your Tasks", desc: "Enter tasks with details like title, description, and estimated time to completion." },
              { step: "2", title: "AI Analyzes Priorities", desc: "Our algorithm evaluates deadline proximity, importance, and your productivity patterns." },
              { step: "3", title: "Automatic Alerts", desc: "Get automatic alerts of pending tasks on whatsapp after every 3 hours." },
              { step: "4", title: "Improve Over Time", desc: "The AI learns from your completion patterns and refines its recommendations." }
            ].map((step, index) => (
              <div 
                key={step.step} 
                className={`flex flex-col items-center text-center transition-all duration-700 ${animatedElements['how-it-works'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{transitionDelay: `${index * 150 + 200}ms`}}
              >
                <div className="w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center text-white text-xl font-bold mb-4 transition-transform hover:scale-110 hover:bg-indigo-700">{step.step}</div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.desc}</p>
              </div>
            ))}
          </div>
          
          <div className={`mt-12 flex justify-center transition-all duration-1000 ${animatedElements['how-it-works'] ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`} style={{transitionDelay: '800ms'}}>
            <div className="h-1 bg-indigo-200 w-3/4 relative">
              {[25, 50, 75].map((pos) => (
                <div key={pos} className="absolute top-1/2 -translate-y-1/2" style={{left: `${pos}%`}}>
                  <div className="h-3 w-3 bg-indigo-600 rounded-full"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
  <section className="container mx-auto px-6 py-20">
  <div className="text-center mb-16">
    <h2 className="text-3xl font-bold text-gray-800">What Our Users Say</h2>
    <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
      Task AI Studio AI has helped thousands of professionals optimize their workflow
    </p>
  </div>

  <div className="grid md:grid-cols-3 gap-8">
    {[
      {
        initials: "JS",
        name: "Jamie Smith",
        role: "Product Manager",
        quote: "Task AI Studio AI has completely transformed how I manage my personal work flow . The smart prioritization ensures we're always working on what matters most.",
        bgColor: "bg-blue-100",
        textColor: "text-blue-600"
      },
      {
        initials: "MJ",
        name: "Michael Johnson",
        role: "Freelance Developer",
        quote: "As someone juggling multiple projects, the AI prioritization has been a game-changer. I'm completing projects faster with less stress and better focus.",
        bgColor: "bg-green-100",
        textColor: "text-green-600"
      },
      {
        initials: "AS",
        name: "Alice Smith",
        role: "Marketing Specialist",
        quote: "Task AI Studio AI's WhatsApp alerts keep me on track without overwhelming me. I love how it learns my work patterns and adapts to my needs.",
        bgColor: "bg-yellow-100",
        textColor: "text-pink-600"
      }
    ].map((testimonial, index) => (
      <div key={testimonial.name} className="bg-white p-8 rounded-xl shadow-lg">
        <div className="flex items-center mb-4">
          <div className={`w-12 h-12 ${testimonial.bgColor} rounded-full flex items-center justify-center ${testimonial.textColor} font-bold mr-4`}>
            {testimonial.initials}
          </div>
          <div>
            <h4 className="font-semibold text-gray-800">{testimonial.name}</h4>
            <p className="text-gray-500 text-sm">{testimonial.role}</p>
          </div>
        </div>
        <p className="text-gray-600">{testimonial.quote}</p>
        <div className="mt-4 flex text-yellow-400">
          {[...Array(5)].map((_, i) => (
            <svg key={i} className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>
      </div>
    ))}
  </div>
</section>


{/* Pricing */}
<section id="pricing" className="bg-gray-50 py-20 animate-on-scroll">
  <div className="container mx-auto px-6">
    <div className="text-center mb-16">
      <h2 className={`text-3xl font-bold text-gray-800 transition-all duration-700 ${animatedElements['pricing'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>Affordable Plans for Every Team</h2>
      <p className={`mt-4 text-xl text-gray-600 max-w-2xl mx-auto transition-all duration-700 ${animatedElements['pricing'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{transitionDelay: '100ms'}}>
        Select the plan that suits your team’s needs and growth.
      </p>
    </div>

    <div className="grid md:grid-cols-3 gap-8">
      <div 
        className={`bg-white p-8 rounded-xl shadow-lg transition-all duration-700 hover:shadow-xl hover:-translate-y-2 ${animatedElements['pricing'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      >
        <h3 className="text-xl font-semibold text-gray-800 mb-2">Basic</h3>
        <p className="text-gray-600 mb-4">Perfect for small teams to get started</p>
        <div className={`flex items-center justify-center bg-indigo-600 text-white font-bold rounded-lg h-12 w-24 mb-4 transition-all duration-500 ${animatedElements['pricing'] ? 'scale-100' : 'scale-0'}`} style={{transitionDelay: '300ms'}}>
          $0
        </div>
        <p className="text-gray-600 mb-4">Per user / month</p>
        <ul className="text-gray-600">
          {['Automated task reminders every 3-4 hours', 'Unlimited task creation', 'Basic task prioritization 5 times a day'].map((feature, i) => (
            <li 
              key={feature} 
              className={`flex items-center gap-2 mb-2 transition-all duration-500 ${animatedElements['pricing'] ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}
              style={{transitionDelay: `${i * 100 + 400}ms`}}
            >
              <svg className="h-5 w-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" clipRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9 9a1 1 0 011-1h1V6a1 1 0 112 0v2h1a1 1 0 110 2h-1v1a1 1 0 11-2 0V9H9a1 1 0 01-1-1z" />
              </svg>
              <span>{feature}</span>
            </li>
          ))}
        </ul>
        <a 
          href="#!" 
          className={`block bg-indigo-600 text-white rounded-lg font-semibold text-center py-3 hover:bg-indigo-700 transition mt-6 ${animatedElements['pricing'] ? 'opacity-100 translate-y-0 hover:scale-105' : 'opacity-0 translate-y-4'}`}
          style={{transitionDelay: '700ms'}}
        >
          Get Started
        </a>
      </div>
      
      <div 
        className={`bg-white p-8 rounded-xl shadow-lg transition-all duration-700 hover:shadow-xl hover:-translate-y-2 ${animatedElements['pricing'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      >
        <h3 className="text-xl font-semibold text-gray-800 mb-2">Professional</h3>
        <p className="text-gray-600 mb-4">Enhanced AI-driven task management for teams</p>
        <div className={`flex items-center justify-center bg-indigo-600 text-white font-bold rounded-lg h-12 w-24 mb-4 transition-all duration-500 ${animatedElements['pricing'] ? 'scale-100' : 'scale-0'}`} style={{transitionDelay: '300ms'}}>
          $5
        </div>
        <p className="text-gray-600 mb-4">Per user / month</p>
        <ul className="text-gray-600">
          {['AI-driven task prioritization with 50 tasks', 'Customizable task alerts time span', 'Integrated task management through whatsapp', 'In-depth productivity reports'].map((feature, i) => (
            <li 
              key={feature} 
              className={`flex items-center gap-2 mb-2 transition-all duration-500 ${animatedElements['pricing'] ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}
              style={{transitionDelay: `${i * 100 + 400}ms`}}
            >
              <svg className="h-5 w-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" clipRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9 9a1 1 0 011-1h1V6a1 1 0 112 0v2h1a1 1 0 110 2h-1v1a1 1 0 11-2 0V9H9a1 1 0 01-1-1z" />
              </svg>
              <span>{feature}</span>
            </li>
          ))}
        </ul>
        <a 
          href="#!" 
          className={`block bg-indigo-600 text-white rounded-lg font-semibold text-center py-3 hover:bg-indigo-700 transition mt-6 ${animatedElements['pricing'] ? 'opacity-100 translate-y-0 hover:scale-105' : 'opacity-0 translate-y-4'}`}
          style={{transitionDelay: '700ms'}}
        >
          Get Started
        </a>
      </div>
      
      <div 
        className={`bg-white p-8 rounded-xl shadow-lg transition-all duration-700 hover:shadow-xl hover:-translate-y-2 ${animatedElements['pricing'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      >
        <h3 className="text-xl font-semibold text-gray-800 mb-2">Enterprise</h3>
        <p className="text-gray-600 mb-4">All premium features with full customization</p>
        <div className={`flex items-center justify-center bg-indigo-600 text-white font-bold rounded-lg h-12 w-24 mb-4 transition-all duration-500 ${animatedElements['pricing'] ? 'scale-100' : 'scale-0'}`} style={{transitionDelay: '300ms'}}>
          $15
        </div>
        <p className="text-gray-600 mb-4">Per user / month</p>
        <ul className="text-gray-600">
          {['Unlimited AI task automation and customization', 'Custom alerts and task analytics on whatsapp','Add tasks through whatsapp', 'Prioritization by AI as per your requirements ', 'Advance reports about your productivity'].map((feature, i) => (
            <li 
              key={feature} 
              className={`flex items-center gap-2 mb-2 transition-all duration-500 ${animatedElements['pricing'] ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}
              style={{transitionDelay: `${i * 100 + 400}ms`}}
            >
              <svg className="h-5 w-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" clipRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9 9a1 1 0 011-1h1V6a1 1 0 112 0v2h1a1 1 0 110 2h-1v1a1 1 0 11-2 0V9H9a1 1 0 01-1-1z" />
              </svg>
              <span>{feature}</span>
            </li>
          ))}
        </ul>
        <a 
          href="#!" 
          className={`block bg-indigo-600 text-white rounded-lg font-semibold text-center py-3 hover:bg-indigo-700 transition mt-6 ${animatedElements['pricing'] ? 'opacity-100 translate-y-0 hover:scale-105' : 'opacity-0 translate-y-4'}`}
          style={{transitionDelay: '700ms'}}
        >
          Get Started
        </a>
      </div>
    </div>
  </div>
</section>


      {/* Back to top button that appears when scrolling */}
      {scrollY > 500 && (
        <button 
          onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}
          className="fixed bottom-8 right-8 bg-indigo-600 text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:bg-indigo-700 transition-all duration-300 hover:scale-110 z-50"
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </button>
      )}
    </div>
  );
}

export default Home;