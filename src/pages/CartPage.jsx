import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";
import food from "../assets/img/food_3.jpeg"; // fallback image if no dish.image

const CartPage = () => {
  const { cart, removeFromCart, clearCart } = useContext(CartContext);

  // Calculate cart total
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="cart container">
      <h2>🛒 Your Cart</h2>

      {cart.length === 0 ? (
        <p>
          Your cart is empty. <Link to="/menu">Browse Menu</Link>
        </p>
      ) : (
        <>
          <table className="cart-table table table-bordered table-striped">
            <thead>
              <tr>
                <th>Dish</th>
                <th>Qty</th>
                <th>Price</th>
                <th>Subtotal</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <tr key={item.id}>
                 <td>
  <div className="d-flex align-items-center gap-2 flex-wrap">
    <img className="cartimg" src={item.image || food} alt={item.name} />
    <span>{item.name}</span>
  </div>
</td>

                  <td>{item.quantity}</td>
                  <td>₦{item.price.toFixed(2)}</td>
                  <td>₦{(item.price * item.quantity).toFixed(2)}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => removeFromCart(item.id)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="d-flex justify-content-between align-items-center mt-4">
            <h3>Total: ₦{total.toFixed(2)}</h3>
            <div className="cart-actions">
              <Link to="/customer/checkout" className="btn btn-primary me-2">
                Proceed to Checkout
              </Link>
              <button className="btn btn-outline-danger" onClick={clearCart}>
                Clear Cart
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
