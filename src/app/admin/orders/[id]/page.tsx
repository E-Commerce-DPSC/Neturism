"use client";

import * as React from "react";
import { useParams } from "next/navigation";
import { AdminOrderDetailView } from "./admin-order-detail-view";

function AdminOrderDetailWrapper() {
  const params = useParams();
  const orderId = (params?.id as string) || "NTR-20261005-4102";

  return <AdminOrderDetailView orderId={orderId} />;
}

export default function AdminOrderDetailPage() {
  return (
    <React.Suspense
      fallback={
        <div className="py-20 text-center font-mono text-xs text-[#888888]">
          [MEMUAT DATA DETAIL PESANAN...]
        </div>
      }
    >
      <AdminOrderDetailWrapper />
    </React.Suspense>
  );
}
