const router = require("express").Router();
const updateCart = require("../../controllers/updateCart")

router.put("/:userId",updateCart);

module.exports = router