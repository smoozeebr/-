"use client";

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '@/context/AppContext';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { showSuccess } from '@/utils/toast';
import { ShoppingBag, Search, Star, SlidersHorizontal } from 'lucide-react';

const Products = () => {
  const { products, addToCart } = useApp();
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('الكل');

  const categories = ['الكل', 'إلكترونيات', 'صوتيات', 'إكسسوارات'];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase()) || 
                          product.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === 'الكل' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleAddToCart = (product: any) => {
    addToCart(product, 1);
    showSuccess(`تم إضافة "${product.name}" إلى السلة بنجاح!`);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-right mb-10">
          <h1 className="text-3xl font-extrabold text-slate-900">معرض المنتجات</h1>
          <p className="text-slate-500 mt-2">تصفح مجموعتنا المميزة من المنتجات الذكية والتقنية</p>
        </div>

        {/* Search & Filter Bar */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-8 bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
          {/* Search Input */}
          <div className="relative w-full md:w-96">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 h-5 w-5" />
            <Input 
              type="text" 
              placeholder="ابحث عن منتج..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pr-10 text-right"
            />
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-2 w-full md:w-auto justify-start md:justify-end">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? 'default' : 'outline'}
                onClick={() => setSelectedCategory(category)}
                className={`rounded-full px-5 ${
                  selectedCategory === category 
                    ? 'bg-indigo-600 hover:bg-indigo-700 text-white' 
                    : 'text-slate-600 hover:text-indigo-600'
                }`}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <Card key={product.id} className="overflow-hidden border-slate-100 shadow-sm hover:shadow-md transition-shadow flex flex-col h-full">
                <div className="relative aspect-square overflow-hidden bg-slate-100">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                  <Badge className="absolute top-3 right-3 bg-indigo-600 text-white">
                    {product.category}
                  </Badge>
                  {product.stock === 0 && (
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                      <span className="bg-rose-600 text-white px-3 py-1 rounded-full text-sm font-bold">نفذت الكمية</span>
                    </div>
                  )}
                </div>
                <CardHeader className="text-right p-4">
                  <CardTitle className="text-lg font-bold text-slate-900 line-clamp-1">
                    {product.name}
                  </CardTitle>
                  <div className="flex items-center gap-1 text-amber-500 mt-1">
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4 fill-current" />
                    <span className="text-xs text-slate-400 mr-1">(4.8)</span>
                  </div>
                </CardHeader>
                <CardContent className="text-right p-4 pt-0 flex-1">
                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                    {product.description}
                  </p>
                  <div className="mt-4 flex items-baseline gap-1 justify-start">
                    <span className="text-xl font-extrabold text-indigo-600">{product.price}</span>
                    <span className="text-xs text-slate-500">ر.س</span>
                  </div>
                </CardContent>
                <CardFooter className="gap-2 border-t border-slate-50 p-4">
                  <Link to={`/product/${product.id}`} className="flex-1">
                    <Button variant="outline" size="sm" className="w-full">
                      التفاصيل
                    </Button>
                  </Link>
                  <Button 
                    onClick={() => handleAddToCart(product)}
                    disabled={product.stock === 0}
                    size="sm"
                    className="bg-indigo-600 hover:bg-indigo-700 text-white flex items-center gap-1.5"
                  >
                    <ShoppingBag className="h-4 w-4" />
                    السلة
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-2xl border border-slate-100 shadow-sm">
            <p className="text-lg text-slate-500">لم يتم العثور على أي منتجات تطابق بحثك.</p>
            <Button onClick={() => { setSearch(''); setSelectedCategory('الكل'); }} className="mt-4 bg-indigo-600 text-white">
              إعادة تعيين الفلاتر
            </Button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Products;