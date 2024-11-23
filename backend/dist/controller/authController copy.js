import userModel from "../models/userModel.js";
import { comparePassword, hashPassword } from "../helper/authHelper.js";
import JWT from 'jsonwebtoken';
import { sendOtpEmail } from "../helper/sendEmail.js";
export const signupController = async (req, res) => {
    try {
        let user = req.body;
        if (!user.email || !user.date_of_birth || !user.name || !user.password) {
            return res.status(200).send({
                success: false,
                message: "Empty fields not allowed!"
            });
        }
        const exist = await userModel.find({ email: user.email });
        user.password = await hashPassword(user.password);
        if (exist.length) {
            return res.status(200).send({
                success: false,
                message: "Email already registered !"
            });
        }
        await new userModel(user).save();
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
};
export const signinController = async (req, res) => {
    try {
        const user = req.body;
        if (!user.email || !user.password) {
            return res.status(200).send({
                success: false,
                message: "No empty field allowed"
            });
        }
        const exist = await userModel.findOne({ email: user.email });
        if (!exist) {
            return res.status(200).send({
                success: false,
                message: "Email not registered!"
            });
        }
        const valid = await comparePassword(user.password, exist.password);
        if (!valid) {
            return res.status(200).send({
                success: false,
                message: "Invalid email or password"
            });
        }
        const jwt_secret = await process.env.JWT_SECRET;
        const token = await JWT.sign({ _id: exist._id }, jwt_secret, {
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
};
export const sendOtp = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(200).send({
                success: false,
                message: "Email required"
            });
        }
        const exist = await userModel.findOne({ email });
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
        const otp = await Math.floor(Math.random() * (9999 - 1000) + 1000);
        await sendOtpEmail(otp, email);
        const otp_token = await hashPassword(otp + "");
        console.log(otp_token);
        await userModel.findByIdAndUpdate(exist._id, { otp_token }, { new: true });
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
};
export const validateOtp = async (req, res) => {
    try {
        const { email, otp } = req.body;
        if (!email || !otp) {
            return res.status(200).send({
                success: false,
                message: "Empty field not allowed"
            });
        }
        const exist = await userModel.findOne({ email });
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
        const valid = await comparePassword(otp + "", exist.otp_token);
        if (!valid) {
            return res.status(200).send({
                success: false,
                message: "Otp is not valid"
            });
        }
        await userModel.findByIdAndUpdate(exist._id, { varified_email: true, otp_token: null }, { new: true });
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
};
export const sendOtpSigninController = async (req, res) => {
    try {
        const email = req.params.email;
        const exist = await userModel.findOne({ email });
        if (!exist) {
            return res.status(200).send({
                success: false,
                message: "Email not registered"
            });
        }
        console.log(email);
        const otp = await Math.floor(Math.random() * (9999 - 1000) + 1000);
        await sendOtpEmail(otp, email);
        const otp_token = await hashPassword(otp + "");
        await userModel.findByIdAndUpdate(exist._id, { otp_token }, { new: true });
        res.status(200).send({
            success: true,
            message: `Otp sent to ${email}`
        });
    }
    catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            error,
            message: "Internal server error"
        });
    }
};
export const otpSigninController = async (req, res) => {
    try {
        const { email, otp } = req.body;
        if (!email || !otp) {
            return res.status(200).send({
                success: false,
                message: "Empty field not allowed"
            });
        }
        const exist = await userModel.findOne({ email });
        if (!exist) {
            return res.status(200).send({
                success: false,
                message: "Email is not registered!"
            });
        }
        const valid = await comparePassword(otp, exist.otp_token);
        if (!valid) {
            return res.status(200).send({
                success: false,
                message: "Incorrect OTP"
            });
        }
        const jwt_secret = await process.env.JWT_SECRET;
        const token = await JWT.sign({ _id: exist._id }, jwt_secret, {
            expiresIn: "7d",
        });
        res.status(200).send({
            success: true,
            message: "Signning in...",
            user: {
                name: exist.name,
                date_of_birth: exist.date_of_birth,
                email: exist.email,
                token
            }
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Internal server error",
            error
        });
    }
};
//# sourceMappingURL=authController%20copy.js.map