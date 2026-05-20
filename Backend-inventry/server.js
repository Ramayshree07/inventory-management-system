require("dotenv").config();
const express = require("express");
const cors = require ('cors');
const app = express();

const pool = require("./db-connection/Connection");
const productRouter = require("./routes/products");
const userRouter = require("./routes/users");
const salesOrderRouter = require("./routes/salesOrder");
const dashboardRouter =require("./routes/dashboard")
const userManageRoute = require("./routes/userManage")

app.use(cors({
    origin:"http://localhost:5173",
    credentials: true,
    methods:["GET","POST","PUT","DELETE", "OPTIONS"],
    allowedHeaders:["content-Type","Authorization"]
}));

app.use(express.json());
app.use("/api/products", productRouter);
app.use("/api/users", userRouter);
app.use("/api/sales_orders", salesOrderRouter);
app.use("/api/dashboard", dashboardRouter);
app.use("/api/userManage", userManageRoute);
app.get("/", async (req, res) => {
  try {
    await pool.query("select 1");
    res.send("Backend + mysql connected");
  } catch (err) {
    console.error(err);
    res.status(500).send("database connnection failed");
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
