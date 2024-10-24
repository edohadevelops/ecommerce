const router = require("express").Router();
const { SuperAdmin } = require("../../models/admin")
const { User } = require("../../models/user")
const Joi = require("joi");
const bcrypt = require("bcryptjs");

router.post("/",async(req,res)=>{
    try{
        const {error} = validate(req.body);
        if(error)
            return res.status(400).send({message: error.details[0].message})
        const admin = await SuperAdmin.findOne({email: req.body.email});
        const user = await User.findOne({email: req.body.email});
        if(!admin && !user)
            return res.status(401).send({message: "Invalid Email or password"});
        const validPassword = admin ? await bcrypt.compare(req.body.password,admin.password) : user ? await bcrypt.compare(req.body.password,user.password) : null;
        if(!validPassword)
            return res.status(401).send({message: "Invalid Email or Password"});
        const token = admin ? admin.generateAuthToken() : user ? user.generateAuthToken() : token;
        admin ? res.status(200).send({data: token,message: "Logged in successfully", role: "admin"}) : user ? res.status(200).send({data: token,message: "Logged in successfully", role: "user"}): res.status(401).send("INvalid details")
    }catch(error){
        console.log(error)
        return res.status(500).send("Internal Server Error")
    }

})

const validate = (data) => {
    const schema = Joi.object({
        email: Joi.string().email().required().label("Email Address"),
        password: Joi.string().required().label("Password")
    })
    return schema.validate(data)
}

module.exports = router;