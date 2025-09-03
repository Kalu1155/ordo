import React, { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import food from "../assets/img/food_3.jpeg"

const CardModal = ({ show, onHide, dish }) => {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useContext(CartContext);
  const AddedToCart = (dish) => {
      addToCart(dish);
      toast.success("Added to cart ✅");
    };
  
  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {dish.name}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="row">
          <div className="menuimg col-md-6">
            <img
              src={dish.image}
              // src={food}
              alt={dish.name}
              style={{ width: "100%", borderRadius: "10px", marginBottom: "1rem" }}
            />
          </div>
          <div className="menudesc col-md-5">
            <h5 className="mt-4"><b>Food Description</b>: </h5>
            <p>{dish.description}</p>
            <h5 className="my-4"><b>Price</b>:₦{dish.price.toFixed(2)}</h5>
            <h5 className="my-4"><b>Category</b>:{dish.category.join(', ')}</h5>
              <label htmlFor="Quant" className="mt-4 mx-2"><b>Quantity:</b></label>
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
       <button className="btn btn-primary" onClick={() => AddedToCart(dish)}>
                  Add to Cart
                </button>
      </Modal.Footer>
    </Modal>
  );
};

export default CardModal;
