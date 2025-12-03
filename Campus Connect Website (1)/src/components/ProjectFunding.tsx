import { useState } from 'react';
import { Navbar } from './Navbar';
import { Lightbulb, Plus, ThumbsUp, Trophy, DollarSign } from 'lucide-react';

interface ProjectFundingProps {
  currentUser: any;
  onNavigate: (page: string) => void;
  onLogout: () => void;
}

export function ProjectFunding({ currentUser, onNavigate, onLogout }: ProjectFundingProps) {
  const [projects, setProjects] = useState([
    { id: 1, title: 'AI-Powered Campus Security System', description: 'Real-time threat detection using AI and IoT sensors across campus', author: 'Amulya', votes: 45, fundingGoal: '₹2,00,000' },
    { id: 2, title: 'Smart Library Management', description: 'Automated book tracking and recommendation system', author: 'Aakash_', votes: 38, fundingGoal: '₹1,50,000' },
    { id: 3, title: 'Campus Waste Management System', description: 'IoT-based waste segregation and recycling solution', author: 'Ujjayani', votes: 52, fundingGoal: '₹1,80,000' },
    { id: 4, title: 'Virtual Reality Lab Simulator', description: 'VR-based physics and chemistry experiments for remote learning', author: 'Prajwal', votes: 41, fundingGoal: '₹3,00,000' },
    { id: 5, title: 'Student Mental Health App', description: 'AI chatbot for mental health support and counseling', author: 'Disha', votes: 36, fundingGoal: '₹1,20,000' },
  ]);
  const [showForm, setShowForm] = useState(false);
  const [newProject, setNewProject] = useState({ title: '', description: '', fundingGoal: '' });
  const [votedProjects, setVotedProjects] = useState<number[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newProject.title && newProject.description && newProject.fundingGoal) {
      setProjects([...projects, {
        id: projects.length + 1,
        ...newProject,
        author: currentUser.name,
        votes: 0
      }]);
      setNewProject({ title: '', description: '', fundingGoal: '' });
      setShowForm(false);
    }
  };

  const handleVote = (id: number) => {
    if (!votedProjects.includes(id)) {
      setProjects(projects.map(project => 
        project.id === id ? { ...project, votes: project.votes + 1 } : project
      ));
      setVotedProjects([...votedProjects, id]);
    }
  };

  const sortedProjects = [...projects].sort((a, b) => b.votes - a.votes);
  const topProject = sortedProjects[0];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar currentUser={currentUser} onNavigate={onNavigate} onLogout={onLogout} />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl mb-2 flex items-center gap-2">
              <DollarSign className="text-green-500" />
              Project Funding
            </h1>
            <p className="text-gray-600">Vote for projects you believe in. Most appreciated project wins funding!</p>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-2 bg-pink-400 hover:bg-pink-500 text-white px-4 py-2 rounded transition"
          >
            <Plus size={20} />
            Submit Project
          </button>
        </div>

        {showForm && (
          <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
            <h2 className="text-2xl mb-4">Submit Your Project</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block mb-2">Project Title</label>
                <input
                  type="text"
                  value={newProject.title}
                  onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Project Description</label>
                <textarea
                  value={newProject.description}
                  onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded h-24"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Funding Goal</label>
                <input
                  type="text"
                  value={newProject.fundingGoal}
                  onChange={(e) => setNewProject({ ...newProject, fundingGoal: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded"
                  placeholder="e.g., ₹2,00,000"
                  required
                />
              </div>
              <div className="flex gap-2">
                <button type="submit" className="bg-pink-400 hover:bg-pink-500 text-white px-4 py-2 rounded transition">
                  Submit
                </button>
                <button type="button" onClick={() => setShowForm(false)} className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded transition">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {topProject && (
          <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white p-6 rounded-lg shadow-xl mb-8">
            <div className="flex items-center gap-3 mb-4">
              <Trophy size={32} />
              <h2 className="text-3xl">Leading Project</h2>
            </div>
            <h3 className="text-2xl mb-2">{topProject.title}</h3>
            <p className="mb-2">{topProject.description}</p>
            <p className="mb-1">By: {topProject.author}</p>
            <p>Funding Goal: {topProject.fundingGoal}</p>
            <div className="flex items-center gap-2 mt-3">
              <ThumbsUp size={20} />
              <span className="text-xl">{topProject.votes} votes</span>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sortedProjects.map((project, index) => (
            <div key={project.id} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition">
              {index === 0 && (
                <div className="flex items-center gap-2 text-yellow-500 mb-2">
                  <Trophy size={20} />
                  <span>Top Project</span>
                </div>
              )}
              <h3 className="text-2xl mb-2">{project.title}</h3>
              <p className="text-gray-600 mb-3">{project.description}</p>
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-gray-500">by {project.author}</span>
                <span className="text-green-600">{project.fundingGoal}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ThumbsUp size={20} className="text-pink-500" />
                  <span className="text-lg">{project.votes} votes</span>
                </div>
                <button
                  onClick={() => handleVote(project.id)}
                  disabled={votedProjects.includes(project.id)}
                  className={`px-4 py-2 rounded transition ${
                    votedProjects.includes(project.id)
                      ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                      : 'bg-pink-400 hover:bg-pink-500 text-white'
                  }`}
                >
                  {votedProjects.includes(project.id) ? 'Voted' : 'Vote'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
