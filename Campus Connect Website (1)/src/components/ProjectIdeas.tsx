import { useState } from 'react';
import { Lightbulb, Plus, ThumbsUp } from 'lucide-react';

export function ProjectIdeas() {
  const [ideas, setIdeas] = useState([
    { id: 1, title: 'AI-Powered Study Planner', description: 'Create a smart planner that uses AI to optimize study schedules', author: 'Amulya', likes: 15 },
    { id: 2, title: 'Campus Navigation App', description: 'Mobile app to help navigate the campus with AR', author: 'Aakash_', likes: 23 },
    { id: 3, title: 'Smart Attendance System', description: 'Face recognition based attendance tracking', author: 'Ujjayani', likes: 18 },
    { id: 4, title: 'Virtual Lab Simulation', description: 'VR-based physics and chemistry lab experiments', author: 'Prajwal', likes: 12 },
  ]);
  const [showForm, setShowForm] = useState(false);
  const [newIdea, setNewIdea] = useState({ title: '', description: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newIdea.title && newIdea.description) {
      setIdeas([...ideas, {
        id: ideas.length + 1,
        ...newIdea,
        author: 'You',
        likes: 0
      }]);
      setNewIdea({ title: '', description: '' });
      setShowForm(false);
    }
  };

  const handleLike = (id: number) => {
    setIdeas(ideas.map(idea => 
      idea.id === id ? { ...idea, likes: idea.likes + 1 } : idea
    ));
  };

  return (
    <div className="mb-8 bg-white p-6 rounded-lg shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl flex items-center gap-2">
          <Lightbulb className="text-yellow-500" />
          Project Ideas
        </h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 bg-pink-400 hover:bg-pink-500 text-white px-4 py-2 rounded transition"
        >
          <Plus size={20} />
          Share Idea
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="mb-6 p-4 bg-gray-50 rounded-lg">
          <input
            type="text"
            placeholder="Project Title"
            value={newIdea.title}
            onChange={(e) => setNewIdea({ ...newIdea, title: e.target.value })}
            className="w-full p-3 mb-3 border border-gray-300 rounded"
            required
          />
          <textarea
            placeholder="Project Description"
            value={newIdea.description}
            onChange={(e) => setNewIdea({ ...newIdea, description: e.target.value })}
            className="w-full p-3 mb-3 border border-gray-300 rounded h-24"
            required
          />
          <div className="flex gap-2">
            <button type="submit" className="bg-pink-400 hover:bg-pink-500 text-white px-4 py-2 rounded transition">
              Submit
            </button>
            <button type="button" onClick={() => setShowForm(false)} className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded transition">
              Cancel
            </button>
          </div>
        </form>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {ideas.map(idea => (
          <div key={idea.id} className="border border-gray-200 p-4 rounded-lg hover:shadow-md transition">
            <h3 className="text-xl mb-2">{idea.title}</h3>
            <p className="text-gray-600 mb-3">{idea.description}</p>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">by {idea.author}</span>
              <button
                onClick={() => handleLike(idea.id)}
                className="flex items-center gap-1 text-pink-600 hover:text-pink-700 transition"
              >
                <ThumbsUp size={16} />
                <span>{idea.likes}</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
