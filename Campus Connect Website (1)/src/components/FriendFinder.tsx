import { useState } from 'react';
import { Navbar } from './Navbar';
import { UserPlus, Shuffle, MessageCircle, Users } from 'lucide-react';

interface FriendFinderProps {
  currentUser: any;
  onNavigate: (page: string) => void;
  onLogout: () => void;
}

const allStudents = [
  { id: 1, name: 'Amulya', interests: ['Coding', 'AI/ML', 'Music'], bio: 'Computer Science enthusiast' },
  { id: 2, name: 'Ujjayani', interests: ['Sports', 'Design', 'Photography'], bio: 'Love coding and sports' },
  { id: 3, name: 'Aakash_', interests: ['Web Development', 'Gaming', 'Tech'], bio: 'Full stack developer' },
  { id: 4, name: 'Disha', interests: ['UI/UX', 'Art', 'Design'], bio: 'UI/UX Designer' },
  { id: 5, name: 'Astha', interests: ['Research', 'AI', 'Reading'], bio: 'AI/ML Researcher' },
  { id: 6, name: 'Prajwal', interests: ['Competitive Programming', 'Chess', 'Math'], bio: 'Competitive Programmer' },
  { id: 7, name: 'Pragati', interests: ['Leadership', 'Events', 'Public Speaking'], bio: 'Student Council Member' },
  { id: 8, name: 'Asmita', interests: ['Public Speaking', 'Writing', 'Drama'], bio: 'Public Speaking Expert' },
];

export function FriendFinder({ currentUser, onNavigate, onLogout }: FriendFinderProps) {
  const [currentFriend, setCurrentFriend] = useState<any>(null);
  const [connections, setConnections] = useState<any[]>([]);
  const [viewedProfiles, setViewedProfiles] = useState<number[]>([]);

  const availableStudents = allStudents.filter(
    student => student.id !== currentUser.id && !viewedProfiles.includes(student.id)
  );

  const getRandomFriend = () => {
    if (availableStudents.length > 0) {
      const randomIndex = Math.floor(Math.random() * availableStudents.length);
      const friend = availableStudents[randomIndex];
      setCurrentFriend(friend);
      setViewedProfiles([...viewedProfiles, friend.id]);
    } else {
      setCurrentFriend(null);
      setViewedProfiles([]);
    }
  };

  const handleConnect = () => {
    if (currentFriend && !connections.find(c => c.id === currentFriend.id)) {
      setConnections([...connections, currentFriend]);
    }
    getRandomFriend();
  };

  const handleSkip = () => {
    getRandomFriend();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar currentUser={currentUser} onNavigate={onNavigate} onLogout={onLogout} />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8 text-center">
            <h1 className="text-4xl mb-2 flex items-center justify-center gap-2">
              <Users className="text-teal-500" />
              Random Friend Finder
            </h1>
            <p className="text-gray-600">Connect with new people on campus</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              {!currentFriend ? (
                <div className="bg-white p-12 rounded-lg shadow-lg text-center">
                  <Shuffle size={64} className="mx-auto mb-4 text-gray-400" />
                  <h2 className="text-2xl mb-4">Find Your Next Friend!</h2>
                  <p className="text-gray-600 mb-6">Click the button below to discover someone new</p>
                  <button
                    onClick={getRandomFriend}
                    className="bg-teal-500 hover:bg-teal-600 text-white px-8 py-3 rounded-lg transition flex items-center gap-2 mx-auto"
                  >
                    <Shuffle size={20} />
                    Find Random Friend
                  </button>
                </div>
              ) : (
                <div className="bg-white p-8 rounded-lg shadow-lg">
                  <div className="text-center mb-6">
                    <div className="w-32 h-32 bg-gradient-to-br from-teal-400 to-blue-500 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-5xl">
                      {currentFriend.name.charAt(0)}
                    </div>
                    <h2 className="text-3xl mb-2">{currentFriend.name}</h2>
                    <p className="text-gray-600 italic">{currentFriend.bio}</p>
                  </div>

                  <div className="mb-6">
                    <h3 className="text-xl mb-3">Interests</h3>
                    <div className="flex flex-wrap gap-2">
                      {currentFriend.interests.map((interest: string, index: number) => (
                        <span key={index} className="bg-teal-100 text-teal-700 px-4 py-2 rounded-full">
                          {interest}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <button
                      onClick={handleConnect}
                      className="flex-1 bg-teal-500 hover:bg-teal-600 text-white py-3 rounded-lg transition flex items-center justify-center gap-2"
                    >
                      <UserPlus size={20} />
                      Connect
                    </button>
                    <button
                      onClick={handleSkip}
                      className="flex-1 bg-gray-300 hover:bg-gray-400 py-3 rounded-lg transition"
                    >
                      Skip
                    </button>
                  </div>

                  <button
                    onClick={getRandomFriend}
                    className="w-full mt-4 bg-purple-500 hover:bg-purple-600 text-white py-3 rounded-lg transition flex items-center justify-center gap-2"
                  >
                    <Shuffle size={20} />
                    Next Random Friend
                  </button>
                </div>
              )}
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl mb-4 flex items-center gap-2">
                <Users size={24} className="text-teal-500" />
                Your Connections
              </h2>
              {connections.length === 0 ? (
                <p className="text-gray-500 text-center py-8">No connections yet. Start finding friends!</p>
              ) : (
                <div className="space-y-3">
                  {connections.map(connection => (
                    <div key={connection.id} className="p-3 bg-gray-50 rounded-lg hover:shadow-md transition">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="mb-1">{connection.name}</h3>
                          <p className="text-sm text-gray-600">{connection.interests[0]}</p>
                        </div>
                        <button
                          onClick={() => onNavigate('messages')}
                          className="text-teal-600 hover:text-teal-700"
                          title="Send message"
                        >
                          <MessageCircle size={20} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
