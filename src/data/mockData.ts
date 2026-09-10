import { Service, PortfolioProject, Testimonial, PricingPlan } from '../types';

export const services: Service[] = [
  {
    id: '1',
    title: 'Web Development',
    description: 'Custom websites built with modern technologies. Responsive, fast, and SEO-optimized solutions tailored to your business needs.',
    type: 'web_development',
    price: 'Starting at 50,000XAF',
    features: [
      'Responsive Design',
      'SEO Optimization',
      'Content Management System',
      'E-commerce Integration',
      'Analytics Dashboard',
      '6 Months Support'
    ],
    icon: 'Code'
  },
  {
    id: '2',
    title: 'Mobile App Development',
    description: 'Native and cross-platform mobile applications for iOS and Android. Seamless user experience with cutting-edge features.',
    type: 'mobile_app',
    price: 'Starting at 100,000XAF',
    features: [
      'iOS & Android Development',
      'Push Notifications',
      'Offline Functionality',
      'Cloud Integration',
      'App Store Submission',
      '1 Year Support'
    ],
    icon: 'Smartphone'
  },
  {
    id: '3',
    title: 'Portfolio Websites',
    description: 'Professional portfolio websites that showcase your work beautifully. Perfect for freelancers, artists, and professionals.',
    type: 'portfolio',
    price: 'Starting at 25,000XAF',
    features: [
      'Modern Design',
      'Project Galleries',
      'Contact Forms',
      'Blog Integration',
      'Social Media Links',
      '3 Months Support'
    ],
    icon: 'Briefcase'
  },
  {
    id: '4',
    title: 'Business Management Consulting',
    description: 'Expert guidance for salary earners looking to start or grow their side business. Strategic planning and execution support.',
    type: 'consulting',
    price: 'Depends on type, size, location of business',
    features: [
      'Business Strategy',
      'Financial Planning',
      'Market Analysis',
      'Growth Strategies',
      'One-on-One Sessions',
      'Ongoing Support'
    ],
    icon: 'TrendingUp'
  },
  {
    id: '5',
    title: 'Delivery Management System',
    description: 'Complete delivery management solutions for logistics companies. Track orders, manage drivers, and optimize routes.',
    type: 'delivery',
    price: 'Base on product, business and other factors',
    features: [
      'Real-time Tracking',
      'Driver Management',
      'Route Optimization',
      'Customer Portal',
      'Analytics & Reports',
      '9 Months Support'
    ],
    icon: 'Package'
  }
];

export const portfolioProjects: PortfolioProject[] = [
  {
    id: '1',
    title: 'E-Commerce Fashion Store',
    description: 'A fully functional online fashion store with product catalog, shopping cart, and secure checkout. Integrated with payment gateways and inventory management.',
    category: 'Web Development',
    imageUrl: 'https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg?auto=compress&cs=tinysrgb&w=800',
    demoUrl: 'https://example.com',
    technologies: ['React', 'Node.js', 'Stripe', 'MongoDB']
  },
  {
    id: '2',
    title: 'Food Delivery Mobile App',
    description: 'Cross-platform mobile app for food delivery with real-time order tracking, payment integration, and restaurant management dashboard.',
    category: 'Mobile App',
    imageUrl: 'https://images.pexels.com/photos/4393021/pexels-photo-4393021.jpeg?auto=compress&cs=tinysrgb&w=800',
    technologies: ['React Native', 'Firebase', 'Google Maps API']
  },
  {
    id: '3',
    title: 'Creative Agency Portfolio',
    description: 'Stunning portfolio website for a creative agency showcasing their work with beautiful animations and smooth transitions.',
    category: 'Portfolio',
    imageUrl: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=800',
    demoUrl: 'https://example.com',
    technologies: ['Next.js', 'Tailwind CSS', 'Framer Motion']
  },
  {
    id: '4',
    title: 'Real Estate Platform',
    description: 'Comprehensive real estate platform with property listings, advanced search filters, virtual tours, and agent management.',
    category: 'Web Development',
    imageUrl: 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=800',
    demoUrl: 'https://example.com',
    technologies: ['Vue.js', 'Laravel', 'PostgreSQL']
  },
  {
    id: '5',
    title: 'Fitness Tracking App',
    description: 'Mobile fitness app with workout plans, progress tracking, nutrition guides, and social features to connect with other users.',
    category: 'Mobile App',
    imageUrl: 'https://images.pexels.com/photos/4162491/pexels-photo-4162491.jpeg?auto=compress&cs=tinysrgb&w=800',
    technologies: ['Flutter', 'Firebase', 'HealthKit']
  },
  {
    id: '6',
    title: 'Restaurant Management System',
    description: 'Complete restaurant management system with table reservations, menu management, order processing, and staff scheduling.',
    category: 'Web Development',
    imageUrl: 'https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=800',
    technologies: ['React', 'Express', 'MySQL', 'Socket.io']
  }
];

export const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    company: 'Elegant Designs Co.',
    role: 'CEO',
    content: 'SiteSphere transformed our online presence completely. Their team delivered a stunning website that increased our conversions by 150%. Highly professional and responsive throughout the entire process.',
    rating: 5,
    imageUrl: 'https://images.pexels.com/photos/8312669/pexels-photo-8312669.jpeg?auto=compress&cs=tinysrgb&w=200'
  },
  {
    id: '2',
    name: 'Michael Chen',
    company: 'TechStart Solutions',
    role: 'Founder',
    content: 'The mobile app they developed for us exceeded all expectations. User-friendly interface, smooth performance, and delivered on time. Our customer engagement has tripled since launch!',
    rating: 5,
    imageUrl: 'https://images.pexels.com/photos/13392786/pexels-photo-13392786.png?auto=compress&cs=tinysrgb&w=200'
  },
  {
    id: '3',
    name: 'Emily Rodriguez',
    company: 'Creative Arts Studio',
    role: 'Art Director',
    content: 'My portfolio website is absolutely beautiful! SiteSphere understood my vision perfectly and brought it to life. I have received so many compliments and new client inquiries.',
    rating: 5,
    imageUrl: 'https://images.pexels.com/photos/7717254/pexels-photo-7717254.jpeg?auto=compress&cs=tinysrgb&w=200'
  },
  {
    id: '4',
    name: 'David Thompson',
    company: 'Quick Delivery Services',
    role: 'Operations Manager',
    content: 'The delivery management system has revolutionized our operations. Real-time tracking and route optimization saved us 30% in operational costs. Outstanding work!',
    rating: 5,
    imageUrl: 'https://images.pexels.com/photos/35681211/pexels-photo-35681211.jpeg?auto=compress&cs=tinysrgb&w=200'
  },
  {
    id: '5',
    name: 'Lisa Martinez',
    company: 'Fashion Forward Boutique',
    role: 'Owner',
    content: 'SiteSphere built our e-commerce platform and the results have been amazing. Sales have increased by 200% in just three months. Their ongoing support is exceptional.',
    rating: 5,
    imageUrl: 'https://images.pexels.com/photos/1820559/pexels-photo-1820559.jpeg?auto=compress&cs=tinysrgb&w=200'
  },
  {
    id: '6',
    name: 'James Wilson',
    company: 'StartUp Ventures',
    role: 'Entrepreneur',
    content: 'The business consulting services helped me launch my side business while keeping my full-time job. Their strategic guidance was invaluable. Now I am my own boss!',
    rating: 5,
    imageUrl: 'https://images.pexels.com/photos/31422830/pexels-photo-31422830.png?auto=compress&cs=tinysrgb&w=200'
  }
];

export const pricingPlans: PricingPlan[] = [
  {
    id: '1',
    name: 'Basic',
    price: 150000,
    interval: 'month',
    features: [
      'Up to 5 pages website',
      'Mobile responsive design',
      'Basic SEO optimization',
      'Contact form integration',
      'Social media links',
      '3 months support',
      'Monthly maintenance'
    ]
  },
  {
    id: '2',
    name: 'Standard',
    price: 300000,
    interval: 'month',
    popular: true,
    features: [
      'Up to 15 pages website',
      'Advanced responsive design',
      'Advanced SEO optimization',
      'E-commerce integration',
      'Blog system',
      'Analytics dashboard',
      '6 months support',
      'Priority maintenance',
      'Content management system'
    ]
  },
  {
    id: '3',
    name: 'Premium',
    price: 650000,
    interval: 'month',
    features: [
      'Unlimited pages',
      'Custom design & development',
      'Complete SEO package',
      'Advanced e-commerce features',
      'Mobile app integration',
      'Custom features development',
      'Real-time analytics',
      '12 months support',
      '24/7 priority support',
      'Dedicated account manager',
      'Monthly performance reports'
    ]
  }
];
