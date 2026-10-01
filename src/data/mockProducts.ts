import { Product, Coupon, Order, UserProfile } from '../types';

// Curated generated high-res campaign assets
export const CAMPAIGN_ASSETS = {
  hero: '/src/assets/images/hero_fashion_menswear_1790863782925.jpg',
  shirtCategory: '/src/assets/images/cat_mens_casual_shirt_1790863800273.jpg',
  oversizedTeeCategory: '/src/assets/images/cat_mens_oversized_tee_1790863815967.jpg',
  poloCategory: '/src/assets/images/cat_mens_polo_shirt_1790863832876.jpg',
  promoBanner: '/src/assets/images/promo_campaign_banner_1790863845599.jpg',
};

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 'prod-001',
    slug: 'oxford-white-tailored-shirt',
    name: 'Oxford White Tailored Shirt',
    category: 'shirts',
    subCategory: 'Formal & Semi-Formal Shirts',
    price: 3490,
    compareAtPrice: 4290,
    discountPercent: 19,
    shortDescription: 'Signature heavy Oxford weave tailored shirt with mother-of-pearl buttons and button-down collar.',
    description: 'Crafted from 100% long-staple combed cotton in a structured pin-point Oxford weave. Designed for year-round breathability in Pakistan’s climate, this shirt balances crisp formality with casual ease. Features reinforced French seams, a structured roll collar, and curved split-yoke construction.',
    fabricDetails: '100% Long-Staple Combed Cotton (80/2 ply yarn). Pre-washed to eliminate shrinkage.',
    fitDetails: 'Tailored regular fit. Modern silhouette with comfortable room through chest and arms.',
    careInstructions: [
      'Machine wash cold with similar whites',
      'Do not bleach',
      'Warm iron while slightly damp',
      'Hang dry in shade to maintain fabric luster'
    ],
    colors: [
      { name: 'Pure White', hex: '#FFFFFF' },
      { name: 'Sky Blue', hex: '#A8C5DA' },
      { name: 'Soft Pink', hex: '#F4D9DE' }
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    stock: {
      'Pure White_S': 8,
      'Pure White_M': 15,
      'Pure White_L': 20,
      'Pure White_XL': 12,
      'Pure White_XXL': 6,
      'Sky Blue_M': 10,
      'Sky Blue_L': 14,
      'Soft Pink_M': 5
    },
    totalStock: 80,
    images: [
      CAMPAIGN_ASSETS.shirtCategory,
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1620012253295-c15c429f66bf?auto=format&fit=crop&w=1000&q=80'
    ],
    rating: 4.9,
    reviewCount: 42,
    isFeatured: true,
    isBestSeller: true,
    isNewArrival: false,
    tags: ['oxford', 'formal', 'cotton', 'office'],
    createdAt: '2026-08-15',
    reviews: [
      {
        id: 'rev-01',
        author: 'Usman Tariq',
        city: 'Lahore (DHA Phase 5)',
        rating: 5,
        date: '2 weeks ago',
        title: 'Supreme fabric density',
        comment: 'The collar structure holds up perfectly with a blazer or solo. Much better than high-street retail brands in Mall of Lahore. Very pleased.',
        verifiedPurchase: true,
        sizePurchased: 'L'
      },
      {
        id: 'rev-02',
        author: 'Hamza Farooq',
        city: 'Karachi (Clifton)',
        rating: 5,
        date: '1 month ago',
        title: 'Perfect stitching & breathable',
        comment: 'Karachi weather is testing for heavy fabrics, but this 80/2 cotton breathes effortlessly. Mother-of-pearl buttons are a subtle flex.',
        verifiedPurchase: true,
        sizePurchased: 'M'
      }
    ]
  },
  {
    id: 'prod-002',
    slug: 'heavyweight-black-oversized-tee',
    name: '280 GSM Heavyweight Oversized T-Shirt',
    category: 't-shirts',
    subCategory: 'Oversized T-Shirts',
    price: 2490,
    compareAtPrice: 2990,
    discountPercent: 17,
    shortDescription: 'Ultra-dense 280 GSM luxury combed jersey with structured drop shoulder and thick ribbed collar.',
    description: 'The definitive luxury heavyweight tee. Built with our proprietary high-density 280 GSM pure combed cotton that retains its boxy drape wash after wash. Features double-needle needlework, a non-sagging 1.2-inch ribbed neckband, and relaxed drop shoulders.',
    fabricDetails: '100% Combed Compact Cotton, 280 GSM. Ultra-soft zero-fuzz carbon wash finish.',
    fitDetails: 'True oversized boxy cut. Size down if you prefer a closer regular streetwear fit.',
    careInstructions: [
      'Machine wash gentle cold (30°C)',
      'Wash inside out to prevent surface friction',
      'Do not tumble dry',
      'Cool iron inside out'
    ],
    colors: [
      { name: 'Washed Black', hex: '#1C1C1E' },
      { name: 'Chalk White', hex: '#F5F5F0' },
      { name: 'Olive Drab', hex: '#4B5320' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    stock: {
      'Washed Black_S': 14,
      'Washed Black_M': 25,
      'Washed Black_L': 32,
      'Washed Black_XL': 18,
      'Chalk White_M': 20,
      'Chalk White_L': 22
    },
    totalStock: 120,
    images: [
      CAMPAIGN_ASSETS.oversizedTeeCategory,
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=1000&q=80'
    ],
    rating: 4.95,
    reviewCount: 78,
    isFeatured: true,
    isBestSeller: true,
    isNewArrival: true,
    tags: ['heavyweight', 'streetwear', 'oversized', '280gsm'],
    createdAt: '2026-09-01',
    reviews: [
      {
        id: 'rev-03',
        author: 'Zain Ul Abideen',
        city: 'Islamabad (F-7)',
        rating: 5,
        date: '3 days ago',
        title: 'Feels like international designer quality',
        comment: 'The collar does not bacon at all after washing. Boxy drape is on point. Ordered 2 more in Olive and Chalk White.',
        verifiedPurchase: true,
        sizePurchased: 'L'
      }
    ]
  },
  {
    id: 'prod-003',
    slug: 'classic-navy-pique-polo',
    name: 'Classic Navy Mercerized Pique Polo',
    category: 'polos',
    subCategory: 'Polo T-Shirts',
    price: 2890,
    compareAtPrice: 3490,
    discountPercent: 17,
    shortDescription: 'Double-mercerized fine pique cotton polo with structured knit collar and side vents.',
    description: 'Timeless sophistication meets everyday performance. Our polo is woven from mercerized Egyptian cotton that delivers subtle sheen, enhanced tensile strength, and deep colorfast navy hue. Styled with an uncurling stay-flat collar and engraved horn buttons.',
    fabricDetails: '100% Double-Mercerized Pique Cotton (230 GSM). Silky touch and supreme drape.',
    fitDetails: 'Athletic regular fit with clean shoulder pitch and discreet stepped side split.',
    careInstructions: [
      'Machine wash cold on gentle cycle',
      'Reshape collar while damp',
      'Flat dry in shade',
      'Iron at medium heat'
    ],
    colors: [
      { name: 'Midnight Navy', hex: '#1A233A' },
      { name: 'Onyx Black', hex: '#0B0B0B' },
      { name: 'Forest Green', hex: '#1E3324' }
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    stock: {
      'Midnight Navy_S': 9,
      'Midnight Navy_M': 18,
      'Midnight Navy_L': 24,
      'Midnight Navy_XL': 15,
      'Midnight Navy_XXL': 7
    },
    totalStock: 95,
    images: [
      CAMPAIGN_ASSETS.poloCategory,
      'https://images.unsplash.com/photo-1625910513413-7a9d0eeef7db?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&w=1000&q=80'
    ],
    rating: 4.85,
    reviewCount: 34,
    isFeatured: true,
    isBestSeller: false,
    isNewArrival: true,
    tags: ['polo', 'mercerized', 'navy', 'smart-casual'],
    createdAt: '2026-09-10'
  },
  {
    id: 'prod-004',
    slug: 'linen-sand-beige-vacation-shirt',
    name: 'Pure Flax Linen Sand Beige Shirt',
    category: 'shirts',
    subCategory: 'Casual Shirts',
    price: 3890,
    compareAtPrice: 4690,
    discountPercent: 17,
    shortDescription: '100% French flax linen casual shirt with camp collar, garment-washed for relaxed softness.',
    description: 'The quintessential warm-weather staple. Milled from sustainably cultivated French flax, this open-weave linen shirt keeps you effortlessly cool during balmy days and summer evenings. Features a resort-style camp collar, straight vented hem, and natural mother-of-pearl buttons.',
    fabricDetails: '100% European Flax Linen (160 GSM). Enzyme stone-washed for immediate broken-in softness.',
    fitDetails: 'Relaxed resort fit with relaxed shoulders and straight hem meant to be worn untucked.',
    careInstructions: [
      'Gentle machine wash cold or hand wash',
      'Do not wring linen fibers',
      'Hang dry on wide hanger',
      'Embrace the natural linen texture or steam gently'
    ],
    colors: [
      { name: 'Sand Beige', hex: '#D2C2A5' },
      { name: 'Optic White', hex: '#FAF9F6' },
      { name: 'Sage Green', hex: '#8A9A86' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    stock: {
      'Sand Beige_S': 6,
      'Sand Beige_M': 16,
      'Sand Beige_L': 18,
      'Sand Beige_XL': 10
    },
    totalStock: 65,
    images: [
      CAMPAIGN_ASSETS.hero,
      'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1589902860314-e910697dea18?auto=format&fit=crop&w=1000&q=80'
    ],
    rating: 4.9,
    reviewCount: 29,
    isFeatured: true,
    isBestSeller: true,
    isNewArrival: true,
    tags: ['linen', 'summer', 'resort', 'casual'],
    createdAt: '2026-08-20'
  },
  {
    id: 'prod-005',
    slug: 'essential-beaten-cream-crewneck-tee',
    name: '220 GSM Essential Cream Crewneck Tee',
    category: 't-shirts',
    subCategory: 'Premium Basic T-Shirts',
    price: 1890,
    compareAtPrice: 2290,
    discountPercent: 17,
    shortDescription: 'Everyday luxury regular-fit crewneck crafted from 220 GSM combed Supima cotton.',
    description: 'Designed as the foundational base layer for modern tailoring or effortless weekend wear. Silky-smooth to the touch with dense knit construction that provides opacity and retains its sharp silhouette after repeated laundry cycles.',
    fabricDetails: '100% Combed Long-Staple Cotton (220 GSM). Biopolished for zero pill formation.',
    fitDetails: 'Clean regular fit. Contoured through shoulders and straight down to the hem.',
    careInstructions: [
      'Machine wash cold with like colors',
      'Do not tumble dry',
      'Iron inside out on medium'
    ],
    colors: [
      { name: 'Cream Ivory', hex: '#F0ECE1' },
      { name: 'Charcoal Grey', hex: '#333333' },
      { name: 'Dusty Heather', hex: '#9E9E9E' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    stock: {
      'Cream Ivory_S': 12,
      'Cream Ivory_M': 28,
      'Cream Ivory_L': 30,
      'Cream Ivory_XL': 15,
      'Cream Ivory_XXL': 8
    },
    totalStock: 110,
    images: [
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=1000&q=80'
    ],
    rating: 4.8,
    reviewCount: 52,
    isFeatured: false,
    isBestSeller: true,
    isNewArrival: false,
    tags: ['basic', 'crewneck', 'regular-fit', 'everyday'],
    createdAt: '2026-07-12'
  },
  {
    id: 'prod-006',
    slug: 'noir-charcoal-formal-shirt',
    name: 'Sateen Weave Noir Charcoal Shirt',
    category: 'shirts',
    subCategory: 'Formal & Semi-Formal Shirts',
    price: 3690,
    compareAtPrice: 4490,
    discountPercent: 18,
    shortDescription: 'High-density cotton sateen shirt in deep graphite charcoal with French cuffs compatibility.',
    description: 'An evening icon. Cut from luminous 120s two-ply cotton sateen that catches ambient dinner lighting with subtle luxury. Finished with convertible barrel cuffs that can accommodate cufflinks, clean concealed button placket, and hand-turned collar points.',
    fabricDetails: '100% Two-Ply Cotton Sateen (120s thread count). Easy-care silky finish.',
    fitDetails: 'Contemporary slim-tailored fit with back darts for a sculpted torso profile.',
    careInstructions: [
      'Dry clean recommended or gentle cold wash',
      'Do not twist or wring',
      'Steam iron for impeccable glass finish'
    ],
    colors: [
      { name: 'Onyx Charcoal', hex: '#232528' },
      { name: 'Midnight Jet', hex: '#111215' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    stock: {
      'Onyx Charcoal_S': 8,
      'Onyx Charcoal_M': 18,
      'Onyx Charcoal_L': 20,
      'Onyx Charcoal_XL': 9
    },
    totalStock: 68,
    images: [
      'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1620012253295-c15c429f66bf?auto=format&fit=crop&w=1000&q=80'
    ],
    rating: 4.9,
    reviewCount: 27,
    isFeatured: false,
    isBestSeller: false,
    isNewArrival: true,
    tags: ['black-shirt', 'formal', 'evening', 'sateen'],
    createdAt: '2026-09-14'
  },
  {
    id: 'prod-007',
    slug: 'premium-black-knitted-polo',
    name: 'Fine-Gauge Knitted Milano Polo',
    category: 'polos',
    subCategory: 'Polo T-Shirts',
    price: 3290,
    compareAtPrice: 3990,
    discountPercent: 18,
    shortDescription: 'Luxury 14-gauge sweater-knit polo with open Johnny collar and ribbed waist hem.',
    description: 'A crossover between Italian knitwear and contemporary leisure. Hand-linked from combed compact modal-cotton yarn in a dense Milano stitch. Features an open retro Johnny collar with no buttons for relaxed elegance.',
    fabricDetails: '70% Combed Cotton, 30% Modal (14-gauge fully-fashioned knit). Cool to touch.',
    fitDetails: 'Modern relaxed fit with ribbed hem designed to rest gently on the waistband.',
    careInstructions: [
      'Hand wash cold with gentle wool/silk detergent',
      'Dry flat on towel — do not hang knitwear',
      'Store folded to preserve shape'
    ],
    colors: [
      { name: 'Midnight Black', hex: '#121212' },
      { name: 'Mocha Tan', hex: '#634832' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    stock: {
      'Midnight Black_S': 5,
      'Midnight Black_M': 14,
      'Midnight Black_L': 16,
      'Midnight Black_XL': 8
    },
    totalStock: 50,
    images: [
      CAMPAIGN_ASSETS.poloCategory,
      'https://images.unsplash.com/photo-1625910513413-7a9d0eeef7db?auto=format&fit=crop&w=1000&q=80'
    ],
    rating: 4.92,
    reviewCount: 38,
    isFeatured: true,
    isBestSeller: true,
    isNewArrival: true,
    tags: ['knit-polo', 'milano', 'luxury', 'johnny-collar'],
    createdAt: '2026-09-18'
  },
  {
    id: 'prod-008',
    slug: 'oversized-olive-drab-tee',
    name: 'Heavyweight Boxy Olive Street Tee',
    category: 't-shirts',
    subCategory: 'Oversized T-Shirts',
    price: 2490,
    compareAtPrice: 2890,
    discountPercent: 14,
    shortDescription: 'Muted olive oversized tee in 260 GSM combed cotton with understated tonal hem embroidery.',
    description: 'Engineered for street-luxe styling. Cut wide and slightly cropped to layer seamlessly over shirts or beneath utility jackets. Features reinforced collar binding and twin-needle hems.',
    fabricDetails: '100% Heavy Combed Cotton (260 GSM). Silicon washed for velvety matte hand-feel.',
    fitDetails: 'Boxy streetwear fit with dramatic drop shoulders and wide sleeve cuffs.',
    careInstructions: [
      'Machine wash gentle cold',
      'Do not bleach',
      'Line dry in shade',
      'Low iron if needed'
    ],
    colors: [
      { name: 'Olive Green', hex: '#495340' },
      { name: 'Washed Clay', hex: '#8A584C' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    stock: {
      'Olive Green_S': 10,
      'Olive Green_M': 22,
      'Olive Green_L': 24,
      'Olive Green_XL': 12
    },
    totalStock: 80,
    images: [
      CAMPAIGN_ASSETS.oversizedTeeCategory,
      'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=1000&q=80'
    ],
    rating: 4.78,
    reviewCount: 22,
    isFeatured: false,
    isBestSeller: false,
    isNewArrival: true,
    tags: ['oversized', 'olive', 'streetwear', 'boxy'],
    createdAt: '2026-09-22'
  },
  {
    id: 'prod-009',
    slug: 'indigo-micro-stripe-casual-shirt',
    name: 'Indigo Micro-Stripe Casual Shirt',
    category: 'shirts',
    subCategory: 'Casual Shirts',
    price: 3390,
    compareAtPrice: 3990,
    discountPercent: 15,
    shortDescription: 'Yarn-dyed micro-stripe cotton casual shirt with soft spread collar and curved hem.',
    description: 'Subtle nautical refinement. Yarn-dyed with rich natural indigo pigments, this casual shirt features a whisper-thin Bengal stripe that pairs with chinos or dark selvage denim. Tailored with a curved hem that sits cleanly both tucked and untucked.',
    fabricDetails: '100% Yarn-Dyed Combed Cotton (60s poplin). Lightly brushed for exceptional softness.',
    fitDetails: 'Regular smart-casual fit with clean shoulder pitch.',
    careInstructions: [
      'Wash cold on gentle cycle',
      'Wash with similar colors',
      'Warm iron'
    ],
    colors: [
      { name: 'Indigo White', hex: '#2E4B72' },
      { name: 'Charcoal Stripe', hex: '#4A4A4A' }
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    stock: {
      'Indigo White_S': 6,
      'Indigo White_M': 18,
      'Indigo White_L': 20,
      'Indigo White_XL': 11
    },
    totalStock: 70,
    images: [
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=1000&q=80'
    ],
    rating: 4.88,
    reviewCount: 31,
    isFeatured: true,
    isBestSeller: false,
    isNewArrival: false,
    tags: ['stripe', 'casual-shirt', 'indigo', 'smart'],
    createdAt: '2026-07-30'
  },
  {
    id: 'prod-010',
    slug: 'relaxed-fit-heather-grey-tee',
    name: 'Relaxed Fit Melange Heather Tee',
    category: 't-shirts',
    subCategory: 'Regular-Fit T-Shirts',
    price: 1990,
    compareAtPrice: 2390,
    discountPercent: 17,
    shortDescription: 'Tri-blend melange grey everyday T-shirt offering featherlight softness and zero twist.',
    description: 'An understated everyday staple featuring multidimensional melange yarn. Constructed with high-twist yarn spinning to prevent torso twisting after washing. Tagless neck print ensures all-day comfort without irritation.',
    fabricDetails: '95% Compact Combed Cotton, 5% Elastane for shape retention (210 GSM).',
    fitDetails: 'Relaxed modern fit with balanced sleeve length and non-constricting neckband.',
    careInstructions: [
      'Machine wash cold (30°C)',
      'Tumble dry low or air dry'
    ],
    colors: [
      { name: 'Heather Grey', hex: '#949599' },
      { name: 'Anthracite', hex: '#3C3D42' }
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    stock: {
      'Heather Grey_S': 11,
      'Heather Grey_M': 26,
      'Heather Grey_L': 28,
      'Heather Grey_XL': 14
    },
    totalStock: 90,
    images: [
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=1000&q=80'
    ],
    rating: 4.75,
    reviewCount: 19,
    isFeatured: false,
    isBestSeller: false,
    isNewArrival: false,
    tags: ['heather', 'relaxed', 'melange', 'basics'],
    createdAt: '2026-08-05'
  },
  {
    id: 'prod-011',
    slug: 'sage-olive-summer-poplin-shirt',
    name: 'Crisp Cotton Poplin Sage Shirt',
    category: 'shirts',
    subCategory: 'Casual Shirts',
    price: 3290,
    compareAtPrice: 3890,
    discountPercent: 15,
    shortDescription: 'Lightweight crisp poplin shirt in botanical sage green, ideal for Friday casual and dinners.',
    description: 'Infuse your wardrobe with serene earthy hues. Milled in high-thread poplin with a smooth paper-touch hand-feel. Features a semi-spread collar, minimalist tonal buttons, and single pocket detail.',
    fabricDetails: '100% Egyptian Cotton Poplin (130 GSM). Silky, ultra-light and crisp.',
    fitDetails: 'Regular tailoring with clean shoulder drape.',
    careInstructions: [
      'Machine wash gentle cold',
      'Hang dry on shaped hanger',
      'Warm iron'
    ],
    colors: [
      { name: 'Sage Green', hex: '#7D8B78' },
      { name: 'Pebble Grey', hex: '#B8B5AD' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    stock: {
      'Sage Green_S': 7,
      'Sage Green_M': 19,
      'Sage Green_L': 22,
      'Sage Green_XL': 9
    },
    totalStock: 65,
    images: [
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1589902860314-e910697dea18?auto=format&fit=crop&w=1000&q=80'
    ],
    rating: 4.82,
    reviewCount: 24,
    isFeatured: false,
    isBestSeller: true,
    isNewArrival: true,
    tags: ['poplin', 'sage', 'summer', 'casual'],
    createdAt: '2026-09-05'
  },
  {
    id: 'prod-012',
    slug: 'burgundy-terracotta-knit-polo',
    name: 'Terracotta Pique Contrast Polo',
    category: 'polos',
    subCategory: 'Polo T-Shirts',
    price: 2790,
    compareAtPrice: 3290,
    discountPercent: 15,
    shortDescription: 'Warm terracotta combed pique polo shirt with tipping detail on collar and cuff.',
    description: 'Add a warm earth tone to your rotation. Detailed with subtle contrast tipping along the ribbed collar and sleeve bands. Double-stitched seams ensure longevity through hundreds of wears.',
    fabricDetails: '100% Combed Pique Cotton (230 GSM). Breathable honeycomb knit.',
    fitDetails: 'Standard regular polo fit.',
    careInstructions: [
      'Machine wash cold with like colors',
      'Do not tumble dry',
      'Iron on reverse'
    ],
    colors: [
      { name: 'Terracotta Clay', hex: '#A85A48' },
      { name: 'Mustard Amber', hex: '#C28938' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    stock: {
      'Terracotta Clay_S': 8,
      'Terracotta Clay_M': 15,
      'Terracotta Clay_L': 18,
      'Terracotta Clay_XL': 7
    },
    totalStock: 55,
    images: [
      CAMPAIGN_ASSETS.poloCategory,
      'https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&w=1000&q=80'
    ],
    rating: 4.86,
    reviewCount: 20,
    isFeatured: false,
    isBestSeller: false,
    isNewArrival: false,
    tags: ['polo', 'terracotta', 'pique', 'smart-casual'],
    createdAt: '2026-08-11'
  },
  {
    id: 'prod-013',
    slug: 'pure-white-heavyweight-oversized-tee',
    name: '280 GSM Optical White Heavy Tee',
    category: 't-shirts',
    subCategory: 'Oversized T-Shirts',
    price: 2490,
    compareAtPrice: 2990,
    discountPercent: 17,
    shortDescription: 'Zero-sheer heavy white oversized tee crafted from premium 280 GSM combed jersey.',
    description: 'The holy grail of white tees. Heavy enough to guarantee 100% opacity with zero show-through, yet combed and enzyme-washed to feel like silk against the skin. Holds its dramatic boxy silhouette with ease.',
    fabricDetails: '100% Combed Compact Cotton (280 GSM). Zero-sheer dense knit.',
    fitDetails: 'Relaxed oversized boxy cut with drop shoulder.',
    careInstructions: [
      'Machine wash cold with whites only',
      'Do not bleach',
      'Hang dry in shade to preserve crisp white hue'
    ],
    colors: [
      { name: 'Optical White', hex: '#FFFFFF' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    stock: {
      'Optical White_S': 15,
      'Optical White_M': 32,
      'Optical White_L': 35,
      'Optical White_XL': 20
    },
    totalStock: 110,
    images: [
      CAMPAIGN_ASSETS.oversizedTeeCategory,
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=1000&q=80'
    ],
    rating: 4.96,
    reviewCount: 65,
    isFeatured: true,
    isBestSeller: true,
    isNewArrival: false,
    tags: ['white-tee', 'heavyweight', '280gsm', 'zero-sheer'],
    createdAt: '2026-08-01'
  },
  {
    id: 'prod-014',
    slug: 'midnight-navy-linen-shirt',
    name: 'French Flax Midnight Navy Linen Shirt',
    category: 'shirts',
    subCategory: 'Casual Shirts',
    price: 3890,
    compareAtPrice: 4590,
    discountPercent: 15,
    shortDescription: 'Deep oceanic navy pure French linen shirt with spread collar and horn buttons.',
    description: 'Sartorial luxury for warm evenings. Natural linen breathability infused with deep midnight navy pigment. Tailored with a modern spread collar that stands proud without a tie and twin back pleats for shoulder freedom.',
    fabricDetails: '100% French Flax Linen (165 GSM). Pre-washed with natural pumice stones.',
    fitDetails: 'Regular tailored linen cut.',
    careInstructions: [
      'Hand wash or gentle cold machine wash',
      'Line dry only'
    ],
    colors: [
      { name: 'Midnight Navy', hex: '#14213D' }
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    stock: {
      'Midnight Navy_S': 6,
      'Midnight Navy_M': 18,
      'Midnight Navy_L': 21,
      'Midnight Navy_XL': 12
    },
    totalStock: 65,
    images: [
      CAMPAIGN_ASSETS.shirtCategory,
      'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=1000&q=80'
    ],
    rating: 4.88,
    reviewCount: 28,
    isFeatured: false,
    isBestSeller: false,
    isNewArrival: true,
    tags: ['linen', 'navy', 'evening', 'casual'],
    createdAt: '2026-09-12'
  }
];

export const INITIAL_COUPONS: Coupon[] = [
  {
    id: 'coup-1',
    code: 'FIRST10',
    discountType: 'percentage',
    discountValue: 10,
    minOrderValue: 2000,
    description: '10% off on your first order across Pakistan',
    isActive: true
  },
  {
    id: 'coup-2',
    code: 'VALIANT500',
    discountType: 'fixed',
    discountValue: 500,
    minOrderValue: 4000,
    description: 'PKR 500 flat off on orders above PKR 4,000',
    isActive: true
  },
  {
    id: 'coup-3',
    code: 'FREESHIP',
    discountType: 'fixed',
    discountValue: 250,
    minOrderValue: 1500,
    description: 'Free courier delivery code for any order',
    isActive: true
  }
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'VAL-92810',
    customer: {
      fullName: 'Ahmad Shahzad',
      email: 'ahmad.shahzad@gmail.com',
      phone: '0300-8472911',
      addressLine: 'House 42, Street 8, Sector Y, Phase 3, DHA',
      city: 'Lahore',
      province: 'Punjab',
      postalCode: '54000'
    },
    items: [
      {
        productId: 'prod-001',
        name: 'Oxford White Tailored Shirt',
        image: CAMPAIGN_ASSETS.shirtCategory,
        color: 'Pure White',
        size: 'L',
        quantity: 1,
        price: 3490
      },
      {
        productId: 'prod-002',
        name: '280 GSM Heavyweight Oversized T-Shirt',
        image: CAMPAIGN_ASSETS.oversizedTeeCategory,
        color: 'Washed Black',
        size: 'L',
        quantity: 1,
        price: 2490
      }
    ],
    subtotal: 5980,
    shippingFee: 0,
    discountAmount: 598,
    couponCode: 'FIRST10',
    total: 5382,
    status: 'delivered',
    paymentMethod: 'cod',
    paymentStatus: 'paid',
    trackingNumber: 'TCS-98402194',
    courierPartner: 'TCS Express Pakistan',
    createdAt: '2026-09-24T14:32:00Z'
  },
  {
    id: 'VAL-92845',
    customer: {
      fullName: 'Bilal Mustafa',
      email: 'bilal.m@hotmail.com',
      phone: '0321-4589201',
      addressLine: 'Apartment 4B, Creek Vistas, Phase 8, DHA',
      city: 'Karachi',
      province: 'Sindh',
      postalCode: '75500'
    },
    items: [
      {
        productId: 'prod-003',
        name: 'Classic Navy Mercerized Pique Polo',
        image: CAMPAIGN_ASSETS.poloCategory,
        color: 'Midnight Navy',
        size: 'M',
        quantity: 2,
        price: 2890
      }
    ],
    subtotal: 5780,
    shippingFee: 0,
    discountAmount: 500,
    couponCode: 'VALIANT500',
    total: 5280,
    status: 'shipped',
    paymentMethod: 'bank_transfer',
    paymentStatus: 'paid',
    trackingNumber: 'LEO-7482910',
    courierPartner: 'Leopards Courier',
    createdAt: '2026-09-28T10:15:00Z'
  },
  {
    id: 'VAL-92902',
    customer: {
      fullName: 'Saad Malik',
      email: 'saad.malik@outlook.com',
      phone: '0333-5192840',
      addressLine: 'House 112, Street 34, Sector F-8/2',
      city: 'Islamabad',
      province: 'Islamabad Capital Territory',
      postalCode: '44000'
    },
    items: [
      {
        productId: 'prod-004',
        name: 'Pure Flax Linen Sand Beige Shirt',
        image: CAMPAIGN_ASSETS.hero,
        color: 'Sand Beige',
        size: 'M',
        quantity: 1,
        price: 3890
      }
    ],
    subtotal: 3890,
    shippingFee: 0,
    discountAmount: 0,
    total: 3890,
    status: 'processing',
    paymentMethod: 'cod',
    paymentStatus: 'pending',
    trackingNumber: 'TRAX-839201',
    courierPartner: 'Trax Logistics',
    createdAt: '2026-09-30T18:40:00Z'
  }
];

export const INITIAL_USER: UserProfile = {
  id: 'usr-default',
  fullName: 'Hashir Waqas',
  email: 'hashirwaqas95@gmail.com',
  phone: '0300-1234567',
  role: 'customer',
  savedAddresses: [
    {
      fullName: 'Hashir Waqas',
      email: 'hashirwaqas95@gmail.com',
      phone: '0300-1234567',
      addressLine: 'Plot 18, Block G, Gulberg III',
      apartment: 'Suite 201',
      city: 'Lahore',
      province: 'Punjab',
      postalCode: '54660'
    }
  ],
  createdAt: '2026-08-10'
};
