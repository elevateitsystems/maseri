export interface Category {
  id: number;
  name: string;
  image: string;
}

export interface Product {
  id: number;
  cataId: number;
  title: string;
  subTitle: string;
  description: string;
  price: number;
  discountPrice: number;
  stock: number;
  favourite: boolean;
  sizeInfo: any; // Using any for JSON fields for now, can be refined
  otherInfo: any;
  images: string | string[]; // Can be a JSON string or parsed array
  tableImage: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}
