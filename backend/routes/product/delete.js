const router = require("express").Router();
const deleteProduct = require("../../controllers/deleteProduct")

router.delete("/:productID",deleteProduct);

module.exports = router;