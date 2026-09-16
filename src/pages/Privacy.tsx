import { ChevronRight } from 'lucide-react';

interface PrivacyProps {
  onNavigate: (page: string) => void;
}

const sections: { title: string; body: string[] }[] = [
  {
    title: '1. Introduction',
    body: [
      'This Privacy Policy explains how SiteSphere collects, uses, and protects your personal information when you visit our website or use our services.',
    ],
  },
  {
    title: '2. Information We Collect',
    body: [
      'We may collect:',
      'Contact information you provide, such as your name, email address, and phone number',
      'Information you submit through forms or when requesting a quote',
      'Payment information (processed securely by our payment provider)',
      'Usage data, such as pages visited, time spent on the site, and device information',
      'Cookies and similar tracking technologies',
    ],
  },
  {
    title: '3. How We Use Your Information',
    body: [
      'We use your information to:',
      'Respond to your inquiries and provide our services',
      'Process orders and payments',
      'Improve our website and services',
      'Send you updates or marketing communications (only if you have agreed)',
      'Comply with legal obligations',
    ],
  },
  {
    title: '4. Legal Basis for Processing',
    body: [
      'We process your information based on your consent, the need to perform a contract with you, our legitimate business interests, or legal requirements.',
    ],
  },
  {
    title: '5. Sharing Your Information',
    body: [
      'We do not sell your personal information. We may share your information with:',
      'Service providers who help us operate the website and deliver services',
      'Payment processors',
      'Legal authorities, when required by law',
    ],
  },
  {
    title: '6. Cookies and Tracking',
    body: [
      'We use cookies to improve your experience, analyze website traffic, and remember your preferences. You can control cookies through your browser settings.',
    ],
  },
  {
    title: '7. Data Retention',
    body: [
      'We keep your personal information only as long as necessary to provide our services and meet our legal obligations.',
    ],
  },
  {
    title: '8. Data Security',
    body: [
      'We take reasonable measures to protect your information from unauthorized access, loss, or misuse. However, no method of transmission over the internet is completely secure.',
    ],
  },
  {
    title: '9. Your Rights',
    body: [
      'Depending on your location, you may have the right to:',
      'Access the personal information we hold about you',
      'Request correction of inaccurate information',
      'Request deletion of your information',
      'Object to or restrict certain processing',
      'Withdraw your consent at any time',
      'To exercise any of these rights, contact us at sabummilton14@gmail.com.',
    ],
  },
  {
    title: '10. Children\u2019s Privacy',
    body: [
      'Our website is not intended for children under 13, and we do not knowingly collect personal information from children.',
    ],
  },
  {
    title: '11. International Transfers',
    body: [
      'Your information may be transferred to and processed in countries other than your own. We take steps to ensure your information is protected.',
    ],
  },
  {
    title: '12. Changes to This Policy',
    body: [
      'We may update this Privacy Policy from time to time. Changes take effect when posted on this page.',
    ],
  },
  {
    title: '13. Contact Us',
    body: [
      'If you have questions about this Privacy Policy, contact us at sabummilton14@gmail.com.',
    ],
  },
];

export default function Privacy({ onNavigate }: PrivacyProps) {
  return (
    <div className="min-h-screen bg-amazon-lightbg">
      <div className="bg-white border-b border-amazon-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
          <p className="text-xs text-amazon-subtle flex items-center gap-1">
            <button onClick={() => onNavigate('home')} className="hover:text-amazon-link">Home</button>
            <ChevronRight className="h-3 w-3" />
            <span className="text-amazon-text font-bold">Privacy Policy</span>
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-md border border-amazon-border amazon-card p-6 sm:p-10">
          <h1 className="text-2xl sm:text-3xl font-bold text-amazon-text">SiteSphere Privacy Policy</h1>
          <p className="mt-2 text-sm text-amazon-subtle">Last updated: 16 September 2026</p>

          <div className="mt-8 space-y-8">
            {sections.map((section) => (
              <section key={section.title}>
                <h2 className="text-lg font-bold text-amazon-text mb-3">{section.title}</h2>
                <ul className="space-y-2">
                  {section.body.map((line, i) => (
                    <li key={i} className="text-sm text-amazon-text leading-6">
                      {line}
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
