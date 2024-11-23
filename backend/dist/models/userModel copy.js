import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    date_of_birth: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    varified_email: {
        type: Boolean,
        default: false,
    },
    otp_token: {
        type: String,
        default: null
    }
}, { timestamps: true });
export default mongoose.model("Users", userSchema);
//# sourceMappingURL=userModel%20copy.js.map