const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const passwordComplexity = require('joi-password-complexity')

const userSchema = new mongoose.Schema({
    firstName: {type: String,required: true},
    userName: {type: String,required: true},
    email: {type: String,required: true},
    password: {type: String,required: true},
})

userSchema.methods.generateAuthToken = function (){
    const token = jwt.sign({_id: this._id},process.env.JWT_SECRET,{expiresIn: "7d"});
    return token;
}
const validate = (data) =>{
    const schema = Joi.object({
        firstName: Joi.string().required().label("First Name"),
        userName: Joi.string().required().label("User Name"),
        email: Joi.string().email().required().label("First Name"),
        password: passwordComplexity().required().label("Password")
    })
    return schema.validate(data);
}

const User = mongoose.model("user", userSchema)

module.exports = {User,validate};