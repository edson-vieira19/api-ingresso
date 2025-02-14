const Purchase = require("../models/Purchase");
const TicketType = require("../models/TicketType");

// Criar uma compra
const createPurchase = async (req, res) => {
    try {
        const { tickets } = req.body;
        let totalPrice = 0;

        // Valida cada tipo de ingresso solicitado
        for (let item of tickets) {
            const ticketType = await TicketType.findById(item.ticketType);
            if (!ticketType) {
                return res.status(404).json({ message: `Ingresso ID ${item.ticketType} não encontrado.` });
            }
            if (item.quantity > ticketType.quantity) {
                return res.status(400).json({ message: `Estoque insuficiente para o ingresso ${ticketType.name}.` });
            }
            totalPrice += item.quantity * ticketType.price;
        }

        // Atualiza o estoque dos ingressos
        for (let item of tickets) {
            await TicketType.findByIdAndUpdate(item.ticketType, {
                $inc: { quantity: -item.quantity }
            });
        }

        // Registra a compra
        const purchase = await Purchase.create({
            user: req.user.id,
            tickets,
            totalPrice,
        });

        res.status(201).json(purchase);
    } catch (error) {
        res.status(500).json({ message: "Erro ao realizar a compra." });
    }
};

// Listar compras do usuário autenticado
const getUserPurchases = async (req, res) => {
    try {
        const purchases = await Purchase.find({ user: req.user.id }).populate("tickets.ticketType", "name price");
        res.json(purchases);
    } catch (error) {
        res.status(500).json({ message: "Erro ao buscar compras." });
    }
};

// Buscar uma compra específica do usuário autenticado
const getPurchaseById = async (req, res) => {
    try {
        const purchase = await Purchase.findOne({ _id: req.params.id, user: req.user.id }).populate("tickets.ticketType", "name price");
        if (!purchase) {
            return res.status(404).json({ message: "Compra não encontrada." });
        }
        res.json(purchase);
    } catch (error) {
        res.status(500).json({ message: "Erro ao buscar compra." });
    }
};

module.exports = { createPurchase, getUserPurchases, getPurchaseById };
