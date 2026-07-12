"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import initialData from '../data/initialData.json';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  stock: number;
  features: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  userId: string;
  userEmail: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  date: string;
  shippingDetails: {
    fullName: string;
    phone: string;
    address: string;
    city: string;
    paymentMethod: string;
  };
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'user' | 'admin';
}

export interface WaitlistEntry {
  id: string;
  email: string;
  date: string;
  productName?: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  date: string;
}

interface AppContextType {
  currentUser: User | null;
  users: User[];
  products: Product[];
  cart: CartItem[];
  orders: Order[];
  waitlist: WaitlistEntry[];
  messages: ContactMessage[];
  login: (email: string, role: 'user' | 'admin') => boolean;
  register: (name: string, email: string) => boolean;
  logout: () => void;
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  placeOrder: (shippingDetails: Order['shippingDetails']) => Order;
  addWaitlist: (email: string, productName?: string) => void;
  sendMessage: (name: string, email: string, subject: string, message: string) => void;
  addProduct: (product: Omit<Product, 'id'>) => void;
  deleteProduct: (id: string) => void;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('current_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [users, setUsers] = useState<User[]>(() => {
    const saved = localStorage.getItem('users');
    if (saved) return JSON.parse(saved);
    const defaultUsers = initialData.users as User[];
    localStorage.setItem('users', JSON.stringify(defaultUsers));
    return defaultUsers;
  });

  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('products');
    if (saved) return JSON.parse(saved);
    const defaultProducts = initialData.products as Product[];
    localStorage.setItem('products', JSON.stringify(defaultProducts));
    return defaultProducts;
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('orders');
    return saved ? JSON.parse(saved) : [];
  });

  const [waitlist, setWaitlist] = useState<WaitlistEntry[]>(() => {
    const saved = localStorage.getItem('waitlist');
    return saved ? JSON.parse(saved) : [];
  });

  const [messages, setMessages] = useState<ContactMessage[]>(() => {
    const saved = localStorage.getItem('messages');
    return saved ? JSON.parse(saved) : [];
  });

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('current_user', currentUser ? JSON.stringify(currentUser) : '');
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('waitlist', JSON.stringify(waitlist));
  }, [waitlist]);

  useEffect(() => {
    localStorage.setItem('messages', JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(products));
  }, [products]);

  const login = (email: string, role: 'user' | 'admin') => {
    const found = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (found) {
      setCurrentUser(found);
      return true;
    } else {
      // Create user on the fly for easy testing
      const newUser: User = {
        id: 'u_' + Date.now(),
        email: email,
        name: email.split('@')[0],
        role: role
      };
      setUsers(prev => {
        const updated = [...prev, newUser];
        localStorage.setItem('users', JSON.stringify(updated));
        return updated;
      });
      setCurrentUser(newUser);
      return true;
    }
  };

  const register = (name: string, email: string) => {
    const exists = users.some(u => u.email.toLowerCase() === email.toLowerCase());
    if (exists) return false;

    const newUser: User = {
      id: 'u_' + Date.now(),
      email,
      name,
      role: 'user'
    };
    setUsers(prev => {
      const updated = [...prev, newUser];
      localStorage.setItem('users', JSON.stringify(updated));
      return updated;
    });
    setCurrentUser(newUser);
    return true;
  };

  const logout = () => {
    setCurrentUser(null);
    setCart([]);
  };

  const addToCart = (product: Product, quantity = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.product.id === product.id 
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev => prev.map(item => 
      item.product.id === productId ? { ...item, quantity } : item
    ));
  };

  const clearCart = () => {
    setCart([]);
  };

  const placeOrder = (shippingDetails: Order['shippingDetails']) => {
    const total = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
    const newOrder: Order = {
      id: 'ORD-' + Math.floor(100000 + Math.random() * 900000),
      userId: currentUser?.id || 'guest',
      userEmail: currentUser?.email || 'guest@example.com',
      items: [...cart],
      total,
      status: 'pending',
      date: new Date().toLocaleDateString('ar-EG', { year: 'numeric', month: 'long', day: 'numeric' }),
      shippingDetails
    };

    // Update stock
    setProducts(prev => prev.map(p => {
      const cartItem = cart.find(item => item.product.id === p.id);
      if (cartItem) {
        return { ...p, stock: Math.max(0, p.stock - cartItem.quantity) };
      }
      return p;
    }));

    setOrders(prev => [newOrder, ...prev]);
    clearCart();
    return newOrder;
  };

  const addWaitlist = (email: string, productName?: string) => {
    const newEntry: WaitlistEntry = {
      id: 'WLT-' + Date.now(),
      email,
      date: new Date().toLocaleDateString('ar-EG'),
      productName
    };
    setWaitlist(prev => [newEntry, ...prev]);
  };

  const sendMessage = (name: string, email: string, subject: string, message: string) => {
    const newMessage: ContactMessage = {
      id: 'MSG-' + Date.now(),
      name,
      email,
      subject,
      message,
      date: new Date().toLocaleDateString('ar-EG')
    };
    setMessages(prev => [newMessage, ...prev]);
  };

  const addProduct = (productData: Omit<Product, 'id'>) => {
    const newProduct: Product = {
      ...productData,
      id: 'p_' + Date.now()
    };
    setProducts(prev => [newProduct, ...prev]);
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  const updateOrderStatus = (orderId: string, status: Order['status']) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status } : o));
  };

  return (
    <AppContext.Provider value={{
      currentUser,
      users,
      products,
      cart,
      orders,
      waitlist,
      messages,
      login,
      register,
      logout,
      addToCart,
      removeFromCart,
      updateCartQuantity,
      clearCart,
      placeOrder,
      addWaitlist,
      sendMessage,
      addProduct,
      deleteProduct,
      updateOrderStatus
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};