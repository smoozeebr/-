"use client";

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { showSuccess, showError } from '@/utils/toast';
import { Hourglass, CheckCircle, Sparkles } from 'lucide-react';

const Waitlist = () => {
  const { addWaitlist, waitlist } = useApp();
  const [email, setEmail] = useState('');
  const [productName, setProductName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      showError('الرجاء إدخال البريد الإلكتروني');
      return;
    }

    addWaitlist(email, productName || 'المنتجات الجديدة العامة');
    showSuccess('تم تسجيلك في قائمة الانتظار بنجاح! سنقوم بإعلامك فور توفر المنتجات.');
    setEmail('');
    setProductName('');
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="inline-flex p-3 bg-indigo-50 rounded-full text-indigo-600 mb-4">
            <Hourglass className="h-8 w-8 animate-spin" style={{ animationDuration: '3s' }} />
          </div>
          <h1 className="text-4xl font-extrabold text-slate-900 mb-4">قائمة الانتظار للمنتجات الحصرية</h1>
          <p className="text-lg text-slate-600 leading-relaxed">
            كن أول من يعلم عندما تتوفر منتجاتنا الحصرية والذكية في المخزون. سجل بريدك الإلكتروني الآن واحصل على خصم خاص بنسبة 15% فور الإطلاق!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto items-start">
          {/* Form Card */}
          <Card className="shadow-lg border-slate-100">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-amber-500" />
                انضم الآن مجاناً
              </CardTitle>
              <CardDescription>
                املأ البيانات التالية لتأكيد حجز مكانك في القائمة
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-slate-700">البريد الإلكتروني</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="yourname@example.com" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="text-left"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="product" className="text-slate-700">المنتج المهتم به (اختياري)</Label>
                  <Input 
                    id="product" 
                    type="text" 
                    placeholder="مثال: ساعة ذكية برو X" 
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                  />
                </div>
                <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white">
                  سجلني في القائمة
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Benefits Card */}
          <div className="space-y-6 bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900">مميزات الانضمام لقائمة الانتظار:</h3>
            
            <div className="space-y-4">
              <div className="flex gap-3 items-start">
                <div className="p-1 bg-emerald-50 rounded text-emerald-600 mt-0.5">
                  <CheckCircle className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-800">أولوية الشراء</h4>
                  <p className="text-sm text-slate-500">احصل على فرصة شراء المنتجات قبل طرحها للعامة بـ 24 ساعة.</p>
                </div>
              </div>

              <div className="flex gap-3 items-start">
                <div className="p-1 bg-emerald-50 rounded text-emerald-600 mt-0.5">
                  <CheckCircle className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-800">خصم حصري 15%</h4>
                  <p className="text-sm text-slate-500">كود خصم خاص يرسل لبريدك الإلكتروني فور توفر المنتج.</p>
                </div>
              </div>

              <div className="flex gap-3 items-start">
                <div className="p-1 bg-emerald-50 rounded text-emerald-600 mt-0.5">
                  <CheckCircle className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-800">تحديثات فورية</h4>
                  <p className="text-sm text-slate-500">رسائل بريدية دورية تطلعك على مراحل التصنيع والشحن.</p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 text-center">
              <p className="text-xs text-slate-400">
                انضم إلينا الآن! يوجد حالياً <span className="font-bold text-indigo-600">{waitlist.length + 142}</span> شخص مسجل في القائمة.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Waitlist;