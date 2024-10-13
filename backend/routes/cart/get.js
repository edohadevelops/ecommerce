const router = require("express").Router();
const getCart = require("../../controllers/getCart");

router.get("/:userId",getCart);

module.exports = router;