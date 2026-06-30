"use client"

import { useState, useCallback, useEffect } from "react"
import Header from "@/components/header"
import Hero from "@/components/hero"
import ProductGrid from "@/components/product-grid"
import WhyChooseUs from "@/components/why-choose-us"
import Footer from "@/components/footer"
import ProductModal from "@/components/product-modal"
import ToastNotification from "@/components/toast-notification"
import FloatingContact from "@/components/floating-contact"
import CartDrawer from "@/components/cart-drawer"
import CheckoutModal from "@/components/checkout-modal"
import OrderTrackingModal from "@/components/order-tracking-modal"
import { Product, fetchProducts } from "@/lib/products"

export default function Page() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [cart, setCart] = useState<Product[]>([])
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null)
  const [toast, setToast] = useState<string | null>(null)
  const [cartOpen, setCartOpen] = useState(false)
  const [checkoutOpen, setCheckoutOpen] = useState(false)
  const [trackingOpen, setTrackingOpen] = useState(false)
  const [products, setProducts] = useState<Product[]>([])
  const [isLoadingProducts, setIsLoadingProducts] = useState(true)

  useEffect(() => {
    let active = true
    setIsLoadingProducts(true)
    fetchProducts()
      .then((data) => {
        if (active) setProducts(data)
      })
      .finally(() => {
        if (active) setIsLoadingProducts(false)
      })
    return () => {
      active = false
    }
  }, [])

  const showToast = useCallback((msg: string) => {
    setToast(msg)
    setTimeout(() => setToast(null), 2800)
  }, [])

  const handleAddToCart = useCallback(
    (product: Product) => {
      setCart((prev) => [...prev, product])
      showToast(`Đã thêm "${product.name}" vào giỏ hàng!`)
    },
    [showToast]
  )

  const handleRemoveFromCart = useCallback((index: number) => {
    setCart((prev) => prev.filter((_, i) => i !== index))
  }, [])

  const handleViewDetail = useCallback((product: Product) => {
    setQuickViewProduct(product)
  }, [])

  const handleCloseModal = useCallback(() => {
    setQuickViewProduct(null)
  }, [])

  const handleOpenCheckout = useCallback(() => {
    setCartOpen(false)
    setCheckoutOpen(true)
  }, [])

  const handleBackToCart = useCallback(() => {
    setCheckoutOpen(false)
    setCartOpen(true)
  }, [])

  const handleOrderSuccess = useCallback(() => {
    setCart([])
  }, [])

  const handleCheckoutClose = useCallback(() => {
    setCheckoutOpen(false)
  }, [])

  return (
    <main>
      <Header
        cartCount={cart.length}
        onCartClick={() => setCartOpen(true)}
        onTrackClick={() => setTrackingOpen(true)}
      />

      <Hero />

      <ProductGrid
        products={products}
        isLoading={isLoadingProducts}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        onAddToCart={handleAddToCart}
        onViewDetail={handleViewDetail}
      />

      <WhyChooseUs />

      <Footer />

      {/* Overlays */}
      <ProductModal
        product={quickViewProduct}
        onClose={handleCloseModal}
        onAddToCart={handleAddToCart}
      />

      <ToastNotification message={toast} />

      <FloatingContact />

      <CartDrawer
        open={cartOpen}
        cart={cart}
        onClose={() => setCartOpen(false)}
        onRemove={handleRemoveFromCart}
        onCheckout={handleOpenCheckout}
      />

      <CheckoutModal
        open={checkoutOpen}
        cart={cart}
        onClose={handleCheckoutClose}
        onBackToCart={handleBackToCart}
        onSuccess={handleOrderSuccess}
      />

      <OrderTrackingModal open={trackingOpen} onClose={() => setTrackingOpen(false)} />
    </main>
  )
}
