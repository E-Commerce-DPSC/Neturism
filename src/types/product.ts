export interface ProductVariant {
  id: string;
  size: string; // e.g. "17 cm", "19 cm", "21 cm", "US 8", "US 9", "One Size"
  sku: string;
  stock: number;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: "gelang" | "cincin" | "kalung" | "tubuh" | "pendukung";
  categoryLabel: string;
  price: number;
  description: string;
  material: string;
  specifications: string[];
  careInstructions: string[];
  images: string[];
  variants: ProductVariant[];
  isFeatured?: boolean;
  isNewDrop?: boolean;
}
