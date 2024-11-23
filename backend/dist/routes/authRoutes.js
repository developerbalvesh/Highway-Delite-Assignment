import express from 'express';
import { otpSigninController, sendOtp, sendOtpSigninController, signinController, signupController, validateOtp } from '../controller/authController.js';
const router = express.Router();
router.post('/signup', signupController);
router.post('/signin', signinController);
router.post('/send-otp', sendOtp);
router.post('/validate-otp', validateOtp);
router.get('/send-otp-signin/:email', sendOtpSigninController);
router.post('/otp-signin', otpSigninController);
export default router;
//# sourceMappingURL=authRoutes.js.map