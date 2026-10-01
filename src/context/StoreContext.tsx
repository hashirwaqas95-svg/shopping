import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Product,
  CartItem,
  Coupon,
  Order,
  UserProfile,
  CustomerAddress,
  ProductSize,
  OrderStatus
} from '../types';
import {
  MOCK_PRODUCTS,
  INITIAL_COUPONS,
  INITIAL_ORDERS,
  INITIAL_USER
} from '../data/mockProducts';

export interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'error';
  message: string;
}

interface StoreContextType {
  // Navigation
  currentPath: string;
  navigate: (path: string) => void;

  // Products
  products: Product[];
  getProductBySlug: (slug: string) => Product | undefined;
  getProductById: (id: string) => Product | undefined;
  addProduct: (product: Omit<Product, 'id' | 'createdAt'>) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (id: string) => void;

  // Cart
  cart: CartItem[];
  addToCart: (product: Product, size: ProductSize, colorName: string, quantity?: number) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, newQuantity: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartSubtotal: number;
  shippingFee: number;
  discountAmount: number;
  cartTotal: number;
  appliedCoupon: Coupon | null;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  freeShippingThreshold: number;

  // Wishlist
  wishlist: string[]; // product IDs
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;

  // Orders
  orders: Order[];
  placeOrder: (customer: CustomerAddress, paymentMethod: 'cod' | 'bank_transfer' | 'card_online') => Order;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  getOrderById: (orderId: string) => Order | undefined;

  // Coupons
  coupons: Coupon[];
  addCoupon: (coupon: Omit<Coupon, 'id'>) => void;
  toggleCoupon: (code: string) => void;

  // User
  currentUser: UserProfile | null;
  login: (email: string) => boolean;
  logout: () => void;
  updateProfile: (profile: Partial<UserProfile>) => void;
  saveAddress: (address: CustomerAddress) => void;

  // Modals & Drawers
  isCartDrawerOpen: boolean;
  openCartDrawer: () => void;
  closeCartDrawer: () => void;

  isSearchOpen: boolean;
  openSearch: () => void;
  closeSearch: () => void;

  quickViewProduct: Product | null;
  openQuickView: (product: Product) => void;
  closeQuickView: () => void;

  isSizeGuideOpen: boolean;
  openSizeGuide: () => void;
  closeSizeGuide: () => void;

  // Toast
  toasts: ToastMessage[];
  addToast: (message: string, type?: 'success' | 'info' | 'error') => void;
  removeToast: (id: string) => void;

  // Admin
  isAdminMode: boolean;
  setIsAdminMode: (val: boolean) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

const FREE_SHIPPING_MIN = 3000;
const STANDARD_SHIPPING_FEE = 250;

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Navigation path
  const [currentPath, setCurrentPath] = useState<string>(() => {
    return window.location.pathname && window.location.pathname !== '/' ? window.location.pathname : '/';
  });

  const navigate = (path: string) => {
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    try {
      window.history.pushState({}, '', path);
    } catch {
      // safe fallback in sandboxes
    }
  };

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Products
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('valiant_products');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return MOCK_PRODUCTS;
      }
    }
    return MOCK_PRODUCTS;
  });

  useEffect(() => {
    localStorage.setItem('valiant_products', JSON.stringify(products));
  }, [products]);

  // Cart
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('valiant_cart');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return [];
      }
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem('valiant_cart', JSON.stringify(cart));
  }, [cart]);

  // Wishlist
  const [wishlist, setWishlist] = useState<string[]>(() => {
    const saved = localStorage.getItem('valiant_wishlist');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return ['prod-001', 'prod-004'];
      }
    }
    return ['prod-001', 'prod-004'];
  });

  useEffect(() => {
    localStorage.setItem('valiant_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  // Orders
  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('valiant_orders');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return INITIAL_ORDERS;
      }
    }
    return INITIAL_ORDERS;
  });

  useEffect(() => {
    localStorage.setItem('valiant_orders', JSON.stringify(orders));
  }, [orders]);

  // Coupons
  const [coupons, setCoupons] = useState<Coupon[]>(() => {
    const saved = localStorage.getItem('valiant_coupons');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return INITIAL_COUPONS;
      }
    }
    return INITIAL_COUPONS;
  });

  useEffect(() => {
    localStorage.setItem('valiant_coupons', JSON.stringify(coupons));
  }, [coupons]);

  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);

  // User
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('valiant_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return INITIAL_USER;
      }
    }
    return INITIAL_USER;
  });

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('valiant_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('valiant_user');
    }
  }, [currentUser]);

  // Admin Mode
  const [isAdminMode, setIsAdminMode] = useState<boolean>(() => {
    return localStorage.getItem('valiant_admin_mode') === 'true';
  });

  useEffect(() => {
    localStorage.setItem('valiant_admin_mode', String(isAdminMode));
  }, [isAdminMode]);

  // Modals & UI states
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 5);
    setToasts(prev => [...prev, { id, type, message }]);
    setTimeout(() => {
      removeToast(id);
    }, 3800);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Cart operations
  const addToCart = (product: Product, size: ProductSize, colorName: string, quantity: number = 1) => {
    const stockKey = `${colorName}_${size}`;
    const maxStock = product.stock[stockKey] ?? 10;
    const itemId = `${product.id}-${colorName}-${size}`;

    setCart(prev => {
      const existing = prev.find(item => item.id === itemId);
      if (existing) {
        const updatedQty = Math.min(existing.quantity + quantity, maxStock);
        return prev.map(item => item.id === itemId ? { ...item, quantity: updatedQty } : item);
      } else {
        const newItem: CartItem = {
          id: itemId,
          productId: product.id,
          name: product.name,
          slug: product.slug,
          category: product.category,
          price: product.price,
          compareAtPrice: product.compareAtPrice,
          image: product.images[0],
          selectedColor: colorName,
          selectedSize: size,
          quantity: Math.min(quantity, maxStock),
          maxStock
        };
        return [...prev, newItem];
      }
    });

    addToast(`Added ${product.name} (${colorName}, Size ${size}) to shopping bag.`);
    setIsCartDrawerOpen(true);
  };

  const removeFromCart = (itemId: string) => {
    setCart(prev => prev.filter(item => item.id !== itemId));
    addToast('Item removed from bag.', 'info');
  };

  const updateQuantity = (itemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    setCart(prev =>
      prev.map(item => {
        if (item.id === itemId) {
          return { ...item, quantity: Math.min(newQuantity, item.maxStock) };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
  };

  // Cart calculations
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartSubtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  let discountAmount = 0;
  if (appliedCoupon && cartSubtotal > 0) {
    if (appliedCoupon.discountType === 'percentage') {
      discountAmount = Math.round((cartSubtotal * appliedCoupon.discountValue) / 100);
    } else {
      discountAmount = Math.min(appliedCoupon.discountValue, cartSubtotal);
    }
  }

  const shippingFee = cartSubtotal === 0 || cartSubtotal >= FREE_SHIPPING_MIN ? 0 : STANDARD_SHIPPING_FEE;
  const cartTotal = Math.max(0, cartSubtotal - discountAmount + shippingFee);

  const applyCoupon = (code: string) => {
    const trimmed = code.trim().toUpperCase();
    const found = coupons.find(c => c.code.toUpperCase() === trimmed && c.isActive);
    if (!found) {
      return { success: false, message: 'Invalid or expired coupon code.' };
    }
    if (found.minOrderValue && cartSubtotal < found.minOrderValue) {
      return {
        success: false,
        message: `This coupon requires a minimum subtotal of PKR ${found.minOrderValue.toLocaleString()}.`
      };
    }
    setAppliedCoupon(found);
    addToast(`Coupon "${found.code}" applied!`);
    return { success: true, message: 'Coupon applied successfully!' };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    addToast('Coupon removed.', 'info');
  };

  // Wishlist
  const toggleWishlist = (productId: string) => {
    setWishlist(prev => {
      const exists = prev.includes(productId);
      if (exists) {
        addToast('Removed from wishlist.', 'info');
        return prev.filter(id => id !== productId);
      } else {
        addToast('Added to wishlist.');
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  // Products helpers
  const getProductBySlug = (slug: string) => products.find(p => p.slug === slug);
  const getProductById = (id: string) => products.find(p => p.id === id);

  const addProduct = (newProd: Omit<Product, 'id' | 'createdAt'>) => {
    const id = `prod-${Date.now().toString().slice(-4)}`;
    const created: Product = {
      ...newProd,
      id,
      createdAt: new Date().toISOString().split('T')[0]
    };
    setProducts(prev => [created, ...prev]);
    addToast('New product added to catalog successfully!');
  };

  const updateProduct = (updated: Product) => {
    setProducts(prev => prev.map(p => p.id === updated.id ? updated : p));
    addToast(`Product "${updated.name}" updated successfully!`);
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
    addToast('Product removed from catalog.', 'info');
  };

  // Orders
  const placeOrder = (
    customer: CustomerAddress,
    paymentMethod: 'cod' | 'bank_transfer' | 'card_online'
  ): Order => {
    const randomNum = Math.floor(10000 + Math.random() * 90000);
    const orderId = `VAL-${randomNum}`;

    const newOrder: Order = {
      id: orderId,
      customer,
      items: cart.map(item => ({
        productId: item.productId,
        name: item.name,
        image: item.image,
        color: item.selectedColor,
        size: item.selectedSize,
        quantity: item.quantity,
        price: item.price
      })),
      subtotal: cartSubtotal,
      shippingFee,
      discountAmount,
      couponCode: appliedCoupon?.code,
      total: cartTotal,
      status: 'pending',
      paymentMethod,
      paymentStatus: paymentMethod === 'card_online' ? 'paid' : 'pending',
      courierPartner: 'TCS Express Pakistan',
      trackingNumber: `TCS-${Math.floor(10000000 + Math.random() * 90000000)}`,
      createdAt: new Date().toISOString()
    };

    // Decrement stock in catalog
    setProducts(prev =>
      prev.map(p => {
        const cartItemsForProduct = cart.filter(item => item.productId === p.id);
        if (cartItemsForProduct.length === 0) return p;

        const updatedStock = { ...p.stock };
        cartItemsForProduct.forEach(ci => {
          const key = `${ci.selectedColor}_${ci.selectedSize}`;
          if (updatedStock[key] !== undefined) {
            updatedStock[key] = Math.max(0, updatedStock[key] - ci.quantity);
          }
        });

        const newTotal = Object.values(updatedStock).reduce((a, b) => a + b, 0);
        return {
          ...p,
          stock: updatedStock,
          totalStock: newTotal
        };
      })
    );

    setOrders(prev => [newOrder, ...prev]);
    clearCart();
    addToast(`Order ${orderId} placed successfully!`, 'success');
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders(prev =>
      prev.map(order => order.id === orderId ? { ...order, status } : order)
    );
    addToast(`Order ${orderId} status updated to ${status}.`, 'info');
  };

  const getOrderById = (orderId: string) => orders.find(o => o.id === orderId);

  // Coupons
  const addCoupon = (newCoupon: Omit<Coupon, 'id'>) => {
    const id = `coup-${Date.now().toString().slice(-4)}`;
    setCoupons(prev => [...prev, { ...newCoupon, id }]);
    addToast(`Coupon ${newCoupon.code} created!`);
  };

  const toggleCoupon = (code: string) => {
    setCoupons(prev =>
      prev.map(c => c.code === code ? { ...c, isActive: !c.isActive } : c)
    );
  };

  // User
  const login = (email: string) => {
    if (email.toLowerCase().includes('admin')) {
      setIsAdminMode(true);
    }
    const user: UserProfile = {
      id: `usr-${Date.now()}`,
      fullName: email.split('@')[0].replace('.', ' ').toUpperCase(),
      email,
      phone: '0300-8472911',
      role: email.toLowerCase().includes('admin') ? 'admin' : 'customer',
      savedAddresses: [
        {
          fullName: email.split('@')[0],
          email,
          phone: '0300-8472911',
          addressLine: 'Phase 5, DHA',
          city: 'Lahore',
          province: 'Punjab',
          postalCode: '54000'
        }
      ],
      createdAt: new Date().toISOString()
    };
    setCurrentUser(user);
    addToast(`Signed in as ${user.email}`);
    return true;
  };

  const logout = () => {
    setCurrentUser(null);
    setIsAdminMode(false);
    addToast('Signed out successfully.', 'info');
  };

  const updateProfile = (profileUpdate: Partial<UserProfile>) => {
    if (!currentUser) return;
    setCurrentUser({ ...currentUser, ...profileUpdate });
    addToast('Profile updated.');
  };

  const saveAddress = (address: CustomerAddress) => {
    if (!currentUser) return;
    setCurrentUser({
      ...currentUser,
      savedAddresses: [address, ...currentUser.savedAddresses.filter(a => a.addressLine !== address.addressLine)]
    });
    addToast('Address saved to address book.');
  };

  return (
    <StoreContext.Provider
      value={{
        currentPath,
        navigate,
        products,
        getProductBySlug,
        getProductById,
        addProduct,
        updateProduct,
        deleteProduct,
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        cartSubtotal,
        shippingFee,
        discountAmount,
        cartTotal,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        freeShippingThreshold: FREE_SHIPPING_MIN,
        wishlist,
        toggleWishlist,
        isInWishlist,
        orders,
        placeOrder,
        updateOrderStatus,
        getOrderById,
        coupons,
        addCoupon,
        toggleCoupon,
        currentUser,
        login,
        logout,
        updateProfile,
        saveAddress,
        isCartDrawerOpen,
        openCartDrawer: () => setIsCartDrawerOpen(true),
        closeCartDrawer: () => setIsCartDrawerOpen(false),
        isSearchOpen,
        openSearch: () => setIsSearchOpen(true),
        closeSearch: () => setIsSearchOpen(false),
        quickViewProduct,
        openQuickView: (prod) => setQuickViewProduct(prod),
        closeQuickView: () => setQuickViewProduct(null),
        isSizeGuideOpen,
        openSizeGuide: () => setIsSizeGuideOpen(true),
        closeSizeGuide: () => setIsSizeGuideOpen(false),
        toasts,
        addToast,
        removeToast,
        isAdminMode,
        setIsAdminMode
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
