const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const generateToken = (user) => {
    return jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
    );
};

const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "E-mail já cadastrado" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({ name, email, password: hashedPassword });

        const token = generateToken(user);

        res.status(201).json({ message: "Usuário criado com sucesso", token });
    } catch (error) {
        res.status(500).json({ message: "Erro no servidor" });
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Usuário ou senha inválidos" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Usuário ou senha inválidos" });
        }

        const token = generateToken(user);

        res.json({ message: "Login bem-sucedido", token });
    } catch (error) {
        res.status(500).json({ message: "Erro no servidor" });
    }
};

const createAdmin = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Verifica se já existe um usuário com esse email
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Usuário já existe." });
        }

        // Hash da senha
        const hashedPassword = await bcrypt.hash(password, 10);

        // Criar novo administrador
        const admin = await User.create({
            name,
            email,
            password: hashedPassword,
            role: "admin",
        });

        res.status(201).json({ message: "Administrador criado com sucesso!", admin });
    } catch (error) {
        res.status(500).json({ message: "Erro ao criar administrador." });
    }
};

module.exports = { registerUser, loginUser, createAdmin };
