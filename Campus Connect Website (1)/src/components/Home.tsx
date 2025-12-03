import { Navbar } from './Navbar';
import { ProjectIdeas } from './ProjectIdeas';
import { DailyQuote } from './DailyQuote';
import { TodayOnCampus } from './TodayOnCampus';

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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            <DailyQuote currentUser={currentUser} />
          </div>
          <div>
            <TodayOnCampus onNavigate={onNavigate} />
          </div>
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
          <div className="bg-gradient-to-br from-yellow-400 to-yellow-500 text-white p-6 rounded-lg shadow-lg cursor-pointer hover:scale-105 transition" onClick={() => onNavigate('jobs')}>
            <h3 className="text-2xl mb-2">Job Placements</h3>
            <p>Career opportunities</p>
          </div>
          <div className="bg-gradient-to-br from-indigo-400 to-indigo-500 text-white p-6 rounded-lg shadow-lg cursor-pointer hover:scale-105 transition" onClick={() => onNavigate('funding')}>
            <h3 className="text-2xl mb-2">Project Funding</h3>
            <p>Get funding for ideas</p>
          </div>
          <div className="bg-gradient-to-br from-red-400 to-red-500 text-white p-6 rounded-lg shadow-lg cursor-pointer hover:scale-105 transition" onClick={() => onNavigate('antiragging')}>
            <h3 className="text-2xl mb-2">Anti-Ragging</h3>
            <p>Anonymous support chat</p>
          </div>
          <div className="bg-gradient-to-br from-teal-400 to-teal-500 text-white p-6 rounded-lg shadow-lg cursor-pointer hover:scale-105 transition" onClick={() => onNavigate('friendfinder')}>
            <h3 className="text-2xl mb-2">Friend Finder</h3>
            <p>Connect with new friends</p>
          </div>
          <div className="bg-gradient-to-br from-orange-400 to-orange-500 text-white p-6 rounded-lg shadow-lg cursor-pointer hover:scale-105 transition" onClick={() => onNavigate('marketplace')}>
            <h3 className="text-2xl mb-2">Marketplace</h3>
            <p>Buy & sell items</p>
          </div>
          <div className="bg-gradient-to-br from-cyan-400 to-cyan-500 text-white p-6 rounded-lg shadow-lg cursor-pointer hover:scale-105 transition" onClick={() => onNavigate('studygroups')}>
            <h3 className="text-2xl mb-2">Study Groups</h3>
            <p>Find study partners</p>
          </div>
          <div className="bg-gradient-to-br from-lime-400 to-lime-500 text-white p-6 rounded-lg shadow-lg cursor-pointer hover:scale-105 transition" onClick={() => onNavigate('lostandfound')}>
            <h3 className="text-2xl mb-2">Lost & Found</h3>
            <p>Report lost items</p>
          </div>
          <div className="bg-gradient-to-br from-rose-400 to-rose-500 text-white p-6 rounded-lg shadow-lg cursor-pointer hover:scale-105 transition" onClick={() => onNavigate('campusmap')}>
            <h3 className="text-2xl mb-2">Campus Map</h3>
            <p>Navigate the campus</p>
          </div>
          <div className="bg-gradient-to-br from-violet-400 to-violet-500 text-white p-6 rounded-lg shadow-lg cursor-pointer hover:scale-105 transition" onClick={() => onNavigate('skillexchange')}>
            <h3 className="text-2xl mb-2">Skill Exchange</h3>
            <p>Teach & learn skills</p>
          </div>
          <div className="bg-gradient-to-br from-amber-400 to-amber-500 text-white p-6 rounded-lg shadow-lg cursor-pointer hover:scale-105 transition" onClick={() => onNavigate('qna')}>
            <h3 className="text-2xl mb-2">Q&A Board</h3>
            <p>Ask & answer questions</p>
          </div>
          <div className="bg-gradient-to-br from-emerald-400 to-emerald-500 text-white p-6 rounded-lg shadow-lg cursor-pointer hover:scale-105 transition" onClick={() => onNavigate('alumni')}>
            <h3 className="text-2xl mb-2">Alumni Network</h3>
            <p>Connect with alumni</p>
          </div>
        </div>

        <ProjectIdeas />
      </div>
    </div>
  );
}