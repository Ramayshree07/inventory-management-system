const express = require('express');
const pool = require('../db-connection/Connection');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();

router.post("/register", async (req , res)=>{
    try{
        const {name, email , password , role}= req.body ;

        const hashedpassword = await bcrypt.hash(password , 10);

        await pool.query(
            "INSERT INTO users (name , email , password , role ) VALUES(?,?,?,?)",
            [name, email, hashedpassword , role ||"staff"]
        )
    
       res.send("user Registered successfully");
    } catch(err){
        console.error(err);
        res.status(500).send("Registration failed")
        
    }

})
router.post("/login",async(req , res)=>{
    try{
        let{email ,password}= req.body;
        
        //console.log("Login attempt:", { email, password });

        if(!email|| !password){
           return res.status(400).send("email and password are required");
    }
        email = email.trim().toLowerCase(); 
        const[rows]=await pool.query(
            "SELECT * FROM users WHERE email =?",[email]
        );

        console.log("DB rows:", rows);

        if(!rows ||rows.length ===0){
            return res.status(401).send("invalid credential");
        }
        const user = rows[0];


         console.log("User from DB:", user);
        
         
    if (!user.password) {
      return res.status(500).send("User password not set");
    }



        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(401).send("invalid credentials");
        }
        const token = jwt.sign(
            {id: user.id, role: user.role},
            process.env.JWT_SECRET,
            {expiresIn:'1h'}
        )
        res.json({token});
    }catch(err){
        console.error(err);
        res.status(500).send("failed to login");
    }
} )
module.exports = router;