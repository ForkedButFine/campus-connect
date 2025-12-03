import { useState } from 'react';
import { Navbar } from './Navbar';
import { GraduationCap, Briefcase, MapPin, Mail } from 'lucide-react';

interface AlumniProps {
  currentUser: any;
  onNavigate: (page: string) => void;
  onLogout: () => void;
}

const alumniList = [
  { id: 1, name: 'Rahul Sharma', batch: '2020', currentRole: 'Software Engineer', company: 'Google', location: 'Bangalore', email: 'rahul.sharma@alumni.com', expertise: 'Full Stack Development' },
  { id: 2, name: 'Priya Patel', batch: '2019', currentRole: 'Data Scientist', company: 'Microsoft', location: 'Hyderabad', email: 'priya.patel@alumni.com', expertise: 'Machine Learning' },
  { id: 3, name: 'Arjun Kumar', batch: '2021', currentRole: 'Product Manager', company: 'Amazon', location: 'Mumbai', email: 'arjun.kumar@alumni.com', expertise: 'Product Strategy' },
  { id: 4, name: 'Sneha Reddy', batch: '2018', currentRole: 'UX Designer', company: 'Flipkart', location: 'Bangalore', email: 'sneha.reddy@alumni.com', expertise: 'UI/UX Design' },
  { id: 5, name: 'Vikram Singh', batch: '2020', currentRole: 'DevOps Engineer', company: 'IBM', location: 'Pune', email: 'vikram.singh@alumni.com', expertise: 'Cloud Infrastructure' },
  { id: 6, name: 'Anjali Gupta', batch: '2019', currentRole: 'Research Scientist', company: 'DRDO', location: 'Delhi', email: 'anjali.gupta@alumni.com', expertise: 'Artificial Intelligence' },
];

export function Alumni({ currentUser, onNavigate, onLogout }: AlumniProps) {
  const [selectedAlumni, setSelectedAlumni] = useState<any>(null);
  const [showContactForm, setShowContactForm] = useState(false);
  const [message, setMessage] = useState('');

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Message sent to ${selectedAlumni.name}!`);
    setMessage('');
    setShowContactForm(false);
    setSelectedAlumni(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar currentUser={currentUser} onNavigate={onNavigate} onLogout={onLogout} />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl mb-2 flex items-center gap-2">
            <GraduationCap className="text-emerald-500" />
            Alumni Network
          </h1>
          <p className="text-gray-600">Connect with successful alumni for mentorship and networking</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {alumniList.map(alumni => (
            <div key={alumni.id} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition">
              <div className="flex items-center justify-between mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center text-white text-2xl">
                  {alumni.name.charAt(0)}
                </div>
                <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded text-sm">
                  Batch {alumni.batch}
                </span>
              </div>

              <h3 className="text-2xl mb-2">{alumni.name}</h3>
              
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-gray-600">
                  <Briefcase size={18} className="text-emerald-500" />
                  <span>{alumni.currentRole}</span>
                </div>
                <p className="ml-6 text-gray-700">{alumni.company}</p>
                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin size={18} className="text-emerald-500" />
                  <span>{alumni.location}</span>
                </div>
              </div>

              <div className="mb-4">
                <span className="text-sm text-gray-600">Expertise:</span>
                <p className="text-gray-700">{alumni.expertise}</p>
              </div>

              <button
                onClick={() => {
                  setSelectedAlumni(alumni);
                  setShowContactForm(true);
                }}
                className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-2 rounded transition flex items-center justify-center gap-2"
              >
                <Mail size={18} />
                Connect
              </button>
            </div>
          ))}
        </div>

        {showContactForm && selectedAlumni && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full">
              <h2 className="text-2xl mb-4">Contact {selectedAlumni.name}</h2>
              <form onSubmit={handleSendMessage}>
                <div className="mb-4">
                  <label className="block mb-2">Your Message</label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded h-32"
                    placeholder="Introduce yourself and explain why you'd like to connect..."
                    required
                  />
                </div>
                <div className="flex gap-2">
                  <button type="submit" className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white py-2 rounded transition">
                    Send Message
                  </button>
                  <button 
                    type="button" 
                    onClick={() => {
                      setShowContactForm(false);
                      setSelectedAlumni(null);
                      setMessage('');
                    }}
                    className="flex-1 bg-gray-300 hover:bg-gray-400 py-2 rounded transition"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        <div className="bg-gradient-to-r from-emerald-400 to-teal-500 text-white p-8 rounded-lg shadow-lg">
          <h2 className="text-3xl mb-4">Why Connect with Alumni?</h2>
          <ul className="space-y-2">
            <li>• Get career guidance and mentorship</li>
            <li>• Learn about industry trends and opportunities</li>
            <li>• Expand your professional network</li>
            <li>• Gain insights into company culture and work life</li>
            <li>• Get referrals for job opportunities</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
