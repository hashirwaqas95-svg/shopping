import React from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { AnnouncementBar } from './components/AnnouncementBar';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { SearchModal } from './components/SearchModal';
import { ProductQuickView } from './components/ProductQuickView';
import { SizeGuideModal } from './components/SizeGuideModal';
import { ToastContainer } from './components/ToastContainer';
import { SeoManager } from './components/SeoManager';

// Pages
import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { OrderConfirmationPage } from './pages/OrderConfirmationPage';
import { WishlistPage } from './pages/WishlistPage';
import { AccountPage } from './pages/AccountPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { FAQPage } from './pages/FAQPage';
import { PolicyPages } from './pages/PolicyPages';
import { AdminDashboard } from './pages/AdminDashboard';

const AppContent: React.FC = () => {
  const { currentPath, isAdminMode } = useStore();

  const renderCurrentView = () => {
    // Admin View
    if (isAdminMode || currentPath === '/admin') {
      return <AdminDashboard />;
    }

    // Specific Product Detail View
    if (currentPath.startsWith('/product/')) {
      const slug = currentPath.replace('/product/', '').split('?')[0];
      return <ProductDetailPage slug={slug} />;
    }

    // Specific Order Confirmation View
    if (currentPath.startsWith('/order-confirmation/')) {
      const orderId = currentPath.replace('/order-confirmation/', '').split('?')[0];
      return <OrderConfirmationPage orderId={orderId} />;
    }

    // Category Routes
    if (currentPath === '/shirts') {
      return <ShopPage initialCategory="shirts" />;
    }
    if (currentPath === '/t-shirts') {
      return <ShopPage initialCategory="t-shirts" />;
    }
    if (currentPath === '/polos') {
      return <ShopPage initialCategory="polos" />;
    }

    // Shop Catalog
    if (currentPath === '/shop' || currentPath.startsWith('/shop?')) {
      return <ShopPage initialCategory="all" />;
    }

    // Cart & Checkout
    if (currentPath === '/cart') {
      return <CartPage />;
    }
    if (currentPath === '/checkout') {
      return <CheckoutPage />;
    }

    // Wishlist & Account
    if (currentPath === '/wishlist') {
      return <WishlistPage />;
    }
    if (currentPath === '/account') {
      return <AccountPage />;
    }

    // Information & Brand Pages
    if (currentPath === '/about') {
      return <AboutPage />;
    }
    if (currentPath === '/contact') {
      return <ContactPage />;
    }
    if (currentPath === '/faq') {
      return <FAQPage />;
    }
    if (currentPath === '/shipping-policy') {
      return <PolicyPages initialTab="shipping" />;
    }
    if (currentPath === '/returns-exchange-policy') {
      return <PolicyPages initialTab="returns" />;
    }
    if (currentPath === '/privacy-policy') {
      return <PolicyPages initialTab="privacy" />;
    }
    if (currentPath === '/terms') {
      return <PolicyPages initialTab="terms" />;
    }

    // Default Home Page
    return <HomePage />;
  };

  const isCheckout = currentPath === '/checkout';
  const isAdmin = isAdminMode || currentPath === '/admin';

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAFA] text-[#121212]">
      <SeoManager />
      
      {!isAdmin && (
        <>
          <AnnouncementBar />
          <Navbar />
        </>
      )}

      <main className="flex-1">
        {renderCurrentView()}
      </main>

      {!isAdmin && !isCheckout && <Footer />}

      {/* Global Modals & Drawers */}
      <CartDrawer />
      <SearchModal />
      <ProductQuickView />
      <SizeGuideModal />
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <StoreProvider>
      <AppContent />
    </StoreProvider>
  );
}
