import { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Services from './pages/Services';
import Portfolio from './pages/Portfolio';
import Testimonials from './pages/Testimonials';
import Pricing from './pages/Pricing';
import Investors from './pages/Investors';
import Contact from './pages/Contact';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Signup from './pages/Signup';

function AppContent() {
  const [currentPage, setCurrentPage] = useState('home');
  const { user, loading } = useAuth();

  useEffect(() => {
    if (currentPage === 'dashboard' && !loading && !user) {
      setCurrentPage('login');
    }
  }, [currentPage, user, loading]);

  const renderPage = () => {
    if (loading) {
      return (
        <div className="min-h-screen bg-amazon-lightbg flex items-center justify-center">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-amazon-orange border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
            <p className="text-sm text-amazon-subtle">Loading...</p>
          </div>
        </div>
      );
    }

    switch (currentPage) {
      case 'home':
        return <Home onNavigate={setCurrentPage} />;
      case 'services':
        return <Services onNavigate={setCurrentPage} />;
      case 'portfolio':
        return <Portfolio onNavigate={setCurrentPage} />;
      case 'testimonials':
        return <Testimonials onNavigate={setCurrentPage} />;
      case 'pricing':
        return <Pricing onNavigate={setCurrentPage} />;
      case 'investors':
        return <Investors onNavigate={setCurrentPage} />;
      case 'contact':
        return <Contact onNavigate={setCurrentPage} />;
      case 'dashboard':
        return user ? (
          <Dashboard onNavigate={setCurrentPage} />
        ) : (
          <Login onNavigate={setCurrentPage} />
        );
      case 'login':
        return <Login onNavigate={setCurrentPage} />;
      case 'signup':
        return <Signup onNavigate={setCurrentPage} />;
      default:
        return <Home onNavigate={setCurrentPage} />;
    }
  };

  const shouldShowHeaderFooter = currentPage !== 'login' && currentPage !== 'signup';

  return (
    <div className="min-h-screen flex flex-col">
      {shouldShowHeaderFooter && (
        <Header currentPage={currentPage} onNavigate={setCurrentPage} />
      )}
      <main className="flex-grow">{renderPage()}</main>
      {shouldShowHeaderFooter && <Footer onNavigate={setCurrentPage} />}
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
