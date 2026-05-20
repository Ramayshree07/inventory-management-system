import './App.css'
import {BrowserRouter , Route, Routes, } from 'react-router-dom';
import Login from './Pages/Login';
import Products from './Pages/Products';
import MyOrders from './Pages/MyOrders';
import ProtectedRouter from './Components/ProtectedRouter';
import Users from "./Pages/Users";
import EditProduct from './Pages/EditProduct';
import Dashboard from './Pages/dashboard';
import Layout from './Components/Layout';

function App() {
 
 
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route
          element={
            <ProtectedRouter>
              <Layout />
            </ProtectedRouter>
          }
        >
          <Route path="/products" element={<Products />} />

          <Route path="/orders" element={<MyOrders />} />
          <Route path="/edit/:id" element={<EditProduct />} />
          
          <Route
            path="/dashboard"
            element={
              <ProtectedRouter requireRole={["admin"]}>
                <Dashboard />
              </ProtectedRouter>
            }
          ></Route>

          <Route
            path="/users"
            element={
              <ProtectedRouter requireRole={["admin"]}>
                <Users />
              </ProtectedRouter>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App
