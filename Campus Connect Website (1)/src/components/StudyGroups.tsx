import { useState } from 'react';
import { Navbar } from './Navbar';
import { Users, Plus, Calendar, BookOpen } from 'lucide-react';

interface StudyGroupsProps {
  currentUser: any;
  onNavigate: (page: string) => void;
  onLogout: () => void;
}

export function StudyGroups({ currentUser, onNavigate, onLogout }: StudyGroupsProps) {
  const [groups, setGroups] = useState([
    { id: 1, name: 'Data Structures Study Group', subject: 'Computer Science', members: ['Amulya', 'Aakash_', 'Prajwal'], schedule: 'Mon, Wed, Fri - 4:00 PM', description: 'Preparing for mid-term exams' },
    { id: 2, name: 'Physics Problem Solving', subject: 'Physics', members: ['Ujjayani', 'Disha'], schedule: 'Tue, Thu - 5:00 PM', description: 'Solving numerical problems together' },
    { id: 3, name: 'Python Programming', subject: 'Programming', members: ['Astha', 'Pragati', 'Asmita'], schedule: 'Daily - 6:00 PM', description: 'Learning Python from scratch' },
  ]);
  const [showForm, setShowForm] = useState(false);
  const [joinedGroups, setJoinedGroups] = useState<number[]>([]);
  const [newGroup, setNewGroup] = useState({
    name: '',
    subject: '',
    schedule: '',
    description: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const group = {
      id: groups.length + 1,
      ...newGroup,
      members: [currentUser.name]
    };
    setGroups([...groups, group]);
    setJoinedGroups([...joinedGroups, group.id]);
    setNewGroup({ name: '', subject: '', schedule: '', description: '' });
    setShowForm(false);
  };

  const handleJoinGroup = (id: number) => {
    if (!joinedGroups.includes(id)) {
      setJoinedGroups([...joinedGroups, id]);
      setGroups(groups.map(group => 
        group.id === id 
          ? { ...group, members: [...group.members, currentUser.name] }
          : group
      ));
    }
  };

  // AI-powered suggestions based on user profile
  const suggestedGroups = groups.filter(group => 
    !joinedGroups.includes(group.id) && 
    (group.subject.toLowerCase().includes('computer') || group.subject.toLowerCase().includes('programming'))
  ).slice(0, 2);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar currentUser={currentUser} onNavigate={onNavigate} onLogout={onLogout} />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl mb-2 flex items-center gap-2">
              <Users className="text-cyan-500" />
              Smart Study Groups
            </h1>
            <p className="text-gray-600">AI-matched study partners based on your subjects</p>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-2 bg-cyan-500 hover:bg-cyan-600 text-white px-4 py-2 rounded transition"
          >
            <Plus size={20} />
            Create Group
          </button>
        </div>

        {showForm && (
          <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
            <h2 className="text-2xl mb-4">Create Study Group</h2>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block mb-2">Group Name</label>
                  <input
                    type="text"
                    value={newGroup.name}
                    onChange={(e) => setNewGroup({ ...newGroup, name: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-2">Subject</label>
                  <input
                    type="text"
                    value={newGroup.subject}
                    onChange={(e) => setNewGroup({ ...newGroup, subject: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded"
                    required
                  />
                </div>
              </div>
              <div className="mb-4">
                <label className="block mb-2">Schedule</label>
                <input
                  type="text"
                  value={newGroup.schedule}
                  onChange={(e) => setNewGroup({ ...newGroup, schedule: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded"
                  placeholder="e.g., Mon, Wed - 5:00 PM"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Description</label>
                <textarea
                  value={newGroup.description}
                  onChange={(e) => setNewGroup({ ...newGroup, description: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded h-24"
                  required
                />
              </div>
              <div className="flex gap-2">
                <button type="submit" className="bg-cyan-500 hover:bg-cyan-600 text-white px-4 py-2 rounded transition">
                  Create
                </button>
                <button type="button" onClick={() => setShowForm(false)} className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded transition">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {suggestedGroups.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl mb-4">🤖 AI Recommended for You</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {suggestedGroups.map(group => (
                <div key={group.id} className="bg-gradient-to-br from-cyan-50 to-blue-50 border-2 border-cyan-300 p-6 rounded-lg">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl">{group.name}</h3>
                    <span className="bg-cyan-500 text-white px-3 py-1 rounded text-sm">Recommended</span>
                  </div>
                  <div className="flex items-center gap-2 mb-2 text-gray-600">
                    <BookOpen size={18} />
                    <span>{group.subject}</span>
                  </div>
                  <div className="flex items-center gap-2 mb-3 text-gray-600">
                    <Calendar size={18} />
                    <span>{group.schedule}</span>
                  </div>
                  <p className="text-gray-700 mb-3">{group.description}</p>
                  <p className="text-sm text-gray-500 mb-3">{group.members.length} members</p>
                  <button
                    onClick={() => handleJoinGroup(group.id)}
                    className="w-full bg-cyan-500 hover:bg-cyan-600 text-white py-2 rounded transition"
                  >
                    Join Group
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        <h2 className="text-2xl mb-4">All Study Groups</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {groups.map(group => (
            <div key={group.id} className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl mb-3">{group.name}</h3>
              <div className="flex items-center gap-2 mb-2 text-gray-600">
                <BookOpen size={18} />
                <span>{group.subject}</span>
              </div>
              <div className="flex items-center gap-2 mb-3 text-gray-600">
                <Calendar size={18} />
                <span>{group.schedule}</span>
              </div>
              <p className="text-gray-700 mb-3">{group.description}</p>
              <p className="text-sm text-gray-500 mb-3">
                Members: {group.members.join(', ')}
              </p>
              {joinedGroups.includes(group.id) ? (
                <button className="w-full bg-gray-300 text-gray-600 py-2 rounded cursor-not-allowed">
                  Already Joined
                </button>
              ) : (
                <button
                  onClick={() => handleJoinGroup(group.id)}
                  className="w-full bg-cyan-500 hover:bg-cyan-600 text-white py-2 rounded transition"
                >
                  Join Group
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
