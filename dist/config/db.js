import mongoose from "mongoose";
export const connectDB = async () => {
    try {
        if (!process.env.MONGO_URL) {
            throw new Error("MongoDB url not found");
        }
        const mongo = process.env.MONGO_URL;
        const conn = await mongoose.connect(mongo);
        console.log(`Connected to ${conn.connection.host}`);
    }
    catch (error) {
        console.log(`Error while connecting: ${error}`);
    }
};
//# sourceMappingURL=db.js.map