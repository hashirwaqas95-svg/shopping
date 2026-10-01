import React, { useState, useMemo } from 'react';
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Users,
  Tag,
  Plus,
  Trash2,
  Edit2,
  CheckCircle2,
  Clock,
  Truck,
  TrendingUp,
  Search,
  Eye,
  X,
  ArrowLeft,
  DollarSign
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { Product, Order, OrderStatus, ProductCategory, ProductSize, Coupon } from '../types';

export const AdminDashboard: React.FC = () => {
  const {
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    orders,
    updateOrderStatus,
    coupons,
    addCoupon,
    toggleCoupon,
    setIsAdminMode,
    navigate,
    addToast
  } = useStore();

  const [activeTab, setActiveTab] = useState<'analytics' | 'products' | 'orders' | 'customers' | 'coupons'>('analytics');

  // Search & Filter States
  const [productSearch, setProductSearch] = useState('');
  const [orderSearch, setOrderSearch] = useState('');
  const [orderStatusFilter, setOrderStatusFilter] = useState<string>('all');

  // Product Modal State (Add or Edit)
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const [productFormData, setProductFormData] = useState({
    name: '',
    slug: '',
    category: 'shirts' as ProductCategory,
    subCategory: 'Casual Shirts',
    price: 2990,
    compareAtPrice: 3490,
    shortDescription: '',
    description: '',
    fabricDetails: '100% Combed Long-Staple Cotton',
    fitDetails: 'Regular tailored silhouette',
    colors: [{ name: 'Black', hex: '#121212' }],
    sizes: ['S', 'M', 'L', 'XL'] as ProductSize[],
    images: ['https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=1000&q=80'],
    isFeatured: false,
    isBestSeller: false,
    isNewArrival: true,
    initialStock: 15
  });

  // Coupon Modal State
  const [isCouponModalOpen, setIsCouponModalOpen] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [discountType, setDiscountType] = useState<'percentage' | 'fixed'>('percentage');
  const [discountValue, setDiscountValue] = useState(10);
  const [minOrder, setMinOrder] = useState(2500);
  const [couponDesc, setCouponDesc] = useState('');

  // Selected order detail view modal
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  // Analytics Computations
  const totalSales = useMemo(() => {
    return orders
      .filter((o) => o.status !== 'cancelled')
      .reduce((sum, o) => sum + o.total, 0);
  }, [orders]);

  const totalOrdersCount = orders.length;
  const pendingOrdersCount = orders.filter((o) => o.status === 'pending' || o.status === 'processing').length;
  const totalItemsSold = orders
    .filter((o) => o.status !== 'cancelled')
    .reduce((sum, o) => sum + o.items.reduce((s, i) => s + i.quantity, 0), 0);

  // Unique customers list from orders
  const customers = useMemo(() => {
    const map = new Map<string, { name: string; email: string; phone: string; city: string; orders: number; totalSpent: number }>();
    orders.forEach((o) => {
      const email = o.customer.email.toLowerCase();
      if (!map.has(email)) {
        map.set(email, {
          name: o.customer.fullName,
          email: o.customer.email,
          phone: o.customer.phone,
          city: o.customer.city,
          orders: 1,
          totalSpent: o.status !== 'cancelled' ? o.total : 0
        });
      } else {
        const c = map.get(email)!;
        c.orders += 1;
        if (o.status !== 'cancelled') {
          c.totalSpent += o.total;
        }
      }
    });
    return Array.from(map.values());
  }, [orders]);

  // Handle Product Save
  const handleOpenAddProduct = () => {
    setEditingProduct(null);
    setProductFormData({
      name: '',
      slug: '',
      category: 'shirts',
      subCategory: 'Casual Shirts',
      price: 2990,
      compareAtPrice: 3490,
      shortDescription: 'Signature tailored menswear garment crafted with long-staple cotton.',
      description: 'Crafted with precision seams and breathable cotton weave for all-day comfort in Pakistan.',
      fabricDetails: '100% Combed Long-Staple Cotton (220 GSM)',
      fitDetails: 'Regular tailored silhouette',
      colors: [{ name: 'Pure Black', hex: '#121212' }, { name: 'Chalk White', hex: '#FFFFFF' }],
      sizes: ['S', 'M', 'L', 'XL'],
      images: ['https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=1000&q=80'],
      isFeatured: false,
      isBestSeller: false,
      isNewArrival: true,
      initialStock: 20
    });
    setIsProductModalOpen(true);
  };

  const handleOpenEditProduct = (prod: Product) => {
    setEditingProduct(prod);
    setProductFormData({
      name: prod.name,
      slug: prod.slug,
      category: prod.category,
      subCategory: prod.subCategory,
      price: prod.price,
      compareAtPrice: prod.compareAtPrice || prod.price,
      shortDescription: prod.shortDescription,
      description: prod.description,
      fabricDetails: prod.fabricDetails,
      fitDetails: prod.fitDetails,
      colors: prod.colors,
      sizes: prod.sizes,
      images: prod.images,
      isFeatured: !!prod.isFeatured,
      isBestSeller: !!prod.isBestSeller,
      isNewArrival: !!prod.isNewArrival,
      initialStock: prod.totalStock
    });
    setIsProductModalOpen(true);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!productFormData.name) return;

    const slug = productFormData.slug || productFormData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const discount = productFormData.compareAtPrice > productFormData.price
      ? Math.round(((productFormData.compareAtPrice - productFormData.price) / productFormData.compareAtPrice) * 100)
      : undefined;

    // build stock map
    const stockMap: Record<string, number> = {};
    productFormData.colors.forEach((c) => {
      productFormData.sizes.forEach((s) => {
        stockMap[`${c.name}_${s}`] = Math.round(productFormData.initialStock / (productFormData.colors.length * productFormData.sizes.length)) || 5;
      });
    });

    if (editingProduct) {
      updateProduct({
        ...editingProduct,
        name: productFormData.name,
        slug,
        category: productFormData.category,
        subCategory: productFormData.subCategory,
        price: productFormData.price,
        compareAtPrice: productFormData.compareAtPrice,
        discountPercent: discount,
        shortDescription: productFormData.shortDescription,
        description: productFormData.description,
        fabricDetails: productFormData.fabricDetails,
        fitDetails: productFormData.fitDetails,
        colors: productFormData.colors,
        sizes: productFormData.sizes,
        images: productFormData.images,
        isFeatured: productFormData.isFeatured,
        isBestSeller: productFormData.isBestSeller,
        isNewArrival: productFormData.isNewArrival,
        stock: Object.keys(editingProduct.stock).length ? editingProduct.stock : stockMap,
        totalStock: productFormData.initialStock
      });
    } else {
      addProduct({
        name: productFormData.name,
        slug,
        category: productFormData.category,
        subCategory: productFormData.subCategory,
        price: productFormData.price,
        compareAtPrice: productFormData.compareAtPrice,
        discountPercent: discount,
        shortDescription: productFormData.shortDescription,
        description: productFormData.description,
        fabricDetails: productFormData.fabricDetails,
        fitDetails: productFormData.fitDetails,
        careInstructions: [
          'Machine wash gentle cold',
          'Hang dry in shade',
          'Medium iron'
        ],
        colors: productFormData.colors,
        sizes: productFormData.sizes,
        stock: stockMap,
        totalStock: productFormData.initialStock,
        images: productFormData.images,
        rating: 5.0,
        reviewCount: 1,
        isFeatured: productFormData.isFeatured,
        isBestSeller: productFormData.isBestSeller,
        isNewArrival: productFormData.isNewArrival,
        tags: [productFormData.category, 'valiant']
      });
    }

    setIsProductModalOpen(false);
  };

  const handleCreateCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponCode) return;
    addCoupon({
      code: couponCode.toUpperCase().trim(),
      discountType,
      discountValue,
      minOrderValue: minOrder,
      description: couponDesc || `${discountValue}${discountType === 'percentage' ? '%' : ' PKR'} off`,
      isActive: true
    });
    setCouponCode('');
    setIsCouponModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-stone-100/70 text-stone-900 pb-16">
      {/* Admin Top Navigation Bar */}
      <div className="bg-[#121212] text-white px-4 sm:px-8 py-3.5 flex items-center justify-between shadow-md">
        <div className="flex items-center gap-4">
          <button
            onClick={() => {
              setIsAdminMode(false);
              navigate('/');
            }}
            className="flex items-center gap-1.5 text-xs text-stone-300 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Storefront</span>
          </button>
          <div className="h-4 w-[1px] bg-stone-700" />
          <div className="flex items-center gap-2">
            <span className="font-display font-bold tracking-widest text-sm uppercase">
              VALIANT
            </span>
            <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 bg-amber-500/20 text-amber-300 border border-amber-500/30">
              Admin Portal
            </span>
          </div>
        </div>

        <div className="text-xs text-stone-400 font-mono">
          Pakistan Store Operations · Live Sync
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
        {/* Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-2 bg-white p-2 border border-stone-200 shadow-xs mb-8">
          {[
            { id: 'analytics', label: 'Analytics & KPIs', icon: LayoutDashboard },
            { id: 'products', label: `Products (${products.length})`, icon: Package },
            { id: 'orders', label: `Orders (${orders.length})`, icon: ShoppingBag },
            { id: 'customers', label: `Customers (${customers.length})`, icon: Users },
            { id: 'coupons', label: `Coupons (${coupons.length})`, icon: Tag }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-stone-900 text-white'
                    : 'text-stone-600 hover:text-black hover:bg-stone-50'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* 1. ANALYTICS VIEW */}
        {activeTab === 'analytics' && (
          <div className="space-y-8 animate-in fade-in duration-150">
            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              <div className="bg-white p-6 border border-stone-200 shadow-xs space-y-1">
                <span className="text-xs uppercase font-bold tracking-wider text-stone-400">
                  Total Sales Revenue
                </span>
                <div className="text-2xl sm:text-3xl font-bold font-mono text-stone-900 tabular-nums">
                  PKR {totalSales.toLocaleString()}
                </div>
                <p className="text-[11px] text-emerald-700 flex items-center gap-1 pt-1 font-semibold">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>+18.4% this month</span>
                </p>
              </div>

              <div className="bg-white p-6 border border-stone-200 shadow-xs space-y-1">
                <span className="text-xs uppercase font-bold tracking-wider text-stone-400">
                  Total Orders
                </span>
                <div className="text-2xl sm:text-3xl font-bold font-mono text-stone-900 tabular-nums">
                  {totalOrdersCount}
                </div>
                <p className="text-[11px] text-stone-500 pt-1">
                  Across Lahore, Karachi, Islamabad
                </p>
              </div>

              <div className="bg-white p-6 border border-stone-200 shadow-xs space-y-1">
                <span className="text-xs uppercase font-bold tracking-wider text-stone-400">
                  Pending Dispatch
                </span>
                <div className="text-2xl sm:text-3xl font-bold font-mono text-amber-700 tabular-nums">
                  {pendingOrdersCount}
                </div>
                <p className="text-[11px] text-stone-500 pt-1">
                  Requires warehouse fulfillment
                </p>
              </div>

              <div className="bg-white p-6 border border-stone-200 shadow-xs space-y-1">
                <span className="text-xs uppercase font-bold tracking-wider text-stone-400">
                  Garments Sold
                </span>
                <div className="text-2xl sm:text-3xl font-bold font-mono text-stone-900 tabular-nums">
                  {totalItemsSold}
                </div>
                <p className="text-[11px] text-stone-500 pt-1">
                  Average Order: PKR {totalOrdersCount ? Math.round(totalSales / totalOrdersCount).toLocaleString() : 0}
                </p>
              </div>
            </div>

            {/* Visual Revenue Breakdown */}
            <div className="bg-white p-6 sm:p-8 border border-stone-200 shadow-xs space-y-6">
              <div className="flex justify-between items-center border-b border-stone-100 pb-4">
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-stone-900">
                    Weekly Revenue & Regional Volume
                  </h3>
                  <p className="text-xs text-stone-500 mt-0.5">
                    Orders processed through TCS Express, Leopards, and Trax Logistics
                  </p>
                </div>
                <span className="text-xs font-mono font-bold text-stone-800 bg-stone-100 px-3 py-1">
                  Currency: PKR
                </span>
              </div>

              {/* Bar simulation */}
              <div className="grid grid-cols-7 gap-3 sm:gap-6 items-end h-44 pt-6">
                {[
                  { day: 'Mon', pkr: 24500, height: '45%' },
                  { day: 'Tue', pkr: 38900, height: '65%' },
                  { day: 'Wed', pkr: 46200, height: '78%' },
                  { day: 'Thu', pkr: 32000, height: '55%' },
                  { day: 'Fri', pkr: 58400, height: '92%' },
                  { day: 'Sat', pkr: 64200, height: '100%' },
                  { day: 'Sun', pkr: 41800, height: '70%' }
                ].map((col) => (
                  <div key={col.day} className="flex flex-col items-center gap-2 h-full justify-end">
                    <span className="text-[10px] font-mono text-stone-400 tabular-nums hidden sm:block">
                      {Math.round(col.pkr / 1000)}k
                    </span>
                    <div
                      className="w-full bg-stone-900 hover:bg-stone-700 transition-all rounded-t-xs"
                      style={{ height: col.height }}
                      title={`${col.day}: PKR ${col.pkr.toLocaleString()}`}
                    />
                    <span className="text-xs font-bold text-stone-600 uppercase">{col.day}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Orders in Analytics */}
            <div className="bg-white p-6 border border-stone-200 shadow-xs space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-bold uppercase tracking-wider text-stone-900">
                  Recent Orders
                </h3>
                <button
                  onClick={() => setActiveTab('orders')}
                  className="text-xs text-stone-600 hover:text-black font-semibold underline underline-offset-2"
                >
                  View All Orders
                </button>
              </div>

              <div className="divide-y divide-stone-100 text-xs">
                {orders.slice(0, 5).map((ord) => (
                  <div key={ord.id} className="py-3 flex items-center justify-between">
                    <div>
                      <span className="font-bold text-stone-900">#{ord.id}</span>
                      <span className="text-stone-400 pl-2">· {ord.customer.fullName} ({ord.customer.city})</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-mono font-bold">PKR {ord.total.toLocaleString()}</span>
                      <span className="uppercase text-[10px] px-2 py-0.5 bg-stone-100 font-bold">
                        {ord.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 2. PRODUCT MANAGEMENT VIEW */}
        {activeTab === 'products' && (
          <div className="space-y-6 animate-in fade-in duration-150">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 border border-stone-200">
              <div className="flex items-center gap-2 flex-1 max-w-md">
                <Search className="w-4 h-4 text-stone-400" />
                <input
                  type="text"
                  placeholder="Search products by title, category, or fabric..."
                  value={productSearch}
                  onChange={(e) => setProductSearch(e.target.value)}
                  className="w-full text-xs text-stone-900 focus:outline-none bg-transparent"
                />
              </div>

              <button
                onClick={handleOpenAddProduct}
                className="px-5 py-2.5 bg-stone-900 hover:bg-black text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Product</span>
              </button>
            </div>

            {/* Products Table */}
            <div className="bg-white border border-stone-200 overflow-x-auto shadow-xs">
              <table className="w-full text-left text-xs">
                <thead className="bg-stone-50 border-b border-stone-200 text-stone-500 uppercase tracking-wider text-[11px]">
                  <tr>
                    <th className="py-3 px-4">Item</th>
                    <th className="py-3 px-4">Category</th>
                    <th className="py-3 px-4">Price (PKR)</th>
                    <th className="py-3 px-4">Stock</th>
                    <th className="py-3 px-4">Badges</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100 font-sans">
                  {products
                    .filter((p) => p.name.toLowerCase().includes(productSearch.toLowerCase()))
                    .map((prod) => (
                      <tr key={prod.id} className="hover:bg-stone-50/70">
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            <img src={prod.images[0]} alt="" className="w-10 h-12 object-cover bg-stone-100" />
                            <div>
                              <span className="font-semibold text-stone-900 block">{prod.name}</span>
                              <span className="text-[10px] text-stone-400 font-mono">/{prod.slug}</span>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-4 uppercase text-[11px] font-medium text-stone-600">
                          {prod.category}
                        </td>
                        <td className="py-3 px-4 font-mono font-bold text-stone-900 tabular-nums">
                          PKR {prod.price.toLocaleString()}
                          {prod.compareAtPrice && prod.compareAtPrice > prod.price && (
                            <span className="block text-[10px] text-stone-400 line-through">
                              PKR {prod.compareAtPrice.toLocaleString()}
                            </span>
                          )}
                        </td>
                        <td className="py-3 px-4">
                          <span
                            className={`font-mono font-bold ${
                              prod.totalStock <= 5 ? 'text-red-600' : 'text-stone-800'
                            }`}
                          >
                            {prod.totalStock} units
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex flex-wrap gap-1">
                            {prod.isNewArrival && (
                              <span className="text-[9px] font-bold uppercase bg-stone-900 text-white px-1.5 py-0.5">
                                New
                              </span>
                            )}
                            {prod.isBestSeller && (
                              <span className="text-[9px] font-bold uppercase bg-amber-200 text-amber-900 px-1.5 py-0.5">
                                Best
                              </span>
                            )}
                            {prod.isFeatured && (
                              <span className="text-[9px] font-bold uppercase bg-blue-100 text-blue-900 px-1.5 py-0.5">
                                Featured
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => handleOpenEditProduct(prod)}
                              className="p-1.5 text-stone-600 hover:text-black hover:bg-stone-100 rounded"
                              title="Edit"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => deleteProduct(prod.id)}
                              className="p-1.5 text-stone-400 hover:text-red-600 hover:bg-stone-100 rounded"
                              title="Delete"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 3. ORDER MANAGEMENT VIEW */}
        {activeTab === 'orders' && (
          <div className="space-y-6 animate-in fade-in duration-150">
            {/* Search & Filter bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 border border-stone-200">
              <div className="flex items-center gap-2 flex-1 max-w-md">
                <Search className="w-4 h-4 text-stone-400" />
                <input
                  type="text"
                  placeholder="Search by order ID (#VAL-), customer name or phone..."
                  value={orderSearch}
                  onChange={(e) => setOrderSearch(e.target.value)}
                  className="w-full text-xs text-stone-900 focus:outline-none bg-transparent"
                />
              </div>

              <div className="flex items-center gap-2 text-xs">
                <span className="font-semibold uppercase tracking-wider text-stone-500">Status:</span>
                <select
                  value={orderStatusFilter}
                  onChange={(e) => setOrderStatusFilter(e.target.value)}
                  className="border border-stone-300 p-2 bg-white text-stone-900 font-medium"
                >
                  <option value="all">All Statuses</option>
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="processing">Processing</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
            </div>

            {/* Orders Table */}
            <div className="bg-white border border-stone-200 overflow-x-auto shadow-xs">
              <table className="w-full text-left text-xs">
                <thead className="bg-stone-50 border-b border-stone-200 text-stone-500 uppercase tracking-wider text-[11px]">
                  <tr>
                    <th className="py-3 px-4">Order ID</th>
                    <th className="py-3 px-4">Customer & City</th>
                    <th className="py-3 px-4">Total Amount</th>
                    <th className="py-3 px-4">Payment</th>
                    <th className="py-3 px-4">Courier & Tracking</th>
                    <th className="py-3 px-4">Update Status</th>
                    <th className="py-3 px-4 text-right">View</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100 font-sans">
                  {orders
                    .filter((o) => {
                      const matchSearch =
                        o.id.toLowerCase().includes(orderSearch.toLowerCase()) ||
                        o.customer.fullName.toLowerCase().includes(orderSearch.toLowerCase()) ||
                        o.customer.phone.includes(orderSearch);
                      const matchStatus = orderStatusFilter === 'all' || o.status === orderStatusFilter;
                      return matchSearch && matchStatus;
                    })
                    .map((ord) => (
                      <tr key={ord.id} className="hover:bg-stone-50/70">
                        <td className="py-3 px-4 font-mono font-bold text-stone-900">
                          #{ord.id}
                        </td>
                        <td className="py-3 px-4">
                          <span className="font-semibold block text-stone-900">{ord.customer.fullName}</span>
                          <span className="text-[10px] text-stone-500">{ord.customer.city} · {ord.customer.phone}</span>
                        </td>
                        <td className="py-3 px-4 font-mono font-bold text-stone-900 tabular-nums">
                          PKR {ord.total.toLocaleString()}
                        </td>
                        <td className="py-3 px-4">
                          <span className="uppercase text-[10px] font-bold px-2 py-0.5 bg-stone-100">
                            {ord.paymentMethod}
                          </span>
                        </td>
                        <td className="py-3 px-4 font-mono text-[11px] text-stone-600">
                          {ord.trackingNumber || 'Awaiting Dispatch'}
                        </td>
                        <td className="py-3 px-4">
                          <select
                            value={ord.status}
                            onChange={(e) => updateOrderStatus(ord.id, e.target.value as OrderStatus)}
                            className={`border text-[11px] font-bold p-1 uppercase ${
                              ord.status === 'delivered'
                                ? 'bg-emerald-50 text-emerald-900 border-emerald-300'
                                : ord.status === 'shipped'
                                ? 'bg-blue-50 text-blue-900 border-blue-300'
                                : ord.status === 'cancelled'
                                ? 'bg-rose-50 text-rose-900 border-rose-300'
                                : 'bg-amber-50 text-amber-900 border-amber-300'
                            }`}
                          >
                            <option value="pending">Pending</option>
                            <option value="confirmed">Confirmed</option>
                            <option value="processing">Processing</option>
                            <option value="shipped">Shipped</option>
                            <option value="delivered">Delivered</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <button
                            onClick={() => setSelectedOrder(ord)}
                            className="p-1.5 text-stone-600 hover:text-black hover:bg-stone-100 rounded cursor-pointer"
                            title="View Full Details"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 4. CUSTOMER MANAGEMENT VIEW */}
        {activeTab === 'customers' && (
          <div className="space-y-6 animate-in fade-in duration-150">
            <div className="bg-white border border-stone-200 overflow-x-auto shadow-xs">
              <table className="w-full text-left text-xs">
                <thead className="bg-stone-50 border-b border-stone-200 text-stone-500 uppercase tracking-wider text-[11px]">
                  <tr>
                    <th className="py-3 px-4">Customer Name</th>
                    <th className="py-3 px-4">Contact</th>
                    <th className="py-3 px-4">City</th>
                    <th className="py-3 px-4">Orders Placed</th>
                    <th className="py-3 px-4">Lifetime Spend</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {customers.map((cust, i) => (
                    <tr key={i} className="hover:bg-stone-50/70">
                      <td className="py-3 px-4 font-bold text-stone-900">
                        {cust.name}
                      </td>
                      <td className="py-3 px-4 font-mono text-stone-600">
                        {cust.email} · {cust.phone}
                      </td>
                      <td className="py-3 px-4 text-stone-800">
                        {cust.city}
                      </td>
                      <td className="py-3 px-4 font-mono font-bold text-stone-900">
                        {cust.orders}
                      </td>
                      <td className="py-3 px-4 font-mono font-bold text-stone-900 tabular-nums">
                        PKR {cust.totalSpent.toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 5. COUPONS VIEW */}
        {activeTab === 'coupons' && (
          <div className="space-y-6 animate-in fade-in duration-150">
            <div className="flex justify-between items-center bg-white p-4 border border-stone-200">
              <span className="text-xs uppercase font-bold tracking-wider text-stone-600">
                Active Store Promo Codes
              </span>
              <button
                onClick={() => setIsCouponModalOpen(true)}
                className="px-4 py-2 bg-stone-900 text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 hover:bg-black transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Create New Coupon</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {coupons.map((c) => (
                <div key={c.id} className="bg-white p-5 border border-stone-200 shadow-xs space-y-3">
                  <div className="flex justify-between items-start">
                    <span className="font-mono font-bold text-lg text-stone-950 px-2.5 py-1 bg-stone-100 border border-stone-200">
                      {c.code}
                    </span>
                    <button
                      onClick={() => toggleCoupon(c.code)}
                      className={`text-[10px] uppercase font-bold px-2 py-0.5 border ${
                        c.isActive
                          ? 'bg-emerald-100 text-emerald-900 border-emerald-300'
                          : 'bg-stone-100 text-stone-500 border-stone-300'
                      }`}
                    >
                      {c.isActive ? 'Active' : 'Disabled'}
                    </button>
                  </div>
                  <p className="text-xs text-stone-600">{c.description}</p>
                  <div className="text-[11px] text-stone-500 font-mono pt-1 border-t border-stone-100">
                    Min Cart: PKR {c.minOrderValue?.toLocaleString() || 0}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* Product Add / Edit Modal */}
      {isProductModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-2xl p-6 sm:p-8 space-y-4 max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex justify-between items-center border-b border-stone-200 pb-3">
              <h3 className="text-sm uppercase font-bold tracking-wider text-stone-900">
                {editingProduct ? 'Edit Product Details' : 'Add New Menswear Product'}
              </h3>
              <button onClick={() => setIsProductModalOpen(false)}>
                <X className="w-5 h-5 text-stone-400 hover:text-black" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold uppercase text-stone-700 mb-1">
                    Product Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={productFormData.name}
                    onChange={(e) => setProductFormData({ ...productFormData, name: e.target.value })}
                    className="w-full border border-stone-300 p-2.5"
                  />
                </div>
                <div>
                  <label className="block font-semibold uppercase text-stone-700 mb-1">
                    Category *
                  </label>
                  <select
                    value={productFormData.category}
                    onChange={(e) => setProductFormData({ ...productFormData, category: e.target.value as ProductCategory })}
                    className="w-full border border-stone-300 p-2.5"
                  >
                    <option value="shirts">Shirts</option>
                    <option value="t-shirts">T-Shirts</option>
                    <option value="polos">Polo Shirts</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-semibold uppercase text-stone-700 mb-1">
                    Price (PKR) *
                  </label>
                  <input
                    type="number"
                    required
                    value={productFormData.price}
                    onChange={(e) => setProductFormData({ ...productFormData, price: Number(e.target.value) })}
                    className="w-full border border-stone-300 p-2.5 font-mono"
                  />
                </div>
                <div>
                  <label className="block font-semibold uppercase text-stone-700 mb-1">
                    Compare at Price (PKR)
                  </label>
                  <input
                    type="number"
                    value={productFormData.compareAtPrice}
                    onChange={(e) => setProductFormData({ ...productFormData, compareAtPrice: Number(e.target.value) })}
                    className="w-full border border-stone-300 p-2.5 font-mono"
                  />
                </div>
                <div>
                  <label className="block font-semibold uppercase text-stone-700 mb-1">
                    Initial Stock Count
                  </label>
                  <input
                    type="number"
                    value={productFormData.initialStock}
                    onChange={(e) => setProductFormData({ ...productFormData, initialStock: Number(e.target.value) })}
                    className="w-full border border-stone-300 p-2.5 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold uppercase text-stone-700 mb-1">
                  Main Image URL *
                </label>
                <input
                  type="text"
                  required
                  value={productFormData.images[0]}
                  onChange={(e) => setProductFormData({ ...productFormData, images: [e.target.value] })}
                  className="w-full border border-stone-300 p-2.5"
                />
              </div>

              <div>
                <label className="block font-semibold uppercase text-stone-700 mb-1">
                  Fabric & Composition Details
                </label>
                <input
                  type="text"
                  value={productFormData.fabricDetails}
                  onChange={(e) => setProductFormData({ ...productFormData, fabricDetails: e.target.value })}
                  className="w-full border border-stone-300 p-2.5"
                />
              </div>

              <div>
                <label className="block font-semibold uppercase text-stone-700 mb-1">
                  Short Description
                </label>
                <textarea
                  rows={2}
                  value={productFormData.shortDescription}
                  onChange={(e) => setProductFormData({ ...productFormData, shortDescription: e.target.value })}
                  className="w-full border border-stone-300 p-2.5"
                />
              </div>

              {/* Badges */}
              <div className="flex gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={productFormData.isNewArrival}
                    onChange={(e) => setProductFormData({ ...productFormData, isNewArrival: e.target.checked })}
                    className="accent-stone-900"
                  />
                  <span>Mark as New Arrival</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={productFormData.isBestSeller}
                    onChange={(e) => setProductFormData({ ...productFormData, isBestSeller: e.target.checked })}
                    className="accent-stone-900"
                  />
                  <span>Mark as Best Seller</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={productFormData.isFeatured}
                    onChange={(e) => setProductFormData({ ...productFormData, isFeatured: e.target.checked })}
                    className="accent-stone-900"
                  />
                  <span>Mark as Featured</span>
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-stone-200">
                <button
                  type="button"
                  onClick={() => setIsProductModalOpen(false)}
                  className="px-4 py-2 border border-stone-300 text-stone-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-stone-900 text-white font-bold uppercase tracking-wider"
                >
                  Save Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Coupon Modal */}
      {isCouponModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md p-6 space-y-4 shadow-xl">
            <div className="flex justify-between items-center border-b border-stone-200 pb-3">
              <h3 className="text-sm uppercase font-bold tracking-wider text-stone-900">
                Create Discount Coupon
              </h3>
              <button onClick={() => setIsCouponModalOpen(false)}>
                <X className="w-5 h-5 text-stone-400 hover:text-black" />
              </button>
            </div>
            <form onSubmit={handleCreateCoupon} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold uppercase text-stone-700 mb-1">Coupon Code *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. AUTUMN20"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="w-full border border-stone-300 p-2 font-mono uppercase"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold uppercase text-stone-700 mb-1">Type</label>
                  <select
                    value={discountType}
                    onChange={(e) => setDiscountType(e.target.value as any)}
                    className="w-full border border-stone-300 p-2"
                  >
                    <option value="percentage">Percentage (%)</option>
                    <option value="fixed">Fixed PKR Off</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold uppercase text-stone-700 mb-1">Value</label>
                  <input
                    type="number"
                    required
                    value={discountValue}
                    onChange={(e) => setDiscountValue(Number(e.target.value))}
                    className="w-full border border-stone-300 p-2 font-mono"
                  />
                </div>
              </div>
              <div>
                <label className="block font-semibold uppercase text-stone-700 mb-1">Minimum Order (PKR)</label>
                <input
                  type="number"
                  value={minOrder}
                  onChange={(e) => setMinOrder(Number(e.target.value))}
                  className="w-full border border-stone-300 p-2 font-mono"
                />
              </div>
              <div>
                <label className="block font-semibold uppercase text-stone-700 mb-1">Description</label>
                <input
                  type="text"
                  placeholder="e.g. 20% off seasonal drop"
                  value={couponDesc}
                  onChange={(e) => setCouponDesc(e.target.value)}
                  className="w-full border border-stone-300 p-2"
                />
              </div>
              <div className="flex justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setIsCouponModalOpen(false)}
                  className="px-4 py-2 border border-stone-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-stone-900 text-white font-bold uppercase tracking-wider"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-2xl p-6 sm:p-8 space-y-4 max-h-[90vh] overflow-y-auto shadow-2xl text-xs">
            <div className="flex justify-between items-center border-b border-stone-200 pb-3">
              <div>
                <h3 className="text-sm font-bold text-stone-900">
                  Order #{selectedOrder.id}
                </h3>
                <p className="text-[11px] text-stone-400 font-mono">
                  {new Date(selectedOrder.createdAt).toLocaleString()}
                </p>
              </div>
              <button onClick={() => setSelectedOrder(null)}>
                <X className="w-5 h-5 text-stone-400 hover:text-black" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 bg-stone-50 p-4 border border-stone-200">
              <div>
                <strong className="block text-stone-900 mb-1">Customer & Address:</strong>
                <p>{selectedOrder.customer.fullName}</p>
                <p>{selectedOrder.customer.addressLine}</p>
                <p>{selectedOrder.customer.city}, {selectedOrder.customer.province}</p>
                <p className="font-mono">{selectedOrder.customer.phone}</p>
              </div>
              <div>
                <strong className="block text-stone-900 mb-1">Delivery & Courier:</strong>
                <p>Courier: {selectedOrder.courierPartner}</p>
                <p className="font-mono">Tracking: {selectedOrder.trackingNumber}</p>
                <p>Payment: {selectedOrder.paymentMethod.toUpperCase()} ({selectedOrder.paymentStatus})</p>
                <p>Status: <span className="font-bold text-stone-900 uppercase">{selectedOrder.status}</span></p>
              </div>
            </div>

            <div>
              <strong className="block text-stone-900 mb-2">Items:</strong>
              <div className="divide-y divide-stone-100">
                {selectedOrder.items.map((it, idx) => (
                  <div key={idx} className="py-2 flex justify-between items-center">
                    <span>{it.name} ({it.color}, {it.size}) × {it.quantity}</span>
                    <span className="font-mono font-bold">PKR {(it.price * it.quantity).toLocaleString()}</span>
                  </div>
                ))}
              </div>
              <div className="pt-3 border-t border-stone-200 flex justify-between text-sm font-bold font-mono">
                <span>Total Amount:</span>
                <span>PKR {selectedOrder.total.toLocaleString()}</span>
              </div>
            </div>

            <div className="flex justify-end pt-3">
              <button
                onClick={() => setSelectedOrder(null)}
                className="px-5 py-2 bg-stone-900 text-white font-bold uppercase tracking-wider"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
