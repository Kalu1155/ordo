import React, { useContext, useState, useEffect } from "react";
import { CartContext } from "../context/CartContext";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";   // ✅ make sure toast is imported
import food from "../assets/img/food_3.jpeg";

const CardModal = ({ show, onHide, dish }) => {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useContext(CartContext);

  // Reset quantity whenever modal closes
  useEffect(() => {
    if (!show) setQuantity(1);
  }, [show]);

  const handleAddToCart = () => {
    try {
      addToCart(dish, quantity);
      toast.success(`${quantity} × ${dish.name} added to cart ✅`);
    } catch (err) {
      console.error(err);
      toast.error("Could not add to cart ❌");
    } finally {
      onHide(); // ✅ always trigger close
    }
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>{dish?.name}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div className="row">
          <div className="menuimg col-md-6">
            <img
              src={dish?.image || food}
              alt={dish?.name}
              style={{
                width: "100%",
                borderRadius: "10px",
                marginBottom: "1rem",
              }}
            />
          </div>
          <div className="menudesc col-md-5">
            <h5 className="mt-4"><b>Food Description</b>:</h5>
            <p>{dish?.description}</p>
            <h5 className="my-4"><b>Price</b>: ₦{dish?.price.toFixed(2)}</h5>
            <h5 className="my-4"><b>Category</b>: {dish?.category?.join(", ")}</h5>

            <label htmlFor="Quant" className="mt-4 mx-2">
              <b>Quantity:</b>
            </label>
             <div className="quantity mt-3">
              <button className="quantity-minus qty-btn"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}>
                <i>-</i>
              </button>
              <input
                type="number"
                className="qty-input"
                step="1"
                min="1"
                max="100"
                name="quantity"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                title="Qty"
              />
              <button className="quantity-plus qty-btn"
                onClick={() => setQuantity(quantity + 1)}>
                <i>+</i>
              </button>
            </div>
          </div>
        </div>
      </Modal.Body>

      <Modal.Footer>
        <button className="btn btn-primary" onClick={handleAddToCart}>
          Add {quantity} × {dish?.name} to Cart
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default CardModal;
