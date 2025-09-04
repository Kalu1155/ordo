import React, { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { OrderContext } from "../context/OrderContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const CheckoutPage = () => {
  const { cart, clearCart } = useContext(CartContext);
  const { addOrder } = useContext(OrderContext);
  const navigate = useNavigate();

  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    phone: "",
    address: "",
    payment: "cod",
  });

const total = cart.reduce(
  (sum, item) => sum + (Number(item.price) || 0) * (item.quantity || 0),
  0
);



  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomerInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckout = () => {
    if (cart.length === 0) return toast.info("Your cart is empty!");
    if (!customerInfo.name || !customerInfo.phone || !customerInfo.address) {
      return toast.error("Please fill in all customer details.");
    }

 const newOrder = {
  id: Date.now(),
  date: new Date().toISOString().split("T")[0],
  items: cart.map((item) => ({
    id: item.id,
    name: item.name,
    quantity: item.quantity || 1,
    price: Number(item.price) || 0, 
  })),
  total: cart.reduce(
    (sum, item) => sum + (Number(item.price) || 0) * (item.quantity || 1),
    0
  ),
  status: "Pending",
};


    addOrder(newOrder);
    clearCart();
    navigate("/customer/orders"); 
  };

  return (
    <div className="checkout container">
      <h2>🧾 Checkout</h2>

      <div className="checkout-grid">
        {/* Cart Summary */}
        <div className="cart-summary card">
          <h4>Order Summary</h4>
          <table className="table">
            <thead>
              <tr>
                <th>Dish</th>
                <th>Qty</th>
                <th>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                 <td>{item.quantity || 0}</td>
<td>₦{((Number(item.price) || 0) * (item.quantity || 0)).toFixed(2)}</td>

                </tr>
              ))}
            </tbody>
          </table>
          <h5>Total: ₦{total.toFixed(2)}</h5>
        </div>

        {/* Customer Info */}
        <div className="customer-info card">
          <h4>Customer Details</h4>
          <form>
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                name="name"
                value={customerInfo.name}
                onChange={handleChange}
                className="form-control"
                placeholder="Enter your name"
              />
            </div>
            <div className="form-group">
              <label>Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={customerInfo.phone}
                onChange={handleChange}
                className="form-control"
                placeholder="e.g. 08012345678"
              />
            </div>
            <div className="form-group">
              <label>Delivery Address</label>
              <textarea
                name="address"
                value={customerInfo.address}
                onChange={handleChange}
                className="form-control"
                placeholder="Enter delivery address"
              />
            </div>
            <div className="form-group">
              <label>Payment Method</label>
              <select
                name="payment"
                value={customerInfo.payment}
                onChange={handleChange}
                className="form-control"
              >
                <option value="cod">Cash on Delivery</option>
                <option value="card">Credit/Debit Card</option>
                <option value="transfer">Bank Transfer</option>
              </select>
            </div>
          </form>
          <button className="btn btn-primary w-100 mt-3" onClick={handleCheckout}>
            ✅ Confirm & Place Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
