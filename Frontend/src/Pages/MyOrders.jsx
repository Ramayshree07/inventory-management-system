import { useEffect, useState } from "react";
import api from "../api/axios";

function MyOrder() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await api.get("/sales_orders/my_orders", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setOrders(res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load orders");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <p>Loading orders...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="flex flex-col ">
      <div className="mt-4">
        <h2 className="mx-4 font-semibold"> My orders</h2>

        <div className="overflow-y-auto">
          {orders.length === 0 ? (
            <p>No orders found</p>
          ) : (
            <table border="w-full border-collapse">
              <thead className="sticky top-1 z-40 bg-gray-100">
                <tr>
                  <th className="border  px-4 py-2 text-left">Product</th>
                  <th className="border  px-4 py-2 text-left">Quantity</th>
                  <th className="border  px-4 py-2 text-left">Total Price</th>
                  <th className="border  px-4 py-2 text-left">Date</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id}>
                    <td className="border px-4 py-2">{order.product_name}</td>
                    <td className="border px-4 py-2">{order.quantity}</td>
                    <td className="border px-4 py-2">₹{order.total_price}</td>
                    <td className="border px-4 py-2">
                      {new Date(order.created_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

export default MyOrder;
