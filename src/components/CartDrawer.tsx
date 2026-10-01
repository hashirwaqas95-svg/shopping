import React, { useState } from 'react';
import { X, Trash2, ArrowRight, ShieldCheck, Tag, ShoppingBag } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const CartDrawer: React.FC = () => {
  const {
    isCartDrawerOpen,
    closeCartDrawer,
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

  if (!isCartDrawerOpen) return null;

  const freeShippingProgress = Math.min(100, Math.round((cartSubtotal / freeShippingThreshold) * 100));
  const amountNeededForFreeShipping = Math.max(0, freeShippingThreshold - cartSubtotal);

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

  const handleGoToCheckout = () => {
    closeCartDrawer();
    navigate('/checkout');
  };

  const handleViewCartPage = () => {
    closeCartDrawer();
    navigate('/cart');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="absolute inset-0" onClick={closeCartDrawer} />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white flex flex-col shadow-2xl relative">
          
          {/* Header */}
          <div className="p-5 border-b border-stone-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-4 h-4 text-stone-900" />
              <h2 className="text-xs uppercase tracking-widest font-bold text-stone-900">
                Shopping Bag ({cartCount})
              </h2>
            </div>
            <button
              onClick={closeCartDrawer}
              className="p-1.5 text-stone-400 hover:text-stone-900 rounded-full cursor-pointer"
              aria-label="Close bag"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Meter */}
          <div className="bg-[#F8F8F6] p-3.5 border-b border-stone-200/60">
            {amountNeededForFreeShipping > 0 ? (
              <p className="text-xs text-stone-700">
                Add <span className="font-bold text-stone-900 font-mono">PKR {amountNeededForFreeShipping.toLocaleString()}</span> more for <strong className="text-stone-900">FREE Delivery</strong> across Pakistan.
              </p>
            ) : (
              <p className="text-xs font-semibold text-emerald-800 flex items-center gap-1.5">
                <span>✓</span> You unlocked FREE Nationwide Delivery!
              </p>
            )}
            <div className="w-full bg-stone-200 h-1.5 mt-2 rounded-full overflow-hidden">
              <div
                className="bg-[#121212] h-full transition-all duration-300"
                style={{ width: `${freeShippingProgress}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 divide-y divide-stone-100">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 text-stone-500">
                <ShoppingBag className="w-12 h-12 text-stone-300 mb-3 stroke-[1.2]" />
                <p className="text-sm font-semibold text-stone-800 uppercase tracking-wider">
                  Your bag is empty
                </p>
                <p className="text-xs text-stone-500 mt-1 max-w-xs">
                  Explore our curated men's shirts, luxury tees, and polos.
                </p>
                <button
                  onClick={() => {
                    closeCartDrawer();
                    navigate('/shop');
                  }}
                  className="mt-5 px-6 py-2.5 bg-stone-900 text-white text-xs font-semibold uppercase tracking-wider hover:bg-black"
                >
                  Explore Collection
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div key={item.id} className="py-4 flex gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-24 object-cover bg-stone-100 shrink-0"
                  />
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-xs font-semibold text-stone-900 line-clamp-1">
                        {item.name}
                      </h3>
                      <div className="flex items-center gap-2 text-[11px] text-stone-500 mt-0.5">
                        <span>Color: {item.selectedColor}</span>
                        <span>·</span>
                        <span>Size: {item.selectedSize}</span>
                      </div>
                      <div className="text-xs font-bold text-stone-900 font-mono mt-1">
                        PKR {item.price.toLocaleString()}
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      {/* Quantity Stepper */}
                      <div className="flex items-center border border-stone-200">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-6 h-6 flex items-center justify-center text-stone-600 hover:text-black font-semibold text-xs"
                        >
                          -
                        </button>
                        <span className="w-7 text-center text-xs font-semibold tabular-nums">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-6 h-6 flex items-center justify-center text-stone-600 hover:text-black font-semibold text-xs"
                        >
                          +
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-stone-400 hover:text-red-600 transition-colors p-1"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer / Checkout */}
          {cart.length > 0 && (
            <div className="p-5 border-t border-stone-200 bg-stone-50/60 space-y-4">
              {/* Promo input */}
              {appliedCoupon ? (
                <div className="flex items-center justify-between p-2.5 bg-emerald-50 border border-emerald-200 text-xs text-emerald-800">
                  <div className="flex items-center gap-2">
                    <Tag className="w-3.5 h-3.5" />
                    <span>
                      Code <strong>{appliedCoupon.code}</strong> applied (-PKR {discountAmount.toLocaleString()})
                    </span>
                  </div>
                  <button
                    onClick={removeCoupon}
                    className="text-emerald-900 font-bold hover:underline"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="space-y-1">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Promo code (e.g. FIRST10)"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                      className="flex-1 bg-white border border-stone-300 px-3 py-1.5 text-xs focus:outline-none focus:border-stone-900 uppercase placeholder:normal-case"
                    />
                    <button
                      type="submit"
                      className="px-3 py-1.5 bg-stone-900 text-white text-xs font-medium uppercase tracking-wider hover:bg-black"
                    >
                      Apply
                    </button>
                  </div>
                  {couponError && (
                    <p className="text-[11px] text-red-600">{couponError}</p>
                  )}
                </form>
              )}

              {/* Subtotal & Delivery Breakdown */}
              <div className="space-y-1.5 text-xs text-stone-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-mono tabular-nums text-stone-900">
                    PKR {cartSubtotal.toLocaleString()}
                  </span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-700">
                    <span>Discount</span>
                    <span className="font-mono tabular-nums">
                      -PKR {discountAmount.toLocaleString()}
                    </span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Nationwide Shipping</span>
                  <span className="font-mono tabular-nums text-stone-900">
                    {shippingFee === 0 ? 'FREE' : `PKR ${shippingFee.toLocaleString()}`}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-bold text-stone-950 pt-2 border-t border-stone-200">
                  <span>Estimated Total</span>
                  <span className="font-mono tabular-nums">
                    PKR {cartTotal.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-1">
                <button
                  onClick={handleGoToCheckout}
                  className="w-full py-3 bg-[#121212] text-white hover:bg-black text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 shadow-sm transition-colors cursor-pointer"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={handleViewCartPage}
                  className="w-full py-2.5 bg-white border border-stone-300 text-stone-800 hover:border-black text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
                >
                  View Full Bag & Summary
                </button>
              </div>

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-stone-500 pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-stone-700" />
                <span>Cash on Delivery Available Across Pakistan</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
