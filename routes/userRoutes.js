const express = require("express");
const { registerUser, loginUser } = require("../controllers/userController");
const { authMiddleware } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

router.get("/profile", authMiddleware, (req, res) => {
    res.json({ message: "Perfil acessado!", user: req.user });
});

module.exports = router;
