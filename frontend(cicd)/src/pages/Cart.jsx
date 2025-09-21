import React, { useEffect } from 'react';
import { useCart } from "../context/CartContext";
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';

export default function Cart() {
  const { cart, setCart } = useCart();

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);
  }, []);

  // Save cart to localStorage whenever it updates
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const removeFromCart = (id) => {
    setCart(prevCart => {
      const updatedCart = prevCart.filter(item => item.id !== id);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    setCart(prevCart => {
      const updatedCart = prevCart.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      );
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  const subtotal = cart.reduce((total, item) => total + item.price * (item.quantity || 1), 0);
  const shipping = subtotal > 100 ? 0 : 10;
  const total = subtotal + shipping;

  if (cart.length === 0) {
    return (
      <div className="max-w-3xl mx-auto p-6 border rounded-lg shadow-md bg-white text-center">
        <ShoppingBag className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-1">Your cart is empty</h3>
        <p className="text-gray-500 mb-4">Looks like you haven't added anything yet</p>
        <button className="mt-2 px-4 py-2 border rounded-md text-gray-700 hover:bg-gray-100">
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6 border rounded-lg shadow-md bg-white">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Shopping Cart</h2>
        <span className="px-2 py-1 text-sm bg-gray-200 rounded">{cart.length} {cart.length === 1 ? 'item' : 'items'}</span>
      </div>

      <div className="space-y-4">
        {cart.map((item) => (
          <div key={item.id} className="flex items-center gap-4 p-4 border rounded-lg bg-gray-50 hover:bg-gray-100 transition">
            <img src={item.images[0]} alt={item.name} className="w-24 h-24 object-cover rounded-md" />
            <div className="flex-grow">
              <h3 className="font-medium text-lg text-gray-900">{item.name}</h3>
              <p className="text-gray-500 text-sm mb-2">{item.description}</p>

              <div className="flex items-center justify-between mt-2">
                <div className="flex items-center space-x-3">
                  <button 
                    className="px-2 py-1 border rounded-md hover:bg-gray-200"
                    onClick={() => updateQuantity(item.id, (item.quantity || 1) - 1)}
                    disabled={(item.quantity || 1) <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="text-gray-900 w-8 text-center">{item.quantity || 1}</span>
                  <button 
                    className="px-2 py-1 border rounded-md hover:bg-gray-200"
                    onClick={() => updateQuantity(item.id, (item.quantity || 1) + 1)}
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>

                <div className="flex items-center gap-4">
                  <p className="text-lg font-semibold">${(item.price * (item.quantity || 1)).toFixed(2)}</p>
                  <button 
                    className="text-gray-500 hover:text-red-500"
                    onClick={() => removeFromCart(item.id)}
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="border-t mt-6 pt-4">
        <div className="space-y-3">
          <div className="flex justify-between text-gray-600">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-gray-600">
            <span>Shipping</span>
            <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
          </div>
          <div className="border-t pt-3 flex justify-between font-semibold text-lg">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>

        <button className="w-full mt-6 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
          Proceed to Checkout
        </button>

        <p className="text-center text-gray-500 text-sm mt-4">Free shipping on orders over $100</p>
      </div>
    </div>
  );
}
