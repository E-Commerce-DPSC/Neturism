"use client";

import * as React from "react";
import { Product, ProductVariant } from "@/types/product";

export interface CartItem {
  productId: string;
  variantId: string;
  name: string;
  slug: string;
  size: string;
  price: number;
  image: string;
  quantity: number;
  maxStock: number;
}

interface CartContextType {
  items: CartItem[];
  addItem: (product: Product, variant: ProductVariant, quantity?: number) => boolean;
  updateQuantity: (variantId: string, quantity: number) => void;
  removeItem: (variantId: string) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
}

const CartContext = React.createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = "neturism_cart_v1";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = React.useState<CartItem[]>([]);
  const [isLoaded, setIsLoaded] = React.useState(false);

  // Load from localStorage on mount
  React.useEffect(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      if (saved) {
        setItems(JSON.parse(saved));
      }
    } catch {
      // Ignore parsing errors
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save to localStorage on change
  React.useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch {
      // Ignore storage errors
    }
  }, [items, isLoaded]);

  const addItem = (
    product: Product,
    variant: ProductVariant,
    quantity: number = 1
  ): boolean => {
    if (variant.stock <= 0) return false;

    setItems((prev) => {
      const existingIndex = prev.findIndex((i) => i.variantId === variant.id);

      if (existingIndex > -1) {
        const existing = prev[existingIndex];
        const newQty = Math.min(existing.quantity + quantity, variant.stock);
        const updated = [...prev];
        updated[existingIndex] = { ...existing, quantity: newQty };
        return updated;
      }

      return [
        ...prev,
        {
          productId: product.id,
          variantId: variant.id,
          name: product.name,
          slug: product.slug,
          size: variant.size,
          price: product.price,
          image: product.images[0] || "/images/products/bracelet-crucifix-1.svg",
          quantity: Math.min(quantity, variant.stock),
          maxStock: variant.stock,
        },
      ];
    });

    return true;
  };

  const updateQuantity = (variantId: string, quantity: number) => {
    setItems((prev) =>
      prev
        .map((item) => {
          if (item.variantId === variantId) {
            const validQty = Math.max(1, Math.min(quantity, item.maxStock));
            return { ...item, quantity: validQty };
          }
          return item;
        })
        .filter((item) => item.quantity > 0)
    );
  };

  const removeItem = (variantId: string) => {
    setItems((prev) => prev.filter((item) => item.variantId !== variantId));
  };

  const clearCart = () => {
    setItems([]);
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        updateQuantity,
        removeItem,
        clearCart,
        totalItems,
        subtotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = React.useContext(CartContext);
  if (!context) {
    throw new Error("useCart harus digunakan di dalam CartProvider");
  }
  return context;
}
