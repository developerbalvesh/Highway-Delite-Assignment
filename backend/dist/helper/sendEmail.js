import nodemailer from 'nodemailer';
export const sendOtpEmail = async (otp, email) => {
    const html = `<h3>Please enter below OTP to verify your email:</h3><h1>${otp}</h1>`;
    const pass = process.env.EMAIL_PASS;
    // send mail start
    const auth = nodemailer.createTransport({
        service: "gmail",
        secure: true,
        port: 465,
        auth: {
            user: "pskbalvesh@gmail.com",
            pass
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
};
//# sourceMappingURL=sendEmail.js.map