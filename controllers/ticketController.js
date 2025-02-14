const TicketType = require("../models/TicketType");

// Criar um novo tipo de ingresso (Apenas Admin)
const createTicket = async (req, res) => {
    try {
        const { name, price, quantity } = req.body;

        // Verifica se já existe um ingresso com esse nome
        const existingTicket = await TicketType.findOne({ name });
        if (existingTicket) {
            return res.status(400).json({ message: "Esse tipo de ingresso já existe." });
        }

        const ticket = await TicketType.create({ name, price, quantity });
        res.status(201).json(ticket);
    } catch (error) {
        res.status(500).json({ message: "Erro ao criar ingresso." });
    }
};

// Listar todos os ingressos
const getAllTickets = async (req, res) => {
    try {
        const tickets = await TicketType.find();
        res.json(tickets);
    } catch (error) {
        res.status(500).json({ message: "Erro ao buscar ingressos." });
    }
};

// Buscar um ingresso pelo ID
const getTicketById = async (req, res) => {
    try {
        const ticket = await TicketType.findById(req.params.id);
        if (!ticket) {
            return res.status(404).json({ message: "Ingresso não encontrado." });
        }
        res.json(ticket);
    } catch (error) {
        res.status(500).json({ message: "Erro ao buscar ingresso." });
    }
};

// Atualizar um ingresso (Apenas Admin)
const updateTicket = async (req, res) => {
    try {
        const { name, price, quantity } = req.body;

        const ticket = await TicketType.findByIdAndUpdate(
            req.params.id,
            { name, price, quantity },
            { new: true, runValidators: true }
        );

        if (!ticket) {
            return res.status(404).json({ message: "Ingresso não encontrado." });
        }

        res.json(ticket);
    } catch (error) {
        res.status(500).json({ message: "Erro ao atualizar ingresso." });
    }
};

// Excluir um ingresso (Apenas Admin)
const deleteTicket = async (req, res) => {
    try {
        const ticket = await TicketType.findByIdAndDelete(req.params.id);
        if (!ticket) {
            return res.status(404).json({ message: "Ingresso não encontrado." });
        }
        res.json({ message: "Ingresso excluído com sucesso!" });
    } catch (error) {
        res.status(500).json({ message: "Erro ao excluir ingresso." });
    }
};

module.exports = {
    createTicket,
    getAllTickets,
    getTicketById,
    updateTicket,
    deleteTicket,
};
