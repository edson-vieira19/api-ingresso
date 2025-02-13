const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    const token = req.header("Authorization");

    if (!token) {
        return res.status(401).json({ message: "Acesso negado. Nenhum token fornecido." });
    }

    try {
        const decoded = jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET);
        req.user = decoded; // Adiciona os dados do usuário ao request
        next();
    } catch (error) {
        res.status(401).json({ message: "Token inválido." });
    }
};

const adminMiddleware = (req, res, next) => {
    if (req.user.role !== "admin") {
        return res.status(403).json({ message: "Acesso negado. Apenas administradores podem realizar esta ação." });
    }
    next();
};

module.exports = { authMiddleware, adminMiddleware };
