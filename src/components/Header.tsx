import { useState, useRef, useEffect } from 'react';
import { Menu, X, ChevronDown, MapPin, Search, SearchX, ArrowRight } from 'lucide-react';
import { searchCatalog, getSuggestions } from '../lib/search';

interface HeaderProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export default function Header({ currentPage, onNavigate }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const results = searchCatalog(query);
  const suggestions = getSuggestions(query);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navItems = [
    { name: 'Home', path: 'home' },
    { name: 'Services', path: 'services' },
    { name: 'Portfolio', path: 'portfolio' },
    { name: 'Testimonials', path: 'testimonials' },
    { name: 'Pricing', path: 'pricing' },
    { name: 'Investors', path: 'investors' },
    { name: 'Contact', path: 'contact' },
  ];

  const go = (page: string) => {
    onNavigate(page);
    setQuery('');
    setIsDropdownOpen(false);
    setIsMenuOpen(false);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    go('search');
  };

  const handleResultClick = (page: string) => {
    go(page);
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
            aria-label="Menu"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>

          {/* Logo */}
          <div
            className="flex items-center cursor-pointer px-2 py-2 hover:border hover:rounded border border-transparent transition"
            onClick={() => go('home')}
          >
            <img src="/sitesphere_logo.png" alt="SiteSphere" className="h-9 w-auto" />
          </div>

          {/* Deliver to */}
          <div
            className="hidden lg:flex items-center px-2 py-2 hover:border hover:rounded border border-transparent cursor-pointer"
            onClick={() => go('contact')}
          >
            <MapPin className="h-4 w-4 mr-1 text-gray-300" />
            <div className="leading-tight">
              <p className="text-xs text-gray-300">Deliver to</p>
              <p className="text-sm font-bold">Nkolbisson</p>
            </div>
          </div>

          {/* Search bar */}
          <div ref={dropdownRef} className="flex-1 max-w-2xl relative hidden sm:block">
            <form onSubmit={handleSearchSubmit} className="flex h-10 rounded-md overflow-hidden shadow-sm">
              <button
                type="button"
                onClick={() => go('all')}
                className="hidden md:flex items-center bg-gray-200 text-amazon-text text-xs px-2 hover:bg-gray-300 cursor-pointer border-r border-gray-400"
              >
                <span>All</span>
                <ChevronDown className="h-3 w-3 ml-1" />
              </button>
              <input
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setIsDropdownOpen(true);
                }}
                onFocus={() => setIsDropdownOpen(true)}
                placeholder="Search services, graphics, ads, content, products"
                className="flex-1 px-3 text-sm text-amazon-text outline-none focus:ring-2 focus:ring-amazon-orange"
              />
              <button type="submit" className="bg-amazon-yellow hover:bg-amazon-yellowhover px-4 flex items-center justify-center transition">
                <Search className="h-5 w-5 text-amazon-text" />
              </button>
            </form>

            {/* Live results dropdown */}
            {isDropdownOpen && query.trim() && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-md shadow-xl border border-amazon-border overflow-hidden z-50">
                {results.length > 0 ? (
                  <>
                    <ul className="max-h-80 overflow-y-auto">
                      {results.map((item) => (
                        <li key={item.id}>
                          <button
                            onClick={() => handleResultClick(item.page)}
                            className="w-full text-left px-4 py-2.5 hover:bg-gray-100 transition flex items-start gap-3"
                          >
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-bold text-amazon-text truncate">{item.title}</p>
                              <p className="text-xs text-amazon-subtle truncate">{item.description}</p>
                            </div>
                            <span className="shrink-0 text-[10px] font-bold uppercase bg-amazon-lightbg border border-amazon-border text-amazon-subtle px-2 py-0.5 rounded-full">
                              {item.category}
                            </span>
                          </button>
                        </li>
                      ))}
                    </ul>
                    <button
                      onClick={() => go('search')}
                      className="w-full text-center text-sm font-bold text-amazon-link hover:text-amazon-linkhover border-t border-amazon-border py-2.5 hover:bg-gray-50 transition"
                    >
                      See all results for "{query}"
                    </button>
                  </>
                ) : (
                  <div className="px-4 py-4">
                    <div className="flex items-center gap-2 text-amazon-text mb-2">
                      <SearchX className="h-4 w-4 text-amazon-subtle" />
                      <p className="text-sm font-bold">No results for "{query}"</p>
                    </div>
                    {suggestions.length > 0 && (
                      <>
                        <p className="text-xs text-amazon-subtle mb-2">Did you mean:</p>
                        <div className="flex flex-wrap gap-1.5">
                          {suggestions.map((s) => (
                            <button
                              key={s}
                              onClick={() => setQuery(s)}
                              className="text-xs bg-amazon-lightbg border border-amazon-border text-amazon-text px-2 py-1 rounded-full hover:bg-gray-200 transition"
                            >
                              {s}
                            </button>
                          ))}
                        </div>
                      </>
                    )}
                    <button
                      onClick={() => go('all')}
                      className="mt-3 w-full inline-flex items-center justify-center gap-1 text-sm font-bold text-amazon-link hover:text-amazon-linkhover"
                    >
                      Browse everything we offer <ArrowRight className="h-3 w-3" />
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-2 ml-auto">
            <button
              onClick={() => go('contact')}
              className="hidden sm:flex flex-col items-start px-2 py-1 hover:border hover:rounded border border-transparent transition"
            >
              <p className="text-xs text-gray-300">Questions?</p>
              <p className="text-sm font-bold">Contact Us</p>
            </button>
          </div>
        </div>

        {/* Mobile search */}
        <div className="sm:hidden px-2 pb-2">
          <form onSubmit={handleSearchSubmit} className="flex h-10 rounded-md overflow-hidden">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
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
            onClick={() => go('all')}
            className="md:hidden flex items-center font-bold px-2 py-1 hover:border hover:rounded border border-transparent"
          >
            <Menu className="h-4 w-4 mr-1" />
            All
          </button>
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.path}
                onClick={() => go(item.path)}
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
          <button
            onClick={() => go('all')}
            className={`hidden md:inline-block px-2 py-1.5 rounded border border-transparent transition ml-auto ${
              currentPage === 'all' ? 'border-white font-bold' : 'hover:border hover:border-white'
            }`}
          >
            All Offerings
          </button>
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
                  onClick={() => go(item.path)}
                  className={`block w-full text-left px-3 py-2.5 rounded text-sm font-medium transition ${
                    currentPage === item.path
                      ? 'bg-orange-50 text-amazon-orangehover'
                      : 'text-amazon-text hover:bg-gray-100'
                  }`}
                >
                  {item.name}
                </button>
              ))}
              <button
                onClick={() => go('all')}
                className={`block w-full text-left px-3 py-2.5 rounded text-sm font-medium transition ${
                  currentPage === 'all'
                    ? 'bg-orange-50 text-amazon-orangehover'
                    : 'text-amazon-text hover:bg-gray-100'
                }`}
              >
                All Offerings
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
