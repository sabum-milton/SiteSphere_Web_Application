import { Code, Smartphone, Briefcase, TrendingUp, Package, Check, ChevronRight } from 'lucide-react';
import { services } from '../data/mockData';

interface ServicesProps {
  onNavigate: (page: string) => void;
}

export default function Services({ onNavigate }: ServicesProps) {
  const iconMap: Record<string, any> = { Code, Smartphone, Briefcase, TrendingUp, Package };

  return (
    <div className="min-h-screen bg-amazon-lightbg">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-amazon-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
          <p className="text-xs text-amazon-subtle flex items-center gap-1">
            <button onClick={() => onNavigate('home')} className="hover:text-amazon-link">Home</button>
            <ChevronRight className="h-3 w-3" />
            <span className="text-amazon-text font-bold">Services</span>
          </p>
        </div>
      </div>

      {/* Page heading */}
      <div className="bg-white border-b border-amazon-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-amazon-text">Our Services</h1>
          <p className="mt-2 text-sm text-amazon-subtle max-w-2xl">
            Comprehensive digital solutions tailored to your business needs. From web development to business consulting, we have got you covered.
          </p>
        </div>
      </div>

      {/* Service listing cards */}
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {services.map((service) => {
            const Icon = iconMap[service.icon];
            return (
              <div
                key={service.id}
                className="bg-white rounded-md border border-amazon-border amazon-card hover:shadow-lg transition p-5"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-md bg-amazon-lightbg border border-amazon-border flex-shrink-0">
                    <Icon className="h-7 w-7 text-amazon-dark" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h2 className="text-lg font-bold text-amazon-text">{service.title}</h2>
                    <p className="mt-1 text-sm text-amazon-subtle leading-5">{service.description}</p>
                    <p className="mt-2 text-lg font-bold text-amazon-danger">{service.price}</p>
                  </div>
                </div>

                <div className="mt-4 border-t border-gray-100 pt-4">
                  <p className="text-xs font-bold uppercase text-amazon-subtle mb-3">What's included</p>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2 text-sm text-amazon-text">
                        <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-green-600">
                          <Check className="h-3 w-3 text-white" strokeWidth={3} />
                        </span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-5 flex gap-2">
                  <button
                    onClick={() => onNavigate('contact')}
                    className="bg-amazon-orange hover:bg-amazon-orangehover text-amazon-dark px-5 py-2 rounded-md font-bold text-sm transition"
                  >
                    Get Started
                  </button>
                  <button
                    onClick={() => onNavigate('pricing')}
                    className="bg-gray-100 hover:bg-gray-200 text-amazon-text px-5 py-2 rounded-md font-bold text-sm border border-amazon-border transition"
                  >
                    View Pricing
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* CTA */}
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6 pb-6">
        <div className="bg-white rounded-md border border-amazon-border p-6 text-center amazon-card">
          <h2 className="text-xl font-bold text-amazon-text mb-2">Not sure which service is right for you?</h2>
          <p className="text-sm text-amazon-subtle mb-4">Contact our team for a free consultation. We will help you choose the perfect solution.</p>
          <button
            onClick={() => onNavigate('contact')}
            className="bg-amazon-orange hover:bg-amazon-orangehover text-amazon-dark px-6 py-2.5 rounded-md font-bold text-sm transition inline-flex items-center gap-2"
          >
            Schedule Free Consultation <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
