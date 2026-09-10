import { useState } from 'react';
import { Menu, X, ChevronDown, MapPin, Search, ShoppingCart } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface HeaderProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export default function Header({ currentPage, onNavigate }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { user } = useAuth();

  const navItems = [
    { name: 'Home', path: 'home' },
    { name: 'Services', path: 'services' },
    { name: 'Portfolio', path: 'portfolio' },
    { name: 'Testimonials', path: 'testimonials' },
    { name: 'Pricing', path: 'pricing' },
    { name: 'Investors', path: 'investors' },
    { name: 'Contact', path: 'contact' },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onNavigate('services');
  };

  return (
    <header className="sticky top-0 z-50">
      {/* Main top bar */}
      <div className="bg-amazon-charcoal text-white">
        <div className="max-w-7xl mx-auto flex items-center h-[60px] px-2 sm:px-4 gap-2">
          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 hover:border hover:rounded"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>

          {/* Logo */}
          <div
            className="flex items-center cursor-pointer px-2 py-2 hover:border hover:rounded border border-transparent transition"
            onClick={() => onNavigate('home')}
          >
            <img
              src="/sitesphere_logo.png"
              alt="SiteSphere"
              className="h-9 w-auto"
            />
          </div>

          {/* Deliver to */}
          <div className="hidden lg:flex items-center px-2 py-2 hover:border hover:rounded border border-transparent cursor-pointer" onClick={() => onNavigate('contact')}>
            <MapPin className="h-4 w-4 mr-1 text-gray-300" />
            <div className="leading-tight">
              <p className="text-xs text-gray-300">Deliver to</p>
              <p className="text-sm font-bold">Nkolbisson</p>
            </div>
          </div>

          {/* Search bar */}
          <form onSubmit={handleSearch} className="flex-1 flex h-10 rounded-md overflow-hidden shadow-sm max-w-2xl hidden sm:flex">
            <div className="hidden md:flex items-center bg-gray-200 text-amazon-text text-xs px-2 hover:bg-gray-300 cursor-pointer border-r border-gray-400">
              <span>All</span>
              <ChevronDown className="h-3 w-3 ml-1" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search SiteSphere services"
              className="flex-1 px-3 text-sm text-amazon-text outline-none focus:ring-2 focus:ring-amazon-orange"
            />
            <button type="submit" className="bg-amazon-yellow hover:bg-amazon-yellowhover px-4 flex items-center justify-center transition">
              <Search className="h-5 w-5 text-amazon-text" />
            </button>
          </form>

          {/* Right side */}
          <div className="flex items-center gap-2 ml-auto">
            {user ? (
              <button
                onClick={() => onNavigate('dashboard')}
                className="hidden sm:flex flex-col items-start px-2 py-1 hover:border hover:rounded border border-transparent transition"
              >
                <p className="text-xs text-gray-300">Hello, {user.full_name?.split(' ')[0]}</p>
                <p className="text-sm font-bold flex items-center">
                  Account & Lists
                  <ChevronDown className="h-3 w-3 ml-0.5" />
                </p>
              </button>
            ) : (
              <button
                onClick={() => onNavigate('login')}
                className="hidden sm:flex flex-col items-start px-2 py-1 hover:border hover:rounded border border-transparent transition"
              >
                <p className="text-xs text-gray-300">Hello, sign in</p>
                <p className="text-sm font-bold">Account & Lists</p>
              </button>
            )}

            {user && (
              <button
                onClick={() => onNavigate('dashboard')}
                className="hidden lg:flex items-center px-2 py-2 hover:border hover:rounded border border-transparent text-sm font-bold transition"
              >
                <ShoppingCart className="h-6 w-6 mr-1" />
                <span className="text-amazon-orange">0</span>
              </button>
            )}
          </div>
        </div>

        {/* Mobile search */}
        <div className="sm:hidden px-2 pb-2">
          <form onSubmit={handleSearch} className="flex h-10 rounded-md overflow-hidden">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search SiteSphere"
              className="flex-1 px-3 text-sm text-amazon-text outline-none"
            />
            <button type="submit" className="bg-amazon-yellow px-4 flex items-center justify-center">
              <Search className="h-5 w-5 text-amazon-text" />
            </button>
          </form>
        </div>
      </div>

      {/* Secondary nav bar */}
      <div className="bg-amazon-midblue text-white text-sm">
        <div className="max-w-7xl mx-auto flex items-center h-10 px-2 sm:px-4 gap-1">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden flex items-center font-bold px-2 py-1 hover:border hover:rounded border border-transparent"
          >
            <Menu className="h-4 w-4 mr-1" />
            All
          </button>
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.path}
                onClick={() => onNavigate(item.path)}
                className={`px-2 py-1.5 rounded border border-transparent transition ${
                  currentPage === item.path
                    ? 'border-white font-bold'
                    : 'hover:border hover:border-white'
                }`}
              >
                {item.name}
              </button>
            ))}
          </nav>
          {user ? (
            <button
              onClick={() => onNavigate('dashboard')}
              className={`hidden md:inline-block px-2 py-1.5 rounded border border-transparent transition ml-auto ${
                currentPage === 'dashboard' ? 'border-white font-bold' : 'hover:border hover:border-white'
              }`}
            >
              Your Dashboard
            </button>
          ) : (
            <button
              onClick={() => onNavigate('login')}
              className="hidden md:inline-block px-2 py-1.5 rounded border border-transparent hover:border hover:border-white ml-auto font-bold transition"
            >
              Sign In
            </button>
          )}
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg border-t border-gray-200">
          <div className="px-4 py-3">
            <p className="text-xs font-bold uppercase text-amazon-subtle mb-3">Navigation</p>
            <div className="space-y-1">
              {navItems.map((item) => (
                <button
                  key={item.path}
                  onClick={() => {
                    onNavigate(item.path);
                    setIsMenuOpen(false);
                  }}
                  className={`block w-full text-left px-3 py-2.5 rounded text-sm font-medium transition ${
                    currentPage === item.path
                      ? 'bg-orange-50 text-amazon-orangehover'
                      : 'text-amazon-text hover:bg-gray-100'
                  }`}
                >
                  {item.name}
                </button>
              ))}
              {user ? (
                <button
                  onClick={() => {
                    onNavigate('dashboard');
                    setIsMenuOpen(false);
                  }}
                  className={`block w-full text-left px-3 py-2.5 rounded text-sm font-medium transition ${
                    currentPage === 'dashboard'
                      ? 'bg-orange-50 text-amazon-orangehover'
                      : 'text-amazon-text hover:bg-gray-100'
                  }`}
                >
                  Your Dashboard
                </button>
              ) : (
                <button
                  onClick={() => {
                    onNavigate('login');
                    setIsMenuOpen(false);
                  }}
                  className="block w-full text-left px-3 py-2.5 rounded text-sm font-bold text-amazon-link hover:bg-gray-100"
                >
                  Sign In
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
