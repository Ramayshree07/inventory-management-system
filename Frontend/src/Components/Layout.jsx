import { Outlet,useNavigate} from "react-router-dom";
import { getUserRole } from "../utils/auths";
import { useState } from "react";
import{FaBox,FaHome, FaSignOutAlt,FaShoppingCart, FaUser}from "react-icons/fa"


  function Layout() {
    const [open,setOpen]=useState(true);
   const navigate =useNavigate();
   const role= getUserRole();

   const logout = () => {
     localStorage.removeItem("token");
     navigate("/");
   };
  const goto =(path)=>{
    navigate(path);
    setOpen(false);
  }
  const menuBase= " flex items-center gap-3 px-4 py-3 rounded-md  text-white cursor-pointer hover:bg-slate-600";

  const active =(path)=>{
    location.pathname === path ? "bg-gray-700" : "hover:bg-gray-600";
  }
    
   return (
     <div className="flex min-h-screen">
       <aside
         className={`fixed top-0 left-0 h-full w-[260px] bg-gray-500 border-r z-40 transform transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}`}
       >
         <nav className="mt-14  p-10 grid  items-center space-y-4">
           <div className=" font-bold uppercase ml-4 text-white ">
             Inventry <span className="text-blue-300">MS</span>
           </div>
           <div
             className={`${menuBase} ${active("/dashboard")}`}
             onClick={() => goto("/dashboard")}
           >
             <FaHome />
             <span>Dashboard</span>
           </div>

           {role === "admin" && (
             <div
               className={`${menuBase} ${active("/products")}`}
               onClick={() => goto("/products")}
             >
               <FaBox />
               <span>Products</span>
             </div>
           )}

           <div
             className={`${menuBase} ${active("/users")}`}
             onClick={() => goto("/users")}
           >
             <FaUser />
             <span>Users</span>
           </div>

           <div
             className={`${menuBase} ${active("/orders")}`}
             onClick={() => goto("/orders")}
           >
             <FaShoppingCart />
             <span>orders</span>
           </div>

           <div
             className=" flex items-center gap-3 px-4 text-white cursor-pointer py-3 rounded-md hover:bg-red-400"
             onClick={logout}
           >
             <FaSignOutAlt />
             <span>Logout</span>
           </div>
         </nav>
       </aside>

       <p
         className=" text-black  absolute top-4 left-4 cursor-pointer text-xl z-50"
         onClick={() => setOpen(!open)}
       >
         ☰
       </p>
       <main
         className={`flex-1 transition-all duration-300 p-8 ${
           open ? "ml-[245px]" : "ml-0"
         }`}
       >
         <Outlet />
       </main>
     </div>
   );
 }
export default Layout;








