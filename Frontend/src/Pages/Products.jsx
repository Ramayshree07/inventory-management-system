import { useState, useEffect } from 'react';
import api from '../api/axios';
import { getUserRole } from '../utils/auths';
import {useNavigate} from 'react-router-dom';

function Products(){
 const [products ,setProducts] =useState([]);
 const role =getUserRole();
 const navigate = useNavigate();

useEffect(()=>{
  api.get("/products")
  .then(res => setProducts(res.data))
  .catch(err => console.error(err));
  

},[]);
  /*if(!role){
    navigate("/");
      return
    
  }
    api.get('/products')
    .then(res =>{
      console.log(res.data);
      
      setProducts(res.data)})
  
    .catch(()=>alert("failed to load products"))
},[role, navigate])*/
 

     
    const createOrder = async(productId)=>{
        const quantity = prompt("Enter quantity");
        if(!quantity) return;

        try{
          await api.post("/sales_orders",{
            product_Id:productId,
            quantity:Number(quantity),

          });
          alert("order placed")
        }catch{
          alert("order Failed");
        }
    }

    const deleteProduct =async(productId)=>{
      if(!window.confirm("are you sure , you want to delete this product?"))return
      try{
        await api.delete(`/products/${productId}`);
        setProducts(products.filter((p)=>p.id !==productId));
      }catch(err){
        console.error("Delete failed:",err.response?.data ||err);
        
      }
    }

return (
  <div className="flex flex-col">
    <div className="mt-4">
      <h2 className='mx-4 font-semibold'>Products ({role})</h2>
      {/*<button onClick={() => navigate("/orders")}>Orders</button>*/}

      {/*========DESKTOP TABLE=======*/}
      <div className="  overflow-y-auto">
        <table className="w-full border-collapse border-gray-300 ">
          <thead className="sticky top-1 z-40 bg-gray-100">
            <tr>
              <th className="border px-4 py-2 text-left">Product</th>
              <th className="border px-4 py-2 text-left">Quantity</th>
              <th className="border px-4 py-2 text-left">Price</th>
              <th className=" text-center px-4 border py-2 ">Edit</th>
              <th className=" text-center px-4 border py-2 ">Delete</th>
            </tr>
          </thead>

          <tbody>
            {products.map((p) => (
              <tr key={p.id} className="hover:bg-gray-50">
                <td className="border px-4 py-2">{p.name}</td>
                <td className="border px-4 py-2">{p.quantity}</td>
                <td className="border px-4 py-2 ">₹{p.price}</td>

                {/*staff -> create order */}

                <td className="border px-4 py-2 text-center">
                  {/*admin -> manage */}
                  {role === "admin" && (
                    <button onClick={() => navigate(`/edit/${p.id}`)}>
                      Edit
                    </button>
                  )}
                </td>
                <td className="border px-4 py-2 text-center">
                  {role === "admin" && (
                    <button onClick={() => deleteProduct(p.id)}>Delete</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);
}
export default Products;