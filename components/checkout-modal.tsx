"use client"

import { useState, useEffect, useId } from "react"
import { X, CheckCircle2, AlertCircle, ChevronLeft, CreditCard, Banknote, Loader2 } from "lucide-react"
import { Product, formatVND } from "@/lib/products"

const WEB3FORMS_ACCESS_KEY = "c54f3a0f-c241-4027-bc8e-b46fae1ebb10"

interface CheckoutModalProps {
  open: boolean
  cart: Product[]
  onClose: () => void
  onBackToCart: () => void
  onSuccess: () => void
}

export default function CheckoutModal({
  open,
  cart,
  onClose,
  onBackToCart,
  onSuccess,
}: CheckoutModalProps) {
  const [payment, setPayment] = useState<"transfer" | "cod">("transfer")
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const nameId = useId()
  const phoneId = useId()
  const addressId = useId()
  const datetimeId = useId()
  const noteId = useId()

  const total = cart.reduce((sum, p) => sum + p.price, 0)

  // Reset state when modal opens
  useEffect(() => {
    if (open) {
      setPayment("transfer")
      setError(null)
      setIsSubmitting(false)
      setIsSuccess(false)
    }
  }, [open])

  // Escape key
  useEffect(() => {
    if (!open) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !isSuccess && !isSubmitting) onClose()
    }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [open, onClose, isSuccess, isSubmitting])

  // Body scroll lock
  useEffect(() => {
    if (open) document.body.style.overflow = "hidden"
    else document.body.style.overflow = ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [open])

  if (!open) return null

  const handleSuccessClose = () => {
    onSuccess() // clear the cart
    onClose()
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)

    const formEl = e.currentTarget
    const formData = new FormData(formEl)

    // Simple validation: phone + address required
    const phone = (formData.get("Phone_number") as string)?.trim()
    const address = (formData.get("Address") as string)?.trim()
    if (!phone || !address) {
      setError("Vui lòng nhập đầy đủ SĐT và Địa chỉ")
      return
    }

    setIsSubmitting(true)
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      })
      const data = await response.json()
      if (data.success) {
        setIsSuccess(true)
      } else {
        setError("Gửi đơn thất bại. Vui lòng thử lại hoặc liên hệ Zalo của shop.")
      }
    } catch {
      setError("Có lỗi kết nối. Vui lòng kiểm tra mạng và thử lại.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Thanh toán đơn hàng"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-[var(--crimson-dark)]/75 backdrop-blur-sm"
        onClick={!isSuccess && !isSubmitting ? onClose : undefined}
        aria-hidden="true"
      />

      {/* Success overlay */}
      {isSuccess ? (
        <div className="relative z-10 bg-card rounded-3xl shadow-2xl max-w-md w-full p-8 flex flex-col items-center text-center animate-toast-in">
          {/* Decorative top bar */}
          <div className="absolute top-0 left-0 right-0 h-2 rounded-t-3xl bg-[var(--gold)]" aria-hidden="true" />

          <div className="w-20 h-20 rounded-full bg-emerald-50 border-4 border-emerald-400 flex items-center justify-center mb-5 mt-2">
            <CheckCircle2 className="w-10 h-10 text-emerald-500" aria-hidden="true" />
          </div>

          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-[var(--crimson)] mb-3 text-balance">
            ĐẶT TRÁP THÀNH CÔNG!
          </h2>

          <p className="text-muted-foreground text-sm leading-relaxed mb-6 max-w-sm text-pretty">
            Đơn hàng đã được gửi về hệ thống. Shop sẽ liên hệ qua Zalo cho bạn trong ít phút để chốt lịch.
          </p>

          {/* Gold divider */}
          <div className="flex items-center gap-2 w-full mb-6">
            <div className="flex-1 h-px bg-[var(--gold)]/30" />
            <span className="text-[var(--gold)] text-xs" aria-hidden="true">
              ✦
            </span>
            <div className="flex-1 h-px bg-[var(--gold)]/30" />
          </div>

          <button
            onClick={handleSuccessClose}
            className="w-full bg-[var(--crimson)] hover:bg-[var(--crimson-dark)] text-white font-bold py-3.5 rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-[var(--crimson)]/30"
          >
            Đóng cửa sổ
          </button>
        </div>
      ) : (
        /* Checkout form */
        <div className="relative z-10 bg-card rounded-3xl shadow-2xl max-w-xl w-full max-h-[92vh] flex flex-col overflow-hidden">
          {/* Decorative top bar */}
          <div className="h-1.5 bg-[var(--gold)] shrink-0" aria-hidden="true" />

          {/* Modal header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-border shrink-0">
            <div>
              <h2 className="font-heading text-xl font-bold text-foreground">Xác Nhận Đơn Tráp</h2>
              <p className="text-muted-foreground text-xs mt-0.5">Điền thông tin giao nhận bên dưới</p>
            </div>
            <button
              onClick={onClose}
              disabled={isSubmitting}
              className="p-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted transition-colors disabled:opacity-50"
              aria-label="Đóng"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Scrollable body */}
          <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6">
            {/* ── ORDER SUMMARY ── */}
            <section aria-label="Tóm tắt đơn hàng">
              <h3 className="text-xs font-bold uppercase tracking-widest text-[var(--gold-dark)] mb-3 flex items-center gap-1.5">
                <span className="w-1 h-3 bg-[var(--gold)] rounded-full inline-block" aria-hidden="true" />
                Đơn Hàng Của Bạn
              </h3>
              <div className="bg-secondary/60 rounded-2xl divide-y divide-border overflow-hidden border border-border">
                {cart.map((product, idx) => (
                  <div key={`${product.id}-${idx}`} className="flex items-center gap-3 px-4 py-3">
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      className="w-12 h-12 rounded-lg object-cover shrink-0"
                      loading="lazy"
                      crossOrigin="anonymous"
                    />
                    <span className="flex-1 text-sm font-medium text-foreground line-clamp-1">{product.name}</span>
                    <span className="text-sm font-bold text-[var(--crimson)] shrink-0">{formatVND(product.price)}</span>
                  </div>
                ))}
                <div className="flex items-center justify-between px-4 py-3 bg-[var(--crimson)]/5">
                  <span className="text-sm font-bold text-foreground">Tổng cộng</span>
                  <span className="font-heading text-xl font-bold text-[var(--crimson)]">{formatVND(total)}</span>
                </div>
              </div>
            </section>

            {/* ── CUSTOMER FORM ── */}
            <section aria-label="Thông tin giao hàng">
              <h3 className="text-xs font-bold uppercase tracking-widest text-[var(--gold-dark)] mb-3 flex items-center gap-1.5">
                <span className="w-1 h-3 bg-[var(--gold)] rounded-full inline-block" aria-hidden="true" />
                Thông Tin Giao Nhận
              </h3>

              <form id="checkout-form" onSubmit={handleSubmit} noValidate className="space-y-4">
                {/* Web3Forms hidden config + metadata */}
                <input type="hidden" name="access_key" value={WEB3FORMS_ACCESS_KEY} />
                <input type="hidden" name="subject" value="Đơn Đặt Tráp Cưới Mới - Thiên Long Cưới" />
                <input type="hidden" name="from_name" value="Website Tráp Cưới" />
                <input
                  type="hidden"
                  name="Chi_tiết_đơn_hàng"
                  value={cart.map((p) => `${p.name} - ${formatVND(p.price)}`).join(" | ")}
                />
                <input type="hidden" name="Total" value={formatVND(total)} />
                <input
                  type="hidden"
                  name="Payment_method"
                  value={payment === "transfer" ? "Chuyển khoản cọc trước 30%" : "Tiền mặt khi nhận hàng"}
                />

                {/* Name */}
                <div>
                  <label htmlFor={nameId} className="block text-sm font-semibold text-foreground mb-1.5">
                    Họ và Tên
                  </label>
                  <input
                    id={nameId}
                    name="Customer_name"
                    type="text"
                    placeholder="Nguyễn Văn A"
                    className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[var(--crimson)] focus:border-transparent transition-all"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label htmlFor={phoneId} className="block text-sm font-semibold text-foreground mb-1.5">
                    Số điện thoại{" "}
                    <span className="text-[var(--crimson)]" aria-label="Bắt buộc">
                      *
                    </span>
                  </label>
                  <input
                    id={phoneId}
                    name="Phone_number"
                    type="tel"
                    placeholder="089 646 0457"
                    required
                    aria-required="true"
                    onChange={() => error && setError(null)}
                    className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[var(--crimson)] focus:border-transparent transition-all"
                  />
                </div>

                {/* Address */}
                <div>
                  <label htmlFor={addressId} className="block text-sm font-semibold text-foreground mb-1.5">
                    Địa chỉ giao tráp{" "}
                    <span className="text-[var(--crimson)]" aria-label="Bắt buộc">
                      *
                    </span>
                  </label>
                  <input
                    id={addressId}
                    name="Address"
                    type="text"
                    placeholder="123 Đường ABC, Phường XYZ, TP.HCM"
                    required
                    aria-required="true"
                    onChange={() => error && setError(null)}
                    className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[var(--crimson)] focus:border-transparent transition-all"
                  />
                </div>

                {/* Datetime */}
                <div>
                  <label htmlFor={datetimeId} className="block text-sm font-semibold text-foreground mb-1.5">
                    Ngày &amp; Giờ cần giao{" "}
                    <span className="text-[var(--crimson)]" aria-label="Bắt buộc">
                      *
                    </span>
                  </label>
                  <input
                    id={datetimeId}
                    name="Date_and_time"
                    type="date"
                    required
                    aria-required="true"
                    className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-[var(--crimson)] focus:border-transparent transition-all"
                  />
                </div>

                {/* Payment Method */}
                <fieldset>
                  <legend className="block text-sm font-semibold text-foreground mb-2">
                    Phương thức thanh toán{" "}
                    <span className="text-[var(--crimson)]" aria-label="Bắt buộc">
                      *
                    </span>
                  </legend>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {/* Transfer */}
                    <label
                      className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                        payment === "transfer"
                          ? "border-[var(--crimson)] bg-[var(--crimson)]/5"
                          : "border-border bg-background hover:border-[var(--crimson)]/40"
                      }`}
                    >
                      <input
                        type="radio"
                        name="payment_choice"
                        value="transfer"
                        checked={payment === "transfer"}
                        onChange={() => setPayment("transfer")}
                        className="accent-[var(--crimson)] w-4 h-4 shrink-0"
                      />
                      <CreditCard
                        className={`w-5 h-5 shrink-0 ${payment === "transfer" ? "text-[var(--crimson)]" : "text-muted-foreground"}`}
                        aria-hidden="true"
                      />
                      <span className="text-sm font-medium text-foreground leading-tight">
                        Chuyển khoản cọc trước 30%
                      </span>
                    </label>

                    {/* COD */}
                    <label
                      className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                        payment === "cod"
                          ? "border-[var(--crimson)] bg-[var(--crimson)]/5"
                          : "border-border bg-background hover:border-[var(--crimson)]/40"
                      }`}
                    >
                      <input
                        type="radio"
                        name="payment_choice"
                        value="cod"
                        checked={payment === "cod"}
                        onChange={() => setPayment("cod")}
                        className="accent-[var(--crimson)] w-4 h-4 shrink-0"
                      />
                      <Banknote
                        className={`w-5 h-5 shrink-0 ${payment === "cod" ? "text-[var(--crimson)]" : "text-muted-foreground"}`}
                        aria-hidden="true"
                      />
                      <span className="text-sm font-medium text-foreground leading-tight">Tiền mặt khi nhận hàng</span>
                    </label>
                  </div>
                </fieldset>

                {/* Note */}
                <div>
                  <label htmlFor={noteId} className="block text-sm font-semibold text-foreground mb-1.5">
                    Ghi chú thêm
                    <span className="font-normal text-muted-foreground ml-1">(không bắt buộc)</span>
                  </label>
                  <textarea
                    id={noteId}
                    name="Note"
                    placeholder="Nhà hẻm xe tải vào được, giao trước 6 giờ sáng..."
                    rows={3}
                    className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[var(--crimson)] focus:border-transparent transition-all resize-none"
                  />
                </div>

                {/* Validation / submission error */}
                {error && (
                  <div
                    role="alert"
                    className="flex items-center gap-2.5 bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3"
                  >
                    <AlertCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
                    <p className="text-sm font-medium">{error}</p>
                  </div>
                )}
              </form>
            </section>
          </div>

          {/* ── FOOTER ── */}
          <div className="px-6 py-4 border-t border-border bg-secondary/40 shrink-0 flex flex-col sm:flex-row gap-3">
            <button
              type="button"
              onClick={onBackToCart}
              disabled={isSubmitting}
              className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl border-2 border-border text-foreground font-semibold text-sm hover:border-[var(--crimson)]/50 hover:text-[var(--crimson)] transition-all duration-200 disabled:opacity-50"
            >
              <ChevronLeft className="w-4 h-4" aria-hidden="true" />
              Quay lại giỏ hàng
            </button>
            <button
              type="submit"
              form="checkout-form"
              disabled={isSubmitting}
              className="flex-1 flex items-center justify-center gap-2 bg-[var(--crimson)] hover:bg-[var(--crimson-dark)] text-white font-bold py-3 rounded-xl transition-all duration-200 text-base tracking-wide hover:shadow-lg hover:shadow-[var(--crimson)]/30 uppercase disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" aria-hidden="true" />
                  Đang gửi đơn...
                </>
              ) : (
                "Xác Nhận Đặt Tráp"
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
