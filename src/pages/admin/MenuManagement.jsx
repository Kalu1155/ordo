import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

/**
 * Stores menu in localStorage under "admin_menu"
 * Dish shape: { id, name, price:number, category, image: base64 or dataURL }
 */

const MENU_KEY = "admin_menu";

const readMenu = () => {
  try {
    return JSON.parse(localStorage.getItem(MENU_KEY) || "[]");
  } catch {
    return [];
  }
};

const MenuManagementAdmin = () => {
  const [dishes, setDishes] = useState(readMenu);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ name: "", price: "", category: "", image: "" });

  useEffect(() => {
    localStorage.setItem(MENU_KEY, JSON.stringify(dishes));
  }, [dishes]);

  const resetForm = () => setForm({ name: "", price: "", category: "", image: "" });

  const handleImage = (file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setForm(f => ({ ...f, image: reader.result }));
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.price) return toast.error("Name and price required");
    if (editing) {
      setDishes(prev => prev.map(d => d.id === editing ? { ...d, ...form, price: parseFloat(form.price) } : d));
      toast.success("Dish updated");
    } else {
      const newDish = { id: Date.now(), ...form, price: parseFloat(form.price) };
      setDishes(prev => [newDish, ...prev]);
      toast.success("Dish added");
    }
    resetForm();
    setEditing(null);
  };

  const handleEdit = (dish) => {
    setEditing(dish.id);
    setForm({ name: dish.name, price: String(dish.price), category: dish.category || "", image: dish.image || "" });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = (id) => {
    if (!confirm("Delete this dish?")) return;
    setDishes(prev => prev.filter(d => d.id !== id));
    toast.success("Dish removed");
  };

  return (
    <div className="admin-menu container">
      <h2>🍽 Menu Management</h2>

      <form className="menu-form card" onSubmit={handleSubmit}>
        <div className="form-row">
          <input name="name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} placeholder="Dish name" />
          <input name="price" type="number" step="0.01" value={form.price} onChange={e => setForm({...form, price: e.target.value})} placeholder="Price" />
          <input name="category" value={form.category} onChange={e => setForm({...form, category: e.target.value})} placeholder="Category" />
        </div>

        <div className="form-row">
          <input type="file" accept="image/*" onChange={e => handleImage(e.target.files[0])} />
          {form.image && <img src={form.image} alt="preview" className="preview" />}
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn-primary">{editing ? "Save Changes" : "Add Dish"}</button>
          <button type="button" className="btn btn-outline" onClick={() => { resetForm(); setEditing(null); }}>Cancel</button>
        </div>
      </form>

      <div className="dishes-grid">
        {dishes.map(d => (
          <div className="dish-card" key={d.id}>
            <div className="img-wrap">{d.image ? <img src={d.image} alt={d.name} /> : <div className="placeholder">No image</div>}</div>
            <div className="meta">
              <h4>{d.name}</h4>
              <div className="category">{d.category}</div>
              <div className="price">₦{(Number(d.price)||0).toFixed(2)}</div>
            </div>
            <div className="actions">
              <button className="btn" onClick={() => handleEdit(d)}>Edit</button>
              <button className="btn btn-danger" onClick={() => handleDelete(d.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MenuManagementAdmin;
