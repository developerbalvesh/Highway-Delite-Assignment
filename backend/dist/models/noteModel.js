import mongoose from "mongoose";
const noteSchema = new mongoose.Schema({
    note: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.ObjectId,
        ref: 'Users'
    }
}, { timestamps: true });
export default mongoose.model("Notes", noteSchema);
//# sourceMappingURL=noteModel.js.map