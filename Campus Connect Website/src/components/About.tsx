import { Navbar } from './Navbar';
import { Users, Heart, Code } from 'lucide-react';

interface AboutProps {
  currentUser: any;
  onNavigate: (page: string) => void;
  onLogout: () => void;
}

export function About({ currentUser, onNavigate, onLogout }: AboutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar currentUser={currentUser} onNavigate={onNavigate} onLogout={onLogout} />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-pink-400 to-purple-500 text-white p-12 rounded-lg shadow-xl mb-8 text-center">
            <h1 className="text-5xl mb-4" style={{ fontFamily: 'cursive' }}>Campus Connect</h1>
            <p className="text-xl">Connecting students, fostering collaboration, building community</p>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-lg mb-8">
            <h2 className="text-3xl mb-6 flex items-center gap-2">
              <Heart className="text-pink-500" />
              Our Mission
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              Campus Connect is a comprehensive platform designed to enhance student life by providing a unified space for academic collaboration, 
              social interaction, and personal growth. We believe in the power of community and technology to transform the educational experience.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Our platform offers everything from peer messaging and study assistance to event management and achievement tracking, 
              all designed to help students thrive both academically and personally.
            </p>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-lg mb-8">
            <h2 className="text-3xl mb-6 flex items-center gap-2">
              <Code className="text-blue-500" />
              Features
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-pink-50 rounded-lg">
                <h3 className="text-xl mb-2">📱 Social Posting</h3>
                <p className="text-gray-600">Share thoughts, images, and connect with peers through likes and comments</p>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg">
                <h3 className="text-xl mb-2">💬 Direct Messaging</h3>
                <p className="text-gray-600">Private conversations with students and teachers</p>
              </div>
              <div className="p-4 bg-blue-50 rounded-lg">
                <h3 className="text-xl mb-2">🤖 AI Study Assistant</h3>
                <p className="text-gray-600">Get help with studies, manage stress, and receive mentorship</p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <h3 className="text-xl mb-2">🎯 Events & Clubs</h3>
                <p className="text-gray-600">Discover and register for campus events with detailed information</p>
              </div>
              <div className="p-4 bg-yellow-50 rounded-lg">
                <h3 className="text-xl mb-2">🏆 Achievements</h3>
                <p className="text-gray-600">Showcase your accomplishments and celebrate success</p>
              </div>
              <div className="p-4 bg-red-50 rounded-lg">
                <h3 className="text-xl mb-2">📚 Stationary Shop</h3>
                <p className="text-gray-600">Access to all academic supplies in one place</p>
              </div>
              <div className="p-4 bg-indigo-50 rounded-lg">
                <h3 className="text-xl mb-2">💡 Project Ideas</h3>
                <p className="text-gray-600">Share and explore innovative project concepts</p>
              </div>
              <div className="p-4 bg-orange-50 rounded-lg">
                <h3 className="text-xl mb-2">👨‍🏫 Faculty Profiles</h3>
                <p className="text-gray-600">Connect with professors and view their achievements</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-3xl mb-6 flex items-center gap-2">
              <Users className="text-purple-500" />
              Meet the Creators
            </h2>
            <p className="text-lg text-gray-700 mb-6">
              Campus Connect was created by a passionate team of students who understand the needs of the modern campus community.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-gradient-to-br from-pink-100 to-purple-100 rounded-lg">
                <div className="w-20 h-20 bg-pink-400 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl">
                  A
                </div>
                <h3 className="text-xl mb-2">Aakash_</h3>
                <p className="text-gray-600">Full Stack Developer</p>
              </div>
              <div className="text-center p-6 bg-gradient-to-br from-purple-100 to-blue-100 rounded-lg">
                <div className="w-20 h-20 bg-purple-400 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl">
                  U
                </div>
                <h3 className="text-xl mb-2">Ujjayani_</h3>
                <p className="text-gray-600">UI/UX Designer</p>
              </div>
              <div className="text-center p-6 bg-gradient-to-br from-blue-100 to-green-100 rounded-lg">
                <div className="w-20 h-20 bg-blue-400 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl">
                  A
                </div>
                <h3 className="text-xl mb-2">Amulya_</h3>
                <p className="text-gray-600">Backend Developer</p>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center text-gray-600">
            <p>© 2025 Campus Connect. Made with ❤️ for students, by students.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
