import { useState } from 'react';
import { Navbar } from './Navbar';
import { HelpCircle, Plus, MessageCircle, ThumbsUp } from 'lucide-react';

interface QnABoardProps {
  currentUser: any;
  onNavigate: (page: string) => void;
  onLogout: () => void;
}

export function QnABoard({ currentUser, onNavigate, onLogout }: QnABoardProps) {
  const [questions, setQuestions] = useState([
    { 
      id: 1, 
      title: 'How to solve differential equations in MATLAB?',
      description: 'I\'m struggling with solving second-order differential equations. Can someone explain the syntax?',
      author: 'Amulya',
      category: 'Mathematics',
      votes: 5,
      answers: 3,
      timestamp: new Date().toISOString()
    },
    { 
      id: 2, 
      title: 'Best resources for learning React Hooks?',
      description: 'Looking for good tutorials or documentation to understand React Hooks better.',
      author: 'Aakash_',
      category: 'Programming',
      votes: 8,
      answers: 5,
      timestamp: new Date().toISOString()
    },
    { 
      id: 3, 
      title: 'Physics lab report format?',
      description: 'What is the standard format for submitting physics lab reports?',
      author: 'Ujjayani',
      category: 'Physics',
      votes: 3,
      answers: 2,
      timestamp: new Date().toISOString()
    },
  ]);
  const [showForm, setShowForm] = useState(false);
  const [newQuestion, setNewQuestion] = useState({
    title: '',
    description: '',
    category: 'General'
  });
  const [votedQuestions, setVotedQuestions] = useState<number[]>([]);

  const categories = ['All', 'General', 'Mathematics', 'Physics', 'Programming', 'Chemistry', 'Campus Life'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const question = {
      id: questions.length + 1,
      ...newQuestion,
      author: currentUser.name,
      votes: 0,
      answers: 0,
      timestamp: new Date().toISOString()
    };
    setQuestions([question, ...questions]);
    setNewQuestion({ title: '', description: '', category: 'General' });
    setShowForm(false);
  };

  const handleVote = (id: number) => {
    if (!votedQuestions.includes(id)) {
      setQuestions(questions.map(q =>
        q.id === id ? { ...q, votes: q.votes + 1 } : q
      ));
      setVotedQuestions([...votedQuestions, id]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar currentUser={currentUser} onNavigate={onNavigate} onLogout={onLogout} />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl mb-2 flex items-center gap-2">
              <HelpCircle className="text-amber-500" />
              Community Q&A Board
            </h1>
            <p className="text-gray-600">Ask questions, share knowledge, help each other</p>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded transition"
          >
            <Plus size={20} />
            Ask Question
          </button>
        </div>

        {showForm && (
          <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
            <h2 className="text-2xl mb-4">Ask a Question</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block mb-2">Question Title</label>
                <input
                  type="text"
                  value={newQuestion.title}
                  onChange={(e) => setNewQuestion({ ...newQuestion, title: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded"
                  placeholder="What's your question?"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Category</label>
                <select
                  value={newQuestion.category}
                  onChange={(e) => setNewQuestion({ ...newQuestion, category: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded"
                >
                  {categories.filter(c => c !== 'All').map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label className="block mb-2">Description</label>
                <textarea
                  value={newQuestion.description}
                  onChange={(e) => setNewQuestion({ ...newQuestion, description: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded h-32"
                  placeholder="Provide more details about your question..."
                  required
                />
              </div>
              <div className="flex gap-2">
                <button type="submit" className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded transition">
                  Post Question
                </button>
                <button type="button" onClick={() => setShowForm(false)} className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded transition">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="space-y-4">
          {questions.map(question => (
            <div key={question.id} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition">
              <div className="flex gap-4">
                <div className="flex flex-col items-center gap-2">
                  <button
                    onClick={() => handleVote(question.id)}
                    disabled={votedQuestions.includes(question.id)}
                    className={`p-2 rounded transition ${
                      votedQuestions.includes(question.id)
                        ? 'text-amber-600'
                        : 'hover:bg-gray-100'
                    }`}
                  >
                    <ThumbsUp size={20} fill={votedQuestions.includes(question.id) ? 'currentColor' : 'none'} />
                  </button>
                  <span>{question.votes}</span>
                </div>

                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-xl">{question.title}</h3>
                    <span className="bg-amber-100 text-amber-700 px-3 py-1 rounded text-sm">
                      {question.category}
                    </span>
                  </div>
                  <p className="text-gray-700 mb-3">{question.description}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span>Asked by {question.author}</span>
                    <span>•</span>
                    <span>{new Date(question.timestamp).toLocaleDateString()}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <MessageCircle size={16} />
                      {question.answers} answers
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
