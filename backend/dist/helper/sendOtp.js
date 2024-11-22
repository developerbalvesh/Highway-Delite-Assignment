import nodemailer from 'nodemailer';
export const sendEmail = async (email) => {
    const otp = await Math.floor(Math.random() * (9999 - 1000) + 1000);
    console.log(otp);
    const html = `<h5>Please enter below OTP to verify your email:</h5><h1>${otp}</h1>`;
    // send mail start
    const auth = nodemailer.createTransport({
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
        to: "developer.balvesh@gmail.com",
        subject: "OTP verification!",
        html
    };
    auth.sendMail(receiver, (error, emailResponse) => {
        if (error) {
            return false;
            throw error;
        }
        else {
            return true;
            console.log("success!");
        }
        // response.end();
    });
    return false;
    // send mail end
};
//# sourceMappingURL=sendOtp.js.map