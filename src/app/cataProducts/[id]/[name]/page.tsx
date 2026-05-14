import CataProductCard from '@/components/cataProduct/CataProductCard';
import Features from '@/components/home/components/Features';
import { api } from '@/lib/api';

export const dynamicParams = false;

export async function generateStaticParams() {
  const categories = await api.getCategories();

  return categories.map((category) => ({
    id: String(category.id),
    name: category.name,
  }));
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string; name: string }>;
}) {
  const { id, name } = await params;
  const cataId = parseInt(id);
  const cataName = decodeURIComponent(name);

  return (
    <main>
      <CataProductCard cataId={cataId} cataName={cataName} />
      <Features />
    </main>
  );
}
