"use client";
import { createContext, useState } from "react";

export const CartContext = createContext();

export function CartProvider({children}) {
  // state cart to store all selected products
  const [cart, setCart] = useState([]);

  // function to add products to cart
  function addToCart(product) {
    setCart((prev) => {
      let selectedProduct = prev.find((item) => item._id == product._id);
      if (!selectedProduct) {
        return [...prev, { ...product, quantity: 1 }];
      } else {
        return prev.map((item) =>
          item._id == product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
    });
  }

  // function to remove a product from cart
  function removeFromCart(productId) {
    setCart((prev) => prev.filter((product) => product._id != productId));
  }

  // function to update the quantity of products
  function updateQuantity(productId, newQuantity) {
    setCart((prev) =>
      prev.map((item) =>
        item._id == productId 
            ? { ...item, quantity: newQuantity } 
            : item
      )
    );
  }

  // function to sum all cart products price
  function getTotalPrice(){
    let totalPrice=0;
    cart.forEach(item=> totalPrice += item.quantity * item.price)
    return totalPrice
  }


  return(
    <CartContext.Provider value={{cart, addToCart, removeFromCart, updateQuantity, getTotalPrice}}>
        {children}
    </CartContext.Provider>
  )
}
