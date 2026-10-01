import React, { useState } from 'react';
import { User, Package, MapPin, Heart, LogOut, ShieldCheck, Truck, Plus, Check } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { CustomerAddress } from '../types';

export const AccountPage: React.FC = () => {
  const {
    currentUser,
    login,
    logout,
    orders,
    saveAddress,
    navigate,
    isAdminMode,
    setIsAdminMode,
    addToast
  } = useStore();

  const [activeTab, setActiveTab] = useState<'orders' | 'addresses' | 'profile'>('orders');

  // Login form state
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [authName, setAuthName] = useState('');

  // Address form modal
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [newAddress, setNewAddress] = useState<CustomerAddress>({
    fullName: currentUser?.fullName || '',
    email: currentUser?.email || '',
    phone: currentUser?.phone || '',
    addressLine: '',
    apartment: '',
    city: 'Lahore',
    province: 'Punjab',
    postalCode: '54000'
  });

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authEmail) return;
    login(authEmail);
    setAuthEmail('');
    setAuthPassword('');
  };

  const handleSaveAddress = (e: React.FormEvent) => {
    e.preventDefault();
    saveAddress(newAddress);
    setShowAddressModal(false);
    setNewAddress({
      fullName: currentUser?.fullName || '',
      email: currentUser?.email || '',
      phone: currentUser?.phone || '',
      addressLine: '',
      apartment: '',
      city: 'Lahore',
      province: 'Punjab',
      postalCode: '54000'
    });
  };

  // If not logged in, show clean authentication screen
  if (!currentUser) {
    return (
      <div className="max-w-md mx-auto px-4 py-16 sm:py-24">
        <div className="bg-white p-8 border border-stone-200 shadow-sm space-y-6">
          <div className="text-center space-y-1">
            <span className="font-display text-xl font-bold tracking-widest text-stone-900 uppercase">
              VALIANT
            </span>
            <h1 className="text-lg font-bold text-stone-900">
              {isRegisterMode ? 'Create Your Account' : 'Sign in to Your Account'}
            </h1>
            <p className="text-xs text-stone-500">
              Track shipments, review past orders, and manage saved addresses.
            </p>
          </div>

          <form onSubmit={handleAuthSubmit} className="space-y-4 text-xs">
            {isRegisterMode && (
              <div>
                <label className="block font-semibold uppercase tracking-wider text-stone-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Asad Qureshi"
                  value={authName}
                  onChange={(e) => setAuthName(e.target.value)}
                  className="w-full border border-stone-300 p-2.5 bg-white text-stone-900 focus:outline-none focus:border-stone-900"
                />
              </div>
            )}

            <div>
              <label className="block font-semibold uppercase tracking-wider text-stone-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                required
                placeholder="name@example.com (or admin@valiant.pk)"
                value={authEmail}
                onChange={(e) => setAuthEmail(e.target.value)}
                className="w-full border border-stone-300 p-2.5 bg-white text-stone-900 focus:outline-none focus:border-stone-900"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="font-semibold uppercase tracking-wider text-stone-700">
                  Password
                </label>
                {!isRegisterMode && (
                  <button
                    type="button"
                    onClick={() => addToast('Password reset link sent to your email.')}
                    className="text-[11px] text-stone-500 hover:text-black"
                  >
                    Forgot Password?
                  </button>
                )}
              </div>
              <input
                type="password"
                required
                placeholder="••••••••"
                value={authPassword}
                onChange={(e) => setAuthPassword(e.target.value)}
                className="w-full border border-stone-300 p-2.5 bg-white text-stone-900 focus:outline-none focus:border-stone-900"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#121212] text-white hover:bg-black text-xs font-bold uppercase tracking-widest transition-colors cursor-pointer shadow-xs"
            >
              {isRegisterMode ? 'Register Account' : 'Sign In'}
            </button>
          </form>

          <div className="pt-4 border-t border-stone-100 text-center text-xs text-stone-500">
            {isRegisterMode ? (
              <p>
                Already have an account?{' '}
                <button
                  onClick={() => setIsRegisterMode(false)}
                  className="font-bold text-stone-900 underline"
                >
                  Sign in
                </button>
              </p>
            ) : (
              <p>
                New to VALIANT?{' '}
                <button
                  onClick={() => setIsRegisterMode(true)}
                  className="font-bold text-stone-900 underline"
                >
                  Create an account
                </button>
              </p>
            )}
          </div>

          <div className="p-3 bg-stone-50 border border-stone-200 text-[11px] text-stone-600 space-y-1">
            <strong className="block text-stone-900">Demo Sign-In Tip:</strong>
            <p>Enter any email (e.g. customer@example.com) to access customer portal, or <strong>admin@valiant.pk</strong> to unlock the Admin Dashboard.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Header */}
      <div className="border-b border-stone-200 pb-5 mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-stone-400 mb-1">
            <span>Valiant</span>
            <span>/</span>
            <span>Account</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold font-display text-stone-900">
            Welcome, {currentUser.fullName}
          </h1>
          <p className="text-xs text-stone-500 mt-0.5 font-mono">
            {currentUser.email} · Phone: {currentUser.phone}
          </p>
        </div>

        <div className="flex items-center gap-3">
          {currentUser.role === 'admin' && (
            <button
              onClick={() => {
                setIsAdminMode(true);
                navigate('/admin');
              }}
              className="px-4 py-2 bg-amber-100 hover:bg-amber-200 text-amber-900 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors border border-amber-300"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Open Admin Dashboard</span>
            </button>
          )}

          <button
            onClick={logout}
            className="px-4 py-2 border border-stone-300 text-stone-700 hover:text-black hover:border-black text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex gap-2 border-b border-stone-200 mb-8 overflow-x-auto pb-1 text-xs uppercase font-bold tracking-wider">
        <button
          onClick={() => setActiveTab('orders')}
          className={`py-2 px-4 transition-colors ${
            activeTab === 'orders'
              ? 'border-b-2 border-stone-900 text-stone-950'
              : 'text-stone-400 hover:text-stone-900'
          }`}
        >
          My Orders ({orders.length})
        </button>
        <button
          onClick={() => setActiveTab('addresses')}
          className={`py-2 px-4 transition-colors ${
            activeTab === 'addresses'
              ? 'border-b-2 border-stone-900 text-stone-950'
              : 'text-stone-400 hover:text-stone-900'
          }`}
        >
          Saved Addresses ({currentUser.savedAddresses.length})
        </button>
        <button
          onClick={() => setActiveTab('profile')}
          className={`py-2 px-4 transition-colors ${
            activeTab === 'profile'
              ? 'border-b-2 border-stone-900 text-stone-950'
              : 'text-stone-400 hover:text-stone-900'
          }`}
        >
          Profile Settings
        </button>
      </div>

      {/* Orders Tab */}
      {activeTab === 'orders' && (
        <div className="space-y-6">
          {orders.length === 0 ? (
            <div className="py-16 text-center text-stone-500 bg-stone-50 border border-stone-200 p-8 space-y-3">
              <Package className="w-12 h-12 text-stone-300 mx-auto stroke-[1.2]" />
              <p className="text-sm font-bold text-stone-800 uppercase tracking-wider">
                No orders placed yet
              </p>
              <button
                onClick={() => navigate('/shop')}
                className="px-6 py-2.5 bg-stone-900 text-white text-xs font-semibold uppercase tracking-wider"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((ord) => (
                <div key={ord.id} className="border border-stone-200 bg-white shadow-xs p-6 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-100 pb-4 text-xs">
                    <div>
                      <span className="text-[10px] uppercase font-bold tracking-wider text-stone-400">
                        Order #{ord.id}
                      </span>
                      <p className="font-mono text-stone-500 text-[11px] mt-0.5">
                        Placed on {new Date(ord.createdAt).toLocaleDateString('en-PK', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <span
                        className={`text-[11px] uppercase font-bold px-2.5 py-1 ${
                          ord.status === 'delivered'
                            ? 'bg-emerald-100 text-emerald-900'
                            : ord.status === 'shipped'
                            ? 'bg-blue-100 text-blue-900'
                            : ord.status === 'cancelled'
                            ? 'bg-rose-100 text-rose-900'
                            : 'bg-amber-100 text-amber-900'
                        }`}
                      >
                        Status: {ord.status}
                      </span>
                      <span className="font-mono font-bold text-stone-950 text-sm tabular-nums">
                        PKR {ord.total.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  {/* Tracking info */}
                  {ord.trackingNumber && (
                    <div className="flex items-center justify-between bg-stone-50 p-3 text-xs text-stone-700">
                      <div className="flex items-center gap-2">
                        <Truck className="w-4 h-4 text-stone-800" />
                        <span>
                          Courier: <strong>{ord.courierPartner}</strong> (Tracking # <code className="font-mono">{ord.trackingNumber}</code>)
                        </span>
                      </div>
                      <span className="text-emerald-700 font-semibold text-[11px]">
                        In Transit Across Pakistan
                      </span>
                    </div>
                  )}

                  {/* Items list */}
                  <div className="divide-y divide-stone-100">
                    {ord.items.map((item, idx) => (
                      <div key={idx} className="py-2.5 flex items-center justify-between text-xs">
                        <div className="flex items-center gap-3">
                          <img src={item.image} alt={item.name} className="w-10 h-12 object-cover bg-stone-100" />
                          <div>
                            <h4 className="font-semibold text-stone-900">{item.name}</h4>
                            <p className="text-[11px] text-stone-400">
                              {item.color} · Size: {item.size} · Qty: {item.quantity}
                            </p>
                          </div>
                        </div>
                        <span className="font-mono font-semibold text-stone-900">
                          PKR {(item.price * item.quantity).toLocaleString()}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-2 flex justify-between items-center text-[11px] text-stone-500 border-t border-stone-100">
                    <span>
                      Shipping to: {ord.customer.city}, {ord.customer.province}
                    </span>
                    <button
                      onClick={() => navigate(`/order-confirmation/${ord.id}`)}
                      className="text-stone-900 font-bold hover:underline"
                    >
                      View Full Receipt →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Addresses Tab */}
      {activeTab === 'addresses' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-xs uppercase font-bold tracking-widest text-stone-900">
              Saved Shipping Addresses
            </h3>
            <button
              onClick={() => setShowAddressModal(true)}
              className="px-4 py-2 bg-stone-900 text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 hover:bg-black transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add New Address</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {currentUser.savedAddresses.map((addr, idx) => (
              <div key={idx} className="border border-stone-200 p-5 bg-white text-xs space-y-2 relative">
                <div className="flex justify-between">
                  <span className="font-bold text-stone-900 uppercase tracking-wider">{addr.fullName}</span>
                  {idx === 0 && (
                    <span className="text-[10px] uppercase font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5">
                      Default
                    </span>
                  )}
                </div>
                <p className="text-stone-600">{addr.addressLine}</p>
                {addr.apartment && <p className="text-stone-500">{addr.apartment}</p>}
                <p className="text-stone-600">
                  {addr.city}, {addr.province} {addr.postalCode}
                </p>
                <p className="font-mono text-stone-500">{addr.phone}</p>
              </div>
            ))}
          </div>

          {/* New address modal */}
          {showAddressModal && (
            <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
              <div className="bg-white w-full max-w-lg p-6 sm:p-8 space-y-4">
                <h3 className="text-sm uppercase font-bold tracking-wider text-stone-900">
                  Add Delivery Address in Pakistan
                </h3>
                <form onSubmit={handleSaveAddress} className="space-y-3 text-xs">
                  <div>
                    <label className="block font-semibold text-stone-700 mb-1">Full Name</label>
                    <input
                      type="text"
                      required
                      value={newAddress.fullName}
                      onChange={(e) => setNewAddress({ ...newAddress, fullName: e.target.value })}
                      className="w-full border border-stone-300 p-2"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-stone-700 mb-1">Mobile Phone (Pakistan)</label>
                    <input
                      type="tel"
                      required
                      value={newAddress.phone}
                      onChange={(e) => setNewAddress({ ...newAddress, phone: e.target.value })}
                      className="w-full border border-stone-300 p-2 font-mono"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-stone-700 mb-1">House / Street / Flat</label>
                    <input
                      type="text"
                      required
                      value={newAddress.addressLine}
                      onChange={(e) => setNewAddress({ ...newAddress, addressLine: e.target.value })}
                      className="w-full border border-stone-300 p-2"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-semibold text-stone-700 mb-1">City</label>
                      <input
                        type="text"
                        required
                        value={newAddress.city}
                        onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
                        className="w-full border border-stone-300 p-2"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-stone-700 mb-1">Province</label>
                      <input
                        type="text"
                        required
                        value={newAddress.province}
                        onChange={(e) => setNewAddress({ ...newAddress, province: e.target.value })}
                        className="w-full border border-stone-300 p-2"
                      />
                    </div>
                  </div>
                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setShowAddressModal(false)}
                      className="px-4 py-2 border border-stone-300 text-stone-700"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 bg-stone-900 text-white font-bold uppercase tracking-wider"
                    >
                      Save Address
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Profile Tab */}
      {activeTab === 'profile' && (
        <div className="max-w-xl bg-white border border-stone-200 p-6 space-y-4 text-xs">
          <h3 className="uppercase font-bold tracking-widest text-stone-900">
            Account Details
          </h3>
          <div className="space-y-3">
            <div>
              <span className="text-stone-400 block">Name:</span>
              <span className="font-semibold text-stone-900 text-sm">{currentUser.fullName}</span>
            </div>
            <div>
              <span className="text-stone-400 block">Email:</span>
              <span className="font-semibold text-stone-900 text-sm font-mono">{currentUser.email}</span>
            </div>
            <div>
              <span className="text-stone-400 block">Role:</span>
              <span className="font-semibold text-stone-900 uppercase">{currentUser.role}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
