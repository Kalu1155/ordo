import React, { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { toast } from "react-toastify";
import Navbar from "../component/Navbar";
import Footer from "../component/Footer";
import { FaEye } from "react-icons/fa";
import CardModal from "../component/CardModal";

// Normalized dish data
const dishes = [
  {
    id: 1,
    name: "Grilled Chicken",
    description: "Tender chicken breast with smoky BBQ glaze.",
    price: 15.99,
    category: ["Chicken", "Grills"],
    image: "https://plus.unsplash.com/premium_photo-1669742928112-19364a33b530?q=80&w=387&auto=format&fit=crop"
  },
  {
    id: 2,
    name: "Pasta Alfredo",
    description: "Creamy Alfredo sauce with fettuccine pasta.",
    price: 12.5,
    category: ["Pasta", "Spaghetti"],
    image: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?q=80&w=580&auto=format&fit=crop"
  },
  {
    id: 3,
    name: "Cheeseburger",
    description: "Juicy beef patty, cheddar cheese, and fresh toppings.",
    price: 10.0,
    category: ["Cheese", "Burgers"],
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=699&auto=format&fit=crop"
  },
  {
    id: 4,
    name: "Caesar Salad",
    description: "Crisp lettuce, parmesan, croutons, and Caesar dressing.",
    price: 8.75,
    category: ["Salads", "Caesar"],
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=870&auto=format&fit=crop"
  }
];

// Auto-generate unique categories from dishes
const categories = Array.from(new Set(dishes.flatMap(dish => dish.category)));

const MenuPage = () => {
  const { addToCart } = useContext(CartContext);

  const [selectedFilters, setSelectedFilters] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [selectedDish, setSelectedDish] = useState(null);

  const toggleFilter = (category) => {
    if (selectedFilters.includes(category)) {
      setSelectedFilters(selectedFilters.filter(c => c !== category));
    } else {
      setSelectedFilters([...selectedFilters, category]);
    }
  };

  // Filtering logic (works with arrays of categories)
  const filteredDishes = selectedFilters.length
    ? dishes.filter(dish =>
        dish.category.some(cat => selectedFilters.includes(cat))
      )
    : dishes;

  const AddedToCart = (dish) => {
    addToCart(dish);
    toast.success("Added to cart ✅");
  };

  const handleViewDish = (dish) => {
    setSelectedDish(dish);
    setModalShow(true);
  };

  return (
    <>
      <Navbar />
      <div className="menu container">
        <h2>Our Menu 🍽️</h2>

        {/* Filters */}
        <div className="filters">
          {categories.map(cat => (
            <button
              key={cat}
              className={`pill ${selectedFilters.includes(cat) ? "active" : ""}`}
              onClick={() => toggleFilter(cat)}
            >
              {cat}
              {selectedFilters.includes(cat) && " ✖"}
            </button>
          ))}
        </div>

        {/* Dishes */}
        <div className="menu-grid">
          {filteredDishes.map(dish => (
            <div key={dish.id} className="dish-card">
              <div className="viewpro" onClick={() => handleViewDish(dish)}>
                <FaEye size="25px" />
              </div>
              <img src={dish.image} alt={dish.name} />
              <h3>{dish.name}</h3>
              <p>{dish.description}</p>
              <div className="dish-footer">
                <span>₦{dish.price.toFixed(2)}</span>
                <button className="btn btn-primary" onClick={() => AddedToCart(dish)}>
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* One global modal */}
      {selectedDish && (
        <CardModal
          show={modalShow}
          onHide={() => setModalShow(false)}
          dish={selectedDish}
        />
      )}

      <Footer />
    </>
  );
};

export default MenuPage;
