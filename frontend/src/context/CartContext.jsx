import { createContext, useContext, useState } from 'react'

const CartContext = createContext()

export function CartProvider({ children }) {
  const [cart, setCart] = useState([])

  // Sepete ürün ekleme
  const addToCart = (product) => {
    setCart(currentCart => {
      const existingItem = currentCart.find(item => item.id === product.id)
      
      if (existingItem) {
        // Ürün zaten sepette varsa miktarını artır
        return currentCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      
      // Ürün sepette yoksa yeni ekle
      return [...currentCart, { ...product, quantity: 1 }]
    })
  }

  // Sepetten ürün çıkarma
  const removeFromCart = (productId) => {
    setCart(currentCart => 
      currentCart.filter(item => item.id !== productId)
    )
  }

  // Ürün miktarını güncelleme
  const updateQuantity = (productId, newQuantity) => {
    setCart(currentCart => {
      if (newQuantity === 0) {
        return currentCart.filter(item => item.id !== productId)
      }

      return currentCart.map(item =>
        item.id === productId
          ? { ...item, quantity: newQuantity }
          : item
      )
    })
  }

  // Sepeti temizleme
  const clearCart = () => {
    setCart([])
  }

  // Sepetteki toplam ürün sayısı
  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0)

  // Sepet toplamı
  const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0)

  const value = {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartItemCount,
    cartTotal
  }

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
}

// Custom hook for using cart context
export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}