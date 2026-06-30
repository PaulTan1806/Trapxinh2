"use client"

import { useState, useEffect } from "react"
import { X, Search, PackageSearch, MessageCircle } from "lucide-react"

interface OrderTrackingModalProps {
  open: boolean
  onClose: () => void
}

export default function OrderTrackingModal({ open, onClose }: OrderTrackingModalProps) {
  const [phone, setPhone] = useState("")
  const [error, setError] = useState("")
  const [isSearching, setIsSearching] = useState(false)
  const [result, setResult] = useState<string | null>(null)

  // Reset internal state whenever the modal is closed
  useEffect(() => {
    if (!open) {
      const t = setTimeout(() => {
        setPhone("")
        setError("")
        setIsSearching(false)
        setResult(null)
      }, 200)
      return () => clearTimeout(t)
    }
  }, [open])

  if (!open) return null

  const handleSearch = () => {
    if (!phone.trim()) {
      setError("Vui lòng nhập số điện thoại")
      return
    }
    setError("")
    setIsSearching(true)
    setTimeout(() => {
      setIsSearching(false)
      setResult(phone.trim())
    }, 1500)
  }

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Tra cứu tiến độ đơn hàng"
    >
      {/* Backdrop */}
      <button
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
        aria-label="Đóng cửa sổ tra cứu"
      />

      {/* Panel */}
      <div className="relative z-10 w-full max-w-md bg-card rounded-2xl shadow-2xl border border-[var(--gold)]/20 overflow-hidden animate-toast-in">
        {/* Header */}
        <div className="bg-[var(--crimson-dark)] px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <PackageSearch className="w-6 h-6 text-[var(--gold)]" aria-hidden="true" />
            <h2 className="font-heading text-lg sm:text-xl font-bold text-[var(--gold)]">
              Tra Cứu Tiến Độ Đơn Hàng
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-red-100 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Đóng"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6">
          {!result ? (
            <>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                Nhập số điện thoại bạn đã dùng để đặt tráp.
              </p>

              <label htmlFor="track-phone" className="sr-only">
                Số điện thoại
              </label>
              <input
                id="track-phone"
                type="tel"
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value)
                  if (error) setError("")
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.nativeEvent.isComposing && e.keyCode !== 229) {
                    handleSearch()
                  }
                }}
                placeholder="Ví dụ: 0912345678"
                disabled={isSearching}
                className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-[var(--crimson)] focus:border-[var(--crimson)] transition disabled:opacity-60"
              />

              {error && (
                <p className="mt-2 text-sm font-medium text-[var(--destructive)]" role="alert">
                  {error}
                </p>
              )}

              <button
                onClick={handleSearch}
                disabled={isSearching}
                className="mt-4 w-full flex items-center justify-center gap-2 bg-[var(--crimson)] hover:bg-[var(--crimson-dark)] text-white font-semibold py-3 rounded-lg transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSearching ? (
                  <>
                    <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Đang tra cứu...
                  </>
                ) : (
                  <>
                    <Search className="w-4 h-4" />
                    Kiểm tra đơn hàng
                  </>
                )}
              </button>
            </>
          ) : (
            <div className="text-center" aria-live="polite">
              <div className="mx-auto w-14 h-14 rounded-full bg-[var(--gold)]/15 flex items-center justify-center mb-4">
                <PackageSearch className="w-7 h-7 text-[var(--gold-dark)]" aria-hidden="true" />
              </div>
              <p className="text-sm text-foreground leading-relaxed text-pretty">
                Đơn hàng của số điện thoại{" "}
                <span className="font-bold text-[var(--crimson)]">{result}</span> đang được hệ thống
                xử lý! Vì tính chất đặc thù của mâm quả cưới cần sự chuẩn xác tuyệt đối, để yêu cầu
                thay đổi địa chỉ, giờ giấc hoặc hủy đơn, quý khách vui lòng liên hệ trực tiếp Zalo /
                Hotline để được hỗ trợ nhanh nhất.
              </p>

              <a
                href="https://zalo.me/0901234567"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center justify-center gap-2 w-full bg-[#0068FF] hover:bg-[#0055d4] text-white font-semibold py-3 rounded-lg transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                Liên hệ Zalo / Hotline ngay
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
