import { Flower2, Clock, Palette } from "lucide-react"

const FEATURES = [
  {
    icon: Flower2,
    title: "100% Hoa Tươi & Quả Tuyển",
    desc: "Chúng tôi chỉ sử dụng hoa tươi nhập khẩu cao cấp và trái cây tuyển chọn kỹ lưỡng, đảm bảo vẻ đẹp tươi tắn suốt cả ngày cưới.",
  },
  {
    icon: Clock,
    title: "Giao Hàng Đúng Giờ Cát Tường",
    desc: "Hiểu sự thiêng liêng của ngày trọng đại, đội ngũ giao hàng chuyên nghiệp cam kết có mặt đúng giờ cát theo lịch đã đặt.",
  },
  {
    icon: Palette,
    title: "Thiết Kế Độc Quyền",
    desc: "Mỗi bộ tráp là một tác phẩm nghệ thuật được thiết kế riêng, mang dấu ấn cá nhân của từng cặp đôi, không trùng lặp.",
  },
]

export default function WhyChooseUs() {
  return (
    <section className="py-14 sm:py-20 bg-[var(--crimson-dark)]" aria-label="Tại sao chọn chúng tôi">
      {/* Gold divider */}
      <div className="h-px bg-[var(--gold)]/30 mb-16 mx-auto max-w-2xl" aria-hidden="true" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-[var(--gold)] text-sm font-semibold tracking-widest uppercase mb-2">
            ✦ Cam Kết Của Chúng Tôi ✦
          </p>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white mb-4">
            Tại Sao Chọn Tài Lộc Cưới?
          </h2>
          <p className="text-red-200 max-w-xl mx-auto leading-relaxed">
            Hơn 8 năm đồng hành cùng hàng ngàn đôi uyên ương trong ngày trọng đại.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {FEATURES.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="bg-white/10 border border-white/15 rounded-2xl p-8 text-center hover:bg-white/15 transition-all duration-300 hover:border-[var(--gold)]/40 group"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[var(--gold)]/20 border border-[var(--gold)]/40 mb-6 group-hover:bg-[var(--gold)]/30 transition-colors duration-300">
                <Icon className="w-8 h-8 text-[var(--gold)]" aria-hidden="true" />
              </div>
              <h3 className="font-heading font-bold text-xl text-white mb-3">{title}</h3>
              <p className="text-red-200 text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>

        {/* CTA strip */}
        <div className="mt-14 text-center">
          <a
            href="#products"
            className="inline-flex items-center justify-center gap-2 bg-[var(--gold)] hover:bg-[var(--gold-dark)] text-[var(--crimson-dark)] font-bold text-base px-10 py-4 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
          >
            Khám Phá Ngay
          </a>
        </div>
      </div>

      {/* Gold divider bottom */}
      <div className="h-px bg-[var(--gold)]/30 mt-16 mx-auto max-w-2xl" aria-hidden="true" />
    </section>
  )
}
