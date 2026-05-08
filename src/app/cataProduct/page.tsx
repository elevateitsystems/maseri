// "use client"
import CataProductCard from '@/components/cataProduct/CataProductCard';
import Features from '@/components/home/components/Features';
// import { usePathname } from 'next/navigation'

export default async function Page({params}: {params: Promise<{slug: string}>}) {
    // const slug = usePathname()
    const { slug } = await params;
    console.log(slug)
  return (
    <div>
      <CataProductCard/>
      <Features/>
    </div>
  )
}
