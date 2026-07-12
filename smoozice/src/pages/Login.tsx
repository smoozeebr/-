"use client";

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useApp } from '@/context/AppContext';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { showSuccess, showError } from '@/utils/toast';
import { LogIn, Shield, User } from 'lucide-react';

const Login = () => {
  const { login } = useApp();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<'user' | 'admin'>('user');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      showError('الرجاء إدخال البريد الإلكتروني');
      return;
    }

    const success = login(email, role);
    if (success) {
      showSuccess(`مرحباً بك مجدداً! تم تسجيل الدخول بنجاح كـ ${role === 'admin' ? 'مدير' : 'مستخدم'}`);
      if (role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/');
      }
    } else {
      showError('حدث خطأ أثناء تسجيل الدخول');
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-16 flex items-center justify-center min-h-[calc(100vh-16rem)]">
        <Card className="w-full max-w-md shadow-xl border-slate-100">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl font-bold text-slate-900">تسجيل الدخول</CardTitle>
            <CardDescription className="text-slate-500">
              أدخل بريدك الإلكتروني للوصول إلى حسابك
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-6">
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
                <p className="text-xs text-slate-400 text-right">
                  * للتجربة السريعة: يمكنك كتابة أي بريد إلكتروني وسيتم تسجيلك فوراً.
                </p>
              </div>

              <div className="space-y-3">
                <Label className="text-slate-700">نوع الحساب</Label>
                <RadioGroup 
                  value={role} 
                  onValueChange={(value) => setRole(value as 'user' | 'admin')}
                  className="grid grid-cols-2 gap-4"
                >
                  <div>
                    <RadioGroupItem value="user" id="user" className="peer sr-only" />
                    <Label
                      htmlFor="user"
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-indigo-600 [&:has([data-state=checked])]:border-indigo-600 cursor-pointer"
                    >
                      <User className="mb-2 h-6 w-6 text-slate-600" />
                      <span className="text-sm font-semibold">مستخدم عادي</span>
                    </Label>
                  </div>
                  <div>
                    <RadioGroupItem value="admin" id="admin" className="peer sr-only" />
                    <Label
                      htmlFor="admin"
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-amber-500 [&:has([data-state=checked])]:border-amber-500 cursor-pointer"
                    >
                      <Shield className="mb-2 h-6 w-6 text-slate-600" />
                      <span className="text-sm font-semibold">مدير النظام</span>
                    </Label>
                  </div>
                </RadioGroup>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white flex items-center justify-center gap-2">
                <LogIn className="h-4 w-4" />
                تسجيل الدخول
              </Button>
              <div className="text-sm text-center text-slate-500">
                ليس لديك حساب؟{' '}
                <Link to="/register" className="text-indigo-600 hover:underline font-medium">
                  إنشاء حساب جديد
                </Link>
              </div>
            </CardFooter>
          </form>
        </Card>
      </div>
    </Layout>
  );
};

export default Login;