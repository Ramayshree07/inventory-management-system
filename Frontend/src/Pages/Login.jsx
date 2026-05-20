import { useState }  from "react";
import api from "../api/axios"
import { useNavigate } from "react-router-dom";

function Login(){
    const [email ,setEmail] = useState("");
    const [password ,setPassword] = useState("");
    const[error ,setError] = useState("");
    const navigate = useNavigate()
   
    const handleLogin = async(e)=>{
        e.preventDefault();
        setError("")

        try{
            const res =await api.post('/users/login',{email:email.trim().toLowerCase(), password},{
              headers:{
                "Content-Type":"application/json",
              }
            });

            localStorage.setItem("token", res.data.token);
            navigate('/products');
            console.log("login successfull");

        }catch(err){
          console.error(err.response?.data || err);
          setError(err.response?.data ||"Invalid email or password");
        }
    }


    return (
      <div className="login-container">
        <h2 className="text-3xl text-center text-white">Inventory Management System</h2>

        <div className="border shadow-lg p-6 w-80 bg-white">
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              {error && <p className="error">{error}</p>}
              <h2 className="text-2xl font-bold text-center mb-4">Login</h2>
              <label className="block text-gray-700">Email</label>
              <input
              required
                type="text"
                placeholder="Email"
                className="w-full px-3 py-2 border"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <label className="block text-gray-700">Password</label>
              <input
              required
                type="password"
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button type="submit" disabled={!email || !password}>
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    );
    
}
export default Login;