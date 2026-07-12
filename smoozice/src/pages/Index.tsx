"use client";

import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '@/context/AppContext';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { showSuccess } from '@/utils/toast';
import { 
  ArrowLeft, 
  ShoppingBag, 
  Sparkles, 
  ShieldCheck, 
  Truck, 
  Clock, 
  Star, 
  ArrowRightLeft 
} from 'lucide-react';

const Index = () => {
  const { products, addToCart } = useApp();

  // Get top 3 products for featured section
  const featuredProducts = products.slice(0, 3);

  const handleAddToCart = (product: any) => {
    addToCart(product, 1);
    showSuccess(`تم إضافة "${product.name}" إلى السلة بنجاح!`);
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-indigo-900 via-indigo-800 to-violet-900 text-white py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-indigo-500/20 via-transparent to-transparent"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 text-right">
              <Badge className="bg-indigo-500/30 text-indigo-200 border-indigo-500/50 px-3 py-1 text-sm">
                مرحباً بك في مستقبل التسوق الذكي ✨
              </Badge>
              <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
                اكتشف أحدث المنتجات <br />
                <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
                  التقنية والذكية
                </span>
              </h1>
              <p className="text-lg text-indigo-100 max-w-xl leading-relaxed">
                نوفر لك تشكيلة فريدة من الأجهزة الذكية والإلكترونيات المبتكرة التي تسهل حياتك اليومية، مع ضمان حقيقي وتوصيل سريع لكافة المناطق.
              </p>
              <div className="flex flex-wrap gap-4 justify-start">
                <Link to="/products">
                  <Button size="lg" className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-8 shadow-lg shadow-amber-500/20">
                    تسوق الآن
                    <ArrowLeft className="mr-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/waitlist">
                  <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10">
                    قائمة الانتظار للحصريات
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative flex justify-center">
              <div className="w-72 h-72 md:w-96 md:h-96 bg-indigo-500/30 rounded-full absolute blur-3xl"></div>
              <img 
                src="https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" 
                alt="Smart Devices" 
                className="rounded-2xl shadow-2xl border border-white/10 max-w-full h-auto object-cover relative z-10 transform hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="flex flex-col items-center text-center p-6 bg-slate-50 rounded-2xl border border-slate-100">
              <div className="p-3 bg-indigo-50 text-indigo-600 rounded-full mb-4">
                <Truck className="h-8 w-8" />
              </div>
              <h3 className="text-lg font-bold mb-2">شحن سريع وآمن</h3>
              <p className="text-sm text-slate-500">توصيل لباب منزلك في أسرع وقت مع تغليف آمن ومحمي.</p>
            </div>

            <div className="flex flex-col items-center text-center p-6 bg-slate-50 rounded-2xl border border-slate-100">
              <div className="p-3 bg-indigo-50 text-indigo-600 rounded-full mb-4">
                <ShieldCheck className="h-8 w-8" />
              </div>
              <h3 className="text-lg font-bold mb-2">ضمان الجودة 100%</h3>
              <p className="text-sm text-slate-500">جميع منتجاتنا أصلية ومضمونة من الوكلاء المعتمدين.</p>
            </div>

            <div className="flex flex-col items-center text-center p-6 bg-slate-50 rounded-2xl border border-slate-100">
              <div className="p-3 bg-indigo-50 text-indigo-600 rounded-full mb-4">
                <Clock className="h-8 w-8" />
              </div>
              <h3 className="text-lg font-bold mb-2">دعم فني متواصل</h3>
              <p className="text-sm text-slate-500">فريق دعم جاهز للرد على استفساراتك ومساعدتك على مدار الساعة.</p>
            </div>

            <div className="flex flex-col items-center text-center p-6 bg-slate-50 rounded-2xl border border-slate-100">
              <div className="p-3 bg-indigo-50 text-indigo-600 rounded-full mb-4">
                <ArrowRightLeft className="h-8 w-8" />
              </div>
              <h3 className="text-lg font-bold mb-2">سياسة استبدال مرنة</h3>
              <p className="text-sm text-slate-500">إمكانية استبدال أو استرجاع المنتجات بكل سهولة ويسر.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-12">
            <div className="text-right">
              <h2 className="text-3xl font-extrabold text-slate-900">المنتجات المميزة</h2>
              <p className="text-slate-500 mt-2">اخترنا لك بعناية أفضل وأحدث المنتجات الأكثر طلباً</p>
            </div>
            <Link to="/products">
              <Button variant="outline" className="border-indigo-600 text-indigo-600 hover:bg-indigo-50">
                عرض الكل
                <ArrowLeft className="mr-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <Card key={product.id} className="overflow-hidden border-slate-100 shadow-md hover:shadow-xl transition-shadow flex flex-col h-full">
                <div className="relative aspect-video overflow-hidden bg-slate-100">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                  <Badge className="absolute top-3 right-3 bg-indigo-600 text-white">
                    {product.category}
                  </Badge>
                </div>
                <CardHeader className="text-right">
                  <CardTitle className="text-xl font-bold text-slate-900 line-clamp-1">
                    {product.name}
                  </CardTitle>
                  <div className="flex items-center gap-1 text-amber-500 mt-1">
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4 fill-current" />
                    <span className="text-xs text-slate-400 mr-1">(4.9)</span>
                  </div>
                </CardHeader>
                <CardContent className="text-right flex-1">
                  <p className="text-sm text-slate-500 line-clamp-2 leading-relaxed">
                    {product.description}
                  </p>
                  <div className="mt-4 flex items-baseline gap-1 justify-start">
                    <span className="text-2xl font-extrabold text-indigo-600">{product.price}</span>
                    <span className="text-sm text-slate-500">ر.س</span>
                  </div>
                </CardContent>
                <CardFooter className="gap-2 border-t border-slate-50 pt-4">
                  <Link to={`/product/${product.id}`} className="flex-1">
                    <Button variant="outline" className="w-full">
                      التفاصيل
                    </Button>
                  </Link>
                  <Button 
                    onClick={() => handleAddToCart(product)}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white flex items-center gap-2"
                  >
                    <ShoppingBag className="h-4 w-4" />
                    السلة
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-indigo-900 text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-violet-500/30 via-transparent to-transparent"></div>
        <div className="container mx-auto px-4 relative z-10 max-w-3xl space-y-6">
          <Sparkles className="h-12 w-12 text-amber-400 mx-auto animate-bounce" />
          <h2 className="text-3xl md:text-4xl font-extrabold">هل تبحث عن منتج معين ولم تجده؟</h2>
          <p className="text-indigo-100 text-lg leading-relaxed">
            سجل في قائمة الانتظار الخاصة بنا وسنقوم بتوفير المنتج لك خصيصاً مع إرسال إشعار فوري لبريدك الإلكتروني فور توفره بخصم خاص!
          </p>
          <div>
            <Link to="/waitlist">
              <Button size="lg" className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-8 shadow-lg">
                سجل في قائمة الانتظار الآن
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;