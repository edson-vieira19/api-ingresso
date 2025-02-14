const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const router = express.Router();

// Rota de instalação para criar o primeiro administrador
router.post("/", async (req, res) => {
    try {
        // Verifica se já existe um administrador
        const existingAdmin = await User.findOne({ role: "admin" });
        if (existingAdmin) {
            return res.status(400).json({ message: "Administrador já existe!" });
        }

        // Cria o admin inicial com credenciais do .env
        const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);

        const admin = await User.create({
            name: process.env.ADMIN_NAME,
            email: process.env.ADMIN_EMAIL,
            password: hashedPassword,
            role: "admin",
        });

        res.status(201).json({ message: "Administrador criado com sucesso!", admin });
    } catch (error) {
        res.status(500).json({ message: "Erro ao criar administrador." });
    }
});

module.exports = router;
