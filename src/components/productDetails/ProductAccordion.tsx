"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";

interface AccordionItemData {
  title: string;
  content: React.ReactNode;
}

const SizeTable = () => {
  const sizes = ["XS", "S", "M", "L", "XL", "XXL", "SL"];
  
  return (
    <div className="overflow-x-auto w-full mb-4 scrollbar-hide">
      <table className="w-full min-w-[650px] border-collapse border border-[#D1C6B9]">
        <thead>
          <tr className="bg-[#E9E1D8]">
            {Array(5).fill(0).map((_, i) => (
              <th 
                key={i} 
                className="border border-[#D1C6B9] py-5 px-4 text-center text-[18px] font-medium text-black"
              >
                حيث تلتقي
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sizes.map((size, idx) => (
            <tr key={idx} className="group">
              {Array(4).fill(0).map((_, i) => (
                <td 
                  key={i} 
                  className="border border-[#D1C6B9] py-4 px-4 bg-[#F9F7F5] text-center text-[18px] text-black/70 font-medium"
                >
                  78 - 90
                </td>
              ))}
              <td className="border border-[#D1C6B9] py-4 px-4 bg-[#E9E1D8] text-center text-[18px] font-medium text-black">
                {size}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export function ProductAccordion({ product }: any) {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // Default open first one

  const items: AccordionItemData[] = [
    {
      title: "دليل المقاسات",
      content: <SizeTable />,
    },
    {
      title: "وصف المنتج",
      content: (
        <p className="text-[16px] leading-[1.8] text-black/60">
          {product.description || "هذا المنتج مصنوع من خامات عالية الجودة ومناسب للاستخدام اليومي."}
        </p>
      ),
    },
    {
      title: "سياسة التوصيل",
      content: (
        <p className="text-[16px] leading-[1.8] text-black/60">
          يتم التوصيل خلال 3-5 أيام عمل إلى جميع الولايات.
        </p>
      ),
    },
  ];

  const toggle = (i: number) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <div dir="rtl" className="divide-y divide-[#E9E9E9] px-5 md:px-0">
      {items.map((item, i) => (
        <div key={i} className="py-2">
          <button
            onClick={() => toggle(i)}
            className="flex w-full items-center justify-between py-6 text-right group"
          >
            <span className="text-[22px] font-medium text-black group-hover:text-black/70 transition-colors">
              {item.title}
            </span>
            <ChevronDown
              className={`h-6 w-6 text-black transition-transform duration-500 ${
                openIndex === i ? "rotate-180" : ""
              }`}
              strokeWidth={1.2}
            />
          </button>
          <div
            className={`overflow-hidden transition-all duration-500 ease-in-out ${
              openIndex === i ? "max-h-[1000px] opacity-100 pb-8" : "max-h-0 opacity-0"
            }`}
          >
            <div className="transform transition-all duration-500">
              {item.content}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}