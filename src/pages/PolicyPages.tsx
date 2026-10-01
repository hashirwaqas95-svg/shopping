import React, { useState } from 'react';

interface PolicyPagesProps {
  initialTab?: 'shipping' | 'returns' | 'privacy' | 'terms';
}

export const PolicyPages: React.FC<PolicyPagesProps> = ({ initialTab = 'shipping' }) => {
  const [activeTab, setActiveTab] = useState<'shipping' | 'returns' | 'privacy' | 'terms'>(initialTab);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      {/* Header */}
      <div className="border-b border-stone-200 pb-5 mb-8">
        <span className="text-xs uppercase font-bold tracking-[0.2em] text-stone-400">
          Store Governance
        </span>
        <h1 className="text-2xl sm:text-4xl font-bold font-display text-stone-900 mt-1">
          Policies & Terms
        </h1>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-stone-200 mb-8 overflow-x-auto pb-1 text-xs uppercase font-bold tracking-wider">
        <button
          onClick={() => setActiveTab('shipping')}
          className={`py-2 px-4 transition-colors ${
            activeTab === 'shipping'
              ? 'border-b-2 border-stone-900 text-stone-950 font-bold'
              : 'text-stone-400 hover:text-stone-900'
          }`}
        >
          Shipping Policy
        </button>
        <button
          onClick={() => setActiveTab('returns')}
          className={`py-2 px-4 transition-colors ${
            activeTab === 'returns'
              ? 'border-b-2 border-stone-900 text-stone-950 font-bold'
              : 'text-stone-400 hover:text-stone-900'
          }`}
        >
          Return & Exchange
        </button>
        <button
          onClick={() => setActiveTab('privacy')}
          className={`py-2 px-4 transition-colors ${
            activeTab === 'privacy'
              ? 'border-b-2 border-stone-900 text-stone-950 font-bold'
              : 'text-stone-400 hover:text-stone-900'
          }`}
        >
          Privacy Policy
        </button>
        <button
          onClick={() => setActiveTab('terms')}
          className={`py-2 px-4 transition-colors ${
            activeTab === 'terms'
              ? 'border-b-2 border-stone-900 text-stone-950 font-bold'
              : 'text-stone-400 hover:text-stone-900'
          }`}
        >
          Terms & Conditions
        </button>
      </div>

      {/* Policy Content */}
      <div className="bg-white border border-stone-200 p-6 sm:p-10 shadow-xs text-xs sm:text-sm text-stone-700 leading-relaxed space-y-6">
        {activeTab === 'shipping' && (
          <div className="space-y-4">
            <h2 className="text-lg font-bold uppercase tracking-wider text-stone-900 font-display">
              Nationwide Delivery & Shipping Policy
            </h2>
            <p>
              VALIANT delivers to all residential and commercial addresses across Pakistan. All orders are inspected, packaged in custom protective dust-resistant poly-sleeves, and dispatched directly from our central fulfillment facility in Lahore, Punjab.
            </p>
            <h3 className="text-sm font-bold text-stone-900 pt-2">1. Delivery Timeframes</h3>
            <ul className="list-disc list-inside space-y-1.5 pl-2 text-stone-600">
              <li><strong>Lahore & Environs:</strong> 1 to 2 business days.</li>
              <li><strong>Karachi, Islamabad, Rawalpindi, Faisalabad:</strong> 2 to 3 business days.</li>
              <li><strong>Rest of Pakistan:</strong> 3 to 4 business days.</li>
            </ul>
            <h3 className="text-sm font-bold text-stone-900 pt-2">2. Delivery Charges</h3>
            <p>
              We provide <strong>FREE Nationwide Delivery</strong> on all orders totaling PKR 3,000 or above. For orders under PKR 3,000, a nominal flat rate of PKR 250 is applied across Pakistan.
            </p>
            <h3 className="text-sm font-bold text-stone-900 pt-2">3. Cash on Delivery (COD)</h3>
            <p>
              Cash on delivery is offered at no extra fee. Our courier partners (TCS, Leopards, Trax) will request exact cash payment before handing over the parcel.
            </p>
          </div>
        )}

        {activeTab === 'returns' && (
          <div className="space-y-4">
            <h2 className="text-lg font-bold uppercase tracking-wider text-stone-900 font-display">
              7-Day Doorstep Exchange Policy
            </h2>
            <p>
              We want you to love your fit. If a shirt or T-shirt does not fit to your exact satisfaction, we offer a hassle-free 7-day exchange window from the date of receipt.
            </p>
            <h3 className="text-sm font-bold text-stone-900 pt-2">Eligibility for Exchange</h3>
            <ul className="list-disc list-inside space-y-1.5 pl-2 text-stone-600">
              <li>Garments must be unworn, unwashed, and in their original packaging with tags attached.</li>
              <li>Items with perfume scent, makeup marks, or signs of wear will not be eligible.</li>
              <li>Sale and promotional items may be exchanged for a different size subject to availability.</li>
            </ul>
            <h3 className="text-sm font-bold text-stone-900 pt-2">How the Exchange Works</h3>
            <p>
              Simply send a WhatsApp message to <strong>+92 300 8472911</strong> with your Order ID and requested size. We will book a reverse parcel pick-up with the courier at your address.
            </p>
          </div>
        )}

        {activeTab === 'privacy' && (
          <div className="space-y-4">
            <h2 className="text-lg font-bold uppercase tracking-wider text-stone-900 font-display">
              Privacy & Customer Data Protection
            </h2>
            <p>
              VALIANT Menswear values your privacy. We collect minimal customer information strictly required for shipping courier operations, delivery SMS notifications, and customer concierge inquiries.
            </p>
            <h3 className="text-sm font-bold text-stone-900 pt-2">Data We Collect</h3>
            <p>
              Name, delivery street address, phone number, and email address. We do not sell, rent, or trade customer contact records to third-party marketing brokers.
            </p>
            <h3 className="text-sm font-bold text-stone-900 pt-2">Payment Security</h3>
            <p>
              We do not store your credit card or bank credentials on our servers. All electronic transactions are processed via PCI-DSS compliant payment gateways.
            </p>
          </div>
        )}

        {activeTab === 'terms' && (
          <div className="space-y-4">
            <h2 className="text-lg font-bold uppercase tracking-wider text-stone-900 font-display">
              Terms & Conditions of Service
            </h2>
            <p>
              By purchasing or browsing on the VALIANT online storefront, you agree to our standard terms of purchase, fabric care recommendations, and dispute resolution guidelines governed under the laws of the Islamic Republic of Pakistan.
            </p>
            <h3 className="text-sm font-bold text-stone-900 pt-2">Product Availability & Pricing</h3>
            <p>
              All prices are listed in Pakistani Rupees (PKR) and are inclusive of standard local taxes. In the rare event an item is out of stock after order submission, our concierge team will notify you immediately for a refund or alternate selection.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
