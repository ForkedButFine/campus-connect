import { useState, useEffect } from 'react';
import { Login } from './components/Login';
import { Signup } from './components/Signup';
import { Home } from './components/Home';
import { ChatBot } from './components/ChatBot';
import { Posts } from './components/Posts';
import { Messages } from './components/Messages';
import { Profile } from './components/Profile';
import { Events } from './components/Events';
import { Feedback } from './components/Feedback';
import { TeacherProfiles } from './components/TeacherProfiles';
import { About } from './components/About';
import loginBg from "figma:asset/14ee25b843e61be39430193b3a406865385a504e.png";

export default function App() {
  const [currentPage, setCurrentPage] = useState<string>('login');
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [users, setUsers] = useState<any[]>([]);
  const [posts, setPosts] = useState<any[]>([]);
  const [messages, setMessages] = useState<any[]>([]);
  const [events, setEvents] = useState<any[]>([]);
  const [feedback, setFeedback] = useState<any[]>([]);

  // Initialize with demo data
  useEffect(() => {
    const demoUsers = [
      { id: 1, email: 'amulya@campus.com', password: 'password', name: 'Amulya', role: 'student', achievements: ['Best Project Award 2024', 'Hackathon Winner'], bio: 'Computer Science enthusiast' },
      { id: 2, email: 'ujjayani@campus.com', password: 'password', name: 'Ujjayani', role: 'student', achievements: ['Academic Excellence', 'Sports Captain'], bio: 'Love coding and sports' },
      { id: 3, email: 'aakash@campus.com', password: 'password', name: 'Aakash_', role: 'student', achievements: ['Tech Lead', 'Innovation Award'], bio: 'Full stack developer' },
      { id: 4, email: 'disha@campus.com', password: 'password', name: 'Disha', role: 'student', achievements: ['Design Champion'], bio: 'UI/UX Designer' },
      { id: 5, email: 'astha@campus.com', password: 'password', name: 'Astha', role: 'student', achievements: ['Research Paper Published'], bio: 'AI/ML Researcher' },
      { id: 6, email: 'prajwal@campus.com', password: 'password', name: 'Prajwal', role: 'student', achievements: ['Coding Competition Winner'], bio: 'Competitive Programmer' },
      { id: 7, email: 'pragati@campus.com', password: 'password', name: 'Pragati', role: 'student', achievements: ['Leadership Award'], bio: 'Student Council Member' },
      { id: 8, email: 'asmita@campus.com', password: 'password', name: 'Asmita', role: 'student', achievements: ['Best Presenter'], bio: 'Public Speaking Expert' },
    ];
    setUsers(demoUsers);

    const demoEvents = [
      { id: 1, name: 'Tech Fest 2025', date: '2025-01-15', time: '10:00 AM', venue: 'Main Auditorium', description: 'Annual technical festival with workshops and competitions' },
      { id: 2, name: 'Cultural Night', date: '2025-01-20', time: '6:00 PM', venue: 'Open Ground', description: 'Celebrate diversity with music, dance and drama' },
      { id: 3, name: 'Coding Hackathon', date: '2025-02-01', time: '9:00 AM', venue: 'Computer Lab A', description: '24-hour coding marathon' },
      { id: 4, name: 'Sports Day', date: '2025-02-10', time: '8:00 AM', venue: 'Sports Complex', description: 'Inter-departmental sports competition' },
    ];
    setEvents(demoEvents);
  }, []);

  const handleLogin = (email: string, password: string) => {
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
      setCurrentUser(user);
      setCurrentPage('home');
      return true;
    }
    return false;
  };

  const handleSignup = (email: string, password: string, name: string, role: string) => {
    const newUser = {
      id: users.length + 1,
      email,
      password,
      name,
      role,
      achievements: [],
      bio: ''
    };
    setUsers([...users, newUser]);
    setCurrentUser(newUser);
    setCurrentPage('home');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentPage('login');
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'login':
        return <Login onLogin={handleLogin} onNavigate={setCurrentPage} loginBg={loginBg} />;
      case 'signup':
        return <Signup onSignup={handleSignup} onNavigate={setCurrentPage} loginBg={loginBg} />;
      case 'home':
        return <Home currentUser={currentUser} onNavigate={setCurrentPage} onLogout={handleLogout} />;
      case 'chatbot':
        return <ChatBot currentUser={currentUser} onNavigate={setCurrentPage} onLogout={handleLogout} />;
      case 'posts':
        return <Posts currentUser={currentUser} posts={posts} setPosts={setPosts} onNavigate={setCurrentPage} onLogout={handleLogout} />;
      case 'messages':
        return <Messages currentUser={currentUser} users={users} setUsers={setUsers} messages={messages} setMessages={setMessages} onNavigate={setCurrentPage} onLogout={handleLogout} />;
      case 'profile':
        return <Profile currentUser={currentUser} setCurrentUser={setCurrentUser} onNavigate={setCurrentPage} onLogout={handleLogout} />;
      case 'events':
        return <Events currentUser={currentUser} events={events} setEvents={setEvents} onNavigate={setCurrentPage} onLogout={handleLogout} />;
      case 'feedback':
        return <Feedback currentUser={currentUser} feedback={feedback} setFeedback={setFeedback} onNavigate={setCurrentPage} onLogout={handleLogout} />;
      case 'teachers':
        return <TeacherProfiles currentUser={currentUser} onNavigate={setCurrentPage} onLogout={handleLogout} />;
      case 'about':
        return <About currentUser={currentUser} onNavigate={setCurrentPage} onLogout={handleLogout} />;
      default:
        return <Login onLogin={handleLogin} onNavigate={setCurrentPage} loginBg={loginBg} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {renderPage()}
    </div>
  );
}
