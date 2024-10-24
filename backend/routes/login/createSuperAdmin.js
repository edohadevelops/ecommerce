const router = require("express").Router();
const {SuperAdmin,validate} = require("../../models/admin");
const bcrypt = require("bcryptjs");

router.post("/", async(req,res)=>{
    try{
        const {error} = validate(req.body);
        if(error)
            return res.status(400).send({message: error.details[0].message})
        const existingAdmin = SuperAdmin.findOne({email: req.body.email});
        if(existingAdmin.email)
            return res.status(409).send("Admin with this email address already exists")
        const salt = await bcrypt.genSalt(Number(process.env.SALT));
        const hashedPassword = await bcrypt.hash(req.body.password,salt);
        await new SuperAdmin({...req.body, password: hashedPassword}).save();
        return res.status(200).send({message: "Super Admin created successfully"})
    }catch(error){
        console.log(error)
        return res.status(500).send({message: "Internal Server Error"})
    }
});

module.exports = router
