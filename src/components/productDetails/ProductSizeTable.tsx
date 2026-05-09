"use client";

import React, { useMemo } from "react";

interface SizeTableProps {
  sizeInfo: any;
  otherInfo: any;
  tableImage?: string;
}

export function ProductSizeTable({ sizeInfo, otherInfo, tableImage }: SizeTableProps) {
  // Parse sizeInfo
  const sizes: string[] = useMemo(() => {
    try {
      if (Array.isArray(sizeInfo)) return sizeInfo;
      if (typeof sizeInfo === "string") return JSON.parse(sizeInfo);
      return [];
    } catch {
      return [];
    }
  }, [sizeInfo]);

  // Parse otherInfo
  const otherDetails: { question: string; answer: string }[] = useMemo(() => {
    try {
      if (Array.isArray(otherInfo)) return otherInfo;
      if (typeof otherInfo === "string") return JSON.parse(otherInfo);
      return [];
    } catch {
      return [];
    }
  }, [otherInfo]);

  // Static measurement data for size table (placeholder matching Figma layout)
  const measurements = [
    { size: "XS", chest: "10-40", waist: "15-40", hip: "10-40", length: "15-40" },
    { size: "S", chest: "10-40", waist: "15-40", hip: "10-40", length: "15-40" },
    { size: "M", chest: "10-40", waist: "15-40", hip: "10-40", length: "15-40" },
    { size: "L", chest: "10-40", waist: "15-40", hip: "10-40", length: "15-40" },
    { size: "XL", chest: "10-40", waist: "15-40", hip: "10-40", length: "15-40" },
    { size: "XXL", chest: "10-40", waist: "15-40", hip: "10-40", length: "15-40" },
    { size: "3XL", chest: "10-40", waist: "15-40", hip: "10-40", length: "15-40" },
  ];

  const tableHeaders = ["حيث تلتقي", "حيث تلتقي", "حيث تلتقي", "حيث تلتقي"];

  return (
    <div dir="rtl">
      {/* Size Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-right">
          {/* Header */}
          <thead>
            <tr className="bg-[#B3A495]">
              <th className="px-5 py-3 text-[16px] font-medium text-white">
                حيث تلتقي
              </th>
              {tableHeaders.map((header, i) => (
                <th
                  key={i}
                  className="px-5 py-3 text-[16px] font-medium text-white"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>

          {/* Body */}
          <tbody>
            {measurements.map((row, index) => (
              <tr
                key={row.size}
                className={index % 2 === 0 ? "bg-white" : "bg-[#E9E9E9]"}
              >
                <td className="px-5 py-3 text-[16px] font-medium text-black">
                  {row.size}
                </td>
                <td className="px-5 py-3 text-[16px] text-black/70">
                  {row.chest}
                </td>
                <td className="px-5 py-3 text-[16px] text-black/70">
                  {row.waist}
                </td>
                <td className="px-5 py-3 text-[16px] text-black/70">
                  {row.hip}
                </td>
                <td className="px-5 py-3 text-[16px] text-black/70">
                  {row.length}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Other Info */}
      {otherDetails.length > 0 && (
        <div className="mt-8 space-y-4">
          {otherDetails.map((item, i) => (
            <div
              key={i}
              className="flex items-start gap-3 border-b border-[#E9E9E9] pb-4"
            >
              <p className="text-[16px] font-medium text-black">
                {item.question}
              </p>
              <p className="text-[16px] text-black/60">{item.answer}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
