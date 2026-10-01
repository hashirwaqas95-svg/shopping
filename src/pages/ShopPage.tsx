import React, { useState, useMemo } from 'react';
import { SlidersHorizontal, X, RotateCcw } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from '../components/ProductCard';
import { ProductCategory, ProductSize, SortOption } from '../types';

interface ShopPageProps {
  initialCategory?: ProductCategory;
}

export const ShopPage: React.FC<ShopPageProps> = ({ initialCategory = 'all' }) => {
  const { products, currentPath, navigate } = useStore();

  // Parse any query params if present (e.g. ?filter=new)
  const isNewArrivalFilter = currentPath.includes('filter=new');
  const isBestSellerFilter = currentPath.includes('filter=bestseller');

  // Filter States
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>(initialCategory);
  const [selectedSizes, setSelectedSizes] = useState<ProductSize[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState<number>(5000);
  const [onlyInStock, setOnlyInStock] = useState<boolean>(false);
  const [onlyOnSale, setOnlyOnSale] = useState<boolean>(false);
  const [selectedCollection, setSelectedCollection] = useState<string>('all');
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);

  // Sync category if URL changed
  React.useEffect(() => {
    if (initialCategory && initialCategory !== selectedCategory) {
      setSelectedCategory(initialCategory);
    }
  }, [initialCategory]);

  // Extract all unique colors and collections
  const allColors = useMemo(() => {
    const map = new Map<string, string>();
    products.forEach((p) => {
      p.colors.forEach((c) => {
        if (!map.has(c.name)) {
          map.set(c.name, c.hex);
        }
      });
    });
    return Array.from(map.entries()).map(([name, hex]) => ({ name, hex }));
  }, [products]);

  const collections = ['Oversized', 'Linen', 'Oxford', 'Sateen', 'Pique Polo'];

  const toggleSize = (size: ProductSize) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  const toggleColor = (color: string) => {
    setSelectedColors((prev) =>
      prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color]
    );
  };

  const resetFilters = () => {
    setSelectedCategory('all');
    setSelectedSizes([]);
    setSelectedColors([]);
    setMaxPrice(5000);
    setOnlyInStock(false);
    setOnlyOnSale(false);
    setSelectedCollection('all');
    setSortBy('featured');
    if (currentPath.includes('?')) {
      navigate('/shop');
    }
  };

  // Filter & Sort computation
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Category
    if (selectedCategory !== 'all') {
      result = result.filter((p) => p.category === selectedCategory);
    }

    // Special query params
    if (isNewArrivalFilter) {
      result = result.filter((p) => p.isNewArrival);
    }
    if (isBestSellerFilter) {
      result = result.filter((p) => p.isBestSeller);
    }

    // Sizes
    if (selectedSizes.length > 0) {
      result = result.filter((p) =>
        p.sizes.some((sz) => selectedSizes.includes(sz))
      );
    }

    // Colors
    if (selectedColors.length > 0) {
      result = result.filter((p) =>
        p.colors.some((c) => selectedColors.includes(c.name))
      );
    }

    // Price
    result = result.filter((p) => p.price <= maxPrice);

    // In Stock
    if (onlyInStock) {
      result = result.filter((p) => p.totalStock > 0);
    }

    // On Sale
    if (onlyOnSale) {
      result = result.filter((p) => p.discountPercent && p.discountPercent > 0);
    }

    // Collection tag
    if (selectedCollection !== 'all') {
      const tagLower = selectedCollection.toLowerCase();
      result = result.filter(
        (p) =>
          p.tags?.some((t) => t.toLowerCase().includes(tagLower)) ||
          p.name.toLowerCase().includes(tagLower)
      );
    }

    // Sorting
    switch (sortBy) {
      case 'newest':
        result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'best-selling':
        result.sort((a, b) => (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0));
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'featured':
      default:
        result.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
        break;
    }

    return result;
  }, [
    products,
    selectedCategory,
    isNewArrivalFilter,
    isBestSellerFilter,
    selectedSizes,
    selectedColors,
    maxPrice,
    onlyInStock,
    onlyOnSale,
    selectedCollection,
    sortBy
  ]);

  const activeFiltersCount =
    (selectedCategory !== 'all' ? 1 : 0) +
    selectedSizes.length +
    selectedColors.length +
    (maxPrice < 5000 ? 1 : 0) +
    (onlyInStock ? 1 : 0) +
    (onlyOnSale ? 1 : 0) +
    (selectedCollection !== 'all' ? 1 : 0);

  const getPageTitle = () => {
    if (isNewArrivalFilter) return 'NEW ARRIVALS';
    if (isBestSellerFilter) return 'BEST SELLERS';
    if (selectedCategory === 'shirts') return 'MEN’S SHIRTS';
    if (selectedCategory === 't-shirts') return 'MEN’S T-SHIRTS';
    if (selectedCategory === 'polos') return 'POLO SHIRTS';
    return 'SHOP ALL MENSWEAR';
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Header Banner */}
      <div className="border-b border-stone-200 pb-6 mb-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-stone-400 mb-1">
              <span>Valiant</span>
              <span>/</span>
              <span>Catalog</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-stone-900 font-display">
              {getPageTitle()}
            </h1>
            <p className="text-xs sm:text-sm text-stone-500 mt-1">
              Showing {filteredProducts.length} premium handcrafted garments.
            </p>
          </div>

          {/* Controls: Filter toggle & Sort Dropdown */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsFilterDrawerOpen(true)}
              className="lg:hidden px-4 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-900 text-xs font-semibold uppercase tracking-wider flex items-center gap-2 transition-colors cursor-pointer"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Filters ({activeFiltersCount})</span>
            </button>

            <div className="flex items-center gap-2">
              <span className="text-xs uppercase font-medium text-stone-500 hidden sm:inline">
                Sort By:
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="bg-white border border-stone-300 text-stone-900 text-xs font-medium py-2 px-3 focus:outline-none focus:border-stone-900 cursor-pointer"
              >
                <option value="featured">Featured Collection</option>
                <option value="newest">Newest Releases</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="best-selling">Best Selling</option>
                <option value="rating">Customer Rating</option>
              </select>
            </div>
          </div>
        </div>

        {/* Active Filter Chips */}
        {activeFiltersCount > 0 && (
          <div className="flex flex-wrap items-center gap-2 pt-4">
            <span className="text-xs text-stone-400 uppercase tracking-wider font-semibold">
              Active Filters:
            </span>
            {selectedCategory !== 'all' && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-stone-100 text-stone-800 text-xs">
                Category: {selectedCategory}
                <button onClick={() => setSelectedCategory('all')}>
                  <X className="w-3 h-3 hover:text-black" />
                </button>
              </span>
            )}
            {selectedSizes.map((sz) => (
              <span key={sz} className="inline-flex items-center gap-1 px-2.5 py-1 bg-stone-100 text-stone-800 text-xs">
                Size: {sz}
                <button onClick={() => toggleSize(sz)}>
                  <X className="w-3 h-3 hover:text-black" />
                </button>
              </span>
            ))}
            {selectedColors.map((c) => (
              <span key={c} className="inline-flex items-center gap-1 px-2.5 py-1 bg-stone-100 text-stone-800 text-xs">
                Color: {c}
                <button onClick={() => toggleColor(c)}>
                  <X className="w-3 h-3 hover:text-black" />
                </button>
              </span>
            ))}
            {maxPrice < 5000 && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-stone-100 text-stone-800 text-xs">
                Max PKR {maxPrice.toLocaleString()}
                <button onClick={() => setMaxPrice(5000)}>
                  <X className="w-3 h-3 hover:text-black" />
                </button>
              </span>
            )}
            {onlyInStock && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-stone-100 text-stone-800 text-xs">
                In Stock Only
                <button onClick={() => setOnlyInStock(false)}>
                  <X className="w-3 h-3 hover:text-black" />
                </button>
              </span>
            )}
            {onlyOnSale && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-stone-100 text-stone-800 text-xs">
                On Sale
                <button onClick={() => setOnlyOnSale(false)}>
                  <X className="w-3 h-3 hover:text-black" />
                </button>
              </span>
            )}

            <button
              onClick={resetFilters}
              className="text-xs text-stone-500 hover:text-black flex items-center gap-1 underline underline-offset-2 ml-2"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset All</span>
            </button>
          </div>
        )}
      </div>

      {/* Main Body: Desktop Sidebar + Product Grid */}
      <div className="flex gap-8 lg:gap-12">
        {/* Desktop Sidebar Filters */}
        <aside className="hidden lg:block w-64 shrink-0 space-y-8 pr-6 border-r border-stone-200">
          
          {/* Category Section */}
          <div className="space-y-3">
            <h3 className="text-xs uppercase font-bold tracking-widest text-stone-900">
              Category
            </h3>
            <div className="flex flex-col space-y-2 text-xs">
              {[
                { label: 'All Items', val: 'all' },
                { label: 'Shirts (Formal & Casual)', val: 'shirts' },
                { label: 'T-Shirts (Oversized & Basics)', val: 't-shirts' },
                { label: 'Polo T-Shirts', val: 'polos' }
              ].map((c) => (
                <button
                  key={c.val}
                  onClick={() => setSelectedCategory(c.val as ProductCategory)}
                  className={`text-left py-1 transition-colors ${
                    selectedCategory === c.val
                      ? 'font-bold text-stone-950 underline underline-offset-4'
                      : 'text-stone-600 hover:text-black'
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>

          <hr className="border-stone-100" />

          {/* Size Filter */}
          <div className="space-y-3">
            <h3 className="text-xs uppercase font-bold tracking-widest text-stone-900">
              Size
            </h3>
            <div className="grid grid-cols-3 gap-2">
              {(['XS', 'S', 'M', 'L', 'XL', 'XXL'] as ProductSize[]).map((sz) => {
                const isSelected = selectedSizes.includes(sz);
                return (
                  <button
                    key={sz}
                    onClick={() => toggleSize(sz)}
                    className={`py-2 text-xs font-semibold border transition-all ${
                      isSelected
                        ? 'bg-stone-900 text-white border-stone-900'
                        : 'border-stone-200 text-stone-700 hover:border-stone-800'
                    }`}
                  >
                    {sz}
                  </button>
                );
              })}
            </div>
          </div>

          <hr className="border-stone-100" />

          {/* Color Filter */}
          <div className="space-y-3">
            <h3 className="text-xs uppercase font-bold tracking-widest text-stone-900">
              Color Palette
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {allColors.slice(0, 8).map((c) => {
                const isSelected = selectedColors.includes(c.name);
                return (
                  <button
                    key={c.name}
                    onClick={() => toggleColor(c.name)}
                    className={`flex items-center gap-2 p-1.5 border text-left text-xs transition-colors ${
                      isSelected
                        ? 'border-stone-900 bg-stone-50 font-semibold'
                        : 'border-stone-200 text-stone-600 hover:border-stone-400'
                    }`}
                  >
                    <span
                      className="w-3.5 h-3.5 rounded-full border border-stone-300 shrink-0"
                      style={{ backgroundColor: c.hex }}
                    />
                    <span className="truncate">{c.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <hr className="border-stone-100" />

          {/* Price Range */}
          <div className="space-y-3">
            <div className="flex justify-between items-center text-xs">
              <h3 className="uppercase font-bold tracking-widest text-stone-900">
                Max Price
              </h3>
              <span className="font-mono font-bold text-stone-900">
                PKR {maxPrice.toLocaleString()}
              </span>
            </div>
            <input
              type="range"
              min="1500"
              max="5000"
              step="100"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-stone-900 cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-stone-400 font-mono">
              <span>PKR 1,500</span>
              <span>PKR 5,000</span>
            </div>
          </div>

          <hr className="border-stone-100" />

          {/* Availability & Sale */}
          <div className="space-y-2.5">
            <h3 className="text-xs uppercase font-bold tracking-widest text-stone-900 mb-2">
              Availability
            </h3>
            <label className="flex items-center gap-2 text-xs text-stone-700 cursor-pointer">
              <input
                type="checkbox"
                checked={onlyInStock}
                onChange={(e) => setOnlyInStock(e.target.checked)}
                className="accent-stone-900"
              />
              <span>In Stock Only</span>
            </label>
            <label className="flex items-center gap-2 text-xs text-stone-700 cursor-pointer">
              <input
                type="checkbox"
                checked={onlyOnSale}
                onChange={(e) => setOnlyOnSale(e.target.checked)}
                className="accent-stone-900"
              />
              <span>Discounted Items</span>
            </label>
          </div>
        </aside>

        {/* Product Grid Area: 4 columns desktop, 3 tablet, 2 mobile */}
        <main className="flex-1">
          {filteredProducts.length === 0 ? (
            <div className="py-20 text-center space-y-4 bg-stone-50 border border-stone-200/60 p-8">
              <p className="text-base font-semibold text-stone-800">
                No products match your selected filters.
              </p>
              <p className="text-xs text-stone-500 max-w-md mx-auto">
                Try expanding your price range or removing selected size/color filters to discover our collection.
              </p>
              <button
                onClick={resetFilters}
                className="px-6 py-2.5 bg-stone-900 text-white text-xs font-semibold uppercase tracking-wider hover:bg-black transition-colors"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </main>
      </div>

      {/* Mobile Filter Drawer Overlay */}
      {isFilterDrawerOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex justify-end">
          <div className="w-full max-w-sm bg-white h-full overflow-y-auto p-6 flex flex-col justify-between shadow-2xl">
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-stone-200 pb-4">
                <div className="flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4" />
                  <h3 className="text-sm uppercase font-bold tracking-wider">
                    Filters ({activeFiltersCount})
                  </h3>
                </div>
                <button
                  onClick={() => setIsFilterDrawerOpen(false)}
                  className="p-1 text-stone-500 hover:text-black"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Mobile Category */}
              <div className="space-y-2">
                <h4 className="text-xs uppercase font-bold text-stone-900">Category</h4>
                <div className="grid grid-cols-2 gap-2">
                  {['all', 'shirts', 't-shirts', 'polos'].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat as ProductCategory)}
                      className={`p-2 text-xs uppercase font-semibold border ${
                        selectedCategory === cat
                          ? 'bg-stone-900 text-white border-stone-900'
                          : 'border-stone-200 text-stone-700'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Mobile Size */}
              <div className="space-y-2">
                <h4 className="text-xs uppercase font-bold text-stone-900">Size</h4>
                <div className="grid grid-cols-3 gap-2">
                  {(['XS', 'S', 'M', 'L', 'XL', 'XXL'] as ProductSize[]).map((sz) => (
                    <button
                      key={sz}
                      onClick={() => toggleSize(sz)}
                      className={`py-2 text-xs font-semibold border ${
                        selectedSizes.includes(sz)
                          ? 'bg-stone-900 text-white border-stone-900'
                          : 'border-stone-200 text-stone-700'
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>

              {/* Mobile Max Price */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="font-bold uppercase text-stone-900">Max Price</span>
                  <span className="font-mono font-bold">PKR {maxPrice.toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  min="1500"
                  max="5000"
                  step="100"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-stone-900"
                />
              </div>

              {/* Mobile In Stock */}
              <div className="space-y-2 pt-2 border-t border-stone-100">
                <label className="flex items-center gap-2 text-xs text-stone-700">
                  <input
                    type="checkbox"
                    checked={onlyInStock}
                    onChange={(e) => setOnlyInStock(e.target.checked)}
                    className="accent-stone-900"
                  />
                  <span>In Stock Only</span>
                </label>
                <label className="flex items-center gap-2 text-xs text-stone-700">
                  <input
                    type="checkbox"
                    checked={onlyOnSale}
                    onChange={(e) => setOnlyOnSale(e.target.checked)}
                    className="accent-stone-900"
                  />
                  <span>Discounted Items</span>
                </label>
              </div>
            </div>

            <div className="pt-6 border-t border-stone-200 flex gap-3">
              <button
                onClick={resetFilters}
                className="flex-1 py-3 border border-stone-300 text-stone-800 text-xs font-semibold uppercase tracking-wider"
              >
                Reset
              </button>
              <button
                onClick={() => setIsFilterDrawerOpen(false)}
                className="flex-1 py-3 bg-stone-900 text-white text-xs font-bold uppercase tracking-wider"
              >
                Show Results
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
