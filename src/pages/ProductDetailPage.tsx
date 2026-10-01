import React, { useState } from 'react';
import {
  Star,
  Heart,
  Truck,
  RotateCcw,
  ShieldCheck,
  Ruler,
  ChevronDown,
  ChevronUp,
  ShoppingBag,
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from '../components/ProductCard';
import { ProductSize } from '../types';

interface ProductDetailPageProps {
  slug: string;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ slug }) => {
  const {
    products,
    getProductBySlug,
    addToCart,
    toggleWishlist,
    isInWishlist,
    openSizeGuide,
    navigate,
    addToast
  } = useStore();

  const product = getProductBySlug(slug) || products[0];

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product?.colors[0]?.name || '');
  const [selectedSize, setSelectedSize] = useState<ProductSize | null>(
    product?.sizes[1] || product?.sizes[0] || 'M'
  );
  const [quantity, setQuantity] = useState(1);
  const [activeAccordion, setActiveAccordion] = useState<string>('description');
  const [cityPincode, setCityPincode] = useState('Lahore');
  const [zoomStyle, setZoomStyle] = useState<{ backgroundPosition: string; isZoomed: boolean }>({
    backgroundPosition: '0% 0%',
    isZoomed: false
  });

  // New review input state
  const [reviewName, setReviewName] = useState('');
  const [reviewCity, setReviewCity] = useState('');
  const [reviewComment, setReviewComment] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [localReviews, setLocalReviews] = useState(product?.reviews || []);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <p className="text-lg font-bold">Product not found.</p>
        <button
          onClick={() => navigate('/shop')}
          className="mt-4 px-6 py-2 bg-stone-900 text-white text-xs font-semibold uppercase tracking-wider"
        >
          Return to Shop
        </button>
      </div>
    );
  }

  const isWish = isInWishlist(product.id);
  const stockKey = `${selectedColor}_${selectedSize}`;
  const availableStock = product.stock[stockKey] ?? 10;
  const isOutOfStock = availableStock <= 0;

  const currentImage = product.images[activeImageIndex] || product.images[0];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomStyle({
      backgroundPosition: `${x}% ${y}%`,
      isZoomed: true
    });
  };

  const handleMouseLeave = () => {
    setZoomStyle({
      backgroundPosition: '0% 0%',
      isZoomed: false
    });
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      addToast('Please select a size first.', 'error');
      return;
    }
    addToCart(product, selectedSize, selectedColor, quantity);
  };

  const handleBuyNow = () => {
    if (!selectedSize) {
      addToast('Please select a size first.', 'error');
      return;
    }
    addToCart(product, selectedSize, selectedColor, quantity);
    navigate('/checkout');
  };

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewName || !reviewComment) {
      addToast('Please enter your name and comments.', 'error');
      return;
    }
    const newRev = {
      id: `rev-${Date.now()}`,
      author: reviewName,
      city: reviewCity || 'Pakistan',
      rating: reviewRating,
      date: 'Just now',
      title: 'Verified Customer Review',
      comment: reviewComment,
      verifiedPurchase: true,
      sizePurchased: selectedSize || 'L'
    };
    setLocalReviews([newRev, ...localReviews]);
    setReviewName('');
    setReviewCity('');
    setReviewComment('');
    addToast('Thank you! Your verified review has been submitted.');
  };

  // Related products from same category
  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs uppercase tracking-wider text-stone-400 mb-6 sm:mb-8">
        <button onClick={() => navigate('/')} className="hover:text-black">
          Home
        </button>
        <span>/</span>
        <button onClick={() => navigate('/shop')} className="hover:text-black">
          Shop
        </button>
        <span>/</span>
        <button
          onClick={() => navigate(`/${product.category}`)}
          className="hover:text-black"
        >
          {product.category}
        </button>
        <span>/</span>
        <span className="text-stone-900 font-semibold truncate max-w-[200px] sm:max-w-none">
          {product.name}
        </span>
      </nav>

      {/* Main PDP Grid: Gallery Left + Sticky Purchase Module Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
        
        {/* Gallery: 7 cols */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex flex-col-reverse md:flex-row gap-4">
            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-y-auto shrink-0 pb-2 md:pb-0 max-h-[560px]">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`w-16 h-22 sm:w-20 sm:h-26 overflow-hidden bg-stone-100 border-2 transition-all cursor-pointer ${
                      activeImageIndex === idx
                        ? 'border-stone-950'
                        : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${product.name} thumbnail ${idx + 1}`}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-center"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Main Image with Zoom Lens */}
            <div
              className="relative flex-1 aspect-[3/4] bg-[#F7F7F5] overflow-hidden cursor-crosshair group"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              <img
                src={currentImage}
                alt={product.name}
                referrerPolicy="no-referrer"
                className={`w-full h-full object-cover object-center transition-opacity duration-200 ${
                  zoomStyle.isZoomed ? 'opacity-0' : 'opacity-100'
                }`}
              />
              {/* Zoom overlay */}
              {zoomStyle.isZoomed && (
                <div
                  className="absolute inset-0 bg-no-repeat pointer-events-none"
                  style={{
                    backgroundImage: `url(${currentImage})`,
                    backgroundPosition: zoomStyle.backgroundPosition,
                    backgroundSize: '220%'
                  }}
                />
              )}

              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-1.5 z-10 pointer-events-none">
                {product.isNewArrival && (
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-black text-white px-2.5 py-1">
                    New Release
                  </span>
                )}
                {product.discountPercent && product.discountPercent > 0 && (
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-stone-900 text-white px-2.5 py-1">
                    Save {product.discountPercent}%
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Purchase Module: 5 cols (Sticky) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="space-y-2 border-b border-stone-200 pb-5">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase font-bold tracking-widest text-stone-500">
                {product.subCategory}
              </span>
              <button
                onClick={() => toggleWishlist(product.id)}
                className="flex items-center gap-1.5 text-xs text-stone-600 hover:text-red-600 transition-colors cursor-pointer"
              >
                <Heart className={`w-4 h-4 ${isWish ? 'fill-red-600 text-red-600' : ''}`} />
                <span>{isWish ? 'Wishlisted' : 'Save'}</span>
              </button>
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-stone-900 font-display">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-2 pt-1 text-xs">
              <div className="flex items-center text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3.5 h-3.5 ${
                      i < Math.floor(product.rating) ? 'fill-amber-400 text-amber-400' : 'text-stone-300'
                    }`}
                  />
                ))}
              </div>
              <span className="font-bold text-stone-900 tabular-nums">{product.rating}</span>
              <span className="text-stone-400">·</span>
              <a href="#reviews" className="text-stone-600 underline underline-offset-2">
                {product.reviewCount} customer reviews
              </a>
            </div>

            {/* Pricing in PKR with tabular nums */}
            <div className="flex items-baseline gap-3 pt-3">
              <span className="text-2xl sm:text-3xl font-bold text-stone-950 font-mono tabular-nums">
                PKR {product.price.toLocaleString()}
              </span>
              {product.compareAtPrice && product.compareAtPrice > product.price && (
                <span className="text-sm text-stone-400 line-through font-mono tabular-nums">
                  PKR {product.compareAtPrice.toLocaleString()}
                </span>
              )}
              {product.discountPercent && (
                <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 border border-emerald-200">
                  {product.discountPercent}% OFF
                </span>
              )}
            </div>

            <p className="text-xs text-stone-400 pt-1">
              Inclusive of all taxes. Free Nationwide Delivery on orders above PKR 3,000.
            </p>
          </div>

          {/* Color Selector */}
          <div className="space-y-2.5">
            <div className="flex justify-between items-center text-xs">
              <span className="font-semibold uppercase tracking-wider text-stone-600">
                Color: <strong className="text-stone-950">{selectedColor}</strong>
              </span>
            </div>
            <div className="flex items-center gap-3">
              {product.colors.map((c) => (
                <button
                  key={c.name}
                  onClick={() => setSelectedColor(c.name)}
                  className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all ${
                    selectedColor === c.name
                      ? 'ring-2 ring-offset-2 ring-stone-900 border-transparent scale-105'
                      : 'border-stone-300 hover:scale-105'
                  }`}
                  style={{ backgroundColor: c.hex }}
                  title={c.name}
                  aria-label={`Select color ${c.name}`}
                />
              ))}
            </div>
          </div>

          {/* Size Selector */}
          <div className="space-y-2.5">
            <div className="flex justify-between items-center text-xs">
              <span className="font-semibold uppercase tracking-wider text-stone-600">
                Size: <strong className="text-stone-950">{selectedSize}</strong>
              </span>
              <button
                onClick={openSizeGuide}
                className="text-stone-700 hover:text-black flex items-center gap-1 underline underline-offset-2 text-xs font-medium cursor-pointer"
              >
                <Ruler className="w-3.5 h-3.5" />
                <span>Size Guide</span>
              </button>
            </div>
            <div className="flex flex-wrap gap-2.5">
              {product.sizes.map((sz) => {
                const stock = product.stock[`${selectedColor}_${sz}`] ?? 8;
                const isOut = stock <= 0;
                const isSelected = selectedSize === sz;
                return (
                  <button
                    key={sz}
                    disabled={isOut}
                    onClick={() => setSelectedSize(sz)}
                    className={`min-w-12 h-11 px-3 text-xs font-bold uppercase tracking-wider transition-all border ${
                      isSelected
                        ? 'bg-stone-950 text-white border-stone-950 shadow-xs'
                        : isOut
                        ? 'border-stone-200 text-stone-300 line-through cursor-not-allowed bg-stone-50'
                        : 'border-stone-300 text-stone-800 hover:border-stone-900 bg-white'
                    }`}
                  >
                    {sz}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Stock & Dispatches note */}
          <div className="flex items-center gap-2 text-xs text-stone-700 bg-[#F8F8F6] p-3 border border-stone-200/60">
            <Sparkles className="w-3.5 h-3.5 text-stone-900 shrink-0" />
            <span>
              {isOutOfStock ? (
                <strong className="text-red-700 font-semibold">Currently Sold Out in this variant</strong>
              ) : (
                <>
                  <strong className="text-emerald-700 font-semibold">In Stock</strong> — Dispatches within 24 hours from Lahore Warehouse.
                </>
              )}
            </span>
          </div>

          {/* Quantity & CTA Buttons */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-3">
              {/* Stepper */}
              <div className="flex items-center border border-stone-300 h-12 bg-white">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-10 h-full text-stone-600 hover:text-black flex items-center justify-center font-bold text-sm"
                >
                  -
                </button>
                <span className="w-10 text-center text-sm font-bold tabular-nums">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => Math.min(availableStock, q + 1))}
                  className="w-10 h-full text-stone-600 hover:text-black flex items-center justify-center font-bold text-sm"
                >
                  +
                </button>
              </div>

              {/* Add to Cart */}
              <button
                disabled={isOutOfStock}
                onClick={handleAddToCart}
                className={`flex-1 h-12 px-6 text-xs font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${
                  isOutOfStock
                    ? 'bg-stone-200 text-stone-400 cursor-not-allowed'
                    : 'bg-[#121212] text-white hover:bg-black cursor-pointer shadow-md'
                }`}
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Bag</span>
              </button>
            </div>

            {/* Buy Now direct button */}
            <button
              disabled={isOutOfStock}
              onClick={handleBuyNow}
              className={`w-full h-12 text-xs font-bold uppercase tracking-widest transition-all border ${
                isOutOfStock
                  ? 'border-stone-200 text-stone-300 cursor-not-allowed'
                  : 'border-stone-900 text-stone-900 hover:bg-stone-900 hover:text-white cursor-pointer bg-white'
              }`}
            >
              Buy It Now (Fast Checkout)
            </button>
          </div>

          {/* Delivery & City Estimator */}
          <div className="border border-stone-200 p-4 space-y-3 text-xs bg-stone-50/50">
            <div className="flex items-center justify-between">
              <span className="font-bold text-stone-900 uppercase tracking-wider flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-stone-700" />
                Delivery to Pakistan
              </span>
              <select
                value={cityPincode}
                onChange={(e) => setCityPincode(e.target.value)}
                className="bg-white border border-stone-300 px-2 py-1 text-stone-800 font-medium"
              >
                <option value="Lahore">Lahore (1-2 days)</option>
                <option value="Karachi">Karachi (2-3 days)</option>
                <option value="Islamabad">Islamabad / RWP (2-3 days)</option>
                <option value="Faisalabad">Faisalabad (2-3 days)</option>
                <option value="Nationwide">Other Cities (3-4 days)</option>
              </select>
            </div>
            <p className="text-stone-600 leading-relaxed">
              Standard Courier via <strong>TCS Express & Leopards</strong>. Cash on Delivery (COD) accepted at doorstep without extra fee.
            </p>
            <div className="flex flex-wrap gap-4 text-stone-600 pt-1 text-[11px]">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-stone-900" />
                Cash on Delivery Available
              </span>
              <span className="flex items-center gap-1">
                <RotateCcw className="w-3.5 h-3.5 text-stone-900" />
                7-Day Doorstep Exchange
              </span>
            </div>
          </div>

        </div>
      </div>

      {/* Accordions for Specifications */}
      <div className="mt-16 sm:mt-24 border-t border-stone-200 pt-8 max-w-4xl mx-auto">
        <div className="divide-y divide-stone-200">
          
          {/* Description */}
          <div className="py-4">
            <button
              onClick={() => setActiveAccordion(activeAccordion === 'description' ? '' : 'description')}
              className="w-full flex items-center justify-between text-left text-sm uppercase font-bold tracking-wider text-stone-900 py-1"
            >
              <span>Product Description & Sartorial Vision</span>
              {activeAccordion === 'description' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
            {activeAccordion === 'description' && (
              <div className="pt-4 text-xs sm:text-sm text-stone-600 space-y-3 leading-relaxed animate-in fade-in duration-150">
                <p>{product.description}</p>
                <p>Designed with meticulous seam tolerances and tested under real wearing conditions to ensure comfort across all seasons in Pakistan.</p>
              </div>
            )}
          </div>

          {/* Fabric & Material */}
          <div className="py-4">
            <button
              onClick={() => setActiveAccordion(activeAccordion === 'fabric' ? '' : 'fabric')}
              className="w-full flex items-center justify-between text-left text-sm uppercase font-bold tracking-wider text-stone-900 py-1"
            >
              <span>Fabric Composition & Material Details</span>
              {activeAccordion === 'fabric' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
            {activeAccordion === 'fabric' && (
              <div className="pt-4 text-xs sm:text-sm text-stone-600 space-y-3 leading-relaxed animate-in fade-in duration-150">
                <p>
                  <strong>Composition:</strong> {product.fabricDetails}
                </p>
                <p>
                  We source our cotton yarns directly from ethical mills adhering to strict ISO environmental standards. Pre-shrunk and biopolished for silky, zero-lint smoothness.
                </p>
              </div>
            )}
          </div>

          {/* Size & Fit */}
          <div className="py-4">
            <button
              onClick={() => setActiveAccordion(activeAccordion === 'fit' ? '' : 'fit')}
              className="w-full flex items-center justify-between text-left text-sm uppercase font-bold tracking-wider text-stone-900 py-1"
            >
              <span>Size & Fit Guide</span>
              {activeAccordion === 'fit' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
            {activeAccordion === 'fit' && (
              <div className="pt-4 text-xs sm:text-sm text-stone-600 space-y-3 leading-relaxed animate-in fade-in duration-150">
                <p>
                  <strong>Silhouette:</strong> {product.fitDetails}
                </p>
                <p>
                  Model is 6'1" (185 cm) wearing size Large. If you prefer a trimmer silhouette in our oversized tees, choose one size down.
                </p>
                <button
                  onClick={openSizeGuide}
                  className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-stone-900 underline underline-offset-4"
                >
                  <Ruler className="w-3.5 h-3.5" />
                  View Detailed Measurement Chart
                </button>
              </div>
            )}
          </div>

          {/* Shipping & COD */}
          <div className="py-4">
            <button
              onClick={() => setActiveAccordion(activeAccordion === 'shipping' ? '' : 'shipping')}
              className="w-full flex items-center justify-between text-left text-sm uppercase font-bold tracking-wider text-stone-900 py-1"
            >
              <span>Nationwide Shipping & Cash on Delivery</span>
              {activeAccordion === 'shipping' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
            {activeAccordion === 'shipping' && (
              <div className="pt-4 text-xs sm:text-sm text-stone-600 space-y-2 leading-relaxed animate-in fade-in duration-150">
                <p>· Orders placed before 3:00 PM are processed same-day from Lahore.</p>
                <p>· Delivery takes 1–2 days for Lahore, 2–3 days for Karachi/Islamabad, and 3–4 days for other regions across Pakistan.</p>
                <p>· Free Delivery on cart value over PKR 3,000. Flat PKR 250 for orders below.</p>
                <p>· Cash on Delivery (COD), Direct Bank Transfer, and Card payments accepted.</p>
              </div>
            )}
          </div>

          {/* Care Instructions */}
          <div className="py-4">
            <button
              onClick={() => setActiveAccordion(activeAccordion === 'care' ? '' : 'care')}
              className="w-full flex items-center justify-between text-left text-sm uppercase font-bold tracking-wider text-stone-900 py-1"
            >
              <span>Care & Washing Instructions</span>
              {activeAccordion === 'care' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
            {activeAccordion === 'care' && (
              <ul className="pt-4 text-xs sm:text-sm text-stone-600 space-y-2 list-disc list-inside leading-relaxed animate-in fade-in duration-150">
                {product.careInstructions.map((ins, i) => (
                  <li key={i}>{ins}</li>
                ))}
              </ul>
            )}
          </div>

        </div>
      </div>

      {/* Customer Reviews Section */}
      <section id="reviews" className="mt-20 border-t border-stone-200 pt-12 max-w-4xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-stone-900 font-display">
              Customer Reviews ({localReviews.length})
            </h2>
            <div className="flex items-center gap-2 mt-1 text-xs text-stone-500">
              <span className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </span>
              <span className="font-bold text-stone-900">{product.rating} out of 5 stars</span>
            </div>
          </div>
        </div>

        {/* Existing Reviews List */}
        <div className="space-y-6">
          {localReviews.map((rev) => (
            <div key={rev.id} className="p-6 bg-stone-50 border border-stone-200/60 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider">
                    {rev.author}
                  </h4>
                  <div className="text-[11px] text-stone-400 flex items-center gap-2 mt-0.5">
                    <span>{rev.city}</span>
                    <span>·</span>
                    <span>{rev.date}</span>
                    {rev.sizePurchased && (
                      <>
                        <span>·</span>
                        <span>Size Purchased: {rev.sizePurchased}</span>
                      </>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-1 text-emerald-700 text-xs font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Verified Buyer</span>
                </div>
              </div>

              <div className="flex items-center gap-1 text-amber-400">
                {[...Array(rev.rating)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                ))}
              </div>

              <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
                "{rev.comment}"
              </p>
            </div>
          ))}
        </div>

        {/* Add Review Form */}
        <div className="mt-10 p-6 sm:p-8 bg-white border border-stone-200 space-y-4">
          <h3 className="text-sm uppercase font-bold tracking-wider text-stone-900">
            Write a Review
          </h3>
          <p className="text-xs text-stone-500">
            Have you worn this piece? Share your sizing and fabric impressions with other customers.
          </p>

          <form onSubmit={handleAddReview} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block uppercase tracking-wider font-semibold text-stone-700 mb-1">
                  Your Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Asad Qureshi"
                  value={reviewName}
                  onChange={(e) => setReviewName(e.target.value)}
                  className="w-full border border-stone-300 p-2.5 bg-white text-stone-900 focus:outline-none focus:border-stone-900"
                />
              </div>
              <div>
                <label className="block uppercase tracking-wider font-semibold text-stone-700 mb-1">
                  City (in Pakistan)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Lahore, Karachi, Islamabad"
                  value={reviewCity}
                  onChange={(e) => setReviewCity(e.target.value)}
                  className="w-full border border-stone-300 p-2.5 bg-white text-stone-900 focus:outline-none focus:border-stone-900"
                />
              </div>
            </div>

            <div>
              <label className="block uppercase tracking-wider font-semibold text-stone-700 mb-1">
                Rating
              </label>
              <select
                value={reviewRating}
                onChange={(e) => setReviewRating(Number(e.target.value))}
                className="border border-stone-300 p-2 bg-white text-stone-900 focus:outline-none"
              >
                <option value={5}>5 Stars - Outstanding Quality</option>
                <option value={4}>4 Stars - Great Fitting</option>
                <option value={3}>3 Stars - Average</option>
                <option value={2}>2 Stars - Subpar</option>
                <option value={1}>1 Star - Dissatisfied</option>
              </select>
            </div>

            <div>
              <label className="block uppercase tracking-wider font-semibold text-stone-700 mb-1">
                Your Review *
              </label>
              <textarea
                rows={3}
                required
                placeholder="How was the collar, the weight of the fabric, and the overall fit?"
                value={reviewComment}
                onChange={(e) => setReviewComment(e.target.value)}
                className="w-full border border-stone-300 p-2.5 bg-white text-stone-900 focus:outline-none focus:border-stone-900"
              />
            </div>

            <button
              type="submit"
              className="px-6 py-3 bg-stone-900 text-white text-xs font-bold uppercase tracking-wider hover:bg-black transition-colors cursor-pointer"
            >
              Submit Review
            </button>
          </form>
        </div>
      </section>

      {/* You May Also Like */}
      {relatedProducts.length > 0 && (
        <section className="mt-20 sm:mt-28 border-t border-stone-200 pt-12">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-xs uppercase font-bold tracking-[0.2em] text-stone-400">
              Curated Recommendations
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 mt-1 font-display">
              You May Also Like
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
