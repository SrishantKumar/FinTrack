import { useState } from 'react';
import { X, ChevronRight, ChevronLeft, PlayCircle, CheckCircle2, ArrowLeft } from 'lucide-react';

interface Step {
  title: string;
  description: string;
  image: string;
  tips: string[];
}

const onboardingSteps: Step[] = [
  {
    title: "Welcome to FinTrack",
    description: "Your all-in-one financial management dashboard for startups. Let's get you started with the basics.",
    image: "https://i.imgur.com/KJAOu45.png?auto=format&fit=crop&q=80&w=1600",
    tips: [
      "View your financial metrics at a glance",
      "Track income and expenses easily",
      "Get real-time alerts and insights"
    ]
  },
  {
    title: "Adding Transactions",
    description: "Learn how to record your income and expenses quickly and efficiently.",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=1600",
    tips: [
      "Use Quick Add for fast entry",
      "Categorize transactions for better tracking",
      "Set recurring transactions for regular payments"
    ]
  },
  {
    title: "Financial Insights",
    description: "Understand your financial health with detailed analytics and reports.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1600",
    tips: [
      "Monitor cash runway and burn rate",
      "Track revenue growth trends",
      "Analyze expense breakdowns"
    ]
  },
  {
    title: "Data Integration",
    description: "Connect your existing financial accounts for automated tracking.",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1600",
    tips: [
      "Link bank accounts securely",
      "Import data from accounting software",
      "Set up automatic syncing"
    ]
  }
];

interface OnboardingGuideProps {
  onClose: () => void;
}

export function OnboardingGuide({ onClose }: OnboardingGuideProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const handleNext = () => {
    if (currentStep < onboardingSteps.length - 1) {
      setCurrentStep(currentStep + 1);
      setCompletedSteps([...completedSteps, currentStep]);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = () => {
    setCompletedSteps([...completedSteps, currentStep]);
    onClose();
  };

  const goToStep = (step: number) => {
    setCurrentStep(step);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-4xl">
        {/* Header */}
        <div className="p-6 border-b border-gray-100 dark:border-gray-700 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 rounded-lg"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <div className="flex items-center gap-2">
              <PlayCircle className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Getting Started Guide
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 rounded-lg"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="relative group">
            <img
              src={onboardingSteps[currentStep].image}
              alt={onboardingSteps[currentStep].title}
              className="w-full h-64 object-cover rounded-lg"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-lg" />
            
            {/* Navigation Arrows */}
            {currentStep > 0 && (
              <button
                onClick={handlePrevious}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/80 hover:bg-white rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <ChevronLeft className="h-6 w-6 text-gray-800" />
              </button>
            )}
            {currentStep < onboardingSteps.length - 1 && (
              <button
                onClick={handleNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/80 hover:bg-white rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <ChevronRight className="h-6 w-6 text-gray-800" />
              </button>
            )}
            
            <div className="absolute bottom-0 left-0 p-6">
              <h3 className="text-2xl font-bold text-white mb-2">
                {onboardingSteps[currentStep].title}
              </h3>
              <p className="text-gray-200">
                {onboardingSteps[currentStep].description}
              </p>
            </div>
          </div>

          <div className="mt-6">
            <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Key Tips:
            </h4>
            <ul className="space-y-3">
              {onboardingSteps[currentStep].tips.map((tip, index) => (
                <li key={index} className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-500 dark:text-green-400" />
                  <span className="text-gray-600 dark:text-gray-300">{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Progress Indicators */}
        <div className="px-6 py-4 border-t border-gray-100 dark:border-gray-700">
          <div className="flex justify-center gap-2 mb-4">
            {onboardingSteps.map((_, index) => (
              <button
                key={index}
                onClick={() => goToStep(index)}
                className={`h-2 w-2 rounded-full transition-colors cursor-pointer hover:scale-125 ${
                  index === currentStep
                    ? 'bg-blue-600 dark:bg-blue-400 w-4'
                    : completedSteps.includes(index)
                    ? 'bg-green-500 dark:bg-green-400'
                    : 'bg-gray-200 dark:bg-gray-600'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-100 dark:border-gray-700 flex justify-between">
          <button
            onClick={handlePrevious}
            disabled={currentStep === 0}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="h-4 w-4" />
            Previous
          </button>
          {currentStep === onboardingSteps.length - 1 ? (
            <button
              onClick={handleComplete}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg"
            >
              Complete Guide
              <CheckCircle2 className="h-4 w-4" />
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg"
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}