"use client"

import { X, ShoppingCart, Phone } from "lucide-react"
import { Product, formatVND } from "@/lib/products"
import { useEffect } from "react"

interface ProductModalProps {
  product: Product | null
  onClose: () => void
  onAddToCart: (product: Product) => void
}

export default function ProductModal({ product, onClose, onAddToCart }: ProductModalProps) {
  // Close on Escape key
  useEffect(() => {
    if (!product) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [product, onClose])

  // Prevent body scroll
  useEffect(() => {
    if (product) document.body.style.overflow = "hidden"
    else document.body.style.overflow = ""
    return () => { document.body.style.overflow = "" }
  }, [product])

  if (!product) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label={`Chi tiết: ${product.name}`}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-[var(--crimson-dark)]/70 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div className="relative bg-card rounded-3xl overflow-hidden shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-black/10 hover:bg-black/20 rounded-full p-2 transition-colors"
          aria-label="Đóng"
        >
          <X className="w-5 h-5 text-foreground" />
        </button>

        {/* Image */}
        <div className="relative aspect-video overflow-hidden bg-muted">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
            crossOrigin="anonymous"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" aria-hidden="true" />
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8">
          <div className="flex items-start justify-between gap-4 mb-4">
            <h2 className="font-heading text-2xl font-bold text-foreground leading-tight">
              {product.name}
            </h2>
            {product.badge && (
              <span className="shrink-0 bg-[var(--crimson)] text-white text-xs font-bold px-3 py-1 rounded-full">
                {product.badge}
              </span>
            )}
          </div>

          <p className="text-muted-foreground leading-relaxed mb-6">{product.shortDesc}</p>

          <div className="flex items-center justify-between mb-8 pb-6 border-b border-border">
            <div>
              <p className="text-muted-foreground text-xs mb-1">Giá dịch vụ</p>
              <p className="font-heading text-3xl font-bold text-[var(--crimson)]">
                {formatVND(product.price)}
              </p>
            </div>
            <div className="text-right">
              <p className="text-muted-foreground text-xs mb-1">Trạng thái</p>
              <p className="text-emerald-600 font-semibold text-sm">Còn nhận đặt</p>
            </div>
          </div>

          <ul className="space-y-2 mb-8">
            {[
              "Miễn phí tư vấn chọn mẫu tại nhà",
              "Giao hàng tận nơi trong TP.HCM",
              "Hỗ trợ setup tráp tại địa điểm",
              "Bảo đảm hoàn tiền nếu không hài lòng",
            ].map((item) => (
              <li key={item} className="flex items-center gap-2 text-sm text-foreground">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--gold)] shrink-0" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => {
                onAddToCart(product)
                onClose()
              }}
              className="flex-1 bg-[var(--crimson)] hover:bg-[var(--crimson-dark)] text-white font-bold py-3.5 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 hover:shadow-lg"
            >
              <ShoppingCart className="w-5 h-5" aria-hidden="true" />
              Thêm vào giỏ hàng
            </button>
            <a
              href="tel:0896460457"
              className="flex-1 border-2 border-[var(--gold)] text-[var(--gold-dark)] hover:bg-[var(--gold)] hover:text-[var(--crimson-dark)] font-bold py-3.5 rounded-xl transition-all duration-200 flex items-center justify-center gap-2"
            >
              <Phone className="w-5 h-5" aria-hidden="true" />
              Gọi Đặt Ngay
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
