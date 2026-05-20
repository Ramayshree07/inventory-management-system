
import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

function AddProduct() {
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    quantity: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.name || !form.price || !form.quantity) {
      return setError("Name, price, and quantity are required");
    }

    try {
      await api.post(
        "/products",
        {
          name: form.name,
          description: form.description,
          price: Number(form.price),
          quantity: Number(form.quantity),
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      navigate("/products"); // go back to product list
    } catch (err) {
      console.error(err.response || err);
      setError(err.response?.data || "Failed to create product");
    }
  };

  return (
    <div>
      <h2>Add Product</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
        />
        <input
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
        />
        <input
          name="price"
          type="number"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
        />
        <input
          name="quantity"
          type="number"
          placeholder="Quantity"
          value={form.quantity}
          onChange={handleChange}
        />
        <button type="submit">Create Product</button>
      </form>
    </div>
  );
}

export default AddProduct;
