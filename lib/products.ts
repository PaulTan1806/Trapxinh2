export interface Product {
  id: number
  name: string
  shortDesc: string
  price: number
  category: string
  badge?: string
  image: string
}

export const CATEGORIES = [
  { id: "all", label: "Tất Cả" },
  { id: "trap-5", label: "Tráp 5 Quả" },
  { id: "trap-7", label: "Tráp 7 Quả" },
  { id: "trap-9", label: "Tráp 9 Quả" },
  { id: "rong-phuong", label: "Tráp Rồng Phượng" },
  { id: "hien-dai", label: "Tráp Hiện Đại" },
]

export const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Combo 7 Tráp Rồng Phượng Hoàng Gia",
    shortDesc: "Trầu cau, Trà rượu, Bánh phu thê, Trái cây, Xôi gấc, Bánh kem, Nem chả",
    price: 5500000,
    category: "rong-phuong",
    badge: "Best Seller",
    image: "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=600&q=80",
  },
  {
    id: 2,
    name: "Bộ Tráp 9 Quả Phồn Vinh",
    shortDesc: "9 mâm quả đầy đủ, hoa tươi cao cấp, đặt tên đôi uyên ương",
    price: 7800000,
    category: "trap-9",
    badge: "Cao Cấp",
    image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=600&q=80",
  },
  {
    id: 3,
    name: "Tráp 5 Quả Hiện Đại Tối Giản",
    shortDesc: "Trầu cau, Rượu bánh, Trái cây tươi, Hộp quà sang trọng",
    price: 2800000,
    category: "hien-dai",
    badge: "Mới",
    image: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=600&q=80",
  },
  {
    id: 4,
    name: "Combo Tráp 7 Quả Hoa Hồng Đỏ",
    shortDesc: "Hoa hồng nhập khẩu, Trầu cau, Bánh phu thê truyền thống, Trà rượu",
    price: 4200000,
    category: "trap-7",
    badge: "Hot",
    image: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=600&q=80",
  },
  {
    id: 5,
    name: "Tráp Rồng Phượng Cổ Điển Vàng",
    shortDesc: "Khung rồng phượng mạ vàng, Hoa tươi cao cấp, Trầu cau, Xôi chè",
    price: 6900000,
    category: "rong-phuong",
    badge: "Best Seller",
    image: "https://images.unsplash.com/photo-1606216794364-60d8b84fa3c9?w=600&q=80",
  },
  {
    id: 6,
    name: "Bộ Tráp 5 Quả Đơn Giản Thanh Lịch",
    shortDesc: "Mâm quả tối giản, hoa baby breath trắng, hộp lụa đỏ đặc biệt",
    price: 1950000,
    category: "trap-5",
    image: "https://images.unsplash.com/photo-1478145046317-39f10e56b5e9?w=600&q=80",
  },
  {
    id: 7,
    name: "Combo 9 Tráp Phồn Vinh Phú Quý",
    shortDesc: "9 mâm quả đầy đủ, thiết kế riêng, trang trí thêu chỉ vàng",
    price: 9500000,
    category: "trap-9",
    badge: "Cao Cấp",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=600&q=80",
  },
  {
    id: 8,
    name: "Tráp 7 Quả Hiện Đại Premium",
    shortDesc: "Hộp acrylic trong suốt, hoa tươi, ruy băng lụa nhập khẩu",
    price: 4800000,
    category: "hien-dai",
    badge: "Mới",
    image: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=600&q=80",
  },
]

export function formatVND(price: number): string {
  return price.toLocaleString("vi-VN") + " đ"
}

/**
 * Public Google Sheets CSV URL acting as a lightweight product CMS.
 * Replace YOUR_PUBLISHED_LINK_HERE with the real published-to-web CSV link:
 *   File → Share → Publish to web → (sheet) → CSV
 */
export const SHEET_CSV_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vScikEI7WU3hwRECs5iy1EAarsa3jDYAi3J6-EJQurxqp0VU9ePl-4Ny0FKjJ0GemMXnOgA94lokDDy/pub?output=csv"

/**
 * Parse a single CSV line into fields, handling basic double-quote wrapping
 * and escaped quotes ("") inside quoted values.
 */
function parseCsvLine(line: string): string[] {
  const fields: string[] = []
  let current = ""
  let inQuotes = false

  for (let i = 0; i < line.length; i++) {
    const char = line[i]
    if (char === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"'
        i++ // skip escaped quote
      } else {
        inQuotes = !inQuotes
      }
    } else if (char === "," && !inQuotes) {
      fields.push(current)
      current = ""
    } else {
      current += char
    }
  }
  fields.push(current)
  return fields.map((f) => f.trim())
}

/**
 * Convert raw CSV text into a Product[].
 * Expected columns: id, name, category, price, description, image, badge
 */
function parseProductsCsv(csv: string): Product[] {
  const lines = csv.split(/\r?\n/).filter((l) => l.trim().length > 0)
  if (lines.length < 2) return []

  const headers = parseCsvLine(lines[0]).map((h) => h.toLowerCase())
  const idx = (key: string) => headers.indexOf(key)

  const iId = idx("id")
  const iName = idx("name")
  const iCategory = idx("category")
  const iPrice = idx("price")
  const iDesc = idx("description")
  const iImage = idx("image")
  const iBadge = idx("badge")

  const products: Product[] = []
  for (let i = 1; i < lines.length; i++) {
    const cols = parseCsvLine(lines[i])
    const name = iName >= 0 ? cols[iName] : ""
    if (!name) continue

    const rawPrice = iPrice >= 0 ? cols[iPrice] : "0"
    const price = Number(rawPrice.replace(/[^\d]/g, "")) || 0
    const badge = iBadge >= 0 ? cols[iBadge] : ""

    products.push({
      id: Number(iId >= 0 ? cols[iId] : i) || i,
      name,
      category: iCategory >= 0 ? cols[iCategory] : "all",
      price,
      shortDesc: iDesc >= 0 ? cols[iDesc] : "",
      image: iImage >= 0 ? cols[iImage] : "",
      badge: badge || undefined,
    })
  }
  return products
}

/**
 * Fetch products from Google Sheets CSV.
 * Falls back to the hardcoded PRODUCTS array on any error or empty result.
 */
export async function fetchProducts(): Promise<Product[]> {
  try {
    const res = await fetch(SHEET_CSV_URL, { cache: "no-store" })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const csv = await res.text()
    const parsed = parseProductsCsv(csv)
    if (parsed.length === 0) throw new Error("No products parsed from sheet")
    return parsed
  } catch (err) {
    console.log("[v0] fetchProducts fallback to mock data:", (err as Error).message)
    return PRODUCTS
  }
}
