"use client";

import * as React from "react";
import { Product } from "@/types/product";
import { PRODUCTS } from "@/lib/data/products";

interface ProductsContextType {
  products: Product[];
  updateVariantStock: (productId: string, variantId: string, newStock: number) => void;
  addProduct: (product: Product) => void;
  deleteProduct: (productId: string) => void;
  resetProducts: () => void;
  getProductBySlug: (slug: string) => Product | undefined;
}

const ProductsContext = React.createContext<ProductsContextType | undefined>(undefined);
const PRODUCTS_STORAGE_KEY = "neturism_products_v1";

export function ProductsProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = React.useState<Product[]>(PRODUCTS);
  const [isLoaded, setIsLoaded] = React.useState(false);

  React.useEffect(() => {
    try {
      const saved = localStorage.getItem(PRODUCTS_STORAGE_KEY);
      if (saved) {
        setProducts(JSON.parse(saved));
      }
    } catch {
      // Ignore parse error
    } finally {
      setIsLoaded(true);
    }
  }, []);

  React.useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(products));
    } catch {
      // Ignore write error
    }
  }, [products, isLoaded]);

  const updateVariantStock = (productId: string, variantId: string, newStock: number) => {
    setProducts((prev) =>
      prev.map((prod) => {
        if (prod.id !== productId) return prod;
        return {
          ...prod,
          variants: prod.variants.map((v) =>
            v.id === variantId ? { ...v, stock: Math.max(0, newStock) } : v
          ),
        };
      })
    );
  };

  const addProduct = (newProduct: Product) => {
    setProducts((prev) => [newProduct, ...prev]);
  };

  const deleteProduct = (productId: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== productId));
  };

  const resetProducts = () => {
    setProducts(PRODUCTS);
    try {
      localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(PRODUCTS));
    } catch {
      // Ignore
    }
  };

  const getProductBySlug = (slug: string) => {
    return products.find((p) => p.slug === slug);
  };

  return (
    <ProductsContext.Provider
      value={{
        products,
        updateVariantStock,
        addProduct,
        deleteProduct,
        resetProducts,
        getProductBySlug,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
}

export function useProducts() {
  const context = React.useContext(ProductsContext);
  if (!context) {
    throw new Error("useProducts harus digunakan di dalam ProductsProvider");
  }
  return context;
}
