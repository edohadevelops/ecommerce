const router = require("express").Router();
const updateCategories = require("../../controllers/updateCategory")

router.put("/:categoryID",updateCategories);

module.exports = router;