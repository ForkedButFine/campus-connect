import { useState } from 'react';

interface LoginProps {
  onLogin: (email: string, password: string) => boolean;
  onNavigate: (page: string) => void;
  loginBg: string;
}

export function Login({ onLogin, onNavigate, loginBg }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onLogin(email, password)) {
      setError('');
    } else {
      setError('Invalid email or password');
    }
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
          <h3 className="text-2xl mb-6">LOGIN:</h3>
          <form onSubmit={handleSubmit}>
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
            
            <div className="mb-6">
              <label className="block mb-2 bg-pink-300 px-4 py-2 text-center">PASSWORD:</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border-2 border-black p-3"
                required
              />
            </div>

            {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

            <button
              type="submit"
              className="w-full bg-pink-400 hover:bg-pink-500 text-white py-3 rounded transition"
            >
              Login
            </button>
          </form>

          <div className="text-center mt-4">
            <button
              onClick={() => onNavigate('signup')}
              className="text-pink-600 hover:underline"
            >
              Don't have an account? Sign up
            </button>
          </div>

          <div className="mt-4 p-3 bg-pink-50 rounded text-sm">
            <p className="mb-1">Demo credentials:</p>
            <p>Email: amulya@campus.com</p>
            <p>Password: password</p>
          </div>
        </div>
      </div>
    </div>
  );
}
