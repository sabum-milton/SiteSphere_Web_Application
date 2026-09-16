import { useState, FormEvent } from 'react';
import { TrendingUp, Users, DollarSign, Target, ArrowUpRight, Check, ChevronRight, Loader2, AlertCircle } from 'lucide-react';

interface InvestorsProps {
  onNavigate: (page: string) => void;
}

const EMPTY_FORM = { name: '', email: '', phone: '', company: '', investmentAmount: '', message: '' };

export default function Investors({ onNavigate }: InvestorsProps) {
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const apiUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-investor-email`;
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          company: formData.company,
          investmentAmount: formData.investmentAmount,
          message: formData.message,
        }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.error || 'Submission failed. Please try again.');
      }

      setSubmitted(true);
      setFormData(EMPTY_FORM);
      setTimeout(() => setSubmitted(false), 5000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const inputClass = 'w-full px-3 py-2 border border-gray-400 rounded text-sm focus:ring-2 focus:ring-amazon-orange focus:border-transparent outline-none';
  const labelClass = 'block text-xs font-bold text-amazon-text mb-1';

  return (
    <div className="min-h-screen bg-amazon-lightbg">
      <div className="bg-white border-b border-amazon-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
          <p className="text-xs text-amazon-subtle flex items-center gap-1">
            <button onClick={() => onNavigate('home')} className="hover:text-amazon-link">Home</button>
            <ChevronRight className="h-3 w-3" />
            <span className="text-amazon-text font-bold">Investors</span>
          </p>
        </div>
      </div>

      <div className="bg-white border-b border-amazon-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-amazon-text">Investment Opportunities</h1>
          <p className="mt-2 text-sm text-amazon-subtle max-w-2xl">Join us in empowering entrepreneurs and transforming businesses. Be part of our growth story and exceptional returns.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6 py-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {[
            { icon: TrendingUp, value: '250%', label: 'Annual Growth Rate' },
            { icon: Users, value: '150+', label: 'Active Clients' },
            { icon: DollarSign, value: '$2M+', label: 'Annual Revenue' },
            { icon: Target, value: '98%', label: 'Client Retention' },
          ].map((s) => (
            <div key={s.label} className="bg-white rounded-md border border-amazon-border p-5 amazon-card text-center">
              <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-md bg-amazon-lightbg border border-amazon-border"><s.icon className="h-5 w-5 text-amazon-dark" /></div>
              <p className="text-2xl font-bold text-amazon-text">{s.value}</p>
              <p className="mt-1 text-xs text-amazon-subtle">{s.label}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
          <div className="bg-white rounded-md border border-amazon-border p-6 amazon-card">
            <h2 className="text-lg font-bold text-amazon-text mb-4">Investment Benefits</h2>
            <ul className="space-y-3">
              {['Projected ROI of 35-45% annually', 'Equity stake in a fast-growing tech company', 'Quarterly dividend distributions', 'Voting rights on major company decisions', 'Priority access to new service offerings', 'Transparent financial reporting', 'Exit strategy options after 3 years', 'Tax benefits for qualified investors'].map((b) => (
                <li key={b} className="flex items-start gap-2 text-sm text-amazon-text">
                  <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-green-600"><Check className="h-3 w-3 text-white" strokeWidth={3} /></span>
                  {b}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-white rounded-md border border-amazon-border p-6 amazon-card">
            <h2 className="text-lg font-bold text-amazon-text mb-4">Projected Returns</h2>
            <div className="space-y-4">
              {[['$50,000', '$17,500', '35%'], ['$100,000', '$35,000', '35%'], ['$250,000+', '$100,000+', '40%']].map(([inv, ret, rate]) => (
                <div key={inv} className="border-b border-gray-100 pb-3 last:border-0">
                  <div className="flex justify-between mb-1"><span className="text-xs text-amazon-subtle">Investment</span><span className="text-sm font-bold text-amazon-text">{inv}</span></div>
                  <div className="flex justify-between"><span className="text-xs text-amazon-subtle">Year 1 Return ({rate})</span><span className="text-sm font-bold text-green-600 flex items-center">{ret}<ArrowUpRight className="h-3 w-3 ml-1" /></span></div>
                </div>
              ))}
              <p className="text-xs text-amazon-subtle italic">*Projections based on historical performance and market analysis</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-md border border-amazon-border p-6 amazon-card mb-6">
          <h2 className="text-lg font-bold text-amazon-text mb-1">Investor Application</h2>
          <p className="text-sm text-amazon-subtle mb-4">Submit your information and our investment team will contact you within 48 hours.</p>
          {submitted && <div className="bg-green-50 border border-green-200 text-green-700 text-sm px-3 py-2 rounded mb-4 text-center">Thank you! Your application has been submitted. We will contact you soon.</div>}
          {error && <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-3 py-2 rounded mb-4 flex items-center gap-2"><AlertCircle className="h-4 w-4 shrink-0" />{error}</div>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div><label className={labelClass}>Full Name</label><input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className={inputClass} required disabled={loading} /></div>
              <div><label className={labelClass}>Email</label><input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className={inputClass} required disabled={loading} /></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div><label className={labelClass}>Phone</label><input type="tel" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className={inputClass} required disabled={loading} /></div>
              <div><label className={labelClass}>Company</label><input type="text" value={formData.company} onChange={(e) => setFormData({ ...formData, company: e.target.value })} className={inputClass} disabled={loading} /></div>
            </div>
            <div><label className={labelClass}>Investment Amount</label><select value={formData.investmentAmount} onChange={(e) => setFormData({ ...formData, investmentAmount: e.target.value })} className={inputClass} required disabled={loading}><option value="">Select investment range</option><option value="25k-50k">$25,000 - $50,000</option><option value="50k-100k">$50,000 - $100,000</option><option value="100k-250k">$100,000 - $250,000</option><option value="250k+">$250,000+</option></select></div>
            <div><label className={labelClass}>Additional Information</label><textarea value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} rows={3} className={inputClass} placeholder="Tell us about your investment goals..." disabled={loading} /></div>
            <button type="submit" disabled={loading} className="w-full bg-amazon-orange hover:bg-amazon-orangehover text-amazon-dark py-2.5 rounded-md font-bold text-sm transition flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed">
              {loading ? (<><Loader2 className="h-4 w-4 animate-spin" /> Submitting...</>) : 'Submit Application'}
            </button>
          </form>
        </div>

        <div className="bg-white rounded-md border border-amazon-border p-6 amazon-card text-center">
          <h2 className="text-lg font-bold text-amazon-text mb-2">Investment Relations Contact</h2>
          <div className="text-sm text-amazon-subtle space-y-1">
            <p><span className="font-bold text-amazon-text">Email:</span> sabummilton14@gmail.com</p>
            <p><span className="font-bold text-amazon-text">Phone:</span> +237 674109979</p>
            <p><span className="font-bold text-amazon-text">Address:</span> Nouvelle Route Nkolbisson</p>
          </div>
        </div>
      </div>
    </div>
  );
}
