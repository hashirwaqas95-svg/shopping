import React, { useState } from 'react';
import { Search, Heart, ShoppingBag, User, Menu, X, ShieldCheck } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const Navbar: React.FC = () => {
  const {
    currentPath,
    navigate,
    cartCount,
    wishlist,
    openCartDrawer,
    openSearch,
    isAdminMode,
    setIsAdminMode
  } = useStore();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Shop All', path: '/shop' },
    { label: 'Shirts', path: '/shirts' },
    { label: 'T-Shirts', path: '/t-shirts' },
    { label: 'Polos', path: '/polos' },
    { label: 'New Arrivals', path: '/shop?filter=new' },
    { label: 'Best Sellers', path: '/shop?filter=bestseller' },
  ];

  const handleLinkClick = (path: string) => {
    navigate(path);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#EAEAEA] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        
        {/* Mobile menu button & Brand */}
        <div className="flex items-center gap-3 md:gap-0">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-stone-800 hover:text-black focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          {/* Zone 1: Brand Wordmark (Single text element in display face) */}
          <button
            onClick={() => handleLinkClick('/')}
            className="text-left group cursor-pointer focus:outline-none"
          >
            <span className="font-display text-xl sm:text-2xl font-bold tracking-[0.2em] text-[#121212] uppercase block">
              VALIANT
            </span>
          </button>
        </div>

        {/* Zone 2: Navigation Links (Clean text with subtle hover underlines) */}
        <nav className="hidden lg:flex items-center gap-8 text-[13px] font-medium tracking-wide uppercase text-stone-600">
          {navLinks.map((link) => {
            const isActive = currentPath === link.path;
            return (
              <button
                key={link.label}
                onClick={() => handleLinkClick(link.path)}
                className={`relative py-1 transition-colors hover:text-black cursor-pointer ${
                  isActive ? 'text-black font-semibold' : ''
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#121212]" />
                )}
              </button>
            );
          })}
          
          <div className="flex items-center gap-5 text-stone-400 text-xs pl-2 border-l border-stone-200">
            <button
              onClick={() => handleLinkClick('/about')}
              className="hover:text-black transition-colors"
            >
              About
            </button>
            <button
              onClick={() => handleLinkClick('/contact')}
              className="hover:text-black transition-colors"
            >
              Contact
            </button>
          </div>
        </nav>

        {/* Zone 3: Primary Actions (Search, Wishlist, Bag, Account, Admin Mode) */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Admin toggle shortcut */}
          <button
            onClick={() => setIsAdminMode(!isAdminMode)}
            className={`hidden sm:flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-medium tracking-wider uppercase rounded transition-colors ${
              isAdminMode
                ? 'bg-amber-100 text-amber-900 border border-amber-300'
                : 'text-stone-400 hover:text-stone-700 hover:bg-stone-100'
            }`}
            title="Toggle Store Admin Management Dashboard"
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Admin</span>
          </button>

          {/* Search Button */}
          <button
            onClick={openSearch}
            className="p-2 text-stone-700 hover:text-black hover:bg-stone-50 rounded-full transition-colors cursor-pointer"
            aria-label="Search clothing"
          >
            <Search className="w-5 h-5 stroke-[1.75]" />
          </button>

          {/* Customer Account */}
          <button
            onClick={() => handleLinkClick('/account')}
            className="p-2 text-stone-700 hover:text-black hover:bg-stone-50 rounded-full transition-colors cursor-pointer hidden sm:block"
            aria-label="My Account"
          >
            <User className="w-5 h-5 stroke-[1.75]" />
          </button>

          {/* Wishlist */}
          <button
            onClick={() => handleLinkClick('/wishlist')}
            className="relative p-2 text-stone-700 hover:text-black hover:bg-stone-50 rounded-full transition-colors cursor-pointer"
            aria-label="Wishlist"
          >
            <Heart className="w-5 h-5 stroke-[1.75]" />
            {wishlist.length > 0 && (
              <span className="absolute top-1 right-1 bg-stone-900 text-white text-[10px] font-medium w-4 h-4 rounded-full flex items-center justify-center tabular-nums">
                {wishlist.length}
              </span>
            )}
          </button>

          {/* Shopping Bag Button */}
          <button
            onClick={openCartDrawer}
            className="relative p-2 text-stone-900 hover:bg-stone-50 rounded-full transition-colors cursor-pointer"
            aria-label="Shopping bag"
          >
            <ShoppingBag className="w-5 h-5 stroke-[1.75]" />
            {cartCount > 0 && (
              <span className="absolute top-1 right-1 bg-[#121212] text-white text-[10px] font-semibold w-4 h-4 rounded-full flex items-center justify-center tabular-nums">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile drawer navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-stone-200 bg-white px-6 py-6 space-y-6 shadow-xl animate-in slide-in-from-top duration-200">
          <div className="flex flex-col space-y-3.5 text-sm uppercase tracking-wider font-medium text-stone-800">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleLinkClick(link.path)}
                className="text-left py-1 hover:text-black"
              >
                {link.label}
              </button>
            ))}
            <div className="pt-3 border-t border-stone-100 flex flex-col space-y-2 text-stone-500 text-xs">
              <button onClick={() => handleLinkClick('/about')} className="text-left py-1 hover:text-black">
                About The Brand
              </button>
              <button onClick={() => handleLinkClick('/contact')} className="text-left py-1 hover:text-black">
                Customer Support & Stores
              </button>
              <button onClick={() => handleLinkClick('/account')} className="text-left py-1 hover:text-black">
                My Account / Orders
              </button>
              <button onClick={() => handleLinkClick('/faq')} className="text-left py-1 hover:text-black">
                Delivery & FAQs
              </button>
              <button
                onClick={() => {
                  setIsAdminMode(!isAdminMode);
                  setMobileMenuOpen(false);
                  navigate('/admin');
                }}
                className="text-left py-1 text-amber-700 font-semibold flex items-center gap-1.5"
              >
                <ShieldCheck className="w-4 h-4" />
                Store Admin Portal
              </button>
            </div>
          </div>

          <div className="pt-4 border-t border-stone-200 text-xs text-stone-400 flex justify-between items-center">
            <span>Currency: PKR (Pakistani Rupee)</span>
            <span>Delivery: Nationwide</span>
          </div>
        </div>
      )}
    </header>
  );
};
