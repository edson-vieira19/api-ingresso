const express = require("express");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Purchase = require("../models/Purchase");
const { authMiddleware } = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/login", (req, res) => {
    res.render("login");
});

router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.render("login", { error: "Credenciais inválidas" });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.cookie("token", token, { httpOnly: true });
        res.redirect("/compras");
    } catch (error) {
        res.render("login", { error: "Erro ao fazer login" });
    }
});

router.get("/logout", (req, res) => {
    res.clearCookie("token");
    res.redirect("/login");
});

router.get("/compras", authMiddleware, async (req, res) => {
    try {
        const compras = await Purchase.find({ user: req.user.id }).lean();
        res.render("compras", { compras });
    } catch (error) {
        res.redirect("/login");
    }
});

router.get("/compras/:id", authMiddleware, async (req, res) => {
    try {
        const compra = await Purchase.findOne({ _id: req.params.id, user: req.user.id }).populate("tickets.ticketType").lean();
        if (!compra) {
            return res.redirect("/compras");
        }
        res.render("compraDetalhe", { compra });
    } catch (error) {
        res.redirect("/compras");
    }
});

router.get("/register", (req, res) => {
    res.render("register");
});

router.get("/", (req, res) => {
    res.render("index");
});

module.exports = router;
