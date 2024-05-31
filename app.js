import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import http from "http"; // Tambahkan ini

import db from "./config/database.js";
import router from "./routes/index.js";

dotenv.config();
const app = express();

try {
    await db.authenticate();
    console.log('Database Connect');
} catch (error) {
    console.error(error);
}

app.use(cors({ credentials:true, origin:'http://localhost:3000'})); // Ubah ini
app.use(cookieParser());
app.use(express.json());
app.use(router);

const server = http.createServer(app); // Ubah ini
const PORT = 5000; // Ubah ini
server.listen(PORT, () => console.log(`Server running at port ${PORT}`));


