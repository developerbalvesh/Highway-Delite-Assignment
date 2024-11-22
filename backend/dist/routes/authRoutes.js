import express from 'express';
import { sendOtp, signinController, signupController, validateOtp } from '../controller/authController.js';
const router = express.Router();
router.post('/signup', signupController);
router.post('/signin', signinController);
router.post('/send-otp', sendOtp);
router.post('/validate-otp', validateOtp);
export default router;
//# sourceMappingURL=authRoutes.js.map