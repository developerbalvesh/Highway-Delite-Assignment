const mongoose = require('mongoose');
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL);
        console.log(`Connected to ${conn.connection.host}`);
    }
    catch (error) {
        console.log(`Error while connecting: ${error}`);
    }
};
export {};
//# sourceMappingURL=config.js.map