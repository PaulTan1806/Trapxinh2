"use client"

import { ShoppingCart, Eye } from "lucide-react"
import { Product, formatVND } from "@/lib/products"

const badgeStyles: Record<string, string> = {
  "Best Seller": "bg-[var(--crimson)] text-white",
  "Mới": "bg-emerald-600 text-white",
  "Hot": "bg-orange-500 text-white",
  "Cao Cấp": "bg-[var(--gold)] text-[var(--crimson-dark)]",
}

interface ProductCardProps {
  product: Product
  onAddToCart: (product: Product) => void
  onViewDetail: (product: Product) => void
}

export default function ProductCard({ product, onAddToCart, onViewDetail }: ProductCardProps) {
  return (
    <article className="group bg-card rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col border border-border hover:border-[var(--gold)]/30">
      {/* Image */}
      <div className="relative overflow-hidden aspect-[4/3] bg-muted">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
          crossOrigin="anonymous"
        />
        {/* Badge */}
        {product.badge && (
          <span
            className={`absolute top-3 left-3 text-[11px] font-bold px-2.5 py-1 rounded-full tracking-wide ${
              badgeStyles[product.badge] ?? "bg-[var(--crimson)] text-white"
            }`}
          >
            {product.badge}
          </span>
        )}
        {/* Quick view overlay */}
        <div className="absolute inset-0 bg-[var(--crimson-dark)]/0 group-hover:bg-[var(--crimson-dark)]/20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
          <button
            onClick={() => onViewDetail(product)}
            className="bg-white/90 text-[var(--crimson-dark)] font-semibold text-sm px-4 py-2 rounded-full shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-all duration-300"
            aria-label={`Xem nhanh ${product.name}`}
          >
            Xem nhanh
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1 gap-2">
        <h3 className="font-heading font-semibold text-foreground text-base leading-tight line-clamp-2">
          {product.name}
        </h3>
        <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2 flex-1">
          {product.shortDesc}
        </p>

        {/* Price */}
        <div className="font-heading font-bold text-xl text-[var(--crimson)] mt-1">
          {formatVND(product.price)}
        </div>

        {/* Buttons */}
        <div className="flex gap-2 mt-2">
          <button
            onClick={() => onViewDetail(product)}
            className="flex-1 bg-secondary hover:bg-muted text-secondary-foreground text-sm font-medium py-2.5 rounded-xl transition-colors duration-200 flex items-center justify-center gap-1.5"
            aria-label={`Chi tiết ${product.name}`}
          >
            <Eye className="w-4 h-4" aria-hidden="true" />
            Chi tiết
          </button>
          <button
            onClick={() => onAddToCart(product)}
            className="flex-1 bg-[var(--crimson)] hover:bg-[var(--crimson-dark)] text-white text-sm font-semibold py-2.5 rounded-xl transition-all duration-200 flex items-center justify-center gap-1.5 hover:shadow-md"
            aria-label={`Thêm ${product.name} vào giỏ hàng`}
          >
            <ShoppingCart className="w-4 h-4" aria-hidden="true" />
            Thêm vào giỏ
          </button>
        </div>
      </div>
    </article>
  )
}
