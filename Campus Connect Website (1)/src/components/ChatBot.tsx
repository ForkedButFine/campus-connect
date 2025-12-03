import { useState, useRef, useEffect } from 'react';
import { Navbar } from './Navbar';
import { Send, Bot } from 'lucide-react';

interface ChatBotProps {
  currentUser: any;
  onNavigate: (page: string) => void;
  onLogout: () => void;
}

export function ChatBot({ currentUser, onNavigate, onLogout }: ChatBotProps) {
  const [messages, setMessages] = useState<any[]>([
    { id: 1, text: "Hello! I'm your Campus Connect AI Assistant. I can help you with studies, peer pressure advice, mentorship, and academic guidance. How can I assist you today?", sender: 'bot' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const getBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();

    // Study help
    if (lowerMessage.includes('study') || lowerMessage.includes('exam') || lowerMessage.includes('test')) {
      return "I'd be happy to help with your studies! Here are some effective study techniques:\n\n1. **Pomodoro Technique**: Study for 25 minutes, then take a 5-minute break\n2. **Active Recall**: Test yourself regularly instead of just re-reading\n3. **Spaced Repetition**: Review material at increasing intervals\n4. **Mind Mapping**: Create visual connections between concepts\n\nWhat subject are you studying?";
    }

    // Math help
    if (lowerMessage.includes('math') || lowerMessage.includes('calculus') || lowerMessage.includes('algebra')) {
      return "Mathematics can be challenging! Here are my tips:\n\n• Practice problems daily\n• Understand concepts before memorizing formulas\n• Break complex problems into smaller steps\n• Use visual aids and graphs\n• Join study groups\n\nProfessor Kishor and Sagar from the math lab are excellent resources. Would you like specific help with a math topic?";
    }

    // Physics help
    if (lowerMessage.includes('physics') || lowerMessage.includes('mechanics')) {
      return "Physics requires both conceptual understanding and problem-solving skills!\n\n• Visualize concepts with diagrams\n• Relate physics to real-world examples\n• Practice dimensional analysis\n• Work through derivations step-by-step\n\nProfessor Rajash Gopal is an excellent physics teacher. Need help with a specific physics topic?";
    }

    // Programming help
    if (lowerMessage.includes('coding') || lowerMessage.includes('programming') || lowerMessage.includes('python') || lowerMessage.includes('java')) {
      return "Programming is a valuable skill! Here's my advice:\n\n• Start with small projects\n• Practice coding daily\n• Debug systematically\n• Read others' code\n• Participate in coding challenges\n\nProfessor Shilpa Shree teaches C programming, and Dr. Shiva Kumar teaches Python. What programming language are you learning?";
    }

    // Peer pressure
    if (lowerMessage.includes('pressure') || lowerMessage.includes('stress') || lowerMessage.includes('anxiety')) {
      return "I understand that academic and peer pressure can be overwhelming. Here's some advice:\n\n• Remember that everyone has their own pace\n• Focus on your personal growth, not comparisons\n• Take regular breaks and practice self-care\n• Talk to friends, mentors, or counselors\n• Set realistic goals and celebrate small wins\n\nYour mental health is just as important as academics. Would you like to talk more about what's bothering you?";
    }

    // Mentorship
    if (lowerMessage.includes('mentor') || lowerMessage.includes('guidance') || lowerMessage.includes('career')) {
      return "Mentorship is crucial for personal and professional growth!\n\n• Identify your goals and interests\n• Reach out to seniors and professors\n• Attend networking events and workshops\n• Be open to feedback and learning\n• Build meaningful relationships\n\nOur teachers are excellent mentors. Professor T Sruthi specializes in soft skills, and Professor Anaswara can help with design thinking. What area would you like guidance in?";
    }

    // Time management
    if (lowerMessage.includes('time') || lowerMessage.includes('manage') || lowerMessage.includes('schedule')) {
      return "Time management is key to academic success!\n\n• Use a planner or digital calendar\n• Prioritize tasks using the Eisenhower Matrix\n• Set specific study times\n• Avoid multitasking\n• Learn to say no to distractions\n\nWould you like help creating a study schedule?";
    }

    // Chemistry
    if (lowerMessage.includes('chemistry') || lowerMessage.includes('chemical')) {
      return "Chemistry combines theory with practical application!\n\n• Understand periodic trends\n• Practice balancing equations\n• Memorize common reactions\n• Use molecular models\n• Relate concepts to everyday life\n\nProfessor Ayappa is an excellent chemistry teacher. What chemistry topic do you need help with?";
    }

    // Electronics/ECE
    if (lowerMessage.includes('electronics') || lowerMessage.includes('circuit') || lowerMessage.includes('ece')) {
      return "Electronics and circuits require both theoretical and practical knowledge!\n\n• Master Ohm's Law and Kirchhoff's laws\n• Practice circuit analysis\n• Build simple circuits hands-on\n• Understand component datasheets\n• Use simulation software\n\nProfessor Sachin teaches ECE. Would you like specific help with circuit analysis?";
    }

    // Design
    if (lowerMessage.includes('design') || lowerMessage.includes('idt')) {
      return "Design thinking is about creative problem-solving!\n\n• Empathize with users\n• Define the problem clearly\n• Ideate multiple solutions\n• Prototype quickly\n• Test and iterate\n\nProfessor Anaswara specializes in IDT design. What design challenge are you working on?";
    }

    // CADE
    if (lowerMessage.includes('cade') || lowerMessage.includes('cad')) {
      return "Computer-Aided Design & Engineering is essential for modern engineering!\n\n• Master the software tools\n• Practice with real-world projects\n• Pay attention to detail\n• Learn keyboard shortcuts\n• Watch tutorial videos\n\nProfessor B Rajender Prasad teaches CADE. Need help with specific software?";
    }

    // Default helpful response
    return "I'm here to help! I can assist you with:\n\n📚 Study techniques and exam preparation\n💪 Dealing with peer pressure and stress\n🎯 Career guidance and mentorship\n📖 Subject-specific help (Math, Physics, Programming, Chemistry, etc.)\n⏰ Time management and productivity\n\nWhat would you like to discuss?";
  };

  const handleSend = () => {
    if (input.trim()) {
      const userMessage = { id: messages.length + 1, text: input, sender: 'user' };
      setMessages([...messages, userMessage]);
      setInput('');
      setIsTyping(true);

      setTimeout(() => {
        const botResponse = getBotResponse(input);
        const botMessage = { id: messages.length + 2, text: botResponse, sender: 'bot' };
        setMessages(prev => [...prev, botMessage]);
        setIsTyping(false);
      }, 1000);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar currentUser={currentUser} onNavigate={onNavigate} onLogout={onLogout} />
      
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg max-w-4xl mx-auto" style={{ height: '70vh' }}>
          <div className="bg-gradient-to-r from-pink-400 to-purple-500 text-white p-4 rounded-t-lg flex items-center gap-3">
            <Bot size={32} />
            <div>
              <h2 className="text-2xl">Campus Connect AI Assistant</h2>
              <p className="text-sm opacity-90">Your personal study and mentorship companion</p>
            </div>
          </div>

          <div className="p-4 overflow-y-auto" style={{ height: 'calc(70vh - 140px)' }}>
            {messages.map(message => (
              <div key={message.id} className={`mb-4 flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-md p-3 rounded-lg ${message.sender === 'user' ? 'bg-pink-400 text-white' : 'bg-gray-200'}`}>
                  <p className="whitespace-pre-line">{message.text}</p>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="mb-4 flex justify-start">
                <div className="bg-gray-200 p-3 rounded-lg">
                  <p>Typing...</p>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-4 border-t">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask me anything about studies, career, or life advice..."
                className="flex-1 p-3 border border-gray-300 rounded-lg"
              />
              <button
                onClick={handleSend}
                className="bg-pink-400 hover:bg-pink-500 text-white px-6 py-3 rounded-lg transition flex items-center gap-2"
              >
                <Send size={20} />
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
