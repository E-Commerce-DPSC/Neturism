import * as React from "react";
import { PRODUCTS } from "@/lib/data/products";
import { ProductDetailView } from "./product-detail-view";
import type { Metadata } from "next";

export function generateStaticParams() {
  return PRODUCTS.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = PRODUCTS.find((p) => p.slug === slug);

  if (!product) {
    return {
      title: "Produk Tidak Ditemukan | Neturism",
    };
  }

  return {
    title: `${product.name} | Neturism`,
    description: product.description,
  };
}

async function ProductDetailLoader({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <ProductDetailView slug={slug} />;
}

export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return (
    <React.Suspense
      fallback={
        <div className="min-h-screen bg-black text-white flex items-center justify-center font-mono text-xs uppercase tracking-widest">
          [MEMUAT KARYA NETURISM...]
        </div>
      }
    >
      <ProductDetailLoader params={params} />
    </React.Suspense>
  );
}
