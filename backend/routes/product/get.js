const router = require("express").Router();
const getProducts = require("../../controllers/getProducts")

router.get("/",getProducts);

module.exports = router;