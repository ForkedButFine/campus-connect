import { Menu, Home, MessageCircle, Users, Calendar, MessageSquare, User, BookOpen, LogOut, Info } from 'lucide-react';

interface NavbarProps {
  currentUser: any;
  onNavigate: (page: string) => void;
  onLogout: () => void;
}

export function Navbar({ currentUser, onNavigate, onLogout }: NavbarProps) {
  return (
    <nav className="bg-gradient-to-r from-pink-400 to-pink-500 text-white shadow-lg">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl" style={{ fontFamily: 'cursive' }}>Campus Connect</h1>
          </div>
          
          <div className="flex items-center gap-6">
            <button onClick={() => onNavigate('home')} className="flex items-center gap-2 hover:bg-pink-600 px-3 py-2 rounded transition">
              <Home size={20} />
              <span>Home</span>
            </button>
            <button onClick={() => onNavigate('posts')} className="flex items-center gap-2 hover:bg-pink-600 px-3 py-2 rounded transition">
              <MessageSquare size={20} />
              <span>Posts</span>
            </button>
            <button onClick={() => onNavigate('messages')} className="flex items-center gap-2 hover:bg-pink-600 px-3 py-2 rounded transition">
              <MessageCircle size={20} />
              <span>Messages</span>
            </button>
            <button onClick={() => onNavigate('chatbot')} className="flex items-center gap-2 hover:bg-pink-600 px-3 py-2 rounded transition">
              <MessageCircle size={20} />
              <span>ChatBot</span>
            </button>
            <button onClick={() => onNavigate('events')} className="flex items-center gap-2 hover:bg-pink-600 px-3 py-2 rounded transition">
              <Calendar size={20} />
              <span>Events</span>
            </button>
            <button onClick={() => onNavigate('teachers')} className="flex items-center gap-2 hover:bg-pink-600 px-3 py-2 rounded transition">
              <BookOpen size={20} />
              <span>Teachers</span>
            </button>
            <button onClick={() => onNavigate('about')} className="flex items-center gap-2 hover:bg-pink-600 px-3 py-2 rounded transition">
              <Info size={20} />
              <span>About</span>
            </button>
            <button onClick={() => onNavigate('profile')} className="flex items-center gap-2 hover:bg-pink-600 px-3 py-2 rounded transition">
              <User size={20} />
              <span>{currentUser?.name}</span>
            </button>
            <button onClick={onLogout} className="flex items-center gap-2 hover:bg-pink-600 px-3 py-2 rounded transition">
              <LogOut size={20} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
