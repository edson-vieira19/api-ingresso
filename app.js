const express = require('express')
const app = express()
const connectDB = require("./config/db");

const userRoutes = require("./routes/userRoutes");

require('dotenv').config();
const PORT = process.env.PORT || 3000;

app.use(express.json());

connectDB();


app.use("/api/users", userRoutes);


app.get("/", (req, res) => {
    res.send("API rodando!");
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });

