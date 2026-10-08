"use client";

import * as React from "react";
import { ToastProvider } from "@/components/ui/toast";
import { CartProvider } from "@/context/cart-context";
import { OrdersProvider } from "@/context/orders-context";

import { ProductsProvider } from "@/context/products-context";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ToastProvider>
      <ProductsProvider>
        <CartProvider>
          <OrdersProvider>{children}</OrdersProvider>
        </CartProvider>
      </ProductsProvider>
    </ToastProvider>
  );
}
