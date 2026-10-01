import React, { useState } from 'react';
import { Heart, Eye, ShoppingBag, Star } from 'lucide-react';
import { Product, ProductSize } from '../types';
import { useStore } from '../context/StoreContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const {
    navigate,
    toggleWishlist,
    isInWishlist,
    openQuickView,
    addToCart
  } = useStore();

  const [isHovered, setIsHovered] = useState(false);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name || 'Default');
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [showQuickSizes, setShowQuickSizes] = useState(false);

  const isWish = isInWishlist(product.id);
  const hasMultipleImages = product.images.length > 1;

  const currentDisplayImage =
    isHovered && hasMultipleImages && selectedImageIndex === 0
      ? product.images[1]
      : product.images[selectedImageIndex] || product.images[0];

  const handleCardClick = () => {
    navigate(`/product/${product.slug}`);
  };

  const handleQuickAdd = (size: ProductSize, e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, size, selectedColor, 1);
    setShowQuickSizes(false);
  };

  return (
    <div
      className="group relative flex flex-col transition-all duration-200"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setShowQuickSizes(false);
      }}
    >
      {/* Image container */}
      <div
        onClick={handleCardClick}
        className="relative w-full aspect-[3/4] bg-[#F4F4F2] overflow-hidden cursor-pointer"
      >
        <img
          src={currentDisplayImage}
          alt={product.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-103"
          loading="lazy"
        />

        {/* Badges (subtle text tag, max 1) */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 z-10">
          {product.isNewArrival && (
            <span className="text-[10px] font-semibold tracking-wider uppercase bg-[#121212] text-white px-2 py-0.5">
              New
            </span>
          )}
          {product.discountPercent && product.discountPercent > 0 && !product.isNewArrival && (
            <span className="text-[10px] font-semibold tracking-wider uppercase bg-stone-900 text-white px-2 py-0.5">
              -{product.discountPercent}%
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center text-stone-700 hover:text-red-600 transition-all shadow-xs cursor-pointer z-10"
          aria-label={isWish ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart
            className={`w-4 h-4 transition-colors ${
              isWish ? 'fill-red-600 text-red-600' : 'text-stone-700'
            }`}
          />
        </button>

        {/* Quick View and Quick Size Select Bar on Desktop Hover */}
        <div className="absolute bottom-0 inset-x-0 p-2.5 flex flex-col gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10 bg-gradient-to-t from-black/40 via-black/10 to-transparent">
          {showQuickSizes ? (
            <div
              onClick={(e) => e.stopPropagation()}
              className="bg-white p-2 shadow-lg flex items-center justify-center gap-1.5 animate-in fade-in zoom-in-95 duration-150"
            >
              <span className="text-[10px] uppercase font-bold tracking-wider text-stone-500 mr-1">
                Size:
              </span>
              {product.sizes.map((sz) => {
                const stock = product.stock[`${selectedColor}_${sz}`] ?? 5;
                const isOutOfStock = stock <= 0;
                return (
                  <button
                    key={sz}
                    disabled={isOutOfStock}
                    onClick={(e) => handleQuickAdd(sz, e)}
                    className={`min-w-6 h-6 px-1 text-[11px] font-semibold tracking-tight transition-colors border ${
                      isOutOfStock
                        ? 'border-stone-200 text-stone-300 line-through cursor-not-allowed'
                        : 'border-stone-800 text-stone-900 hover:bg-stone-900 hover:text-white'
                    }`}
                  >
                    {sz}
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="flex gap-1.5">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowQuickSizes(true);
                }}
                className="flex-1 bg-white hover:bg-stone-900 hover:text-white text-stone-900 py-2 px-3 text-xs font-semibold tracking-wider uppercase transition-colors flex items-center justify-center gap-1.5 shadow-sm"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Quick Add</span>
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  openQuickView(product);
                }}
                className="bg-white hover:bg-stone-900 hover:text-white text-stone-900 p-2 text-xs transition-colors flex items-center justify-center shadow-sm"
                aria-label="Quick preview"
                title="Quick View"
              >
                <Eye className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Product metadata */}
      <div className="pt-3 pb-1 flex flex-col gap-1">
        {/* Category & Fit metadata unboxed */}
        <div className="flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-stone-500 font-medium">
          <span>{product.subCategory}</span>
          {product.rating && (
            <>
              <span aria-hidden="true">·</span>
              <span className="flex items-center gap-0.5 text-stone-700">
                <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                <span className="font-semibold tabular-nums">{product.rating}</span>
                <span className="text-stone-400">({product.reviewCount})</span>
              </span>
            </>
          )}
        </div>

        {/* Title */}
        <button
          onClick={handleCardClick}
          className="text-left text-sm font-semibold text-stone-900 hover:text-stone-600 transition-colors line-clamp-1 cursor-pointer"
        >
          {product.name}
        </button>

        {/* Pricing in PKR with tabular numbers */}
        <div className="flex items-baseline gap-2 pt-0.5">
          <span className="text-sm font-bold text-stone-950 font-mono tabular-nums">
            PKR {product.price.toLocaleString()}
          </span>
          {product.compareAtPrice && product.compareAtPrice > product.price && (
            <span className="text-xs text-stone-400 line-through font-mono tabular-nums">
              PKR {product.compareAtPrice.toLocaleString()}
            </span>
          )}
        </div>

        {/* Color swatches */}
        {product.colors.length > 1 && (
          <div className="flex items-center gap-1.5 pt-1">
            {product.colors.map((c, i) => (
              <button
                key={c.name}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedColor(c.name);
                  if (c.image) {
                    // switch image if color has dedicated image
                  }
                }}
                className={`w-3.5 h-3.5 rounded-full border transition-all ${
                  selectedColor === c.name
                    ? 'ring-1 ring-offset-1 ring-stone-900 border-transparent scale-110'
                    : 'border-stone-300 hover:scale-105'
                }`}
                style={{ backgroundColor: c.hex }}
                title={c.name}
                aria-label={`Select color ${c.name}`}
              />
            ))}
            <span className="text-[10px] text-stone-400 pl-1">
              {product.colors.length} colors
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
