import React from "react";
import { Truck, ShieldCheck, RefreshCw, Headphones } from "lucide-react";

const features = [
  {
    icon: <Truck className="h-8 w-8" />,
    title: "شحن سريع",
    desc: "توصيل لجميع أنحاء العالم في وقت قياسي"
  },
  {
    icon: <ShieldCheck className="h-8 w-8" />,
    title: "دفع آمن",
    desc: "نضمن لك عملية دفع مشفرة وآمنة بنسبة 100%"
  },
  {
    icon: <RefreshCw className="h-8 w-8" />,
    title: "استبدال مرن",
    desc: "سياسة استبدال واسترجاع خلال 14 يوماً"
  },
  {
    icon: <Headphones className="h-8 w-8" />,
    title: "دعم متواصل",
    desc: "فريق دعم متاح لمساعدتك على مدار الساعة"
  }
];

const Features = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col items-center text-center space-y-4">
              <div className="h-16 w-16 rounded-full bg-secondary-50 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                {feature.icon}
              </div>
              <h3 className="text-lg font-bold">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
