export interface CatalogItem {
  id: string;
  title: string;
  category: string;
  description: string;
  keywords: string[];
  page: string;
}

export const catalogCategories = [
  'Services',
  'Graphics',
  'Advertising',
  'Content Creation',
  'Products',
];

export const catalog: CatalogItem[] = [
  // Services
  {
    id: 'web-dev',
    title: 'Web Development',
    category: 'Services',
    description: 'Custom websites built with modern technologies. Responsive, fast, and SEO-optimized.',
    keywords: ['website', 'web', 'site', 'development', 'ecommerce', 'shop', 'online store', 'landing page'],
    page: 'services',
  },
  {
    id: 'mobile-app',
    title: 'Mobile App Development',
    category: 'Services',
    description: 'Native and cross-platform mobile apps for iOS and Android.',
    keywords: ['mobile', 'app', 'application', 'ios', 'android', 'phone', 'smartphone'],
    page: 'services',
  },
  {
    id: 'portfolio-sites',
    title: 'Portfolio Websites',
    category: 'Services',
    description: 'Professional portfolio websites that showcase your work beautifully.',
    keywords: ['portfolio', 'personal', 'freelancer', 'artist', 'resume', 'cv', 'showcase'],
    page: 'services',
  },
  {
    id: 'business-consulting',
    title: 'Business Management Consulting',
    category: 'Services',
    description: 'Expert guidance to start or grow your business, with strategy and execution support.',
    keywords: ['consulting', 'business', 'management', 'strategy', 'growth', 'coaching', 'advice', 'planning'],
    page: 'services',
  },
  {
    id: 'delivery-system',
    title: 'Delivery Management System',
    category: 'Services',
    description: 'Complete delivery management for logistics: track orders, manage drivers, optimize routes.',
    keywords: ['delivery', 'logistics', 'tracking', 'driver', 'route', 'shipping', 'courier', 'fleet'],
    page: 'services',
  },

  // Graphics
  {
    id: 'logo-design',
    title: 'Logo Design',
    category: 'Graphics',
    description: 'Distinctive, memorable logos that define your brand identity.',
    keywords: ['logo', 'brand', 'identity', 'mark', 'emblem', 'symbol', 'design'],
    page: 'services',
  },
  {
    id: 'brand-identity',
    title: 'Brand Identity & Guidelines',
    category: 'Graphics',
    description: 'Complete visual identity: colors, typography, and brand rules for consistency.',
    keywords: ['brand', 'identity', 'guidelines', 'colors', 'typography', 'visual', 'style guide'],
    page: 'services',
  },
  {
    id: 'print-design',
    title: 'Print & Marketing Materials',
    category: 'Graphics',
    description: 'Flyers, brochures, business cards, and posters designed to convert.',
    keywords: ['print', 'flyer', 'brochure', 'business card', 'poster', 'banner', 'billboard', 'menu'],
    page: 'services',
  },
  {
    id: 'social-media-graphics',
    title: 'Social Media Graphics',
    category: 'Graphics',
    description: 'Scroll-stopping visuals for Instagram, Facebook, and all your channels.',
    keywords: ['social media', 'graphics', 'instagram', 'facebook', 'post', 'story', 'banner', 'visual'],
    page: 'services',
  },

  // Advertising
  {
    id: 'digital-advertising',
    title: 'Digital Advertising Campaigns',
    category: 'Advertising',
    description: 'Targeted ad campaigns that reach the right audience and drive results.',
    keywords: ['advertising', 'ads', 'campaign', 'digital', 'marketing', 'promotion', 'google ads', 'facebook ads'],
    page: 'services',
  },
  {
    id: 'social-media-marketing',
    title: 'Social Media Marketing',
    category: 'Advertising',
    description: 'Grow your audience and engagement across every social platform.',
    keywords: ['social media', 'marketing', 'instagram', 'facebook', 'tiktok', 'audience', 'engagement', 'followers'],
    page: 'services',
  },
  {
    id: 'seo-services',
    title: 'SEO & Search Marketing',
    category: 'Advertising',
    description: 'Get found on Google and rank higher with proven search optimization.',
    keywords: ['seo', 'search', 'google', 'ranking', 'traffic', 'keywords', 'optimization', 'organic'],
    page: 'services',
  },
  {
    id: 'email-marketing',
    title: 'Email Marketing',
    category: 'Advertising',
    description: 'Newsletters and campaigns that keep your customers coming back.',
    keywords: ['email', 'newsletter', 'campaign', 'marketing', 'mail', 'subscribers', 'automation'],
    page: 'services',
  },

  // Content Creation
  {
    id: 'video-production',
    title: 'Video Production',
    category: 'Content Creation',
    description: 'Professional video content for ads, social media, and your website.',
    keywords: ['video', 'production', 'filming', 'editing', 'youtube', 'reels', 'commercial', 'motion'],
    page: 'services',
  },
  {
    id: 'photography',
    title: 'Photography',
    category: 'Content Creation',
    description: 'High-quality product and brand photography that sells.',
    keywords: ['photography', 'photo', 'product', 'shoot', 'camera', 'images', 'pictures'],
    page: 'services',
  },
  {
    id: 'copywriting',
    title: 'Copywriting & Scripts',
    category: 'Content Creation',
    description: 'Words that persuade: website copy, ads, and video scripts.',
    keywords: ['copywriting', 'writing', 'copy', 'script', 'content', 'text', 'words', 'article', 'blog'],
    page: 'services',
  },
  {
    id: 'content-strategy',
    title: 'Content Strategy & Management',
    category: 'Content Creation',
    description: 'A full content plan and calendar to keep your brand consistent.',
    keywords: ['content', 'strategy', 'management', 'calendar', 'planning', 'social media', 'scheduling'],
    page: 'services',
  },

  // Products
  {
    id: 'starter-kit',
    title: 'SiteSphere Starter Kit',
    category: 'Products',
    description: 'A ready-made website template to launch your business fast.',
    keywords: ['starter', 'kit', 'template', 'website', 'ready', 'launch', 'quick'],
    page: 'pricing',
  },
  {
    id: 'brand-pack',
    title: 'Complete Brand Identity Pack',
    category: 'Products',
    description: 'Logo, colors, fonts, and guidelines delivered as one package.',
    keywords: ['brand', 'identity', 'pack', 'logo', 'colors', 'fonts', 'package', 'bundle'],
    page: 'pricing',
  },
  {
    id: 'content-pack',
    title: 'Monthly Content Pack',
    category: 'Products',
    description: 'A month of ready-to-post graphics and captions for your business.',
    keywords: ['content', 'pack', 'monthly', 'graphics', 'captions', 'social media', 'posts'],
    page: 'pricing',
  },
  {
    id: 'ecommerce-solution',
    title: 'E-Commerce Solution',
    category: 'Products',
    description: 'A complete online store with payments and inventory built in.',
    keywords: ['ecommerce', 'store', 'shop', 'online', 'payments', 'cart', 'checkout', 'products'],
    page: 'pricing',
  },
];
