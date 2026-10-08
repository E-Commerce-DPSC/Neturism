"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Product } from "@/types/product";
import { formatRupiah } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export function ProductCard({ product, priority = false }: ProductCardProps) {
  const totalStock = product.variants.reduce((acc, v) => acc + v.stock, 0);
  const isOutOfStock = totalStock === 0;

  return (
    <Link
      href={`/products/${product.slug}`}
      className="group flex flex-col bg-[#111111] border border-[#222222] hover:border-white transition-all duration-150 relative select-none hover:shadow-brutal-dark"
    >
      {/* Badges Overlay */}
      <div className="absolute top-2.5 left-2.5 z-10 flex flex-col gap-1 items-start">
        {product.isNewDrop && (
          <Badge variant="solid" className="text-[10px] px-1.5 py-0.5">
            NEW DROP
          </Badge>
        )}
        {isOutOfStock && (
          <Badge variant="error" className="text-[10px] px-1.5 py-0.5">
            HABIS
          </Badge>
        )}
      </div>

      {/* Image Container 1:1 Aspect Ratio */}
      <div className="relative aspect-square w-full bg-[#0a0a0a] overflow-hidden border-b border-[#222222]">
        <Image
          src={product.images[0] || "/images/products/bracelet-crucifix-1.svg"}
          alt={product.name}
          fill
          priority={priority}
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* Meta Information */}
      <div className="p-3 sm:p-4 flex flex-col flex-1 justify-between gap-2">
        <div className="flex flex-col gap-1">
          <span className="text-[10px] font-label uppercase tracking-widest text-[#666666]">
            [{product.categoryLabel}]
          </span>
          <h4 className="font-headline text-xs sm:text-sm font-semibold tracking-wide text-white group-hover:text-white line-clamp-2 uppercase">
            {product.name}
          </h4>
        </div>

        <div className="pt-2 border-t border-[#1a1a1a] flex items-center justify-between">
          <span className="font-body text-xs sm:text-sm font-medium text-white">
            {formatRupiah(product.price)}
          </span>

          <span className="text-[11px] font-label text-[#888888] group-hover:text-white group-hover:translate-x-0.5 transition-all">
            LIHAT →
          </span>
        </div>
      </div>
    </Link>
  );
}
