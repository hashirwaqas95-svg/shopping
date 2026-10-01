import React, { useState } from 'react';
import { Phone, Mail, Clock, MapPin, MessageSquare, CheckCircle2 } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const ContactPage: React.FC = () => {
  const { addToast } = useStore();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'Order Inquiry',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    addToast('Thank you for reaching out! A customer concierge representative will contact you within 4 hours.');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16">
      <div className="text-center max-w-xl mx-auto mb-12 space-y-2">
        <span className="text-xs uppercase font-bold tracking-[0.2em] text-stone-400">
          Client Concierge
        </span>
        <h1 className="text-2xl sm:text-4xl font-bold font-display text-stone-900">
          Contact Customer Care
        </h1>
        <p className="text-xs sm:text-sm text-stone-500 leading-relaxed">
          Questions regarding sizes, styling, bulk orders, or shipment tracking? Our concierge team is at your service.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
        
        {/* Contact Form (7 cols) */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-10 border border-stone-200 shadow-xs">
          {submitted ? (
            <div className="py-16 text-center space-y-4">
              <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold font-display text-stone-900 uppercase">
                Message Sent Successfully
              </h3>
              <p className="text-xs text-stone-500 max-w-sm mx-auto">
                Thank you for contacting VALIANT. We have received your message and will respond via phone/email shortly.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-3 px-6 py-2.5 bg-stone-900 text-white text-xs font-semibold uppercase tracking-wider"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block uppercase tracking-wider font-semibold text-stone-700 mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Bilal Farooqi"
                    className="w-full border border-stone-300 p-2.5 bg-white text-stone-900 focus:outline-none focus:border-stone-900"
                  />
                </div>

                <div>
                  <label className="block uppercase tracking-wider font-semibold text-stone-700 mb-1">
                    Mobile Phone *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="0300-1234567"
                    className="w-full border border-stone-300 p-2.5 bg-white text-stone-900 focus:outline-none focus:border-stone-900 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block uppercase tracking-wider font-semibold text-stone-700 mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="name@example.com"
                  className="w-full border border-stone-300 p-2.5 bg-white text-stone-900 focus:outline-none focus:border-stone-900"
                />
              </div>

              <div>
                <label className="block uppercase tracking-wider font-semibold text-stone-700 mb-1">
                  Subject
                </label>
                <select
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full border border-stone-300 p-2.5 bg-white text-stone-900 focus:outline-none focus:border-stone-900 cursor-pointer"
                >
                  <option value="Order Inquiry">Order Inquiry & Courier Tracking</option>
                  <option value="Size Consultation">Size & Fit Consultation</option>
                  <option value="Exchange Request">7-Day Doorstep Exchange Request</option>
                  <option value="Wholesale">Corporate & Bulk Gifting</option>
                  <option value="Other">General Feedback</option>
                </select>
              </div>

              <div>
                <label className="block uppercase tracking-wider font-semibold text-stone-700 mb-1">
                  Message *
                </label>
                <textarea
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Provide your order ID if applicable or describe your inquiry..."
                  className="w-full border border-stone-300 p-2.5 bg-white text-stone-900 focus:outline-none focus:border-stone-900"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-[#121212] text-white hover:bg-black text-xs font-bold uppercase tracking-widest transition-colors cursor-pointer shadow-xs"
              >
                Send Message to Concierge
              </button>
            </form>
          )}
        </div>

        {/* Studio Info & Map Placeholder (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-[#F8F8F6] p-6 sm:p-8 border border-stone-200 space-y-6 text-xs">
            <h3 className="text-xs uppercase font-bold tracking-widest text-stone-900 border-b border-stone-200 pb-3">
              Direct Contact Channels
            </h3>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-stone-900 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-stone-900">Flagship Studio & Head Office</h4>
                  <p className="text-stone-600 mt-0.5 leading-relaxed">
                    Plot 18, Block G, Main Boulevard, Gulberg III, Lahore, 54660, Pakistan.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-stone-900 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-stone-900">Phone Support & WhatsApp</h4>
                  <p className="text-stone-600 mt-0.5 font-mono">
                    +92 42 3578 9000 / +92 300 8472911
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-stone-900 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-stone-900">Official Email</h4>
                  <p className="text-stone-600 mt-0.5 font-mono">
                    concierge@valiantmenswear.pk
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-stone-900 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-stone-900">Operating Hours</h4>
                  <p className="text-stone-600 mt-0.5">
                    Monday to Saturday: 10:00 AM – 8:00 PM PKT
                  </p>
                  <p className="text-stone-400 text-[11px]">Sunday: Closed</p>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Map Placeholder */}
          <div className="border border-stone-200 overflow-hidden bg-stone-100 relative aspect-[16/9] flex items-center justify-center">
            <div className="absolute inset-0 bg-[#E8E8E4] flex flex-col items-center justify-center p-6 text-center">
              <MapPin className="w-8 h-8 text-stone-900 mb-2 animate-bounce" />
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-900">
                VALIANT Atelier Studio
              </h4>
              <p className="text-[11px] text-stone-600 mt-0.5">
                Gulberg III, Lahore, Punjab, Pakistan
              </p>
              <span className="mt-2 text-[10px] uppercase font-bold text-stone-500 bg-white px-2 py-0.5 border border-stone-300">
                In-Store Fittings by Appointment
              </span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
