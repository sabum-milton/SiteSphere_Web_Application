import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import { LogOut, CreditCard, Package, Calendar, Check, Clock, User, Shield } from 'lucide-react';
import { Subscription, SelectedService, PaymentHistory } from '../types';

interface DashboardProps {
  onNavigate: (page: string) => void;
}

export default function Dashboard({ onNavigate }: DashboardProps) {
  const { user, signOut } = useAuth();
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [services, setServices] = useState<SelectedService[]>([]);
  const [payments, setPayments] = useState<PaymentHistory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { if (user) loadDashboardData(); }, [user]);

  const loadDashboardData = async () => {
    if (!user) return;
    const [sub, svc, pay] = await Promise.all([
      supabase.from('subscriptions').select('*').eq('user_id', user.id).eq('status', 'active').maybeSingle(),
      supabase.from('selected_services').select('*').eq('user_id', user.id),
      supabase.from('payment_history').select('*').eq('user_id', user.id).order('transaction_date', { ascending: false }).limit(5),
    ]);
    if (sub.data) setSubscription(sub.data);
    if (svc.data) setServices(svc.data);
    if (pay.data) setPayments(pay.data);
    setLoading(false);
  };

  const handleSignOut = async () => { await signOut(); onNavigate('home'); };

  if (loading) {
    return (
      <div className="min-h-screen bg-amazon-lightbg flex items-center justify-center">
        <div className="text-center"><div className="w-12 h-12 border-4 border-amazon-orange border-t-transparent rounded-full animate-spin mx-auto mb-3"></div><p className="text-sm text-amazon-subtle">Loading your dashboard...</p></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-amazon-lightbg">
      <div className="bg-amazon-midblue text-white px-4 sm:px-6 lg:px-8 py-6">
        <div className="max-w-7xl mx-auto flex justify-between items-start">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold">Welcome back, {user?.full_name}!</h1>
            <p className="mt-1 text-sm text-gray-300">Manage your services, subscriptions, and account settings</p>
          </div>
          <button onClick={handleSignOut} className="bg-white/10 hover:bg-white/20 border border-white/30 text-white px-4 py-2 rounded-md text-sm font-bold transition flex items-center gap-2"><LogOut className="h-4 w-4" />Sign Out</button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6 py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {[
            { icon: Package, value: services.length, label: 'Active Services', bg: 'bg-blue-50', text: 'text-blue-700' },
            { icon: Check, value: services.filter((s) => s.status === 'completed').length, label: 'Completed Projects', bg: 'bg-green-50', text: 'text-green-700' },
            { icon: Clock, value: services.filter((s) => s.status === 'in_progress').length, label: 'In Progress', bg: 'bg-yellow-50', text: 'text-yellow-700' },
          ].map((stat) => (
            <div key={stat.label} className="bg-white rounded-md border border-amazon-border p-5 amazon-card">
              <div className="flex items-center justify-between mb-3">
                <div className={`flex h-10 w-10 items-center justify-center rounded-md ${stat.bg}`}><stat.icon className={`h-5 w-5 ${stat.text}`} /></div>
                <span className="text-2xl font-bold text-amazon-text">{stat.value}</span>
              </div>
              <p className="text-sm text-amazon-subtle font-medium">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-white rounded-md border border-amazon-border p-6 amazon-card">
              <h2 className="text-lg font-bold text-amazon-text mb-4">Your Services</h2>
              {services.length === 0 ? (
                <div className="text-center py-8"><Package className="h-12 w-12 text-gray-300 mx-auto mb-3" /><p className="text-sm text-amazon-subtle mb-4">You haven't selected any services yet</p><button onClick={() => onNavigate('services')} className="bg-amazon-orange hover:bg-amazon-orangehover text-amazon-dark px-5 py-2 rounded-md font-bold text-sm transition">Browse Services</button></div>
              ) : (
                <div className="space-y-3">
                  {services.map((s) => (
                    <div key={s.id} className="border border-amazon-border rounded-md p-4 hover:border-amazon-orange transition">
                      <div className="flex items-center justify-between">
                        <div><h3 className="text-sm font-bold text-amazon-text">{s.service_name}</h3><p className="text-xs text-amazon-subtle mt-0.5">Added on {new Date(s.created_at).toLocaleDateString()}</p></div>
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${s.status === 'completed' ? 'bg-green-100 text-green-700' : s.status === 'in_progress' ? 'bg-yellow-100 text-yellow-700' : 'bg-blue-100 text-blue-700'}`}>{s.status.replace('_', ' ').toUpperCase()}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="bg-white rounded-md border border-amazon-border p-6 amazon-card">
              <h2 className="text-lg font-bold text-amazon-text mb-4">Payment History</h2>
              {payments.length === 0 ? (
                <div className="text-center py-8"><CreditCard className="h-12 w-12 text-gray-300 mx-auto mb-3" /><p className="text-sm text-amazon-subtle">No payment history yet</p></div>
              ) : (
                <div className="space-y-3">
                  {payments.map((p) => (
                    <div key={p.id} className="flex items-center justify-between border-b border-gray-100 pb-3 last:border-0">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-md bg-green-50"><CreditCard className="h-4 w-4 text-green-600" /></div>
                        <div><h3 className="text-sm font-bold text-amazon-text">{p.description}</h3><p className="text-xs text-amazon-subtle">{new Date(p.transaction_date).toLocaleDateString()}</p></div>
                      </div>
                      <div className="text-right"><p className="text-sm font-bold text-amazon-text">${p.amount}</p><p className="text-xs text-amazon-subtle">{p.payment_method}</p></div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-white rounded-md border border-amazon-border p-6 amazon-card">
              <div className="flex items-center gap-3 mb-4"><div className="flex h-10 w-10 items-center justify-center rounded-md bg-amazon-lightbg border border-amazon-border"><User className="h-5 w-5 text-amazon-dark" /></div><h2 className="text-base font-bold text-amazon-text">Profile</h2></div>
              <div className="space-y-3">
                <div><p className="text-xs text-amazon-subtle">Name</p><p className="text-sm font-bold text-amazon-text">{user?.full_name}</p></div>
                <div><p className="text-xs text-amazon-subtle">Email</p><p className="text-sm font-bold text-amazon-text">{user?.email}</p></div>
                {user?.phone && <div><p className="text-xs text-amazon-subtle">Phone</p><p className="text-sm font-bold text-amazon-text">{user.phone}</p></div>}
                {user?.company_name && <div><p className="text-xs text-amazon-subtle">Company</p><p className="text-sm font-bold text-amazon-text">{user.company_name}</p></div>}
              </div>
            </div>

            <div className="bg-white rounded-md border border-amazon-border p-6 amazon-card">
              <div className="flex items-center gap-3 mb-4"><div className="flex h-10 w-10 items-center justify-center rounded-md bg-amazon-lightbg border border-amazon-border"><Shield className="h-5 w-5 text-amazon-dark" /></div><h2 className="text-base font-bold text-amazon-text">Subscription</h2></div>
              {subscription ? (
                <div className="space-y-3">
                  <div><p className="text-xs text-amazon-subtle">Current Plan</p><p className="text-sm font-bold text-amazon-text capitalize">{subscription.plan_type}</p></div>
                  <div><p className="text-xs text-amazon-subtle">Status</p><span className="inline-block bg-green-100 text-green-700 px-3 py-0.5 rounded-full text-xs font-bold">Active</span></div>
                  <div><p className="text-xs text-amazon-subtle">Started</p><p className="text-sm font-bold text-amazon-text flex items-center gap-1"><Calendar className="h-3 w-3" />{new Date(subscription.start_date).toLocaleDateString()}</p></div>
                  <button onClick={() => onNavigate('pricing')} className="w-full bg-gray-100 hover:bg-gray-200 text-amazon-text py-2 rounded-md font-bold text-sm border border-amazon-border transition">Change Plan</button>
                </div>
              ) : (
                <div className="text-center py-4"><p className="text-sm text-amazon-subtle mb-4">No active subscription</p><button onClick={() => onNavigate('pricing')} className="bg-amazon-orange hover:bg-amazon-orangehover text-amazon-dark px-5 py-2 rounded-md font-bold text-sm transition">View Plans</button></div>
              )}
            </div>

            <div className="bg-amazon-midblue rounded-md p-6 text-white">
              <h3 className="text-base font-bold mb-2">Need Help?</h3><p className="text-sm text-gray-300 mb-4">Our support team is available 24/7 to assist you.</p>
              <button onClick={() => onNavigate('contact')} className="w-full bg-white text-amazon-dark py-2.5 rounded-md font-bold text-sm hover:bg-gray-100 transition">Contact Support</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
