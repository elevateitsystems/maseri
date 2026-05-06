import React from "react";
import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-secondary-50 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand Info */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tighter">MASERI</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              ماسيري هي وجهتكم الأولى للأزياء الراقية والمحتشمة. نسعى لتقديم أفضل التصاميم التي تجمع بين الحداثة والتقاليد.
            </p>
            <div className="flex space-x-4 space-x-reverse text-sm font-medium">
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                Instagram
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                Facebook
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-4">روابط سريعة</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/home" className="hover:text-primary transition-colors">الرئيسية</Link></li>
              <li><Link href="/collections" className="hover:text-primary transition-colors">مجموعتنا</Link></li>
              <li><Link href="/about" className="hover:text-primary transition-colors">من نحن</Link></li>
              <li><Link href="/contact" className="hover:text-primary transition-colors">اتصل بنا</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="font-bold text-lg mb-4">خدمة العملاء</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="#" className="hover:text-primary transition-colors">الشحن والتوصيل</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">سياسة الاسترجاع</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">الأسئلة الشائعة</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">جدول القياسات</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-bold text-lg mb-4">اتصل بنا</h3>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li className="flex items-start space-x-3 space-x-reverse">
                <MapPin className="h-5 w-5 text-primary shrink-0" />
                <span>شارع الأزياء، الرياض، المملكة العربية السعودية</span>
              </li>
              <li className="flex items-center space-x-3 space-x-reverse">
                <Phone className="h-5 w-5 text-primary shrink-0" />
                <span>+966 123 456 789</span>
              </li>
              <li className="flex items-center space-x-3 space-x-reverse">
                <Mail className="h-5 w-5 text-primary shrink-0" />
                <span>info@maseri.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t text-center text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} ماسيري. جميع الحقوق محفوظة.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
