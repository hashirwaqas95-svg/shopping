import React from 'react';
import { ArrowRight, Star, CheckCircle2, Sparkles, ChevronRight } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from '../components/ProductCard';
import { CAMPAIGN_ASSETS } from '../data/mockProducts';

const INSTAGRAM_PHOTOS = [
  {
    image: CAMPAIGN_ASSETS.shirtCategory,
    caption: 'The Oxford Classic in pure white linen weave.',
    tag: '#ValiantShirts'
  },
  {
    image: CAMPAIGN_ASSETS.oversizedTeeCategory,
    caption: '280 GSM heavyweight black drop-shoulder drape.',
    tag: '#ValiantStreet'
  },
  {
    image: CAMPAIGN_ASSETS.poloCategory,
    caption: 'Fine gauge navy pique with mother-of-pearl buttons.',
    tag: '#ValiantPolos'
  },
  {
    image: CAMPAIGN_ASSETS.hero,
    caption: 'Sand beige flax linen for warm weekend ease.',
    tag: '#ValiantLinen'
  }
];

const TESTIMONIALS = [
  {
    name: 'Mustafa K. Farooqi',
    city: 'DHA Phase 6, Lahore',
    role: 'Creative Director',
    quote: 'Finding heavyweight 280 GSM T-shirts in Pakistan that do not shrink or lose collar elasticity after three washes was near impossible until I tried VALIANT. The boxy drape is truly international standard.',
    rating: 5,
    product: '280 GSM Heavyweight Oversized Tee'
  },
  {
    name: 'Dr. Daniyal Qureshi',
    city: 'Clifton, Karachi',
    role: 'Surgeon & Fashion Enthusiast',
    quote: 'The Oxford White Tailored Shirt is phenomenal for hospital rounds and evening dinners alike. The fabric feels crisp yet completely breathable in Karachi humidity. Delivery took just 2 days via TCS.',
    rating: 5,
    product: 'Oxford White Tailored Shirt'
  },
  {
    name: 'Shehroz Babar',
    city: 'Sector F-7, Islamabad',
    role: 'Tech Founder',
    quote: 'Great quality and the fitting is exactly what I expected. The mercerized pique polo has a subtle luxury sheen that looks custom-tailored. Customer service was super responsive on WhatsApp too.',
    rating: 5,
    product: 'Classic Navy Mercerized Polo'
  }
];

export const HomePage: React.FC = () => {
  const { products, navigate } = useStore();

  const newArrivals = products.filter((p) => p.isNewArrival).slice(0, 4);
  const bestSellers = products.filter((p) => p.isBestSeller).slice(0, 4);

  return (
    <div className="space-y-16 md:space-y-24">
      {/* 3. Hero Section (Large full-width fashion hero banner) */}
      <section className="relative w-full min-h-[580px] lg:min-h-[720px] bg-stone-900 overflow-hidden flex items-center">
        <img
          src={CAMPAIGN_ASSETS.hero}
          alt="VALIANT Menswear Campaign"
          className="absolute inset-0 w-full h-full object-cover object-top opacity-80"
          loading="eager"
        />
        {/* Measured dark scrim gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-transparent" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
          <div className="max-w-2xl space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase text-stone-300">
              <Sparkles className="w-3.5 h-3.5 text-stone-300" />
              <span>Autumn / Winter 2026 Collection</span>
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.05] font-display">
              STYLE THAT SPEAKS FOR YOU.
            </h1>

            <p className="text-base sm:text-xl text-stone-300 max-w-xl font-light leading-relaxed">
              Premium shirts and T-shirts designed for your everyday look. Tailored with meticulous fabrics and enduring craftsmanship.
            </p>

            <div className="pt-4 flex flex-wrap gap-4">
              <button
                onClick={() => navigate('/shirts')}
                className="px-8 py-4 bg-white text-stone-950 hover:bg-stone-100 text-xs sm:text-sm font-bold tracking-widest uppercase transition-all shadow-lg hover:shadow-xl cursor-pointer"
              >
                Shop Shirts
              </button>
              <button
                onClick={() => navigate('/t-shirts')}
                className="px-8 py-4 bg-transparent border-2 border-white text-white hover:bg-white hover:text-stone-950 text-xs sm:text-sm font-bold tracking-widest uppercase transition-all cursor-pointer"
              >
                Shop T-Shirts
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Featured Categories (Large visual category cards) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="text-xs uppercase font-bold tracking-[0.2em] text-stone-400">
            Curated Categories
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 mt-1 font-display">
            The Essentials Wardrobe
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {/* Card 1: Shirts */}
          <div
            onClick={() => navigate('/shirts')}
            className="group relative aspect-[4/5] bg-stone-100 overflow-hidden cursor-pointer"
          >
            <img
              src={CAMPAIGN_ASSETS.shirtCategory}
              alt="Men's Shirts"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8 text-white space-y-2">
              <h3 className="text-xl sm:text-2xl font-bold uppercase tracking-wider font-display">
                SHIRTS
              </h3>
              <p className="text-xs sm:text-sm text-stone-300">
                Refined styles for every occasion.
              </p>
              <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-white pt-2 border-b border-white group-hover:gap-2.5 transition-all">
                <span>Shop Now</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>

          {/* Card 2: T-Shirts */}
          <div
            onClick={() => navigate('/t-shirts')}
            className="group relative aspect-[4/5] bg-stone-100 overflow-hidden cursor-pointer"
          >
            <img
              src={CAMPAIGN_ASSETS.oversizedTeeCategory}
              alt="Men's T-Shirts"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8 text-white space-y-2">
              <h3 className="text-xl sm:text-2xl font-bold uppercase tracking-wider font-display">
                T-SHIRTS
              </h3>
              <p className="text-xs sm:text-sm text-stone-300">
                Premium everyday essentials.
              </p>
              <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-white pt-2 border-b border-white group-hover:gap-2.5 transition-all">
                <span>Shop Now</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>

          {/* Card 3: Polo T-Shirts */}
          <div
            onClick={() => navigate('/polos')}
            className="group relative aspect-[4/5] bg-stone-100 overflow-hidden cursor-pointer"
          >
            <img
              src={CAMPAIGN_ASSETS.poloCategory}
              alt="Men's Polo Shirts"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8 text-white space-y-2">
              <h3 className="text-xl sm:text-2xl font-bold uppercase tracking-wider font-display">
                POLO T-SHIRTS
              </h3>
              <p className="text-xs sm:text-sm text-stone-300">
                Classic. Clean. Comfortable.
              </p>
              <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-white pt-2 border-b border-white group-hover:gap-2.5 transition-all">
                <span>Shop Now</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 5. New Arrivals (4-8 products in responsive grid) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs uppercase font-bold tracking-[0.2em] text-stone-400">
              Fresh Off The Loom
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 mt-1 font-display">
              New Arrivals
            </h2>
          </div>
          <button
            onClick={() => navigate('/shop?filter=new')}
            className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-stone-800 hover:text-black hover:gap-2.5 transition-all"
          >
            <span>View All New Releases</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {newArrivals.map((prod) => (
            <ProductCard key={prod.id} product={prod} />
          ))}
        </div>
      </section>

      {/* 7. Promotional Banner */}
      <section className="relative w-full bg-stone-900 text-white overflow-hidden">
        <div className="relative min-h-[420px] flex items-center">
          <img
            src={CAMPAIGN_ASSETS.promoBanner}
            alt="VALIANT Campaign Upgrade"
            className="absolute inset-0 w-full h-full object-cover object-center opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/30" />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full">
            <div className="max-w-xl space-y-4">
              <span className="text-xs uppercase font-bold tracking-[0.25em] text-stone-400 block">
                Exclusive Fabric Selection
              </span>
              <h2 className="text-3xl sm:text-5xl font-bold tracking-tight font-display text-white">
                UPGRADE YOUR EVERYDAY STYLE
              </h2>
              <p className="text-sm sm:text-base text-stone-300 font-light">
                Premium fashion. Made for your wardrobe. High-density textiles engineered to look sharp and stay cool.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => navigate('/shop')}
                  className="px-8 py-3.5 bg-white text-stone-900 hover:bg-stone-100 text-xs font-bold tracking-widest uppercase transition-colors cursor-pointer shadow-lg"
                >
                  Shop Collection
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Best Sellers */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs uppercase font-bold tracking-[0.2em] text-stone-400">
              Customer Favorites
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 mt-1 font-display">
              Best Sellers
            </h2>
          </div>
          <button
            onClick={() => navigate('/shop?filter=bestseller')}
            className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-stone-800 hover:text-black hover:gap-2.5 transition-all"
          >
            <span>View All Best Sellers</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {bestSellers.map((prod) => (
            <ProductCard key={prod.id} product={prod} />
          ))}
        </div>
      </section>

      {/* 9. Customer Reviews */}
      <section className="bg-[#F8F8F6] py-16 sm:py-20 border-y border-stone-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-12 space-y-2">
            <span className="text-xs uppercase font-bold tracking-[0.2em] text-stone-500">
              Verified Feedback
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 font-display">
              Worn & Trusted Across Pakistan
            </h2>
            <p className="text-xs text-stone-500">
              Real reviews from real gentlemen in Lahore, Karachi, Islamabad and beyond.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {TESTIMONIALS.map((t, idx) => (
              <div
                key={idx}
                className="bg-white p-6 sm:p-8 border border-stone-200/70 shadow-xs flex flex-col justify-between space-y-6"
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-xs sm:text-sm text-stone-700 leading-relaxed italic">
                    "{t.quote}"
                  </p>
                </div>

                <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider">
                      {t.name}
                    </h4>
                    <p className="text-[11px] text-stone-400">{t.city}</p>
                    <p className="text-[10px] text-stone-500 mt-0.5 font-medium">
                      Purchased: {t.product}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 text-emerald-700 text-[11px] font-semibold">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Verified</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. Instagram / Lookbook section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-10 space-y-1">
          <span className="text-xs uppercase font-bold tracking-[0.2em] text-stone-400">
            Instagram Editorial
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 font-display">
            FOLLOW OUR STYLE
          </h2>
          <p className="text-xs text-stone-500 tracking-wider">
            @VALIANTMENSWEAR · TAG US TO BE FEATURED
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          {INSTAGRAM_PHOTOS.map((item, i) => (
            <div
              key={i}
              className="group relative aspect-square bg-stone-100 overflow-hidden cursor-pointer"
            >
              <img
                src={item.image}
                alt={item.caption}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4 text-white">
                <span className="text-[11px] font-bold tracking-wider">{item.tag}</span>
                <p className="text-xs text-stone-200 mt-1 line-clamp-2">{item.caption}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
