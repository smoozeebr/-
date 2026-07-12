"use client";

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { Layout } from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { showSuccess, showError } from '@/utils/toast';
import { 
  ShieldAlert, 
  Plus, 
  Trash2, 
  ShoppingBag, 
  ClipboardList, 
  Users, 
  MessageSquare, 
  Check, 
  X 
} from 'lucide-react';

const AdminDashboard = () => {
  const { 
    products, 
    orders, 
    waitlist, 
    messages, 
    addProduct, 
    deleteProduct, 
    updateOrderStatus,
    currentUser 
  } = useApp();

  // Form states for adding a product
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [category, setCategory] = useState('إلكترونيات');
  const [stock, setStock] = useState('');
  const [features, setFeatures] = useState('');

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !description || !price || !image || !stock) {
      showError('الرجاء ملء جميع الحقول المطلوبة للمنتج');
      return;
    }

    addProduct({
      name,
      description,
      price: Number(price),
      image,
      category,
      stock: Number(stock),
      features: features ? features.split(',').map(f => f.trim()) : ['ميزة عامة']
    });

    showSuccess('تم إضافة المنتج الجديد بنجاح!');
    // Reset form
    setName('');
    setDescription('');
    setPrice('');
    setImage('');
    setStock('');
    setFeatures('');
  };

  // Check if user is admin
  if (currentUser?.role !== 'admin') {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-20 text-center max-w-md">
          <div className="p-4 bg-rose-50 rounded-full text-rose-600 w-20 h-20 flex items-center justify-center mx-auto mb-6">
            <ShieldAlert className="h-10 w-10" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">غير مصرح بالدخول!</h2>
          <p className="text-slate-500 mb-8">هذه الصفحة مخصصة لمدير النظام فقط.</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="text-right mb-10">
          <h1 className="text-3xl font-extrabold text-slate-900 flex items-center gap-2 justify-start">
            <ShieldAlert className="h-8 w-8 text-amber-500" />
            لوحة تحكم المدير العام
          </h1>
          <p className="text-slate-500 mt-2">إدارة المنتجات، الطلبات، قائمة الانتظار، ورسائل العملاء</p>
        </div>

        <Tabs defaultValue="products" className="space-y-8" dir="rtl">
          <TabsList className="grid grid-cols-4 w-full max-w-2xl bg-slate-100 p-1 rounded-xl">
            <TabsTrigger value="products" className="rounded-lg">المنتجات ({products.length})</TabsTrigger>
            <TabsTrigger value="orders" className="rounded-lg">الطلبات ({orders.length})</TabsTrigger>
            <TabsTrigger value="waitlist" className="rounded-lg">الويتليست ({waitlist.length})</TabsTrigger>
            <TabsTrigger value="messages" className="rounded-lg">الرسائل ({messages.length})</TabsTrigger>
          </TabsList>

          {/* Products Tab */}
          <TabsContent value="products" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
              {/* Add Product Form */}
              <Card className="border-slate-100 shadow-sm text-right lg:col-span-1">
                <CardHeader>
                  <CardTitle className="text-lg font-bold text-slate-900 flex items-center gap-2 justify-start">
                    <Plus className="h-5 w-5 text-indigo-600" />
                    إضافة منتج جديد
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleAddProduct} className="space-y-4">
                    <div className="space-y-1">
                      <Label htmlFor="prodName">اسم المنتج</Label>
                      <Input id="prodName" value={name} onChange={(e) => setName(e.target.value)} required />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="prodDesc">الوصف</Label>
                      <Textarea id="prodDesc" value={description} onChange={(e) => setDescription(e.target.value)} required />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <Label htmlFor="prodPrice">السعر (ر.س)</Label>
                        <Input id="prodPrice" type="number" value={price} onChange={(e) => setPrice(e.target.value)} required />
                      </div>
                      <div className="space-y-1">
                        <Label htmlFor="prodStock">الكمية بالمخزن</Label>
                        <Input id="prodStock" type="number" value={stock} onChange={(e) => setStock(e.target.value)} required />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="prodCategory">الفئة</Label>
                      <select 
                        id="prodCategory" 
                        value={category} 
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full border rounded-md p-2 bg-white text-right"
                      >
                        <option value="إلكترونيات">إلكترونيات</option>
                        <option value="صوتيات">صوتيات</option>
                        <option value="إكسسوارات">إكسسوارات</option>
                      </select>
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="prodImage">رابط الصورة (URL)</Label>
                      <Input id="prodImage" value={image} onChange={(e) => setImage(e.target.value)} placeholder="https://..." required />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="prodFeatures">المميزات (مفصولة بفاصلة ,)</Label>
                      <Input id="prodFeatures" value={features} onChange={(e) => setFeatures(e.target.value)} placeholder="ميزة 1, ميزة 2" />
                    </div>
                    <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white">
                      إضافة المنتج
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Products List */}
              <Card className="border-slate-100 shadow-sm text-right lg:col-span-2">
                <CardHeader>
                  <CardTitle className="text-lg font-bold text-slate-900">المنتجات الحالية</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {products.map((product) => (
                    <div key={product.id} className="flex items-center justify-between p-4 border rounded-lg gap-4">
                      <div className="flex items-center gap-4">
                        <img src={product.image} alt={product.name} className="w-12 h-12 object-cover rounded" />
                        <div>
                          <h4 className="font-bold text-slate-900">{product.name}</h4>
                          <p className="text-xs text-slate-400">{product.category} • {product.price} ر.س • المخزن: {product.stock}</p>
                        </div>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => {
                          deleteProduct(product.id);
                          showSuccess('تم حذف المنتج بنجاح');
                        }}
                        className="text-rose-500 hover:text-rose-600 hover:bg-rose-50"
                      >
                        <Trash2 className="h-5 w-5" />
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Orders Tab */}
          <TabsContent value="orders">
            <Card className="border-slate-100 shadow-sm text-right">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-slate-900">إدارة طلبات العملاء</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {orders.length === 0 ? (
                  <p className="text-slate-500 text-center py-8">لا توجد طلبات مسجلة حالياً.</p>
                ) : (
                  orders.map((order) => (
                    <div key={order.id} className="border rounded-xl p-4 space-y-4">
                      <div className="flex flex-wrap justify-between items-center gap-4 border-b pb-2">
                        <div>
                          <span className="font-bold text-slate-900">رقم الطلب: {order.id}</span>
                          <span className="text-xs text-slate-400 mr-4">التاريخ: {order.date}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-slate-500">تحديث الحالة:</span>
                          <select 
                            value={order.status} 
                            onChange={(e) => {
                              updateOrderStatus(order.id, e.target.value as any);
                              showSuccess('تم تحديث حالة الطلب بنجاح');
                            }}
                            className="border rounded p-1 text-sm bg-white"
                          >
                            <option value="pending">قيد المراجعة</option>
                            <option value="processing">جاري التجهيز</option>
                            <option value="shipped">تم الشحن</option>
                            <option value="delivered">تم التوصيل</option>
                          </select>
                        </div>
                      </div>

                      <div className="text-sm text-slate-600 space-y-1">
                        <p><span className="font-bold text-slate-800">العميل:</span> {order.shippingDetails.fullName} ({order.userEmail})</p>
                        <p><span className="font-bold text-slate-800">العنوان:</span> {order.shippingDetails.city}، {order.shippingDetails.address} • جوال: {order.shippingDetails.phone}</p>
                        <p><span className="font-bold text-slate-800">طريقة الدفع:</span> {order.shippingDetails.paymentMethod}</p>
                        <p className="font-bold text-indigo-600">الإجمالي: {order.total} ر.س</p>
                      </div>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Waitlist Tab */}
          <TabsContent value="waitlist">
            <Card className="border-slate-100 shadow-sm text-right">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-slate-900">المسجلون في قائمة الانتظار</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {waitlist.length === 0 ? (
                  <p className="text-slate-500 text-center py-8">لا يوجد مسجلون في قائمة الانتظار حالياً.</p>
                ) : (
                  waitlist.map((entry) => (
                    <div key={entry.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <p className="font-bold text-slate-900">{entry.email}</p>
                        <p className="text-xs text-slate-400">المنتج المهتم به: {entry.productName} • التاريخ: {entry.date}</p>
                      </div>
                      <Badge className="bg-indigo-50 text-indigo-600 border-indigo-100">قائمة الانتظار</Badge>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Messages Tab */}
          <TabsContent value="messages">
            <Card className="border-slate-100 shadow-sm text-right">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-slate-900">رسائل واستفسارات العملاء</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {messages.length === 0 ? (
                  <p className="text-slate-500 text-center py-8">لا توجد رسائل واردة حالياً.</p>
                ) : (
                  messages.map((msg) => (
                    <div key={msg.id} className="border rounded-lg p-4 space-y-2">
                      <div className="flex justify-between items-center">
                        <h4 className="font-bold text-slate-900">{msg.subject}</h4>
                        <span className="text-xs text-slate-400">{msg.date}</span>
                      </div>
                      <p className="text-sm text-slate-600">{msg.message}</p>
                      <div className="text-xs text-slate-400 border-t pt-2">
                        المرسل: {msg.name} ({msg.email})
                      </div>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default AdminDashboard;