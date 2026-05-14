"use client";

export function MobileOrderButton() {
  return (
    <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/80 backdrop-blur-md border-t border-black/5 md:hidden z-[100]">
      <button
        onClick={() => {
          const el = document.getElementById("order-form");
          el?.scrollIntoView({ behavior: "smooth" });
        }}
        className="w-full bg-black text-white h-14 rounded-[4px] text-[18px] font-bold shadow-xl active:scale-95 transition-transform"
      >
        اطلب الآن
        <br />
        <span className="text-xs">الدفع عند الاستلام</span>
      </button>
    </div>
  );
}
