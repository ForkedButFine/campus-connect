import { useState } from 'react';
import { Navbar } from './Navbar';
import { Lightbulb, Plus, Users } from 'lucide-react';

interface SkillExchangeProps {
  currentUser: any;
  onNavigate: (page: string) => void;
  onLogout: () => void;
}

export function SkillExchange({ currentUser, onNavigate, onLogout }: SkillExchangeProps) {
  const [skills, setSkills] = useState([
    { id: 1, name: 'Amulya', canTeach: 'Python Programming', wantsToLearn: 'UI/UX Design', availability: 'Weekends', email: 'amulya@campus.com' },
    { id: 2, name: 'Disha', canTeach: 'UI/UX Design', wantsToLearn: 'Web Development', availability: 'Evenings', email: 'disha@campus.com' },
    { id: 3, name: 'Prajwal', canTeach: 'Competitive Programming', wantsToLearn: 'Machine Learning', availability: 'Mon-Fri 5-7 PM', email: 'prajwal@campus.com' },
    { id: 4, name: 'Aakash_', canTeach: 'Full Stack Development', wantsToLearn: 'Mobile App Development', availability: 'Flexible', email: 'aakash@campus.com' },
  ]);
  const [showForm, setShowForm] = useState(false);
  const [newSkill, setNewSkill] = useState({
    canTeach: '',
    wantsToLearn: '',
    availability: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const skill = {
      id: skills.length + 1,
      name: currentUser.name,
      ...newSkill,
      email: currentUser.email
    };
    setSkills([...skills, skill]);
    setNewSkill({ canTeach: '', wantsToLearn: '', availability: '' });
    setShowForm(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar currentUser={currentUser} onNavigate={onNavigate} onLogout={onLogout} />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl mb-2 flex items-center gap-2">
              <Lightbulb className="text-violet-500" />
              Skill Exchange Marketplace
            </h1>
            <p className="text-gray-600">Share your expertise and learn from others</p>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-2 bg-violet-500 hover:bg-violet-600 text-white px-4 py-2 rounded transition"
          >
            <Plus size={20} />
            Add Your Skills
          </button>
        </div>

        {showForm && (
          <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
            <h2 className="text-2xl mb-4">Share Your Skills</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block mb-2">I can teach</label>
                <input
                  type="text"
                  value={newSkill.canTeach}
                  onChange={(e) => setNewSkill({ ...newSkill, canTeach: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded"
                  placeholder="e.g., Python Programming, Guitar, Photography"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">I want to learn</label>
                <input
                  type="text"
                  value={newSkill.wantsToLearn}
                  onChange={(e) => setNewSkill({ ...newSkill, wantsToLearn: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded"
                  placeholder="e.g., Web Development, Spanish, Digital Art"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Availability</label>
                <input
                  type="text"
                  value={newSkill.availability}
                  onChange={(e) => setNewSkill({ ...newSkill, availability: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded"
                  placeholder="e.g., Weekends, Evenings"
                  required
                />
              </div>
              <div className="flex gap-2">
                <button type="submit" className="bg-violet-500 hover:bg-violet-600 text-white px-4 py-2 rounded transition">
                  Submit
                </button>
                <button type="button" onClick={() => setShowForm(false)} className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded transition">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {skills.map(skill => (
            <div key={skill.id} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-2xl mb-1">{skill.name}</h3>
                  <p className="text-sm text-gray-500">{skill.email}</p>
                </div>
                <Users className="text-violet-500" size={24} />
              </div>
              
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">Can Teach</span>
                </div>
                <p className="text-lg">{skill.canTeach}</p>
              </div>

              <div className="mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">Wants to Learn</span>
                </div>
                <p className="text-lg">{skill.wantsToLearn}</p>
              </div>

              <div className="mb-4">
                <p className="text-sm text-gray-600">Availability: {skill.availability}</p>
              </div>

              <button
                onClick={() => onNavigate('messages')}
                className="w-full bg-violet-500 hover:bg-violet-600 text-white py-2 rounded transition"
              >
                Connect & Exchange
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
