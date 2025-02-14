const express = require("express");
const { registerUser, loginUser,createAdmin } = require("../controllers/userController");
const { authMiddleware, adminMiddleware } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/admin", authMiddleware, adminMiddleware, createAdmin);

router.get("/profile", authMiddleware, (req, res) => {
    res.json({ message: "Perfil acessado!", user: req.user });
});

module.exports = router;
