import React from "react";

const categories = [
  { id: 1, title: "العبايات" },
  { id: 2, title: "الفساتين" },
  { id: 3, title: "الملابس الكاجوال" },
  { id: 4, title: "الاكسسوارات" },
  { id: 5, title: "الأقمشة" },
];

const Categories = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tighter">فئاتنا</h2>
          <div className="flex justify-center">
             <div className="h-1 w-20 bg-primary" />
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
          {categories.map((cat) => (
            <div key={cat.id} className="group cursor-pointer">
              <div className="aspect-[2/3] relative overflow-hidden rounded-t-full bg-secondary-100 transition-all duration-500 group-hover:scale-105">
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                {/* Placeholder content */}
                <div className="absolute inset-0 flex items-center justify-center text-secondary-900/10 font-bold text-4xl transform -rotate-12 select-none">
                  IMAGE
                </div>
              </div>
              <div className="mt-6 text-center">
                <h3 className="text-xl font-bold transition-colors group-hover:text-primary">
                  {cat.title}
                </h3>
                <p className="text-sm text-muted-foreground mt-1">اكتشفي المزيد</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
