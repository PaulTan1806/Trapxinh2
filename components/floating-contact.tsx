import { Phone } from "lucide-react"

export default function FloatingContact() {
  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-center gap-3" aria-label="Liên hệ nhanh">
      {/* Zalo button */}
      <a
        href="https://zalo.me/0896460457"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Nhắn tin Zalo"
        className="relative w-14 h-14 flex items-center justify-center rounded-full shadow-xl transition-transform duration-300 hover:scale-110"
      >
        {/* Pulse ring */}
        <span
          className="absolute inset-0 rounded-full bg-blue-500 animate-pulse-ring"
          aria-hidden="true"
        />
        <span className="relative w-14 h-14 bg-blue-500 rounded-full flex items-center justify-center">
          {/* Zalo Z icon */}
          <span className="text-white font-black text-xl leading-none" aria-hidden="true">Z</span>
        </span>
      </a>

      {/* Phone call button */}
      <a
        href="tel:0896460457"
        aria-label="Gọi ngay: 089 646 0457"
        className="relative w-14 h-14 flex items-center justify-center rounded-full shadow-xl transition-transform duration-300 hover:scale-110"
      >
        {/* Pulse ring */}
        <span
          className="absolute inset-0 rounded-full bg-[var(--crimson)] animate-pulse-ring"
          aria-hidden="true"
        />
        <span className="relative w-14 h-14 bg-[var(--crimson)] rounded-full flex items-center justify-center">
          <Phone className="w-6 h-6 text-white" aria-hidden="true" />
        </span>
      </a>
    </div>
  )
}
