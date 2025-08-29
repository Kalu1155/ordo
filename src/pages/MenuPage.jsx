import React, { useContext,useState } from "react";
import { CartContext } from "../context/CartContext";
import { toast } from "react-toastify";
import Navbar from "../component/Navbar";
import Footer from "../component/Footer";

const categories = ["Chicken", "Pasta", "Burgers", "Salads","Chicken", ];

const dishes = [
  {
    id: 1,
    name: "Grilled Chicken",
    description: "Tender chicken breast with smoky BBQ glaze.",
    price: 15.99,
    image: "https://plus.unsplash.com/premium_photo-1669742928112-19364a33b530?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    id: 2,
    name: "Pasta Alfredo",
    description: "Creamy Alfredo sauce with fettuccine pasta.",
    price: 12.5,
    image: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?q=80&w=580&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },  {
    id: 30,
    name: "Pasta Alfredo",
    description: "Creamy Alfredo sauce with fettuccine pasta.",
    price: 12.5,
    image: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?q=80&w=580&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
    {
    id: 20,
    name: "Pasta Alfredo",
    description: "Creamy Alfredo sauce with fettuccine pasta.",
    price: 12.5,
    image: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?q=80&w=580&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    id: 3,
    name: "Cheeseburger",
    description: "Juicy beef patty, cheddar cheese, and fresh toppings.",
    price: 10.0,
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=699&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
    {
    id: 5,
    name: "Cheeseburger",
    description: "Juicy beef patty, cheddar cheese, and fresh toppings.",
    price: 10.0,
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=699&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
    {
    id: 6,
    name: "Cheeseburger",
    description: "Juicy beef patty, cheddar cheese, and fresh toppings.",
    price: 10.0,
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=699&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    id: 4,
    name: "Caesar Salad",
    description: "Crisp lettuce, parmesan, croutons, and Caesar dressing.",
    price: 8.75,
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  }
];

const MenuPage = () => {
  const { addToCart } = useContext(CartContext);

const [selectedFilters, setSelectedFilters] = useState([]);


  const toggleFilter = (category) => {
    if (selectedFilters.includes(category)) {
      setSelectedFilters(selectedFilters.filter(c => c !== category));
    } else {
      setSelectedFilters([...selectedFilters, category]);
    }
  };

  const filteredDishes = selectedFilters.length
    ? dishes.filter(d => selectedFilters.includes(d.name.split(" ")[0]))
    : dishes;

 
const AddedToCart = (dish) => {
  addToCart(dish);
  toast.success("Added to cart ✅");
};



return (
    <>
      <Navbar />
      <div className="menu container">
        <h2>Our Menu 🍽️</h2>

        <div className="filters">
          {categories.map(cat => (
            <button
              key={cat}
              className={`pill ${selectedFilters.includes(cat) ? "active" : ""}`}
              onClick={() => toggleFilter(cat)}
            >
              {cat} ✖
            </button>
          ))}
        </div>

        <div className="menu-grid">
          {filteredDishes.map(dish => (
            <div key={dish.id} className="dish-card">
              <img src={dish.image} alt={dish.name} />
              <h3>{dish.name}</h3>
              <p>{dish.description}</p>
              <div className="dish-footer">
                <span>${dish.price.toFixed(2)}</span>
                <button className="btn btn-primary" onClick={() => AddedToCart(dish)}>Add to Cart</button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default MenuPage;
