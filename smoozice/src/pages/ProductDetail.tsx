"use client";

import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useApp } from '@/context/AppContext';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { showSuccess, showError } from '@/utils/toast';
import { ShoppingBag, ArrowRight, Star, ShieldCheck, Truck, RefreshCw, CheckCircle2 } from 'lucide-react';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { products, addToCart } = useApp();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);

  const product = products.find(p => p.id === id);

  if (!product) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">المنتج غير موجود!</h2>
          <Link to="/products">
            <Button className="bg-indigo-600 text-white">العودة للمنتجات</Button>
          </Link>
        </div>
      </Layout>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, quantity);
    showSuccess(`تم إضافة ${quantity} من "${product.name}" إلى السلة بنجاح!`);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        {/* Back Button */}
        <Link to="/products" className="inline-flex items-center gap-2 text-slate-600 hover:text-indigo-600 mb-8 transition-colors">
          <ArrowRight className="h-5 w-5" />
          <span>العودة إلى المنتجات</span>
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          {/* Product Image */}
          <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-auto object-cover rounded-xl aspect-square"
            />
          </div>

          {/* Product Info */}
          <div className="space-y-6 text-right">
            <div className="space-y-2">
              <Badge className="bg-indigo-50 text-indigo-600 border-indigo-100 hover:bg-indigo-50">
                {product.category}
              </Badge>
              <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900">{product.name}</h1>
              
              <div className="flex items-center gap-2 justify-start mt-2">
                <div className="flex items-center gap-1 text-amber-500">
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                </div>
                <span className="text-sm text-slate-500">(تقييم 4.9 من 120 عميل)</span>
              </div>
            </div>

            <div className="border-y border-slate-100 py-4 flex items-baseline gap-2 justify-start">
              <span className="text-3xl font-extrabold text-indigo-600">{product.price}</span>
              <span className="text-lg text-slate-500">ر.س</span>
            </div>

            <p className="text-slate-600 leading-relaxed text-lg">
              {product.description}
            </p>

            {/* Features List */}
            <div className="space-y-3">
              <h3 className="font-bold text-slate-900">المميزات والمواصفات:</h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2 text-slate-600 text-sm">
                    <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Stock Status */}
            <div className="flex items-center gap-2 justify-start">
              <span className="text-sm font-medium text-slate-500">حالة المخزون:</span>
              {product.stock > 0 ? (
                <Badge className="bg-emerald-50 text-emerald-700 border-emerald-100">
                  متوفر ({product.stock} قطعة في المخزن)
                </Badge>
              ) : (
                <Badge className="bg-rose-50 text-rose-700 border-rose-100">
                  نفذت الكمية
                </Badge>
              )}
            </div>

            {/* Quantity & Add to Cart */}
            {product.stock > 0 && (
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden w-fit">
                  <button 
                    onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                    className="px-4 py-2 bg-slate-50 hover:bg-slate-100 text-slate-600 font-bold transition-colors"
                  >
                    -
                  </button>
                  <span className="px-6 py-2 font-bold text-slate-800">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(prev => Math.min(product.stock, prev + 1))}
                    className="px-4 py-2 bg-slate-50 hover:bg-slate-100 text-slate-600 font-bold transition-colors"
                  >
                    +
                  </button>
                </div>

                <Button 
                  onClick={handleAddToCart}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white flex-1 flex items-center justify-center gap-2 py-6 text-lg"
                >
                  <ShoppingBag className="h-5 w-5" />
                  إضافة إلى السلة
                </Button>
              </div>
            )}

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-100 text-center">
              <div className="space-y-1">
                <Truck className="h-6 w-6 text-indigo-600 mx-auto" />
                <p className="text-xs font-bold text-slate-800">توصيل سريع</p>
                <p className="text-[10px] text-slate-400">خلال 2-4 أيام عمل</p>
              </div>
              <div className="space-y-1">
                <ShieldCheck className="h-6 w-6 text-indigo-600 mx-auto" />
                <p className="text-xs font-bold text-slate-800">ضمان سنتين</p>
                <p className="text-[10px] text-slate-400">ضمان استبدال حقيقي</p>
              </div>
              <div className="space-y-1">
                <RefreshCw className="h-6 w-6 text-indigo-600 mx-auto" />
                <p className="text-xs font-bold text-slate-800">استرجاع مرن</p>
                <p className="text-[10px] text-slate-400">خلال 14 يوماً بكل سهولة</p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetail;