import { Skeleton } from "@/components/ui/skeleton";

export function ProductDetailsSkeleton() {
  return (
    <div className="container mx-auto md:mt-44 space-y-16 animate-pulse">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 px-4 md:px-0">
        {/* Column 1: Info Skeleton */}
        <div className="order-2 lg:order-1 flex flex-col space-y-6">
          <Skeleton className="h-12 w-3/4 self-end" />
          <div className="flex gap-4 self-end">
             <Skeleton className="h-8 w-24" />
             <Skeleton className="h-8 w-32" />
          </div>
          <Skeleton className="h-24 w-full" />
          
          <div className="grid grid-cols-2 gap-4">
            <Skeleton className="h-14 w-full" />
            <Skeleton className="h-14 w-full" />
            <Skeleton className="h-14 w-full" />
            <Skeleton className="h-14 w-full" />
          </div>

          <div className="space-y-3">
             <Skeleton className="h-6 w-24 self-end" />
             <div className="flex gap-3 self-end">
                <Skeleton className="h-11 w-20" />
                <Skeleton className="h-11 w-20" />
                <Skeleton className="h-11 w-20" />
             </div>
          </div>

          <div className="flex gap-4 items-center">
            <Skeleton className="h-12 flex-1" />
            <Skeleton className="h-12 w-32" />
          </div>
        </div>

        {/* Column 2: Gallery Skeleton */}
        <div className="order-1 lg:order-2 flex flex-row gap-4 h-full">
          <Skeleton className="flex-1 aspect-[3/4]" />
          <div className="hidden md:flex flex-col gap-4 w-[100px]">
            <Skeleton className="aspect-[3/4] w-full" />
            <Skeleton className="aspect-[3/4] w-full" />
            <Skeleton className="aspect-[3/4] w-full" />
          </div>
        </div>
      </div>

      {/* Accordion Skeleton */}
      <div className="space-y-4 px-4 md:px-0">
        <Skeleton className="h-14 w-full" />
        <Skeleton className="h-14 w-full" />
        <Skeleton className="h-14 w-full" />
      </div>
    </div>
  );
}
