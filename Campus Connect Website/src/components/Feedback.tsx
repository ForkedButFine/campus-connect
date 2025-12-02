import { useState } from 'react';
import { Navbar } from './Navbar';
import { Star } from 'lucide-react';

interface FeedbackProps {
  currentUser: any;
  feedback: any[];
  setFeedback: (feedback: any[]) => void;
  onNavigate: (page: string) => void;
  onLogout: () => void;
}

export function Feedback({ currentUser, feedback, setFeedback, onNavigate, onLogout }: FeedbackProps) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [category, setCategory] = useState('general');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newFeedback = {
      id: feedback.length + 1,
      author: currentUser.name,
      rating,
      comment,
      category,
      timestamp: new Date().toISOString()
    };
    setFeedback([newFeedback, ...feedback]);
    setRating(0);
    setComment('');
    setCategory('general');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar currentUser={currentUser} onNavigate={onNavigate} onLogout={onLogout} />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl mb-8">Feedback</h1>

          <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
            <h2 className="text-2xl mb-4">Share Your Feedback</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block mb-2">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded"
                >
                  <option value="general">General</option>
                  <option value="teaching">Teaching</option>
                  <option value="facilities">Facilities</option>
                  <option value="events">Events</option>
                  <option value="platform">Platform</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="block mb-2">Rating</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map(star => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className="transition hover:scale-110"
                    >
                      <Star
                        size={32}
                        fill={star <= rating ? '#fbbf24' : 'none'}
                        className={star <= rating ? 'text-yellow-400' : 'text-gray-300'}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-4">
                <label className="block mb-2">Comments</label>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded h-32"
                  placeholder="Share your thoughts..."
                  required
                />
              </div>

              <button
                type="submit"
                className="bg-pink-400 hover:bg-pink-500 text-white px-6 py-2 rounded transition"
                disabled={rating === 0}
              >
                Submit Feedback
              </button>
            </form>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl">Recent Feedback</h2>
            {feedback.map(fb => (
              <div key={fb.id} className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="mb-1">{fb.author}</h3>
                    <p className="text-sm text-gray-500 capitalize">{fb.category}</p>
                  </div>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map(star => (
                      <Star
                        key={star}
                        size={16}
                        fill={star <= fb.rating ? '#fbbf24' : 'none'}
                        className={star <= fb.rating ? 'text-yellow-400' : 'text-gray-300'}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-gray-700">{fb.comment}</p>
                <p className="text-sm text-gray-500 mt-2">
                  {new Date(fb.timestamp).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
