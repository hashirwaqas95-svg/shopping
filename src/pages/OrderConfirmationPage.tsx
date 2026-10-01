import React from 'react';
import { CheckCircle2, Truck, Package, Clock, ArrowRight, Printer } from 'lucide-react';
import { useStore } from '../context/StoreContext';

interface OrderConfirmationPageProps {
  orderId: string;
}

export const OrderConfirmationPage: React.FC<OrderConfirmationPageProps> = ({ orderId }) => {
  const { getOrderById, navigate } = useStore();

  const order = getOrderById(orderId);

  if (!order) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-xl font-bold font-display uppercase">Order Not Found</h2>
        <p className="text-xs text-stone-500">
          We could not locate details for order ID <strong>{orderId}</strong>.
        </p>
        <button
          onClick={() => navigate('/shop')}
          className="px-6 py-2.5 bg-stone-900 text-white text-xs font-semibold uppercase tracking-wider"
        >
          Return to Store
        </button>
      </div>
    );
  }

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      {/* Header Banner */}
      <div className="bg-white border border-stone-200 p-8 sm:p-10 text-center space-y-4 shadow-xs">
        <div className="w-14 h-14 bg-emerald-50 rounded-full flex items-center justify-center mx-auto text-emerald-600">
          <CheckCircle2 className="w-8 h-8 stroke-[2]" />
        </div>

        <div>
          <span className="text-xs uppercase font-bold tracking-[0.25em] text-emerald-700">
            Order Confirmed & Logged
          </span>
          <h1 className="text-2xl sm:text-4xl font-bold font-display text-stone-950 mt-1">
            Thank you for your order!
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 mt-2 max-w-lg mx-auto leading-relaxed">
            We have received your order <strong>#{order.id}</strong>. A confirmation SMS & email have been dispatched to <strong>{order.customer.phone}</strong>.
          </p>
        </div>

        {/* Tracking Highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-stone-100 text-left text-xs">
          <div className="p-3 bg-stone-50 border border-stone-200/60">
            <span className="text-[10px] text-stone-400 uppercase tracking-wider font-semibold block">
              Order Reference
            </span>
            <span className="font-mono font-bold text-stone-900 text-sm mt-0.5 block">
              #{order.id}
            </span>
          </div>

          <div className="p-3 bg-stone-50 border border-stone-200/60">
            <span className="text-[10px] text-stone-400 uppercase tracking-wider font-semibold block">
              Estimated Delivery
            </span>
            <span className="font-semibold text-stone-900 text-xs mt-0.5 block">
              2 to 4 Business Days
            </span>
          </div>

          <div className="p-3 bg-stone-50 border border-stone-200/60">
            <span className="text-[10px] text-stone-400 uppercase tracking-wider font-semibold block">
              Courier Service
            </span>
            <span className="font-semibold text-stone-900 text-xs mt-0.5 block">
              {order.courierPartner || 'TCS Express Pakistan'}
            </span>
          </div>
        </div>
      </div>

      {/* Details breakdown */}
      <div className="mt-8 bg-white border border-stone-200 divide-y divide-stone-200 shadow-xs">
        
        {/* Customer & Address Details */}
        <div className="p-6 sm:p-8 grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
          <div>
            <h3 className="uppercase font-bold tracking-wider text-stone-900 mb-2">
              Delivery Address
            </h3>
            <div className="text-stone-600 space-y-1">
              <p className="font-semibold text-stone-900">{order.customer.fullName}</p>
              <p>{order.customer.addressLine}</p>
              {order.customer.apartment && <p>{order.customer.apartment}</p>}
              <p>
                {order.customer.city}, {order.customer.province} {order.customer.postalCode}
              </p>
              <p>Pakistan</p>
              <p className="pt-1 font-mono">{order.customer.phone}</p>
            </div>
          </div>

          <div>
            <h3 className="uppercase font-bold tracking-wider text-stone-900 mb-2">
              Payment Information
            </h3>
            <div className="text-stone-600 space-y-1">
              <p>
                <strong>Method:</strong>{' '}
                {order.paymentMethod === 'cod'
                  ? 'Cash on Delivery (Pay upon delivery)'
                  : order.paymentMethod === 'bank_transfer'
                  ? 'Direct Bank Transfer / Raast'
                  : 'Online Debit/Credit Card'}
              </p>
              <p>
                <strong>Status:</strong>{' '}
                <span className="uppercase text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5">
                  {order.paymentStatus}
                </span>
              </p>
              <p>
                <strong>Order Status:</strong>{' '}
                <span className="uppercase text-[11px] font-semibold text-stone-800 bg-stone-100 px-2 py-0.5">
                  {order.status}
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* Itemized Receipt Table */}
        <div className="p-6 sm:p-8">
          <h3 className="uppercase font-bold tracking-wider text-xs text-stone-900 mb-4">
            Items Ordered
          </h3>
          <div className="divide-y divide-stone-100">
            {order.items.map((item, i) => (
              <div key={i} className="py-3 flex items-center justify-between text-xs">
                <div className="flex items-center gap-3">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-12 h-14 object-cover bg-stone-100"
                  />
                  <div>
                    <h4 className="font-semibold text-stone-900">{item.name}</h4>
                    <p className="text-[11px] text-stone-500">
                      Color: {item.color} · Size: {item.size} · Qty: {item.quantity}
                    </p>
                  </div>
                </div>
                <span className="font-mono font-bold text-stone-900 tabular-nums">
                  PKR {(item.price * item.quantity).toLocaleString()}
                </span>
              </div>
            ))}
          </div>

          {/* Totals */}
          <div className="mt-6 border-t border-stone-200 pt-4 space-y-1.5 text-xs text-stone-600 max-w-xs ml-auto">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-mono tabular-nums text-stone-900">
                PKR {order.subtotal.toLocaleString()}
              </span>
            </div>
            {order.discountAmount > 0 && (
              <div className="flex justify-between text-emerald-700">
                <span>Discount ({order.couponCode})</span>
                <span className="font-mono tabular-nums">
                  -PKR {order.discountAmount.toLocaleString()}
                </span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Courier Delivery</span>
              <span className="font-mono tabular-nums text-stone-900">
                {order.shippingFee === 0 ? 'FREE' : `PKR ${order.shippingFee}`}
              </span>
            </div>
            <div className="flex justify-between text-sm font-bold text-stone-950 pt-2 border-t border-stone-200">
              <span>Total Paid / Due</span>
              <span className="font-mono tabular-nums">
                PKR {order.total.toLocaleString()}
              </span>
            </div>
          </div>
        </div>

      </div>

      {/* Actions */}
      <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
        <button
          onClick={handlePrint}
          className="px-4 py-2.5 border border-stone-300 text-stone-700 hover:text-black hover:border-black text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <Printer className="w-4 h-4" />
          <span>Print Receipt</span>
        </button>

        <div className="flex gap-3">
          <button
            onClick={() => navigate('/account')}
            className="px-6 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-900 text-xs font-bold uppercase tracking-wider transition-colors"
          >
            View in My Orders
          </button>
          <button
            onClick={() => navigate('/shop')}
            className="px-6 py-2.5 bg-stone-900 hover:bg-black text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer shadow-sm"
          >
            <span>Continue Shopping</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
