const router = require("express").Router();
const updateProduct = require("../../controllers/updateProduct")

router.post("/", updateProduct)

module.exports = router;