import { useState } from 'react';
import { X, Search, MessageCircle, FileText, Phone, Mail } from 'lucide-react';

interface HelpSupportModalProps {
  onClose: () => void;
}

const faqs = [
  {
    question: 'How do I add a new transaction?',
    answer: 'You can add a new transaction by clicking the "Quick Add Transaction" button at the top of the transactions list. Fill in the required details and click "Add Transaction".'
  },
  {
    question: 'How do I export financial reports?',
    answer: 'Each section (Cash Balance, Burn Rate, etc.) has an export button that allows you to download the data as a PDF report.'
  },
  {
    question: 'How do I connect my bank account?',
    answer: 'Go to Data Integrations section and click on "Connect Bank Account". Follow the secure authentication process to link your account.'
  }
];

export function HelpSupportModal({ onClose }: HelpSupportModalProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFaq, setSelectedFaq] = useState<number | null>(null);

  const filteredFaqs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl h-[90vh] flex flex-col">
        {/* Header - Fixed */}
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">Help & Support</h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-500 rounded-lg"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content - Scrollable */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-6">
            {/* Search */}
            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search help articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-left">
                <MessageCircle className="h-5 w-5 text-blue-600 mb-2" />
                <h3 className="font-medium text-gray-900">Live Chat</h3>
                <p className="text-sm text-gray-500">Chat with our support team</p>
              </button>
              <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-left">
                <FileText className="h-5 w-5 text-blue-600 mb-2" />
                <h3 className="font-medium text-gray-900">Documentation</h3>
                <p className="text-sm text-gray-500">Browse our guides</p>
              </button>
              <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-left">
                <Phone className="h-5 w-5 text-blue-600 mb-2" />
                <h3 className="font-medium text-gray-900">Call Support</h3>
                <p className="text-sm text-gray-500">Speak with an agent</p>
              </button>
            </div>

            {/* FAQs */}
            <div>
              <h3 className="font-medium text-gray-900 mb-4">Frequently Asked Questions</h3>
              <div className="space-y-3">
                {filteredFaqs.map((faq, index) => (
                  <div
                    key={index}
                    className="border border-gray-200 rounded-lg overflow-hidden"
                  >
                    <button
                      onClick={() => setSelectedFaq(selectedFaq === index ? null : index)}
                      className="w-full p-4 text-left flex items-center justify-between hover:bg-gray-50"
                    >
                      <span className="font-medium text-gray-900">{faq.question}</span>
                      <span className="text-gray-400">{selectedFaq === index ? '−' : '+'}</span>
                    </button>
                    {selectedFaq === index && (
                      <div className="p-4 bg-gray-50 border-t border-gray-200">
                        <p className="text-gray-600">{faq.answer}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Contact */}
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-2 text-gray-600">
                <Mail className="h-4 w-4" />
                <span>Still need help? Email us at Srishant054@gmail.com</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}