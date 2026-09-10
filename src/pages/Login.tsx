import { useState, FormEvent } from 'react';
import { Mail, Lock } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface LoginProps {
  onNavigate: (page: string) => void;
}

export default function Login({ onNavigate }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    if (!email || !password) { setError('Please fill in all fields'); return; }
    setLoading(true);
    const { error } = await signIn(email, password);
    setLoading(false);
    if (error) setError(error.message); else onNavigate('dashboard');
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center px-4 py-8">
      <img src="/sitesphere_logo.png" alt="SiteSphere" className="h-12 w-auto mb-4 cursor-pointer" onClick={() => onNavigate('home')} />
      <div className="w-full max-w-sm border border-amazon-border rounded-md p-6 amazon-card">
        <h1 className="text-2xl font-bold text-amazon-text mb-1">Sign In</h1>
        {error && <div className="bg-red-50 border border-red-200 text-amazon-danger text-sm px-3 py-2 rounded mb-4">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-amazon-text mb-1">Email</label>
            <div className="relative">
              <Mail className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full pl-8 pr-3 py-2 border border-gray-400 rounded text-sm focus:ring-2 focus:ring-amazon-orange focus:border-transparent outline-none" placeholder="you@example.com" required />
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold text-amazon-text mb-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full pl-8 pr-3 py-2 border border-gray-400 rounded text-sm focus:ring-2 focus:ring-amazon-orange focus:border-transparent outline-none" placeholder="Enter your password" required />
            </div>
          </div>
          <button type="submit" disabled={loading} className="w-full bg-amazon-yellow hover:bg-amazon-yellowhover text-amazon-dark py-2 rounded font-bold text-sm border border-amazon-orange transition disabled:opacity-50">
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
        <p className="mt-4 text-xs text-amazon-subtle">
          By signing in, you agree to SiteSphere's <span className="text-amazon-link">Conditions of Use</span> and <span className="text-amazon-link">Privacy Notice</span>.
        </p>
      </div>
      <div className="mt-5 w-full max-w-sm border-t border-amazon-border pt-4 text-center">
        <p className="text-sm text-amazon-text">New to SiteSphere? <button onClick={() => onNavigate('signup')} className="text-amazon-link font-bold hover:text-amazon-linkhover hover:underline">Create an account</button></p>
        <button onClick={() => onNavigate('home')} className="mt-3 text-xs text-amazon-subtle hover:text-amazon-link">Back to Home</button>
      </div>
    </div>
  );
}
