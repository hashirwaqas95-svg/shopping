import React, { useState } from 'react';
import { ArrowRight, ShieldCheck, Truck, RefreshCw, Lock, Check } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const Footer: React.FC = () => {
  const { navigate, addToast, setIsAdminMode, isAdminMode } = useStore();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      addToast('Please enter a valid email address.', 'error');
      return;
    }
    setSubscribed(true);
    addToast('Welcome to VALIANT! Use promo code FIRST10 for 10% off.');
  };

  return (
    <footer className="bg-[#111111] text-[#E0E0E0] border-t border-stone-800">
      {/* 4 Feature Value Pillars */}
      <div className="border-b border-stone-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
            <div className="flex items-start gap-3.5">
              <div className="p-2.5 bg-stone-900 border border-stone-800 text-stone-200">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs uppercase font-bold tracking-wider text-white">
                  Premium Quality
                </h4>
                <p className="text-[11px] text-stone-400 mt-0.5 leading-relaxed">
                  100% combed cottons, French flax, and fine European knits.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="p-2.5 bg-stone-900 border border-stone-800 text-stone-200">
                <Truck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs uppercase font-bold tracking-wider text-white">
                  Fast Delivery
                </h4>
                <p className="text-[11px] text-stone-400 mt-0.5 leading-relaxed">
                  2-4 days nationwide delivery via TCS, Leopards & Trax.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="p-2.5 bg-stone-900 border border-stone-800 text-stone-200">
                <RefreshCw className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs uppercase font-bold tracking-wider text-white">
                  Easy Exchange
                </h4>
                <p className="text-[11px] text-stone-400 mt-0.5 leading-relaxed">
                  Hassle-free 7-day doorstep size and product exchanges.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="p-2.5 bg-stone-900 border border-stone-800 text-stone-200">
                <Lock className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs uppercase font-bold tracking-wider text-white">
                  Secure Payments
                </h4>
                <p className="text-[11px] text-stone-400 mt-0.5 leading-relaxed">
                  Cash on Delivery (COD), Raast instant pay & online cards.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <span className="font-display text-2xl font-bold tracking-[0.2em] text-white block">
              VALIANT
            </span>
            <p className="text-xs text-stone-400 max-w-sm leading-relaxed">
              An independent menswear atelier born in Pakistan. Engineered for the modern gentleman with a relentless focus on fabric weight, durable seams, tailored silhouettes, and everyday luxury.
            </p>
            <div className="text-xs text-stone-400 space-y-1 pt-1">
              <p>📍 Flagship Studio: Sector G, Gulberg III, Lahore, Pakistan</p>
              <p>📞 Helpline: +92 42 3578 9000 (Mon - Sat, 10 AM - 8 PM)</p>
              <p>✉️ Inquiries: concierge@valiantmenswear.pk</p>
            </div>
          </div>

          {/* Shop Column */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase font-bold tracking-wider text-white">
              Collections
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <button onClick={() => navigate('/shirts')} className="hover:text-white transition-colors">
                  Casual & Formal Shirts
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/t-shirts')} className="hover:text-white transition-colors">
                  Oversized T-Shirts (280 GSM)
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/polos')} className="hover:text-white transition-colors">
                  Mercerized Pique Polos
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/shop?filter=new')} className="hover:text-white transition-colors">
                  New Arrivals
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/shop?filter=bestseller')} className="hover:text-white transition-colors">
                  Best Sellers
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/shop')} className="hover:text-white transition-colors">
                  Shop Entire Catalog
                </button>
              </li>
            </ul>
          </div>

          {/* Customer Care Column */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase font-bold tracking-wider text-white">
              Customer Support
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <button onClick={() => navigate('/account')} className="hover:text-white transition-colors">
                  Track My Order
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/shipping-policy')} className="hover:text-white transition-colors">
                  Shipping & Delivery
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/returns-exchange-policy')} className="hover:text-white transition-colors">
                  7-Day Returns & Exchange
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/faq')} className="hover:text-white transition-colors">
                  Frequently Asked Questions
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/contact')} className="hover:text-white transition-colors">
                  Contact Support
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setIsAdminMode(!isAdminMode);
                    navigate('/admin');
                  }}
                  className="text-amber-400 hover:text-amber-300 font-semibold transition-colors"
                >
                  Admin Management Portal
                </button>
              </li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase font-bold tracking-wider text-white">
              Newsletter
            </h4>
            <p className="text-xs text-stone-400 leading-relaxed">
              Get 10% off your first order plus early access to seasonal lookbook drops.
            </p>

            {subscribed ? (
              <div className="p-3 bg-stone-900 border border-stone-800 text-xs text-emerald-400 space-y-1">
                <div className="flex items-center gap-1.5 font-semibold">
                  <Check className="w-4 h-4" />
                  <span>You're on the VIP list</span>
                </div>
                <p className="text-stone-300 text-[11px]">
                  Use promo code <span className="font-mono text-white font-bold">FIRST10</span> at checkout for 10% off!
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="flex">
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-stone-900 border border-stone-800 text-xs px-3 py-2 text-white placeholder:text-stone-500 focus:outline-none focus:border-stone-500"
                  />
                  <button
                    type="submit"
                    className="px-3 bg-white text-black hover:bg-stone-200 transition-colors shrink-0 flex items-center justify-center cursor-pointer"
                    aria-label="Subscribe"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
                <span className="text-[10px] text-stone-500 block">
                  Strictly no spam. Unsubscribe at any time.
                </span>
              </form>
            )}
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-stone-800 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <p>© {new Date().getFullYear()} VALIANT MENSWEAR PAKISTAN. All Rights Reserved.</p>
          
          <div className="flex flex-wrap items-center gap-4 text-stone-400">
            <button onClick={() => navigate('/privacy-policy')} className="hover:text-white">
              Privacy Policy
            </button>
            <button onClick={() => navigate('/terms')} className="hover:text-white">
              Terms & Conditions
            </button>
            <button onClick={() => navigate('/shipping-policy')} className="hover:text-white">
              Shipping Policy
            </button>
            <button onClick={() => navigate('/returns-exchange-policy')} className="hover:text-white">
              Exchange Policy
            </button>
          </div>

          <div className="flex items-center gap-2 text-[10px] text-stone-400">
            <span className="px-2 py-0.5 bg-stone-900 border border-stone-800">CASH ON DELIVERY</span>
            <span className="px-2 py-0.5 bg-stone-900 border border-stone-800">RAAST</span>
            <span className="px-2 py-0.5 bg-stone-900 border border-stone-800">1BILL</span>
            <span className="px-2 py-0.5 bg-stone-900 border border-stone-800">VISA / MC</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
