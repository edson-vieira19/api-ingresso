const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Função para gerar token JWT
const generateToken = (user) => {
    return jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
    );
};

// Cadastro de usuário
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Verificar se o e-mail já está cadastrado
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "E-mail já cadastrado" });
        }

        // Hash da senha
        const hashedPassword = await bcrypt.hash(password, 10);

        // Criar usuário
        const user = await User.create({ name, email, password: hashedPassword });

        // Gerar token
        const token = generateToken(user);

        res.status(201).json({ message: "Usuário criado com sucesso", token });
    } catch (error) {
        res.status(500).json({ message: "Erro no servidor" });
    }
};

// Login de usuário
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Verificar se o usuário existe
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Usuário ou senha inválidos" });
        }

        // Comparar senhas
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Usuário ou senha inválidos" });
        }

        // Gerar token
        const token = generateToken(user);

        res.json({ message: "Login bem-sucedido", token });
    } catch (error) {
        res.status(500).json({ message: "Erro no servidor" });
    }
};

module.exports = { registerUser, loginUser };
