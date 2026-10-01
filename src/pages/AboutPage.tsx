import React from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { CAMPAIGN_ASSETS } from '../data/mockProducts';

export const AboutPage: React.FC = () => {
  const { navigate } = useStore();

  return (
    <div className="space-y-16 sm:space-y-24 py-8 sm:py-12">
      {/* Editorial Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative bg-stone-900 text-white min-h-[460px] flex items-center overflow-hidden">
          <img
            src={CAMPAIGN_ASSETS.hero}
            alt="Valiant Atelier Story"
            className="absolute inset-0 w-full h-full object-cover object-top opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-transparent" />

          <div className="relative max-w-2xl px-6 sm:px-12 py-16 space-y-4">
            <span className="text-xs uppercase font-bold tracking-[0.25em] text-stone-400">
              The Atelier Philosophy
            </span>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold font-display leading-tight">
              BUILT FOR YOUR EVERYDAY STYLE.
            </h1>
            <p className="text-sm sm:text-base text-stone-300 font-light leading-relaxed">
              At VALIANT, we believe men’s clothing shouldn’t require a compromise between sartorial sharpness and uncompromised comfort.
            </p>
          </div>
        </div>
      </section>

      {/* Brand Pillars */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="space-y-6">
            <span className="text-xs uppercase font-bold tracking-widest text-stone-400">
              Textile Heritage & Quality
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold font-display text-stone-900 leading-snug">
              Leveraging Pakistan’s Finest Textile Craftsmanship
            </h2>
            <div className="space-y-4 text-xs sm:text-sm text-stone-600 leading-relaxed">
              <p>
                Pakistan produces some of the world's most prized long-staple cottons. Yet, for years, local menswear brands defaulted to synthetic blends, paper-thin fabrics, and careless sizing.
              </p>
              <p>
                VALIANT was founded in Lahore to reverse that trend. Every single garment starts at the yarn level: from our proprietary <strong>280 GSM heavyweight combed jersey</strong> that refuses to bacon at the collar, to our <strong>80/2 ply pinpoint Oxford cottons</strong> that drape with razor-sharp authority.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="border-l-2 border-stone-900 pl-4 space-y-1">
                <span className="text-xl sm:text-2xl font-bold font-display text-stone-900 block">
                  100%
                </span>
                <span className="text-xs text-stone-500 uppercase tracking-wider">
                  Combed Long-Staple Cotton
                </span>
              </div>
              <div className="border-l-2 border-stone-900 pl-4 space-y-1">
                <span className="text-xl sm:text-2xl font-bold font-display text-stone-900 block">
                  280 GSM
                </span>
                <span className="text-xs text-stone-500 uppercase tracking-wider">
                  Heavyweight Luxury Jersey
                </span>
              </div>
            </div>
          </div>

          <div className="relative aspect-[4/5] bg-stone-100 overflow-hidden shadow-lg">
            <img
              src={CAMPAIGN_ASSETS.shirtCategory}
              alt="Craftsmanship and Fabric"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* 4 Core Commitments */}
      <section className="bg-[#F8F8F6] py-16 sm:py-20 border-y border-stone-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="text-xs uppercase font-bold tracking-[0.2em] text-stone-400">
              Our Standard
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-stone-900 mt-1">
              The Four Tenets of VALIANT
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: 'Supreme Quality',
                desc: 'Zero corner-cutting on fabrics. Pre-shrunk, enzyme-washed, and reinforced at all key stress points.'
              },
              {
                title: 'All-Day Comfort',
                desc: 'Breathable, thermo-regulating weaves tested specifically for Pakistani climates, humidity, and heat.'
              },
              {
                title: 'Modern Architecture',
                desc: 'Silhouettes crafted with restrained proportions, clean drop shoulders, and balanced lengths.'
              },
              {
                title: 'Accessible Luxury',
                desc: 'Direct-to-consumer model providing Savile Row and boutique Tokyo specs without exorbitant markups.'
              }
            ].map((pillar, i) => (
              <div key={i} className="bg-white p-6 border border-stone-200/70 space-y-2">
                <span className="font-mono text-stone-400 text-xs font-bold block">
                  0{i + 1}.
                </span>
                <h3 className="text-sm uppercase font-bold text-stone-900 tracking-wider">
                  {pillar.title}
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  {pillar.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Direct CTA */}
      <section className="max-w-4xl mx-auto px-4 text-center space-y-6">
        <h2 className="text-2xl sm:text-3xl font-bold font-display text-stone-900">
          Experience the Difference Today
        </h2>
        <p className="text-xs sm:text-sm text-stone-600 max-w-lg mx-auto">
          Explore our collection of tailored shirts, oversized tees, and pique polo shirts delivered directly to your doorstep anywhere in Pakistan.
        </p>
        <button
          onClick={() => navigate('/shop')}
          className="px-8 py-3.5 bg-stone-900 hover:bg-black text-white text-xs font-bold uppercase tracking-widest transition-colors inline-flex items-center gap-2"
        >
          <span>Shop The Collection</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </section>
    </div>
  );
};
