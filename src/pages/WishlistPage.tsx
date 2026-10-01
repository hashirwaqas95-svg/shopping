import React from 'react';
import { Heart, ShoppingBag, ArrowRight } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from '../components/ProductCard';

export const WishlistPage: React.FC = () => {
  const { wishlist, products, navigate } = useStore();

  const wishlistedProducts = products.filter((p) => wishlist.includes(p.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="border-b border-stone-200 pb-5 mb-8">
        <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-stone-400 mb-1">
          <span>Valiant</span>
          <span>/</span>
          <span>Saved</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold font-display text-stone-900">
          My Wishlist
        </h1>
        <p className="text-xs text-stone-500 mt-1">
          {wishlistedProducts.length} {wishlistedProducts.length === 1 ? 'item' : 'items'} saved for later.
        </p>
      </div>

      {wishlistedProducts.length === 0 ? (
        <div className="py-24 text-center max-w-sm mx-auto space-y-4">
          <Heart className="w-14 h-14 text-stone-300 mx-auto stroke-[1.2]" />
          <h2 className="text-lg font-bold text-stone-900 uppercase tracking-wider font-display">
            Your Wishlist is Empty
          </h2>
          <p className="text-xs text-stone-500 leading-relaxed">
            Click the heart icon on any shirt, oversized tee, or polo to save it here while you decide.
          </p>
          <button
            onClick={() => navigate('/shop')}
            className="mt-3 px-8 py-3 bg-stone-900 text-white text-xs font-bold uppercase tracking-widest hover:bg-black transition-colors"
          >
            Explore Collection
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {wishlistedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};
