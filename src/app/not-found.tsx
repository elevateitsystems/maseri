import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4 text-center">
      <h1 className="text-9xl font-bold text-primary/20 tracking-tighter">
        404
      </h1>
      <h2 className="text-3xl font-bold mt-4 mb-2">
        عذراً، هذه الصفحة غير موجودة
      </h2>
      <p className="text-muted-foreground mb-8">
        يبدو أنك وصلت إلى وجهة خاطئة. هل ترغب في العودة إلى الرئيسية؟
      </p>
      <Link
        href="/"
        className={cn(
          buttonVariants({ variant: "default" }),
          "rounded-full px-12 h-12 flex items-center justify-center",
        )}
      >
        العودة للرئيسية
      </Link>
    </div>
  );
}
