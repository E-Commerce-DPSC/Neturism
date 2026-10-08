"use client";

import * as React from "react";
import { Order, OrderStatus } from "@/types/order";

const INITIAL_ORDERS: Order[] = [
  {
    id: "NTR-20261005-4102",
    createdAt: "2026-10-05T14:30:00Z",
    status: "DIKIRIM",
    courier: "JNE REGULER",
    shippingCost: 22000,
    subtotal: 680000,
    uniqueCode: 312,
    total: 702312,
    paymentMethod: "TRANSFER_BANK",
    trackingNumber: "JNE8829102910ID",
    address: {
      recipientName: "Bagas Pratama",
      phone: "081289102931",
      streetAddress: "Jl. Senopati No. 42, Kebayoran Baru",
      city: "Jakarta Selatan",
      province: "DKI Jakarta",
      postalCode: "12190",
    },
    items: [
      {
        productId: "prod-01",
        variantId: "var-01-19",
        name: "CRUCIFIX BARBED CHAIN BRACELET",
        size: "19 cm",
        price: 680000,
        quantity: 1,
        image: "/images/products/bracelet-crucifix-1.svg",
      },
    ],
  },
  {
    id: "NTR-20261001-1928",
    createdAt: "2026-10-01T10:15:00Z",
    status: "SELESAI",
    courier: "SICEPAT REGULER",
    shippingCost: 12000,
    subtotal: 490000,
    uniqueCode: 184,
    total: 502184,
    paymentMethod: "QRIS",
    trackingNumber: "002918291039",
    address: {
      recipientName: "Bagas Pratama",
      phone: "081289102931",
      streetAddress: "Jl. Senopati No. 42, Kebayoran Baru",
      city: "Jakarta Selatan",
      province: "DKI Jakarta",
      postalCode: "12190",
    },
    items: [
      {
        productId: "prod-02",
        variantId: "var-02-8",
        name: "OBSIDIAN EMBLEM SIGNET RING",
        size: "US 8",
        price: 490000,
        quantity: 1,
        image: "/images/products/ring-obsidian-1.svg",
      },
    ],
  },
];

interface OrdersContextType {
  orders: Order[];
  createOrder: (newOrder: Omit<Order, "id" | "createdAt" | "status" | "uniqueCode" | "total">) => Order;
  getOrderById: (id: string) => Order | undefined;
  updateOrderStatus: (
    id: string,
    status: OrderStatus,
    proofUrl?: string,
    trackingNumber?: string,
    courier?: string
  ) => void;
  deleteOrder: (id: string) => void;
  resetOrders: () => void;
}

const OrdersContext = React.createContext<OrdersContextType | undefined>(undefined);
const ORDERS_STORAGE_KEY = "neturism_orders_v1";

export function OrdersProvider({ children }: { children: React.ReactNode }) {
  const [orders, setOrders] = React.useState<Order[]>(INITIAL_ORDERS);
  const [isLoaded, setIsLoaded] = React.useState(false);

  React.useEffect(() => {
    try {
      const saved = localStorage.getItem(ORDERS_STORAGE_KEY);
      if (saved) {
        setOrders(JSON.parse(saved));
      }
    } catch {
      // Ignore parse errors
    } finally {
      setIsLoaded(true);
    }
  }, []);

  React.useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
    } catch {
      // Ignore write errors
    }
  }, [orders, isLoaded]);

  const createOrder = (
    orderData: Omit<Order, "id" | "createdAt" | "status" | "uniqueCode" | "total">
  ): Order => {
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const dateStr = "20261008";
    const orderId = `NTR-${dateStr}-${randomSuffix}`;
    const uniqueCode = Math.floor(100 + Math.random() * 899);
    const total = orderData.subtotal + orderData.shippingCost + uniqueCode;

    const newOrder: Order = {
      ...orderData,
      id: orderId,
      createdAt: new Date().toISOString(),
      status: "MENUNGGU_PEMBAYARAN",
      uniqueCode,
      total,
    };

    const updated = [newOrder, ...orders];
    setOrders(updated);
    try {
      localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // Ignore
    }
    return newOrder;
  };

  const getOrderById = (id: string): Order | undefined => {
    return orders.find((o) => o.id === id);
  };

  const updateOrderStatus = (
    id: string,
    status: OrderStatus,
    proofUrl?: string,
    trackingNumber?: string,
    courier?: string
  ) => {
    setOrders((prev) =>
      prev.map((order) => {
        if (order.id === id) {
          return {
            ...order,
            status,
            paymentProofUrl: proofUrl !== undefined ? proofUrl : order.paymentProofUrl,
            trackingNumber: trackingNumber !== undefined ? trackingNumber : order.trackingNumber,
            courier: courier !== undefined ? courier : order.courier,
          };
        }
        return order;
      })
    );
  };

  const deleteOrder = (id: string) => {
    setOrders((prev) => prev.filter((order) => order.id !== id));
  };

  const resetOrders = () => {
    setOrders(INITIAL_ORDERS);
    try {
      localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(INITIAL_ORDERS));
    } catch {
      // Ignore
    }
  };

  return (
    <OrdersContext.Provider
      value={{
        orders,
        createOrder,
        getOrderById,
        updateOrderStatus,
        deleteOrder,
        resetOrders,
      }}
    >
      {children}
    </OrdersContext.Provider>
  );
}

export function useOrders() {
  const context = React.useContext(OrdersContext);
  if (!context) {
    throw new Error("useOrders harus digunakan di dalam OrdersProvider");
  }
  return context;
}
