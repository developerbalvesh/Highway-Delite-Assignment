"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const morgan_1 = __importDefault(require("morgan"));
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const authRoutes_js_1 = __importDefault(require("./routes/authRoutes.js"));
const db_js_1 = require("./config/db.js");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
dotenv_1.default.config();
(0, db_js_1.connectDB)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use((0, morgan_1.default)("dev"));
app.use("/api/v1/auth", authRoutes_js_1.default);
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
