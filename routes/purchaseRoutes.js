const express = require("express");
const { createPurchase, getUserPurchases, getPurchaseById } = require("../controllers/purchaseController");
const { authMiddleware } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/", authMiddleware, createPurchase);

router.get("/", authMiddleware, getUserPurchases);

router.get("/:id", authMiddleware, getPurchaseById);

module.exports = router;
