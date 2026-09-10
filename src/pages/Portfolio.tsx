import { useState } from 'react';
import { ExternalLink, ChevronRight, Filter } from 'lucide-react';
import { portfolioProjects } from '../data/mockData';

interface PortfolioProps {
  onNavigate: (page: string) => void;
}

export default function Portfolio({ onNavigate }: PortfolioProps) {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', ...Array.from(new Set(portfolioProjects.map(p => p.category)))];

  const filteredProjects = selectedCategory === 'All'
    ? portfolioProjects
    : portfolioProjects.filter(p => p.category === selectedCategory);

  return (
    <div className="min-h-screen bg-amazon-lightbg">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-amazon-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
          <p className="text-xs text-amazon-subtle flex items-center gap-1">
            <button onClick={() => onNavigate('home')} className="hover:text-amazon-link">Home</button>
            <ChevronRight className="h-3 w-3" />
            <span className="text-amazon-text font-bold">Portfolio</span>
          </p>
        </div>
      </div>

      {/* Page heading */}
      <div className="bg-white border-b border-amazon-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-amazon-text">Our Portfolio</h1>
          <p className="mt-2 text-sm text-amazon-subtle max-w-2xl">
            Explore our collection of successful projects. Each one represents our commitment to excellence and innovation.
          </p>
        </div>
      </div>

      {/* Filter bar */}
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6 pt-6">
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <div className="flex items-center gap-2 text-sm font-bold text-amazon-text">
            <Filter className="h-4 w-4" />
            <span>Filter by:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition border ${
                  selectedCategory === category
                    ? 'bg-amazon-dark text-white border-amazon-dark'
                    : 'bg-white text-amazon-text border-amazon-border hover:bg-gray-100'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Product grid */}
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6 pb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="bg-white rounded-md border border-amazon-border amazon-card hover:shadow-lg transition overflow-hidden group"
            >
              <div className="relative h-52 overflow-hidden">
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                />
                <span className="absolute top-2 left-2 bg-amazon-orange text-amazon-dark text-xs font-bold px-2 py-0.5 rounded">
                  {project.category}
                </span>
              </div>
              <div className="p-4">
                <h3 className="text-base font-bold text-amazon-link hover:text-amazon-linkhover hover:underline cursor-pointer transition">
                  {project.title}
                </h3>
                <p className="mt-1 text-sm text-amazon-subtle leading-5 line-clamp-2">{project.description}</p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {project.technologies.map((tech) => (
                    <span key={tech} className="text-xs bg-gray-100 text-amazon-subtle px-2 py-0.5 rounded-full border border-gray-200">
                      {tech}
                    </span>
                  ))}
                </div>
                {project.demoUrl && (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center gap-1 text-sm font-bold text-amazon-link hover:text-amazon-linkhover hover:underline transition"
                  >
                    View Demo <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6 pb-6">
        <div className="bg-white rounded-md border border-amazon-border p-6 text-center amazon-card">
          <h2 className="text-xl font-bold text-amazon-text mb-2">Ready to Start Your Project?</h2>
          <p className="text-sm text-amazon-subtle mb-4">Let's create something amazing together. Contact us to discuss your project requirements.</p>
          <button
            onClick={() => onNavigate('contact')}
            className="bg-amazon-orange hover:bg-amazon-orangehover text-amazon-dark px-6 py-2.5 rounded-md font-bold text-sm transition"
          >
            Get Started Today
          </button>
        </div>
      </div>
    </div>
  );
}
