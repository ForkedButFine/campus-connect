import { Menu, Home, MessageCircle, Users, Calendar, MessageSquare, User, BookOpen, LogOut, Info, Briefcase, DollarSign, Shield, UserPlus, ShoppingBag, GraduationCap } from 'lucide-react';
import { useState } from 'react';

interface NavbarProps {
  currentUser: any;
  onNavigate: (page: string) => void;
  onLogout: () => void;
}

export function Navbar({ currentUser, onNavigate, onLogout }: NavbarProps) {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <nav className="bg-gradient-to-r from-pink-400 to-pink-500 text-white shadow-lg">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl cursor-pointer" style={{ fontFamily: 'cursive' }} onClick={() => onNavigate('home')}>Campus Connect</h1>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden xl:flex items-center gap-2">
            <button onClick={() => onNavigate('home')} className="flex items-center gap-1 hover:bg-pink-600 px-2 py-2 rounded transition text-sm">
              <Home size={16} />
              <span>Home</span>
            </button>
            <button onClick={() => onNavigate('posts')} className="flex items-center gap-1 hover:bg-pink-600 px-2 py-2 rounded transition text-sm">
              <MessageSquare size={16} />
              <span>Posts</span>
            </button>
            <button onClick={() => onNavigate('messages')} className="flex items-center gap-1 hover:bg-pink-600 px-2 py-2 rounded transition text-sm">
              <MessageCircle size={16} />
              <span>Messages</span>
            </button>
            <button onClick={() => onNavigate('chatbot')} className="flex items-center gap-1 hover:bg-pink-600 px-2 py-2 rounded transition text-sm">
              <MessageCircle size={16} />
              <span>Bot</span>
            </button>
            <button onClick={() => onNavigate('marketplace')} className="flex items-center gap-1 hover:bg-pink-600 px-2 py-2 rounded transition text-sm">
              <ShoppingBag size={16} />
              <span>Market</span>
            </button>
            <button onClick={() => onNavigate('jobs')} className="flex items-center gap-1 hover:bg-pink-600 px-2 py-2 rounded transition text-sm">
              <Briefcase size={16} />
              <span>Jobs</span>
            </button>
            <button onClick={() => onNavigate('alumni')} className="flex items-center gap-1 hover:bg-pink-600 px-2 py-2 rounded transition text-sm">
              <GraduationCap size={16} />
              <span>Alumni</span>
            </button>
            <button onClick={() => onNavigate('events')} className="flex items-center gap-1 hover:bg-pink-600 px-2 py-2 rounded transition text-sm">
              <Calendar size={16} />
              <span>Events</span>
            </button>
            <button onClick={() => onNavigate('teachers')} className="flex items-center gap-1 hover:bg-pink-600 px-2 py-2 rounded transition text-sm">
              <BookOpen size={16} />
              <span>Teachers</span>
            </button>
            <button onClick={() => onNavigate('profile')} className="flex items-center gap-1 hover:bg-pink-600 px-2 py-2 rounded transition text-sm">
              <User size={16} />
              <span>{currentUser?.name}</span>
            </button>
            <button onClick={onLogout} className="flex items-center gap-1 hover:bg-pink-600 px-2 py-2 rounded transition text-sm">
              <LogOut size={16} />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setShowMenu(!showMenu)}
            className="xl:hidden hover:bg-pink-600 p-2 rounded"
          >
            <Menu size={24} />
          </button>
        </div>

        {/* Mobile Menu */}
        {showMenu && (
          <div className="xl:hidden mt-4 pb-4 grid grid-cols-2 gap-2">
            <button onClick={() => { onNavigate('home'); setShowMenu(false); }} className="flex items-center gap-2 hover:bg-pink-600 px-3 py-2 rounded transition text-sm">
              <Home size={16} />
              <span>Home</span>
            </button>
            <button onClick={() => { onNavigate('posts'); setShowMenu(false); }} className="flex items-center gap-2 hover:bg-pink-600 px-3 py-2 rounded transition text-sm">
              <MessageSquare size={16} />
              <span>Posts</span>
            </button>
            <button onClick={() => { onNavigate('messages'); setShowMenu(false); }} className="flex items-center gap-2 hover:bg-pink-600 px-3 py-2 rounded transition text-sm">
              <MessageCircle size={16} />
              <span>Messages</span>
            </button>
            <button onClick={() => { onNavigate('marketplace'); setShowMenu(false); }} className="flex items-center gap-2 hover:bg-pink-600 px-3 py-2 rounded transition text-sm">
              <ShoppingBag size={16} />
              <span>Marketplace</span>
            </button>
            <button onClick={() => { onNavigate('jobs'); setShowMenu(false); }} className="flex items-center gap-2 hover:bg-pink-600 px-3 py-2 rounded transition text-sm">
              <Briefcase size={16} />
              <span>Jobs</span>
            </button>
            <button onClick={() => { onNavigate('alumni'); setShowMenu(false); }} className="flex items-center gap-2 hover:bg-pink-600 px-3 py-2 rounded transition text-sm">
              <GraduationCap size={16} />
              <span>Alumni</span>
            </button>
            <button onClick={() => { onNavigate('profile'); setShowMenu(false); }} className="flex items-center gap-2 hover:bg-pink-600 px-3 py-2 rounded transition text-sm">
              <User size={16} />
              <span>Profile</span>
            </button>
            <button onClick={() => { onLogout(); setShowMenu(false); }} className="flex items-center gap-2 hover:bg-pink-600 px-3 py-2 rounded transition text-sm">
              <LogOut size={16} />
              <span>Logout</span>
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}