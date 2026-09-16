import { ChevronRight, LayoutGrid, Palette, Megaphone, PenTool, Package, ArrowRight } from 'lucide-react';
import { catalog, catalogCategories } from '../data/catalog';

interface AllProps {
  onNavigate: (page: string) => void;
}

const categoryIcons: Record<string, any> = {
  Services: LayoutGrid,
  Graphics: Palette,
  Advertising: Megaphone,
  'Content Creation': PenTool,
  Products: Package,
};

export default function All({ onNavigate }: AllProps) {
  return (
    <div className="min-h-screen bg-amazon-lightbg">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-amazon-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
          <p className="text-xs text-amazon-subtle flex items-center gap-1">
            <button onClick={() => onNavigate('home')} className="hover:text-amazon-link">Home</button>
            <ChevronRight className="h-3 w-3" />
            <span className="text-amazon-text font-bold">All Offerings</span>
          </p>
        </div>
      </div>

      {/* Page heading */}
      <div className="bg-white border-b border-amazon-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-amazon-text">Everything We Do</h1>
          <p className="mt-2 text-sm text-amazon-subtle max-w-2xl">
            A complete overview of every service, graphic, advertising solution, content service, and product SiteSphere offers.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6 py-6">
        {catalogCategories.map((category) => {
          const items = catalog.filter((i) => i.category === category);
          const Icon = categoryIcons[category];
          return (
            <section key={category} className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-md bg-amazon-dark text-white">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-amazon-text">{category}</h2>
                  <p className="text-xs text-amazon-subtle">{items.length} {items.length === 1 ? 'offering' : 'offerings'}</p>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {items.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => onNavigate(item.page)}
                    className="bg-white rounded-md border border-amazon-border amazon-card hover:shadow-lg transition p-5 cursor-pointer group"
                  >
                    <h3 className="text-base font-bold text-amazon-text group-hover:text-amazon-link transition">{item.title}</h3>
                    <p className="mt-1 text-sm text-amazon-subtle leading-5 line-clamp-3">{item.description}</p>
                    <span className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-amazon-link">
                      Learn more <ArrowRight className="h-3 w-3 group-hover:translate-x-0.5 transition" />
                    </span>
                  </div>
                ))}
              </div>
            </section>
          );
        })}

        {/* CTA */}
        <div className="bg-amazon-midblue rounded-md p-8 text-center text-white">
          <h2 className="text-xl font-bold mb-2">Can't find what you're looking for?</h2>
          <p className="text-sm text-gray-300 mb-5">Tell us your idea and we will build a custom solution around it.</p>
          <button
            onClick={() => onNavigate('contact')}
            className="bg-amazon-orange hover:bg-amazon-orangehover text-amazon-dark px-6 py-2.5 rounded-md font-bold text-sm transition"
          >
            Contact Us
          </button>
        </div>
      </div>
    </div>
  );
}
