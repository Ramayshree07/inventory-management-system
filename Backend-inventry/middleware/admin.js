 /*module.exports =(req, res,next)=>{
    if(req.user.role !=="admin"){
        return res.status(403).send("Admin access only")
    }
    next();
 }*/

    module.exports = (req, res, next) => {
      if (!req.user) {
        return res.status(401).send("Unauthorized. No user information found.");
      }
       
     const role = (req.user.role || "").trim().toLowerCase();


      if (role !== "admin") {
        return res.status(403).send("Admin access only.");
      }

      next();
    };