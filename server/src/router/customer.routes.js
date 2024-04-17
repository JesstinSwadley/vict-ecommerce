const express = require("express");
const router = express.Router();
const { registerCustomer, loginCustomer, logoutCustomer } = require("../controllers/customer.controller");

router.post("/register", registerCustomer);
router.post("/login", loginCustomer);
router.post("/logout", logoutCustomer);


module.exports = router;