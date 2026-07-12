"use client";

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useApp } from '@/context/AppContext';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { showSuccess, showError } from '@/utils/toast';
import { UserPlus } from 'lucide-react';

const Register = () => {
  const { register } = useApp();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) {
      showError('الرجاء ملء جميع الحقول المطلوبة');
      return;
    }

    const success = register(name, email);
    if (success) {
      showSuccess('تم إنشاء الحساب بنجاح! أهلاً بك في سوقنا الذكي.');
      navigate('/');
    } else {
      showError('هذا البريد الإلكتروني مسجل بالفعل!');
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-16 flex items-center justify-center min-h-[calc(100vh-16rem)]">
        <Card className="w-full max-w-md shadow-xl border-slate-100">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl font-bold text-slate-900">إنشاء حساب جديد</CardTitle>
            <CardDescription className="text-slate-500">
              انضم إلينا اليوم واستمتع بتجربة تسوق فريدة
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-slate-700">الاسم الكامل</Label>
                <Input 
                  id="name" 
                  type="text" 
                  placeholder="أحمد محمد" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-slate-700">البريد الإلكتروني</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="name@example.com" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="text-left"
                  required
                />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white flex items-center justify-center gap-2">
                <UserPlus className="h-4 w-4" />
                إنشاء الحساب
              </Button>
              <div className="text-sm text-center text-slate-500">
                لديك حساب بالفعل؟{' '}
                <Link to="/login" className="text-indigo-600 hover:underline font-medium">
                  تسجيل الدخول
                </Link>
              </div>
            </CardFooter>
          </form>
        </Card>
      </div>
    </Layout>
  );
};

export default Register;