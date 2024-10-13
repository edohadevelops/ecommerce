const router = require("express").Router();
const newCategory = require("../../controllers/createCategory")
router.post("/",newCategory)

module.exports = router;