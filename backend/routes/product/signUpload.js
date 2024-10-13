const router = require("express").Router();
const generateSignature = require("../../controllers/generateSignature")


router.post("/",generateSignature)

module.exports = router