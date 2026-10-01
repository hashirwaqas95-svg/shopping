import React, { useState, useMemo } from 'react';
import { Search, X, ArrowRight, Tag } from 'lucide-react';
import { useStore } from '../context/StoreContext';

const POPULAR_SEARCHES = [
  'Oversized black tee',
  'Oxford white shirt',
  'Navy polo',
  'Linen sand beige',
  '280 GSM',
  'Formal sateen',
  'Melange heather'
];

export const SearchModal: React.FC = () => {
  const { isSearchOpen, closeSearch, products, navigate } = useStore();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProducts = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    if (!q) return [];
    return products.filter((p) => {
      const matchName = p.name.toLowerCase().includes(q);
      const matchCategory = p.category.toLowerCase().includes(q) || p.subCategory.toLowerCase().includes(q);
      const matchTags = p.tags?.some(t => t.toLowerCase().includes(q));
      const matchColor = p.colors.some(c => c.name.toLowerCase().includes(q));
      const matchDesc = p.shortDescription.toLowerCase().includes(q);
      return matchName || matchCategory || matchTags || matchColor || matchDesc;
    });
  }, [searchTerm, products]);

  if (!isSearchOpen) return null;

  const handleSelectProduct = (slug: string) => {
    closeSearch();
    navigate(`/product/${slug}`);
  };

  const handlePopularClick = (term: string) => {
    setSearchTerm(term);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-start justify-center pt-16 sm:pt-24 px-4 animate-in fade-in duration-150">
      <div
        className="w-full max-w-2xl bg-white shadow-2xl overflow-hidden animate-in slide-in-from-top-4 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="p-4 sm:p-6 border-b border-stone-200 flex items-center gap-3">
          <Search className="w-5 h-5 text-stone-400 shrink-0" />
          <input
            type="text"
            autoFocus
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search shirts, oversized tees, polos, fabrics..."
            className="flex-1 text-base sm:text-lg text-stone-900 placeholder:text-stone-400 focus:outline-none bg-transparent"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="text-stone-400 hover:text-stone-600 text-xs uppercase tracking-wider font-semibold mr-2"
            >
              Clear
            </button>
          )}
          <button
            onClick={closeSearch}
            className="p-1.5 text-stone-400 hover:text-stone-900 rounded-full cursor-pointer"
            aria-label="Close search"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results or Suggestions */}
        <div className="max-h-[65vh] overflow-y-auto p-4 sm:p-6">
          {searchTerm.trim() === '' ? (
            <div className="space-y-6">
              <div>
                <h4 className="text-xs uppercase font-bold tracking-widest text-stone-400 mb-3 flex items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5" />
                  Popular Searches
                </h4>
                <div className="flex flex-wrap gap-2">
                  {POPULAR_SEARCHES.map((term) => (
                    <button
                      key={term}
                      onClick={() => handlePopularClick(term)}
                      className="px-3 py-1.5 bg-stone-100 hover:bg-stone-900 hover:text-white text-stone-700 text-xs rounded-full transition-colors cursor-pointer"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-stone-100">
                <h4 className="text-xs uppercase font-bold tracking-widest text-stone-400 mb-3">
                  Browse by Category
                </h4>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => {
                      closeSearch();
                      navigate('/shirts');
                    }}
                    className="p-3 bg-stone-50 hover:bg-stone-100 text-left border border-stone-200/60 transition-colors"
                  >
                    <span className="text-xs font-bold text-stone-900 block">Shirts</span>
                    <span className="text-[11px] text-stone-500">Casual & Formal</span>
                  </button>
                  <button
                    onClick={() => {
                      closeSearch();
                      navigate('/t-shirts');
                    }}
                    className="p-3 bg-stone-50 hover:bg-stone-100 text-left border border-stone-200/60 transition-colors"
                  >
                    <span className="text-xs font-bold text-stone-900 block">T-Shirts</span>
                    <span className="text-[11px] text-stone-500">Oversized & Basics</span>
                  </button>
                  <button
                    onClick={() => {
                      closeSearch();
                      navigate('/polos');
                    }}
                    className="p-3 bg-stone-50 hover:bg-stone-100 text-left border border-stone-200/60 transition-colors"
                  >
                    <span className="text-xs font-bold text-stone-900 block">Polos</span>
                    <span className="text-[11px] text-stone-500">Pique & Knit</span>
                  </button>
                </div>
              </div>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="py-12 text-center text-stone-500 space-y-2">
              <p className="text-sm font-semibold text-stone-800">
                No products found matching "{searchTerm}"
              </p>
              <p className="text-xs text-stone-400 max-w-sm mx-auto">
                Try searching for 'shirt', 'oversized', 'linen', 'polo', or browse our full collection.
              </p>
              <button
                onClick={() => {
                  closeSearch();
                  navigate('/shop');
                }}
                className="mt-3 inline-block px-4 py-2 bg-stone-900 text-white text-xs font-semibold uppercase tracking-wider"
              >
                Browse All Products
              </button>
            </div>
          ) : (
            <div>
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs uppercase font-bold tracking-wider text-stone-400">
                  {filteredProducts.length} Results Found
                </span>
              </div>
              <div className="divide-y divide-stone-100">
                {filteredProducts.map((prod) => (
                  <div
                    key={prod.id}
                    onClick={() => handleSelectProduct(prod.slug)}
                    className="py-3 flex items-center justify-between group cursor-pointer hover:bg-stone-50/80 px-2 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={prod.images[0]}
                        alt={prod.name}
                        className="w-12 h-14 object-cover bg-stone-100 shrink-0"
                      />
                      <div>
                        <div className="text-[10px] uppercase tracking-wider text-stone-400 font-medium">
                          {prod.subCategory}
                        </div>
                        <h4 className="text-xs font-semibold text-stone-900 group-hover:text-black line-clamp-1">
                          {prod.name}
                        </h4>
                        <div className="text-xs font-bold text-stone-900 font-mono mt-0.5">
                          PKR {prod.price.toLocaleString()}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-stone-400 group-hover:text-stone-900">
                      <span className="text-xs font-medium hidden sm:inline">View</span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
