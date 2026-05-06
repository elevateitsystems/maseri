import React from "react";
import { CheckCircle } from "lucide-react";

const InfoSection = () => {
  return (
    <section className="py-20 bg-background overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-16">
          <div className="relative order-2 md:order-1">
            <div className="aspect-square relative bg-secondary-100 rounded-2xl overflow-hidden shadow-2xl">
              <div className="absolute inset-0 flex items-center justify-center text-secondary-900/5 font-bold text-6xl select-none">
                ABOUT MASERI
              </div>
            </div>
            {/* Decorative Element */}
            <div className="absolute -bottom-8 -right-8 h-32 w-32 bg-primary rounded-full opacity-20 blur-3xl" />
          </div>

          <div className="space-y-8 order-1 md:order-2">
            <div className="space-y-4">
              <span className="text-primary font-bold tracking-widest text-sm uppercase">قصتنا</span>
              <h2 className="text-3xl md:text-5xl font-bold leading-tight">حيث تلتقي التقاليد مع الحداثة في كل غرزة</h2>
            </div>
            
            <p className="text-lg text-muted-foreground leading-relaxed">
              في ماسيري، نؤمن أن الأناقة لا تتعارض مع الاحتشام. نحن نختار أجود أنواع الأقمشة ونصمم قطعاً فريدة تعكس شخصيتك وتمنحك الثقة والجمال في كل مناسبة.
            </p>

            <ul className="space-y-4">
              {[
                "أقمشة طبيعية عالية الجودة",
                "تصاميم حصرية وفريدة",
                "صناعة يدوية بأيدي خبراء",
                "التزام كامل بمعايير الاستدامة"
              ].map((item, index) => (
                <li key={index} className="flex items-center space-x-3 space-x-reverse">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span className="font-medium">{item}</span>
                </li>
              ))}
            </ul>

            <button className="bg-neutral-0 text-white px-10 py-4 rounded-full hover:bg-primary transition-all duration-300 transform hover:scale-105 shadow-lg">
              اكتشفي المزيد عن هويتنا
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InfoSection;
