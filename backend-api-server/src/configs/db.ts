import { connect } from "mongoose";

export const connectDB = async (uri: string) => {
    const options = {
        // useNewUrlParser: true,
        autoIndex: true,
        // useNewUrlParser: true,
        serverSelectionTimeoutMS: 5000,
    };
    try {
        const connection = await connect(uri, options);
        console.log(`MongoDB connected to ${connection.connection.host} DB ✅`);
    } catch (e: any) {
        console.log(`Error connecting to mongoose due to ${e.message} ❌`);
    }
};
