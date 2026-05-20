const express = require("express");
const router =express.Router();
const pool = require("../db-connection/Connection");

router.get("/stats",async(req,res)=>{
    try{
        const [products]= await pool.query(
             "SELECT * FROM products"
        )

    const [orders] = await pool.query(
      "SELECT * FROM sales_orders"
    );

    const lowStock = products.filter(p=>p.quantity<10).length;
    
   res.json({
      totalProducts:products.length,
      totalOrders: orders.length,
      lowStock,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Dashboard stats failed");

    }
})
module.exports = router;