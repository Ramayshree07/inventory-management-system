const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // 1️⃣ No header
  if (!authHeader) {
    return res.status(401).send("Access denied. No token provided.");
  }

  // 2️⃣ Wrong format
  if (!authHeader.startsWith("Bearer ")) {
    return res.status(401).send("Invalid authorization format.");
  }

  // 3️⃣ Extract token safely
  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).send("Token missing.");
  }

  // 4️⃣ Ensure secret exists
  if (!process.env.JWT_SECRET) {
    console.error("JWT_SECRET is not configured.");
    return res.status(500).send("Server configuration error.");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res.status(401).send("Token expired.");
    }
    return res.status(401).send("Invalid token.");
  }
};



/*const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  console.log("AUTH HEADER:", req.headers.authorization);
 const authHeader = req.headers.authorization;

  //NO TOKEN -> REJECT
  if (!authHeader) {
    return res.status(401).send("Access denied. No token provided.");
  }
  //EXTRACT TOKEN
  const token = authHeader.split(" ")[1];

  // 🔹 TEMPORARY DEBUG
  console.log("JWT SECRET:", process.env.JWT_SECRET);

  try {
    //VERIFY TOKEN
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;
    next(); //ALLOW REQUEST
  } catch (err) {

    res.status(401).send("INVALID TOKEN");
  }
};*/
