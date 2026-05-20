const auth=require("../middleware/auth");//JWT auth
const admin=require("../middleware/admin")//check if user is admin

const express = require("express");
const router = express.Router();
const pool = require("../db-connection/Connection");

router.get("/",auth, async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM products");
    console.log(rows);
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to fetch products");
  }
});

router.get("/:id",auth, async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM products WHERE id =?", [
      req.params.id,
    ]);
    if (rows.length === 0) {
      return res.status(404).send("product not found");
    }
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send("failed to fetch product");
  }
});
//CREATE a new product (Admin only)
router.post("/", auth, admin ,async (req, res) => {
  try {
    const { name, description, price, quantity } = req.body;

    if (!name || !description || price == null || quantity == null) {
      return res.status(400).send("All fields are required");
    }

    
    const [result] = await pool.query(
      "INSERT INTO products(name ,description ,price ,quantity)VALUES (?,?,?,?)",
      [name, description|| "", Number(price), Number(quantity)]
    );
    res.json({ id: result.insertId, name, description, price, quantity });
  } catch (err) {
    console.error(err);
    res.status(500).send("failed to add product");
  }
});
router.put("/:id",auth, admin,async (req, res)=>{
 try{
    const {name, description, price, quantity}=req.body;
        

     if ( !name|| !description||price == null || quantity == null) {
      return res.status(400).send("price and quantity required");
     }
       
    const[result]= await pool.query(
        "UPDATE products SET name=?,description=?,price=?, quantity=? WHERE id=? ",
        [name,description,Number(price),Number(quantity),req.params.id]  
     );
     if(!result|| result.affectedRows===0){
      return res.status(404).send("product not found");  
     }
     res.send("product updated successfully");
     
 }catch(err){
    console.error( "update products error:",err);
    res.status(500).send("failed to update product")
    
 }
});
router.delete("/:id" ,auth,admin, async (req,res)=>{
    try{
        const[result]= await pool.query(
            "DELETE fROM products WHERE id =?",[req.params.id]
        );
        if(result.affectedRows===0){
            return res.status(404).send("product not found")
        }
        res.send("product deleted successfullly");
    }catch(err){
        console.error(err);
        res.status(500).send("failed to delete products")
    }
})



module.exports = router;
