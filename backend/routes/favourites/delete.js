const router = require("express").Router();
const deleteFavourite = require("../../controllers/deleteFavorite")

router.put("/:userId",deleteFavourite);

module.exports = router;