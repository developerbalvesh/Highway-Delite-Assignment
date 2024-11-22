"use strict";
exports.__esModule = true;
var morgan_1 = require("morgan");
var express_1 = require("express");
var dotenv_1 = require("dotenv");
var authRoutes_js_1 = require("./routes/authRoutes.js");
var db_js_1 = require("./config/db.js");
var cors_1 = require("cors");
var app = express_1["default"]();
dotenv_1["default"].config();
db_js_1.connectDB();
app.use(cors_1["default"]());
app.use(express_1["default"].json());
app.use(morgan_1["default"]("dev"));
app.use("/api/v1/auth", authRoutes_js_1["default"]);
app.use("*", function (req, res) {
    res.status(200).send({
        success: false,
        message: "Welcome to server"
    });
});
var PORT = process.env.PORT || 8080;
app.listen(PORT, function () {
    console.log('Server is running');
});
