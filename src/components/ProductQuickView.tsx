import React, { useState } from 'react';
import { X, Star, Heart, Check, Ruler, ArrowRight } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { ProductSize } from '../types';

export const ProductQuickView: React.FC = () => {
  const {
    quickViewProduct,
    closeQuickView,
    addToCart,
    toggleWishlist,
    isInWishlist,
    navigate,
    openSizeGuide
  } = useStore();

  const product = quickViewProduct;

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState<string>(
    product?.colors[0]?.name || ''
  );
  const [selectedSize, setSelectedSize] = useState<ProductSize | null>(
    product?.sizes[1] || product?.sizes[0] || 'M'
  );
  const [quantity, setQuantity] = useState(1);

  if (!product) return null;

  const isWish = isInWishlist(product.id);
  const stockKey = `${selectedColor}_${selectedSize}`;
  const availableStock = product.stock[stockKey] ?? 10;
  const isOutOfStock = availableStock <= 0;

  const handleAddToCart = () => {
    if (!selectedSize) return;
    addToCart(product, selectedSize, selectedColor, quantity);
    closeQuickView();
  };

  const handleViewFullDetails = () => {
    closeQuickView();
    navigate(`/product/${product.slug}`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-4xl bg-white shadow-2xl overflow-hidden max-h-[90vh] flex flex-col md:flex-row"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={closeQuickView}
          className="absolute top-4 right-4 z-20 p-2 text-stone-500 hover:text-stone-900 bg-white/80 rounded-full cursor-pointer transition-colors"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Gallery column */}
        <div className="md:w-1/2 bg-[#F6F6F4] p-4 flex flex-col justify-between">
          <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#ECECE9]">
            <img
              src={product.images[activeImageIndex] || product.images[0]}
              alt={product.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center"
            />
          </div>
          {product.images.length > 1 && (
            <div className="flex gap-2 pt-3 overflow-x-auto pb-1">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`w-14 h-18 shrink-0 overflow-hidden border-2 transition-all ${
                    activeImageIndex === idx ? 'border-black' : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product details column */}
        <div className="md:w-1/2 p-6 md:p-8 flex flex-col overflow-y-auto">
          <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-stone-500">
            <span>{product.subCategory}</span>
            <span aria-hidden="true">·</span>
            <span className="flex items-center gap-1 text-stone-800">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span className="font-semibold">{product.rating}</span>
              <span className="text-stone-400">({product.reviewCount} reviews)</span>
            </span>
          </div>

          <h2 className="text-xl md:text-2xl font-bold text-stone-900 mt-2 font-display">
            {product.name}
          </h2>

          <div className="flex items-baseline gap-3 mt-3">
            <span className="text-2xl font-bold text-stone-950 font-mono tabular-nums">
              PKR {product.price.toLocaleString()}
            </span>
            {product.compareAtPrice && (
              <span className="text-sm text-stone-400 line-through font-mono tabular-nums">
                PKR {product.compareAtPrice.toLocaleString()}
              </span>
            )}
            {product.discountPercent && (
              <span className="text-xs font-semibold px-2 py-0.5 bg-stone-900 text-white">
                Save {product.discountPercent}%
              </span>
            )}
          </div>

          <p className="text-sm text-stone-600 mt-4 leading-relaxed line-clamp-3">
            {product.shortDescription}
          </p>

          <hr className="my-5 border-stone-100" />

          {/* Color selector */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="font-medium uppercase tracking-wider text-stone-500">
                Color: <strong className="text-stone-900 font-semibold">{selectedColor}</strong>
              </span>
            </div>
            <div className="flex gap-2">
              {product.colors.map((c) => (
                <button
                  key={c.name}
                  onClick={() => setSelectedColor(c.name)}
                  className={`w-7 h-7 rounded-full border flex items-center justify-center transition-all ${
                    selectedColor === c.name
                      ? 'ring-2 ring-offset-2 ring-stone-900 border-transparent'
                      : 'border-stone-300 hover:scale-105'
                  }`}
                  style={{ backgroundColor: c.hex }}
                  title={c.name}
                >
                  {selectedColor === c.name && (
                    <Check
                      className={`w-3.5 h-3.5 ${
                        c.hex.toLowerCase() === '#ffffff' ? 'text-black' : 'text-white'
                      }`}
                    />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Size selector */}
          <div className="mt-5 space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-medium uppercase tracking-wider text-stone-500">
                Size: <strong className="text-stone-900 font-semibold">{selectedSize}</strong>
              </span>
              <button
                onClick={openSizeGuide}
                className="text-stone-700 hover:text-black flex items-center gap-1 underline underline-offset-2 text-[11px]"
              >
                <Ruler className="w-3.5 h-3.5" />
                <span>Size Guide</span>
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((sz) => {
                const stock = product.stock[`${selectedColor}_${sz}`] ?? 5;
                const out = stock <= 0;
                const isSelected = selectedSize === sz;
                return (
                  <button
                    key={sz}
                    disabled={out}
                    onClick={() => setSelectedSize(sz)}
                    className={`min-w-10 h-10 px-3 text-xs font-semibold uppercase tracking-wider transition-all border ${
                      isSelected
                        ? 'bg-stone-900 text-white border-stone-900'
                        : out
                        ? 'border-stone-200 text-stone-300 line-through cursor-not-allowed'
                        : 'border-stone-300 text-stone-800 hover:border-stone-800'
                    }`}
                  >
                    {sz}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quantity & CTA */}
          <div className="mt-6 flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <div className="flex items-center border border-stone-300">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-10 h-11 text-stone-600 hover:text-black flex items-center justify-center font-semibold"
                >
                  -
                </button>
                <span className="w-10 text-center text-sm font-semibold tabular-nums">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => Math.min(availableStock, q + 1))}
                  className="w-10 h-11 text-stone-600 hover:text-black flex items-center justify-center font-semibold"
                >
                  +
                </button>
              </div>

              <button
                disabled={isOutOfStock}
                onClick={handleAddToCart}
                className={`flex-1 h-11 px-6 text-xs uppercase font-bold tracking-widest transition-all ${
                  isOutOfStock
                    ? 'bg-stone-200 text-stone-400 cursor-not-allowed'
                    : 'bg-[#121212] text-white hover:bg-black cursor-pointer shadow-sm'
                }`}
              >
                {isOutOfStock ? 'Out of Stock' : 'Add to Bag'}
              </button>

              <button
                onClick={() => toggleWishlist(product.id)}
                className="w-11 h-11 border border-stone-300 flex items-center justify-center text-stone-700 hover:text-red-600 transition-colors"
                title={isWish ? 'Remove from Wishlist' : 'Add to Wishlist'}
              >
                <Heart className={`w-5 h-5 ${isWish ? 'fill-red-600 text-red-600' : ''}`} />
              </button>
            </div>

            <button
              onClick={handleViewFullDetails}
              className="mt-2 text-xs font-semibold tracking-wider text-stone-600 hover:text-black flex items-center justify-center gap-1.5 py-1 transition-colors"
            >
              <span>View Full Product Specifications</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
