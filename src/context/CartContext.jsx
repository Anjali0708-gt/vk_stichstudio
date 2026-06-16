/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useEffect, useContext } from 'react';

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  // Lazy state initialization to satisfy react-hooks/set-state-in-effect
  const [cart, setCart] = useState(() => {
    const storedCart = localStorage.getItem('vk_cart');
    if (storedCart) {
      try {
        return JSON.parse(storedCart);
      } catch (e) {
        console.error('Failed to parse cart storage', e);
        return [];
      }
    }
    return [];
  });

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('vk_cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product, size, customMeasurements = null) => {
    setCart((prevCart) => {
      // Find index of same product with same size
      const existingIndex = prevCart.findIndex(
        (item) => item.id === product.id && item.selectedSize === size
      );

      if (existingIndex > -1) {
        // Increment quantity
        const newCart = [...prevCart];
        newCart[existingIndex].quantity += 1;
        return newCart;
      } else {
        // Add new item
        return [
          ...prevCart,
          {
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            selectedSize: size,
            customMeasurements: customMeasurements,
            quantity: 1
          }
        ];
      }
    });
  };

  const removeFromCart = (productId, size) => {
    setCart((prevCart) =>
      prevCart.filter((item) => !(item.id === productId && item.selectedSize === size))
    );
  };

  const updateQuantity = (productId, size, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId, size);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId && item.selectedSize === size
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  const value = {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartCount,
    cartTotal
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
