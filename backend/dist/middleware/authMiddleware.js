import JWT from "jsonwebtoken";
// Protected Route token base
export const requireSignIn = async (req, res, next) => {
    try {
        const secret = process.env.JWT_SECRET;
        if (!secret) {
            return req.user_id = null;
        }
        const decode = JWT.verify(req.headers.authorization, secret);
        if (!decode) {
            res.status(200).send({
                success: false,
                message: "Something went wrong"
            });
        }
        req.user_id = decode;
        console.log(decode);
        next();
    }
    catch (err) {
        console.log(err);
    }
};
//# sourceMappingURL=authMiddleware.js.map