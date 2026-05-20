import {  useState } from "react";
import { useParams, useNavigate} from "react-router-dom";
import api from "../api/axios"


function EditProduct(){
    const {id} =useParams();
    const navigate =useNavigate();

  const [form ,setForm]=useState({
    name: "",
    description: "",
    price:"",
    quantity:"",
  })
  const handleChange =(e)=>{
    setForm({...form , [e.target.name]: e.target.value});
  }
  const handleSubmit = async (e)=>{
    e.preventDefault();
    await api.put(`/products/${id}`, form);
    alert("product updated");
    navigate("/products")
  }


return (
  <form>
    <input name="name" value={form.name} onChange={handleChange} />
    <input
      name="description"
      value={form.description}
      onChange={handleChange}
    />
    <input name="price" value={form.price} onChange={handleChange} />
    <input name="quantity" value={form.quantity} onChange={handleChange} />

    <button type="submit">Update</button>
  </form>
);

}
export default EditProduct;