"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_js_1 = require("../controller/authController.js");
const router = express_1.default.Router();
router.post('/signup', authController_js_1.signupController);
router.post('/signin', authController_js_1.signinController);
router.post('/send-otp', authController_js_1.sendOtp);
router.post('/validate-otp', authController_js_1.validateOtp);
exports.default = router;
