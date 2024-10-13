const router = require("express").Router();
const createProduct = require("../../controllers/createProduct")

router.post("/", createProduct)

module.exports = router;