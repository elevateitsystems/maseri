// "use client"
import CataProductCard from '@/components/cataProduct/CataProductCard';
import Features from '@/components/home/components/Features';
// import { usePathname } from 'next/navigation'

export default async function Page({params}: {params: Promise<{slug: string}>}) {
    const { slug } = await params;
    const cataId = parseInt(slug) || 1;
    
    return (
    <div>
      <CataProductCard cataId={cataId} />
      <Features/>
    </div>
  )
}
