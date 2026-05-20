import { useEffect, useState } from "react";
import api from "../api/axios";
function Dashboard() {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    lowStock: 0,
  });
  useEffect(() => {
    const token = localStorage.getItem("token");
    api
      .get("/dashboard/stats", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setStats(res.data))
      .catch((err) => console.error("Dashboard stats failed", err));
  }, []);
  return (
    <div className="p-4">
      {" "}
      <h1 className="font-bold text-xl p-4">Dashboard</h1>{" "}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {" "}
        <div style={cardStyle} className="bg-red-600">
          {" "}
          <h3 className=" font-bold">Total Products</h3>{" "}
          <p>{stats.totalProducts}</p>{" "}
        </div>{" "}
        <div style={cardStyle} className="bg-green-600">
          {" "}
          <h3 className="heading">Total Orders</h3>{" "}
          <p>{stats.totalOrders}</p>{" "}
        </div>{" "}
        <div style={cardStyle} className="bg-amber-400">
          {" "}
          <h3 className="heading">Low Stock Items</h3>{" "}
          <p>{stats.lowStock}</p>{" "}
        </div>{" "}
      </div>{" "}
    </div>
  );
}
const cardStyle = {
  padding: "20px",
  border: "1px solid #ccc",
  borderRadius: "8px",
  width: "220px",
  textAlign: "center",
};
export default Dashboard;
