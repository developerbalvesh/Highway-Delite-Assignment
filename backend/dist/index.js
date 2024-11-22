import morgan from "morgan";
import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import { connectDB } from "./config/db.js";
import cors from 'cors';
const app = express();
dotenv.config();
connectDB();
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use("/api/v1/auth", authRoutes);
app.use("*", (req, res) => {
    res.status(200).send({
        success: false,
        message: "Welcome to server"
    });
});
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log('Server is running');
});
//# sourceMappingURL=index.js.map