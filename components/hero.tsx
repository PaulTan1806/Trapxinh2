import { ChevronRight, MessageCircle } from "lucide-react"

export default function Hero() {
  return (
    <section
      className="relative overflow-hidden bg-[var(--crimson-dark)] text-white"
      aria-label="Banner chính"
    >
      {/* Decorative background pattern */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `radial-gradient(circle at 20% 50%, oklch(0.72 0.12 75 / 0.4) 0%, transparent 50%),
                            radial-gradient(circle at 80% 20%, oklch(0.72 0.12 75 / 0.3) 0%, transparent 40%),
                            radial-gradient(circle at 60% 80%, oklch(0.38 0.19 27 / 0.5) 0%, transparent 50%)`,
        }}
        aria-hidden="true"
      />

      {/* Gold top border accent */}
      <div className="h-1 w-full bg-[var(--gold)]" aria-hidden="true" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 lg:py-32">
        <div className="max-w-3xl mx-auto text-center">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 bg-white/10 border border-[var(--gold)]/30 rounded-full px-4 py-1.5 mb-6">
            <span className="text-[var(--gold)] text-xs font-semibold tracking-widest uppercase">
              ✦ Dịch Vụ Tráp Cưới Cao Cấp TP.HCM ✦
            </span>
          </div>

          {/* Heading */}
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-balance mb-6">
            <span className="text-white">Chu Toàn Ngày Trọng Đại</span>
            <br />
            <span className="text-[var(--gold)]">Vẹn Tròn Gửi Trao</span>
          </h1>

          {/* Sub-heading */}
          <p className="text-red-100 text-base sm:text-lg leading-relaxed mb-10 max-w-xl mx-auto">
            Chuyên cung cấp mâm quả cưới hiện đại &amp; tráp rồng phượng cao cấp tại TP.HCM.
            Hoa tươi 100% — Giao hàng đúng giờ cát tường — Thiết kế độc quyền.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#products"
              className="inline-flex items-center justify-center gap-2 bg-[var(--gold)] hover:bg-[var(--gold-dark)] text-[var(--crimson-dark)] font-bold text-base px-8 py-4 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            >
              Xem Mẫu Tráp Ngay
              <ChevronRight className="w-5 h-5" aria-hidden="true" />
            </a>
            <a
              href="https://zalo.me/0901234567"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 border-2 border-[var(--gold)] text-[var(--gold)] hover:bg-[var(--gold)] hover:text-[var(--crimson-dark)] font-bold text-base px-8 py-4 rounded-full transition-all duration-300 hover:-translate-y-0.5"
            >
              <MessageCircle className="w-5 h-5" aria-hidden="true" />
              Tư Vấn Qua Zalo
            </a>
          </div>

          {/* Stats strip */}
          <div className="mt-14 grid grid-cols-3 gap-4 sm:gap-8 border-t border-white/20 pt-10">
            {[
              { value: "0+", label: "Tráp đã bàn giao" },
              { value: "1★", label: "Đánh giá trung bình" },
              { value: "0+", label: "Năm kinh nghiệm" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="font-heading text-2xl sm:text-3xl font-bold text-[var(--gold)]">
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm text-red-200 mt-1 leading-tight">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Gold bottom border accent */}
      <div className="h-1 w-full bg-[var(--gold)]" aria-hidden="true" />
    </section>
  )
}
