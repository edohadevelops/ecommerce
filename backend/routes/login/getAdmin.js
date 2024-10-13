const router = require("express").Router();
const jwt = require("jsonwebtoken");
const {SuperAdmin} = require("../../models/admin");

router.get("/", async(req,res)=>{
    const authHeader = req.headers['authorization'];

    if(!authHeader || !authHeader.startsWith("Bearer "))
        return res.status(401).send({message: "Authorization headermissing or is invalid"});

    const token = authHeader.split(" ")[1]

    jwt.verify(token,process.env.JWT_SECRET, async (err,decoded)=>{
        if(err)
            return res.status(401).send({message: "Invalid Token"})
        try{
            const adminId = decoded._id;
            const admin = await SuperAdmin.findById(adminId)
            if(!admin){
                console.log("Admin not found: ",err)
                return res.status(404).send({error: "Admin not found"})
            }
            res.status(200).send({data: admin})
        }catch(err){
            console.log("Error fetching user data: ",err)
            return res.status(500).send({error: "Internal Server error"})
        }
    })
})

module.exports = router;
