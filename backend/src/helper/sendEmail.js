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
exports.sendOtpEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const sendOtpEmail = (otp, email) => __awaiter(void 0, void 0, void 0, function* () {
    const html = `<h3>Please enter below OTP to verify your email:</h3><h1>${otp}</h1>`;
    // send mail start
    const auth = nodemailer_1.default.createTransport({
        service: "gmail",
        secure: true,
        port: 465,
        auth: {
            user: "pskbalvesh@gmail.com",
            pass: "nrymsoxqiyxyxuqd"
        }
    });
    const receiver = {
        from: "pskbalvesh@gmail.com",
        to: email,
        subject: "Highway Delite OTP verification!",
        html
    };
    auth.sendMail(receiver, (error, emailResponse) => {
        if (error) {
            throw error;
        }
        else {
            console.log("success!");
        }
        // response.end();
    });
    // send mail end
});
exports.sendOtpEmail = sendOtpEmail;
