"use client"

import { useEffect } from "react"
import { X, ShoppingCart, Trash2, ArrowRight } from "lucide-react"
import { Product, formatVND } from "@/lib/products"

interface CartDrawerProps {
  open: boolean
  cart: Product[]
  onClose: () => void
  onRemove: (index: number) => void
  onCheckout: () => void
}

export default function CartDrawer({ open, cart, onClose, onRemove, onCheckout }: CartDrawerProps) {
  // Escape key closes drawer
  useEffect(() => {
    if (!open) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [open, onClose])

  // Prevent body scroll
  useEffect(() => {
    if (open) document.body.style.overflow = "hidden"
    else document.body.style.overflow = ""
    return () => { document.body.style.overflow = "" }
  }, [open])

  const total = cart.reduce((sum, p) => sum + p.price, 0)

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-40 bg-[var(--crimson-dark)]/60 backdrop-blur-sm transition-opacity duration-300 ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer panel */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Giỏ hàng"
        className={`fixed top-0 right-0 h-full z-50 w-full max-w-md bg-card shadow-2xl flex flex-col transition-transform duration-300 ease-in-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-[var(--crimson-dark)]">
          <div className="flex items-center gap-2">
            <ShoppingCart className="w-5 h-5 text-[var(--gold)]" aria-hidden="true" />
            <h2 className="font-heading text-lg font-bold text-white tracking-wide">
              Giỏ Hàng
            </h2>
            {cart.length > 0 && (
              <span className="bg-[var(--gold)] text-[var(--crimson-dark)] text-xs font-bold rounded-full px-2 py-0.5">
                {cart.length}
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Đóng giỏ hàng"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-muted-foreground py-16">
              <ShoppingCart className="w-14 h-14 opacity-20" />
              <p className="text-sm font-medium">Giỏ hàng trống</p>
              <button
                onClick={onClose}
                className="text-[var(--crimson)] hover:underline text-sm font-semibold"
              >
                Tiếp tục chọn tráp
              </button>
            </div>
          ) : (
            cart.map((product, index) => (
              <div
                key={`${product.id}-${index}`}
                className="flex gap-3 bg-background rounded-xl p-3 border border-border"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-16 h-16 rounded-lg object-cover shrink-0"
                  loading="lazy"
                  crossOrigin="anonymous"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-foreground leading-tight line-clamp-2">
                    {product.name}
                  </p>
                  <p className="text-[var(--crimson)] font-bold text-sm mt-1">
                    {formatVND(product.price)}
                  </p>
                </div>
                <button
                  onClick={() => onRemove(index)}
                  className="p-1.5 rounded-lg text-muted-foreground hover:text-[var(--crimson)] hover:bg-[var(--crimson)]/10 transition-colors shrink-0"
                  aria-label={`Xoá ${product.name} khỏi giỏ`}
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="px-6 py-5 border-t border-border bg-secondary/50">
            {/* Total */}
            <div className="flex items-center justify-between mb-4">
              <span className="text-muted-foreground text-sm font-medium">Tổng cộng</span>
              <span className="font-heading text-2xl font-bold text-[var(--crimson)]">
                {formatVND(total)}
              </span>
            </div>
            <p className="text-xs text-muted-foreground mb-4 leading-relaxed">
              * Giá trên chưa bao gồm phí vận chuyển. Shop sẽ tư vấn thêm sau khi nhận đơn.
            </p>
            <button
              onClick={onCheckout}
              className="w-full bg-[var(--crimson)] hover:bg-[var(--crimson-dark)] text-white font-bold py-4 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 text-base hover:shadow-lg hover:shadow-[var(--crimson)]/30"
            >
              Thanh Toán
              <ArrowRight className="w-5 h-5" aria-hidden="true" />
            </button>
          </div>
        )}
      </aside>
    </>
  )
}
