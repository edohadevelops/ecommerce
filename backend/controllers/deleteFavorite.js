const Favorites = require("../models/favourite");

module.exports = async(req,res) => {
    try{
        const userId = req.params.userId;
        const userFavourites = await Favorites.findOne({user: userId});
        const allFavourites = await Favorites.find();
        console.log("user id is this: ",userId)
        console.log("All favourites is: ",allFavourites)
        console.log(userFavourites)
        if(!userFavourites){
            return res.status(400).send({message: "This item does not exist in the database"})
        }
        console.log(userFavourites.items)
        const updatedItems = userFavourites.items.filter(item => item.name !== req.body.name);
        const updateFavourites = await Favorites.updateOne({user: userId},{$set: {items: updatedItems}});
        if(updateFavourites){
            return res.status(200).send({message: "The item was removed successfully"})
        }else{
            return res.status(401).send({message: "error removing the item"})
        }
    }catch(error){
        console.log(error)
    }
}