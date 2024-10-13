const router = require("express").Router();
const makePayment = require("../../controllers/payment/makePayments")

router.post("/:userId",makePayment);

module.exports = router;