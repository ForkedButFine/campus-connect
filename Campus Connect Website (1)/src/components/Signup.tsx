import { useState } from 'react';

interface SignupProps {
  onSignup: (email: string, password: string, name: string, role: string) => void;
  onNavigate: (page: string) => void;
  loginBg: string;
}

export function Signup({ onSignup, onNavigate, loginBg }: SignupProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('student');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSignup(email, password, name, role);
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${loginBg})` }}
    >
      <div className="bg-white/90 backdrop-blur-sm p-8 rounded-lg shadow-xl max-w-md w-full mx-4">
        <div className="text-center mb-8">
          <h1 className="text-5xl mb-2" style={{ fontFamily: 'cursive' }}>CAMPUS</h1>
          <h2 className="text-4xl text-pink-400" style={{ fontFamily: 'cursive' }}>Connect</h2>
        </div>
        
        <div className="mb-6">
          <h3 className="text-2xl mb-6">SIGN UP:</h3>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block mb-2 bg-pink-300 px-4 py-2 text-center">NAME:</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border-2 border-black p-3"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block mb-2 bg-pink-300 px-4 py-2 text-center">EMAIL ID:</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border-2 border-black p-3"
                required
              />
            </div>
            
            <div className="mb-4">
              <label className="block mb-2 bg-pink-300 px-4 py-2 text-center">PASSWORD:</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border-2 border-black p-3"
                required
              />
            </div>

            <div className="mb-6">
              <label className="block mb-2 bg-pink-300 px-4 py-2 text-center">ROLE:</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full border-2 border-black p-3"
              >
                <option value="student">Student</option>
                <option value="teacher">Teacher</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-pink-400 hover:bg-pink-500 text-white py-3 rounded transition"
            >
              Sign Up
            </button>
          </form>

          <div className="text-center mt-4">
            <button
              onClick={() => onNavigate('login')}
              className="text-pink-600 hover:underline"
            >
              Already have an account? Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
