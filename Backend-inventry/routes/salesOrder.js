const express =require('express');
const router =express.Router();
const pool =require('../db-connection/Connection');
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

//GET ALL SALES ORDERS (ONLY ADMIN)
router.get('/', auth, admin,async(req ,res)=>{
    try{
        const [rows]=await pool.query(
           `SELECT 
            so.id ,
            p.name As product_name,
            so.quantity, 
            so.total_price,
            so.created_at
            FROM sales_orders so 
            JOIN products p ON so.product_id =p.id
            JOIN users u ON so.user_id = u.id
            ORDER BY so.created_at DESC`
        )
        res.json(rows);

    }catch(err){
     console.error(err);
     res.status(500).json({message:"failed to fetch sales orders"}) ;

    }
});
//  USER-GET ONLY MY ORDERS 
    router.get('/my_orders',auth, async(req,res)=>{
     const user_id =req.user.id;
     try{
      const [rows] =await pool.query(
        `SELECT so.id, p.name AS product_name, so.quantity, so.total_price, so.created_at
             FROM sales_orders so
             JOIN products p ON so.product_id = p.id
             WHERE so.user_id = ?`,
             [user_id]
      )
       res.json(rows);
    }catch(err){
     res.status(500).json({message:"failed to fetch your orders"})
      
    }
  
})

//CREATE SALES ORDERS (ANY LOGGED IN USER)
    router.post('/', auth, async(req ,res)=>{
          const Connection =await pool.getConnection();
        try{
             const{product_id , quantity}=req.body;
             const user_id = req.user.id
                 
             //BASIC INPUT VALIDATION
             if(!product_id || !quantity || quantity <=0){
                return res.status(400).json({message:"invalid input"})
             }
             await Connection.beginTransaction();

                  //LOCK  PRODUCT ROW TO PREVENT OVERSELLING
                  const[rows]=await Connection.query(
                    "SELECT quantity ,price FROM products WHERE id =? FOR UPDATE",
                    [product_id]
                  );
                  if(rows.length===0){
                    await Connection.rollback();
                    return res.status(404).json({message:"product not found"})
                  }
                   const product =rows[0];

                   if(product.quantity < quantity){
                    await Connection.rollback();
                    return res.status(400).json({message:"insufficient product quantity"})
                   }
                   const total_price = product.price*quantity;
                    
                   //INSERT SALES ORDER
                   await Connection.query(
                    "INSERT INTO sales_orders (product_id , quantity,total_price, user_id) VALUES(?,?,?,?)",
                    [product_id , quantity , total_price, user_id]
                   );

                   //UPDATE PRODUCT QUANTITY
                   await Connection.query(
                    "UPDATE products SET quantity = quantity- ? WHERE id =?",
                    [quantity ,product_id]
                   );

                   if(product.quantity - quantity <5){
                    console.log(`Low stock for ${product.name}`);
                    
                   }
                   await Connection.commit();
                   res.status(201).json({message:"sales order created successfully"});
     }catch(err){
                await Connection.rollback();
                console.error(err);
                res.status(500).json({message:"failed to create sales order"})

        }finally{
            Connection.release();
        }
    })
    module.exports =router