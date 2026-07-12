"use client";

import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '@/context/AppContext';
import { Layout } from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ClipboardList, ShoppingBag, Calendar, MapPin, CreditCard } from 'lucide-react';

const MyOrders = () => {
  const { orders, currentUser } = useApp();

  // Filter orders for current user
  const userOrders = orders.filter(o => o.userId === currentUser?.id || o.userEmail === currentUser?.email);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge className="bg-amber-50 text-amber-700 border-amber-200">قيد المراجعة</Badge>;
      case 'processing':
        return <Badge className="bg-blue-50 text-blue-700 border-blue-200">جاري التجهيز</Badge>;
      case 'shipped':
        return <Badge className="bg-indigo-50 text-indigo-700 border-indigo-200">تم الشحن</Badge>;
      case 'delivered':
        return <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200">تم التوصيل</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  if (userOrders.length === 0) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-20 text-center max-w-md">
          <div className="p-4 bg-indigo-50 rounded-full text-indigo-600 w-20 h-20 flex items-center justify-center mx-auto mb-6">
            <ClipboardList className="h-10 w-10" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">لا توجد طلبات سابقة!</h2>
          <p className="text-slate-500 mb-8">لم تقم بإجراء أي طلبات شراء حتى الآن.</p>
          <Link to="/products">
            <Button className="bg-indigo-600 hover:bg-indigo-700 text-white w-full py-6 text-lg">
              ابدأ التسوق الآن
            </Button>
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-extrabold text-slate-900 text-right mb-8">طلباتي السابقة</h1>

        <div className="space-y-6 max-w-4xl mx-auto">
          {userOrders.map((order) => (
            <Card key={order.id} className="border-slate-100 shadow-sm overflow-hidden text-right">
              <CardHeader className="bg-slate-50 border-b p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex flex-wrap gap-4 text-sm text-slate-600">
                  <div className="flex items-center gap-1">
                    <span className="font-bold text-slate-900">رقم الطلب:</span>
                    <span className="font-mono text-indigo-600 font-semibold">{order.id}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4 text-slate-400" />
                    <span>{order.date}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-slate-500">الحالة:</span>
                  {getStatusBadge(order.status)}
                </div>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                {/* Order Items */}
                <div className="space-y-4">
                  <h4 className="font-bold text-slate-900 text-sm border-b pb-2">المنتجات المطلوبة</h4>
                  {order.items.map((item) => (
                    <div key={item.product.id} className="flex items-center gap-4 justify-between text-sm">
                      <div className="flex items-center gap-3">
                        <img 
                          src={item.product.image} 
                          alt={item.product.name} 
                          className="w-12 h-12 object-cover rounded"
                        />
                        <div>
                          <p className="font-semibold text-slate-800">{item.product.name}</p>
                          <p className="text-xs text-slate-400">الكمية: {item.quantity} × {item.product.price} ر.س</p>
                        </div>
                      </div>
                      <span className="font-bold text-slate-900">{item.product.price * item.quantity} ر.س</span>
                    </div>
                  ))}
                </div>

                {/* Shipping & Payment Info */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t text-sm text-slate-600">
                  <div className="space-y-2">
                    <h5 className="font-bold text-slate-900 flex items-center gap-1 justify-start">
                      <MapPin className="h-4 w-4 text-indigo-600" />
                      عنوان التوصيل
                    </h5>
                    <p>{order.shippingDetails.fullName}</p>
                    <p>{order.shippingDetails.city}، {order.shippingDetails.address}</p>
                    <p>الجوال: {order.shippingDetails.phone}</p>
                  </div>
                  <div className="space-y-2">
                    <h5 className="font-bold text-slate-900 flex items-center gap-1 justify-start">
                      <CreditCard className="h-4 w-4 text-indigo-600" />
                      طريقة الدفع والإجمالي
                    </h5>
                    <p>طريقة الدفع: {order.shippingDetails.paymentMethod}</p>
                    <p className="text-base font-extrabold text-slate-900 pt-2">
                      الإجمالي المدفوع:{' '}
                      <span className="text-indigo-600">{order.total} ر.س</span>
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default MyOrders;