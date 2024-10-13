const router = require("express").Router();
const getFavourites = require("../../controllers/getFavourites");

router.get("/:userId",getFavourites);

module.exports = router;