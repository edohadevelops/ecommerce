const router = require("express").Router();
const getCategories = require("../../controllers/getCategories");

router.get("/",getCategories);

module.exports = router