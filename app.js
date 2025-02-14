const express = require('express')
const app = express()
const connectDB = require("./config/db");

const userRoutes = require("./routes/userRoutes");
const ticketRoutes = require("./routes/ticketRoutes");
const installRoute = require("./routes/installRoute");

require('dotenv').config();
const PORT = process.env.PORT || 3000;

app.use(express.json());

connectDB();


app.use("/api/users", userRoutes);
app.use("/api/tickets", ticketRoutes);

//app.use("/api/install", installRoute);  // instala um administrador inicial

app.get("/", (req, res) => {
    res.send("API rodando!");
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });

