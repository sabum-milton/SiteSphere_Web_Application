import { Facebook, Instagram, MessageCircle, Mail, Phone, MapPin, ChevronUp } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const columns = [
    {
      title: 'Get to Know Us',
      links: [
        { label: 'About SiteSphere', page: 'home' },
        { label: 'Our Services', page: 'services' },
        { label: 'Portfolio', page: 'portfolio' },
        { label: 'Careers', page: 'contact' },
      ],
    },
    {
      title: 'Business with Us',
      links: [
        { label: 'Pricing Plans', page: 'pricing' },
        { label: 'Become a Partner', page: 'contact' },
        { label: 'Investment Opportunities', page: 'investors' },
        { label: 'Business Consulting', page: 'services' },
      ],
    },
    {
      title: 'Make Money with Us',
      links: [
        { label: 'Start Your Project', page: 'contact' },
        { label: 'Business Management', page: 'services' },
        { label: 'Delivery Systems', page: 'services' },
        { label: 'Web Development', page: 'services' },
      ],
    },
    {
      title: 'Let Us Help You',
      links: [
        { label: 'Your Account', page: 'dashboard' },
        { label: 'Your Orders', page: 'dashboard' },
        { label: 'Help Center', page: 'contact' },
        { label: 'Contact Us', page: 'contact' },
      ],
    },
  ];

  return (
    <footer className="mt-auto">
      {/* Back to top bar */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="w-full bg-amazon-hover hover:bg-amazon-charcoal text-white text-sm py-4 transition"
      >
        <span className="inline-flex items-center gap-1">
          <ChevronUp className="h-4 w-4" />
          Back to top
        </span>
      </button>

      {/* Main link columns */}
      <div className="bg-amazon-midblue text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {columns.map((col) => (
              <div key={col.title}>
                <h3 className="font-bold text-base mb-3">{col.title}</h3>
                <ul className="space-y-2">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <button
                        onClick={() => onNavigate(link.page)}
                        className="text-sm text-gray-300 hover:underline hover:text-white transition"
                      >
                        {link.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Logo line */}
      <div className="bg-amazon-charocolate border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col items-center gap-4">
            <img
              src="/sitesphere_logo.png"
              alt="SiteSphere"
              className="h-10 w-auto"
            />
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs text-gray-400">
              <button onClick={() => onNavigate('contact')} className="hover:text-white transition">Conditions of Use</button>
              <button onClick={() => onNavigate('contact')} className="hover:text-white transition">Privacy Notice</button>
              <button onClick={() => onNavigate('contact')} className="hover:text-white transition">Your Ads Privacy Choices</button>
            </div>
            <div className="flex gap-4">
              <a
                href="https://facebook.com/SiteSphere"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://wa.me/237674109979"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom copyright */}
      <div className="bg-amazon-charcoal">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 text-center text-xs text-gray-400">
          <p>&copy; {currentYear} SiteSphere. All rights reserved.</p>
          <p className="mt-1">Empowering Earners, Elevating Entrepreneurial Success</p>
          <div className="mt-3 flex flex-wrap justify-center gap-x-5 gap-y-1 text-xs">
            <span className="flex items-center gap-1"><Mail className="h-3 w-3" /> sabummilton14@gmail.com</span>
            <span className="flex items-center gap-1"><Phone className="h-3 w-3" /> +237 674109979</span>
            <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> Nouvelle Route Nkolbisson</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
