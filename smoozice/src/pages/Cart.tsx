"use client";

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '@/context/AppContext';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Trash2, ShoppingBag, ArrowRight, Plus, Minus } from 'lucide-react';
import { showSuccess } from '@/utils/toast';

const Cart = () => {
  const { cart, updateCartQuantity, removeFromCart, clearCart } = useApp();
  const navigate = useNavigate();

  const total = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

  const handleQuantityChange = (productId: string, currentQty: number, delta: number, stock: number) => {
    const newQty = currentQty + delta;
    if (newQty > stock) {
      showSuccess('عذراً، لقد تجاوزت الكمية المتاحة في المخزن!');
      return;
    }
    updateCartQuantity(productId, newQty);
  };

  if (cart.length === 0) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-20 text-center max-w-md">
          <div className="p-4 bg-indigo-50 rounded-full text-indigo-600 w-20 h-20 flex items-center justify-center mx-auto mb-6">
            <ShoppingBag className="h-10 w-10" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">سلة التسوق فارغة!</h2>
          <p className="text-slate-500 mb-8">يبدو أنك لم تقم بإضافة أي منتجات إلى سلتك بعد.</p>
          <Link to="/products">
            <Button className="bg-indigo-600 hover:bg-indigo-700 text-white w-full py-6 text-lg">
              تصفح المنتجات الآن
            </Button>
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-extrabold text-slate-900 text-right mb-8">سلة التسوق</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Cart Items List */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <Card key={item.product.id} className="overflow-hidden border-slate-100 shadow-sm">
                <CardContent className="p-4 flex flex-col sm:flex-row items-center gap-4 text-right">
                  <img 
                    src={item.product.image} 
                    alt={item.product.name} 
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                  
                  <div className="flex-1 space-y-1 w-full">
                    <h3 className="font-bold text-slate-900 text-lg">{item.product.name}</h3>
                    <p className="text-xs text-slate-400">الفئة: {item.product.category}</p>
                    <p className="text-sm font-extrabold text-indigo-600">{item.product.price} ر.س</p>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden">
                    <button 
                      onClick={() => handleQuantityChange(item.product.id, item.quantity, -1, item.product.stock)}
                      className="px-3 py-1.5 bg-slate-50 hover:bg-slate-100 text-slate-600 font-bold"
                    >
                      <Minus className="h-3 w-3" />
                    </button>
                    <span className="px-4 py-1 font-bold text-slate-800 text-sm">{item.quantity}</span>
                    <button 
                      onClick={() => handleQuantityChange(item.product.id, item.quantity, 1, item.product.stock)}
                      className="px-3 py-1.5 bg-slate-50 hover:bg-slate-100 text-slate-600 font-bold"
                    >
                      <Plus className="h-3 w-3" />
                    </button>
                  </div>

                  {/* Subtotal & Delete */}
                  <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-4 w-full sm:w-auto border-t sm:border-t-0 pt-3 sm:pt-0">
                    <p className="text-base font-extrabold text-slate-900">
                      {item.product.price * item.quantity} ر.س
                    </p>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => {
                        removeFromCart(item.product.id);
                        showSuccess(`تم إزالة "${item.product.name}" من السلة`);
                      }}
                      className="text-rose-500 hover:text-rose-600 hover:bg-rose-50"
                    >
                      <Trash2 className="h-5 w-5" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}

            <div className="flex justify-between items-center pt-4">
              <Button 
                variant="outline" 
                onClick={() => {
                  clearCart();
                  showSuccess('تم إفراغ السلة بنجاح');
                }}
                className="text-rose-500 border-rose-200 hover:bg-rose-50"
              >
                إفراغ السلة
              </Button>
              <Link to="/products" className="inline-flex items-center gap-1 text-indigo-600 hover:underline text-sm font-semibold">
                <ArrowRight className="h-4 w-4" />
                مواصلة التسوق
              </Link>
            </div>
          </div>

          {/* Order Summary Card */}
          <Card className="border-slate-100 shadow-md p-6 text-right">
            <h3 className="text-lg font-bold text-slate-900 border-b pb-4 mb-4">ملخص الطلب</h3>
            
            <div className="space-y-3 text-sm text-slate-600 mb-6">
              <div className="flex justify-between">
                <span>مجموع المنتجات:</span>
                <span className="font-semibold text-slate-900">{total} ر.س</span>
              </div>
              <div className="flex justify-between">
                <span>تكلفة الشحن:</span>
                <span className="text-emerald-600 font-semibold">مجاني</span>
              </div>
              <hr />
              <div className="flex justify-between text-base font-extrabold text-slate-900 pt-2">
                <span>الإجمالي الكلي:</span>
                <span className="text-indigo-600">{total} ر.س</span>
              </div>
            </div>

            <Button 
              onClick={() => navigate('/checkout')}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-6 text-lg font-bold"
            >
              الانتقال لإتمام الطلب والدفع
            </Button>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Cart;