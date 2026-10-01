import React, { useState } from 'react';
import { Trash2, ArrowRight, ShieldCheck, Tag, ShoppingBag, ArrowLeft } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const CartPage: React.FC = () => {
  const {
    cart,
    cartCount,
    cartSubtotal,
    shippingFee,
    discountAmount,
    cartTotal,
    removeFromCart,
    updateQuantity,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    freeShippingThreshold,
    navigate
  } = useStore();

  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState('');

  const freeShippingProgress = Math.min(100, Math.round((cartSubtotal / freeShippingThreshold) * 100));
  const amountNeeded = Math.max(0, freeShippingThreshold - cartSubtotal);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError('');
    if (!couponInput.trim()) return;
    const res = applyCoupon(couponInput);
    if (!res.success) {
      setCouponError(res.message);
    } else {
      setCouponInput('');
    }
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-24 text-center space-y-4">
        <ShoppingBag className="w-16 h-16 text-stone-300 mx-auto stroke-[1.2]" />
        <h1 className="text-2xl font-bold font-display uppercase tracking-wider text-stone-900">
          Your Shopping Bag is Empty
        </h1>
        <p className="text-sm text-stone-500 max-w-sm mx-auto">
          You haven't added any items to your bag yet. Explore our latest shirts, heavyweight tees, and pique polos.
        </p>
        <button
          onClick={() => navigate('/shop')}
          className="mt-4 px-8 py-3.5 bg-stone-900 text-white text-xs font-bold uppercase tracking-widest hover:bg-black transition-colors"
        >
          Explore Collection
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between border-b border-stone-200 pb-5 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold font-display text-stone-900">
            Shopping Bag
          </h1>
          <p className="text-xs text-stone-500 mt-1">
            {cartCount} {cartCount === 1 ? 'item' : 'items'} ready for nationwide delivery.
          </p>
        </div>
        <button
          onClick={() => navigate('/shop')}
          className="text-xs font-semibold text-stone-600 hover:text-black flex items-center gap-1.5 mt-2 sm:mt-0"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Continue Shopping</span>
        </button>
      </div>

      {/* Free Delivery Meter */}
      <div className="bg-[#F8F8F6] p-4 border border-stone-200/80 mb-8 max-w-3xl">
        <div className="flex justify-between items-center text-xs">
          {amountNeeded > 0 ? (
            <p className="text-stone-700">
              Add <strong className="font-mono text-stone-900">PKR {amountNeeded.toLocaleString()}</strong> more to claim <strong className="text-stone-900">FREE Delivery</strong> across Pakistan.
            </p>
          ) : (
            <p className="text-emerald-800 font-semibold flex items-center gap-1">
              <span>✓</span> You've unlocked FREE Nationwide Delivery!
            </p>
          )}
          <span className="font-mono text-stone-500 text-[11px]">{freeShippingProgress}%</span>
        </div>
        <div className="w-full bg-stone-200 h-2 mt-2 rounded-full overflow-hidden">
          <div
            className="bg-[#121212] h-full transition-all duration-300"
            style={{ width: `${freeShippingProgress}%` }}
          />
        </div>
      </div>

      {/* Cart Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        {/* Items List (8 cols) */}
        <div className="lg:col-span-8 divide-y divide-stone-200">
          <div className="hidden sm:grid grid-cols-12 text-xs uppercase tracking-wider text-stone-400 pb-3 font-semibold">
            <span className="col-span-6">Product</span>
            <span className="col-span-2 text-center">Quantity</span>
            <span className="col-span-2 text-right">Price</span>
            <span className="col-span-2 text-right">Total</span>
          </div>

          {cart.map((item) => (
            <div key={item.id} className="py-5 sm:grid sm:grid-cols-12 items-center gap-4 flex flex-col sm:flex-row">
              {/* Product Info */}
              <div className="col-span-6 flex gap-4 w-full sm:w-auto">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-24 object-cover bg-stone-100 shrink-0"
                />
                <div className="flex flex-col justify-between">
                  <div>
                    <h3
                      onClick={() => navigate(`/product/${item.slug}`)}
                      className="text-sm font-semibold text-stone-900 hover:underline cursor-pointer line-clamp-1"
                    >
                      {item.name}
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-stone-500 mt-1">
                      <span>Color: {item.selectedColor}</span>
                      <span>·</span>
                      <span>Size: {item.selectedSize}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-stone-400 hover:text-red-600 text-xs flex items-center gap-1 transition-colors self-start mt-2"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Remove</span>
                  </button>
                </div>
              </div>

              {/* Quantity */}
              <div className="col-span-2 flex sm:justify-center w-full sm:w-auto justify-between items-center">
                <span className="text-xs text-stone-500 sm:hidden">Quantity:</span>
                <div className="flex items-center border border-stone-300">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="w-8 h-8 flex items-center justify-center text-stone-600 hover:text-black font-semibold text-xs"
                  >
                    -
                  </button>
                  <span className="w-8 text-center text-xs font-bold tabular-nums">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="w-8 h-8 flex items-center justify-center text-stone-600 hover:text-black font-semibold text-xs"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Unit Price */}
              <div className="col-span-2 text-right hidden sm:block text-xs font-mono text-stone-600 tabular-nums">
                PKR {item.price.toLocaleString()}
              </div>

              {/* Total Price */}
              <div className="col-span-2 text-right w-full sm:w-auto flex justify-between sm:block text-sm font-bold font-mono text-stone-900 tabular-nums">
                <span className="text-xs text-stone-500 sm:hidden">Item Subtotal:</span>
                <span>PKR {(item.price * item.quantity).toLocaleString()}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-[#F8F8F6] p-6 border border-stone-200 space-y-5">
            <h2 className="text-xs uppercase font-bold tracking-widest text-stone-900">
              Order Summary
            </h2>

            {/* Coupon input */}
            {appliedCoupon ? (
              <div className="p-3 bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex justify-between items-center">
                <div className="flex items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5" />
                  <span>
                    <strong>{appliedCoupon.code}</strong> (-PKR {discountAmount.toLocaleString()})
                  </span>
                </div>
                <button
                  onClick={removeCoupon}
                  className="text-emerald-900 underline font-semibold"
                >
                  Remove
                </button>
              </div>
            ) : (
              <form onSubmit={handleApplyCoupon} className="space-y-1.5">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter promo code (e.g. FIRST10)"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    className="flex-1 bg-white border border-stone-300 px-3 py-2 text-xs focus:outline-none focus:border-stone-900 uppercase"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-stone-900 text-white text-xs font-bold uppercase tracking-wider hover:bg-black transition-colors"
                  >
                    Apply
                  </button>
                </div>
                {couponError && (
                  <p className="text-[11px] text-red-600">{couponError}</p>
                )}
              </form>
            )}

            {/* Calculations */}
            <div className="space-y-2 text-xs text-stone-600 pt-2 border-t border-stone-200/80">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-mono text-stone-900 font-semibold tabular-nums">
                  PKR {cartSubtotal.toLocaleString()}
                </span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-700">
                  <span>Coupon Discount</span>
                  <span className="font-mono font-semibold tabular-nums">
                    -PKR {discountAmount.toLocaleString()}
                  </span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Nationwide Shipping</span>
                <span className="font-mono text-stone-900 tabular-nums">
                  {shippingFee === 0 ? 'FREE' : `PKR ${shippingFee.toLocaleString()}`}
                </span>
              </div>
              <div className="flex justify-between text-base font-bold text-stone-950 pt-3 border-t border-stone-200">
                <span>Estimated Total</span>
                <span className="font-mono tabular-nums">
                  PKR {cartTotal.toLocaleString()}
                </span>
              </div>
              <p className="text-[11px] text-stone-400 pt-1">
                Taxes included. Cash on Delivery is available upon checkout.
              </p>
            </div>

            {/* Checkout Button */}
            <div className="space-y-2 pt-2">
              <button
                onClick={() => navigate('/checkout')}
                className="w-full py-4 bg-[#121212] text-white hover:bg-black text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition-colors shadow-md cursor-pointer"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => navigate('/shop')}
                className="w-full py-2.5 bg-white border border-stone-300 text-stone-800 hover:border-black text-xs font-semibold uppercase tracking-wider transition-colors"
              >
                Continue Shopping
              </button>
            </div>

            <div className="flex items-center justify-center gap-1.5 text-[11px] text-stone-500 pt-2">
              <ShieldCheck className="w-4 h-4 text-stone-800" />
              <span>Safe & Encrypted Checkout</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
