import React, { useState } from 'react';
import { ShieldCheck, Truck, CreditCard, Banknote, Building2, CheckCircle2, ArrowLeft } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { CustomerAddress } from '../types';

const PAKISTAN_CITIES = [
  'Lahore',
  'Karachi',
  'Islamabad',
  'Rawalpindi',
  'Faisalabad',
  'Multan',
  'Peshawar',
  'Sialkot',
  'Gujranwala',
  'Quetta',
  'Hyderabad',
  'Bahawalpur',
  'Sargodha',
  'Abbottabad',
  'Other'
];

export const CheckoutPage: React.FC = () => {
  const {
    cart,
    cartSubtotal,
    shippingFee,
    discountAmount,
    cartTotal,
    appliedCoupon,
    placeOrder,
    currentUser,
    navigate,
    addToast
  } = useStore();

  const savedAddr = currentUser?.savedAddresses[0];

  const [formData, setFormData] = useState<CustomerAddress>({
    fullName: savedAddr?.fullName || currentUser?.fullName || '',
    email: savedAddr?.email || currentUser?.email || '',
    phone: savedAddr?.phone || currentUser?.phone || '',
    addressLine: savedAddr?.addressLine || '',
    apartment: savedAddr?.apartment || '',
    city: savedAddr?.city || 'Lahore',
    province: savedAddr?.province || 'Punjab',
    postalCode: savedAddr?.postalCode || '54000'
  });

  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'bank_transfer' | 'card_online'>('cod');
  const [deliveryNotes, setDeliveryNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  if (cart.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-xl font-bold font-display uppercase">No items to checkout</h2>
        <p className="text-xs text-stone-500">Your shopping bag is currently empty.</p>
        <button
          onClick={() => navigate('/shop')}
          className="px-6 py-2.5 bg-stone-900 text-white text-xs font-semibold uppercase tracking-wider"
        >
          Browse Collection
        </button>
      </div>
    );
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    // Basic Pakistan phone validation
    const cleanPhone = formData.phone.replace(/[^0-9]/g, '');
    if (cleanPhone.length < 10) {
      setErrorMessage('Please enter a valid Pakistani mobile number (e.g. 0300-1234567).');
      return;
    }

    if (!formData.addressLine.trim()) {
      setErrorMessage('Please provide a complete street address.');
      return;
    }

    setIsSubmitting(true);

    try {
      const createdOrder = placeOrder(formData, paymentMethod);
      navigate(`/order-confirmation/${createdOrder.id}`);
    } catch {
      setErrorMessage('An unexpected error occurred while placing your order. Please try again.');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Return to cart */}
      <div className="mb-6">
        <button
          onClick={() => navigate('/cart')}
          className="text-xs font-semibold text-stone-600 hover:text-black flex items-center gap-1.5"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Return to Shopping Bag</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
        {/* Left: Form Fields (7 cols) */}
        <div className="lg:col-span-7">
          <form onSubmit={handleSubmitOrder} className="space-y-8">
            
            {/* Step 1: Contact Information */}
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-stone-200 pb-3">
                <h2 className="text-xs uppercase font-bold tracking-widest text-stone-900 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-stone-900 text-white flex items-center justify-center text-[11px]">1</span>
                  Contact Information
                </h2>
                {!currentUser && (
                  <button
                    type="button"
                    onClick={() => navigate('/account')}
                    className="text-xs text-stone-600 hover:text-black underline underline-offset-2"
                  >
                    Have an account? Sign in
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block font-semibold uppercase tracking-wider text-stone-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="e.g. Asad Qureshi"
                    className="w-full border border-stone-300 p-2.5 bg-white text-stone-900 focus:outline-none focus:border-stone-900"
                  />
                </div>

                <div>
                  <label className="block font-semibold uppercase tracking-wider text-stone-700 mb-1">
                    Mobile Phone * (For Courier SMS & Call)
                  </label>
                  <input
                    type="tel"
                    required
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="0300-1234567"
                    className="w-full border border-stone-300 p-2.5 bg-white text-stone-900 focus:outline-none focus:border-stone-900 font-mono"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block font-semibold uppercase tracking-wider text-stone-700 mb-1">
                    Email Address * (For Order Confirmation & Receipt)
                  </label>
                  <input
                    type="email"
                    required
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="name@example.com"
                    className="w-full border border-stone-300 p-2.5 bg-white text-stone-900 focus:outline-none focus:border-stone-900"
                  />
                </div>
              </div>
            </div>

            {/* Step 2: Shipping Destination in Pakistan */}
            <div className="space-y-4">
              <div className="border-b border-stone-200 pb-3">
                <h2 className="text-xs uppercase font-bold tracking-widest text-stone-900 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-stone-900 text-white flex items-center justify-center text-[11px]">2</span>
                  Delivery Address in Pakistan
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="sm:col-span-2">
                  <label className="block font-semibold uppercase tracking-wider text-stone-700 mb-1">
                    House / Street / Flat / Sector *
                  </label>
                  <input
                    type="text"
                    required
                    name="addressLine"
                    value={formData.addressLine}
                    onChange={handleInputChange}
                    placeholder="e.g. House 42, Street 8, Sector Y, Phase 3, DHA"
                    className="w-full border border-stone-300 p-2.5 bg-white text-stone-900 focus:outline-none focus:border-stone-900"
                  />
                </div>

                <div>
                  <label className="block font-semibold uppercase tracking-wider text-stone-700 mb-1">
                    Apartment / Suite / Landmark (Optional)
                  </label>
                  <input
                    type="text"
                    name="apartment"
                    value={formData.apartment}
                    onChange={handleInputChange}
                    placeholder="e.g. Near Jalal Sons or Floor 2"
                    className="w-full border border-stone-300 p-2.5 bg-white text-stone-900 focus:outline-none focus:border-stone-900"
                  />
                </div>

                <div>
                  <label className="block font-semibold uppercase tracking-wider text-stone-700 mb-1">
                    City *
                  </label>
                  <select
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full border border-stone-300 p-2.5 bg-white text-stone-900 focus:outline-none focus:border-stone-900 cursor-pointer font-medium"
                  >
                    {PAKISTAN_CITIES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-semibold uppercase tracking-wider text-stone-700 mb-1">
                    Province *
                  </label>
                  <select
                    name="province"
                    value={formData.province}
                    onChange={handleInputChange}
                    className="w-full border border-stone-300 p-2.5 bg-white text-stone-900 focus:outline-none focus:border-stone-900 cursor-pointer font-medium"
                  >
                    <option value="Punjab">Punjab</option>
                    <option value="Sindh">Sindh</option>
                    <option value="Islamabad Capital Territory">Islamabad Capital Territory</option>
                    <option value="Khyber Pakhtunkhwa">Khyber Pakhtunkhwa</option>
                    <option value="Balochistan">Balochistan</option>
                    <option value="Azad Kashmir">Azad Kashmir</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold uppercase tracking-wider text-stone-700 mb-1">
                    Postal Code
                  </label>
                  <input
                    type="text"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleInputChange}
                    placeholder="e.g. 54000"
                    className="w-full border border-stone-300 p-2.5 bg-white text-stone-900 focus:outline-none focus:border-stone-900 font-mono"
                  />
                </div>
              </div>
            </div>

            {/* Delivery Method */}
            <div className="space-y-4">
              <div className="border-b border-stone-200 pb-3">
                <h2 className="text-xs uppercase font-bold tracking-widest text-stone-900 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-stone-900 text-white flex items-center justify-center text-[11px]">3</span>
                  Courier Service
                </h2>
              </div>

              <div className="p-4 border-2 border-stone-900 bg-stone-50 flex items-center justify-between text-xs">
                <div className="flex items-center gap-3">
                  <Truck className="w-5 h-5 text-stone-900" />
                  <div>
                    <h4 className="font-bold text-stone-900">Standard Express Courier (TCS / Leopards / Trax)</h4>
                    <p className="text-stone-500 text-[11px] mt-0.5">
                      Estimated 2–4 business days delivery with live SMS tracking.
                    </p>
                  </div>
                </div>
                <span className="font-mono font-bold text-stone-900">
                  {shippingFee === 0 ? 'FREE' : `PKR ${shippingFee}`}
                </span>
              </div>
            </div>

            {/* Payment Method */}
            <div className="space-y-4">
              <div className="border-b border-stone-200 pb-3">
                <h2 className="text-xs uppercase font-bold tracking-widest text-stone-900 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-stone-900 text-white flex items-center justify-center text-[11px]">4</span>
                  Payment Method
                </h2>
              </div>

              <div className="space-y-3 text-xs">
                {/* Option 1: Cash on Delivery */}
                <label
                  className={`flex items-start gap-3 p-4 border cursor-pointer transition-colors ${
                    paymentMethod === 'cod'
                      ? 'border-stone-950 bg-stone-50/80 shadow-xs'
                      : 'border-stone-200 hover:border-stone-400'
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'cod'}
                    onChange={() => setPaymentMethod('cod')}
                    className="mt-0.5 accent-stone-900"
                  />
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 font-bold text-stone-900">
                      <Banknote className="w-4 h-4" />
                      <span>Cash on Delivery (COD)</span>
                      <span className="text-[10px] px-2 py-0.5 bg-stone-900 text-white font-semibold">
                        Most Popular in Pakistan
                      </span>
                    </div>
                    <p className="text-stone-600 text-[11px]">
                      Pay the TCS / courier representative in cash when your parcel arrives at your doorstep.
                    </p>
                  </div>
                </label>

                {/* Option 2: Bank Transfer / Raast */}
                <label
                  className={`flex items-start gap-3 p-4 border cursor-pointer transition-colors ${
                    paymentMethod === 'bank_transfer'
                      ? 'border-stone-950 bg-stone-50/80 shadow-xs'
                      : 'border-stone-200 hover:border-stone-400'
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'bank_transfer'}
                    onChange={() => setPaymentMethod('bank_transfer')}
                    className="mt-0.5 accent-stone-900"
                  />
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center gap-2 font-bold text-stone-900">
                      <Building2 className="w-4 h-4" />
                      <span>Direct Bank Transfer / Raast Instant Pay</span>
                    </div>
                    <p className="text-stone-600 text-[11px]">
                      Transfer via any Pakistani banking app (HBL, Meezan, Alfalah, Nayapay, Sadapay) using Raast or IBAN.
                    </p>
                    {paymentMethod === 'bank_transfer' && (
                      <div className="mt-3 p-3 bg-white border border-stone-200 text-[11px] space-y-1 font-mono text-stone-800">
                        <p><strong>Bank:</strong> Bank Alfalah Limited (Main Gulberg, Lahore)</p>
                        <p><strong>Title:</strong> VALIANT APPAREL (PVT) LTD</p>
                        <p><strong>Account / IBAN:</strong> PK36ALFH0000000123456789</p>
                        <p><strong>Raast ID:</strong> 03008472911</p>
                      </div>
                    )}
                  </div>
                </label>

                {/* Option 3: Card Online */}
                <label
                  className={`flex items-start gap-3 p-4 border cursor-pointer transition-colors ${
                    paymentMethod === 'card_online'
                      ? 'border-stone-950 bg-stone-50/80 shadow-xs'
                      : 'border-stone-200 hover:border-stone-400'
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'card_online'}
                    onChange={() => setPaymentMethod('card_online')}
                    className="mt-0.5 accent-stone-900"
                  />
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 font-bold text-stone-900">
                      <CreditCard className="w-4 h-4" />
                      <span>Debit / Credit Card (Visa, MasterCard, PayFast)</span>
                    </div>
                    <p className="text-stone-600 text-[11px]">
                      Safe 3D-secure instant authorization with 128-bit encryption.
                    </p>
                  </div>
                </label>
              </div>
            </div>

            {/* Error Message */}
            {errorMessage && (
              <div className="p-3 bg-red-50 border border-red-200 text-xs text-red-700">
                {errorMessage}
              </div>
            )}

            {/* Place Order CTA */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-[#121212] text-white hover:bg-black text-xs font-bold uppercase tracking-widest shadow-lg transition-colors cursor-pointer flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <span>Processing Order...</span>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Place Order (PKR {cartTotal.toLocaleString()})</span>
                  </>
                )}
              </button>
              <p className="text-center text-[11px] text-stone-400 mt-2">
                By clicking Place Order, you confirm acceptance of our Shipping & 7-Day Exchange policy.
              </p>
            </div>
          </form>
        </div>

        {/* Right: Order Summary Sidebar (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-[#F8F8F6] p-6 border border-stone-200 space-y-5 sticky top-24">
            <h3 className="text-xs uppercase font-bold tracking-widest text-stone-900 border-b border-stone-200 pb-3">
              Order Summary ({cart.length} Items)
            </h3>

            {/* Item list */}
            <div className="divide-y divide-stone-200/80 max-h-80 overflow-y-auto pr-1">
              {cart.map((item) => (
                <div key={item.id} className="py-3 flex gap-3 text-xs">
                  <div className="relative w-14 h-18 bg-stone-100 shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    <span className="absolute -top-1.5 -right-1.5 bg-stone-900 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                      {item.quantity}
                    </span>
                  </div>
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="font-semibold text-stone-900 line-clamp-1">{item.name}</h4>
                      <p className="text-[11px] text-stone-500 mt-0.5">
                        {item.selectedColor} · {item.selectedSize}
                      </p>
                    </div>
                    <div className="font-mono font-bold text-stone-900 tabular-nums">
                      PKR {(item.price * item.quantity).toLocaleString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Price Calculations */}
            <div className="space-y-2 text-xs border-t border-stone-200 pt-3">
              <div className="flex justify-between text-stone-600">
                <span>Subtotal</span>
                <span className="font-mono text-stone-900 font-semibold tabular-nums">
                  PKR {cartSubtotal.toLocaleString()}
                </span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-700">
                  <span>Coupon ({appliedCoupon?.code})</span>
                  <span className="font-mono font-semibold tabular-nums">
                    -PKR {discountAmount.toLocaleString()}
                  </span>
                </div>
              )}
              <div className="flex justify-between text-stone-600">
                <span>Nationwide Shipping</span>
                <span className="font-mono text-stone-900 tabular-nums">
                  {shippingFee === 0 ? 'FREE' : `PKR ${shippingFee.toLocaleString()}`}
                </span>
              </div>
              <div className="flex justify-between text-base font-bold text-stone-950 pt-3 border-t border-stone-200">
                <span>Total Amount</span>
                <span className="font-mono tabular-nums">
                  PKR {cartTotal.toLocaleString()}
                </span>
              </div>
            </div>

            <div className="pt-2 text-[11px] text-stone-500 space-y-1.5">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-stone-800" />
                <span>Zero Risk: Inspect parcel before paying on delivery</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5 text-stone-800" />
                <span>Dispatches from Lahore central warehouse</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
