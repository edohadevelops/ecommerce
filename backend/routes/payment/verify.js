const router = require("express").Router();
const verifyPayment = require("../../controllers/payment/verify")

router.post("/:reference",verifyPayment);

module.exports = router