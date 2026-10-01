export type ProductCategory = 'shirts' | 't-shirts' | 'polos' | 'all';

export type ProductFit = 'regular' | 'oversized' | 'slim' | 'relaxed';

export type ProductSize = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL';

export interface ProductColor {
  name: string;
  hex: string;
  image?: string;
}

export interface ProductReview {
  id: string;
  author: string;
  city: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verifiedPurchase: boolean;
  sizePurchased?: ProductSize;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: ProductCategory;
  subCategory: string; // e.g. 'Casual Shirts', 'Formal Shirts', 'Oversized Tees', 'Pique Polos'
  price: number; // in PKR
  compareAtPrice?: number; // original price before discount
  discountPercent?: number;
  shortDescription: string;
  description: string;
  fabricDetails: string;
  fitDetails: string;
  careInstructions: string[];
  colors: ProductColor[];
  sizes: ProductSize[];
  stock: Record<string, number>; // key: `${colorName}_${size}` -> number
  totalStock: number;
  images: string[];
  rating: number;
  reviewCount: number;
  reviews?: ProductReview[];
  isFeatured?: boolean;
  isBestSeller?: boolean;
  isNewArrival?: boolean;
  tags?: string[];
  createdAt: string;
}

export interface CartItem {
  id: string; // generated unique key e.g. `${product.id}-${color}-${size}`
  productId: string;
  name: string;
  slug: string;
  category: ProductCategory;
  price: number;
  compareAtPrice?: number;
  image: string;
  selectedColor: string;
  selectedSize: ProductSize;
  quantity: number;
  maxStock: number;
}

export interface Coupon {
  id: string;
  code: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number; // e.g., 10 for 10%, or 500 for PKR 500
  minOrderValue?: number; // minimum PKR
  description: string;
  isActive: boolean;
  expiryDate?: string;
}

export type OrderStatus =
  | 'pending'
  | 'confirmed'
  | 'processing'
  | 'shipped'
  | 'delivered'
  | 'cancelled';

export interface CustomerAddress {
  fullName: string;
  email: string;
  phone: string;
  addressLine: string;
  apartment?: string;
  city: string;
  province: string;
  postalCode: string;
}

export interface OrderItem {
  productId: string;
  name: string;
  image: string;
  color: string;
  size: ProductSize;
  quantity: number;
  price: number;
}

export interface Order {
  id: string; // e.g. 'VAL-84920'
  customer: CustomerAddress;
  items: OrderItem[];
  subtotal: number;
  shippingFee: number;
  discountAmount: number;
  couponCode?: string;
  total: number;
  status: OrderStatus;
  paymentMethod: 'cod' | 'bank_transfer' | 'card_online';
  paymentStatus: 'pending' | 'paid';
  trackingNumber?: string;
  courierPartner?: string;
  notes?: string;
  createdAt: string;
}

export interface UserProfile {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  role: 'customer' | 'admin';
  savedAddresses: CustomerAddress[];
  createdAt: string;
}

export interface FilterState {
  category: ProductCategory;
  sizes: ProductSize[];
  colors: string[];
  priceRange: [number, number];
  onlyInStock: boolean;
  onlyOnSale: boolean;
  collection?: string;
}

export type SortOption =
  | 'featured'
  | 'newest'
  | 'price-asc'
  | 'price-desc'
  | 'best-selling'
  | 'rating';
