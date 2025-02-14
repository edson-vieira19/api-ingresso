const express = require("express");
const { 
    createTicket, 
    getAllTickets, 
    getTicketById, 
    updateTicket, 
    deleteTicket 
} = require("../controllers/ticketController");
const { authMiddleware, adminMiddleware } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/", authMiddleware, adminMiddleware, createTicket);

router.get("/", getAllTickets);

router.get("/:id", getTicketById);

router.put("/:id", authMiddleware, adminMiddleware, updateTicket);

router.delete("/:id", authMiddleware, adminMiddleware, deleteTicket);

module.exports = router;


/*const express = require("express");
const { authMiddleware, adminMiddleware } = require("../middlewares/authMiddleware");

const router = express.Router();

// Criar um novo tipo de ingresso (Apenas Admin)
router.post("/", authMiddleware, adminMiddleware, (req, res) => {
    res.json({ message: "Ingresso criado com sucesso!" });
});

module.exports = router;
*/