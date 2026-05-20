import { useEffect, useState } from "react";
import api from "../api/axios";
const Users = () => {
  console.log("rendering");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "staff",
  });
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [search ,setSearch] = useState("");
 

  const token = localStorage.getItem("token");
  const userRole = (localStorage.getItem("role") || "").toLowerCase();
    const isAdmin = userRole === "admin";

  //fetch users
  useEffect(() => {
    if(!token)return;

    setLoading(true);
    api
      .get("/userManage", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setUsers(res.data))
      .catch(() => setError("failed to load users"))
      .finally(() => setLoading(false));
  }, [token]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  //create users
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.name || !formData.email || !formData.password) {
      setError("Name, email and password ar required");
      return;
    }

    try {
      const res = await api.post("/userManage", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers((prev) => [...prev, res.data]);

      setFormData({
        name: "",
        email: "",
        password: "",
        role: "staff",
      });
    } catch (err) {
      setError(err.response?.data || "users creation failed");
    }
  };

  const deleteUser = async (id) => {
    if (!window.confirm("are you sure , you want to delete this user?"))
      return;
    try {
      await api.delete(`/userManage/${id}`,{
       headers:{Authorization: `Bearer ${token}`},
      });

      setUsers(prev=>prev.filter(u => u.id !==id));
    } catch (err) {
      console.error("Delete failed:", err.response?.data || err);
    }
  };
  const filteredUsers =
   users.filter((user)=>
    user.name.toLowerCase().includes(search.toLowerCase())||

   user.email.toLowerCase().includes(search.toLowerCase())||

   user.role.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <div className="p-6 min-h-screen wb-1 bg-gray-200">
      <h1 className="text-2xl font-semibold mb-6">Users Management</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-lg font-semibold mb-4">ADD USER</h2>

          {error && <p className="text-red-600 mb-2">{error}</p>}
          <form onSubmit={handleSubmit}>
            <input
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
            />
            <input
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
            />
            <input
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />

            <select name="role" value={formData.role} onChange={handleChange}>
              <option value="admin">Admin</option>
              <option value="staff">Staff</option>
            </select>

            <button className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">
              Create User
            </button>
          </form>
        </div>
        <div className="md:col-span-2 bg-white p-6 rounded shadow">
          <div className="flex justify-end mb-4">
            <input
            type= "text"
            value={search}
            onChange={(e)=>setSearch(e.target.value)}
              placeholder="search"
              className="border px-3 py-2 rounded w-64"
            />
          </div>
          <div className="  ">
            {loading ? (
              <p>Loading users....</p>
            ) : (
              <div className="w-full min-w-0">
                <table className="w-full table-auto border-collapse text-sm">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border p-2 text-left">S.NO</th>
                      <th className="border p-2 text-left ">Name</th>
                      <th className="border p-2 text-left ">Email</th>
                      <th className="border p-2 text-left">Role</th>
                      <th className="border p-2 text-left">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((u, i) => {
                      return (
                        <tr key={u.id}>
                          <td className="border p-2">{i + 1}</td>
                          <td className="border p-2">{u.name}</td>
                          <td className="border p-2">{u.email}</td>
                          <td className="border p-2">{u.role}</td>

                          <td className="border px-4 py-2 text-center">
                            <button
                              onClick={() => deleteUser(u.id)}
                              className="add"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Users;
