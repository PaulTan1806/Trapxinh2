"use client"

import { Product, CATEGORIES } from "@/lib/products"
import ProductCard from "./product-card"

interface ProductGridProps {
  products: Product[]
  isLoading: boolean
  selectedCategory: string
  onSelectCategory: (cat: string) => void
  onAddToCart: (product: Product) => void
  onViewDetail: (product: Product) => void
}

export default function ProductGrid({
  products,
  isLoading,
  selectedCategory,
  onSelectCategory,
  onAddToCart,
  onViewDetail,
}: ProductGridProps) {
  const filtered =
    selectedCategory === "all"
      ? products
      : products.filter((p) => p.category === selectedCategory)

  return (
    <section id="products" className="py-14 sm:py-20 bg-background" aria-label="Bộ sưu tập tráp cưới">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-10">
          <p className="text-[var(--gold-dark)] text-sm font-semibold tracking-widest uppercase mb-2">
            ✦ Bộ Sưu Tập ✦
          </p>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Mẫu Tráp Cưới Nổi Bật
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto leading-relaxed">
            Tất cả sản phẩm đều được làm thủ công từ hoa tươi nhập khẩu, trang trí tỉ mỉ theo
            đúng phong tục truyền thống.
          </p>
        </div>

        {/* Category Filter */}
        <div
          className="flex flex-wrap justify-center gap-2 mb-10"
          role="group"
          aria-label="Lọc theo loại tráp"
        >
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border ${
                selectedCategory === cat.id
                  ? "bg-[var(--crimson)] text-white border-[var(--crimson)] shadow-md shadow-[var(--crimson)]/20"
                  : "bg-card text-foreground border-border hover:border-[var(--crimson)]/40 hover:text-[var(--crimson)]"
              }`}
              aria-pressed={selectedCategory === cat.id}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        {isLoading ? (
          <div aria-live="polite" aria-busy="true">
            <p className="text-center text-[var(--gold-dark)] font-medium mb-8 flex items-center justify-center gap-2">
              <span className="inline-block w-4 h-4 border-2 border-[var(--gold-dark)] border-t-transparent rounded-full animate-spin" />
              Đang tải danh sách mâm quả...
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="rounded-xl border border-border bg-card overflow-hidden animate-pulse"
                >
                  <div className="aspect-[4/3] bg-muted" />
                  <div className="p-4 space-y-3">
                    <div className="h-4 bg-muted rounded w-3/4" />
                    <div className="h-3 bg-muted rounded w-full" />
                    <div className="h-3 bg-muted rounded w-5/6" />
                    <div className="h-8 bg-muted rounded w-full mt-4" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : filtered.length === 0 ? (
          <p className="text-center text-muted-foreground py-16">
            Không có sản phẩm nào trong danh mục này.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={onAddToCart}
                onViewDetail={onViewDetail}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
