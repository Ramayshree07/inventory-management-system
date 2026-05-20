import { Navigate } from "react-router-dom";

export default function ProtectedRouter({ children ,requireRole }) {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/" replace/>;
  }

  if(requireRole){
    
      const payLoad =JSON.parse(atob(token.split(".")[1]));
      if(!requireRole.includes(payLoad.role)){
        return <Navigate to= "/products" replace/>;
      }
  
    }
  
  return children;

  // return token ? children : <Navigate to="/" />; //same step
}
