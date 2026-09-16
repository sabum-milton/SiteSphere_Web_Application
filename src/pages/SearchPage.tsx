import { useState } from 'react';
import { ChevronRight, Search, SearchX, ArrowRight } from 'lucide-react';
import { searchCatalog, getSuggestions } from '../lib/search';

interface SearchPageProps {
  onNavigate: (page: string) => void;
}

export default function SearchPage({ onNavigate }: SearchPageProps) {
  const [query, setQuery] = useState('');
  const [submittedQuery, setSubmittedQuery] = useState('');

  const results = searchCatalog(submittedQuery);
  const suggestions = getSuggestions(submittedQuery);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittedQuery(query);
  };

  return (
    <div className="min-h-screen bg-amazon-lightbg">
      <div className="bg-white border-b border-amazon-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
          <p className="text-xs text-amazon-subtle flex items-center gap-1">
            <button onClick={() => onNavigate('home')} className="hover:text-amazon-link">Home</button>
            <ChevronRight className="h-3 w-3" />
            <span className="text-amazon-text font-bold">Search</span>
          </p>
        </div>
      </div>

      <div className="bg-white border-b border-amazon-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-amazon-text">Search SiteSphere</h1>
          <p className="mt-2 text-sm text-amazon-subtle max-w-2xl">
            Search across all our services, graphics, advertising, content creation, and products.
          </p>
          <form onSubmit={handleSubmit} className="mt-4 flex max-w-2xl h-11 rounded-md overflow-hidden shadow-sm border border-amazon-border">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Try 'logo', 'website', 'video', 'ecommerce'..."
              className="flex-1 px-3 text-sm text-amazon-text outline-none focus:ring-2 focus:ring-amazon-orange"
            />
            <button type="submit" className="bg-amazon-yellow hover:bg-amazon-yellowhover px-5 flex items-center justify-center transition">
              <Search className="h-5 w-5 text-amazon-text" />
            </button>
          </form>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6 py-6">
        {submittedQuery ? (
          results.length > 0 ? (
            <>
              <p className="text-sm text-amazon-subtle mb-4">
                {results.length} result{results.length === 1 ? '' : 's'} for <span className="font-bold text-amazon-text">"{submittedQuery}"</span>
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {results.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => onNavigate(item.page)}
                    className="bg-white rounded-md border border-amazon-border amazon-card hover:shadow-lg transition p-5 cursor-pointer group"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-base font-bold text-amazon-text group-hover:text-amazon-link transition">{item.title}</h3>
                      <span className="text-[10px] font-bold uppercase bg-amazon-lightbg border border-amazon-border text-amazon-subtle px-2 py-0.5 rounded-full">
                        {item.category}
                      </span>
                    </div>
                    <p className="text-sm text-amazon-subtle leading-5">{item.description}</p>
                    <span className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-amazon-link">
                      Learn more <ArrowRight className="h-3 w-3 group-hover:translate-x-0.5 transition" />
                    </span>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="bg-white rounded-md border border-amazon-border p-8 text-center amazon-card max-w-2xl mx-auto">
              <SearchX className="h-10 w-10 text-amazon-subtle mx-auto mb-3" />
              <h2 className="text-lg font-bold text-amazon-text mb-1">No results for "{submittedQuery}"</h2>
              <p className="text-sm text-amazon-subtle mb-4">We couldn't find anything matching your search. Try one of these suggestions:</p>
              {suggestions.length > 0 && (
                <div className="flex flex-wrap justify-center gap-2 mb-5">
                  {suggestions.map((s) => (
                    <button
                      key={s}
                      onClick={() => {
                        setQuery(s);
                        setSubmittedQuery(s);
                      }}
                      className="text-sm bg-amazon-lightbg border border-amazon-border text-amazon-text px-3 py-1.5 rounded-full hover:bg-gray-200 transition"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}
              <button
                onClick={() => onNavigate('all')}
                className="inline-flex items-center gap-1 text-sm font-bold text-amazon-link hover:text-amazon-linkhover"
              >
                Browse everything we offer <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          )
        ) : (
          <div className="bg-white rounded-md border border-amazon-border p-8 amazon-card">
            <h2 className="text-lg font-bold text-amazon-text mb-3">Popular searches</h2>
            <div className="flex flex-wrap gap-2">
              {['Website', 'Logo', 'Video', 'E-Commerce', 'Marketing', 'Brand', 'Delivery', 'Photography'].map((s) => (
                <button
                  key={s}
                  onClick={() => {
                    setQuery(s);
                    setSubmittedQuery(s);
                  }}
                  className="text-sm bg-amazon-lightbg border border-amazon-border text-amazon-text px-3 py-1.5 rounded-full hover:bg-gray-200 transition"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
