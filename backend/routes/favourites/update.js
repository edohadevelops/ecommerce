const router = require("express").Router();
const updateFavourites = require("../../controllers/updateFavourites");

router.put("/:userId",updateFavourites);

module.exports = router;