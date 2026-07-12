"use client";

import React from 'react';
import { Layout } from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ShieldCheck } from 'lucide-react';

const Privacy = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <Card className="border-slate-100 shadow-md text-right">
          <CardHeader className="border-b pb-6 text-center">
            <div className="inline-flex p-3 bg-indigo-50 rounded-full text-indigo-600 mb-4">
              <ShieldCheck className="h-10 w-10" />
            </div>
            <CardTitle className="text-3xl font-extrabold text-slate-900">سياسة الخصوصية وسرية المعلومات</CardTitle>
            <p className="text-slate-500 mt-2">آخر تحديث: {new Date().toLocaleDateString('ar-EG', { year: 'numeric', month: 'long' })}</p>
          </CardHeader>
          <CardContent className="p-8 space-y-6 text-slate-600 leading-relaxed">
            <section className="space-y-3">
              <h3 className="text-xl font-bold text-slate-900">1. مقدمة</h3>
              <p>
                يرحب بكم فريق عمل (سوقنا الذكي)، ويتقدّم بالشكر الجزيل على ثقتكم بنا. ونحيطكم علماً بأنه حرصاً منا ولإدراكنا التام بأن المستخدم له حقوق، فإننا نسعى للحفاظ على المعلومات الخاصة بالمستخدمين وفقاً لآلية سياسة الخصوصية وسرية المعلومات المعمول بها لدينا.
              </p>
            </section>

            <section className="space-y-3">
              <h3 className="text-xl font-bold text-slate-900">2. المعلومات التي نحصل عليها ونحتفظ بها</h3>
              <p>
                نقوم بجمع بعض المعلومات الأساسية لتقديم تجربة تسوق أفضل وأكثر أماناً، وتشمل:
              </p>
              <ul className="list-disc list-inside pr-4 space-y-1">
                <li>المعلومات الشخصية الخاصة بالمستخدم، كالاسم، البريد الإلكتروني، ورقم الجوال.</li>
                <li>معلومات الشحن والتوصيل لتسهيل إيصال الطلبات إليكم.</li>
                <li>معلومات الدخول الشخصية الخاصة بالمستخدم، مثل اسم المستخدم والبريد الإلكتروني.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h3 className="text-xl font-bold text-slate-900">3. مشاركة المعلومات مع أطراف ثالثة</h3>
              <p>
                بطبيعة الحال، فإننا نسعى للاحتفاظ بهذه المعلومات بما يحفظ خصوصيتكم، ولا نقوم بمشاركة هذه المعلومات مع أي جهة خارجية باستثناء شركات الشحن والتوصيل المعتمدة لدينا لغرض توصيل طلباتكم فقط.
              </p>
            </section>

            <section className="space-y-3">
              <h3 className="text-xl font-bold text-slate-900">4. سلامة وسرية المعلومات</h3>
              <p>
                نسعى في (سوقنا الذكي) إلى حماية معلومات المستخدمين باستخدام تقنيات تشفير متطورة لضمان عدم تسريبها أو الوصول إليها من قبل أشخاص غير مصرح لهم.
              </p>
            </section>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Privacy;