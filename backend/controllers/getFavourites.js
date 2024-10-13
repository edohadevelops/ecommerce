const Favourites = require("../models/favourite");

module.exports = async(req,res) => {
    try{
        const userId = req.params.userId;
        const favouriteCart = await Favourites.findOne({user: userId})
        if(!favouriteCart)
            return res.status(200).send({message: "Favourites currently empty",items: []});
        return res.status(200).send({message: "Favourites Loaded successfully",items: favouriteCart.items})
    }catch(error){
        console.log(error);
        return res.status(500).send({message: "Internal Server Error"})
    }
}