"use client"

import { useState } from "react"
import { ShoppingCart, Phone, Sparkles, Menu, X, PackageSearch } from "lucide-react"

interface HeaderProps {
  cartCount: number
  onCartClick: () => void
  onTrackClick: () => void
}

export default function Header({ cartCount, onCartClick, onTrackClick }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false)

  const navLinks = [
    { label: "Trang chủ", href: "#" },
    { label: "Mâm Quả", href: "#products" },
    { label: "Tráp Rồng Phượng", href: "#products" },
    { label: "Bảng Giá", href: "#products" },
    { label: "Hỏi Đáp", href: "#" },
  ]

  return (
    <header className="sticky top-0 z-50 bg-[var(--crimson-dark)] shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 shrink-0">
            <Sparkles className="w-5 h-5 text-[var(--gold)]" aria-hidden="true" />
            <span className="font-heading font-bold text-xl tracking-wide text-[var(--gold)] leading-none">
              TRAPXINH.COM
            </span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-6" aria-label="Điều hướng chính">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-red-100 hover:text-[var(--gold)] transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
            <button
              onClick={onTrackClick}
              className="flex items-center gap-1.5 text-sm font-medium text-red-100 hover:text-[var(--gold)] transition-colors duration-200"
            >
              <PackageSearch className="w-4 h-4" aria-hidden="true" />
              Tra cứu đơn
            </button>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            <a
              href="tel:0896460457"
              className="hidden sm:flex items-center gap-2 bg-[var(--gold)] hover:bg-[var(--gold-dark)] text-[var(--crimson-dark)] text-sm font-semibold px-4 py-2 rounded-full transition-all duration-200"
            >
              <Phone className="w-4 h-4" aria-hidden="true" />
              <span>Hotline / Zalo</span>
            </a>

            {/* Cart */}
            <button
              onClick={onCartClick}
              className="relative p-2 rounded-full text-red-100 hover:text-[var(--gold)] hover:bg-white/10 transition-all duration-200"
              aria-label={`Giỏ hàng (${cartCount} sản phẩm)`}
            >
              <ShoppingCart className="w-6 h-6" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[var(--gold)] text-[var(--crimson-dark)] text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center leading-none">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile menu toggle */}
            <button
              className="lg:hidden p-2 text-red-100 hover:text-[var(--gold)] transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Mở menu"
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <nav
          className="lg:hidden bg-[var(--crimson)] border-t border-red-700 px-4 pb-4"
          aria-label="Điều hướng di động"
        >
          <ul className="flex flex-col gap-1 mt-3">
            {navLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="block py-2 px-3 rounded-lg text-red-100 hover:bg-white/10 hover:text-[var(--gold)] text-sm font-medium transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <button
                onClick={() => {
                  setMobileOpen(false)
                  onTrackClick()
                }}
                className="flex w-full items-center gap-2 py-2 px-3 rounded-lg text-red-100 hover:bg-white/10 hover:text-[var(--gold)] text-sm font-medium transition-colors"
              >
                <PackageSearch className="w-4 h-4" aria-hidden="true" />
                Tra cứu đơn
              </button>
            </li>
            <li className="mt-2">
              <a
                href="tel:0896460457"
                className="flex items-center gap-2 bg-[var(--gold)] text-[var(--crimson-dark)] text-sm font-semibold px-4 py-2.5 rounded-full w-full justify-center"
              >
                <Phone className="w-4 h-4" />
                Hotline / Zalo: 089 646 0457 (Phat)
              </a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  )
}
