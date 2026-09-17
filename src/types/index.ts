export interface User {
  id: string;
  email: string;
  full_name: string;
  phone?: string;
  company_name?: string;
  created_at: string;
  updated_at: string;
}

export interface Subscription {
  id: string;
  user_id: string;
  plan_type: 'basic' | 'standard' | 'premium';
  status: 'active' | 'inactive' | 'cancelled';
  start_date: string;
  end_date?: string;
  auto_renew: boolean;
  created_at: string;
}

export interface SelectedService {
  id: string;
  user_id: string;
  service_name: string;
  service_type: 'web_development' | 'mobile_app' | 'portfolio' | 'consulting' | 'delivery';
  status: 'pending' | 'in_progress' | 'completed';
  created_at: string;
}

export interface PaymentHistory {
  id: string;
  user_id: string;
  amount: number;
  currency: string;
  payment_method: string;
  description: string;
  status: 'completed' | 'pending' | 'failed';
  transaction_date: string;
  created_at: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  type: string;
  price: string;
  features: string[];
  icon: string;
}

export interface PortfolioProject {
  id: string;
  title: string;
  description: string;
  category: string;
  imageUrl: string;
  demoUrl?: string;
  technologies: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  company: string;
  role: string;
  content: string;
  rating: number;
  imageUrl: string;
}

export interface MediaFile {
  fileid: string;
  file_name: string;
  file_url: string;
  size?: string;
  created_at?: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  price: number;
  interval: string;
  features: string[];
  popular?: boolean;
}
