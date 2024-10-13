const router = require("express").Router();
const deleteItem = require("../../controllers/deleteCart")

router.put("/:userId",deleteItem);

module.exports = router;