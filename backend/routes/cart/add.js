const router = require("express").Router();
const addToCart = require("../../controllers/addToCart");

router.put("/:userId",addToCart);

module.exports = router;