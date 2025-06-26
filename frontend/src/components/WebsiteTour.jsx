import { useState, useEffect } from 'react';
import { X, Plus, MessageCircle, CheckCircle } from 'lucide-react';

const OnboardingOverlay = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);

    useEffect(() => {
        // Check if user has seen the onboarding before
        const hasSeenOnboarding = localStorage.getItem('hasSeenOnboarding');

        if (!hasSeenOnboarding) {
            // Show overlay after a short delay
            const timer = setTimeout(() => {
                setIsVisible(true);
            }, 1000);

            return () => clearTimeout(timer);
        }
    }, []);

    const handleClose = () => {
        setIsVisible(false);
        // Mark as seen so it won't show again
        localStorage.setItem('hasSeenOnboarding', 'true');
    };

    const handleNext = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep(currentStep + 1);
        } else {
            handleClose();
        }
    };

    const handlePrevious = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    const steps = [
        {
            icon: <Plus className="w-12 h-12 text-indigo-600" />,
            title: "Step 1: Add Your First Task",
            description: "Start by creating your first task. Click the 'Add Task' button and enter what you need to get done.",
            highlight: "Create tasks with deadlines and priorities to get started."
        },
        {
            icon: <MessageCircle className="w-12 h-12 text-green-600" />,
            title: "Step 2: Connect WhatsApp",
            description: "Click the WhatsApp icon to connect your account. This enables smart reminders and task management through chat.",
            highlight: "Get reminders and manage tasks right from WhatsApp!"
        },
        {
            icon: <CheckCircle className="w-12 h-12 text-emerald-600" />,
            title: "You're All Set!",
            description: "That's it! Our AI will now prioritize your tasks and send timely WhatsApp reminders. Start being more productive today.",
            highlight: "Let our AI handle the scheduling while you focus on what matters."
        }
    ];

    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 relative animate-in fade-in zoom-in duration-300 pointer-events-auto border-2 border-indigo-200">
                {/* Close button */}
                <button
                    onClick={handleClose}
                    className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
                >
                    <X className="w-5 h-5 text-gray-500" />
                </button>

                {/* Content */}
                <div className="p-8 text-center">
                    {/* Progress indicators */}
                    <div className="flex justify-center mb-6">
                        {steps.map((_, index) => (
                            <div
                                key={index}
                                className={`w-2 h-2 rounded-full mx-1 transition-colors ${index === currentStep ? 'bg-indigo-600' : 'bg-gray-300'
                                    }`}
                            />
                        ))}
                    </div>

                    {/* Step content */}
                    <div className="mb-8">
                        <div className="flex justify-center mb-4">
                            <div className="p-3 bg-gray-50 rounded-full">
                                {steps[currentStep].icon}
                            </div>
                        </div>

                        <h2 className="text-2xl font-bold text-gray-900 mb-3">
                            {steps[currentStep].title}
                        </h2>

                        <p className="text-gray-600 mb-4 leading-relaxed">
                            {steps[currentStep].description}
                        </p>

                        <div className="bg-indigo-50 border border-indigo-100 rounded-lg p-3">
                            <p className="text-indigo-700 text-sm font-medium">
                                💡 {steps[currentStep].highlight}
                            </p>
                        </div>
                    </div>

                    {/* Navigation buttons */}
                    <div className="flex justify-between items-center">
                        <button
                            onClick={handlePrevious}
                            disabled={currentStep === 0}
                            className={`px-4 py-2 rounded-lg font-medium transition-colors ${currentStep === 0
                                    ? 'text-gray-400 cursor-not-allowed'
                                    : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
                                }`}
                        >
                            Previous
                        </button>

                        <button
                            onClick={handleNext}
                            className="px-6 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors"
                        >
                            {currentStep === steps.length - 1 ? 'Get Started' : 'Next'}
                        </button>
                    </div>

                    {/* Skip option */}
                    <button
                        onClick={handleClose}
                        className="text-gray-400 text-sm hover:text-gray-600 transition-colors mt-4"
                    >
                        Skip tutorial
                    </button>
                </div>
            </div>
        </div>
    );
};

export default OnboardingOverlay;