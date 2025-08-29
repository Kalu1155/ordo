import React, { useState } from "react";

const MenuManagement = () => {
  const [dishes, setDishes] = useState([
    { id: 1, name: "Grilled Chicken", price: 15.99, category: "Main" },
    { id: 2, name: "Caesar Salad", price: 8.75, category: "Starter" },
  ]);

  const [newDish, setNewDish] = useState({
    name: "",
    price: "",
    category: "",
  });

  const handleChange = (e) => {
    setNewDish({ ...newDish, [e.target.name]: e.target.value });
  };

  const handleAdd = (e) => {
    e.preventDefault();
    if (!newDish.name || !newDish.price) return;
    setDishes([
      ...dishes,
      { id: Date.now(), ...newDish, price: parseFloat(newDish.price) },
    ]);
    setNewDish({ name: "", price: "", category: "" });
  };

  const handleDelete = (id) => {
    setDishes(dishes.filter((dish) => dish.id !== id));
  };

  return (
    <div className="menu-management">
      <h2>🍴 Menu Management</h2>

      {/* Add Dish Form */}
      <form className="add-form" onSubmit={handleAdd}>
        <input
          type="text"
          name="name"
          placeholder="Dish name"
          value={newDish.name}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={newDish.price}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={newDish.category}
          onChange={handleChange}
        />
        <button type="submit" className="btn btn-primary">
          Add Dish
        </button>
      </form>

      {/* Dish List */}
      <table className="dish-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Price ($)</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {dishes.map((dish) => (
            <tr key={dish.id}>
              <td>{dish.name}</td>
              <td>{dish.category}</td>
              <td>{dish.price.toFixed(2)}</td>
              <td>
                <button className="btn btn-danger" onClick={() => handleDelete(dish.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MenuManagement;
