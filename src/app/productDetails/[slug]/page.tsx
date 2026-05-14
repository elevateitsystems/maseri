import { api } from "@/lib/api";

import ProductDetailsClient from "./ProductDetailsClient";

export const dynamicParams = false;

export async function generateStaticParams() {
  const products = await api.filterProducts();

  return products.map((product) => ({
    slug: String(product.id),
  }));
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return <ProductDetailsClient slug={slug} />;
}
