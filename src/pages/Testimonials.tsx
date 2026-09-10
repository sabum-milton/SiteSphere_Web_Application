import { Star, ChevronRight } from 'lucide-react';
import { testimonials } from '../data/mockData';

interface TestimonialsProps {
  onNavigate: (page: string) => void;
}

export default function Testimonials({ onNavigate }: TestimonialsProps) {
  return (
    <div className="min-h-screen bg-amazon-lightbg">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-amazon-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
          <p className="text-xs text-amazon-subtle flex items-center gap-1">
            <button onClick={() => onNavigate('home')} className="hover:text-amazon-link">Home</button>
            <ChevronRight className="h-3 w-3" />
            <span className="text-amazon-text font-bold">Testimonials</span>
          </p>
        </div>
      </div>

      {/* Page heading with rating summary */}
      <div className="bg-white border-b border-amazon-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-amazon-text">Customer Reviews</h1>
              <p className="mt-1 text-sm text-amazon-subtle">See what our clients say about working with SiteSphere.</p>
            </div>
            <div className="sm:ml-auto flex items-center gap-3 bg-amazon-lightbg border border-amazon-border rounded-md px-4 py-2">
              <div className="text-center">
                <div className="flex items-center gap-1">
                  <span className="text-2xl font-bold text-amazon-text">5.0</span>
                  <Star className="h-5 w-5 fill-amazon-stargold text-amazon-stargold" />
                </div>
                <p className="text-xs text-amazon-subtle">{testimonials.length} global ratings</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Review cards */}
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6 py-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {testimonials.map((t) => (
            <div key={t.id} className="bg-white rounded-md border border-amazon-border amazon-card hover:shadow-lg transition p-5">
              {/* Star rating */}
              <div className="flex items-center gap-1 mb-3">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-amazon-stargold text-amazon-stargold" />
                ))}
                <span className="ml-1 text-xs font-bold text-amazon-subtle">{t.rating}.0 out of 5</span>
              </div>

              {/* Reviewer info */}
              <div className="mb-3">
                <p className="text-sm font-bold text-amazon-text">{t.name}</p>
                <p className="text-xs text-amazon-subtle">{t.role} · {t.company}</p>
              </div>

              {/* Review text */}
              <p className="text-sm text-amazon-text leading-6 italic">"{t.content}"</p>


            </div>
          ))}
        </div>
      </div>

      {/* Stats bar */}
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6 pb-6">
        <div className="bg-white rounded-md border border-amazon-border p-6 amazon-card">
          <h2 className="text-xl font-bold text-amazon-text mb-4 text-center">Success by the Numbers</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              ['2+', 'Projects Completed'],
              ['100%', 'Client Satisfaction'],
              ['2+', 'Happy Clients'],
              ['24/7', 'Support Available'],
            ].map(([number, label]) => (
              <div key={label} className="text-center border border-amazon-border rounded-md p-4 bg-amazon-lightbg">
                <div className="text-3xl font-bold text-amazon-dark">{number}</div>
                <div className="text-xs text-amazon-subtle mt-1">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6 pb-6">
        <div className="bg-amazon-midblue rounded-md p-8 text-center text-white">
          <h2 className="text-xl font-bold mb-2">Join Our Growing Family of Satisfied Clients</h2>
          <p className="text-sm text-gray-300 mb-5">Experience the same level of excellence and dedication that our clients rave about.</p>
          <button
            onClick={() => onNavigate('contact')}
            className="bg-amazon-orange hover:bg-amazon-orangehover text-amazon-dark px-6 py-2.5 rounded-md font-bold text-sm transition"
          >
            Start Your Success Story
          </button>
        </div>
      </div>
    </div>
  );
}
