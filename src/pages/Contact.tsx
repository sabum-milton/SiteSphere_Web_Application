import { useState, FormEvent } from 'react';
import { Mail, Phone, MapPin, Clock, MessageCircle, Send, ChevronRight } from 'lucide-react';

interface ContactProps {
  onNavigate: (page: string) => void;
}

export default function Contact({ onNavigate }: ContactProps) {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => { setSubmitted(false); setFormData({ name: '', email: '', phone: '', subject: '', message: '' }); }, 3000);
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
            <span className="text-amazon-text font-bold">Contact</span>
          </p>
        </div>
      </div>

      <div className="bg-white border-b border-amazon-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-amazon-text">Get In Touch</h1>
          <p className="mt-2 text-sm text-amazon-subtle max-w-2xl">We would love to hear from you. Reach out for any questions, quotes, or consultations.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
          {[
            { icon: Mail, title: 'Email Us', desc: 'Send us an email anytime', value: 'sabummilton14@gmail.com', link: 'mailto:sabummilton14@gmail.com' },
            { icon: Phone, title: 'Call Us', desc: 'Mon-Fri from 8am to 6pm', value: '+237 674109979', link: 'tel:+237674109979' },
            { icon: MessageCircle, title: 'WhatsApp', desc: 'Chat with us instantly', value: 'Start Chat', link: 'https://wa.me/237674109979' },
          ].map((item) => (
            <div key={item.title} className="bg-white rounded-md border border-amazon-border p-5 amazon-card text-center">
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-md bg-amazon-lightbg border border-amazon-border">
                <item.icon className="h-6 w-6 text-amazon-dark" />
              </div>
              <h3 className="text-base font-bold text-amazon-text">{item.title}</h3>
              <p className="mt-1 text-xs text-amazon-subtle">{item.desc}</p>
              <a href={item.link} target={item.link.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" className="mt-2 inline-block text-sm font-bold text-amazon-link hover:text-amazon-linkhover hover:underline">{item.value}</a>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="bg-white rounded-md border border-amazon-border p-6 amazon-card">
            <h2 className="text-lg font-bold text-amazon-text mb-4">Send Us a Message</h2>
            {submitted && <div className="bg-green-50 border border-green-200 text-green-700 text-sm px-3 py-2 rounded mb-4">Thank you! We will get back to you within 24 hours.</div>}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div><label className={labelClass}>Full Name</label><input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className={inputClass} placeholder="John Doe" required /></div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div><label className={labelClass}>Email</label><input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className={inputClass} placeholder="you@example.com" required /></div>
                <div><label className={labelClass}>Phone</label><input type="tel" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className={inputClass} placeholder="+1 (555) 000-0000" /></div>
              </div>
              <div><label className={labelClass}>Subject</label><select value={formData.subject} onChange={(e) => setFormData({ ...formData, subject: e.target.value })} className={inputClass} required><option value="">Select a subject</option><option value="general">General Inquiry</option><option value="quote">Request a Quote</option><option value="support">Technical Support</option><option value="partnership">Partnership Opportunity</option><option value="other">Other</option></select></div>
              <div><label className={labelClass}>Message</label><textarea value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} rows={5} className={inputClass} placeholder="Tell us about your project or inquiry..." required /></div>
              <button type="submit" className="w-full bg-amazon-orange hover:bg-amazon-orangehover text-amazon-dark py-2.5 rounded-md font-bold text-sm transition inline-flex items-center justify-center gap-2"><span>Send Message</span><Send className="h-4 w-4" /></button>
            </form>
          </div>

          <div className="space-y-4">
            <div className="bg-white rounded-md border border-amazon-border p-6 amazon-card">
              <h2 className="text-lg font-bold text-amazon-text mb-4">Visit Our Office</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3"><MapPin className="h-5 w-5 text-amazon-dark flex-shrink-0 mt-0.5" /><div><p className="text-xs font-bold text-amazon-text">Address</p><p className="text-sm text-amazon-subtle">Nouvelle Route Nkolbisson</p></div></div>
                <div className="flex items-start gap-3"><Clock className="h-5 w-5 text-amazon-dark flex-shrink-0 mt-0.5" /><div><p className="text-xs font-bold text-amazon-text">Business Hours</p><p className="text-sm text-amazon-subtle">Mon-Fri: 8:00 AM - 6:00 PM<br />Sat: 10:00 AM - 4:00 PM<br />Sun: Closed</p></div></div>
                <div className="flex items-start gap-3"><Phone className="h-5 w-5 text-amazon-dark flex-shrink-0 mt-0.5" /><div><p className="text-xs font-bold text-amazon-text">Phone</p><p className="text-sm text-amazon-subtle">+237 674109979</p></div></div>
              </div>
            </div>
            <div className="bg-amazon-midblue rounded-md p-6 text-white">
              <h3 className="text-lg font-bold mb-2">Need Immediate Help?</h3>
              <p className="text-sm text-gray-300 mb-4">For urgent matters, our support team is available 24/7 via WhatsApp.</p>
              <a href="https://wa.me/237674109979" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-white text-amazon-dark px-5 py-2.5 rounded-md font-bold text-sm hover:bg-gray-100 transition"><MessageCircle className="h-4 w-4" />Chat on WhatsApp</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
