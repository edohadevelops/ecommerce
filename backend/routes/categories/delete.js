const router = require("express").Router();
const deleteCategory = require("../../controllers/deleteCategory")

router.delete("/:categoryID",deleteCategory);

module.exports = router;