const jwt=require("jsonwebtoken");
const config=require("config");

function auth(req,res,next)
{
    const { authorization } = req.headers;
    const token=req.headers["x-auth-token"];
    
    if(!token)
    {
      return  res.set(401).send("Access denied beacuse token is missing");
    }
    try {
        const decoded=jwt.verify(token,config.get("jwtPrivateKey"));
        req.username=decoded.username;
        
        next();
    } catch (error) {
        res.set(400).send("Invalid Token");
    }
    
}
module.exports = auth; 