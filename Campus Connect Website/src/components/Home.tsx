import { Navbar } from './Navbar';
import { StationaryShop } from './StationaryShop';
import { ProjectIdeas } from './ProjectIdeas';

interface HomeProps {
  currentUser: any;
  onNavigate: (page: string) => void;
  onLogout: () => void;
}

export function Home({ currentUser, onNavigate, onLogout }: HomeProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar currentUser={currentUser} onNavigate={onNavigate} onLogout={onLogout} />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl mb-4">Welcome back, {currentUser?.name}! 👋</h1>
          <p className="text-gray-600">Connect, collaborate, and grow with your campus community</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-pink-400 to-pink-500 text-white p-6 rounded-lg shadow-lg cursor-pointer hover:scale-105 transition" onClick={() => onNavigate('posts')}>
            <h3 className="text-2xl mb-2">Posts</h3>
            <p>Share your thoughts and ideas</p>
          </div>
          <div className="bg-gradient-to-br from-purple-400 to-purple-500 text-white p-6 rounded-lg shadow-lg cursor-pointer hover:scale-105 transition" onClick={() => onNavigate('messages')}>
            <h3 className="text-2xl mb-2">Messages</h3>
            <p>Chat with your peers</p>
          </div>
          <div className="bg-gradient-to-br from-blue-400 to-blue-500 text-white p-6 rounded-lg shadow-lg cursor-pointer hover:scale-105 transition" onClick={() => onNavigate('chatbot')}>
            <h3 className="text-2xl mb-2">Study Assistant</h3>
            <p>Get help with studies</p>
          </div>
          <div className="bg-gradient-to-br from-green-400 to-green-500 text-white p-6 rounded-lg shadow-lg cursor-pointer hover:scale-105 transition" onClick={() => onNavigate('events')}>
            <h3 className="text-2xl mb-2">Events</h3>
            <p>Explore upcoming activities</p>
          </div>
        </div>

        <ProjectIdeas />
        
        <StationaryShop />
      </div>
    </div>
  );
}
