const Favourites = require("../models/favourite");

module.exports = async(req,res) => {
    try{
        const userId = req.params.userId;
        const favouriteExists = await Favourites.findOne({user: userId});
        if(!favouriteExists){
            const newFavTab = await new Favourites({items: [req.body.item],user: userId}).save();
            return res.status(200).send({message: "Favourite Tab created successfully"})
        }
        const updateFavTab = await Favourites.updateOne({user: userId},{$push: {items: req.body.item}});
        return res.status(200).send({message: "Favourites updated successfully"})
    }catch(error){
        console.log(error)
        return res.status(500).send({message: "Internal Server Error"})
    }
}