const express = require("express");
const { authMiddleware, adminMiddleware } = require("../middlewares/authMiddleware");

const router = express.Router();

// Criar um novo tipo de ingresso (Apenas Admin)
router.post("/", authMiddleware, adminMiddleware, (req, res) => {
    res.json({ message: "Ingresso criado com sucesso!" });
});

module.exports = router;
