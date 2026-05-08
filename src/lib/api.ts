import { Product, Category, ApiResponse } from "@/types/api";

const BASE_URL = 'https://back.testwebapp.space/';

export const api = {
  async getCategories(): Promise<Category[]> {
    const response = await fetch(`${BASE_URL}getCata`);
    if (!response.ok) throw new Error("Failed to fetch categories");
    return response.json();
  },

  async filterProducts(filters: any = {}): Promise<Product[]> {
    const response = await fetch(`${BASE_URL}filterProducts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(filters),
    });
    console.log(response)
    if (!response.ok) throw new Error("Failed to fetch products");
    const result: ApiResponse<Product[]> = await response.json();
    return result.data || [];
  },

  async filterOrders(payload: any = { cataId: 1 }): Promise<Product[]> {
    const response = await fetch(`${BASE_URL}filterOrders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
    if (!response.ok) throw new Error("Failed to fetch data from filterOrders");
    const result: ApiResponse<Product[]> = await response.json();
    return result.data || [];
  },

  async getProducts(): Promise<Product[]> {
    return this.filterOrders({ cataId: 1 });
  }
};

export const getImageUrl = (path: string) => {
  if (!path) return "";
  if (path.startsWith("http")) return path;
  return `${BASE_URL}${path}`;
};
