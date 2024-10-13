const router = require("express").Router();
const jwt = require("jsonwebtoken");
const {User} = require("../../models/user");

router.get("/", async(req,res)=>{
    const authHeader = req.headers['authorization'];

    if(!authHeader || !authHeader.startsWith("Bearer "))
        return res.status(401).send({message: "Authorization header missing or is invalid"});

    const token = authHeader.split(" ")[1]

    jwt.verify(token,process.env.JWT_SECRET, async (err,decoded)=>{
        if(err)
            return res.status(401).send({message: "Invalid Token"})
        try{
            const userId = decoded._id;
            const user = await User.findById(userId)
            if(!user){
                console.log("User not found: ",err)
                return res.status(404).send({error: "User not found"})
            }
            res.status(200).send({user})
        }catch(err){
            console.log("Error fetching user data: ",err)
            return res.status(500).send({error: "Internal Server error"})
        }
    })
})

module.exports = router;