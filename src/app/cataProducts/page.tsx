import CataProductCard from '@/components/cataProduct/CataProductCard';
import Features from '@/components/home/components/Features';
import { api } from '@/lib/api';

export default async function Page() {
  const products = await api.filterProducts({});
  
  return (
    <main>
      <CataProductCard 
        cataName="جميع المنتجات" 
        products={products} 
      />
      <Features />
    </main>
  );
}
