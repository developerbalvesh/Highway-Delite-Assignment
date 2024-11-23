import morgan from "morgan";
import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import noteRoutes from './routes/noteRoutes.js';
import { connectDB } from "./config/db.js";
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();
dotenv.config();
connectDB();
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, './frontend')));
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/note", noteRoutes);
app.use("*", function (req, res) {
    res.sendFile(path.join(__dirname, './frontend/index.html'));
});
// app.use("*", (req: Request, res: Response) => {
//     res.status(200).send({
//         success: false,
//         message: "Welcome to server"
//     })
// })
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log('Server is running');
});
//# sourceMappingURL=index.js.map