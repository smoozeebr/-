"use client";

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '@/context/AppContext';
import { 
  ShoppingBag, 
  User as UserIcon, 
  LogOut, 
  Menu, 
  X, 
  ShieldAlert, 
  ClipboardList, 
  Heart, 
  MessageSquare, 
  Lock 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { currentUser, cart, logout } = useApp();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = React.useState(false);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navLinks = [
    { name: 'الرئيسية', path: '/' },
    { name: 'المنتجات', path: '/products' },
    { name: 'قائمة الانتظار', path: '/waitlist' },
    { name: 'اتصل بنا', path: '/contact' },
    { name: 'سياسة الخصوصية', path: '/privacy' },
  ];

  return (
    <div
      className="min-h-screen flex flex-col text-slate-900 font-sans"
      dir="rtl"
      style={{
        backgroundImage: 'url(/images/fur-bg.jpg)',
        backgroundRepeat: 'repeat-y',
        backgroundSize: '100% auto',
        backgroundPosition: 'top center',
      }}
    >
      {/* Header - fully covered by the fur image, no nav/logo showing */}
      <header
        className="relative z-20 w-full leading-none bg-transparent"
        style={{ marginBottom: '-6%' }}
      >
        <img
          src="/images/fur-topbar.png"
          alt=""
          className="w-full h-auto object-contain block"
        />
      </header>

      {/* Main Content */}
      <main className="flex-1 relative z-10">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300 border-t border-slate-800">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white">سوقنا الذكي</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                وجهتك الأولى للحصول على أحدث المنتجات التقنية والإلكترونية بأفضل الأسعار وأعلى جودة مع خدمة توصيل سريعة وضمان حقيقي.
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">روابط سريعة</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="/" className="hover:text-white transition-colors">الرئيسية</Link></li>
                <li><Link to="/products" className="hover:text-white transition-colors">المنتجات</Link></li>
                <li><Link to="/waitlist" className="hover:text-white transition-colors">قائمة الانتظار</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">الدعم والمساعدة</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="/contact" className="hover:text-white transition-colors">اتصل بنا</Link></li>
                <li><Link to="/privacy" className="hover:text-white transition-colors">سياسة الخصوصية</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">تواصل معنا</h4>
              <p className="text-sm text-slate-400 leading-relaxed">
                البريد الإلكتروني: support@souqsmart.com<br />
                الهاتف: +966 500 000 000<br />
                العنوان: الرياض، المملكة العربية السعودية
              </p>
            </div>
          </div>
          <hr className="border-slate-800 my-8" />
          <div className="flex flex-col md:flex-row items-center justify-between text-sm text-slate-500">
            <p>© {new Date().getFullYear()} سوقنا الذكي. جميع الحقوق محفوظة.</p>
            <p className="mt-2 md:mt-0">صنع بكل حب لدعم التجارة الإلكترونية العربية</p>
          </div>
        </div>
      </footer>
    </div>
  );
};