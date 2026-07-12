"use client";

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { showSuccess, showError } from '@/utils/toast';
import { MessageSquare, Mail, Phone, MapPin } from 'lucide-react';

const Contact = () => {
  const { sendMessage } = useApp();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !subject || !message) {
      showError('الرجاء ملء جميع الحقول المطلوبة لإرسال الرسالة');
      return;
    }

    sendMessage(name, email, subject, message);
    showSuccess('تم إرسال رسالتك بنجاح! سيقوم فريق الدعم بالرد عليك قريباً.');
    
    // Reset form
    setName('');
    setEmail('');
    setSubject('');
    setMessage('');
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-4xl font-extrabold text-slate-900 mb-4">اتصل بنا</h1>
          <p className="text-lg text-slate-600 leading-relaxed">
            يسعدنا دائماً تواصلك معنا. إذا كان لديك أي استفسار، اقتراح، أو شكوى، فلا تتردد في مراسلتنا وسيقوم فريقنا بالرد عليك في أقرب وقت ممكن.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto items-start">
          {/* Contact Info */}
          <div className="space-y-6 md:col-span-1">
            <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm text-right space-y-6">
              <h3 className="text-lg font-bold text-slate-900 border-b pb-3">معلومات الاتصال</h3>
              
              <div className="flex gap-3 items-start">
                <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600 mt-0.5">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-800">البريد الإلكتروني</h4>
                  <p className="text-sm text-slate-500">support@souqsmart.com</p>
                </div>
              </div>

              <div className="flex gap-3 items-start">
                <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600 mt-0.5">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-800">الهاتف المباشر</h4>
                  <p className="text-sm text-slate-500">+966 500 000 000</p>
                </div>
              </div>

              <div className="flex gap-3 items-start">
                <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600 mt-0.5">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-800">المقر الرئيسي</h4>
                  <p className="text-sm text-slate-500">الرياض، المملكة العربية السعودية</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <Card className="shadow-lg border-slate-100 md:col-span-2 text-right">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-slate-900 flex items-center gap-2 justify-start">
                <MessageSquare className="h-5 w-5 text-indigo-600" />
                أرسل لنا رسالة مباشرة
              </CardTitle>
              <CardDescription>
                سنقوم بالرد على استفسارك خلال 24 ساعة عمل كحد أقصى
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">الاسم الكامل</Label>
                    <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">البريد الإلكتروني</Label>
                    <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="text-left" required />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subject">موضوع الرسالة</Label>
                  <Input id="subject" value={subject} onChange={(e) => setSubject(e.target.value)} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">نص الرسالة</Label>
                  <Textarea id="message" rows={5} value={message} onChange={(e) => setMessage(e.target.value)} required />
                </div>
                <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-6 text-lg">
                  إرسال الرسالة الآن
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;