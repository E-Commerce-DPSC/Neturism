export type OrderStatus =
  | "MENUNGGU_PEMBAYARAN"
  | "MENUNGGU_VERIFIKASI"
  | "DIBAYAR"
  | "DIPROSES"
  | "DIKIRIM"
  | "SELESAI"
  | "DIBATALKAN"
  | "KEDALUWARSA";

export interface OrderItem {
  productId: string;
  variantId: string;
  name: string;
  size: string;
  price: number;
  quantity: number;
  image: string;
}

export interface OrderAddress {
  recipientName: string;
  phone: string;
  streetAddress: string;
  city: string;
  province: string;
  postalCode: string;
}

export interface Order {
  id: string; // e.g. "NTR-20261008-0192"
  createdAt: string;
  status: OrderStatus;
  items: OrderItem[];
  address: OrderAddress;
  courier: string;
  shippingCost: number;
  subtotal: number;
  uniqueCode: number;
  total: number;
  paymentMethod?: "QRIS" | "TRANSFER_BANK";
  paymentProofUrl?: string;
  trackingNumber?: string;
}
