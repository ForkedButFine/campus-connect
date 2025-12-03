import { useState, useRef, useEffect } from 'react';
import { Navbar } from './Navbar';
import { Send, Shield, AlertTriangle } from 'lucide-react';

interface AntiRaggingProps {
  currentUser: any;
  onNavigate: (page: string) => void;
  onLogout: () => void;
}

export function AntiRagging({ currentUser, onNavigate, onLogout }: AntiRaggingProps) {
  const [messages, setMessages] = useState<any[]>([
    { id: 1, text: "Welcome to the Anti-Ragging Anonymous Support Chat. Your identity is protected. You can safely report any incidents or seek help. How can we assist you today?", sender: 'support', timestamp: new Date().toISOString() }
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const getSupportResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();

    if (lowerMessage.includes('ragging') || lowerMessage.includes('bullying') || lowerMessage.includes('harassment')) {
      return "I'm sorry to hear you're experiencing this. Ragging is a serious offense. Here's what you can do:\n\n1. Document the incident (date, time, location, people involved)\n2. Report to the Anti-Ragging Committee immediately\n3. Contact campus security: 1800-XXX-XXXX\n4. You can file an anonymous complaint\n5. Speak to a counselor\n\nYour safety is our priority. Would you like help filing a report?";
    }

    if (lowerMessage.includes('report') || lowerMessage.includes('complaint')) {
      return "To file an anonymous report:\n\n1. Describe the incident in detail\n2. Include date, time, and location\n3. Mention any witnesses\n4. Your identity will remain confidential\n\nThe Anti-Ragging Committee will investigate immediately. You can also call our 24/7 helpline: 1800-180-5522 (UGC Anti-Ragging Helpline)";
    }

    if (lowerMessage.includes('afraid') || lowerMessage.includes('scared') || lowerMessage.includes('fear')) {
      return "It's completely normal to feel afraid, but please know that you're not alone. The campus has zero tolerance for ragging. Here are some steps:\n\n• Your complaint will be kept anonymous\n• Campus security will ensure your safety\n• Counseling services are available\n• Legal action will be taken against offenders\n\nWould you like to speak with a counselor?";
    }

    if (lowerMessage.includes('help') || lowerMessage.includes('what to do')) {
      return "If you're facing ragging or know someone who is:\n\n✓ Stay safe - avoid isolated areas\n✓ Inform parents/guardians\n✓ Contact Anti-Ragging Committee\n✓ Use this anonymous chat anytime\n✓ Call helpline: 1800-180-5522\n✓ Report to Dean of Student Affairs\n\nRemember: Ragging is a criminal offense punishable by law.";
    }

    if (lowerMessage.includes('witness') || lowerMessage.includes('saw')) {
      return "Thank you for being a responsible citizen. Witnessing ragging and staying silent enables it. Here's how you can help:\n\n• Report what you witnessed anonymously\n• Provide as many details as possible\n• Support the victim\n• Spread awareness\n\nYour report can save someone from trauma. Would you like to submit a witness report?";
    }

    if (lowerMessage.includes('thanks') || lowerMessage.includes('thank you')) {
      return "You're welcome. Remember, we're here 24/7 to support you. Stay safe and don't hesitate to reach out anytime.";
    }

    return "I'm here to help you with any ragging-related concerns. You can:\n\n• Report an incident anonymously\n• Seek counseling support\n• Get information about your rights\n• Learn about campus safety measures\n• Contact emergency helpline\n\nYour identity is protected. How can I assist you?";
  };

  const handleSend = () => {
    if (input.trim()) {
      const userMessage = { 
        id: messages.length + 1, 
        text: input, 
        sender: 'anonymous',
        timestamp: new Date().toISOString()
      };
      setMessages([...messages, userMessage]);
      setInput('');

      setTimeout(() => {
        const supportResponse = getSupportResponse(input);
        const supportMessage = { 
          id: messages.length + 2, 
          text: supportResponse, 
          sender: 'support',
          timestamp: new Date().toISOString()
        };
        setMessages(prev => [...prev, supportMessage]);
      }, 1000);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar currentUser={currentUser} onNavigate={onNavigate} onLogout={onLogout} />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="text-red-500" size={24} />
              <h3 className="text-red-700">Emergency Helplines</h3>
            </div>
            <p className="text-red-700">UGC Anti-Ragging Helpline: 1800-180-5522 (24/7)</p>
            <p className="text-red-700">Campus Security: 1800-XXX-XXXX</p>
          </div>

          <div className="bg-white rounded-lg shadow-lg" style={{ height: '70vh' }}>
            <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white p-4 rounded-t-lg flex items-center gap-3">
              <Shield size={32} />
              <div>
                <h2 className="text-2xl">Anti-Ragging Anonymous Support</h2>
                <p className="text-sm opacity-90">Your identity is protected. Chat anonymously.</p>
              </div>
            </div>

            <div className="p-4 overflow-y-auto" style={{ height: 'calc(70vh - 140px)' }}>
              {messages.map(message => (
                <div key={message.id} className={`mb-4 flex ${message.sender === 'anonymous' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-md p-3 rounded-lg ${
                    message.sender === 'anonymous' 
                      ? 'bg-blue-400 text-white' 
                      : 'bg-gray-200'
                  }`}>
                    <p className="whitespace-pre-line">{message.text}</p>
                    <p className="text-xs mt-1 opacity-75">
                      {new Date(message.timestamp).toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            <div className="p-4 border-t">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Type your message anonymously..."
                  className="flex-1 p-3 border border-gray-300 rounded-lg"
                />
                <button
                  onClick={handleSend}
                  className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg transition flex items-center gap-2"
                >
                  <Send size={20} />
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
