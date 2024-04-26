import express from "express";
import conectarDB from "./config/db.js";
import dotenv from "dotenv";
import doctorRoutes from "./routes/doctorRoutes.js";

dotenv.config();

conectarDB();

const app = express();

app.use(express.json()); 

app.use('/doctores', doctorRoutes);

app.use("/", (req, res) => {
    res.send("FUNCIONA EL SERVIDOR BACKEND!");
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Servidor funcionando en el puerto: ${PORT}`);
});