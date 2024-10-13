const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const favouritesSchema = Schema({
    items: {
        type: Array,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "user",
        required: true
    }
});

const Favourites = mongoose.model("favourite",favouritesSchema);

module.exports = Favourites;