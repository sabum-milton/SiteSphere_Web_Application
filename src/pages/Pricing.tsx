import { Check, ChevronRight, ChevronDown } from 'lucide-react';
import { pricingPlans } from '../data/mockData';

interface PricingProps {
  onNavigate: (page: string) => void;
}

const faqs = [
  { question: 'Are the prices shown in XAF?', answer: 'Yes. Every amount on this page is shown in Central African CFA francs (XAF).' },
  { question: 'Can I request a plan tailored to my business?', answer: 'Yes. Tell us what you are building and we will recommend the right starting point or prepare a custom offer.' },
  { question: 'What happens after I choose a plan?', answer: 'Our team will contact you to confirm your needs, agree on the scope, and outline the next steps before work begins.' },
];

const formatPrice = (price: number) => new Intl.NumberFormat('fr-FR').format(price);

export default function Pricing({ onNavigate }: PricingProps) {
  return (
    <div className="min-h-screen bg-amazon-lightbg">
      <div className="bg-white border-b border-amazon-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
          <p className="text-xs text-amazon-subtle flex items-center gap-1">
            <button onClick={() => onNavigate('home')} className="hover:text-amazon-link">Home</button>
            <ChevronRight className="h-3 w-3" />
            <span className="text-amazon-text font-bold">Pricing</span>
          </p>
        </div>
      </div>

      <div className="bg-white border-b border-amazon-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-amazon-text">Simple, Transparent Pricing</h1>
          <p className="mt-2 text-sm text-amazon-subtle max-w-2xl mx-auto">
            Choose the perfect plan for your business. All plans include our core features with flexible options to scale as you grow. Prices in XAF.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6 py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {pricingPlans.map((plan) => (
            <div
              key={plan.id}
              className={`relative bg-white rounded-md border p-6 amazon-card hover:shadow-lg transition flex flex-col ${
                plan.popular ? 'border-amazon-orange ring-2 ring-amazon-orange/20' : 'border-amazon-border'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amazon-orange text-amazon-dark text-xs font-bold px-3 py-1 rounded-full shadow">
                  Most Popular
                </div>
              )}
              <h3 className="text-xl font-bold text-amazon-text">{plan.name}</h3>
              <div className="mt-3 border-b border-gray-100 pb-4">
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold text-amazon-text">{formatPrice(plan.price)}</span>
                  <span className="font-bold text-amazon-subtle">XAF</span>
                </div>
                <p className="mt-1 text-xs text-amazon-subtle">per {plan.interval}</p>
              </div>
              <ul className="mt-4 flex-1 space-y-2.5">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm text-amazon-text">
                    <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-green-600">
                      <Check className="h-3 w-3 text-white" strokeWidth={3} />
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => onNavigate('contact')}
                className={`mt-6 w-full py-2.5 rounded-md font-bold text-sm transition ${
                  plan.popular ? 'bg-amazon-orange hover:bg-amazon-orangehover text-amazon-dark' : 'bg-gray-100 hover:bg-gray-200 text-amazon-text border border-amazon-border'
                }`}
              >
                Select {plan.name}
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6 pb-6">
        <div className="bg-white rounded-md border border-amazon-border p-6 amazon-card">
          <h2 className="text-lg font-bold text-amazon-text mb-4 text-center">All Plans Include</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['SSL Certificate', '99.9% Uptime', 'Free Updates', '24/7 Support'].map((f) => (
              <div key={f} className="text-center border border-amazon-border rounded-md p-3 bg-amazon-lightbg">
                <div className="mx-auto mb-2 flex h-8 w-8 items-center justify-center rounded-full bg-green-600">
                  <Check className="h-4 w-4 text-white" strokeWidth={3} />
                </div>
                <p className="text-xs font-bold text-amazon-text">{f}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-2 sm:px-4 lg:px-6 pb-6">
        <div className="space-y-2">
          {faqs.map((faq) => (
            <details key={faq.question} className="group rounded-md border border-amazon-border bg-white px-5 py-4 amazon-card">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-bold text-amazon-text">
                {faq.question}
                <ChevronDown className="h-4 w-4 shrink-0 text-amazon-subtle transition group-open:rotate-180" />
              </summary>
              <p className="mt-3 text-sm text-amazon-subtle leading-6">{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6 pb-6">
        <div className="bg-amazon-midblue rounded-md p-6 text-center text-white">
          <h2 className="text-lg font-bold mb-2">Need a Custom Solution?</h2>
          <p className="text-sm text-gray-300 mb-4">Contact us to create a tailored plan that perfectly fits your business needs and budget.</p>
          <button onClick={() => onNavigate('contact')} className="bg-amazon-orange hover:bg-amazon-orangehover text-amazon-dark px-6 py-2.5 rounded-md font-bold text-sm transition">
            Contact Sales Team
          </button>
        </div>
      </div>
    </div>
  );
}
