const mongoose = require("mongoose");

const PurchaseSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    tickets: [{
        ticketType: { type: mongoose.Schema.Types.ObjectId, ref: "TicketType", required: true },
        quantity: { type: Number, required: true, min: 1 }
    }],
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Purchase", PurchaseSchema);
