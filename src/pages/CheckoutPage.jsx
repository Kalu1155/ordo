import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { OrderContext } from "../context/OrderContext";
import { useNavigate } from "react-router-dom";

const CheckoutPage = () => {
  const { cart, clearCart } = useContext(CartContext);
  const { addOrder } = useContext(OrderContext);
  const navigate = useNavigate();
  
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  const handleCheckout = () => {
    if (cart.length === 0) return;

    const newOrder = {
      id: Date.now(),
      date: new Date().toISOString().split("T")[0],
      items: cart.map((item) => item.name),
      total: cart.reduce((sum, item) => sum + item.price * item.qty, 0),
      status: "Pending",
    };

    addOrder(newOrder); // ✅ Save order globally
    clearCart();
    navigate("/customer/orders"); // Redirect to order history
  };

  return (
    <div className="checkout container">
      <h2>Checkout</h2>
      <p>Total Amount: <strong>${total.toFixed(2)}</strong></p>
      <button className="btn btn-primary" onClick={handleCheckout}>
        Confirm Order
      </button>
    </div>
  );
};

export default CheckoutPage;
