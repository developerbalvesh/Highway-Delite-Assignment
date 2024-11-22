import nodemailer from 'nodemailer'

export const sendOtpEmail = async (otp:number, email: string):Promise<any> => {
    const html = `<h3>Please enter below OTP to verify your email:</h3><h1>${otp}</h1>`

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
        to: email,
        subject: "Highway Delite OTP verification!",
        html
    };

    auth.sendMail(receiver, (error, emailResponse) => {
        if (error) {
            throw error;
        }else{
            console.log("success!");
        }
        // response.end();
    });
    // send mail end
}