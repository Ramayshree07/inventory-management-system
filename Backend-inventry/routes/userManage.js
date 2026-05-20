const express =require("express")
const pool =require("../db-connection/Connection");
const bcrypt=require("bcrypt")
const  router= express.Router();
const auth=require("../middleware/auth");
const admin=require("../middleware/admin")

//get All Users (Admin)
router.get("/", admin, async(req,res)=>{
  try{
    const[users] =await pool.query(
        "SELECT id, name, email,role FROM users"
    );
    res.json(users);
  }catch(err){
    console.error(err);
    res.status(500).send("failed to fetch users")
    
  } 
})
// create user(Admin)
router.post("/",admin, async(req,res)=>{
 try{
    const {name, email, password, role}=req.body;
    if(!name || !email || !password ){
        return res.status(400).send("missing required fields");
    }
    const hashedPassword =await bcrypt.hash(password, 10)

    const [result]= await pool.query(
        "INSERT INTO users (name,email,password,role) Values(?,?,?,?)",[name,email,hashedPassword,role ||"staff"]
    )
    res.json({
        id:result.insertId,
        name,
        email,
        role:role|| "staff",
    })
 }catch(err){
    console.error(err);
    res.status(500).send("user creation failed");
    
 }
})

router.delete("/:id", auth, admin,async(req,res)=>{
  try{
    const{id} =req.params;

     const [result]=await pool.query(
      "DELETE FROM users WHERE id =?",
      [id]
     );

     if(result.affectedRows === 0){
      return res.status(404).send("user not found");
     }
     res.send("user deleted successfully");
  }catch(err){
     console.error(err);
     res.status(500).send("deleted failed");
     
  }
})
module.exports=router;