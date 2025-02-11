const mongoose = require("mongoose");

const TicketTypeSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true, min: 0 },
}, { timestamps: true });

module.exports = mongoose.model("TicketType", TicketTypeSchema);
