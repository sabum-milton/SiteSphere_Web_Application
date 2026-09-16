import { ChevronRight } from 'lucide-react';

interface TermsProps {
  onNavigate: (page: string) => void;
}

const sections: { title: string; body: string[] }[] = [
  {
    title: '1. Introduction',
    body: [
      'These Terms and Conditions ("Terms") govern your use of the SiteSphere website application and the services and products we offer. By accessing or using our website, you agree to be bound by these Terms. If you do not agree, please do not use our Web Application.',
    ],
  },
  {
    title: '2. About SiteSphere',
    body: [
      'SiteSphere is a digital solutions building enterprise. We provide websites, mobile applications, portfolio websites, full-time business management, graphic design, advertising and marketing services for businesses, content creation, and digital products.',
    ],
  },
  {
    title: '3. Our Services',
    body: [
      'We offer the following, which may be updated from time to time:',
      'Website and web application development',
      'Full time business management',
      'Portfolio for private individuals',
      'Graphic design and branding',
      'Advertising and marketing services',
      'Content creation for businesses',
      'Digital products and other offerings',
      'We reserve the right to modify, add, or discontinue any service or product at any time.',
    ],
  },
  {
    title: '4. Use of the Website',
    body: [
      'You agree to use this website only for lawful purposes. You must not:',
      'Use the website in any way that breaks any applicable law or regulation',
      'Attempt to gain unauthorized access to any part of the website',
      'Interfere with the website\u2019s normal operation',
      'Use the website to send unsolicited or harmful material',
    ],
  },
  {
    title: '5. Intellectual Property',
    body: [
      'All content on this website \u2014 including designs, graphics, logos, text, images, and other materials \u2014 is owned by SiteSphere or its licensors and is protected by intellectual property laws. You may not copy, reproduce, distribute, or use our content for commercial purposes without our written permission.',
    ],
  },
  {
    title: '6. Client-Provided Content',
    body: [
      'If you provide us with content (such as logos, text, images, or information) for a project, you confirm that you have the right to use that content and that it does not infringe the rights of any third party.',
    ],
  },
  {
    title: '7. Orders, Payments, and Pricing',
    body: [
      'Prices for services and products are shown on the website and may change at any time.',
      'Payment terms will be communicated before work begins or at the point of purchase.',
      'All payments must be made in full unless we agree otherwise in writing.',
    ],
  },
  {
    title: '8. Refunds and Cancellations',
    body: [
      'We do make refunds in case we don\u2019t appreciate the services we offered to you, but we will do our best to ensure that does not occur. Refunds are available within 14 days of purchase if the service has not yet been started. Once work has begun, refunds are issued at our discretion.',
    ],
  },
  {
    title: '9. Acceptable Use',
    body: [
      'You agree not to use our services to create content that is unlawful, defamatory, obscene, hateful, or that infringes the rights of others.',
    ],
  },
  {
    title: '10. Third-Party Links',
    body: [
      'Our website may contain links to third-party websites. We are not responsible for the content, policies, or practices of those websites.',
    ],
  },
  {
    title: '11. Disclaimer of Warranties',
    body: [
      'Our website and services are provided "as is" and "as available." We do not guarantee that the website will always be available, error-free, or secure.',
    ],
  },
  {
    title: '12. Limitation of Liability',
    body: [
      'To the fullest extent permitted by law, SiteSphere shall not be liable for any indirect, incidental, or consequential damages arising from your use of the website or services.',
    ],
  },
  {
    title: '13. Indemnification',
    body: [
      'You agree to indemnify and hold SiteSphere harmless from any claims, damages, or expenses arising from your misuse of the website or your breach of these Terms.',
    ],
  },
  {
    title: '14. Termination',
    body: [
      'We may suspend or terminate your access to the website at any time if you breach these Terms.',
    ],
  },
  {
    title: '15. Changes to These Terms',
    body: [
      'We may update these Terms from time to time. Changes take effect when posted on this page. Continued use of the website after changes means you accept the updated Terms.',
    ],
  },
  {
    title: '16. Governing Law',
    body: [
      'These Terms are governed by the laws of Cameroon.',
    ],
  },
  {
    title: '17. Contact Us',
    body: [
      'If you have questions about these Terms, contact us at sabummilton14@gmail.com.',
    ],
  },
];

export default function Terms({ onNavigate }: TermsProps) {
  return (
    <div className="min-h-screen bg-amazon-lightbg">
      <div className="bg-white border-b border-amazon-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
          <p className="text-xs text-amazon-subtle flex items-center gap-1">
            <button onClick={() => onNavigate('home')} className="hover:text-amazon-link">Home</button>
            <ChevronRight className="h-3 w-3" />
            <span className="text-amazon-text font-bold">Terms &amp; Conditions</span>
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-md border border-amazon-border amazon-card p-6 sm:p-10">
          <h1 className="text-2xl sm:text-3xl font-bold text-amazon-text">SiteSphere Terms and Conditions</h1>
          <p className="mt-2 text-sm text-amazon-subtle">Last updated: Wednesday, 16 September 2026</p>

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
