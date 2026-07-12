"use client";

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '@/context/AppContext';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { showSuccess, showError } from '@/utils/toast';
import { CreditCard, Truck, CheckCircle } from 'lucide-react';

const Checkout = () => {
  const { cart, placeOrder, currentUser } = useApp();
  const navigate = useNavigate();

  const [fullName, setFullName] = useState(currentUser?.name || '');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('cod'); // cod = cash on delivery

  const total = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone || !address || !city) {
      showError('الرجاء ملء جميع حقول الشحن المطلوبة');
      return;
    }

    const order = placeOrder({
      fullName,
      phone,
      address,
      city,
      paymentMethod: paymentMethod === 'cod' ? 'الدفع عند الاستلام' : 'بطاقة مدى / فيزا'
    });

    showSuccess(`تم تسجيل طلبك بنجاح برقم: ${order.id}! سنقوم بالتواصل معك قريباً.`);
    navigate('/my-orders');
  };

  if (cart.length === 0) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">لا توجد منتجات لإتمام الطلب!</h2>
          <Button onClick={() => navigate('/products')} className="bg-indigo-600 text-white">تصفح المنتجات</Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-extrabold text-slate-900 text-right mb-8">إتمام الطلب والدفع</h1>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Shipping Details Form */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="border-slate-100 shadow-sm text-right">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-slate-900 flex items-center gap-2 justify-start">
                  <Truck className="h-5 w-5 text-indigo-600" />
                  تفاصيل الشحن والتوصيل
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">الاسم الكامل للمستلم</Label>
                    <Input 
                      id="fullName" 
                      placeholder="مثال: أحمد محمد" 
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">رقم الجوال</Label>
                    <Input 
                      id="phone" 
                      placeholder="05xxxxxxxx" 
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">المدينة</Label>
                    <Input 
                      id="city" 
                      placeholder="مثال: الرياض" 
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address">العنوان بالتفصيل (الحي، الشارع)</Label>
                    <Input 
                      id="address" 
                      placeholder="مثال: حي الياسمين، شارع العليا" 
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      required
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payment Method */}
            <Card className="border-slate-100 shadow-sm text-right">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-slate-900 flex items-center gap-2 justify-start">
                  <CreditCard className="h-5 w-5 text-indigo-600" />
                  طريقة الدفع المفضلة
                </CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-3">
                  <div className="flex items-center justify-between p-4 border rounded-lg cursor-pointer hover:bg-slate-50">
                    <div className="flex items-center gap-3">
                      <RadioGroupItem value="cod" id="cod" />
                      <Label htmlFor="cod" className="font-bold text-slate-800 cursor-pointer">الدفع عند الاستلام (COD)</Label>
                    </div>
                    <span className="text-xs text-slate-400">ادفع نقداً أو بالبطاقة للمندوب</span>
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg cursor-pointer hover:bg-slate-50">
                    <div className="flex items-center gap-3">
                      <RadioGroupItem value="online" id="online" />
                      <Label htmlFor="online" className="font-bold text-slate-800 cursor-pointer">بطاقة مدى / فيزا / ماستركارد</Label>
                    </div>
                    <span className="text-xs text-slate-400">دفع إلكتروني آمن ومحمي</span>
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary & Submit */}
          <div className="space-y-6">
            <Card className="border-slate-100 shadow-md p-6 text-right">
              <h3 className="text-lg font-bold text-slate-900 border-b pb-4 mb-4">مراجعة الطلب</h3>
              
              <div className="max-h-60 overflow-y-auto space-y-3 mb-6 pr-1">
                {cart.map((item) => (
                  <div key={item.product.id} className="flex justify-between items-center text-sm">
                    <div className="text-right">
                      <p className="font-semibold text-slate-800 line-clamp-1">{item.product.name}</p>
                      <p className="text-xs text-slate-400">الكمية: {item.quantity}</p>
                    </div>
                    <span className="font-bold text-slate-900">{item.product.price * item.quantity} ر.س</span>
                  </div>
                ))}
              </div>

              <hr className="my-4" />

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
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-6 text-lg font-bold flex items-center justify-center gap-2"
              >
                <CheckCircle className="h-5 w-5" />
                تأكيد وإرسال الطلب
              </Button>
            </Card>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default Checkout;