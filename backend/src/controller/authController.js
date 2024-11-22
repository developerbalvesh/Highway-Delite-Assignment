"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateOtp = exports.sendOtp = exports.signinController = exports.signupController = void 0;
const userModel_js_1 = __importDefault(require("../models/userModel.js"));
const authHelper_js_1 = require("../helper/authHelper.js");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const sendEmail_js_1 = require("../helper/sendEmail.js");
const signupController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let user = req.body;
        if (!user.email || !user.date_of_birth || !user.name || !user.password) {
            return res.status(200).send({
                success: false,
                message: "Empty fields not allowed!"
            });
        }
        const exist = yield userModel_js_1.default.find({ email: user.email });
        user.password = yield (0, authHelper_js_1.hashPassword)(user.password);
        if (exist.length) {
            return res.status(200).send({
                success: false,
                message: "Email already registered !"
            });
        }
        yield new userModel_js_1.default(user).save();
        res.status(200).send({
            success: true,
            message: "Signup successful"
        });
    }
    catch (error) {
        res.status(500).send({
            success: false,
            message: "Internal server Error",
            error
        });
    }
});
exports.signupController = signupController;
const signinController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.body;
        if (!user.email || !user.password) {
            return res.status(200).send({
                success: false,
                message: "No empty field allowed"
            });
        }
        const exist = yield userModel_js_1.default.findOne({ email: user.email });
        if (!exist) {
            return res.status(200).send({
                success: false,
                message: "Email not registered!"
            });
        }
        const valid = yield (0, authHelper_js_1.comparePassword)(user.password, exist.password);
        if (!valid) {
            return res.status(200).send({
                success: false,
                message: "Invalid email or password"
            });
        }
        const jwt_secret = yield process.env.JWT_SECRET;
        const token = yield jsonwebtoken_1.default.sign({ _id: exist._id }, jwt_secret, {
            expiresIn: "7d",
        });
        res.status(200).send({
            user: {
                name: exist.name,
                date_of_birth: exist.date_of_birth,
                email: exist.email,
                varified_email: exist.varified_email,
                login_token: token
            },
            success: true,
            message: "Signin successful"
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Internal server error"
        });
    }
});
exports.signinController = signinController;
const sendOtp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(200).send({
                success: false,
                message: "Email required"
            });
        }
        const exist = yield userModel_js_1.default.findOne({ email });
        if (!exist) {
            return res.status(200).send({
                success: false,
                message: "Email not registered!"
            });
        }
        if (exist.varified_email) {
            return res.status(200).send({
                success: false,
                message: "Email is already varified!"
            });
        }
        const otp = yield Math.floor(Math.random() * (9999 - 1000) + 1000);
        yield (0, sendEmail_js_1.sendOtpEmail)(otp, email);
        const otp_token = yield (0, authHelper_js_1.hashPassword)(otp + "");
        console.log(otp_token);
        yield userModel_js_1.default.findByIdAndUpdate(exist._id, { otp_token }, { new: true });
        res.status(200).send({
            success: true,
            message: "Otp sent"
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Internal Error"
        });
    }
});
exports.sendOtp = sendOtp;
const validateOtp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, otp } = req.body;
        if (!email || !otp) {
            return res.status(200).send({
                success: false,
                message: "Empty field not allowed"
            });
        }
        const exist = yield userModel_js_1.default.findOne({ email });
        if (!exist) {
            return res.status(200).send({
                success: false,
                message: "Email not registered"
            });
        }
        if (!exist.otp_token) {
            return res.status(200).send({
                success: false,
                message: "Please generate otp first"
            });
        }
        if (exist.varified_email) {
            return res.status(200).send({
                success: false,
                message: "Email is already varified!"
            });
        }
        const valid = yield (0, authHelper_js_1.comparePassword)(otp + "", exist.otp_token);
        if (!valid) {
            return res.status(200).send({
                success: false,
                message: "Otp is not valid"
            });
        }
        yield userModel_js_1.default.findByIdAndUpdate(exist._id, { varified_email: true, otp_token: null }, { new: true });
        res.status(200).send({
            success: true,
            message: "Validation success"
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Internal error",
            error
        });
    }
});
exports.validateOtp = validateOtp;
