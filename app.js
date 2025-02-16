const express = require('express')
const app = express()
const connectDB = require("./config/db");
const mustacheExpress = require("mustache-express");
const path = require("path");


const userRoutes = require("./routes/userRoutes");
const ticketRoutes = require("./routes/ticketRoutes");
const installRoute = require("./routes/installRoute");
const purchaseRoutes = require("./routes/purchaseRoutes");
const webRoutes = require("./routes/webroutes");

require('dotenv').config();
const PORT = process.env.PORT || 3000;

app.use(express.json());

connectDB();

app.engine("mustache", mustacheExpress());
app.set("view engine", "mustache");
app.set("views", path.join(__dirname, "views"));


app.use("/api/users", userRoutes);
app.use("/api/tickets", ticketRoutes);
app.use("/api/purchases", purchaseRoutes);
app.use("/api/install", installRoute);  // instala um administrador inicial
app.use(webRoutes);

app.get("/", (req, res) => {
    res.send("API rodando!");
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });

