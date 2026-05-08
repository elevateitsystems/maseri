"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";

interface AccordionItemData {
  title: string;
  content: string;
}

export function ProductAccordion({ product }: any) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const items: AccordionItemData[] = [
    {
      title: "حيث تلتقي",
      content:
        product.description ||
        "هذا المنتج مصنوع من خامات عالية الجودة ومناسب للاستخدام اليومي.",
    },
    {
      title: "حيث تلتقي",
      content: "يتم التوصيل خلال 3-5 أيام عمل إلى جميع الولايات.",
    },
    {
      title: "حيث تلتقي",
      content: "يمكنك استرجاع المنتج خلال 7 أيام من تاريخ الاستلام.",
    },
  ];

  const toggle = (i: number) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <div dir="rtl" className="divide-y divide-[#E9E9E9]">
      {items.map((item, i) => (
        <div key={i}>
          <button
            onClick={() => toggle(i)}
            className="flex w-full items-center justify-between py-5 text-right"
          >
            <span className="text-[20px] font-medium text-black">
              {item.title}
            </span>
            <ChevronDown
              className={`h-5 w-5 text-black/40 transition-transform duration-300 ${
                openIndex === i ? "rotate-180" : ""
              }`}
              strokeWidth={1.5}
            />
          </button>
          <div
            className={`overflow-hidden transition-all duration-300 ${
              openIndex === i ? "max-h-[200px] pb-5" : "max-h-0"
            }`}
          >
            <p className="text-[16px] leading-[1.8] text-black/60">
              {item.content}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}