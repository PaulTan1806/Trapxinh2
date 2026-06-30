import { Sparkles, MapPin, Phone, Mail, Clock } from "lucide-react"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-[var(--crimson-dark)] border-t border-[var(--gold)]/20" aria-label="Chân trang">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-[var(--gold)]" aria-hidden="true" />
              <span className="font-heading font-bold text-2xl text-[var(--gold)]">TÀI LỘC CƯỚI</span>
            </div>
            <p className="text-red-200 text-sm leading-relaxed max-w-sm mb-6">
              Chuyên cung cấp mâm quả cưới hiện đại &amp; tráp rồng phượng cao cấp tại TP.HCM.
              Hoa tươi 100% — Thiết kế độc quyền — Giao hàng đúng giờ cát tường.
            </p>
            <div className="flex gap-3">
              {["FB", "IG", "TT", "YT"].map((social) => (
                <a
                  key={social}
                  href="#"
                  aria-label={`Mạng xã hội ${social}`}
                  className="w-9 h-9 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-red-200 hover:bg-[var(--gold)] hover:text-[var(--crimson-dark)] hover:border-[var(--gold)] transition-all duration-200 text-xs font-bold"
                >
                  {social}
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-heading font-semibold text-[var(--gold)] mb-4">Dịch Vụ</h3>
            <ul className="space-y-2.5">
              {[
                "Mâm quả 5 tráp",
                "Mâm quả 7 tráp",
                "Mâm quả 9 tráp",
                "Tráp Rồng Phượng",
                "Tráp Hiện Đại",
                "Tư vấn & Setup",
              ].map((item) => (
                <li key={item}>
                  <a
                    href="#products"
                    className="text-red-200 hover:text-[var(--gold)] text-sm transition-colors duration-200"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-heading font-semibold text-[var(--gold)] mb-4">Liên Hệ</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5 text-sm text-red-200">
                <MapPin className="w-4 h-4 text-[var(--gold)] shrink-0 mt-0.5" aria-hidden="true" />
                <span>Chưa có</span>
              </li>
              <li className="flex items-center gap-2.5 text-sm text-red-200">
                <Phone className="w-4 h-4 text-[var(--gold)] shrink-0" aria-hidden="true" />
                <a href="tel:0896460457" className="hover:text-[var(--gold)] transition-colors">
                  089 646 0457
                </a>
              </li>
              <li className="flex items-center gap-2.5 text-sm text-red-200">
                <Mail className="w-4 h-4 text-[var(--gold)] shrink-0" aria-hidden="true" />
                <a href="mailto:info@tailoccuoi.vn" className="hover:text-[var(--gold)] transition-colors">
                  Phatta0923@mail.com
                </a>
              </li>
              <li className="flex items-center gap-2.5 text-sm text-red-200">
                <Clock className="w-4 h-4 text-[var(--gold)] shrink-0" aria-hidden="true" />
                <span>Bán xuyên ngày đêm, 24/7</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-red-300 text-xs text-center sm:text-left">
            © {currentYear} Tài Lộc Cưới. Đã đăng ký bản quyền.
          </p>
          <div className="flex gap-4">
            {["Chính sách bảo mật", "Điều khoản dịch vụ"].map((link) => (
              <a
                key={link}
                href="#"
                className="text-red-300 hover:text-[var(--gold)] text-xs transition-colors"
              >
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
