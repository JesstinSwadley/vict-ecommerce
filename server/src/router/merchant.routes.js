const express = require("express");
const router = express.Router();
const { registerMerchant, loginMerchant, logoutMerchant } = require("../controllers/merchant.controller");

router.post("/register", registerMerchant);
router.post("/login", loginMerchant);
router.post("/logout", logoutMerchant);

module.exports = router;
