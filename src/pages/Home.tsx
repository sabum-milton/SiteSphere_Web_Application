import { useEffect, useState } from 'react';
import { ArrowRight, ChevronRight, Star, Code, Smartphone, Briefcase, TrendingUp, Package, Play } from 'lucide-react';
import { services, portfolioProjects, testimonials } from '../data/mockData';
import { supabase } from '../lib/supabase';
import type { MediaFile } from '../types';

interface HomeProps {
  onNavigate: (page: string) => void;
}

const heroImage = 'https://images.pexels.com/photos/3182800/pexels-photo-3182800.jpeg?auto=compress&cs=tinysrgb&h=650&w=940';

function isSafeMediaUrl(url: string): boolean {
  try {
    const parsed = new URL(url, window.location.origin);
    return parsed.protocol === 'https:' || parsed.protocol === 'http:';
  } catch {
    return false;
  }
}

export default function Home({ onNavigate }: HomeProps) {
  const iconMap: Record<string, any> = { Code, Smartphone, Briefcase, TrendingUp, Package };
  const [overviewVideo, setOverviewVideo] = useState<MediaFile | null>(null);

  useEffect(() => {
    let isMounted = true;

    const loadOverviewVideo = async () => {
      const { data, error } = await supabase
        .from('storage')
        .select('fileid, file_name, file_url, size, created_at')
        .or('file_name.ilike.%video%,file_name.ilike.%overview%')
        .order('created_at', { ascending: false })
        .limit(1);

      if (error || !data || data.length === 0) return;

      const candidate = data[0];
      if (!candidate.file_url || !isSafeMediaUrl(candidate.file_url)) return;

      if (isMounted) setOverviewVideo(candidate);
    };

    loadOverviewVideo();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="bg-amazon-lightbg min-h-screen">
      {/* Hero banner */}
      <section className="relative">
        <div className="relative h-[400px] sm:h-[500px] overflow-hidden">
          <img src={heroImage} alt="SiteSphere team" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
          <div className="absolute inset-0 flex items-center">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
              <div className="max-w-xl">
                <h1 className="text-3xl sm:text-5xl font-bold text-white leading-tight">
                  Empowering Earners,<br />Elevating Success
                </h1>
                <p className="mt-4 text-base sm:text-lg text-gray-200">
                  Professional web development, mobile apps, and business solutions for small businesses and aspiring entrepreneurs.
                </p>
                <div className="mt-6 flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => onNavigate('services')}
                    className="bg-amazon-orange hover:bg-amazon-orangehover text-amazon-dark px-6 py-2.5 rounded-md font-bold text-sm transition inline-flex items-center justify-center gap-2"
                  >
                    Explore Services <ArrowRight className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => onNavigate('contact')}
                    className="bg-white/90 hover:bg-white text-amazon-dark px-6 py-2.5 rounded-md font-bold text-sm transition"
                  >
                    Get Started Today
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Who We Are video section */}
      {overviewVideo && (
        <section className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6 mt-6 mb-6">
          <div className="bg-white rounded-md p-5 amazon-card border border-amazon-border">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              <div className="relative rounded-md overflow-hidden border border-amazon-border bg-black aspect-video">
                <video
                  src={overviewVideo.file_url}
                  controls
                  preload="metadata"
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <div className="inline-flex items-center gap-2 text-amazon-orangehover mb-3">
                  <Play className="h-5 w-5" />
                  <span className="text-xs font-bold uppercase tracking-wide">Who We Are</span>
                </div>
                <h2 className="text-2xl font-bold text-amazon-text leading-tight">
                  See What SiteSphere Is About
                </h2>
                <p className="mt-3 text-sm text-amazon-subtle leading-6">
                  From graphics and advertising to content creation and our own products, SiteSphere helps businesses grow and entrepreneurs succeed.
                </p>
                <button
                  onClick={() => onNavigate('services')}
                  className="mt-6 bg-amazon-orange hover:bg-amazon-orangehover text-amazon-dark px-6 py-2.5 rounded-md font-bold text-sm transition inline-flex items-center justify-center gap-2"
                >
                  Explore Our Services <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Service cards grid — Amazon product card style */}
      <section className={`max-w-7xl mx-auto px-2 sm:px-4 lg:px-6 relative z-10 ${overviewVideo ? 'mt-6' : '-mt-10'}`}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.slice(0, 6).map((service) => {
            const Icon = iconMap[service.icon];
            return (
              <div
                key={service.id}
                onClick={() => onNavigate('services')}
                className="bg-white rounded-md p-5 amazon-card hover:shadow-lg cursor-pointer border border-amazon-border transition group"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-md bg-amazon-lightbg border border-amazon-border group-hover:bg-amazon-orange transition">
                    <Icon className="h-6 w-6 text-amazon-dark group-hover:text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-base text-amazon-text truncate-2">{service.title}</h3>
                    <p className="mt-1 text-sm text-amazon-subtle leading-5 line-clamp-3">{service.description}</p>
                    <p className="mt-2 text-sm font-bold text-amazon-danger">{service.price}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Portfolio strip — Amazon "Today's Deals" style */}
      <section className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6 mt-6">
        <div className="bg-white rounded-md p-5 amazon-card border border-amazon-border">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-amazon-text">Featured Projects</h2>
            <button
              onClick={() => onNavigate('portfolio')}
              className="text-sm font-bold text-amazon-link hover:text-amazon-linkhover transition inline-flex items-center"
            >
              See more <ChevronRight className="h-4 w-4" />
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {portfolioProjects.slice(0, 3).map((project) => (
              <div
                key={project.id}
                onClick={() => onNavigate('portfolio')}
                className="cursor-pointer group"
              >
                <div className="relative h-44 rounded-md overflow-hidden border border-amazon-border">
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  />
                  <span className="absolute top-2 left-2 bg-amazon-orange text-amazon-dark text-xs font-bold px-2 py-0.5 rounded">
                    {project.category}
                  </span>
                </div>
                <h3 className="mt-2 text-sm font-bold text-amazon-link group-hover:text-amazon-linkhover group-hover:underline transition truncate-2">
                  {project.title}
                </h3>
                <p className="mt-1 text-xs text-amazon-subtle leading-5 line-clamp-2">{project.description}</p>
                <div className="mt-2 flex flex-wrap gap-1">
                  {project.technologies.slice(0, 3).map((tech) => (
                    <span key={tech} className="text-[10px] bg-gray-100 text-amazon-subtle px-2 py-0.5 rounded-full border border-gray-200">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials — Amazon review style */}
      <section className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6 mt-6 mb-6">
        <div className="bg-white rounded-md p-5 amazon-card border border-amazon-border">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-amazon-text">Top Reviews</h2>
            <button
              onClick={() => onNavigate('testimonials')}
              className="text-sm font-bold text-amazon-link hover:text-amazon-linkhover transition inline-flex items-center"
            >
              See all reviews <ChevronRight className="h-4 w-4" />
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {testimonials.slice(0, 3).map((t) => (
              <div key={t.id} className="border border-amazon-border rounded-md p-4 bg-gray-50">
                <div className="mb-3">
                  <p className="text-sm font-bold text-amazon-text">{t.name}</p>
                  <p className="text-xs text-amazon-subtle">{t.role} · {t.company}</p>
                </div>
                <div className="flex items-center gap-1 mb-2">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-amazon-stargold text-amazon-stargold" />
                  ))}
                  <span className="ml-1 text-xs font-bold text-amazon-subtle">{t.rating}.0</span>
                </div>
                <p className="text-xs text-amazon-text leading-5 line-clamp-4 italic">"{t.content}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA bar */}
      <section className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6 mb-6">
        <div className="bg-amazon-midblue rounded-md p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-3">Ready to Transform Your Business?</h2>
          <p className="text-sm text-gray-300 mb-6 max-w-2xl mx-auto">
            Join hundreds of satisfied clients who have elevated their entrepreneurial success with SiteSphere.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => onNavigate('pricing')}
              className="bg-amazon-orange hover:bg-amazon-orangehover text-amazon-dark px-6 py-2.5 rounded-md font-bold text-sm transition"
            >
              View Pricing Plans
            </button>
            <button
              onClick={() => onNavigate('contact')}
              className="bg-white/10 border border-white/30 text-white px-6 py-2.5 rounded-md font-bold text-sm hover:bg-white/20 transition"
            >
              Contact Us Today
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
