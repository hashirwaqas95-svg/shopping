import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';
import { useStore } from '../context/StoreContext';

interface FAQItem {
  q: string;
  a: string;
}

const FAQS: FAQItem[] = [
  {
    q: 'How long does delivery take across Pakistan?',
    a: 'Orders shipped to major metropolitan cities (Lahore, Karachi, Islamabad, Rawalpindi) typically arrive in 2 to 3 business days. Deliveries to second-tier cities and remote districts take 3 to 4 business days via our courier partners (TCS Express, Leopards Courier, and Trax Logistics).'
  },
  {
    q: 'Do you offer Cash on Delivery (COD)?',
    a: 'Yes! Cash on Delivery is available for all domestic orders across Pakistan with zero additional surcharge or handling fee. You simply hand cash to the courier representative when your parcel is delivered.'
  },
  {
    q: 'How can I track my shipment?',
    a: 'Once your order is processed and handed over to the courier, an SMS and email notification containing your official tracking number (e.g. TCS-98402194) is sent immediately. You can also view live status updates anytime in your "My Account > Orders" section.'
  },
  {
    q: 'What is your return & exchange policy?',
    a: 'We operate a straightforward 7-Day Hassle-Free Exchange Policy. If an item doesn’t fit or you wish to swap colors, contact us via WhatsApp or email within 7 days of receiving your parcel. We will arrange a doorstep exchange where the courier hands you the new size and picks up the previous unworn garment.'
  },
  {
    q: 'How do I choose the correct size for shirts and oversized tees?',
    a: 'We provide an accurate Size Guide for all our garments with measurements in both inches and centimeters. For our shirts and polos, order your true standard high-street size. For our 280 GSM Oversized T-shirts, the cut is intentionally relaxed and boxy; order your true size for the intended designer drape, or choose one size down for a more standard fit.'
  },
  {
    q: 'Can I cancel or modify my order after placing it?',
    a: 'Yes, orders can be amended or cancelled free of charge before they are handed over to the courier dispatch team (usually within 4 hours of order placement). Simply call or message our helpline at +92 42 3578 9000.'
  },
  {
    q: 'Do you deliver across all regions of Pakistan?',
    a: 'Yes, we provide nationwide delivery to all cities, tehsils, and rural districts serviced by Pakistan’s primary postal and courier networks, including Punjab, Sindh, KPK, Balochistan, Gilgit-Baltistan, and Azad Kashmir.'
  },
  {
    q: 'How do I contact customer support?',
    a: 'Our customer concierge is available Monday to Saturday, 10:00 AM to 8:00 PM PKT. You can reach us by phone at +92 42 3578 9000, via WhatsApp, or through email at concierge@valiantmenswear.pk.'
  }
];

export const FAQPage: React.FC = () => {
  const { navigate } = useStore();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      <div className="text-center max-w-xl mx-auto mb-12 space-y-2">
        <span className="text-xs uppercase font-bold tracking-[0.2em] text-stone-400">
          Support & Queries
        </span>
        <h1 className="text-2xl sm:text-4xl font-bold font-display text-stone-900">
          Frequently Asked Questions
        </h1>
        <p className="text-xs sm:text-sm text-stone-500">
          Everything you need to know about deliveries, cash on delivery, exchanges, and fabric care.
        </p>
      </div>

      <div className="bg-white border border-stone-200 divide-y divide-stone-200 shadow-xs">
        {FAQS.map((faq, i) => {
          const isOpen = openIndex === i;
          return (
            <div key={i} className="p-5 sm:p-6 transition-colors">
              <button
                onClick={() => toggle(i)}
                className="w-full flex items-center justify-between text-left text-sm font-bold text-stone-900 focus:outline-none cursor-pointer"
              >
                <span className="pr-4">{faq.q}</span>
                {isOpen ? (
                  <ChevronUp className="w-4 h-4 text-stone-900 shrink-0" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-stone-400 shrink-0" />
                )}
              </button>
              {isOpen && (
                <p className="mt-3 text-xs sm:text-sm text-stone-600 leading-relaxed animate-in fade-in duration-150">
                  {faq.a}
                </p>
              )}
            </div>
          );
        })}
      </div>

      {/* Still need help CTA */}
      <div className="mt-12 p-8 bg-stone-50 border border-stone-200 text-center space-y-3">
        <h3 className="text-sm uppercase font-bold tracking-wider text-stone-900">
          Have a Question Not Listed Here?
        </h3>
        <p className="text-xs text-stone-500 max-w-sm mx-auto">
          Our Lahore-based concierge team is happy to answer any questions regarding fabric weights, collar cuts, or delivery timeframes.
        </p>
        <button
          onClick={() => navigate('/contact')}
          className="mt-2 px-6 py-2.5 bg-stone-900 text-white text-xs font-bold uppercase tracking-wider hover:bg-black transition-colors"
        >
          Contact Customer Care
        </button>
      </div>
    </div>
  );
};
